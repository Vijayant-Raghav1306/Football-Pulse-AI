const TOURNAMENTS = [
  { year: 1930, host: "Uruguay", winner: "🇺🇾 Uruguay", runnerUp: "🇦🇷 Argentina", topScorer: "Guillermo Stábile (ARG) — 8 goals", teams: 13, final: "Uruguay 4–2 Argentina" },
  { year: 1934, host: "Italy", winner: "🇮🇹 Italy", runnerUp: "🇨🇿 Czechoslovakia", topScorer: "Oldřich Nejedlý (TCH) — 5 goals", teams: 16, final: "Italy 2–1 Czechoslovakia (AET)" },
  { year: 1938, host: "France", winner: "🇮🇹 Italy", runnerUp: "🇭🇺 Hungary", topScorer: "Leônidas (BRA) — 7 goals", teams: 15, final: "Italy 4–2 Hungary" },
  { year: 1950, host: "Brazil", winner: "🇺🇾 Uruguay", runnerUp: "🇧🇷 Brazil", topScorer: "Ademir (BRA) — 9 goals", teams: 13, final: "Uruguay 2–1 Brazil (Final Round)" },
  { year: 1954, host: "Switzerland", winner: "🇩🇪 West Germany", runnerUp: "🇭🇺 Hungary", topScorer: "Sándor Kocsis (HUN) — 11 goals", teams: 16, final: "West Germany 3–2 Hungary" },
  { year: 1958, host: "Sweden", winner: "🇧🇷 Brazil", runnerUp: "🇸🇪 Sweden", topScorer: "Just Fontaine (FRA) — 13 goals ⭐", teams: 16, final: "Brazil 5–2 Sweden" },
  { year: 1962, host: "Chile", winner: "🇧🇷 Brazil", runnerUp: "🇨🇿 Czechoslovakia", topScorer: "Florian Albert, Garrincha & others — 4 goals", teams: 16, final: "Brazil 3–1 Czechoslovakia" },
  { year: 1966, host: "England", winner: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", runnerUp: "🇩🇪 West Germany", topScorer: "Eusébio (POR) — 9 goals", teams: 16, final: "England 4–2 West Germany (AET)" },
  { year: 1970, host: "Mexico", winner: "🇧🇷 Brazil", runnerUp: "🇮🇹 Italy", topScorer: "Gerd Müller (FRG) — 10 goals", teams: 16, final: "Brazil 4–1 Italy" },
  { year: 1974, host: "West Germany", winner: "🇩🇪 West Germany", runnerUp: "🇳🇱 Netherlands", topScorer: "Grzegorz Lato (POL) — 7 goals", teams: 16, final: "West Germany 2–1 Netherlands" },
  { year: 1978, host: "Argentina", winner: "🇦🇷 Argentina", runnerUp: "🇳🇱 Netherlands", topScorer: "Mario Kempes (ARG) — 6 goals", teams: 16, final: "Argentina 3–1 Netherlands (AET)" },
  { year: 1982, host: "Spain", winner: "🇮🇹 Italy", runnerUp: "🇩🇪 West Germany", topScorer: "Paolo Rossi (ITA) — 6 goals", teams: 24, final: "Italy 3–1 West Germany" },
  { year: 1986, host: "Mexico", winner: "🇦🇷 Argentina", runnerUp: "🇩🇪 West Germany", topScorer: "Gary Lineker (ENG) — 6 goals", teams: 24, final: "Argentina 3–2 West Germany" },
  { year: 1990, host: "Italy", winner: "🇩🇪 West Germany", runnerUp: "🇦🇷 Argentina", topScorer: "Salvatore Schillaci (ITA) — 6 goals", teams: 24, final: "West Germany 1–0 Argentina" },
  { year: 1994, host: "USA", winner: "🇧🇷 Brazil", runnerUp: "🇮🇹 Italy", topScorer: "Hristo Stoichkov & Oleg Salenko — 6 goals", teams: 24, final: "Brazil 0–0 Italy (Brazil won on pens)" },
  { year: 1998, host: "France", winner: "🇫🇷 France", runnerUp: "🇧🇷 Brazil", topScorer: "Davor Šuker (CRO) — 6 goals", teams: 32, final: "France 3–0 Brazil" },
  { year: 2002, host: "South Korea / Japan", winner: "🇧🇷 Brazil", runnerUp: "🇩🇪 Germany", topScorer: "Ronaldo (BRA) — 8 goals", teams: 32, final: "Brazil 2–0 Germany" },
  { year: 2006, host: "Germany", winner: "🇮🇹 Italy", runnerUp: "🇫🇷 France", topScorer: "Miroslav Klose (GER) — 5 goals", teams: 32, final: "Italy 1–1 France (Italy won on pens)" },
  { year: 2010, host: "South Africa", winner: "🇪🇸 Spain", runnerUp: "🇳🇱 Netherlands", topScorer: "Thomas Müller, Wesley Sneijder & others — 5 goals", teams: 32, final: "Spain 1–0 Netherlands (AET)" },
  { year: 2014, host: "Brazil", winner: "🇩🇪 Germany", runnerUp: "🇦🇷 Argentina", topScorer: "James Rodríguez (COL) — 6 goals", teams: 32, final: "Germany 1–0 Argentina (AET)" },
  { year: 2018, host: "Russia", winner: "🇫🇷 France", runnerUp: "🇭🇷 Croatia", topScorer: "Harry Kane (ENG) — 6 goals", teams: 32, final: "France 4–2 Croatia" },
  { year: 2022, host: "Qatar", winner: "🇦🇷 Argentina", runnerUp: "🇫🇷 France", topScorer: "Kylian Mbappé (FRA) — 8 goals", teams: 32, final: "Argentina 3–3 France (Argentina won on pens) 🐐" },
];

export default function HistoryPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">📖 World Cup History</h1>
        <p className="text-gray-400 text-sm">Every tournament from 1930 to 2022 — 22 editions, one dream</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Editions", value: "22" },
          { label: "Most Titles", value: "🇧🇷 Brazil (5)" },
          { label: "All-time Top Scorer", value: "Klose (16)" },
          { label: "First Winner", value: "🇺🇾 Uruguay" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center">
            <div className="text-white font-bold text-lg">{value}</div>
            <div className="text-gray-500 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {[...TOURNAMENTS].reverse().map((t) => (
          <div
            key={t.year}
            className="bg-gray-900 border border-gray-700 hover:border-green-800 rounded-xl p-5 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Year + Host */}
              <div className="flex items-center gap-4">
                <div className="bg-green-500 text-black font-bold text-sm px-3 py-1 rounded-full shrink-0">
                  {t.year}
                </div>
                <div>
                  <div className="text-white font-semibold">{t.final}</div>
                  <div className="text-gray-500 text-xs mt-0.5">Host: {t.host} · {t.teams} teams</div>
                </div>
              </div>

              {/* Winner */}
              <div className="flex flex-col md:items-end gap-1">
                <div className="text-green-400 font-semibold text-sm">🏆 {t.winner}</div>
                <div className="text-gray-500 text-xs">Runner-up: {t.runnerUp}</div>
                <div className="text-gray-600 text-xs">⚽ {t.topScorer}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
