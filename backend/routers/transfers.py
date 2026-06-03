from fastapi import APIRouter
from services.transfer_service import get_transfers

router = APIRouter(prefix="/api/transfers", tags=["Transfers"])


@router.get("/")
async def fetch_transfers():
    """
    Returns latest football transfer news.
    Cached for 30 minutes.
    """
    transfers = await get_transfers()
    return {
        "count": len(transfers),
        "transfers": transfers
    }
