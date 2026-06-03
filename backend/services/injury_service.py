from database import supabase
from datetime import datetime, timezone


# Realistic mock injury data for World Cup 2026 teams
MOCK_INJURIES = [
    {
        "player_name": "Bukayo Saka",
        "team": "England",
        "status": "doubtful",
        "reason": "Hamstring strain",
        "return_date": "2026-06-10",
    },
    {
        "player_name": "Rodri",
        "team": "Spain",
        "status": "out",
        "reason": "ACL recovery",
        "return_date": "2026-07-01",
    },
    {
        "player_name": "Virgil van Dijk",
        "team": "Netherlands",
        "status": "fit",
        "reason": None,
        "return_date": None,
    },
    {
        "player_name": "Raphinha",
        "team": "Brazil",
        "status": "doubtful",
        "reason": "Ankle knock",
        "return_date": "2026-06-08",
    },
    {
        "player_name": "Kylian Mbappé",
        "team": "France",
        "status": "fit",
        "reason": None,
        "return_date": None,
    },
    {
        "player_name": "Pedri",
        "team": "Spain",
        "status": "out",
        "reason": "Knee injury",
        "return_date": "2026-06-20",
    },
    {
        "player_name": "Jamal Musiala",
        "team": "Germany",
        "status": "fit",
        "reason": None,
        "return_date": None,
    },
    {
        "player_name": "Lamine Yamal",
        "team": "Spain",
        "status": "fit",
        "reason": None,
        "return_date": None,
    },
    {
        "player_name": "Marcus Rashford",
        "team": "England",
        "status": "out",
        "reason": "Not selected",
        "return_date": None,
    },
    {
        "player_name": "Vinicius Jr",
        "team": "Brazil",
        "status": "fit",
        "reason": None,
        "return_date": None,
    },
]


async def get_injuries(team: str = None) -> list[dict]:
    """
    Returns injury data. Optionally filter by team name.
    Tries Supabase first, falls back to mock data.
    """
    # Try to get from Supabase
    try:
        query = supabase.table("injuries").select("*").order("updated_at", desc=True)
        if team:
            query = query.eq("team", team)
        response = query.execute()

        if response.data:
            return response.data
    except Exception as e:
        print(f"⚠️ Supabase read failed: {e}")

    # Fall back to mock data
    print("📋 Using mock injury data")
    injuries = MOCK_INJURIES

    if team:
        injuries = [i for i in injuries if i["team"].lower() == team.lower()]

    # Seed mock data into Supabase for future use
    seed_mock_injuries()

    return injuries


def seed_mock_injuries():
    """
    Save mock injuries into Supabase so future calls hit the cache.
    """
    try:
        supabase.table("injuries").upsert(
            MOCK_INJURIES, on_conflict="player_name"
        ).execute()
        print("💾 Seeded mock injuries into Supabase")
    except Exception as e:
        print(f"⚠️ Could not seed injuries: {e}")
