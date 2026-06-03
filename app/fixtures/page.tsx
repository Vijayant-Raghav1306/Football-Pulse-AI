import { fetchFixtures } from "@/lib/api";

export default async function FixturesPage() {
  const data = await fetchFixtures().catch(() => null);
  const fixtures = data?.fixtures || [];

  // Group fixtures by group/stage
  const grouped: Record<string, any[]> = {};
  for (const fixture of fixtures) {
    const key = fixture.group || fixture.stage || "Other";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(fixture);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">📅 Fixtures</h1>
        <p className="text-gray-400 text-sm">
          FIFA World Cup 2026 — Match Schedule
        </p>
      </div>

      {Object.keys(grouped).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(grouped).map(([group, matches]) => (
            <div key={group}>
              <h2 className="text-green-400 font-semibold text-sm uppercase tracking-wider mb-3">
                {group}
              </h2>
              <div className="space-y-2">
                {matches.map((match) => (
                  <FixtureRow key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
          <p className="text-gray-400">Could not load fixtures.</p>
        </div>
      )}
    </div>
  );
}

function FixtureRow({ match }: { match: any }) {
  const date = match.date
    ? new Date(match.date).toLocaleDateString("en-GB", {
        weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
      })
    : "TBD";

  const isPlayed = match.home_score !== null && match.away_score !== null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
      <div className="text-right flex-1">
        <span className="text-white font-semibold text-sm">{match.home_team}</span>
      </div>

      <div className="text-center min-w-[100px]">
        {isPlayed ? (
          <span className="text-green-400 font-bold text-lg">
            {match.home_score} — {match.away_score}
          </span>
        ) : (
          <div>
            <span className="text-gray-400 text-xs block">vs</span>
            <span className="text-gray-500 text-xs">{date}</span>
          </div>
        )}
      </div>

      <div className="text-left flex-1">
        <span className="text-white font-semibold text-sm">{match.away_team}</span>
      </div>

      {match.venue && (
        <div className="hidden md:block text-right min-w-[180px]">
          <span className="text-gray-500 text-xs">{match.venue}</span>
        </div>
      )}
    </div>
  );
}
