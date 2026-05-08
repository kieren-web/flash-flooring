import { NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

// ── Types ─────────────────────────────────────────────────────────────────────

interface KeywordRow {
  query: string;
  clicks: number;
  position: string;
  delta: number | null; // null = new this week
}

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
        metrics: [{ name: "sessions" }, { name: "activeUsers" }],
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

  // This week (3-day SC lag)
  const thisEnd = new Date(today);
  thisEnd.setDate(thisEnd.getDate() - 3);
  const thisStart = new Date(thisEnd);
  thisStart.setDate(thisStart.getDate() - 6);

  // Last week (same window, shifted back 7 days)
  const lastEnd = new Date(thisEnd);
  lastEnd.setDate(lastEnd.getDate() - 7);
  const lastStart = new Date(thisStart);
  lastStart.setDate(lastStart.getDate() - 7);

  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const [overview, topQueries, lastQueries] = await Promise.all([
    searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: { startDate: fmt(thisStart), endDate: fmt(thisEnd), dimensions: [] },
    }),
    searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: fmt(thisStart),
        endDate: fmt(thisEnd),
        dimensions: ["query"],
        rowLimit: 10,
      },
    }),
    searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: fmt(lastStart),
        endDate: fmt(lastEnd),
        dimensions: ["query"],
        rowLimit: 20,
      },
    }),
  ]);

  const row = overview.data.rows?.[0];
  const clicks = Math.round(row?.clicks || 0);
  const impressions = Math.round(row?.impressions || 0);
  const avgPosition = row?.position ? row.position.toFixed(1) : "N/A";
  const ctr = row?.ctr ? (row.ctr * 100).toFixed(1) + "%" : "0%";

  // Build last-week position lookup
  const lastWeekPositions: Record<string, number> = {};
  (lastQueries.data.rows || []).forEach((r) => {
    const q = r.keys?.[0] || "";
    if (q && r.position) lastWeekPositions[q] = r.position;
  });

  const topKeywords: KeywordRow[] = (topQueries.data.rows || []).map((r) => {
    const query = r.keys?.[0] || "";
    const posNow = r.position ?? null;
    const posThen = lastWeekPositions[query] ?? null;

    let delta: number | null = null;
    if (posNow !== null && posThen !== null) {
      // Negative delta = improved (position number went down = ranked higher)
      delta = Math.round(posNow - posThen);
    }

    return {
      query,
      clicks: Math.round(r.clicks || 0),
      position: posNow ? posNow.toFixed(1) : "N/A",
      delta,
    };
  });

  const newKeywordsCount = topKeywords.filter((k) => k.delta === null).length;
  const improvedCount = topKeywords.filter((k) => k.delta !== null && k.delta < -0.5).length;

  return { clicks, impressions, avgPosition, ctr, topKeywords, newKeywordsCount, improvedCount };
}

// ── GHL Leads ─────────────────────────────────────────────────────────────────

async function getGHLLeads(): Promise<number> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!apiKey || !locationId) return 0;

  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  try {
    const res = await fetch(
      `https://services.leadconnectorhq.com/contacts/?locationId=${locationId}&startAfterDate=${sevenDaysAgo}&limit=100`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Version: "2021-07-28",
        },
      }
    );
    if (!res.ok) return 0;
    const data = await res.json();
    const contacts = data.contacts || [];
    // Filter to only website-lead tagged contacts
    return contacts.filter((c: { tags?: string[] }) =>
      c.tags?.includes("website-lead")
    ).length;
  } catch {
    return 0;
  }
}

// ── Narrative Summary ─────────────────────────────────────────────────────────

function buildNarrative(
  ga4: Awaited<ReturnType<typeof getGA4Data>>,
  sc: Awaited<ReturnType<typeof getSearchConsoleData>>,
  leads: number
): string {
  const parts: string[] = [];

  // Traffic trend
  if (ga4.lastWeekSessions === 0) {
    parts.push(`First week of data — ${ga4.totalSessions} sessions recorded.`);
  } else if (ga4.sessionChange >= 20) {
    parts.push(`Strong week — traffic is up ${ga4.sessionChange}% compared to last week.`);
  } else if (ga4.sessionChange > 0) {
    parts.push(`Traffic up ${ga4.sessionChange}% week-on-week.`);
  } else if (ga4.sessionChange <= -20) {
    parts.push(`Traffic dipped ${Math.abs(ga4.sessionChange)}% this week — worth keeping an eye on.`);
  } else if (ga4.sessionChange < 0) {
    parts.push(`Traffic slightly down ${Math.abs(ga4.sessionChange)}% this week.`);
  } else {
    parts.push(`Traffic steady this week at ${ga4.totalSessions} sessions.`);
  }

  // Rankings
  if (sc.improvedCount > 0 && sc.newKeywordsCount > 0) {
    parts.push(`Rankings improved on ${sc.improvedCount} keyword${sc.improvedCount > 1 ? "s" : ""} and ${sc.newKeywordsCount} new term${sc.newKeywordsCount > 1 ? "s" : ""} appeared in Google.`);
  } else if (sc.improvedCount > 0) {
    parts.push(`Rankings improved on ${sc.improvedCount} keyword${sc.improvedCount > 1 ? "s" : ""} this week.`);
  } else if (sc.newKeywordsCount > 0) {
    parts.push(`${sc.newKeywordsCount} new keyword${sc.newKeywordsCount > 1 ? "s" : ""} appearing in Google Search this week.`);
  } else if (sc.impressions > 0) {
    parts.push(`Rankings holding steady.`);
  }

  // Leads
  if (leads > 1) {
    parts.push(`${leads} new enquiries came through the website.`);
  } else if (leads === 1) {
    parts.push(`1 new enquiry came through the website.`);
  } else {
    parts.push(`No website enquiries this week.`);
  }

  return parts.join(" ");
}

