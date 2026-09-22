import Link from 'next/link';

export default function EditorialSection() {
  return (
    <section id="manifesto" className="relative bg-[#FCFBF7] text-[#080B09] py-28 lg:py-36 border-b border-[#D8D3C8]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Manifesto */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D7B3E] font-medium">
              <span className="w-1.5 h-1.5 bg-[#C6A15B] rotate-45" />
              <span>THE MANDATE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#061C16] tracking-tight leading-[1.12]">
              MORE THAN A <br />
              <span className="italic font-normal text-[#080B09]">
                MARKETPLACE.
              </span>
            </h2>

            <div className="space-y-6 text-[#111512]/80 font-sans font-light leading-relaxed text-base sm:text-lg max-w-xl">
              <p>
                NP GROUPS exists for a different caliber of transaction. Here, exceptional assets are not merely listed; they are curated, verified, and handled with the discretion customary to international private banking, fine art auction houses, and elite family offices.
              </p>
              <p className="text-sm sm:text-base text-[#111512]/70">
                From off-market sovereign estates and bespoke aviation syndicates to discreet corporate transfers, our network connects vetted principals across forty-two jurisdictions without public exposure.
              </p>
            </div>

            {/* 3 Numerical Pillars */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#D8D3C8] max-w-lg">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#061C16] font-normal">42</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9D7B3E] font-medium">Jurisdictions</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#061C16] font-normal">60%+</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9D7B3E] font-medium">Off-Market</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#061C16] font-normal">1:1</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9D7B3E] font-medium">Desk Advisory</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="#protocol"
                className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#061C16] font-semibold border-b border-[#061C16] pb-1 hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
              >
                <span>READ THE ACQUISITION PROTOCOL</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#D8D3C8] shadow-2xl bg-[#061C16]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061C16]/90 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B]">
                  SOVEREIGN ARCHITECTURE
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-light text-white leading-snug">
                  Privileged Placements Across Global Capitals.
                </h3>
              </div>
            </div>

            {/* Inset Hairline Frame Accent */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#C6A15B]/30 pointer-events-none -z-10 hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
