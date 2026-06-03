# Football Pulse AI — Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────┐
│                   USER BROWSER                      │
│              Next.js (Vercel)                       │
│   Pages: /news  /injuries  /transfers  /teams       │
└───────────────────┬─────────────────────────────────┘
                    │ HTTP / fetch
                    ▼
┌─────────────────────────────────────────────────────┐
│              FastAPI Backend (Railway)              │
│                                                     │
│  /api/news        → fetch + cache news              │
│  /api/injuries    → fetch + cache injury data       │
│  /api/teams       → squad availability              │
│  /api/transfers   → transfer rumours                │
│  /api/summary     → Gemini AI briefing              │
└───────┬───────────────────┬───────────────────────--┘
        │                   │
        ▼                   ▼
┌──────────────┐   ┌──────────────────────────────────┐
│  Supabase DB │   │        External APIs              │
│  (Postgres)  │   │  - football-data.org              │
│              │   │  - NewsAPI / GNews                │
│  Tables:     │   │  - API-Football (RapidAPI)        │
│  - articles  │   │  - Google Gemini API              │
│  - injuries  │   └──────────────────────────────────┘
│  - transfers │
│  - summaries │
└──────────────┘
```

---

## Why This Architecture? (Intern Lesson #1)

> **Q: Why not just call external APIs directly from the browser?**
>
> A: Three reasons:
> 1. **API keys stay secret** — if you call APIs from the browser, anyone can open DevTools and steal your keys.
> 2. **Caching** — we store results in Supabase so we don't burn our free-tier API quota on every page load.
> 3. **Transformation** — we reshape raw API data into exactly what the frontend needs, so the UI code stays clean.

---

## Folder Structure

```
football-pulse-ai/
├── frontend/                  ← Next.js app
│   ├── app/
│   │   ├── page.tsx           ← Home / dashboard
│   │   ├── news/page.tsx
│   │   ├── injuries/page.tsx
│   │   ├── transfers/page.tsx
│   │   └── teams/[id]/page.tsx
│   ├── components/
│   │   ├── NewsCard.tsx
│   │   ├── InjuryTable.tsx
│   │   ├── TeamAvailability.tsx
│   │   └── AISummaryBanner.tsx
│   └── lib/
│       └── api.ts             ← functions to call our FastAPI backend
│
├── backend/                   ← FastAPI app
│   ├── main.py                ← app entry point
│   ├── routers/
│   │   ├── news.py
│   │   ├── injuries.py
│   │   ├── transfers.py
│   │   └── summary.py
│   ├── services/
│   │   ├── gemini.py          ← AI summary logic
│   │   ├── football_api.py    ← external API calls
│   │   └── news_api.py
│   ├── models.py              ← Pydantic data models
│   └── database.py            ← Supabase client setup
│
└── PROJECT.md
└── ARCHITECTURE.md
└── TASKS.md
```

---

## Data Flow — News Feed Example

```
1. User opens /news in browser
2. Next.js calls GET /api/news on our FastAPI backend
3. FastAPI checks Supabase: "do we have news fresher than 15 mins?"
   ├── YES → return cached articles from DB
   └── NO  → call NewsAPI, store results in Supabase, return them
4. Next.js renders NewsCard components for each article
```

This pattern is called **cache-then-fetch** — we protect our API quota while keeping data reasonably fresh.

---

## Database Schema (Supabase)

```sql
-- Stores fetched news articles
CREATE TABLE articles (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  description text,
  url         text UNIQUE NOT NULL,
  source      text,
  published_at timestamptz,
  fetched_at  timestamptz DEFAULT now()
);

-- Player injury records
CREATE TABLE injuries (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  team        text NOT NULL,
  status      text,          -- 'out' | 'doubtful' | 'fit'
  reason      text,
  return_date date,
  updated_at  timestamptz DEFAULT now()
);

-- Transfer news
CREATE TABLE transfers (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  from_team   text,
  to_team     text,
  fee         text,
  status      text,          -- 'rumour' | 'confirmed'
  published_at timestamptz,
  fetched_at  timestamptz DEFAULT now()
);

-- AI-generated daily summaries
CREATE TABLE summaries (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content     text NOT NULL,
  summary_type text,         -- 'daily' | 'match_preview'
  generated_at timestamptz DEFAULT now()
);
```

---

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
FOOTBALL_API_KEY=your_football_data_org_key
NEWS_API_KEY=your_newsapi_key
GEMINI_API_KEY=your_google_ai_key
```

> **Security rule:** Never commit `.env` files to git. Always add them to `.gitignore`.

---

## Key Concepts You'll Learn Building This

| Concept | Where you'll see it |
|---------|-------------------|
| REST API design | FastAPI routers |
| Async/await in Python | FastAPI + external API calls |
| React Server Components | Next.js pages |
| Database caching patterns | Supabase queries |
| Prompt engineering | Gemini summary service |
| Environment variables & secrets | .env setup |
