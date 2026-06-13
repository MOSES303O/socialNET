"use client";

import { useState } from "react";
import { Sparkles, RotateCw } from "lucide-react";
import type { Mention } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { PlatformIcon, platformLabel } from "@/components/ui/PlatformIcon";
import { cn } from "@/lib/utils";

const priorityColor: Record<string, string> = {
  critical: "var(--color-critical)",
  high: "var(--color-critical)",
  medium: "var(--color-warning)",
  low: "var(--color-neutral)",
};

export function MentionDetail({ mention: m, onResolve }: { mention: Mention; onResolve: (id: string) => void }) {
  const [reply, setReply] = useState(m.suggestedReply);

  return (
    <div className="mx-auto max-w-[720px] p-[22px_26px]">
      {/* header */}
      <div className="mb-[18px] flex items-start gap-3">
        <Avatar initials={m.author.initials} color={m.author.color} size="lg" />
        <div className="flex-1">
          <div className="flex items-center gap-[7px]">
            <span className="text-[16px] font-semibold">{m.author.name}</span>
            {m.author.verified && <span className="text-[var(--color-info)]">✓</span>}
            <span className="mono text-[11px] text-[var(--color-faint)]">{m.author.handle}</span>
          </div>
          <p className="mono mt-0.5 text-[11px] text-[var(--color-faint)]">
            {platformLabel(m.platform)} · {m.time} ago · {m.author.followers} followers
          </p>
        </div>
        <span
          className="rounded-[7px] border px-2.5 py-1 text-[11px] capitalize"
          style={{ color: priorityColor[m.priority], borderColor: priorityColor[m.priority] }}
        >
          {m.priority} priority
        </span>
      </div>

      {/* content */}
      <p className="mb-[18px] text-[16px] leading-[1.6]">{m.content}</p>

      {/* engagement */}
      <div className="mb-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { l: "Likes", v: m.likes }, { l: "Comments", v: m.comments },
          { l: "Shares", v: m.shares }, { l: "Reach", v: m.reach },
        ].map((x) => (
          <div key={x.l} className="card p-[13px_14px]">
            <div className="mb-1 text-[11px] text-[var(--color-faint)]">{x.l}</div>
            <div className="mono text-[18px] font-semibold">{x.v}</div>
          </div>
        ))}
      </div>

      {/* AI analysis */}
      <div className="card mb-4 p-[18px]">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--color-primary-ink)]" />
          <span className="text-[13px] font-semibold">AI sentiment analysis</span>
          <span className="mono ml-auto text-[10px] text-[var(--color-faint)]">{m.confidence}% confidence</span>
        </div>
        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2">
          <div>
            <p className="mb-[11px] text-[11px] text-[var(--color-faint)]">Emotional tone</p>
            <div className="space-y-2.5">
              {m.emotions.map((e) => (
                <div key={e.k}>
                  <div className="mb-1 flex justify-between text-[11px]">
                    <span className="text-[var(--color-muted)]">{e.k}</span>
                    <span className="mono text-[var(--color-faint)]">{e.v}%</span>
                  </div>
                  <div className="h-[5px] rounded bg-[var(--color-track)]">
                    <div className="h-full rounded bg-[var(--color-info)]" style={{ width: `${e.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-[11px] text-[11px] text-[var(--color-faint)]">Key topics</p>
            <div className="flex flex-wrap gap-[7px]">
              {m.topics.map((t) => (
                <span key={t} className="rounded-[7px] bg-[var(--color-track)] px-[11px] py-[5px] text-[12px] text-[var(--color-muted)]">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* suggested response */}
      <div className="card mb-[18px] p-[18px]">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--color-primary-ink)]" />
          <span className="text-[13px] font-semibold">Suggested response</span>
          <button className="mono ml-auto flex items-center gap-1 text-[11px] text-[var(--color-primary-ink)]">
            <RotateCw className="h-3 w-3" /> Regenerate
          </button>
        </div>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-[10px] border border-[var(--color-border)] bg-[var(--color-canvas)] p-3.5 text-[14px] leading-[1.6] outline-none ring-focus"
        />
        <div className="mt-3 flex gap-2.5">
          <button className="rounded-[9px] bg-[var(--color-primary)] px-4 py-2 text-[13px] font-medium text-white hover:bg-[var(--color-primary-hover)]">Use &amp; reply</button>
          <button className="rounded-[9px] border border-[var(--color-border)] px-4 py-2 text-[13px] text-[var(--color-muted)] hover:bg-[var(--color-subtle)]">Edit</button>
        </div>
      </div>

      {/* actions */}
      <div className="flex flex-wrap gap-2.5">
        <Action label="Assign →" />
        <Action label="Add note" />
        <Action label="Escalate to Crisis" />
        <button
          onClick={() => onResolve(m.id)}
          disabled={m.status === "resolved"}
          className={cn(
            "ml-auto rounded-[9px] border px-3.5 py-2 text-[12.5px]",
            m.status === "resolved"
              ? "border-[var(--color-border)] text-[var(--color-faint)]"
              : "border-[rgba(34,197,94,.4)] text-[var(--color-positive)] hover:bg-[var(--color-positive-soft)]",
          )}
        >
          ✓ {m.status === "resolved" ? "Resolved" : "Mark resolved"}
        </button>
      </div>
    </div>
  );
}

function Action({ label }: { label: string }) {
  return (
    <button className="rounded-[9px] border border-[var(--color-border)] px-3.5 py-2 text-[12.5px] text-[var(--color-muted)] hover:bg-[var(--color-subtle)]">
      {label}
    </button>
  );
}
