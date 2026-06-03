from fastapi import APIRouter, HTTPException
from services.news_service import get_news

router = APIRouter(prefix="/api/news", tags=["News"])


@router.get("/")
async def fetch_news():
    """
    Returns the latest football news articles.
    Cached for 15 minutes to protect API quota.
    """
    try:
        articles = await get_news()

        if not articles:
            raise HTTPException(status_code=503, detail="Could not fetch news. Try again shortly.")

        return {
            "count": len(articles),
            "articles": articles
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
