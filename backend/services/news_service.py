import os
import httpx
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv
from database import supabase

load_dotenv()

GUARDIAN_API_KEY = os.getenv("GUARDIAN_API_KEY")
GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")


async def get_news() -> list[dict]:
    """
    Main function: returns football news.
    Tries cache first, falls back to fetching from APIs.
    """
    cached = get_cached_articles()
    if cached:
        print("✅ Returning cached news from Supabase")
        return cached

    print("🌐 Cache stale — fetching fresh news...")
    articles = await fetch_from_guardian()

    # If Guardian fails, try GNews as backup
    if not articles:
        print("⚠️ Guardian failed — trying GNews backup...")
        articles = await fetch_from_gnews()

    if articles:
        save_articles(articles)

    return articles


def get_cached_articles() -> list[dict]:
    """
    Check Supabase for articles fetched in the last 15 minutes.
    If found, return them. Otherwise return empty list.
    """
    fifteen_mins_ago = (datetime.now(timezone.utc) - timedelta(minutes=15)).isoformat()

    response = (
        supabase.table("articles")
        .select("*")
        .gte("fetched_at", fifteen_mins_ago)
        .order("published_at", desc=True)
        .limit(20)
        .execute()
    )

    return response.data if response.data else []


async def fetch_from_guardian() -> list[dict]:
    """
    Fetch latest football news from The Guardian API.
    """
    url = "https://content.guardianapis.com/search"
    params = {
        "q": "football",
        "section": "football",
        "order-by": "newest",
        "page-size": 20,
        "api-key": GUARDIAN_API_KEY,
        "show-fields": "trailText,thumbnail",
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()

        results = data.get("response", {}).get("results", [])

        # Shape the data into our standard format
        articles = []
        for item in results:
            articles.append({
                "title": item.get("webTitle", ""),
                "description": item.get("fields", {}).get("trailText", ""),
                "url": item.get("webUrl", ""),
                "source": "The Guardian",
                "published_at": item.get("webPublicationDate"),
            })

        return articles

    except Exception as e:
        print(f"❌ Guardian API error: {e}")
        return []


async def fetch_from_gnews() -> list[dict]:
    """
    Fallback: fetch football news from GNews API.
    """
    url = "https://gnews.io/api/v4/search"
    params = {
        "q": "football",
        "lang": "en",
        "max": 20,
        "token": GNEWS_API_KEY,
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()

        articles = []
        for item in data.get("articles", []):
            articles.append({
                "title": item.get("title", ""),
                "description": item.get("description", ""),
                "url": item.get("url", ""),
                "source": item.get("source", {}).get("name", "GNews"),
                "published_at": item.get("publishedAt"),
            })

        return articles

    except Exception as e:
        print(f"❌ GNews API error: {e}")
        return []


def save_articles(articles: list[dict]):
    """
    Save fetched articles to Supabase.
    'upsert' means: insert new, skip duplicates (based on url).
    """
    try:
        supabase.table("articles").upsert(articles, on_conflict="url").execute()
        print(f"💾 Saved {len(articles)} articles to Supabase")
    except Exception as e:
        print(f"❌ Failed to save articles: {e}")
