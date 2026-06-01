# Football Pulse AI — Task List

> Status: `[ ]` todo · `[~]` in progress · `[x]` done
> We have ~10 days before the World Cup. Prioritise ruthlessly.

---

## Phase 0 — Setup (Day 1) ← START HERE

- [ ] **T-01** Create GitHub repository and push this folder
- [ ] **T-02** Sign up for free accounts:
  - Supabase (supabase.com)
  - Google AI Studio — get Gemini API key (aistudio.google.com)
  - football-data.org — get free API key
  - NewsAPI (newsapi.org) — get free API key
- [ ] **T-03** Scaffold Next.js frontend: `npx create-next-app@latest frontend`
- [ ] **T-04** Scaffold FastAPI backend (create `backend/` folder with `main.py`)
- [ ] **T-05** Create `.env` files (frontend + backend) and add to `.gitignore`
- [ ] **T-06** Create Supabase project, run schema SQL from ARCHITECTURE.md

---

## Phase 1 — Backend Core (Days 2–4)

- [ ] **T-07** Set up FastAPI project structure (routers, services, models)
- [ ] **T-08** Connect FastAPI to Supabase using `supabase-py`
- [ ] **T-09** Build `/api/news` endpoint — fetch from NewsAPI, cache in Supabase
- [ ] **T-10** Build `/api/injuries` endpoint — fetch from API-Football, cache in Supabase
- [ ] **T-11** Build `/api/transfers` endpoint — fetch + cache
- [ ] **T-12** Build `/api/teams` endpoint — squad availability per team
- [ ] **T-13** Build `/api/summary` endpoint — call Gemini, store result, return it
- [ ] **T-14** Add CORS middleware so the frontend can call the backend locally

---

## Phase 2 — Frontend Core (Days 3–5, parallel with backend)

- [ ] **T-15** Set up Tailwind CSS + shadcn/ui in the Next.js project
- [ ] **T-16** Build shared layout: Navbar with links to all sections
- [ ] **T-17** Build `NewsCard` component (title, source, date, link)
- [ ] **T-18** Build `/news` page — fetches from backend, renders NewsCards
- [ ] **T-19** Build `InjuryTable` component (player, team, status, return date)
- [ ] **T-20** Build `/injuries` page
- [ ] **T-21** Build `TeamAvailability` component (squad grid with status badges)
- [ ] **T-22** Build `/teams` page with team selector
- [ ] **T-23** Build `/transfers` page
- [ ] **T-24** Build `AISummaryBanner` on the home page — shows today's Gemini briefing

---

## Phase 3 — Polish & Integration (Days 6–7)

- [ ] **T-25** End-to-end test: all pages load real data from backend
- [ ] **T-26** Add loading skeletons (so pages don't flash blank while fetching)
- [ ] **T-27** Add error states ("Could not load data, try again")
- [ ] **T-28** Mobile responsive check on all pages
- [ ] **T-29** Add auto-refresh: news and injuries refresh every 15 minutes

---

## Phase 4 — Deployment (Days 8–9)

- [ ] **T-30** Deploy FastAPI to Railway (or Render)
- [ ] **T-31** Set environment variables in Railway dashboard
- [ ] **T-32** Deploy Next.js to Vercel — connect to GitHub repo
- [ ] **T-33** Set `NEXT_PUBLIC_API_URL` in Vercel to the Railway backend URL
- [ ] **T-34** Smoke test the deployed app end-to-end

---

## Phase 5 — MVP Buffer (Day 10)

- [ ] **T-35** Fix any bugs found in smoke test
- [ ] **T-36** Share the live URL

---

## Backlog (Post-MVP / Nice to Have)

- [ ] User authentication (Supabase Auth)
- [ ] Favourite teams / personalisation
- [ ] Match score live ticker
- [ ] Push notifications for injury alerts
- [ ] Historical injury trend charts

---

## Learning Checkpoints

After each phase, ask yourself (or ask Claude):

| Phase | Question to answer |
|-------|--------------------|
| 0 | Why do we use environment variables instead of hardcoding API keys? |
| 1 | What is the difference between a GET and POST request? |
| 2 | What is a React component, and why do we break the UI into components? |
| 3 | What does "cache" mean and why does it matter for API quota? |
| 4 | What happens when you deploy — where does the code actually run? |

> You're not just building an app. You're learning how real production systems work. Every task is a lesson.
