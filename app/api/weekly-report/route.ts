import { NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

// ── Auth ─────────────────────────────────────────────────────────────────────

function getOAuthClient() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return auth;
}

// ── GA4 Data ─────────────────────────────────────────────────────────────────

async function getGA4Data(auth: ReturnType<typeof getOAuthClient>) {
  const analyticsData = google.analyticsdata({ version: "v1beta", auth });
  const propertyId = process.env.GA4_PROPERTY_ID!;

  const [thisWeek, lastWeek] = await Promise.all([
    analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
        metrics: [
          { name: "sessions" },
          { name: "activeUsers" },
          { name: "engagementRate" },
        ],
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
      },
    }),
    analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate: "14daysAgo", endDate: "8daysAgo" }],
        metrics: [{ name: "sessions" }, { name: "activeUsers" }],
      },
    }),
  ]);

  const rows = thisWeek.data.rows || [];
  let totalSessions = 0;
  let totalUsers = 0;
  const channelBreakdown: Record<string, number> = {};

  rows.forEach((row) => {
    const channel = row.dimensionValues?.[0]?.value || "Other";
    const sessions = parseInt(row.metricValues?.[0]?.value || "0");
    const users = parseInt(row.metricValues?.[1]?.value || "0");
    totalSessions += sessions;
    totalUsers += users;
    channelBreakdown[channel] = sessions;
  });

  const lastWeekSessions = parseInt(
    lastWeek.data.rows?.[0]?.metricValues?.[0]?.value || "0"
  );
  const sessionChange =
    lastWeekSessions > 0
      ? Math.round(((totalSessions - lastWeekSessions) / lastWeekSessions) * 100)
      : 0;

  return { totalSessions, totalUsers, channelBreakdown, sessionChange, lastWeekSessions };
}

// ── Search Console Data ───────────────────────────────────────────────────────

async function getSearchConsoleData(auth: ReturnType<typeof getOAuthClient>) {
  const searchConsole = google.searchconsole({ version: "v1", auth });
  const siteUrl = process.env.SEARCH_CONSOLE_SITE_URL!;

  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() - 3); // SC has 3-day lag
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 6);

  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const [overview, topQueries] = await Promise.all([
    searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: fmt(startDate),
        endDate: fmt(endDate),
        dimensions: [],
      },
    }),
    searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: fmt(startDate),
        endDate: fmt(endDate),
        dimensions: ["query"],
        rowLimit: 5,
      },
    }),
  ]);

  const row = overview.data.rows?.[0];
  const clicks = Math.round(row?.clicks || 0);
  const impressions = Math.round(row?.impressions || 0);
  const avgPosition = row?.position ? row.position.toFixed(1) : "N/A";
  const ctr = row?.ctr ? (row.ctr * 100).toFixed(1) + "%" : "0%";

  const topKeywords = (topQueries.data.rows || []).map((r) => ({
    query: r.keys?.[0] || "",
    clicks: Math.round(r.clicks || 0),
    position: r.position ? r.position.toFixed(1) : "N/A",
  }));

  return { clicks, impressions, avgPosition, ctr, topKeywords };
}

// ── Email HTML ────────────────────────────────────────────────────────────────

