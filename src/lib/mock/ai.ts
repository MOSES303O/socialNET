import type { ChatMessage, PostAnalysis } from "@/lib/types";

export const suggestedPrompts = [
  "Summarize audience sentiment for the last campaign.",
  "Which influencers are driving engagement?",
  "Identify emerging risks for our brand.",
  "Suggest strategies to improve engagement.",
];

export const chatHistory = [
  "Negative spike investigation",
  "#VelaGlow campaign recap",
  "Competitor share of voice",
  "Q2 influencer shortlist",
];

export const initialChat: ChatMessage[] = [
  {
    id: "w1", role: "user",
    content: "What caused the spike in negative mentions yesterday?",
  },
  {
    id: "w2", role: "assistant",
    content:
      "Negative mentions rose +218% in 6 hours yesterday, driven almost entirely by an unverified product-recall rumor. It originated in a single Reddit thread on r/skincareaddiction at 14:20 UTC, then amplified onto X via three mid-size accounts. Sentiment recovered partially after your team’s holding statement, but the conversation is still active.",
    cards: [
      { t: "Negative mentions", v: "+218%", s: "6h window", intent: "critical" },
      { t: "Origin", v: "r/skincareaddiction", s: "1 thread → 2.4k upvotes", intent: "warning" },
      { t: "Reach exposed", v: "2.8M", s: "before mitigation", intent: "warning" },
    ],
    sources: ["Reddit · r/skincareaddiction", "X · @dailyhealthnut", "News · TechWire"],
    action: { label: "Open Crisis Center", href: "/crisis" },
  },
];

export function mockAssistantReply(prompt: string): ChatMessage {
  const id = `a_${Date.now()}`;
  const lib: Record<string, ChatMessage> = {
    "Summarize audience sentiment for the last campaign.": {
      id, role: "assistant",
      content:
        "The #VelaGlow campaign netted 62% positive / 24% neutral / 14% negative across 48.2K mentions. Positivity clustered around the Yuzu flavor and the Maren collab; the negative slice is almost entirely the recall rumor, not campaign fatigue. Engagement rate (4.8%) beat your trailing 90-day average by 0.6pt.",
      cards: [
        { t: "Net sentiment", v: "+48", s: "pos minus neg", intent: "positive" },
        { t: "Top driver", v: "Yuzu flavor", s: "8.4k mentions", intent: "positive" },
        { t: "Engagement", v: "4.8%", s: "+0.6pt vs avg", intent: "positive" },
      ],
      sources: ["Analytics · Campaign view", "Mentions · #VelaGlow"],
    },
    "Which influencers are driving engagement?": {
      id, role: "assistant",
      content:
        "Three accounts drove 41% of campaign reach. @tech_maren (418K) is your strongest advocate this week with a 2.1M-reach post. @sarah.k.wellness delivered the highest engagement rate at 11.2%. Watch @dailyhealthnut — large reach but currently negative on sugar content.",
      cards: [
        { t: "@tech_maren", v: "2.1M", s: "reach · positive", intent: "positive" },
        { t: "@sarah.k.wellness", v: "11.2%", s: "engagement rate", intent: "positive" },
        { t: "@dailyhealthnut", v: "320K", s: "reach · negative", intent: "critical" },
      ],
      sources: ["Engagement · Top creators"],
    },
    "Identify emerging risks for our brand.": {
      id, role: "assistant",
      content:
        "Two risks worth flagging. 1) Recall rumor — still unresolved, 320% volume growth, highest crisis weight. 2) Sugar-content narrative — slower-burning but credible criticism (19g/serving) gaining traction with health-focused accounts. The first is urgent; the second is a reputation/product story for the next planning cycle.",
      cards: [
        { t: "Recall rumor", v: "Critical", s: "+320% · act now", intent: "critical" },
        { t: "Sugar narrative", v: "Elevated", s: "+64% · monitor", intent: "warning" },
      ],
      sources: ["Crisis Center", 'Mentions · "sugar content"'],
      action: { label: "Open Crisis Center", href: "/crisis" },
    },
    "Suggest strategies to improve engagement.": {
      id, role: "assistant",
      content:
        "Based on what’s performing: 1) Lean into creator-led, unsponsored content — it’s outperforming branded posts 2.3:1 on engagement. 2) Reply faster to positive mentions (your SLA is 1h12m; viral windows close in ~40m). 3) Address the sugar question proactively with the Zero line to convert a negative into a story.",
      cards: [
        { t: "Creator content", v: "2.3:1", s: "vs branded", intent: "positive" },
        { t: "Reply window", v: "40m", s: "tighten SLA", intent: "warning" },
      ],
      sources: ["Engagement benchmarks"],
    },
  };
  return (
    lib[prompt] ?? {
      id, role: "assistant",
      content:
        "Here’s what stands out in the current data: mention volume is up 12.4% with sentiment under pressure from the recall rumor. I can break this down by platform, audience segment, or time window — just say the word.",
      cards: [
        { t: "Mentions", v: "48.2K", s: "+12.4%", intent: "positive" },
        { t: "Sentiment", v: "62%", s: "−4pt", intent: "warning" },
      ],
      sources: ["Overview"],
    }
  );
}

export const samplePostAnalysis: PostAnalysis = {
  url: "https://x.com/tech_maren/status/1834500000000000000",
  platform: "twitter",
  author: { name: "Maren Cole", handle: "@tech_maren", initials: "MC", color: "#6366f1", followers: "418K", verified: true },
  content:
    "Vela Yuzu is genuinely the best drink I’ve had all year. The adaptogen blend actually does something for my afternoon slump. Obsessed is an understatement.",
  performance: [
    { label: "Likes", value: "12.4K", sub: "+312% vs avg", intent: "positive" },
    { label: "Comments", value: "842", sub: "+180% vs avg", intent: "positive" },
    { label: "Shares", value: "2.1K", sub: "+420% vs avg", intent: "positive" },
    { label: "Est. reach", value: "2.1M", sub: "5.0x follower base", intent: "positive" },
  ],
  sentiment: { positive: 88, neutral: 9, negative: 3, tone: "Joy, Trust" },
  scores: [
    { label: "Messaging effectiveness", value: 92, intent: "positive" },
    { label: "Audience resonance", value: 88, intent: "positive" },
    { label: "Brand alignment", value: 84, intent: "positive" },
    { label: "Risk exposure", value: 12, intent: "positive" },
  ],
  positives: ['"genuinely the best"', '"adaptogen blend works"', '"obsessed"', "authentic / unsponsored tone"],
  risks: ["none detected in top replies"],
  recommendations: [
    { icon: "amplify", title: "Amplify now", desc: "Boost to lookalike audiences while engagement velocity is high — the next 40 minutes are the viral window." },
    { icon: "engage", title: "Engage the author", desc: "Reply personally and request UGC rights. @tech_maren is your top advocate this week." },
    { icon: "future", title: "For future campaigns", desc: "Yuzu + afternoon-energy framing outperforms generic wellness messaging 2.3:1. Lean in." },
  ],
};
