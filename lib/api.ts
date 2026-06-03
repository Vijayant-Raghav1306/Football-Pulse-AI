const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchNews() {
  const res = await fetch(`${API_URL}/api/news/`, { next: { revalidate: 900 } });
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export async function fetchInjuries(team?: string) {
  const url = team
    ? `${API_URL}/api/injuries/?team=${encodeURIComponent(team)}`
    : `${API_URL}/api/injuries/`;
  const res = await fetch(url, { next: { revalidate: 900 } });
  if (!res.ok) throw new Error("Failed to fetch injuries");
  return res.json();
}

export async function fetchTransfers() {
  const res = await fetch(`${API_URL}/api/transfers/`, { next: { revalidate: 1800 } });
  if (!res.ok) throw new Error("Failed to fetch transfers");
  return res.json();
}

export async function fetchTeams() {
  const res = await fetch(`${API_URL}/api/teams/`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch teams");
  return res.json();
}

export async function fetchFixtures() {
  const res = await fetch(`${API_URL}/api/fixtures/`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch fixtures");
  return res.json();
}

export async function askQuestion(question: string) {
  const res = await fetch(`${API_URL}/api/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error("Failed to get answer");
  return res.json();
}

export async function fetchSummary() {
  const res = await fetch(`${API_URL}/api/summary/`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch summary");
  return res.json();
}
