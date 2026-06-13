"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageHeading";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/misc";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { useTeam, useIntegrations, useAuditLogs } from "@/lib/queries";
import { cn } from "@/lib/utils";
import type { Role, TeamUser, Integration } from "@/lib/types";

type Tab = "users" | "integrations" | "audit";

const roleLabel: Record<Role, string> = { admin: "Admin", analyst: "Analyst", community: "Community Mgr", executive: "Executive" };
const statusTone: Record<TeamUser["status"], "positive" | "info" | "critical"> = { active: "positive", invited: "info", suspended: "critical" };
const intStatus: Record<Integration["status"], { tone: "positive" | "critical" | "neutral"; label: string }> = {
  connected: { tone: "positive", label: "Connected" },
  error: { tone: "critical", label: "Action needed" },
  disconnected: { tone: "neutral", label: "Not connected" },
};

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("users");
  const team = useTeam();
  const integrations = useIntegrations();
  const audit = useAuditLogs();

  return (
    <PageContainer>
      <div className="mb-[18px] flex gap-1 border-b border-[var(--color-border)]">
        {(["users", "integrations", "audit"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px border-b-2 px-4 py-2.5 text-[13.5px] font-medium capitalize",
              tab === t ? "border-[var(--color-primary)] text-[var(--color-ink)]" : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)]",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "users" && (
        <div>
          <div className="mb-3.5 flex items-center">
            <span className="text-[14px] font-semibold">Team members</span>
            <span className="mono ml-2.5 text-[11px] text-[var(--color-faint)]">{team.data?.length ?? 0} users</span>
            <button className="ml-auto rounded-[9px] bg-[var(--color-primary)] px-3.5 py-2 text-[13px] font-medium text-white">+ Invite user</button>
          </div>
          <Card className="overflow-hidden">
            <div className="mono grid grid-cols-[2fr_1.4fr_1fr_1fr_60px] border-b border-[var(--color-border)] px-[18px] py-2.5 text-[10px] text-[var(--color-faint)]">
              <span>NAME</span><span>EMAIL</span><span>ROLE</span><span>LAST ACTIVE</span><span></span>
            </div>
            {team.data ? team.data.map((u) => (
              <div key={u.id} className="grid grid-cols-[2fr_1.4fr_1fr_1fr_60px] items-center border-b border-[var(--color-border)] px-[18px] py-3 last:border-0 hover:bg-[var(--color-subtle)]">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Avatar initials={u.initials} color={u.color} size="sm" />
                  <span className="truncate text-[13px] font-medium">{u.name}</span>
                </div>
                <span className="mono truncate text-[11.5px] text-[var(--color-muted)]">{u.email}</span>
                <span><span className="rounded-md bg-[var(--color-track)] px-2 py-0.5 text-[11px] text-[var(--color-muted)]">{roleLabel[u.role]}</span></span>
                <span><Badge tone={statusTone[u.status]} dot>{cap(u.status)}</Badge></span>
                <span className="text-right text-[var(--color-faint)]">⋯</span>
              </div>
            )) : <div className="p-5"><Skeleton className="h-40 w-full" /></div>}
          </Card>
        </div>
      )}

      {tab === "integrations" && (
        <div>
          <div className="mb-3.5 text-[14px] font-semibold">Connected platforms</div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.data ? integrations.data.map((i) => {
              const st = intStatus[i.status];
              return (
                <Card key={i.id} className="p-[18px]">
                  <div className="mb-3 flex items-center gap-[11px]">
                    <PlatformIcon platform={i.platform} badge className="h-[38px] w-[38px]" />
                    <span className="text-[14px] font-semibold">{i.name}</span>
                  </div>
                  <div className="mb-2.5"><Badge tone={st.tone} dot>{st.label}</Badge></div>
                  <p className="mb-3 text-[11px] text-[var(--color-faint)]">{i.account} · {i.detail}</p>
                  <button className="block w-full rounded-lg border border-[var(--color-border)] py-2 text-center text-[12px] text-[var(--color-muted)] hover:bg-[var(--color-subtle)]">
                    {i.status === "connected" ? "Manage" : i.status === "error" ? "Reconnect" : "Connect"}
                  </button>
                </Card>
              );
            }) : Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-[14px]" />)}
          </div>
        </div>
      )}

      {tab === "audit" && (
        <div>
          <div className="mb-3.5 flex items-center">
            <span className="text-[14px] font-semibold">Audit log</span>
            <button className="ml-auto rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-[12px] text-[var(--color-muted)]">Export CSV</button>
          </div>
          <Card className="overflow-hidden">
            {audit.data ? audit.data.map((l) => (
              <div key={l.id} className="flex items-center gap-3 border-b border-[var(--color-border)] px-[18px] py-3.5 last:border-0">
                <Avatar initials={l.initials} color={l.color} size="xs" />
                <div className="flex-1 text-[13px]">
                  <span className="font-medium">{l.who}</span>{" "}
                  <span className="text-[var(--color-muted)]">{l.action}</span>{" "}
                  <span className="text-[var(--color-primary-ink)]">{l.target}</span>
                </div>
                <span className="mono text-[11px] text-[var(--color-faint)]">{l.time}</span>
              </div>
            )) : <div className="p-5"><Skeleton className="h-40 w-full" /></div>}
          </Card>
        </div>
      )}
    </PageContainer>
  );
}

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
