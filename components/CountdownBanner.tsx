"use client";

import { useEffect, useState } from "react";

const WORLD_CUP_DATE = new Date("2026-06-11T00:00:00Z");

export default function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calc = () => {
      const diff = WORLD_CUP_DATE.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🏆</span>
        <div>
          <p className="text-white font-semibold text-sm">FIFA World Cup 2026</p>
          <p className="text-gray-400 text-xs">Kicks off June 11, 2026 — Mexico City</p>
        </div>
      </div>
      <div className="flex gap-3">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Mins", value: timeLeft.minutes },
          { label: "Secs", value: timeLeft.seconds },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-center min-w-[56px]">
            <div className="text-green-400 font-bold text-xl tabular-nums">
              {String(value).padStart(2, "0")}
            </div>
            <div className="text-gray-500 text-xs">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
