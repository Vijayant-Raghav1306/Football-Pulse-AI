export interface Transfer {
  title?: string;
  description?: string;
  url?: string;
  player_name: string;
  from_team?: string;
  to_team?: string;
  fee?: string;
  status: string;
  published_at?: string;
}

const statusStyles: Record<string, string> = {
  confirmed: "bg-green-900 text-green-300 border-green-700",
  rumour: "bg-yellow-900 text-yellow-300 border-yellow-700",
};

export default function TransferCard({ transfer }: { transfer: Transfer }) {
  const date = transfer.published_at
    ? new Date(transfer.published_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    : null;

  const content = transfer.url ? (
    <a href={transfer.url} target="_blank" rel="noopener noreferrer"
      className="block bg-gray-800 hover:border-green-600 border border-gray-700 rounded-xl p-5 transition-all duration-200 group">
      <TransferCardInner transfer={transfer} date={date} />
    </a>
  ) : (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
      <TransferCardInner transfer={transfer} date={date} />
    </div>
  );

  return content;
}

function TransferCardInner({ transfer, date }: { transfer: Transfer; date: string | null }) {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <span
          className={`px-2 py-1 rounded-full text-xs border capitalize ${
            statusStyles[transfer.status] || statusStyles.rumour
          }`}
        >
          {transfer.status}
        </span>
        {date && <span className="text-xs text-gray-500">{date}</span>}
      </div>
      <h3 className="text-white font-semibold text-sm leading-snug mb-1 line-clamp-2">
        {transfer.title || transfer.player_name}
      </h3>
      {transfer.description && (
        <p className="text-gray-400 text-xs line-clamp-2 mt-1"
          dangerouslySetInnerHTML={{ __html: transfer.description }} />
      )}
      {(transfer.from_team || transfer.to_team) && (
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
          {transfer.from_team && <span>{transfer.from_team}</span>}
          {transfer.from_team && transfer.to_team && <span>→</span>}
          {transfer.to_team && <span className="text-green-400">{transfer.to_team}</span>}
          {transfer.fee && <span className="ml-auto text-gray-500">{transfer.fee}</span>}
        </div>
      )}
    </>
  );
}
