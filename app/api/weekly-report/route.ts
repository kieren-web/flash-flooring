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

// ── Date helpers ──────────────────────────────────────────────────────────────

function fmt(d: Date) { return d.toISOString().split("T")[0]; }

function getDateRanges() {
  const today = new Date();
  // Search Console has ~3 day lag
  const scEnd = new Date(today); scEnd.setDate(scEnd.getDate() - 3);
  const scStart = new Date(scEnd); scStart.setDate(scStart.getDate() - 6);
  const scPrevEnd = new Date(scStart); scPrevEnd.setDate(scPrevEnd.getDate() - 1);
  const scPrevStart = new Date(scPrevEnd); scPrevStart.setDate(scPrevStart.getDate() - 6);

  const ga4End = new Date(today);
  const ga4Start = new Date(today); ga4Start.setDate(ga4Start.getDate() - 6);
  const ga4PrevStart = new Date(today); ga4PrevStart.setDate(ga4PrevStart.getDate() - 13);
  const ga4PrevEnd = new Date(today); ga4PrevEnd.setDate(ga4PrevEnd.getDate() - 7);

  return { scStart, scEnd, scPrevStart, scPrevEnd, ga4Start, ga4End, ga4PrevStart, ga4PrevEnd };
}

// ── GA4 ───────────────────────────────────────────────────────────────────────

