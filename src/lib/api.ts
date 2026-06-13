// ─────────────────────────────────────────────────────────────────────────────
// API seam — the ONLY place the UI reads data. Each function returns mock data
// after a simulated delay and is annotated with the Django REST endpoint it
// should eventually call. Replace each body with a `fetch()`; signatures and the
// types in src/lib/types.ts stay identical, so no component changes.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  Kpi, BrandHealth, Mention, SeriesPoint, Alert, AlertRule, Report,
  Crisis, ChatMessage, PostAnalysis, TeamUser, Integration, AuditLog, Influencer, DateRange,
} from "@/lib/types";

import {
  kpis, brandHealth, mentionVolume, sentimentDistribution, platformBreakdown,
  trends, hashtags, sentimentBars, platformComparison, influencers, alerts,
  alertRules, liveFeed,
} from "@/lib/mock/core";
import { mentions } from "@/lib/mock/mentions";
import { crises } from "@/lib/mock/crisis";
import { mockAssistantReply, samplePostAnalysis } from "@/lib/mock/ai";
import { team, integrations, auditLogs } from "@/lib/mock/admin";
import { reports, reportTypes, scheduledReports } from "@/lib/mock/reports";

const LATENCY = 320;
const delay = <T,>(v: T, ms = LATENCY): Promise<T> =>
  new Promise((r) => setTimeout(() => r(JSON.parse(JSON.stringify(v))), ms));

const rangeDays: Record<DateRange, number> = { today: 8, "7d": 14, "30d": 30, "90d": 30, custom: 30 };

/* Overview */
export const getKpis = () => delay(kpis);
export const getBrandHealth = (): Promise<BrandHealth> => delay(brandHealth);
export const getMentionVolume = (range: DateRange = "7d") => delay(mentionVolume(rangeDays[range]));
export const getSentimentDistribution = () => delay(sentimentDistribution);
export const getPlatformBreakdown = () => delay(platformBreakdown);
export const getTrends = () => delay(trends);
export const getLiveFeed = () => delay(liveFeed);

/* Analytics */
export const getHashtags = () => delay(hashtags);
export const getSentimentBars = () => delay(sentimentBars);
export const getPlatformComparison = () => delay(platformComparison);
export const getInfluencers = (): Promise<Influencer[]> => delay(influencers);

export function getEngagementSeries(range: DateRange = "7d"): Promise<SeriesPoint[]> {
  const v = [58, 62, 60, 68, 65, 74, 82, 78, 88, 84, 92, 101, 110, 96, 104, 150, 140, 124, 138, 128, 118, 132, 150, 142, 134, 146, 168, 158, 176, 170];
  const days = rangeDays[range];
  const vol = mentionVolume(days);
  return delay(vol.map((p, i) => ({ date: p.date, interactions: v[v.length - vol.length + i] * 1000 })));
}

/* Mentions */
export const getMentions = (): Promise<Mention[]> => delay(mentions);

/* Alerts */
export const getAlerts = (): Promise<Alert[]> => delay(alerts);
export const getAlertRules = (): Promise<AlertRule[]> => delay(alertRules);

/* Crisis */
export const getCrises = (): Promise<Crisis[]> => delay(crises);

/* AI */
export const askAssistant = (prompt: string): Promise<ChatMessage> => delay(mockAssistantReply(prompt), 750);
export const analyzePost = (url: string): Promise<PostAnalysis> => delay({ ...samplePostAnalysis, url: url || samplePostAnalysis.url }, 1100);

/* Reports */
export const getReports = (): Promise<Report[]> => delay(reports);
export const getReportTypes = () => delay(reportTypes);
export const getScheduledReports = () => delay(scheduledReports);

/* Admin */
export const getTeam = (): Promise<TeamUser[]> => delay(team);
export const getIntegrations = (): Promise<Integration[]> => delay(integrations);
export const getAuditLogs = (): Promise<AuditLog[]> => delay(auditLogs);
