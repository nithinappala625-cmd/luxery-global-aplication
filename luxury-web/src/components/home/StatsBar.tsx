export default function StatsBar() {
  const stats = [
    { value: '11', label: 'Luxury Verticals', sub: 'From Jets to Islands' },
    { value: '5,000+', label: 'Verified Listings', sub: 'Curated Rarity' },
    { value: '120+', label: 'Countries Served', sub: 'Global Concierge' },
    { value: '₹2.4T+', label: 'Total Asset Value', sub: 'Audited Portfolios' },
    { value: '100%', label: 'Escrow Protected', sub: 'Zero Counterparty Risk' },
  ];

  return (
    <div id="stats" className="bg-[#071F12] border-y border-[#1E7A47]/30 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#1E7A47]/30 text-center">
          {stats.map((stat, idx) => (
            <div key={stat.label} className={`pt-4 md:pt-0 ${idx > 0 ? 'md:px-4' : 'md:pr-4'}`}>
              <div className="font-serif text-3xl sm:text-4xl text-[#C9A84C] font-normal tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-white font-semibold mt-1">
                {stat.label}
              </div>
              <div className="text-[10px] text-[#8CA090] tracking-wider mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
