"use client";

import { useState } from "react";

const FACTS = [
  "🏆 Only 8 countries have ever won the FIFA World Cup in its 92-year history.",
  "⚽ Brazil is the only nation to have played in every single World Cup — all 22 editions.",
  "🥅 Just Fontaine (France) scored 13 goals at the 1958 WC — a record that still stands today.",
  "🇩🇪 Germany and Brazil have won the most World Cups combined — 9 titles between them.",
  "📅 The 2026 WC is the first ever to feature 48 teams, up from 32 in previous editions.",
  "🌍 USA, Canada and Mexico are the first three-nation host in World Cup history.",
  "👑 Ronaldo (Brazil) is the only player to score in 4 different World Cups.",
  "🤝 The 1930 first-ever World Cup final was played between Uruguay and Argentina — neighbours.",
  "🧤 Peter Shilton (England) holds the record for most WC appearances by a goalkeeper — 17 games.",
  "🎯 The fastest WC goal ever was scored in 11 seconds by Hakan Şükür (Turkey) in 2002.",
  "🏟️ The 2026 final will be played at MetLife Stadium in New Jersey — capacity 82,500.",
  "⭐ Messi and Ronaldo both won the World Cup during their careers — Messi in 2022, Ronaldo never.",
  "🇫🇷 France won the 2018 WC with a squad where 80% of players had African heritage.",
  "😮 Italy — 4-time World Cup winners — failed to qualify for both 2018 and 2022.",
  "📺 The 2022 Qatar WC was the most watched sporting event in history — 5 billion viewers.",
];

export default function FunFactBanner() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // No random on mount — avoids SSR/client hydration mismatch
  // Users click Next to cycle through facts

  function nextFact() {
    setVisible(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % FACTS.length);
      setVisible(true);
    }, 200);
  }

  return (
    <div className="bg-gray-900 border border-yellow-800 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1">
        <span className="text-xl shrink-0">💡</span>
        <div>
          <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-1">WC Fun Fact</p>
          <p
            className="text-gray-200 text-sm leading-relaxed transition-opacity duration-200"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {FACTS[index]}
          </p>
        </div>
      </div>
      <button
        onClick={nextFact}
        className="shrink-0 text-gray-500 hover:text-yellow-400 transition-colors text-xs border border-gray-700 hover:border-yellow-700 rounded-lg px-3 py-2"
      >
        Next →
      </button>
    </div>
  );
}
