from fastapi import APIRouter
from services.team_service import get_teams

router = APIRouter(prefix="/api/teams", tags=["Teams"])


@router.get("/")
async def fetch_teams():
    """
    Returns World Cup 2026 team list with squad info.
    """
    teams = await get_teams()
    return {
        "count": len(teams),
        "teams": teams
    }
