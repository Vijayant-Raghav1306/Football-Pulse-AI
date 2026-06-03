import { fetchTransfers } from "@/lib/api";
import TransferCard from "@/components/TransferCard";

export default async function TransfersPage() {
  const data = await fetchTransfers().catch(() => null);
  const transfers = data?.transfers || [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">🔄 Transfer Updates</h1>
        <p className="text-gray-400 text-sm">
          Latest rumours and confirmed moves • Refreshed every 30 minutes
        </p>
      </div>

      {transfers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transfers.map((transfer: any, i: number) => (
            <TransferCard key={i} transfer={transfer} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
          <p className="text-gray-400">Could not load transfer data.</p>
        </div>
      )}
    </div>
  );
}