// ── Action Items ──────────────────────────────────────────────────────────────

function buildActionItems(
  ga4: Awaited<ReturnType<typeof getGA4Data>>,
  sc: Awaited<ReturnType<typeof getSearchConsoleData>>,
  leads: number
): string[] {
  const actions: string[] = [];
  const avgPos = parseFloat(sc.avgPosition);
  const organicSessions = ga4.channelBreakdown["Organic Search"] || 0;
  const totalSessions = ga4.totalSessions || 1;

  if (!isNaN(avgPos) && avgPos > 15) {
    actions.push("Rankings still building — keep publishing suburb pages and local content to improve position.");
  } else if (!isNaN(avgPos) && avgPos <= 10) {
    actions.push("Solid rankings in top 10 — push for more Google reviews to lift click-through rate.");
  }

  if (organicSessions / totalSessions < 0.2 && totalSessions > 10) {
    actions.push("Most traffic is Direct or Paid — organic search is still growing. Content and backlinks will help.");
  }

  if (leads === 0 && ga4.totalSessions > 20) {
    actions.push("Good traffic but no leads — check the contact form is working and the CTA is visible.");
  }

  if (sc.improvedCount > 0) {
    actions.push("Rankings trending up — maintain consistency and don't change what's working.");
  }

  if (actions.length === 0) {
    actions.push("Stay consistent with content, reviews, and local citations. SEO compounds over time.");
  }

  return actions;
}

// ── Email HTML ────────────────────────────────────────────────────────────────

