"use client";

import { useState } from "react";
import { askQuestion } from "@/lib/api";

const SUGGESTED = [
  "What is the latest transfer news?",
  "Which players are injured for the World Cup?",
  "What happened in the Champions League?",
  "Tell me about England's World Cup squad",
];

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ answer: string; sources: any[] } | null>(null);

  const ask = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await askQuestion(q);
      setResult(data);
    } catch {
      setResult({ answer: "Something went wrong. Please try again.", sources: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">🤖 Ask Football AI</h1>
        <p className="text-gray-400 text-sm">
          Ask anything about football — answered using real, recent news
        </p>
      </div>

      {/* Search Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask(question)}
          placeholder="e.g. What is Konate's transfer situation?"
          className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 placeholder-gray-500"
        />
        <button
          onClick={() => ask(question)}
          disabled={loading || !question.trim()}
          className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors"
        >
          {loading ? "..." : "Ask"}
        </button>
      </div>

      {/* Suggested questions */}
      {!result && !loading && (
        <div className="mb-6">
          <p className="text-gray-500 text-xs mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => { setQuestion(s); ask(s); }}
                className="bg-gray-800 hover:border-green-600 border border-gray-700 text-gray-300 text-xs px-3 py-2 rounded-full transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center">
          <div className="text-green-400 text-sm animate-pulse">🤖 Searching news and thinking...</div>
        </div>
      )}

      {/* Answer */}
      {result && !loading && (
        <div className="space-y-4">
          <div className="bg-gray-800 border border-green-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-400 text-xs font-medium uppercase tracking-wider">AI Answer</span>
            </div>
            <p className="text-white leading-relaxed text-sm">{result.answer}</p>
          </div>

          {result.sources.length > 0 && (
            <div>
              <p className="text-gray-500 text-xs mb-2">Sources used:</p>
              <div className="space-y-2">
                {result.sources.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-900 border border-gray-700 hover:border-green-700 rounded-lg px-4 py-3 transition-all"
                  >
                    <p className="text-gray-300 text-xs line-clamp-1">{s.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{s.source}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => { setResult(null); setQuestion(""); }}
            className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
          >
            ← Ask another question
          </button>
        </div>
      )}
    </div>
  );
}
