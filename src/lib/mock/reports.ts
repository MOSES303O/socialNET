import type { Report } from "@/lib/types";

export const reportTypes = [
  { title: "Daily summary", desc: "Volume, sentiment & top mentions for the last 24h.", meta: "Auto · 8:00 AM", type: "daily" as const },
  { title: "Weekly performance", desc: "Engagement, growth & platform breakdown.", meta: "Auto · Mondays", type: "weekly" as const },
  { title: "Monthly executive", desc: "Brand health, KPIs & recommendations.", meta: "Auto · 1st", type: "monthly" as const },
  { title: "Campaign report", desc: "Full analysis scoped to a campaign or hashtag.", meta: "On demand", type: "campaign" as const },
];

export const reports: Report[] = [
  { id: "r1", title: "Monthly Executive — May 2026", type: "monthly", period: "May 1–31", generated: "Jun 1, 9:00 AM", status: "ready" },
  { id: "r2", title: "#VelaGlow Campaign Recap", type: "campaign", period: "May 14 – Jun 12", generated: "Jun 12, 7:30 AM", status: "ready" },
  { id: "r3", title: "Weekly Performance — W23", type: "weekly", period: "Jun 2–8", generated: "Jun 9, 8:00 AM", status: "ready" },
  { id: "r4", title: "Crisis Debrief — Recall Rumor", type: "incident", period: "Jun 5–12", generated: "Generating…", status: "processing" },
  { id: "r5", title: "Daily Summary — Jun 11", type: "daily", period: "Jun 11", generated: "Jun 12, 8:00 AM", status: "ready" },
];

export const scheduledReports = [
  { id: "s1", name: "Monthly Executive", freq: "Monthly · 1st · 9:00 AM", recipients: "Leadership (4)", on: true },
  { id: "s2", name: "Weekly Performance", freq: "Weekly · Mon · 8:00 AM", recipients: "Marketing (8)", on: true },
  { id: "s3", name: "Daily Summary", freq: "Daily · 8:00 AM", recipients: "You", on: true },
];