function buildEmailHtml(
  ga4: Awaited<ReturnType<typeof getGA4Data>>,
  sc: Awaited<ReturnType<typeof getSearchConsoleData>>,
  leads: number,
  weekLabel: string
) {
  const clientName = process.env.CLIENT_NAME || "Client";
  const domain = process.env.SEARCH_CONSOLE_SITE_URL || "";
  const narrative = buildNarrative(ga4, sc, leads);
  const actionItems = buildActionItems(ga4, sc, leads);

  const trendArrow = ga4.sessionChange >= 0 ? "▲" : "▼";
  const trendColor = ga4.sessionChange >= 0 ? "#4ade80" : "#f87171";

  const channelRows = Object.entries(ga4.channelBreakdown)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([channel, sessions]) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#ccc;font-size:13px;">${channel}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#fff;text-align:right;font-size:13px;">${sessions}</td>
      </tr>`
    )
    .join("");

  const keywordRows = sc.topKeywords
    .map((k) => {
      let deltaHtml = `<td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;text-align:right;font-size:12px;color:#555;">—</td>`;
      if (k.delta === null) {
        deltaHtml = `<td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;text-align:right;font-size:11px;"><span style="background:#1d3557;color:#90caf9;padding:2px 6px;border-radius:4px;">NEW</span></td>`;
      } else if (k.delta < -0.5) {
        deltaHtml = `<td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;text-align:right;font-size:12px;color:#4ade80;">↑ ${Math.abs(k.delta)}</td>`;
      } else if (k.delta > 0.5) {
        deltaHtml = `<td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;text-align:right;font-size:12px;color:#f87171;">↓ ${k.delta}</td>`;
      }

      return `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#ccc;font-size:13px;">${k.query}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#fff;text-align:right;font-size:13px;">${k.clicks}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#C9A870;text-align:right;font-size:13px;">#${k.position}</td>
        ${deltaHtml}
      </tr>`;
    })
    .join("");

  const actionRows = actionItems
    .map(
      (a) => `<li style="margin-bottom:8px;color:#ccc;font-size:13px;line-height:1.5;">${a}</li>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#111;font-family:Inter,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7B35CC,#D4187A,#F05A28);border-radius:12px;padding:24px;margin-bottom:16px;text-align:center;">
      <p style="color:rgba(255,255,255,0.8);margin:0 0 4px;font-size:13px;">Weekly Performance Report</p>
      <h1 style="color:#fff;margin:0;font-size:22px;">${clientName}</h1>
      <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:12px;">${weekLabel} · ${domain}</p>
    </div>

    <!-- Narrative Summary -->
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
      <p style="color:#9CA3AF;margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">This Week</p>
      <p style="color:#e8eaf0;margin:0;font-size:14px;line-height:1.6;">${narrative}</p>
    </div>

    <!-- Stats Row -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px;margin-bottom:16px;">
      <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:10px;padding:14px;text-align:center;">
        <p style="color:#9CA3AF;margin:0 0 4px;font-size:10px;text-transform:uppercase;">Sessions</p>
        <p style="color:#fff;margin:0;font-size:22px;font-weight:700;">${ga4.totalSessions}</p>
        <p style="color:${trendColor};margin:3px 0 0;font-size:10px;">${trendArrow} ${Math.abs(ga4.sessionChange)}% vs last wk</p>
      </div>
      <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:10px;padding:14px;text-align:center;">
        <p style="color:#9CA3AF;margin:0 0 4px;font-size:10px;text-transform:uppercase;">Clicks</p>
        <p style="color:#fff;margin:0;font-size:22px;font-weight:700;">${sc.clicks}</p>
        <p style="color:#9CA3AF;margin:3px 0 0;font-size:10px;">${sc.impressions} impressions</p>
      </div>
      <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:10px;padding:14px;text-align:center;">
        <p style="color:#9CA3AF;margin:0 0 4px;font-size:10px;text-transform:uppercase;">Avg Position</p>
        <p style="color:#C9A870;margin:0;font-size:22px;font-weight:700;">#${sc.avgPosition}</p>
        <p style="color:#9CA3AF;margin:3px 0 0;font-size:10px;">CTR ${sc.ctr}</p>
      </div>
      <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:10px;padding:14px;text-align:center;">
        <p style="color:#9CA3AF;margin:0 0 4px;font-size:10px;text-transform:uppercase;">Leads</p>
        <p style="color:${leads > 0 ? "#4ade80" : "#fff"};margin:0;font-size:22px;font-weight:700;">${leads}</p>
        <p style="color:#9CA3AF;margin:3px 0 0;font-size:10px;">from website</p>
      </div>
    </div>

    <!-- GA4 Channel Breakdown -->
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:20px;margin-bottom:16px;">
      <h2 style="color:#fff;margin:0 0 14px;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;">Traffic by Channel</h2>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="padding:6px 12px;text-align:left;color:#555;font-size:10px;text-transform:uppercase;font-weight:500;">Channel</th>
            <th style="padding:6px 12px;text-align:right;color:#555;font-size:10px;text-transform:uppercase;font-weight:500;">Sessions</th>
          </tr>
        </thead>
        <tbody>${channelRows}</tbody>
      </table>
    </div>

    <!-- Keywords -->
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:20px;margin-bottom:16px;">
      <h2 style="color:#fff;margin:0 0 14px;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;">Google Rankings — Top Keywords</h2>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="padding:6px 12px;text-align:left;color:#555;font-size:10px;text-transform:uppercase;font-weight:500;">Keyword</th>
            <th style="padding:6px 12px;text-align:right;color:#555;font-size:10px;text-transform:uppercase;font-weight:500;">Clicks</th>
            <th style="padding:6px 12px;text-align:right;color:#555;font-size:10px;text-transform:uppercase;font-weight:500;">Position</th>
            <th style="padding:6px 12px;text-align:right;color:#555;font-size:10px;text-transform:uppercase;font-weight:500;">Change</th>
          </tr>
        </thead>
        <tbody>${keywordRows}</tbody>
      </table>
      <p style="color:#555;font-size:11px;margin:10px 0 0 12px;">↑ = moved up &nbsp;↓ = moved down &nbsp;NEW = first time ranking</p>
    </div>

    <!-- Action Items -->
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:20px;margin-bottom:24px;">
      <h2 style="color:#fff;margin:0 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;">Action Items</h2>
      <ul style="margin:0;padding-left:20px;">
        ${actionRows}
      </ul>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:8px 0;">
      <p style="color:#444;font-size:11px;margin:0;">Automated report by <a href="https://axiondigital.com.au" style="color:#7B35CC;">Axion Digital</a> · Every Monday 8am AEST</p>
    </div>

  </div>
</body>
</html>`;
}

// ── Main Handler ──────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const auth = getOAuthClient();
    const [ga4, sc, leads] = await Promise.all([
      getGA4Data(auth),
      getSearchConsoleData(auth),
      getGHLLeads(),
    ]);

    const weekLabel = new Date().toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const html = buildEmailHtml(ga4, sc, leads, weekLabel);

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

    return NextResponse.json({ success: true, weekLabel, ga4, sc, leads });
  } catch (err) {
    console.error("Weekly report error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
