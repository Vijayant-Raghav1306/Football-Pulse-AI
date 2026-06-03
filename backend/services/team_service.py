import os
import httpx
from dotenv import load_dotenv
from database import supabase

load_dotenv()

FOOTBALL_API_KEY = os.getenv("FOOTBALL_API_KEY").strip()

# World Cup 2026 — competition ID on football-data.org is WC
WC_TEAMS = [
    "Argentina", "France", "Brazil", "England", "Spain",
    "Germany", "Portugal", "Netherlands", "Belgium", "Italy",
    "USA", "Mexico", "Canada", "Morocco", "Senegal",
    "Japan", "South Korea", "Australia", "Croatia", "Uruguay"
]


async def get_teams() -> list[dict]:
    """
    Returns World Cup team availability overview.
    Uses football-data.org for squad info.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.football-data.org/v4/competitions/WC/teams",
                headers={"X-Auth-Token": FOOTBALL_API_KEY},
                timeout=10,
            )
            response.raise_for_status()
            data = response.json()

        teams = []
        for team in data.get("teams", []):
            teams.append({
                "id": team.get("id"),
                "name": team.get("name"),
                "crest": team.get("crest"),
                "squad_size": len(team.get("squad", [])),
                "coach": team.get("coach", {}).get("name", "Unknown"),
            })

        return teams

    except Exception as e:
        print(f"⚠️ football-data.org error: {e} — returning mock teams")
        return get_mock_teams()


def get_mock_teams() -> list[dict]:
    """
    Fallback mock team list if API fails.
    """
    return [
        {"id": 1, "name": team, "crest": None, "squad_size": 26, "coach": "TBC"}
        for team in WC_TEAMS
    ]
