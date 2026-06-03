import { fetchNews } from "@/lib/api";
import NewsCard from "@/components/NewsCard";

export default async function NewsPage() {
  const data = await fetchNews().catch(() => null);
  const articles = data?.articles || [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">📰 Football News</h1>
        <p className="text-gray-400 text-sm">
          Latest headlines • Refreshed every 15 minutes
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article: any, i: number) => (
            <NewsCard key={i} article={article} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
          <p className="text-gray-400">Could not load news. Make sure the backend is running.</p>
        </div>
      )}
    </div>
  );
}
