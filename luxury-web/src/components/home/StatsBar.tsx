export default function StatsBar() {
  const stats = [
    { value: '11', label: 'Luxury Verticals', sub: 'From Jets to Islands' },
    { value: '5,000+', label: 'Verified Listings', sub: 'Curated Rarity' },
    { value: '120+', label: 'Countries Served', sub: 'Global Concierge' },
    { value: '₹2.4T+', label: 'Total Asset Value', sub: 'Audited Portfolios' },
    { value: '100%', label: 'Escrow Protected', sub: 'Zero Counterparty Risk' },
  ];

  return (
    <div id="stats" className="bg-[#FAFAF8] border-y border-[#E5EAE7] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#E5EAE7] text-center">
          {stats.map((stat, idx) => (
            <div key={stat.label} className={`pt-4 md:pt-0 ${idx > 0 ? 'md:px-4' : 'md:pr-4'}`}>
              <div className="font-serif text-3xl sm:text-5xl text-[#082015] font-light tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#082015] font-bold mt-1.5">
                {stat.label}
              </div>
              <div className="text-[10px] text-[#7A8F83] tracking-wider mt-0.5 font-medium">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
