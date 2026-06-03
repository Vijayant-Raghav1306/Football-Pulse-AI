from fastapi import APIRouter, Query
from services.injury_service import get_injuries

router = APIRouter(prefix="/api/injuries", tags=["Injuries"])


@router.get("/")
async def fetch_injuries(team: str = Query(None, description="Filter by team name e.g. England")):
    """
    Returns player injury and availability status.
    Optionally filter by team name.
    """
    injuries = await get_injuries(team=team)
    return {
        "count": len(injuries),
        "injuries": injuries
    }
