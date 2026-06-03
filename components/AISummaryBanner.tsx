export default function AISummaryBanner({ content }: { content: string }) {
  return (
    <div className="bg-gradient-to-r from-green-900 to-emerald-800 border border-green-700 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🤖</span>
        <span className="text-green-300 font-semibold text-sm uppercase tracking-wider">
          AI Daily Briefing
        </span>
        <span className="ml-auto text-xs text-green-500 bg-green-900 px-2 py-1 rounded-full">
          Powered by Groq
        </span>
      </div>
      <p className="text-gray-100 leading-relaxed whitespace-pre-line">{content}</p>
    </div>
  );
}
