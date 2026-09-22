export default function Footer() {
  const globalHubs = [
    { city: 'London', flag: '🇬🇧', address: 'Mayfair, W1K' },
    { city: 'Monaco', flag: '🇲🇨', address: 'Monte-Carlo, 98000' },
    { city: 'Dubai', flag: '🇦🇪', address: 'DIFC, Gate District' },
    { city: 'Mumbai', flag: '🇮🇳', address: 'BKC, Bandra East' },
    { city: 'Geneva', flag: '🇨🇭', address: 'Rue du Rhône, 1204' },
  ];

  const categories = [
    { name: 'Marine & Yachts', href: '/categories/marine' },
    { name: 'Aviation & Jets', href: '/categories/aviation' },
    { name: 'Sovereign Real Estate', href: '/categories/real-estate' },
    { name: 'Fine Jewellery & Diamonds', href: '/categories/jewellery' },
    { name: 'Haute Horlogerie', href: '/categories/watches' },
    { name: 'Automotive & Supercars', href: '/categories/cars' },
    { name: 'Private Sovereign Islands', href: '/categories/private-islands' },
    { name: 'Sports & Elite Experiences', href: '/categories/sports-experiences' },
    { name: 'Travel & Concierge', href: '/categories/travel-experiences' },
    { name: 'Digital & Financial Services', href: '/categories/digital-financial' },
    { name: 'Locker & Vault Storage', href: '/categories/locker-storage' },
  ];

  const platform = [
    { name: 'How It Works', href: '/#process' },
    { name: 'Elite Membership Tiers', href: '/membership' },
    { name: 'Live Curated Auctions', href: '/auctions' },
    { name: 'Consign & Sell Asset', href: '/#categories' },
    { name: 'Multi-Stage Verification', href: '/#why' },
    { name: 'Mobile App (iOS / Android)', href: '/#app' },
    { name: 'Institutional Deal Rooms', href: '/#categories' },
  ];

  const legal = [
    { name: 'AML & CFT Policy', href: '#' },
    { name: 'Escrow & Title Guarantee', href: '#' },
    { name: 'Privacy & Data Protection', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Private Client Concierge', href: '#' },
    { name: 'Press & Media Dossier', href: '#' },
  ];

  return (
    <footer className="bg-[#04150D] border-t border-[#1E7A47]/30 pt-20 pb-10 text-[#D4D8D2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Global Hubs */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="font-serif text-3xl font-semibold tracking-wider text-white">
                NP GROUPS
              </span>
              <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C] mt-1">
                Global Luxury Legacy Platform
              </p>
            </div>
            <p className="text-sm text-[#8CA090] max-w-sm leading-relaxed font-light">
              The world's premier marketplace and deal platform for extraordinary physical assets & sovereign experiences. Serving royal families, ultra-high-net-worth collectors, and family offices worldwide.
            </p>

            {/* Global Hubs */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C9A84C] font-semibold mb-3">
                Private Client Salons
              </p>
              <div className="flex flex-wrap gap-2">
                {globalHubs.map((hub) => (
                  <div
                    key={hub.city}
                    className="px-3 py-1.5 rounded bg-[#071F12] border border-[#1E7A47]/30 text-xs flex items-center gap-1.5 text-white/90"
                  >
                    <span>{hub.flag}</span>
                    <span className="font-medium">{hub.city}</span>
                    <span className="text-[10px] text-[#8CA090]">({hub.address})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4 tracking-wider">
              11 Verticals
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.map((c) => (
                <li key={c.name}>
                  <a href={c.href} className="text-[#8CA090] hover:text-[#C9A84C] transition-colors">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4 tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              {platform.map((p) => (
                <li key={p.name}>
                  <a href={p.href} className="text-[#8CA090] hover:text-[#C9A84C] transition-colors">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4 tracking-wider">
              Security & Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              {legal.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-[#8CA090] hover:text-[#C9A84C] transition-colors">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8CA090]">
          <p>
            &copy; {new Date().getFullYear()} NP GROUPS Pvt Ltd &middot; Global Luxury Legacy Platform &middot; All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="px-2.5 py-1 rounded bg-[#071F12] border border-[#1E7A47]/30 text-[10px] uppercase tracking-wider text-[#C9A84C]">
              ISO 27001 Certified
            </span>
            <span className="px-2.5 py-1 rounded bg-[#071F12] border border-[#1E7A47]/30 text-[10px] uppercase tracking-wider text-[#C9A84C]">
              AML / CFT Compliant
            </span>
            <span className="px-2.5 py-1 rounded bg-[#071F12] border border-[#1E7A47]/30 text-[10px] uppercase tracking-wider text-[#C9A84C]">
              Swiss Escrow Guard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
