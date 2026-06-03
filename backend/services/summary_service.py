import os
import sys
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv

try:
    from groq import Groq
except ImportError:
    print("⚠️ groq package not found. Install with: pip install groq")
    sys.exit(1)

from database import supabase

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


async def get_daily_summary() -> dict:
    """
    Returns today's AI-generated football briefing.
    Cached for 1 hour — no point generating every request.
    """
    cached = get_cached_summary()
    if cached:
        print("✅ Returning cached AI summary")
        return cached

    print("🤖 Generating new AI summary with Groq...")
    summary = await generate_summary()

    if summary:
        save_summary(summary)

    return {"content": summary, "generated_at": datetime.now(timezone.utc).isoformat()}


def get_cached_summary() -> dict | None:
    one_hour_ago = (datetime.now(timezone.utc) - timedelta(hours=1)).isoformat()

    response = (
        supabase.table("summaries")
        .select("*")
        .eq("summary_type", "daily")
        .gte("generated_at", one_hour_ago)
        .order("generated_at", desc=True)
        .limit(1)
        .execute()
    )

    return response.data[0] if response.data else None


def get_real_headlines() -> str:
    """
    Fetch the latest article titles from Supabase to ground the AI in real news.
    """
    try:
        response = (
            supabase.table("articles")
            .select("title, source, published_at")
            .order("published_at", desc=True)
            .limit(10)
            .execute()
        )
        if not response.data:
            return "No recent headlines available."

        lines = []
        for a in response.data:
            lines.append(f"- {a['title']} ({a.get('source', 'Unknown')})")
        return "\n".join(lines)
    except Exception as e:
        print(f"⚠️ Could not fetch headlines for summary: {e}")
        return "No recent headlines available."


async def generate_summary() -> str:
    today = datetime.now().strftime("%B %d, %Y")
    headlines = get_real_headlines()

    prompt = f"""
    You are a football journalist writing a daily briefing for fans ahead of the 2026 FIFA World Cup.
    Today's date is {today}.

    Here are the latest real football headlines from today:
    {headlines}

    Using ONLY the information from these headlines above (do not invent stories),
    write a concise, engaging daily football briefing (200-250 words) that covers
    the key themes: match news, injury concerns, transfers, and storylines to watch.

    If a topic has no headlines, skip it — do not make anything up.
    Write in an energetic, fan-friendly tone. Use short paragraphs.
    Do not use markdown headers — plain text only.
    """

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=400,
        )
        return response.choices[0].message.content

    except Exception as e:
        print(f"❌ Groq error: {e}")
        return "AI summary temporarily unavailable. Check back shortly."


def save_summary(content: str):
    try:
        supabase.table("summaries").insert({
            "content": content,
            "summary_type": "daily",
        }).execute()
        print("💾 Saved AI summary to Supabase")
    except Exception as e:
        print(f"❌ Failed to save summary: {e}")
