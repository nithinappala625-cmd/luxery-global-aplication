'use client';

import Link from 'next/link';

export default function LuxuryFooter() {
  return (
    <footer className="relative bg-[#02140B] text-[#D8D3C8] border-t border-[#C6A15B]/30 pt-16 pb-12 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Header Row: Brand Crest & Mandate */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#C6A15B]/20 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#041D12] border border-[#C6A15B] p-0.5 overflow-hidden flex items-center justify-center shadow-lg">
              <img
                src="/royendison_logo.jpeg"
                alt="Royendison Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-serif text-3xl text-white tracking-[0.22em] font-bold block leading-none">
                ROYENDISON
              </span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-sans font-semibold mt-1">
                Global Aviation Marketplace · Est. London, Dubai &amp; New Delhi
              </p>
            </div>
          </div>

          <div className="max-w-md">
            <p className="text-xs text-[#D8D3C8]/80 leading-relaxed font-sans font-light">
              Connecting sovereign dignitaries, corporate flight departments, and certified Part 135 / DGCA operators across private aircraft acquisitions, bespoke helicopter charters, and empty leg ferry flights.
            </p>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 text-xs border-b border-white/5">
          {/* Column 1: Private Sales */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-bold">
              Private Sales Desk
            </h4>
            <ul className="space-y-2.5 text-[#D8D3C8]/75 font-light">
              <li>
                <Link href="/aviation/sales" className="hover:text-white transition-colors text-[#DFC07E] font-medium">
                  Verified Sales Inventory
                </Link>
              </li>
              <li>
                <Link href="/aviation/sales" className="hover:text-white transition-colors">
                  Ultra Long Range Heavy Jets
                </Link>
              </li>
              <li>
                <Link href="/aviation/sales" className="hover:text-white transition-colors">
                  Super Midsize Executive Jets
                </Link>
              </li>
              <li>
                <Link href="/aviation/sales" className="hover:text-white transition-colors">
                  Twin Turboprop Aircraft
                </Link>
              </li>
              <li>
                <Link href="/aviation/sales" className="hover:text-white transition-colors">
                  Sovereign Escrow &amp; Logbook Audits
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Charter Operations */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-bold">
              Charter Operations
            </h4>
            <ul className="space-y-2.5 text-[#D8D3C8]/75 font-light">
              <li>
                <Link href="/charters" className="hover:text-white transition-colors text-emerald-400 font-medium">
                  Executive Charter Desk
                </Link>
              </li>
              <li>
                <Link href="/charters" className="hover:text-white transition-colors">
                  Wedding Grand Entry &amp; Helipads
                </Link>
              </li>
              <li>
                <Link href="/charters" className="hover:text-white transition-colors">
                  Rose Petal Flower Shower Rain
                </Link>
              </li>
              <li>
                <Link href="/charters" className="hover:text-white transition-colors">
                  VIP Political Tour Campaigns
                </Link>
              </li>
              <li>
                <Link href="/charters" className="hover:text-white transition-colors">
                  Himalayan &amp; Char Dham Yatra
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Best Deals */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-bold">
              Best Deals Desk
            </h4>
            <ul className="space-y-2.5 text-[#D8D3C8]/75 font-light">
              <li>
                <Link href="/deals" className="hover:text-white transition-colors text-amber-300 font-medium">
                  Live Empty Leg Sectors (-65%)
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-white transition-colors">
                  Domestic Ferry Positioning
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-white transition-colors">
                  Gulf &amp; Middle East Transits
                </Link>
              </li>
              <li>
                <Link href="/deals#operator-portal" className="hover:text-white transition-colors">
                  Operator Desk: List Ferry Flights
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Global Hubs & Concierge */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-bold">
              Sovereign Flight Hubs
            </h4>
            <ul className="space-y-2 text-[#D8D3C8]/75 font-light">
              <li>🇬🇧 London Farnborough (EGLF)</li>
              <li>🇦🇪 Dubai Al Maktoum (OMDW)</li>
              <li>🇮🇳 Mumbai Kalina GA (VABB)</li>
              <li>🇮🇳 New Delhi IGI (VIDP)</li>
              <li>🇨🇭 Geneva Cointrin (LSGG)</li>
              <li className="pt-2">
                <a
                  href="https://wa.me/917981994870"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-bold hover:underline"
                >
                  Direct WhatsApp: +91 7981994870
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Escrow Statement */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#D8D3C8]/50 gap-4">
          <p>
            &copy; {new Date().getFullYear()} ROYENDISON Global Heritage Luxury Marketplace. All rights reserved.
          </p>
          <p className="text-right">
            Transactions conducted under neutral Swiss &amp; UK escrow protocols. Full Part 135 &amp; DGCA compliance.
          </p>
        </div>
      </div>
    </footer>
  );
}
