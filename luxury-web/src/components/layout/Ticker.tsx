'use client';

export default function Ticker() {
  const items = [
    'Gulfstream G700 · Private Jet · $75,000,000',
    'Ferretti 920 Maxi Superyacht · Monaco · €4,200,000',
    'Emerald Sanctuary Sovereign Atoll · Maldives · $32,000,000',
    'Patek Philippe Ref 5270P Perpetual Calendar · ₹3.8 Cr',
    'Ferrari SF90 Stradale Assetto Fiorano · ₹8.5 Cr',
    'Graff 10.50ct Fancy Vivid Yellow Diamond · ₹11.0 Cr',
    "Villa Rothschild Belle Époque Palace · Côte d'Azur · €48,000,000",
    'AgustaWestland AW139 VIP Helicopter Charter · ₹2.2L / hr',
  ];

  return (
    <div className="bg-[#0A3320] border-y border-[#1E7A47]/30 py-2.5 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {/* First set */}
        <div className="flex items-center gap-10 px-6">
          {items.map((item, idx) => (
            <div key={`a-${idx}`} className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#D4D8D2]">
              <span className="text-[#C9A84C]">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        {/* Second set for infinite seamless loop */}
        <div className="flex items-center gap-10 px-6">
          {items.map((item, idx) => (
            <div key={`b-${idx}`} className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#D4D8D2]">
              <span className="text-[#C9A84C]">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
