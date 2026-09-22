import Link from 'next/link';

export default function BrandStory() {
  return (
    <section id="story" className="relative bg-[#061C16] text-[#FCFBF7] py-28 lg:py-36 border-b border-[#C6A15B]/20 overflow-hidden">
      {/* Background Subtle Tone */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C6A15B] rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Atmospheric Architectural / Heritage Photo */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative aspect-[3/4] overflow-hidden border border-[#C6A15B]/20 shadow-2xl bg-[#080B09]">
              <div
                className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 hover:scale-105 transition-transform duration-1000 opacity-75"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061C16] via-transparent to-black/40" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B] block mb-1">
                  GENEVA &middot; MONACO &middot; LONDON
                </span>
                <span className="font-serif text-lg text-white font-light">
                  A Legacy Grounded in Discretion &amp; Custody.
                </span>
              </div>
            </div>

            {/* Subtle Offset Frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-[#C6A15B]/20 pointer-events-none -z-10 hidden sm:block" />
          </div>

          {/* Right: Pure Typographic Brand Narrative */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium">
              <span className="w-1.5 h-1.5 bg-[#C6A15B] rotate-45" />
              <span>THE FOUNDATION</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.12]">
              NP GROUPS
            </h2>

            <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#F6F3EA] font-light italic border-l-2 border-[#C6A15B] pl-6 leading-relaxed">
              &ldquo;Building a private network around exceptional assets, businesses and opportunities.&rdquo;
            </blockquote>

            <div className="space-y-6 text-[#D8D3C8]/80 font-sans font-light leading-relaxed text-sm sm:text-base">
              <p>
                In an era of mass algorithmic aggregation, the true treasures of our world—sovereign islands, transatlantic jets, masterworks of horology, and rare company divestments—demand human stewardship, jurisdictional mastery, and sacred confidentiality.
              </p>
              <p>
                NP GROUPS was conceived not as an open marketplace, but as a restricted international salon where buyers, operators, brokers, and heritage ateliers transact with total confidence and zero digital noise.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                href="/membership"
                className="px-8 py-3.5 border border-[#C6A15B] text-[#FCFBF7] text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-[#C6A15B] hover:text-[#061C16] transition-all"
              >
                REQUEST PRIVATE INTRODUCTION
              </Link>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#D8D3C8]/50">
                Fiduciary Standards Guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
