import os
import httpx
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv
from database import supabase

load_dotenv()

GUARDIAN_API_KEY = os.getenv("GUARDIAN_API_KEY")


async def get_transfers() -> list[dict]:
    """
    Returns latest transfer news.
    Cached for 30 minutes in Supabase.
    """
    cached = get_cached_transfers()
    if cached:
        print("✅ Returning cached transfers")
        return cached

    print("🌐 Fetching fresh transfer news...")
    transfers = await fetch_transfers_from_guardian()

    if transfers:
        save_transfers(transfers)

    return transfers


def get_cached_transfers() -> list[dict]:
    thirty_mins_ago = (datetime.now(timezone.utc) - timedelta(minutes=30)).isoformat()

    response = (
        supabase.table("transfers")
        .select("*")
        .gte("fetched_at", thirty_mins_ago)
        .order("published_at", desc=True)
        .limit(20)
        .execute()
    )

    return response.data if response.data else []


async def fetch_transfers_from_guardian() -> list[dict]:
    """
    Search Guardian for transfer news articles.
    We parse headlines to extract transfer info.
    """
    url = "https://content.guardianapis.com/search"
    params = {
        "q": "football transfer",
        "section": "football",
        "order-by": "newest",
        "page-size": 20,
        "api-key": GUARDIAN_API_KEY,
        "show-fields": "trailText",
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()

        results = data.get("response", {}).get("results", [])

        transfers = []
        for item in results:
            transfers.append({
                "player_name": extract_player_name(item.get("webTitle", "")),
                "from_team": None,   # Would need NLP to extract — future feature
                "to_team": None,
                "fee": None,
                "status": "rumour",  # Guardian articles are mostly rumours
                "published_at": item.get("webPublicationDate"),
                # Store extra fields we need for display
                "title": item.get("webTitle", ""),
                "description": item.get("fields", {}).get("trailText", ""),
                "url": item.get("webUrl", ""),
            })

        return transfers

    except Exception as e:
        print(f"❌ Guardian transfer fetch error: {e}")
        return []


def extract_player_name(title: str) -> str:
    """
    Naive extraction — just return first few words of headline as player ref.
    Good enough for MVP. Can improve with NLP later.
    """
    words = title.split()
    return " ".join(words[:3]) if len(words) >= 3 else title


def save_transfers(transfers: list[dict]):
    try:
        # Only save the fields that match our DB schema
        to_save = [
            {
                "player_name": t["player_name"],
                "from_team": t.get("from_team"),
                "to_team": t.get("to_team"),
                "fee": t.get("fee"),
                "status": t.get("status", "rumour"),
                "published_at": t.get("published_at"),
            }
            for t in transfers
        ]
        supabase.table("transfers").upsert(to_save, on_conflict="player_name").execute()
        print(f"💾 Saved {len(to_save)} transfers to Supabase")
    except Exception as e:
        print(f"❌ Failed to save transfers: {e}")
