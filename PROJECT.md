# Football Pulse AI — Project Brief

## Vision
A real-time football intelligence platform that aggregates news, injuries, transfers, and team availability — powered by AI summaries — so fans and analysts never miss a beat before and during the 2026 World Cup.

## Target Launch
**Before the 2026 FIFA World Cup** (June 11, 2026)
Current date: June 1, 2026 — we have ~10 days for MVP. Move fast.

---

## Core Features (MVP Scope)

| # | Feature | Priority | Description |
|---|---------|----------|-------------|
| 1 | Football News Feed | P0 | Latest headlines from top sources, auto-refreshed |
| 2 | Injury Updates | P0 | Player injury status with severity and expected return |
| 3 | Team Availability | P0 | Squad availability per team (fit / doubtful / out) |
| 4 | Transfer Updates | P1 | Rumours and confirmed moves |
| 5 | AI Summaries | P0 | Gemini-powered daily briefings and match previews |

---

## Tech Stack

### Frontend
- **Next.js 14** (App Router) — React framework with server components
- **Tailwind CSS** — utility-first styling, fast to build
- **shadcn/ui** — pre-built accessible components

### Backend
- **FastAPI** (Python) — async REST API, easy to learn and fast
- **Supabase** — PostgreSQL database + real-time subscriptions + auth

### AI
- **Google Gemini 1.5 Flash** — fast, cheap, great for summarisation tasks

### Data Sources (free tier)
- **football-data.org API** — fixtures, teams, players
- **NewsAPI / GNews** — football news headlines
- **API-Football (RapidAPI)** — injury and squad data

### Infra
- **Vercel** — deploy Next.js frontend (free tier)
- **Railway / Render** — deploy FastAPI backend (free tier)
- **Supabase** — managed Postgres (free tier)

---

## Team
- Lead Engineer: Vikas (you!)
- AI Pair: Claude Code

---

## Definition of MVP Done
- [ ] User can view latest football news
- [ ] User can view injury/availability status for World Cup teams
- [ ] User can view transfer updates
- [ ] AI generates a daily briefing summary
- [ ] Deployed and publicly accessible