async function getGA4Data(auth: ReturnType<typeof getOAuthClient>) {
  const client = google.analyticsdata({ version: "v1beta", auth });
  const property = `properties/${process.env.GA4_PROPERTY_ID}`;
  const { ga4Start, ga4End, ga4PrevStart, ga4PrevEnd } = getDateRanges();

  const [thisWeek, lastWeek, topPages, newVsReturning] = await Promise.all([
    // This week — full metrics breakdown by channel
    client.properties.runReport({
      property,
      requestBody: {
        dateRanges: [{ startDate: fmt(ga4Start), endDate: fmt(ga4End) }],
        metrics: [
          { name: "sessions" },
          { name: "activeUsers" },
          { name: "screenPageViews" },
          { name: "engagementRate" },
          { name: "bounceRate" },
          { name: "averageSessionDuration" },
          { name: "newUsers" },
        ],
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
      },
    }),
    // Last week — totals only for comparison
    client.properties.runReport({
      property,
      requestBody: {
        dateRanges: [{ startDate: fmt(ga4PrevStart), endDate: fmt(ga4PrevEnd) }],
        metrics: [
          { name: "sessions" },
          { name: "activeUsers" },
          { name: "screenPageViews" },
          { name: "engagementRate" },
          { name: "bounceRate" },
          { name: "averageSessionDuration" },
          { name: "newUsers" },
        ],
      },
    }),
    // Top pages this week
    client.properties.runReport({
      property,
      requestBody: {
        dateRanges: [{ startDate: fmt(ga4Start), endDate: fmt(ga4End) }],
        metrics: [{ name: "screenPageViews" }, { name: "sessions" }],
        dimensions: [{ name: "pagePath" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: "8",
      },
    }),
    // New vs returning
    client.properties.runReport({
      property,
      requestBody: {
        dateRanges: [{ startDate: fmt(ga4Start), endDate: fmt(ga4End) }],
        metrics: [{ name: "sessions" }, { name: "activeUsers" }],
        dimensions: [{ name: "newVsReturning" }],
      },
    }),
  ]);

  // Aggregate this week totals across all channels
  let totalSessions = 0, totalUsers = 0, totalPageViews = 0, totalNewUsers = 0;
  let weightedEngagement = 0, weightedBounce = 0, weightedDuration = 0;
  const channelBreakdown: Record<string, number> = {};

  (thisWeek.data.rows || []).forEach(row => {
    const ch = row.dimensionValues?.[0]?.value || "Other";
    const s  = parseInt(row.metricValues?.[0]?.value || "0");
    const u  = parseInt(row.metricValues?.[1]?.value || "0");
    const pv = parseInt(row.metricValues?.[2]?.value || "0");
    const er = parseFloat(row.metricValues?.[3]?.value || "0");
    const br = parseFloat(row.metricValues?.[4]?.value || "0");
    const sd = parseFloat(row.metricValues?.[5]?.value || "0");
    const nu = parseInt(row.metricValues?.[6]?.value || "0");

    totalSessions  += s;
    totalUsers     += u;
    totalPageViews += pv;
    totalNewUsers  += nu;
    weightedEngagement += er * s;
    weightedBounce     += br * s;
    weightedDuration   += sd * s;
    channelBreakdown[ch] = s;
  });

  const engagementRate  = totalSessions > 0 ? (weightedEngagement / totalSessions) * 100 : 0;
  const bounceRate      = totalSessions > 0 ? (weightedBounce / totalSessions) * 100 : 0;
  const avgDurationSec  = totalSessions > 0 ? weightedDuration / totalSessions : 0;
  const avgDuration     = `${Math.floor(avgDurationSec / 60)}m ${Math.round(avgDurationSec % 60)}s`;
  const returningUsers  = totalUsers - totalNewUsers;

  // Last week totals
  let lwSessions = 0, lwUsers = 0, lwPageViews = 0, lwNewUsers = 0;
  let lwWeightedEng = 0, lwWeightedBounce = 0, lwWeightedDur = 0;
  (lastWeek.data.rows || []).forEach(row => {
    const s  = parseInt(row.metricValues?.[0]?.value || "0");
    const u  = parseInt(row.metricValues?.[1]?.value || "0");
    const pv = parseInt(row.metricValues?.[2]?.value || "0");
    const er = parseFloat(row.metricValues?.[3]?.value || "0");
    const br = parseFloat(row.metricValues?.[4]?.value || "0");
    const sd = parseFloat(row.metricValues?.[5]?.value || "0");
    const nu = parseInt(row.metricValues?.[6]?.value || "0");
    lwSessions += s; lwUsers += u; lwPageViews += pv; lwNewUsers += nu;
    lwWeightedEng += er * s; lwWeightedBounce += br * s; lwWeightedDur += sd * s;
  });

  const lwEngagementRate = lwSessions > 0 ? (lwWeightedEng / lwSessions) * 100 : 0;
  const lwBounceRate     = lwSessions > 0 ? (lwWeightedBounce / lwSessions) * 100 : 0;
  const lwAvgDuration    = lwSessions > 0 ? lwWeightedDur / lwSessions : 0;

  // % changes
  const pct = (now: number, prev: number) => prev > 0 ? Math.round(((now - prev) / prev) * 100) : 0;
  const sessionChange    = pct(totalSessions, lwSessions);
  const pageViewChange   = pct(totalPageViews, lwPageViews);
  const userChange       = pct(totalUsers, lwUsers);
  const newUserChange    = pct(totalNewUsers, lwNewUsers);
  const engChange        = Math.round(engagementRate - lwEngagementRate);
  const bounceChange     = Math.round(bounceRate - lwBounceRate);
  const durationChange   = Math.round(avgDurationSec - lwAvgDuration);

  // Top pages
  const topPagesList = (topPages.data.rows || []).map(row => ({
    path: row.dimensionValues?.[0]?.value || "/",
    views: parseInt(row.metricValues?.[0]?.value || "0"),
    sessions: parseInt(row.metricValues?.[1]?.value || "0"),
  }));

  // New vs returning
  let newSessions = 0, returningSessions = 0;
  (newVsReturning.data.rows || []).forEach(row => {
    const type = row.dimensionValues?.[0]?.value || "";
    const s = parseInt(row.metricValues?.[0]?.value || "0");
    if (type === "new") newSessions = s;
    else returningSessions = s;
  });

  return {
    totalSessions, totalUsers, totalPageViews, totalNewUsers, returningUsers,
    channelBreakdown, engagementRate, bounceRate, avgDuration, avgDurationSec,
    sessionChange, pageViewChange, userChange, newUserChange,
    engChange, bounceChange, durationChange,
    topPagesList, newSessions, returningSessions,
    lastWeekSessions: lwSessions, lastWeekUsers: lwUsers, lastWeekPageViews: lwPageViews,
  };
}

// ── Search Console ────────────────────────────────────────────────────────────

interface KeywordRow { query: string; clicks: number; impressions: number; position: number; }

async function getSearchConsoleData(auth: ReturnType<typeof getOAuthClient>) {
  const sc = google.searchconsole({ version: "v1", auth });
  const siteUrl = process.env.SEARCH_CONSOLE_SITE_URL!;
  const { scStart, scEnd, scPrevStart, scPrevEnd } = getDateRanges();

  const [thisWeek, lastWeek, overview, prevOverview] = await Promise.all([
    sc.searchanalytics.query({
      siteUrl,
      requestBody: { startDate: fmt(scStart), endDate: fmt(scEnd), dimensions: ["query"], rowLimit: 10 },
    }),
    sc.searchanalytics.query({
      siteUrl,
      requestBody: { startDate: fmt(scPrevStart), endDate: fmt(scPrevEnd), dimensions: ["query"], rowLimit: 10 },
    }),
    sc.searchanalytics.query({
      siteUrl,
      requestBody: { startDate: fmt(scStart), endDate: fmt(scEnd), dimensions: [] },
    }),
    sc.searchanalytics.query({
      siteUrl,
      requestBody: { startDate: fmt(scPrevStart), endDate: fmt(scPrevEnd), dimensions: [] },
    }),
  ]);

  const lastWeekPositions: Record<string, number> = {};
  (lastWeek.data.rows || []).forEach(r => {
    const q = r.keys?.[0] || "";
    lastWeekPositions[q] = r.position || 0;
  });

  const keywords: (KeywordRow & { prevPosition: number | null; change: number | null })[] =
    (thisWeek.data.rows || []).map(r => {
      const query = r.keys?.[0] || "";
      const position = r.position || 0;
      const prevPosition = lastWeekPositions[query] ?? null;
      const change = prevPosition !== null ? Math.round((prevPosition - position) * 10) / 10 : null;
      return { query, clicks: Math.round(r.clicks || 0), impressions: Math.round(r.impressions || 0), position, prevPosition, change };
    });

  const row = overview.data.rows?.[0];
  const prevRow = prevOverview.data.rows?.[0];
  const clicks = Math.round(row?.clicks || 0);
  const impressions = Math.round(row?.impressions || 0);
  const avgPosition = row?.position ? parseFloat(row.position.toFixed(1)) : 0;
  const ctr = row?.ctr ? (row.ctr * 100).toFixed(1) + "%" : "0%";
  const prevImpressions = Math.round(prevRow?.impressions || 0);
  const prevAvgPosition = prevRow?.position ? parseFloat(prevRow.position.toFixed(1)) : 0;
  const impressionChange = prevImpressions > 0
    ? Math.round(((impressions - prevImpressions) / prevImpressions) * 100) : 0;
  const positionChange = prevAvgPosition > 0
    ? Math.round((prevAvgPosition - avgPosition) * 10) / 10 : 0;

  return { clicks, impressions, avgPosition, ctr, keywords, impressionChange, positionChange, prevAvgPosition };
}

// ── GHL Leads ─────────────────────────────────────────────────────────────────

async function getGHLLeads() {
  try {
    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    if (!apiKey || !locationId) return { thisWeek: 0, lastWeek: 0 };

    const now = Date.now();
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const twoWeeksAgo = now - 14 * 24 * 60 * 60 * 1000;
    const headers = { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" };

    const [thisRes, lastRes] = await Promise.all([
      fetch(`https://services.leadconnectorhq.com/contacts/?locationId=${locationId}&startDate=${weekAgo}&endDate=${now}&limit=100`, { headers }),
      fetch(`https://services.leadconnectorhq.com/contacts/?locationId=${locationId}&startDate=${twoWeeksAgo}&endDate=${weekAgo}&limit=100`, { headers }),
    ]);

    const [thisData, lastData] = await Promise.all([thisRes.json(), lastRes.json()]);
    return { thisWeek: thisData?.contacts?.length || 0, lastWeek: lastData?.contacts?.length || 0 };
  } catch {
    return { thisWeek: 0, lastWeek: 0 };
  }
}

// ── Narrative Summary ─────────────────────────────────────────────────────────

function generateSummary(
  ga4: Awaited<ReturnType<typeof getGA4Data>>,
  sc: Awaited<ReturnType<typeof getSearchConsoleData>>,
  leads: Awaited<ReturnType<typeof getGHLLeads>>
): string {
  const parts: string[] = [];

  // Traffic
  if (ga4.sessionChange > 20) parts.push(`Website traffic is up <strong>${ga4.sessionChange}%</strong> this week — strong growth.`);
  else if (ga4.sessionChange > 0) parts.push(`Website traffic is up <strong>${ga4.sessionChange}%</strong> this week.`);
  else if (ga4.sessionChange < -20) parts.push(`Website traffic dropped <strong>${Math.abs(ga4.sessionChange)}%</strong> this week — worth monitoring.`);
  else if (ga4.sessionChange < 0) parts.push(`Website traffic is slightly down <strong>${Math.abs(ga4.sessionChange)}%</strong> vs last week.`);
  else parts.push(`Website traffic is steady this week.`);

  // Page views
  if (ga4.pageViewChange > 0) parts.push(`Pages viewed are up <strong>${ga4.pageViewChange}%</strong> (${ga4.totalPageViews} total).`);
  else if (ga4.pageViewChange < 0) parts.push(`Pages viewed are down <strong>${Math.abs(ga4.pageViewChange)}%</strong> (${ga4.totalPageViews} total).`);

  // Engagement
  if (ga4.engagementRate >= 60) parts.push(`Engagement rate is strong at <strong>${ga4.engagementRate.toFixed(0)}%</strong> — visitors are spending meaningful time on site.`);
  else if (ga4.engagementRate < 40) parts.push(`Engagement rate is <strong>${ga4.engagementRate.toFixed(0)}%</strong> — may be worth reviewing page content and load speed.`);

  // Rankings
  if (sc.positionChange > 2) parts.push(`Google rankings improved by <strong>${sc.positionChange} positions</strong> on average — site is climbing.`);
  else if (sc.positionChange > 0) parts.push(`Average Google ranking improved slightly by <strong>${sc.positionChange} positions</strong>.`);
  else if (sc.positionChange < -2) parts.push(`Average ranking dropped <strong>${Math.abs(sc.positionChange)} positions</strong> — check for any new competitors.`);
  else parts.push(`Rankings are holding steady at around position <strong>${sc.avgPosition}</strong>.`);

  // Impressions
  if (sc.impressionChange > 10) parts.push(`Impressions are up <strong>${sc.impressionChange}%</strong> — Google is showing the site to more people.`);
  else if (sc.impressionChange < -10) parts.push(`Impressions dropped <strong>${Math.abs(sc.impressionChange)}%</strong> this week.`);

  // Leads
  if (leads.thisWeek > 0) parts.push(`<strong>${leads.thisWeek} new lead${leads.thisWeek > 1 ? "s" : ""}</strong> came through the website this week.`);
  else parts.push(`No new website leads this week.`);

  // Moving keywords
  const improving = sc.keywords.filter(k => k.change !== null && k.change > 1);
  if (improving.length > 0) {
    const top = improving[0];
    parts.push(`"${top.query}" moved up <strong>${top.change} positions</strong> to #${top.position.toFixed(0)}.`);
  }

  return parts.join(" ");
}

// ── Email HTML ────────────────────────────────────────────────────────────────

function arrow(change: number) { return change >= 0 ? "▲" : "▼"; }
function clr(change: number, invertGood = false) {
  const good = invertGood ? change <= 0 : change >= 0;
  return good ? "#4ade80" : "#f87171";
}

function statCell(label: string, value: string, change: number | null, suffix = "%", invertGood = false) {
  const changeStr = change !== null
    ? `<p style="color:${clr(change, invertGood)};margin:0;font-size:11px;">${arrow(change)} ${Math.abs(change)}${suffix} vs last wk</p>`
    : `<p style="margin:0;font-size:11px;color:#555;">—</p>`;
  return `<td width="25%" style="background:#1c1c1c;border:1px solid #2e2e2e;border-radius:10px;padding:14px;text-align:center;vertical-align:top;">
    <p style="color:#9CA3AF;margin:0 0 4px;font-size:10px;text-transform:uppercase;letter-spacing:0.06em;">${label}</p>
    <p style="color:#fff;margin:0 0 4px;font-size:20px;font-weight:800;">${value}</p>
    ${changeStr}
  </td>`;
}

function buildEmailHtml(
  ga4: Awaited<ReturnType<typeof getGA4Data>>,
  sc: Awaited<ReturnType<typeof getSearchConsoleData>>,
  leads: Awaited<ReturnType<typeof getGHLLeads>>,
  summary: string,
  weekLabel: string
) {
  const clientName = process.env.CLIENT_NAME || "Client";
  const domain = (process.env.SEARCH_CONSOLE_SITE_URL || "").replace("sc-domain:", "").replace(/\/$/, "");

  const channelRows = Object.entries(ga4.channelBreakdown)
    .sort((a, b) => b[1] - a[1])
    .map(([ch, sessions]) => `
      <tr>
        <td style="padding:7px 12px;border-bottom:1px solid #2a2a2a;color:#ccc;font-size:13px;">${ch}</td>
        <td style="padding:7px 12px;border-bottom:1px solid #2a2a2a;color:#fff;text-align:right;font-size:13px;">${sessions} sessions</td>
      </tr>`).join("");

  const keywordRows = sc.keywords.slice(0, 8).map(k => {
    const changeStr = k.change === null
      ? `<span style="color:#666;font-size:11px;">new</span>`
      : k.change > 0
        ? `<span style="color:#4ade80;font-size:11px;">▲ ${k.change}</span>`
        : k.change < 0
          ? `<span style="color:#f87171;font-size:11px;">▼ ${Math.abs(k.change)}</span>`
          : `<span style="color:#666;font-size:11px;">—</span>`;
    return `
      <tr>
        <td style="padding:7px 12px;border-bottom:1px solid #2a2a2a;color:#ccc;font-size:12px;">${k.query}</td>
        <td style="padding:7px 12px;border-bottom:1px solid #2a2a2a;color:#C9A870;text-align:center;font-size:13px;font-weight:700;">#${k.position.toFixed(0)}</td>
        <td style="padding:7px 12px;border-bottom:1px solid #2a2a2a;text-align:center;">${changeStr}</td>
        <td style="padding:7px 12px;border-bottom:1px solid #2a2a2a;color:#888;text-align:right;font-size:12px;">${k.impressions} imp</td>
      </tr>`;
  }).join("");

  const topPageRows = ga4.topPagesList.map(p => {
    const label = p.path === "/" ? "Homepage" : p.path.replace(/\/$/, "").split("/").pop()?.replace(/-/g, " ") || p.path;
    return `
      <tr>
        <td style="padding:7px 12px;border-bottom:1px solid #2a2a2a;color:#ccc;font-size:12px;">${label}<span style="color:#555;font-size:10px;margin-left:6px;">${p.path}</span></td>
        <td style="padding:7px 12px;border-bottom:1px solid #2a2a2a;color:#fff;text-align:right;font-size:13px;font-weight:600;">${p.views}</td>
      </tr>`;
  }).join("");

  const newPct = ga4.newSessions + ga4.returningSessions > 0
    ? Math.round((ga4.newSessions / (ga4.newSessions + ga4.returningSessions)) * 100) : 0;
  const retPct = 100 - newPct;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:Inter,Arial,sans-serif;">
<div style="max-width:640px;margin:0 auto;padding:28px 16px;">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#7B35CC,#D4187A,#F05A28);border-radius:14px;padding:28px 24px;margin-bottom:20px;">
    <p style="color:rgba(255,255,255,0.75);margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Weekly Performance Report</p>
    <h1 style="color:#fff;margin:0 0 4px;font-size:24px;font-weight:800;">${clientName}</h1>
    <p style="color:rgba(255,255,255,0.65);margin:0;font-size:13px;">${weekLabel} · ${domain}</p>
  </div>

  <!-- Summary -->
  <div style="background:#1c1c1c;border:1px solid #2e2e2e;border-left:3px solid #7B35CC;border-radius:10px;padding:18px 20px;margin-bottom:16px;">
    <p style="color:#9CA3AF;margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;">This Week's Summary</p>
    <p style="color:#e5e5e5;margin:0;font-size:14px;line-height:1.7;">${summary}</p>
  </div>

  <!-- Traffic stats row 1: Sessions, Page Views, Users, Leads -->
  <p style="color:#666;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Traffic Overview</p>
  <table width="100%" cellpadding="0" cellspacing="6" style="margin-bottom:6px;">
    <tr>
      ${statCell("Sessions", String(ga4.totalSessions), ga4.sessionChange)}
      ${statCell("Page Views", String(ga4.totalPageViews), ga4.pageViewChange)}
      ${statCell("Visitors", String(ga4.totalUsers), ga4.userChange)}
      ${statCell("Leads", String(leads.thisWeek), leads.thisWeek - leads.lastWeek, " from last wk")}
    </tr>
  </table>

  <!-- Traffic stats row 2: Engagement, Bounce, Avg Duration, New Users -->
  <table width="100%" cellpadding="0" cellspacing="6" style="margin-bottom:16px;">
    <tr>
      ${statCell("Engagement", ga4.engagementRate.toFixed(0) + "%", ga4.engChange, "pp")}
      ${statCell("Bounce Rate", ga4.bounceRate.toFixed(0) + "%", ga4.bounceChange, "pp", true)}
      ${statCell("Avg Duration", ga4.avgDuration, ga4.durationChange, "s")}
      ${statCell("New Visitors", String(ga4.totalNewUsers), ga4.newUserChange)}
    </tr>
  </table>

  <!-- New vs Returning -->
  <div style="background:#1c1c1c;border:1px solid #2e2e2e;border-radius:10px;padding:18px 20px;margin-bottom:16px;">
    <p style="color:#fff;margin:0 0 14px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">New vs Returning Visitors</p>
    <!-- Bar -->
    <div style="background:#2a2a2a;border-radius:4px;overflow:hidden;height:10px;margin-bottom:10px;">
      <div style="background:linear-gradient(135deg,#7B35CC,#D4187A);height:10px;width:${newPct}%;float:left;"></div>
      <div style="background:#2a4a2a;height:10px;width:${retPct}%;float:left;"></div>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="color:#ccc;font-size:13px;"><span style="display:inline-block;width:10px;height:10px;background:linear-gradient(135deg,#7B35CC,#D4187A);border-radius:2px;margin-right:6px;vertical-align:middle;"></span>New — ${ga4.newSessions} sessions (${newPct}%)</td>
        <td style="color:#ccc;font-size:13px;text-align:right;"><span style="display:inline-block;width:10px;height:10px;background:#2a4a2a;border:1px solid #4ade80;border-radius:2px;margin-right:6px;vertical-align:middle;"></span>Returning — ${ga4.returningSessions} sessions (${retPct}%)</td>
      </tr>
    </table>
  </div>

  <!-- Top pages -->
  <div style="background:#1c1c1c;border:1px solid #2e2e2e;border-radius:10px;padding:18px 20px;margin-bottom:16px;">
    <p style="color:#fff;margin:0 0 14px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Top Pages <span style="color:#666;font-size:11px;font-weight:400;text-transform:none;">by page views</span></p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          <th style="padding:6px 12px;text-align:left;color:#555;font-size:10px;text-transform:uppercase;">Page</th>
          <th style="padding:6px 12px;text-align:right;color:#555;font-size:10px;text-transform:uppercase;">Views</th>
        </tr>
      </thead>
      <tbody>${topPageRows}</tbody>
    </table>
  </div>

  <!-- Keyword rankings -->
  <div style="background:#1c1c1c;border:1px solid #2e2e2e;border-radius:10px;padding:18px 20px;margin-bottom:16px;">
    <p style="color:#fff;margin:0 0 14px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Keyword Rankings <span style="color:#666;font-size:11px;font-weight:400;text-transform:none;">vs last week</span></p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          <th style="padding:6px 12px;text-align:left;color:#555;font-size:10px;text-transform:uppercase;">Keyword</th>
          <th style="padding:6px 12px;text-align:center;color:#555;font-size:10px;text-transform:uppercase;">Rank</th>
          <th style="padding:6px 12px;text-align:center;color:#555;font-size:10px;text-transform:uppercase;">Change</th>
          <th style="padding:6px 12px;text-align:right;color:#555;font-size:10px;text-transform:uppercase;">Impressions</th>
        </tr>
      </thead>
      <tbody>${keywordRows}</tbody>
    </table>
  </div>

  <!-- Search Console overview -->
  <table width="100%" cellpadding="0" cellspacing="6" style="margin-bottom:16px;">
    <tr>
      ${statCell("SC Impressions", String(sc.impressions), sc.impressionChange)}
      ${statCell("SC Clicks", String(sc.clicks), null)}
      ${statCell("Avg Position", "#" + sc.avgPosition, sc.positionChange, " pos", true)}
      ${statCell("Click-Through", sc.ctr, null)}
    </tr>
  </table>

  <!-- Traffic sources -->
  <div style="background:#1c1c1c;border:1px solid #2e2e2e;border-radius:10px;padding:18px 20px;margin-bottom:16px;">
    <p style="color:#fff;margin:0 0 14px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Traffic Sources</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tbody>${channelRows}</tbody>
    </table>
  </div>

  <!-- Footer -->
  <div style="text-align:center;padding:16px 0 8px;">
    <p style="color:#444;font-size:11px;margin:0;">Automated weekly report by <a href="https://axiondigital.com.au" style="color:#7B35CC;text-decoration:none;">Axion Digital</a> · Every Monday 8am AEST</p>
    <p style="color:#333;font-size:10px;margin:6px 0 0;">Reply to this email to reach Kieren · kieren@axiondigital.com.au</p>
  </div>

</div>
</body>
</html>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const auth = getOAuthClient();
    const [ga4, sc, leads] = await Promise.all([
      getGA4Data(auth),
      getSearchConsoleData(auth),
      getGHLLeads(),
    ]);

    const weekLabel = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
    const summary = generateSummary(ga4, sc, leads);
    const html = buildEmailHtml(ga4, sc, leads, summary, weekLabel);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.REPORTING_GMAIL, pass: process.env.GMAIL_APP_PASSWORD },
    });

    await transporter.sendMail({
      from: `"Axion Digital Reporting" <${process.env.REPORTING_GMAIL}>`,
      to: process.env.REPORT_EMAIL_TO || "kieren@axiondigital.com.au",
      subject: `${process.env.CLIENT_NAME} — Weekly Report · ${weekLabel}`,
      html,
    });

    return NextResponse.json({ success: true, weekLabel, summary, ga4, sc, leads });
  } catch (err) {
    console.error("Weekly report error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
