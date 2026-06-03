import os
import httpx
from dotenv import load_dotenv

load_dotenv()

FOOTBALL_API_KEY = os.getenv("FOOTBALL_API_KEY", "").strip()


async def get_fixtures() -> list[dict]:
    """
    Fetch World Cup 2026 fixtures from football-data.org.
    Falls back to mock data if API fails or competition not available yet.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.football-data.org/v4/competitions/WC/matches",
                headers={"X-Auth-Token": FOOTBALL_API_KEY},
                timeout=10,
            )
            response.raise_for_status()
            data = response.json()

        matches = []
        for m in data.get("matches", []):
            matches.append({
                "id": m.get("id"),
                "home_team": m.get("homeTeam", {}).get("name", "TBD"),
                "away_team": m.get("awayTeam", {}).get("name", "TBD"),
                "date": m.get("utcDate"),
                "status": m.get("status"),
                "stage": m.get("stage"),
                "group": m.get("group"),
                "home_score": m.get("score", {}).get("fullTime", {}).get("home"),
                "away_score": m.get("score", {}).get("fullTime", {}).get("away"),
                "venue": m.get("venue"),
            })
        return matches

    except Exception as e:
        print(f"⚠️ Fixtures API error: {e} — using mock data")
        return get_mock_fixtures()


def get_mock_fixtures() -> list[dict]:
    return [
        {"id": 1, "home_team": "Mexico", "away_team": "Poland", "date": "2026-06-11T19:00:00Z", "status": "SCHEDULED", "stage": "GROUP_STAGE", "group": "Group A", "home_score": None, "away_score": None, "venue": "Estadio Azteca, Mexico City"},
        {"id": 2, "home_team": "USA", "away_team": "Serbia", "date": "2026-06-12T00:00:00Z", "status": "SCHEDULED", "stage": "GROUP_STAGE", "group": "Group A", "home_score": None, "away_score": None, "venue": "SoFi Stadium, Los Angeles"},
        {"id": 3, "home_team": "Brazil", "away_team": "Croatia", "date": "2026-06-12T19:00:00Z", "status": "SCHEDULED", "stage": "GROUP_STAGE", "group": "Group B", "home_score": None, "away_score": None, "venue": "MetLife Stadium, New York"},
        {"id": 4, "home_team": "England", "away_team": "Argentina", "date": "2026-06-13T00:00:00Z", "status": "SCHEDULED", "stage": "GROUP_STAGE", "group": "Group C", "home_score": None, "away_score": None, "venue": "AT&T Stadium, Dallas"},
        {"id": 5, "home_team": "France", "away_team": "Germany", "date": "2026-06-13T19:00:00Z", "status": "SCHEDULED", "stage": "GROUP_STAGE", "group": "Group D", "home_score": None, "away_score": None, "venue": "Levi's Stadium, San Francisco"},
        {"id": 6, "home_team": "Spain", "away_team": "Morocco", "date": "2026-06-14T00:00:00Z", "status": "SCHEDULED", "stage": "GROUP_STAGE", "group": "Group E", "home_score": None, "away_score": None, "venue": "Rose Bowl, Los Angeles"},
        {"id": 7, "home_team": "Portugal", "away_team": "Uruguay", "date": "2026-06-14T19:00:00Z", "status": "SCHEDULED", "stage": "GROUP_STAGE", "group": "Group F", "home_score": None, "away_score": None, "venue": "Arrowhead Stadium, Kansas City"},
        {"id": 8, "home_team": "Netherlands", "away_team": "Senegal", "date": "2026-06-15T00:00:00Z", "status": "SCHEDULED", "stage": "GROUP_STAGE", "group": "Group G", "home_score": None, "away_score": None, "venue": "BC Place, Vancouver"},
        {"id": 9, "home_team": "Canada", "away_team": "Belgium", "date": "2026-06-15T19:00:00Z", "status": "SCHEDULED", "stage": "GROUP_STAGE", "group": "Group H", "home_score": None, "away_score": None, "venue": "BMO Field, Toronto"},
        {"id": 10, "home_team": "Japan", "away_team": "South Korea", "date": "2026-06-16T00:00:00Z", "status": "SCHEDULED", "stage": "GROUP_STAGE", "group": "Group I", "home_score": None, "away_score": None, "venue": "Gillette Stadium, Boston"},
    ]
