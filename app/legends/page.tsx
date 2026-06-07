const LEGENDS = [
  {
    name: "Pelé",
    country: "🇧🇷 Brazil",
    era: "1958–1970",
    wcTitles: 3,
    wcGoals: 12,
    wcApps: 14,
    role: "Forward",
    tag: "The Greatest",
    fact: "Won the World Cup at just 17 years old in 1958 — the youngest winner ever. Scored a hat-trick in the semi-final.",
    highlight: "1970 Brazil squad widely considered the greatest WC team ever assembled.",
  },
  {
    name: "Diego Maradona",
    country: "🇦🇷 Argentina",
    era: "1982–1994",
    wcTitles: 1,
    wcGoals: 8,
    wcApps: 21,
    role: "Attacking Midfielder",
    tag: "Hand of God",
    fact: "At Mexico 1986, he scored both the 'Goal of the Century' and the 'Hand of God' goal in the same match vs England.",
    highlight: "Almost single-handedly won the 1986 WC for Argentina — involved in 10 of their 14 goals.",
  },
  {
    name: "Ronaldo (R9)",
    country: "🇧🇷 Brazil",
    era: "1994–2006",
    wcTitles: 2,
    wcGoals: 15,
    wcApps: 19,
    role: "Forward",
    tag: "The Phenomenon",
    fact: "Scored 15 WC goals — a record that stood for 12 years. Scored 2 in the 2002 final vs Germany.",
    highlight: "Only player to score in 4 different World Cups (1998, 2002, 2006 + 1994 appearance).",
  },
  {
    name: "Miroslav Klose",
    country: "🇩🇪 Germany",
    era: "2002–2014",
    wcTitles: 1,
    wcGoals: 16,
    wcApps: 24,
    role: "Forward",
    tag: "All-Time Top Scorer",
    fact: "Holds the all-time WC goal record with 16 goals across 4 tournaments. Won the title in 2014.",
    highlight: "Scored in every WC he appeared in. Netted a hat-trick on his debut in 2002.",
  },
  {
    name: "Lionel Messi",
    country: "🇦🇷 Argentina",
    era: "2006–2022",
    wcTitles: 1,
    wcGoals: 13,
    wcApps: 26,
    role: "Forward",
    tag: "World Champion 🏆",
    fact: "Won everything the game has to offer after lifting the WC trophy in Qatar 2022. Scored in the final.",
    highlight: "2022 WC performance is considered the greatest individual WC tournament ever played.",
  },
  {
    name: "Cristiano Ronaldo",
    country: "🇵🇹 Portugal",
    era: "2006–2022",
    wcTitles: 0,
    wcGoals: 8,
    wcApps: 22,
    role: "Forward",
    tag: "Never Won It",
    fact: "Despite being one of the greatest ever, the WC is the one trophy that escaped him. Portugal's best was 4th in 2006.",
    highlight: "Scored a stunning hat-trick vs Spain at the 2018 WC — Portugal still drew 3–3.",
  },
  {
    name: "Zinedine Zidane",
    country: "🇫🇷 France",
    era: "1998–2006",
    wcTitles: 1,
    wcGoals: 5,
    wcApps: 12,
    role: "Attacking Midfielder",
    tag: "Headbutt & All",
    fact: "Won the 1998 WC with France, scoring twice in the final. Infamous for his headbutt in the 2006 final.",
    highlight: "Named Player of the Tournament at 2006 WC despite being sent off in the final.",
  },
  {
    name: "Just Fontaine",
    country: "🇫🇷 France",
    era: "1958",
    wcTitles: 0,
    wcGoals: 13,
    wcApps: 6,
    role: "Forward",
    tag: "Record That Will Never Fall",
    fact: "Scored 13 goals in a single WC tournament in 1958 — a record considered unbreakable in modern football.",
    highlight: "Played only one World Cup. Never won it. But owns the most iconic individual record in WC history.",
  },
  {
    name: "Ronaldinho",
    country: "🇧🇷 Brazil",
    era: "2002–2006",
    wcTitles: 1,
    wcGoals: 4,
    wcApps: 9,
    role: "Attacking Midfielder",
    tag: "Pure Magic",
    fact: "Won the 2002 WC but was controversially left out of Brazil's 2006 squad. Scored a legendary free-kick vs England.",
    highlight: "His free-kick vs England in 2002 QF is one of the most replayed goals in WC history.",
  },
  {
    name: "Kylian Mbappé",
    country: "🇫🇷 France",
    era: "2018–present",
    wcTitles: 1,
    wcGoals: 16,
    wcApps: 20,
    role: "Forward",
    tag: "The Heir",
    fact: "Won the WC in 2018 at age 19. Scored a hat-trick in the 2022 final — yet still lost on penalties.",
    highlight: "Already has 16 WC goals — equal to Klose's all-time record. Still has WC 2026 ahead of him.",
  },
];

export default function LegendsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">⭐ WC Legends</h1>
        <p className="text-gray-400 text-sm">The players who defined the World Cup across every generation</p>
      </div>

      {/* Records Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Most WC Goals Ever", value: "Klose / Mbappé (16)" },
          { label: "Most Titles", value: "Pelé (3)" },
          { label: "Single Tournament Record", value: "Fontaine — 13 in 1958" },
          { label: "Youngest WC Winner", value: "Pelé — 17 yrs old" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center">
            <div className="text-white font-bold text-sm">{value}</div>
            <div className="text-gray-500 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Legends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEGENDS.map((p) => (
          <div
            key={p.name}
            className="bg-gray-900 border border-gray-700 hover:border-green-800 rounded-xl p-5 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-white font-bold text-lg">{p.name}</h2>
                  {p.wcTitles > 0 && (
                    <span className="text-xs bg-yellow-500 text-black font-bold px-2 py-0.5 rounded-full">
                      {"🏆".repeat(p.wcTitles)}
                    </span>
                  )}
                </div>
                <div className="text-gray-400 text-sm">{p.country} · {p.role} · {p.era}</div>
              </div>
              <span className="text-xs text-green-400 border border-green-800 bg-green-950 px-2 py-1 rounded-full shrink-0 ml-2">
                {p.tag}
              </span>
            </div>

            {/* Stats */}
            <div className="flex gap-4 mb-3">
              {[
                { label: "WC Goals", value: p.wcGoals },
                { label: "Appearances", value: p.wcApps },
                { label: "Titles", value: p.wcTitles },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-800 rounded-lg px-3 py-2 text-center flex-1">
                  <div className="text-green-400 font-bold text-lg">{value}</div>
                  <div className="text-gray-500 text-xs">{label}</div>
                </div>
              ))}
            </div>

            {/* Fact */}
            <p className="text-gray-400 text-sm mb-2">{p.fact}</p>
            <p className="text-gray-600 text-xs italic">{p.highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
