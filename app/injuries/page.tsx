import { fetchInjuries } from "@/lib/api";
import InjuryTable from "@/components/InjuryTable";

export default async function InjuriesPage() {
  const data = await fetchInjuries().catch(() => null);
  const injuries = data?.injuries || [];

  const out = injuries.filter((i: any) => i.status === "out");
  const doubtful = injuries.filter((i: any) => i.status === "doubtful");
  const fit = injuries.filter((i: any) => i.status === "fit");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">🏥 Injury Updates</h1>
        <p className="text-gray-400 text-sm">
          World Cup 2026 player availability tracker
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-red-950 border border-red-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-red-400">{out.length}</div>
          <div className="text-red-300 text-sm mt-1">Out</div>
        </div>
        <div className="bg-yellow-950 border border-yellow-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-yellow-400">{doubtful.length}</div>
          <div className="text-yellow-300 text-sm mt-1">Doubtful</div>
        </div>
        <div className="bg-green-950 border border-green-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-green-400">{fit.length}</div>
          <div className="text-green-300 text-sm mt-1">Fit</div>
        </div>
      </div>

      {injuries.length > 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <InjuryTable injuries={injuries} />
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
          <p className="text-gray-400">Could not load injury data.</p>
        </div>
      )}
    </div>
  );
}
