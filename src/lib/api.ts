// ─────────────────────────────────────────────────────────────────────────────
// API seam — the ONLY place the UI reads data. Every function calls the Django
// REST backend in ../../backend. Signatures and the types in src/lib/types.ts
// are unchanged from the mock-data version, so no component changes are needed.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  Kpi, BrandHealth, Mention, SeriesPoint, Alert, AlertRule, Report, ReportType, ScheduledReport,
  Crisis, ChatMessage, PostAnalysis, TeamUser, Integration, AuditLog, Influencer, DateRange,
  SentimentSlice, PlatformStat, Trend, LiveFeedItem, Hashtag, SentimentBar, PlatformComparisonRow,
} from "@/lib/types";

// Same-origin by default — next.config.mjs rewrites /api/* to the Django
// backend server-side, so the browser never makes a cross-port request.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

/* Overview */
export const getKpis = (): Promise<Kpi[]> => getJson("/kpis");
export const getBrandHealth = (): Promise<BrandHealth> => getJson("/brand-health");
export const getMentionVolume = (range: DateRange = "7d") => getJson<SeriesPoint[]>(`/mention-volume?range=${range}`);
export const getSentimentDistribution = () => getJson<SentimentSlice[]>("/sentiment-distribution");
export const getPlatformBreakdown = () => getJson<PlatformStat[]>("/platform-breakdown");
export const getTrends = () => getJson<Trend[]>("/trends");
export const getLiveFeed = () => getJson<LiveFeedItem[]>("/live-feed");

/* Analytics */
export const getHashtags = () => getJson<Hashtag[]>("/hashtags");
export const getSentimentBars = () => getJson<SentimentBar[]>("/sentiment-bars");
export const getPlatformComparison = () => getJson<PlatformComparisonRow[]>("/platform-comparison");
export const getInfluencers = (): Promise<Influencer[]> => getJson("/influencers");
export const getEngagementSeries = (range: DateRange = "7d") => getJson<SeriesPoint[]>(`/engagement-series?range=${range}`);

/* Mentions */
export const getMentions = (): Promise<Mention[]> => getJson("/mentions");

/* Alerts */
export const getAlerts = (): Promise<Alert[]> => getJson("/alerts");
export const getAlertRules = (): Promise<AlertRule[]> => getJson("/alert-rules");

/* Crisis */
export const getCrises = (): Promise<Crisis[]> => getJson("/crises");

/* AI */
export const askAssistant = (prompt: string): Promise<ChatMessage> => postJson("/assistant", { prompt });
export const analyzePost = (url: string): Promise<PostAnalysis> => postJson("/post-analysis", { url });

/* Reports */
export const getReports = (): Promise<Report[]> => getJson("/reports");
export const getReportTypes = () => getJson<ReportType[]>("/report-types");
export const getScheduledReports = () => getJson<ScheduledReport[]>("/scheduled-reports");

/* Admin */
export const getTeam = (): Promise<TeamUser[]> => getJson("/team");
export const getIntegrations = (): Promise<Integration[]> => getJson("/integrations");
export const getAuditLogs = (): Promise<AuditLog[]> => getJson("/audit-logs");
