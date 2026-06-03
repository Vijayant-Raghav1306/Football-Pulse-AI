import { fetchSummary, fetchNews } from "@/lib/api";
import AISummaryBanner from "@/components/AISummaryBanner";
import CountdownBanner from "@/components/CountdownBanner";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";

export default async function HomePage() {
  const [summaryData, newsData] = await Promise.all([
    fetchSummary().catch(() => null),
    fetchNews().catch(() => null),
  ]);

  const topArticles = newsData?.articles?.slice(0, 6) || [];

  return (
    <div>
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          ⚽ Football <span className="text-green-400">Pulse AI</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Your AI-powered intelligence hub for the 2026 World Cup
        </p>
      </div>

      {/* Countdown */}
      <CountdownBanner />

      {/* AI Summary */}
      {summaryData?.content && (
        <AISummaryBanner content={summaryData.content} />
      )}

      {/* Latest News Preview */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Latest News</h2>
        <Link href="/news" className="text-green-400 hover:text-green-300 text-sm transition-colors">
          View all →
        </Link>
      </div>

      {topArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {topArticles.map((article: any, i: number) => (
            <NewsCard key={i} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-8">Could not load news. Make sure the backend is running.</p>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/injuries"
          className="bg-gray-800 hover:border-red-500 border border-gray-700 rounded-xl p-5 transition-all group">
          <div className="text-2xl mb-2">🏥</div>
          <h3 className="text-white font-semibold group-hover:text-red-400 transition-colors">Injury Updates</h3>
          <p className="text-gray-400 text-sm mt-1">Track player fitness ahead of the World Cup</p>
        </Link>
        <Link href="/transfers"
          className="bg-gray-800 hover:border-yellow-500 border border-gray-700 rounded-xl p-5 transition-all group">
          <div className="text-2xl mb-2">🔄</div>
          <h3 className="text-white font-semibold group-hover:text-yellow-400 transition-colors">Transfers</h3>
          <p className="text-gray-400 text-sm mt-1">Latest rumours and confirmed moves</p>
        </Link>
        <Link href="/teams"
          className="bg-gray-800 hover:border-blue-500 border border-gray-700 rounded-xl p-5 transition-all group">
          <div className="text-2xl mb-2">🌍</div>
          <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">Teams</h3>
          <p className="text-gray-400 text-sm mt-1">World Cup 2026 squad availability</p>
        </Link>
      </div>
    </div>
  );
}
