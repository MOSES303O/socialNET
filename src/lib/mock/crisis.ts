import type { Crisis } from "@/lib/types";

export const crises: Crisis[] = [
  {
    id: "c1",
    title: "Recall rumor",
    status: "active",
    severity: "SEV-2",
    score: 68,
    opened: "18h ago",
    owner: "Ochiengs Moses",
    summary:
      "An unverified product-recall rumor about the Berry batch originated in a single Reddit thread, then amplified onto X via three mid-size accounts. 5 accounts now amplifying · 2.8M reach exposed. A holding statement with lab results is live; sentiment is stabilizing.",
    signals: [
      { label: "Negative sentiment", value: "+218%", sub: "6h velocity", intent: "critical", pct: 88 },
      { label: "Recall keyword volume", value: "3,180", sub: "+320% vs baseline", intent: "critical", pct: 74 },
      { label: "Influencer amplification", value: "5 accounts", sub: "2.8M combined reach", intent: "warning", pct: 61 },
      { label: "Unanswered high-priority", value: "37", sub: "SLA breach risk", intent: "warning", pct: 45 },
    ],
    timeline: [
      { id: "e1", day: "Yesterday", time: "14:20", title: "Rumor originates", detail: "Single post on r/skincareaddiction alleges Berry-batch contamination.", dot: "#ef4444", tag: "Detected by AI", tagIntent: "info" },
      { id: "e2", day: "Yesterday", time: "15:05", title: "Auto-alert fired", detail: "Recall keyword crossed 200% threshold. Crisis team paged via Slack + SMS.", dot: "#f59e0b", tag: "System", tagIntent: "neutral" },
      { id: "e3", day: "Yesterday", time: "15:40", title: "Amplified onto X", detail: "@dailyhealthnut (88K) and two others reshare. Reach jumps to 2.8M.", dot: "#ef4444", tag: "Escalation", tagIntent: "critical" },
      { id: "e4", day: "Yesterday", time: "17:10", title: "Holding statement approved", detail: "Marcus drafted, Ochiengs approved. Posted to X + Reddit with lab results.", dot: "#22c55e", tag: "Ochiengs Moses", tagIntent: "positive" },
      { id: "e5", day: "Today", time: "09:00", title: "Sentiment stabilizing", detail: "Negative velocity down to +40%/h. Monitoring continues.", dot: "#6366f1", tag: "In progress", tagIntent: "info" },
    ],
    strategies: [
      { title: "Publish third-party lab results", desc: "Directly refutes the contamination claim with a verifiable source.", impact: "High", recommended: true },
      { title: "Founder video response", desc: "Personal, transparent tone tends to recover trust fastest in recall scenarios.", impact: "High", recommended: false },
      { title: "Targeted reply to amplifiers", desc: "Reach the 5 driving accounts individually before they post again.", impact: "Medium", recommended: false },
    ],
    warRoom: [
      { name: "Ochiengs Moses", role: "Incident lead", initials: "PA", color: "#6366f1", status: "Online" },
      { name: "Marcus Lee", role: "Comms", initials: "ML", color: "#a855f7", status: "Online" },
      { name: "Dana Ortiz", role: "Legal review", initials: "DO", color: "#f59e0b", status: "Reviewing" },
      { name: "Sam Reyes", role: "Product", initials: "SR", color: "#22c55e", status: "Idle" },
    ],
  },
];
