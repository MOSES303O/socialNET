# socialNET Intelligence

An **AI-powered Social Media Intelligence & Brand Monitoring platform** — a Brandwatch / Sprout Social / Meltwater–class command center for monitoring brand reputation, analyzing audience sentiment, managing crises, and reporting to leadership.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Recharts**, **Zustand**, **TanStack Query**, and **React Hook Form**, backed by a **Django REST** API (`backend/`) that serves the same Vela demo dataset the frontend was originally mocked with. All data access goes through one seam (`src/lib/api.ts`) so components never talk to the backend directly.

## Getting started

Run the backend and frontend in two terminals:

```bash
# Terminal 1 — Django API (http://localhost:8500)
cd backend
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt   # .venv/bin/pip on macOS/Linux
.venv\Scripts\python manage.py migrate
.venv\Scripts\python manage.py seed_data        # loads the Vela demo dataset
.venv\Scripts\python manage.py runserver 8500

# Terminal 2 — Next.js app (http://localhost:3000)
npm install        # use --legacy-peer-deps if your npm enforces peer ranges
npm run dev
npm run build      # production build (type-checked)
```

`next.config.mjs` rewrites `/api/*` to the Django server (`DJANGO_API_URL`, default `http://127.0.0.1:8500/api`) so the browser only ever calls the Next.js origin — no CORS setup needed. Override the backend URL by setting `DJANGO_API_URL` before `npm run dev`.

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
    api.ts      ← THE BACKEND SEAM (fetches from the Django API)
    queries.ts  TanStack Query hooks
    store.ts    Zustand UI state (date range, sidebar)
    utils.ts    formatting helpers
    session.ts  local signed-in identity (no real auth yet)
backend/
  config/       Django project (settings, urls)
  intel/        models, serializers, views, admin, seed_data command
```

## State & data flow

- **TanStack Query** (`src/lib/queries.ts`) owns all server-state fetching/caching. Components call hooks like `useKpis()`, `useMentions()`.
- **Zustand** (`src/lib/store.ts`) owns UI state — selected date range (drives query keys) and sidebar collapse.
- **React Hook Form** powers the settings, login and register forms.
- **Recharts** renders every visualization through small wrappers in `components/charts`.

## The Django backend

`backend/` is a small Django + Django REST Framework project (`intel` app) that serves the exact dataset the frontend used to mock — Vela's recall-rumor storyline, mentions, crisis, team, alerts, reports, etc.

- **Model-backed** (SQLite, editable via `/admin/`): `Mention`, `Influencer`, `Alert`, `AlertRule`, `Report`, `Crisis`, `TeamUser`, `Integration`, `AuditLog`. Seeded by `python manage.py seed_data`.
- **Code-driven** (`intel/mock_data.py`, no DB): KPI cards, brand health, chart series (mention volume, sentiment mix, platform breakdown, trends, hashtags, engagement), the AI assistant's canned replies, and the sample post analysis — these are dashboard aggregates, not independent rows.
- Every route lives in `intel/urls.py` under `/api/`, with no trailing slash (`APPEND_SLASH = False`) to match Next's rewrite.
- No auth yet — DRF permissions are `AllowAny`, matching the frontend's current no-login flow.

`src/lib/api.ts` calls these endpoints with `fetch()`; the function signatures and `src/lib/types.ts` interfaces are unchanged from the mock-data version, so no component changes were needed.

## Design system

- Enterprise neutral light theme with a violet primary, defined as CSS tokens in `src/app/globals.css` (`@theme`).
- Sentiment/status colors: **green** = positive, **amber** = warning, **red** = critical, **blue** = info.
- Rounded cards, soft shadows, subtle glassmorphism on bars, consistent spacing.

> Note: the original `socialNET.dc.html` design file was gated behind a claude.ai login and couldn't be fetched in-session; this implementation follows the written product spec. Share the file locally to reconcile any pixel-level differences.
