import { Globe, MapPin } from 'lucide-react';

interface DeskLocation {
  city: string;
  region: string;
  address: string;
  focus: string;
  status: string;
}

const desks: DeskLocation[] = [
  { city: 'Geneva', region: 'Europe', address: 'Rue du Rhône, 1204', focus: 'Private Banking & Horology Syndicates', status: 'Active Desk' },
  { city: 'Monaco', region: 'Europe', address: 'Port Hercule, Monte Carlo', focus: 'Superyacht Charter & Bilateral Sales', status: 'Active Desk' },
  { city: 'London', region: 'Europe', address: 'Mayfair, W1K', focus: 'Fine Art & Prime Capital Estates', status: 'Active Desk' },
  { city: 'Dubai', region: 'Middle East', address: 'DIFC Gate Precinct', focus: 'Aviation Fleet & Sovereign Placements', status: 'Active Desk' },
  { city: 'Singapore', region: 'Asia', address: 'Marina Bay Financial Centre', focus: 'Pan-Asian Family Office Mandates', status: 'Active Desk' },
  { city: 'Mumbai', region: 'India', address: 'Bandra Kurla Complex', focus: 'South Asian Industrial Syndicates', status: 'Active Desk' },
  { city: 'New York', region: 'North America', address: 'Madison Avenue, Upper East', focus: 'Modern Art & Historic Racecars', status: 'Active Desk' },
  { city: 'Miami', region: 'North America', address: 'Brickell Financial District', focus: 'Waterfront Estates & Marine Charter', status: 'Active Desk' },
  { city: 'Hong Kong', region: 'Asia', address: 'Two International Finance Centre', focus: 'Rare Gemstones & Private Treaty Lots', status: 'Active Desk' },
  { city: 'Caribbean', region: 'Americas', address: 'Saint-Barthélemy / Gustavia', focus: 'Private Island Freeholds & Berths', status: 'Active Desk' },
];

export default function GlobalPresence() {
  return (
    <section id="global" className="relative bg-[#080B09] text-[#FCFBF7] py-28 lg:py-36 border-b border-[#C6A15B]/20 overflow-hidden">
      {/* Background Cartographic Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(#C6A15B 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4 pb-16">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium">
            <Globe className="w-3.5 h-3.5" />
            <span>GLOBAL FOOTPRINT</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
            A PRIVATE NETWORK WITHOUT BORDERS.
          </h2>

          <p className="text-sm sm:text-base text-[#D8D3C8]/80 font-light leading-relaxed max-w-2xl">
            Ten strategically positioned representative desks spanning the primary financial and sovereign wealth corridors of Europe, the Middle East, Asia, and the Americas.
          </p>
        </div>

        {/* Global Desks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-6">
          {desks.map((desk) => (
            <div
              key={desk.city}
              className="bg-[#061C16] border border-[#C6A15B]/20 p-6 flex flex-col justify-between space-y-6 hover:border-[#C6A15B] transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C6A15B] font-medium">
                    {desk.region}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[8px] uppercase tracking-[0.15em] text-emerald-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {desk.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0" />
                  <h3 className="font-serif text-2xl font-light text-white tracking-wide">
                    {desk.city}
                  </h3>
                </div>

                <div className="text-xs text-[#D8D3C8]/60 font-light">
                  {desk.address}
                </div>

                <p className="text-xs text-[#D8D3C8]/80 font-light pt-2 leading-relaxed">
                  {desk.focus}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 text-[9px] uppercase tracking-[0.2em] text-[#C6A15B]/70">
                Liaison via Private Office
              </div>
            </div>
          ))}
        </div>

        {/* Jurisdictional coverage bar */}
        <div className="mt-16 p-8 bg-[#061C16]/80 border border-[#C6A15B]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-medium block">
              Global Escrow &amp; Sovereign Flagging
            </span>
            <p className="text-xs text-[#D8D3C8]/70 font-light">
              Bilateral cross-border settlements supported in USD, EUR, GBP, CHF, AED, SGD and gold-backed custodial reserves.
            </p>
          </div>

          <div className="text-[11px] text-[#FCFBF7] font-serif italic tracking-wider whitespace-nowrap">
            Monaco &middot; Geneva &middot; London &middot; Dubai &middot; Singapore &middot; New York
          </div>
        </div>
      </div>
    </section>
  );
}
