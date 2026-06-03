from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import news, injuries, teams, transfers, summary, fixtures, chat

app = FastAPI(title="Football Pulse AI", version="1.0.0")

# CORS — allows our Next.js frontend to call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tightened after launch with exact Vercel URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(news.router)
app.include_router(injuries.router)
app.include_router(teams.router)
app.include_router(transfers.router)
app.include_router(summary.router)
app.include_router(fixtures.router)
app.include_router(chat.router)

@app.get("/")
def health_check():
    return {"status": "Football Pulse AI is running 🚀"}
