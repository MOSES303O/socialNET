import type { TeamUser, Integration, AuditLog } from "@/lib/types";

export const currentUser = {
  name: "Ochiengs Moses",
  role: "Brand Reputation",
  email: "ochiengs@vela.co",
  initials: "OM",
  team: "Vela — Brand & Comms",
};

export const team: TeamUser[] = [
  { id: "u1", name: "Ochiengs Moses", email: "ochiengs@vela.co", initials: "OM", color: "#6366f1", role: "admin", status: "active", lastActive: "now" },
  { id: "u2", name: "Marcus Lee", email: "marcus@vela.co", initials: "ML", color: "#a855f7", role: "analyst", status: "active", lastActive: "12m ago" },
  { id: "u3", name: "Dana Ortiz", email: "dana@vela.co", initials: "DO", color: "#f59e0b", role: "community", status: "active", lastActive: "1h ago" },
  { id: "u4", name: "Sam Reyes", email: "sam@vela.co", initials: "SR", color: "#22c55e", role: "executive", status: "active", lastActive: "3h ago" },
  { id: "u5", name: "Jordan Pike", email: "jordan@vela.co", initials: "JP", color: "#64748b", role: "analyst", status: "invited", lastActive: "pending" },
];

export const integrations: Integration[] = [
  { id: "i1", platform: "twitter", name: "X / Twitter", account: "2 accounts", status: "connected", detail: "synced 2m ago" },
  { id: "i2", platform: "instagram", name: "Instagram", account: "@drinkvela", status: "connected", detail: "synced 4m ago" },
  { id: "i3", platform: "tiktok", name: "TikTok", account: "@vela", status: "connected", detail: "synced 6m ago" },
  { id: "i4", platform: "reddit", name: "Reddit", account: "Keyword tracking", status: "connected", detail: "active" },
  { id: "i5", platform: "youtube", name: "YouTube", account: "Vela", status: "error", detail: "Token expired · reconnect" },
  { id: "i6", platform: "linkedin", name: "LinkedIn", account: "—", status: "disconnected", detail: "Connect to track mentions" },
];

export const auditLogs: AuditLog[] = [
  { id: "l1", who: "Ochiengs Moses", initials: "PA", color: "#6366f1", action: "approved holding statement", target: "Crisis #C-2291", category: "config", time: "17:10 · Yesterday" },
  { id: "l2", who: "Marcus Lee", initials: "ML", color: "#a855f7", action: "changed alert threshold", target: "Sentiment crash rule", category: "config", time: "15:02 · Yesterday" },
  { id: "l3", who: "System", initials: "SY", color: "#64748b", action: "auto-escalated incident", target: "Recall rumor", category: "system", time: "15:05 · Yesterday" },
  { id: "l4", who: "Dana Ortiz", initials: "DO", color: "#f59e0b", action: "resolved mention", target: "@cafe_lumen", category: "data", time: "11:20 · Yesterday" },
  { id: "l5", who: "Ochiengs Moses", initials: "PA", color: "#6366f1", action: "invited user", target: "jordan@vela.co", category: "user", time: "09:44 · Yesterday" },
  { id: "l6", who: "Sam Reyes", initials: "SR", color: "#22c55e", action: "exported report", target: "Monthly executive · May", category: "data", time: "16:30 · Jun 10" },
];
