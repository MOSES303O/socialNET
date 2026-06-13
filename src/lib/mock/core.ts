import type {
  Kpi, BrandHealth, Mention, SeriesPoint, Alert, AlertRule, Influencer,
} from "@/lib/types";

/* ── KPIs (overview rail) ─────────────────────────────────────────── */
export const kpis: Kpi[] = [
  { id: "mentions", label: "Total mentions", value: "48.2K", delta: "+12.4%", intent: "positive", spark: [3, 3.5, 3.2, 4, 4.3, 5, 5.4, 6.1, 5.8, 7] },
  { id: "reach", label: "Est. reach", value: "12.4M", delta: "+8.1%", intent: "positive", spark: [4, 4.2, 4, 4.6, 4.4, 5, 5.3, 5.1, 5.8, 6] },
  { id: "engagement", label: "Engagement", value: "4.8%", delta: "+0.6pt", intent: "positive", spark: [3, 3.4, 3.2, 3.6, 3.5, 3.9, 4.1, 4.4, 4.6, 4.8] },
  { id: "positive", label: "Positive sent.", value: "62%", delta: "−4pt", intent: "warning", spark: [7, 6.8, 6.9, 6.6, 6.4, 6, 5.6, 6.1, 6.2, 6.2] },
  { id: "response", label: "Response rate", value: "87%", delta: "+5pt", intent: "positive", spark: [5, 5.5, 5.4, 6, 6.3, 6.8, 7.4, 8, 8.4, 8.7] },
];

export const brandHealth: BrandHealth = {
  score: 74,
  status: "AT RISK",
  intent: "warning",
  deltaLabel: "▼ 9 pts this week",
  drivers: [
    { label: "Negative sentiment surge", value: "+6pt", intent: "critical" },
    { label: "Viral post on X (@tech_maren)", value: "2.1M", intent: "warning" },
    { label: "New followers this week", value: "+18.4k", intent: "positive" },
  ],
};

/* ── Conversation volume series (total vs negative) ───────────────── */
const TOTAL = [1.1, 1.3, 1.2, 1.5, 1.4, 1.8, 2.1, 1.9, 2.3, 2.0, 2.4, 2.8, 3.1, 2.6, 2.9, 4.3, 3.9, 3.4, 4.1, 3.6, 3.2, 3.8, 4.4, 4.0, 3.7, 4.2, 4.9, 4.5, 5.1, 4.8];
const NEG = [0.2, 0.3, 0.2, 0.3, 0.3, 0.4, 0.5, 0.4, 0.5, 0.4, 0.5, 0.6, 0.7, 0.6, 0.7, 2.1, 1.6, 1.1, 0.9, 0.8, 0.7, 0.9, 1.0, 0.9, 0.8, 0.9, 1.1, 1.0, 1.2, 1.1];
const DAYS = ["May 14","May 15","May 16","May 17","May 18","May 19","May 20","May 21","May 22","May 23","May 24","May 25","May 26","May 27","May 28","May 29","May 30","May 31","Jun 1","Jun 2","Jun 3","Jun 4","Jun 5","Jun 6","Jun 7","Jun 8","Jun 9","Jun 10","Jun 11","Jun 12"];

export function mentionVolume(days: number): SeriesPoint[] {
  const start = Math.max(0, TOTAL.length - days);
  return TOTAL.slice(start).map((m, i) => ({
    date: DAYS[start + i],
    mentions: Math.round(m * 1000),
    positive: Math.round((m - NEG[start + i]) * 1000),
    negative: Math.round(NEG[start + i] * 1000),
  }));
}

export const sentimentDistribution = [
  { name: "Positive", value: 62, color: "var(--color-positive)" },
  { name: "Neutral", value: 24, color: "var(--color-neutral)" },
  { name: "Negative", value: 14, color: "var(--color-critical)" },
];

export const platformBreakdown = [
  { platform: "X / Twitter", mentions: 38, color: "#6366f1" },
  { platform: "Instagram", mentions: 24, color: "#a855f7" },
  { platform: "TikTok", mentions: 18, color: "#22d3ee" },
  { platform: "Reddit", mentions: 11, color: "#f97316" },
  { platform: "News / Web", mentions: 9, color: "#64748b" },
];

export const trends = [
  { rank: "01", term: "#VelaGlow", vol: "8.4k", change: "+218%", intent: "positive" as const },
  { rank: "02", term: "product recall", vol: "3.2k", change: "+320%", intent: "critical" as const },
  { rank: "03", term: "Vela Yuzu", vol: "2.9k", change: "+88%", intent: "positive" as const },
  { rank: "04", term: '"sugar content"', vol: "2.1k", change: "+64%", intent: "warning" as const },
];

