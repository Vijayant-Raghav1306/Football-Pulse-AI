export interface Injury {
  player_name: string;
  team: string;
  status: string;
  reason?: string;
  return_date?: string;
}

const statusStyles: Record<string, string> = {
  out: "bg-red-900 text-red-300 border-red-700",
  doubtful: "bg-yellow-900 text-yellow-300 border-yellow-700",
  fit: "bg-green-900 text-green-300 border-green-700",
};

export default function InjuryTable({ injuries }: { injuries: Injury[] }) {
  if (!injuries.length) {
    return <p className="text-gray-500 text-sm">No injury data available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400 text-left">
            <th className="pb-3 font-medium">Player</th>
            <th className="pb-3 font-medium">Team</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Reason</th>
            <th className="pb-3 font-medium">Return</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {injuries.map((injury, i) => (
            <tr key={i} className="hover:bg-gray-800 transition-colors">
              <td className="py-3 text-white font-medium">{injury.player_name}</td>
              <td className="py-3 text-gray-300">{injury.team}</td>
              <td className="py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs border capitalize ${
                    statusStyles[injury.status] || statusStyles.fit
                  }`}
                >
                  {injury.status}
                </span>
              </td>
              <td className="py-3 text-gray-400">{injury.reason || "—"}</td>
              <td className="py-3 text-gray-400">{injury.return_date || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
