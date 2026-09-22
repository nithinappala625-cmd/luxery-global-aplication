import Link from 'next/link';

export default function LuxuryFooter() {
  return (
    <footer className="relative bg-[#061C16] text-[#D8D3C8] border-t border-[#C6A15B]/20 pt-20 pb-12 overflow-hidden">
      {/* Subtle background grain & aura */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#C6A15B] blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Header Row: Brand Crest & Mandate */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-[#C6A15B]/15 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1.5 h-1.5 bg-[#C6A15B] rotate-45" />
              <span className="font-serif text-2xl lg:text-3xl text-white tracking-[0.25em] font-light">
                NP GROUPS
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#C6A15B]/80 font-sans font-medium">
              International Private Luxury Network
            </p>
          </div>

          <div className="max-w-md">
            <p className="text-xs text-[#D8D3C8]/70 leading-relaxed font-sans font-light">
              Connecting qualified principals, family offices, certified operators, and heritage houses across forty-two sovereign jurisdictions.
            </p>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 py-16 text-xs border-b border-white/5">
          {/* Column 1: Discover */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-[#C6A15B] font-semibold">
              Discover
            </h4>
            <ul className="space-y-2.5 text-[#D8D3C8]/70 font-light">
              <li>
                <Link href="/categories/aviation" className="hover:text-white transition-colors">
                  Private Aviation
                </Link>
              </li>
              <li>
                <Link href="/categories/marine" className="hover:text-white transition-colors">
                  Marine &amp; Superyachts
                </Link>
              </li>
              <li>
                <Link href="/categories/automotive" className="hover:text-white transition-colors">
                  Automotive &amp; Hypercars
                </Link>
              </li>
              <li>
                <Link href="/categories/jewellery-horology" className="hover:text-white transition-colors">
                  Jewellery &amp; Horology
                </Link>
              </li>
              <li>
                <Link href="/categories/real-estate" className="hover:text-white transition-colors">
                  Exceptional Estates
                </Link>
              </li>
              <li>
                <Link href="/categories/art-collectibles" className="hover:text-white transition-colors">
                  Fine Art &amp; Collectibles
                </Link>
              </li>
              <li>
                <Link href="/categories/travel-experiences" className="hover:text-white transition-colors">
                  Private Retreats
                </Link>
              </li>
              <li>
                <Link href="/categories/private-opportunities" className="hover:text-white transition-colors">
                  Private Opportunities
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Acquisitions */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-[#C6A15B] font-semibold">
              Acquisitions
            </h4>
            <ul className="space-y-2.5 text-[#D8D3C8]/70 font-light">
              <li>
                <Link href="/categories/all" className="hover:text-white transition-colors">
                  The Collection
                </Link>
              </li>
              <li>
                <Link href="/auctions" className="hover:text-white transition-colors">
                  Tenders &amp; Timed Lots
                </Link>
              </li>
              <li>
                <Link href="#off-market" className="hover:text-white transition-colors">
                  Off-Market Directory
                </Link>
              </li>
              <li>
                <Link href="#protocol" className="hover:text-white transition-colors">
                  Acquisition Protocol
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-white transition-colors">
                  Syndicate Consignments
                </Link>
              </li>
              <li>
                <Link href="#verification" className="hover:text-white transition-colors">
                  Provenance Dossiers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Private Access */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-[#C6A15B] font-semibold">
              Private Access
            </h4>
            <ul className="space-y-2.5 text-[#D8D3C8]/70 font-light">
              <li>
                <Link href="/membership" className="hover:text-white transition-colors">
                  The Private Circle
                </Link>
              </li>
              <li>
                <Link href="/membership#tiers" className="hover:text-white transition-colors">
                  Membership Tiers
                </Link>
              </li>
              <li>
                <Link href="/membership#apply" className="hover:text-white transition-colors">
                  Private Application
                </Link>
              </li>
              <li>
                <Link href="#concierge" className="hover:text-white transition-colors">
                  Family Office Desk
                </Link>
              </li>
              <li>
                <Link href="#verification" className="hover:text-white transition-colors">
                  Verification Criteria
                </Link>
              </li>
              <li>
                <Link href="#concierge" className="hover:text-white transition-colors">
                  Bespoke Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institution */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-[#C6A15B] font-semibold">
              Institution
            </h4>
            <ul className="space-y-2.5 text-[#D8D3C8]/70 font-light">
              <li>
                <Link href="#story" className="hover:text-white transition-colors">
                  About NP GROUPS
                </Link>
              </li>
              <li>
                <Link href="#network" className="hover:text-white transition-colors">
                  The Network
                </Link>
              </li>
              <li>
                <Link href="#global" className="hover:text-white transition-colors">
                  Global Presences
                </Link>
              </li>
              <li>
                <Link href="#network" className="hover:text-white transition-colors">
                  Certified Partners
                </Link>
              </li>
              <li>
                <Link href="#story" className="hover:text-white transition-colors">
                  Founding Mandate
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Confidentiality */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-[#C6A15B] font-semibold">
              Confidentiality
            </h4>
            <ul className="space-y-2.5 text-[#D8D3C8]/70 font-light">
              <li>
                <span className="cursor-default">Bilateral NDA Standard</span>
              </li>
              <li>
                <span className="cursor-default">Code of Discretion</span>
              </li>
              <li>
                <span className="cursor-default">KYC / AML Protocol</span>
              </li>
              <li>
                <span className="cursor-default">Terms of Engagement</span>
              </li>
              <li>
                <span className="cursor-default">Jurisdictional Escrow</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Desks Strip */}
        <div className="py-8 flex flex-wrap items-center justify-between text-[11px] text-[#D8D3C8]/60 tracking-[0.2em] font-sans uppercase border-b border-white/5 gap-4">
          <span>Principal Desks</span>
          <div className="flex flex-wrap items-center gap-6 text-[#D8D3C8]/75">
            <span>Geneva</span>
            <span className="text-[#C6A15B]">&middot;</span>
            <span>Monaco</span>
            <span className="text-[#C6A15B]">&middot;</span>
            <span>London</span>
            <span className="text-[#C6A15B]">&middot;</span>
            <span>Dubai</span>
            <span className="text-[#C6A15B]">&middot;</span>
            <span>Singapore</span>
            <span className="text-[#C6A15B]">&middot;</span>
            <span>New York</span>
            <span className="text-[#C6A15B]">&middot;</span>
            <span>Mumbai</span>
          </div>
        </div>

        {/* Legal & Tagline Footer Bar */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[11px] text-[#D8D3C8]/50 font-light leading-relaxed max-w-xl text-center md:text-left">
            NP GROUPS operates strictly as a curated private network and introduction platform. All transactions, private viewings, and member introductions are governed by strict confidentiality and bilateral non-disclosure agreements.
          </div>

          <div className="flex flex-col items-center md:items-end gap-1.5">
            <span className="font-serif text-sm tracking-[0.35em] text-[#C6A15B] font-light">
              PRIVATE. EXCEPTIONAL. GLOBAL.
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#D8D3C8]/40">
              &copy; {new Date().getFullYear()} NP GROUPS INTERNATIONAL LTD. ALL RIGHTS RESERVED.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
