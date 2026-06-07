import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-xl flex items-center gap-2">
          ⚽ <span className="text-green-400">Football</span> Pulse AI
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/news" className="text-gray-300 hover:text-green-400 transition-colors">News</Link>
          <Link href="/fixtures" className="text-gray-300 hover:text-green-400 transition-colors">Fixtures</Link>
          <Link href="/squads" className="text-gray-300 hover:text-green-400 transition-colors">Squads</Link>
          <Link href="/history" className="text-gray-300 hover:text-green-400 transition-colors">History</Link>
          <Link href="/legends" className="text-gray-300 hover:text-green-400 transition-colors">Legends</Link>
          <Link href="/injuries" className="text-gray-300 hover:text-green-400 transition-colors">Injuries</Link>
          <Link href="/transfers" className="text-gray-300 hover:text-green-400 transition-colors">Transfers</Link>
          {/* Chat hidden until v2 — keeping code, shipping post-launch */}
        </div>
      </div>
    </nav>
  );
}