export const hashtags = [
  { tag: "#VelaGlow", vol: "8,420", reach: "4.1M", change: "+218%", intent: "positive" as const, spark: [2, 2.4, 2.2, 3, 3.6, 4, 5.2] },
  { tag: "#YuzuSeason", vol: "5,210", reach: "2.2M", change: "+96%", intent: "positive" as const, spark: [1.5, 1.8, 2, 2.1, 2.6, 2.9, 3.1] },
  { tag: "#VelaXMaren", vol: "3,940", reach: "1.9M", change: "+140%", intent: "positive" as const, spark: [0.6, 0.9, 1.2, 1.5, 1.9, 2.3, 2.6] },
  { tag: "#WellnessDrink", vol: "2,680", reach: "1.1M", change: "+22%", intent: "positive" as const, spark: [1.6, 1.7, 1.7, 1.8, 1.9, 2, 2.1] },
  { tag: "#VelaRecall", vol: "1,980", reach: "2.8M", change: "+320%", intent: "critical" as const, spark: [0.3, 0.4, 0.5, 1, 2.2, 2.9, 3.3] },
];

/* Stacked weekly sentiment bars for analytics (14 weeks). */
export const sentimentBars = [62, 58, 64, 61, 66, 63, 60, 57, 59, 55, 42, 48, 54, 62].map((pos, i) => {
  const negArr = [14, 16, 12, 15, 11, 13, 15, 17, 16, 19, 38, 30, 22, 14];
  const neg = negArr[i];
  return { week: `W${i + 1}`, positive: pos, neutral: 100 - pos - neg, negative: neg };
});

export const platformComparison = [
  { platform: "X / Twitter", mentions: 38, engagement: 52 },
  { platform: "Instagram", mentions: 24, engagement: 31 },
  { platform: "TikTok", mentions: 18, engagement: 44 },
  { platform: "Reddit", mentions: 11, engagement: 9 },
  { platform: "News", mentions: 9, engagement: 6 },
];

export const influencers: Influencer[] = [
  { name: "Maren Cole", handle: "@tech_maren", platform: "X", followers: "418K", reach: "2.1M", sentiment: "positive", score: 94 },
  { name: "Sarah K", handle: "@sarah.k.wellness", platform: "TikTok", followers: "214K", reach: "680K", sentiment: "positive", score: 88 },
  { name: "Ava Glow", handle: "@glowwithava", platform: "IG", followers: "92K", reach: "410K", sentiment: "positive", score: 76 },
  { name: "Daily Health Nut", handle: "@dailyhealthnut", platform: "X", followers: "88K", reach: "320K", sentiment: "negative", score: 61 },
];

export const alerts: Alert[] = [
  { id: "a1", severity: "critical", type: "sentiment", title: "Negative sentiment spike", description: "Negative mentions rose +218% in a 6-hour window. Recall keyword driving the surge.", time: "14m ago", status: "active", metric: "+218%" },
  { id: "a2", severity: "warning", type: "viral", title: "Viral post detected", description: "@tech_maren post crossed 2M reach — 5.0x their follower base. Positive sentiment.", time: "38m ago", status: "active", metric: "2.1M" },
  { id: "a3", severity: "warning", type: "unanswered", title: "Unanswered high-priority", description: "37 high-priority mentions past SLA. Reddit recall thread among them.", time: "1h ago", status: "acknowledged", metric: "37 open" },
  { id: "a4", severity: "info", type: "influencer", title: "Influencer activity", description: "@dailyhealthnut (88K) posted a negative mention about sugar content.", time: "1h ago", status: "active", metric: "88K" },
  { id: "a5", severity: "info", type: "spike", title: "Mention volume threshold", description: "Hourly mentions exceeded 3,000 — 2.4x your normal baseline.", time: "2h ago", status: "resolved", metric: "+140%" },
];

export const alertRules: AlertRule[] = [
  { id: "r1", name: "Sentiment crash", condition: "Negative mentions +200% in 6h", channels: "In-app · SMS · Slack", on: true },
  { id: "r2", name: "Viral detection", condition: "Any post > 3.0x follower reach", channels: "In-app · Email", on: true },
  { id: "r3", name: "Crisis keyword", condition: '"recall" or "lawsuit" detected', channels: "In-app · SMS · Slack · Email", on: true },
  { id: "r4", name: "SLA breach", condition: "High-priority unanswered > 1h", channels: "In-app · Email", on: true },
  { id: "r5", name: "Competitor mention", condition: "Brand named with a competitor", channels: "In-app", on: false },
];

export const liveFeed = [
  { platform: "twitter", text: '"Vela Yuzu is genuinely the best drink I’ve had all year"', meta: "@tech_maren · X · 12.4K likes · 38m", sentiment: "positive" as const },
  { platform: "reddit", text: "Is the Vela recall rumor actually true? Seeing this everywhere", meta: "r/skincareaddiction · Reddit · 14m", sentiment: "negative" as const },
  { platform: "instagram", text: "Vela restock just dropped, run don’t walk", meta: "@glowwithava · Instagram · 21m", sentiment: "positive" as const },
  { platform: "news", text: "Vela raises $40M Series B to expand adaptogen line", meta: "TechCrunch · News · 1h", sentiment: "neutral" as const },
  { platform: "twitter", text: "why is there so much sugar in Vela tho", meta: "@dailyhealthnut · X · 1h", sentiment: "mixed" as const },
];
