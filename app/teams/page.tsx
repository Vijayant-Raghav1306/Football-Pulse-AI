import { fetchTeams } from "@/lib/api";

export default async function TeamsPage() {
  const data = await fetchTeams().catch(() => null);
  const teams = data?.teams || [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">🌍 World Cup Teams</h1>
        <p className="text-gray-400 text-sm">
          2026 FIFA World Cup — squad overview
        </p>
      </div>

      {teams.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teams.map((team: any, i: number) => (
            <div
              key={i}
              className="bg-gray-800 border border-gray-700 hover:border-green-600 rounded-xl p-5 text-center transition-all"
            >
              {team.crest ? (
                <img src={team.crest} alt={team.name} className="w-12 h-12 mx-auto mb-3 object-contain" />
              ) : (
                <div className="text-4xl mb-3">🏳️</div>
              )}
              <h3 className="text-white font-semibold text-sm">{team.name}</h3>
              {team.coach && team.coach !== "TBC" && (
                <p className="text-gray-500 text-xs mt-1">{team.coach}</p>
              )}
              {team.squad_size > 0 && (
                <p className="text-green-400 text-xs mt-1">{team.squad_size} players</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
          <p className="text-gray-400">Could not load team data.</p>
        </div>
      )}
    </div>
  );
}
