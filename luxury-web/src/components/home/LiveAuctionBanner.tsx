'use client';

import { useState, useEffect } from 'react';
import { Gavel, Clock, ArrowRight } from 'lucide-react';

export default function LiveAuctionBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 47,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;

        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#071F12] via-[#0A3320] to-[#071F12] border border-[#C9A84C]/40 p-6 md:p-8 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left: Live indicator & Title */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-[#165C36]/50 border border-[#C9A84C]/50 flex items-center justify-center text-[#C9A84C]">
            <Gavel className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#04150D] animate-ping" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#04150D]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-[0.2em] uppercase bg-red-500/20 text-red-400 border border-red-500/30">
                Live Auction Room
              </span>
              <span className="text-xs text-[#8CA090] tracking-wider">
                Christie's Geneva Spring Session
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-2xl text-white font-medium mt-1">
              Patek Philippe Ref 5270P Perpetual Calendar Chronograph
            </h3>
            <p className="text-xs text-[#D4D8D2]/80 mt-0.5">
              Current Leading Bid: <span className="text-[#C9A84C] font-semibold font-serif text-sm">CHF 210,000</span> (Reserve Met)
            </p>
          </div>
        </div>

        {/* Right: Countdown & Bidding CTA */}
        <div className="flex items-center gap-6 flex-wrap sm:flex-nowrap justify-center">
          <div className="flex items-center gap-2 bg-[#04150D]/80 border border-[#1E7A47]/40 px-4 py-2.5 rounded">
            <Clock className="w-4 h-4 text-[#C9A84C]" />
            <div className="flex items-center gap-1 font-mono text-lg text-[#C9A84C] font-bold tracking-wider">
              <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>

          <a
            href="/auctions"
            className="px-6 py-3 rounded text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-[#04150D] hover:shadow-[0_0_20px_rgba(201,168,76,0.5)] transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>Enter Auction Room</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
