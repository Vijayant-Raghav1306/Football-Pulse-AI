from fastapi import APIRouter
from services.fixtures_service import get_fixtures

router = APIRouter(prefix="/api/fixtures", tags=["Fixtures"])


@router.get("/")
async def fetch_fixtures():
    """
    Returns World Cup 2026 match fixtures.
    """
    fixtures = await get_fixtures()
    return {
        "count": len(fixtures),
        "fixtures": fixtures
    }
