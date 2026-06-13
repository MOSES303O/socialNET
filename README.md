# socialNET Intelligence

An **AI-powered Social Media Intelligence & Brand Monitoring platform** — a Brandwatch / Sprout Social / Meltwater–class command center for monitoring brand reputation, analyzing audience sentiment, managing crises, and reporting to leadership.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Recharts**, **Zustand**, **TanStack Query**, and **React Hook Form**. It runs entirely on **mock data** today, behind a single API seam (`src/lib/api.ts`) so a **Django REST** backend drops in later without touching any component.

## Getting started

```bash
npm install        # use --legacy-peer-deps if your npm enforces peer ranges
npm run dev        # http://localhost:3000  (landing page → /dashboard)
npm run build      # production build (type-checked)
```

## Screens (16)

| Route | Screen |
|------|--------|
| `/` | Landing page |
| `/login`, `/register` | Authentication experience |
| `/dashboard` | Executive overview dashboard |
| `/mentions` | Mentions monitoring (filters, status tabs) |
| `/mentions` → detail panel | Mention detail view (slide-over) |
| `/analytics` | Analytics center (sentiment, platforms, audience, influencers, heatmap) |
| `/engagement` | Engagement tracking module |
| `/alerts` | Alerts & notifications center |
| `/reports` | Time-based reporting hub |
| `/post-analysis` | AI post analysis workspace |
| `/assistant` | AI chat assistant |
| `/crisis` | Crisis management command center |
| `/admin/users` | User management portal |
| `/admin/integrations` | Integration & monitoring settings |
| `/admin/audit` | Audit log explorer |
| `/settings` | Profile & preferences |

Each screen has loading skeletons, empty states, and responsive (desktop → tablet → mobile) layouts.

## Architecture

```
src/
  app/
    (auth)/            login, register  — branded split layout
    (app)/             dashboard shell: sidebar + topbar
      dashboard, mentions, analytics, engagement, alerts, reports,
      post-analysis, assistant, crisis, settings,
      admin/{users,integrations,audit}
    page.tsx           landing   layout.tsx + providers.tsx (React Query)
  components/
    layout/   Sidebar, Topbar, PageHeading, nav config
    ui/       Button, Card, Badge, Avatar, PlatformIcon, Sheet, misc (Tabs, Switch, Progress, Skeleton, EmptyState, Spinner)
    charts/   Charts (Recharts wrappers), Heatmap
    dashboard/ KpiCard      mentions/ MentionCard, MentionDetail
  lib/
    types.ts    domain model (mirrors API responses)
    api.ts      ← THE BACKEND SEAM
    queries.ts  TanStack Query hooks
    store.ts    Zustand UI state (date range, sidebar)
    utils.ts    formatting helpers
    mock/       core, reports, crisis, ai, admin
```

## State & data flow

- **TanStack Query** (`src/lib/queries.ts`) owns all server-state fetching/caching. Components call hooks like `useKpis()`, `useMentions()`.
- **Zustand** (`src/lib/store.ts`) owns UI state — selected date range (drives query keys) and sidebar collapse.
- **React Hook Form** powers the settings, login and register forms.
- **Recharts** renders every visualization through small wrappers in `components/charts`.

## Integrating the Django backend

Every screen reads data **only** through `src/lib/api.ts`. Each function returns mock data after a simulated delay and is annotated with its intended endpoint:

```ts
// GET /api/metrics/kpis/?range=
export const getKpis = (range) => delay(kpis);

// POST /api/analyze-post/  { url }
export function analyzePost(url) { return delay({ ...sample, url }); }
```

To go live, replace each body with a real `fetch()` — signatures and the types in `src/lib/types.ts` stay identical, so no component or query hook changes:

```ts
export async function getKpis(range: DateRange): Promise<Kpi[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/metrics/kpis/?range=${range}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
```

The `types.ts` interfaces describe exactly what each Django REST serializer should emit.

## Design system

- Enterprise neutral light theme with a violet primary, defined as CSS tokens in `src/app/globals.css` (`@theme`).
- Sentiment/status colors: **green** = positive, **amber** = warning, **red** = critical, **blue** = info.
- Rounded cards, soft shadows, subtle glassmorphism on bars, consistent spacing.

> Note: the original `socialNET.dc.html` design file was gated behind a claude.ai login and couldn't be fetched in-session; this implementation follows the written product spec. Share the file locally to reconcile any pixel-level differences.
