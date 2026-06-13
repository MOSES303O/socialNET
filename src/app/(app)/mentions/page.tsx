"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { MentionCard } from "@/components/mentions/MentionCard";
import { MentionDetail } from "@/components/mentions/MentionDetail";
import { Spinner } from "@/components/ui/misc";
import { useMentions } from "@/lib/queries";
import type { Mention } from "@/lib/types";
import { cn } from "@/lib/utils";

const CHIPS = ["All", "Critical", "Unassigned", "Positive", "Negative", "Resolved"] as const;
type Chip = (typeof CHIPS)[number];

export default function MentionsPage() {
  const { data } = useMentions();
  const [overrides, setOverrides] = useState<Record<string, Mention["status"]>>({});
  const [chip, setChip] = useState<Chip>("All");
  const [selId, setSelId] = useState<string | null>(null);

  const list = useMemo(() => {
    const base = (data ?? []).map((m) => (overrides[m.id] ? { ...m, status: overrides[m.id] } : m));
    return base.filter((m) => {
      switch (chip) {
        case "Critical": return m.priority === "critical";
        case "Unassigned": return !m.assignee;
        case "Positive": return m.sentiment === "positive";
        case "Negative": return m.sentiment === "negative";
        case "Resolved": return m.status === "resolved";
        default: return true;
      }
    });
  }, [data, overrides, chip]);

  const selected = list.find((m) => m.id === selId) ?? list[0];

  function resolve(id: string) {
    setOverrides((o) => ({ ...o, [id]: "resolved" }));
  }

  return (
    <div className="flex h-[calc(100vh-54px)] flex-col">
      {/* filter bar */}
      <div className="flex flex-wrap items-center gap-2.5 border-b border-[var(--color-border)] px-[22px] py-3">
        <div className="flex h-8 max-w-[300px] flex-1 items-center gap-2 rounded-[9px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-faint)]">
          <Search className="h-4 w-4" />
          <span className="text-[12px]">Search mentions…</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CHIPS.map((c) => (
            <button
              key={c}
              onClick={() => setChip(c)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-[12px]",
                chip === c
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:bg-[var(--color-subtle)]",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="ml-auto hidden gap-2 sm:flex">
          <span className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-[12px] text-[var(--color-muted)]">Saved views ▾</span>
          <span className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-[12px] text-[var(--color-muted)]">Export</span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* list */}
        <div className="w-full shrink-0 overflow-y-auto border-b border-[var(--color-border)] lg:w-[430px] lg:border-b-0 lg:border-r">
          <div className="sticky top-0 z-10 flex items-center border-b border-[var(--color-border)] bg-[var(--color-canvas)] px-[18px] py-[11px]">
            <span className="mono text-[11px] text-[var(--color-faint)]">{list.length} mentions</span>
            <span className="ml-auto text-[11px] text-[var(--color-muted)]">Newest ▾</span>
          </div>
          {data ? (
            list.map((m) => (
              <MentionCard key={m.id} mention={m} selected={selected?.id === m.id} onClick={() => setSelId(m.id)} />
            ))
          ) : (
            <div className="py-20"><Spinner className="mx-auto h-6 w-6" /></div>
          )}
        </div>

        {/* detail */}
        <div className="min-w-0 flex-1 overflow-y-auto">
          {selected ? <MentionDetail mention={selected} onResolve={resolve} /> : null}
        </div>
      </div>
    </div>
  );
}
