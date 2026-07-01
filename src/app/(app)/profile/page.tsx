"use client";

import { PageContainer } from "@/components/layout/PageHeading";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Switch } from "@/components/ui/misc";
import { useUI } from "@/lib/store";
import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/session";

const fields = [
  { label: "Full name", value: "Ochiengs Moses" },
  { label: "Email", value: "ochiengs@vela.co" },
  { label: "Role", value: "Admin · Brand Reputation" },
  { label: "Team", value: "Vela — Brand & Comms" },
  { label: "Timezone", value: "(GMT−05:00) Eastern" },
  { label: "Language", value: "English (US)" },
];

const notifPrefs = [
  { label: "Critical alerts (crisis, recall)", sub: "In-app · SMS · Email", on: true },
  { label: "Sentiment shifts", sub: "In-app · Email", on: true },
  { label: "Viral post detection", sub: "In-app", on: true },
  { label: "Weekly digest", sub: "Email · Mondays", on: true },
  { label: "Assignments & mentions of me", sub: "In-app · Email", on: true },
  { label: "Product updates", sub: "Email", on: false },
];

export default function ProfilePage() {
  const { theme, setTheme } = useUI();

  return (
    <PageContainer className="flex max-w-[1080px] flex-col gap-4">
      <Card className="flex items-center gap-[18px] p-6">
        <Avatar initials={currentUser.initials} size="xl" />
        <div className="flex-1">
          <div className="text-[20px] font-semibold tracking-[-0.01em]">{currentUser.name}</div>
          <div className="mt-0.5 text-[13px] text-[var(--color-muted)]">Head of Brand Reputation · Vela</div>
        </div>
        <button className="rounded-[9px] border border-[var(--color-border)] px-4 py-2 text-[13px] text-[var(--color-muted)] hover:bg-[var(--color-subtle)]">Edit profile</button>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-[18px_20px]">
          <div className="mb-3.5 text-[13px] font-semibold">Account details</div>
          {fields.map((f) => (
            <div key={f.label} className="flex items-center border-t border-[var(--color-border)] py-[11px] first:border-t-0">
              <span className="w-[120px] text-[12.5px] text-[var(--color-muted)]">{f.label}</span>
              <span className="text-[13px]">{f.value}</span>
            </div>
          ))}
        </Card>

        <Card className="p-[18px_20px]">
          <div className="mb-4 text-[13px] font-semibold">Preferences</div>
          <Pref label="Appearance" sub="Interface theme">
            <div className="flex gap-0.5 rounded-[9px] bg-[var(--color-track)] p-[3px]">
              {(["light", "dark"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setTheme(m)}
                  className={cn("rounded-md px-3 py-1 text-[12px] capitalize", theme === m ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-muted)]")}
                >
                  {m}
                </button>
              ))}
            </div>
          </Pref>
          <Pref label="Default landing screen" sub="Where socialNET opens">
            <span className="rounded-lg border border-[var(--color-border)] px-2.5 py-1.5 text-[12px] text-[var(--color-muted)]">Overview ▾</span>
          </Pref>
          <Pref label="Density" sub="Row spacing" last>
            <span className="rounded-lg border border-[var(--color-border)] px-2.5 py-1.5 text-[12px] text-[var(--color-muted)]">Comfortable ▾</span>
          </Pref>
        </Card>
      </div>

      <Card className="p-[18px_20px]">
        <div className="mb-1 text-[13px] font-semibold">Notification preferences</div>
        {notifPrefs.map((n) => (
          <div key={n.label} className="flex items-center gap-3 border-t border-[var(--color-border)] py-[13px]">
            <div className="flex-1">
              <div className="text-[13px]">{n.label}</div>
              <div className="mono mt-0.5 text-[10px] text-[var(--color-faint)]">{n.sub}</div>
            </div>
            <Switch checked={n.on} />
          </div>
        ))}
      </Card>
    </PageContainer>
  );
}

function Pref({ label, sub, children, last }: { label: string; sub: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={cn("flex items-center py-3.5", !last && "border-b border-[var(--color-border)]", "first:pt-0")}>
      <div>
        <div className="text-[13px]">{label}</div>
        <div className="mt-0.5 text-[11px] text-[var(--color-faint)]">{sub}</div>
      </div>
      <div className="ml-auto">{children}</div>
    </div>
  );
}
