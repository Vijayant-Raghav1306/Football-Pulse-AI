export interface Article {
  title: string;
  description?: string;
  url: string;
  source?: string;
  published_at?: string;
}

export default function NewsCard({ article }: { article: Article }) {
  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-green-600 rounded-xl p-5 transition-all duration-200 group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-green-400 font-medium">{article.source}</span>
        {date && <span className="text-xs text-gray-500">{date}</span>}
      </div>
      <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-green-300 transition-colors line-clamp-2 mb-2">
        {article.title}
      </h3>
      {article.description && (
        <p
          className="text-gray-400 text-xs leading-relaxed line-clamp-2"
          dangerouslySetInnerHTML={{ __html: article.description }}
        />
      )}
    </a>
  );
}
