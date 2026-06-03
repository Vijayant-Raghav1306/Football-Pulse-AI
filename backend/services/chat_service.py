import os
import httpx
from groq import Groq
from dotenv import load_dotenv
from database import supabase

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
GUARDIAN_API_KEY = os.getenv("GUARDIAN_API_KEY")
FOOTBALL_API_KEY = os.getenv("FOOTBALL_API_KEY", "").strip()

# Map common country names to football-data.org team IDs
TEAM_IDS = {
    "portugal": 765, "brazil": 764, "france": 773, "england": 770,
    "spain": 760, "germany": 759, "argentina": 762, "netherlands": 779,
    "belgium": 763, "italy": 784, "usa": 768, "mexico": 758,
    "croatia": 799, "morocco": 1009, "senegal": 907, "japan": 801,
    "south korea": 772, "australia": 797, "uruguay": 769, "canada": 771,
}


async def answer_question(question: str) -> dict:
    """
    Smart question answering:
    - Squad/team questions → fetch real squad from football-data.org
    - News/transfer/injury questions → search articles + Guardian live
    """
    q = question.lower()

    # Detect if it's a squad/team question
    squad_keywords = ["squad", "players", "team", "lineup", "roster", "who plays", "starting", "availability"]
    is_squad_question = any(kw in q for kw in squad_keywords)

    # Detect which team is being asked about
    team_name, team_id = detect_team(q)

    # Route to best data source
    extra_context = ""
    if is_squad_question and team_id:
        print(f"🏟️ Squad question detected for {team_name} — fetching from football-data.org")
        squad_data = await fetch_squad(team_id, team_name)
        if squad_data:
            extra_context = f"\n\nOFFICIAL SQUAD DATA for {team_name}:\n{squad_data}"

    # Always get news articles too
    matched = search_articles(question)
    if len(matched) < 2:
        live = await search_guardian_live(question)
        matched = live + matched

    latest = get_latest_articles()
    seen_urls = {a.get("url") for a in matched}
    combined = matched + [a for a in latest if a.get("url") not in seen_urls]
    articles = combined[:6]

    news_context = "\n\n".join([
        f"Headline: {a['title']}\nDetails: {a.get('description') or ''}\nSource: {a.get('source', '')}"
        for a in articles
    ])

    prompt = f"""You are a knowledgeable football assistant for a World Cup 2026 app.

User question: {question}
{extra_context}

Recent football news:
{news_context}

Instructions:
- Use the squad data (if provided) to answer squad/player questions accurately.
- Use the news articles for transfer, injury, and match news.
- If you have solid general football knowledge on the topic, use it too.
- Be concise (3-5 sentences), confident, and engaging.
- Never say you have no information — always give the best answer you can.

Answer:"""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300,
        )
        answer = response.choices[0].message.content
        sources = [{"title": a["title"], "url": a.get("url"), "source": a.get("source")} for a in articles[:3]]
        return {"answer": answer, "sources": sources}

    except Exception as e:
        print(f"❌ Groq error: {e}")
        return {"answer": "Sorry, I couldn't process your question right now.", "sources": []}


def detect_team(question: str):
    """Returns (team_name, team_id) if a known team is mentioned, else (None, None)."""
    for name, tid in TEAM_IDS.items():
        if name in question:
            return name.title(), tid
    return None, None


async def fetch_squad(team_id: int, team_name: str) -> str:
    """
    Fetch squad from football-data.org and format it as readable text for Groq.
    """
    try:
        async with httpx.AsyncClient() as http:
            res = await http.get(
                f"https://api.football-data.org/v4/teams/{team_id}",
                headers={"X-Auth-Token": FOOTBALL_API_KEY},
                timeout=10,
            )
            res.raise_for_status()
            data = res.json()

        squad = data.get("squad", [])
        if not squad:
            return ""

        # Group by position
        groups: dict[str, list[str]] = {}
        for player in squad:
            pos = player.get("position", "Unknown")
            name = player.get("name", "Unknown")
            nationality = player.get("nationality", "")
            groups.setdefault(pos, []).append(f"{name} ({nationality})")

        lines = []
        for pos, players in groups.items():
            lines.append(f"{pos}: {', '.join(players)}")

        coach = data.get("coach", {}).get("name", "Unknown")
        lines.insert(0, f"Coach: {coach}")

        return "\n".join(lines)

    except Exception as e:
        print(f"⚠️ Squad fetch error for team {team_id}: {e}")
        return ""


async def search_guardian_live(query: str) -> list[dict]:
    """Search Guardian API live for a specific query."""
    try:
        async with httpx.AsyncClient() as http:
            res = await http.get(
                "https://content.guardianapis.com/search",
                params={
                    "q": query,
                    "section": "football",
                    "order-by": "newest",
                    "page-size": 5,
                    "api-key": GUARDIAN_API_KEY,
                    "show-fields": "trailText",
                },
                timeout=10,
            )
            res.raise_for_status()
            data = res.json()

        results = data.get("response", {}).get("results", [])
        print(f"🌐 Guardian live search for '{query}' — {len(results)} results")
        return [
            {
                "title": item.get("webTitle", ""),
                "description": item.get("fields", {}).get("trailText", ""),
                "url": item.get("webUrl", ""),
                "source": "The Guardian",
                "published_at": item.get("webPublicationDate"),
            }
            for item in results
        ]
    except Exception as e:
        print(f"❌ Guardian live search error: {e}")
        return []


def get_latest_articles() -> list[dict]:
    """Fetch the 10 most recent articles from Supabase."""
    try:
        response = supabase.table("articles").select("*").order("published_at", desc=True).limit(10).execute()
        return response.data or []
    except Exception as e:
        print(f"❌ Latest articles error: {e}")
        return []


def search_articles(query: str) -> list[dict]:
    """Keyword search across article titles in Supabase."""
    try:
        keywords = [w for w in query.lower().split() if len(w) > 3]
        if not keywords:
            keywords = query.lower().split()

        for keyword in keywords:
            response = (
                supabase.table("articles")
                .select("*")
                .ilike("title", f"%{keyword}%")
                .order("published_at", desc=True)
                .limit(5)
                .execute()
            )
            if response.data:
                return response.data

        return []
    except Exception as e:
        print(f"❌ Article search error: {e}")
        return []