function buildEmailHtml(
  ga4: Awaited<ReturnType<typeof getGA4Data>>,
  sc: Awaited<ReturnType<typeof getSearchConsoleData>>,
  weekLabel: string
) {
  const clientName = process.env.CLIENT_NAME || "Client";
  const domain = process.env.SEARCH_CONSOLE_SITE_URL || "";

  const channelRows = Object.entries(ga4.channelBreakdown)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([channel, sessions]) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #333;color:#ccc;">${channel}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #333;color:#fff;text-align:right;">${sessions}</td>
      </tr>`
    )
    .join("");

  const keywordRows = sc.topKeywords
    .map(
      (k) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #333;color:#ccc;">${k.query}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #333;color:#fff;text-align:right;">${k.clicks}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #333;color:#C9A870;text-align:right;">#${k.position}</td>
      </tr>`
    )
    .join("");

  const trendArrow = ga4.sessionChange >= 0 ? "▲" : "▼";
  const trendColor = ga4.sessionChange >= 0 ? "#4ade80" : "#f87171";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#111;font-family:Inter,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7B35CC,#D4187A,#F05A28);border-radius:12px;padding:24px;margin-bottom:24px;text-align:center;">
      <p style="color:rgba(255,255,255,0.8);margin:0 0 4px;font-size:13px;">Weekly Performance Report</p>
      <h1 style="color:#fff;margin:0;font-size:22px;">${clientName}</h1>
      <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:12px;">${weekLabel} · ${domain}</p>
    </div>

    <!-- GA4 Overview -->
    <div style="background:#1a1a1a;border:1px solid #333;border-radius:12px;padding:20px;margin-bottom:16px;">
      <h2 style="color:#fff;margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:0.1em;">Website Traffic (GA4)</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px;">
        <div style="background:#222;border-radius:8px;padding:14px;text-align:center;">
          <p style="color:#9CA3AF;margin:0 0 4px;font-size:11px;">Sessions</p>
          <p style="color:#fff;margin:0;font-size:24px;font-weight:700;">${ga4.totalSessions}</p>
          <p style="color:${trendColor};margin:4px 0 0;font-size:11px;">${trendArrow} ${Math.abs(ga4.sessionChange)}% vs last week</p>
        </div>
        <div style="background:#222;border-radius:8px;padding:14px;text-align:center;">
          <p style="color:#9CA3AF;margin:0 0 4px;font-size:11px;">Users</p>
          <p style="color:#fff;margin:0;font-size:24px;font-weight:700;">${ga4.totalUsers}</p>
        </div>
        <div style="background:#222;border-radius:8px;padding:14px;text-align:center;">
          <p style="color:#9CA3AF;margin:0 0 4px;font-size:11px;">Last Week</p>
          <p style="color:#9CA3AF;margin:0;font-size:24px;font-weight:700;">${ga4.lastWeekSessions}</p>
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="padding:8px 12px;text-align:left;color:#9CA3AF;font-size:11px;text-transform:uppercase;">Channel</th>
            <th style="padding:8px 12px;text-align:right;color:#9CA3AF;font-size:11px;text-transform:uppercase;">Sessions</th>
          </tr>
        </thead>
        <tbody>${channelRows}</tbody>
      </table>
    </div>

    <!-- Search Console -->
    <div style="background:#1a1a1a;border:1px solid #333;border-radius:12px;padding:20px;margin-bottom:16px;">
      <h2 style="color:#fff;margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:0.1em;">Google Search (Search Console)</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px;margin-bottom:16px;">
        <div style="background:#222;border-radius:8px;padding:12px;text-align:center;">
          <p style="color:#9CA3AF;margin:0 0 4px;font-size:11px;">Clicks</p>
          <p style="color:#fff;margin:0;font-size:20px;font-weight:700;">${sc.clicks}</p>
        </div>
        <div style="background:#222;border-radius:8px;padding:12px;text-align:center;">
          <p style="color:#9CA3AF;margin:0 0 4px;font-size:11px;">Impressions</p>
          <p style="color:#fff;margin:0;font-size:20px;font-weight:700;">${sc.impressions}</p>
        </div>
        <div style="background:#222;border-radius:8px;padding:12px;text-align:center;">
          <p style="color:#9CA3AF;margin:0 0 4px;font-size:11px;">Avg Position</p>
          <p style="color:#C9A870;margin:0;font-size:20px;font-weight:700;">#${sc.avgPosition}</p>
        </div>
        <div style="background:#222;border-radius:8px;padding:12px;text-align:center;">
          <p style="color:#9CA3AF;margin:0 0 4px;font-size:11px;">CTR</p>
          <p style="color:#fff;margin:0;font-size:20px;font-weight:700;">${sc.ctr}</p>
        </div>
      </div>
      <p style="color:#9CA3AF;font-size:11px;text-transform:uppercase;margin:0 0 8px;">Top Keywords</p>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="padding:8px 12px;text-align:left;color:#9CA3AF;font-size:11px;">Query</th>
            <th style="padding:8px 12px;text-align:right;color:#9CA3AF;font-size:11px;">Clicks</th>
            <th style="padding:8px 12px;text-align:right;color:#9CA3AF;font-size:11px;">Position</th>
          </tr>
        </thead>
        <tbody>${keywordRows}</tbody>
      </table>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:16px 0;">
      <p style="color:#555;font-size:11px;margin:0;">Automated report by <a href="https://axiondigital.com.au" style="color:#7B35CC;">Axion Digital</a> · Every Monday 8am</p>
    </div>

  </div>
</body>
</html>`;
}

// ── Main Handler ──────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  // Simple auth check — call with ?secret=YOUR_CRON_SECRET
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const auth = getOAuthClient();
    const [ga4, sc] = await Promise.all([getGA4Data(auth), getSearchConsoleData(auth)]);

    const weekLabel = new Date().toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const html = buildEmailHtml(ga4, sc, weekLabel);

    // Send email via Gmail SMTP with App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.REPORTING_GMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Axion Digital Reporting" <${process.env.REPORTING_GMAIL}>`,
      to: process.env.REPORT_EMAIL_TO || "kieren@axiondigital.com.au",
      subject: `${process.env.CLIENT_NAME} — Weekly Report · ${weekLabel}`,
      html,
    });

    return NextResponse.json({ success: true, weekLabel, ga4, sc });
  } catch (err) {
    console.error("Weekly report error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
