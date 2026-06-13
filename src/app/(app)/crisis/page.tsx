"use client";

import { PageContainer } from "@/components/layout/PageHeading";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/misc";
import { useCrises } from "@/lib/queries";
import { cn } from "@/lib/utils";
import type { Intent } from "@/lib/types";

const intentColor: Record<Intent, string> = {
  positive: "var(--color-positive)", warning: "var(--color-warning)",
  critical: "var(--color-critical)", info: "var(--color-info)", neutral: "var(--color-neutral)",
};

export default function CrisisPage() {
  const { data } = useCrises();
  const c = data?.[0];

  if (!c) return <PageContainer><Skeleton className="h-96 rounded-[14px]" /></PageContainer>;

  return (
    <PageContainer className="flex flex-col gap-3.5">
      {/* banner */}
      <div className="flex flex-wrap items-center gap-[18px] rounded-[14px] border border-[rgba(239,68,68,.32)] bg-[linear-gradient(100deg,rgba(239,68,68,.16),rgba(239,68,68,.04))] p-[18px_20px]">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-[rgba(239,68,68,.2)] text-[20px] text-[var(--color-critical)]">◈</div>
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-[17px] font-semibold">Active incident · {c.title}</span>
            <span className="mono live-dot rounded-full bg-[var(--color-critical)] px-[9px] py-[3px] text-[10px] text-white">LIVE · {c.severity}</span>
          </div>
          <p className="mono mt-0.5 text-[12px] text-[var(--color-muted)]">
            Opened {c.opened} · Owner: {c.owner} · {c.signals[2]?.value} amplifying · 2.8M reach exposed
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2.5">
          <div className="text-right">
            <div className="mono text-[26px] font-semibold text-[var(--color-critical)]">{c.score}</div>
            <div className="text-[10px] text-[var(--color-faint)]">crisis score</div>
          </div>
          <button className="rounded-[9px] bg-[var(--color-critical)] px-4 py-2 text-[13px] font-medium text-white">Escalate</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5 xl:grid-cols-[1fr_360px]">
        {/* left: signals + timeline */}
        <div className="flex min-w-0 flex-col gap-3.5">
          <Card className="p-[16px_18px]">
            <div className="mb-3.5 text-[13px] font-semibold">Early-warning signals</div>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {c.signals.map((s) => (
                <div key={s.label}>
                  <div className="mb-[7px] flex items-baseline gap-2">
                    <span className="text-[12px] text-[var(--color-muted)]">{s.label}</span>
                    <span className="mono ml-auto text-[14px] font-semibold" style={{ color: intentColor[s.intent] }}>{s.value}</span>
                  </div>
                  <div className="mb-[5px] h-1.5 rounded bg-[var(--color-track)]">
                    <div className="h-full rounded" style={{ width: `${s.pct}%`, background: intentColor[s.intent] }} />
                  </div>
                  <div className="mono text-[10px] text-[var(--color-faint)]">{s.sub}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-[16px_18px]">
            <div className="mb-4 flex items-center">
              <span className="text-[13px] font-semibold">Incident timeline</span>
              <span className="ml-auto text-[11px] text-[var(--color-faint)]">{c.timeline.length} events</span>
            </div>
            {c.timeline.map((e, i) => (
              <div key={e.id} className="flex gap-3.5">
                <div className="flex flex-col items-center">
                  <span className="mt-[3px] h-[11px] w-[11px] rounded-full" style={{ background: e.dot, boxShadow: `0 0 0 1px ${e.dot}` }} />
                  {i < c.timeline.length - 1 && <span className="min-h-[18px] w-0.5 flex-1 bg-[var(--color-border)]" />}
                </div>
                <div className="flex-1 pb-[18px]">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[13.5px] font-medium">{e.title}</span>
                    <span className="mono text-[10px] text-[var(--color-faint)]">{e.day} · {e.time}</span>
                    <span className="ml-auto rounded-[5px] bg-[var(--color-track)] px-2 py-0.5 text-[10px]" style={{ color: intentColor[e.tagIntent] }}>{e.tag}</span>
                  </div>
                  <p className="mt-1 text-[12.5px] leading-[1.5] text-[var(--color-muted)]">{e.detail}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* right: plan + war room */}
        <div className="flex flex-col gap-3.5">
          <Card className="p-[16px_18px]">
            <div className="mb-3.5 flex items-center gap-2">
              <span className="text-[var(--color-primary-ink)]">✦</span>
              <span className="text-[13px] font-semibold">Recommended response plan</span>
            </div>
            <div className="space-y-2.5">
              {c.strategies.map((s) => (
                <div key={s.title} className="rounded-[11px] border border-[var(--color-border)] bg-[var(--color-canvas)] p-[13px]">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="flex-1 text-[13px] font-medium">{s.title}</span>
                    {s.recommended && <span className="rounded-[5px] bg-[var(--color-primary-soft)] px-[7px] py-0.5 text-[9px] text-[var(--color-primary-ink)]">RECOMMENDED</span>}
                  </div>
                  <p className="mb-2.5 text-[12px] leading-[1.45] text-[var(--color-muted)]">{s.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--color-faint)]">Impact: <span className="text-[var(--color-muted)]">{s.impact}</span></span>
                    <button className="ml-auto rounded-[7px] bg-[var(--color-primary)] px-3 py-1.5 text-[11px] font-medium text-white">Start →</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-[16px_18px]">
            <div className="mb-3.5 flex items-center">
              <span className="text-[13px] font-semibold">War room</span>
              <span className="mono ml-auto flex items-center gap-1.5 text-[10px] text-[var(--color-positive)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-positive)]" /> {c.warRoom.length} active
              </span>
            </div>
            <div className="space-y-[11px]">
              {c.warRoom.map((m) => (
                <div key={m.name} className="flex items-center gap-[11px]">
                  <Avatar initials={m.initials} color={m.color} size="sm" />
                  <div className="flex-1 leading-tight">
                    <div className="text-[12.5px] font-medium">{m.name}</div>
                    <div className="text-[10px] text-[var(--color-faint)]">{m.role}</div>
                  </div>
                  <span className="mono text-[10px] text-[var(--color-muted)]">{m.status}</span>
                </div>
              ))}
            </div>
            <div className="mt-3.5 flex gap-2 border-t border-[var(--color-border)] pt-3.5">
              <button className="flex-1 rounded-lg border border-[var(--color-border)] py-2 text-[12px] text-[var(--color-muted)] hover:bg-[var(--color-subtle)]">Add note</button>
              <button className="flex-1 rounded-lg border border-[rgba(34,197,94,.4)] py-2 text-[12px] text-[var(--color-positive)]">Resolve incident</button>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
