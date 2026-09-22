import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#04150D] via-[#071F12] to-[#0A3320] pt-28 pb-16">
      {/* Decorative Radial Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#1E7A47]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[400px] bg-[#C9A84C]/10 rounded-full blur-[160px]" />
        {/* Subtle patterned overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#C9A84C 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
        {/* Prestige Eyebrow */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0F4A2C]/50 border border-[#C9A84C]/30 text-[#E8D48A] text-[11px] font-medium tracking-[0.25em] uppercase backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
          <span>Elite &middot; Exclusive &middot; Eternal</span>
        </div>

        {/* Editorial Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.08]">
          The World's Most <br />
          <span className="italic font-normal text-gold-gradient">
            Exclusive Luxury
          </span>{' '}
          Marketplace
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#D4D8D2]/90 font-serif italic tracking-wide leading-relaxed">
          Extraordinary Assets. Elite Experiences. One Sovereign Platform.
        </p>

        {/* Primary CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#categories"
            className="w-full sm:w-auto px-8 py-4 rounded text-xs font-bold tracking-[0.25em] uppercase bg-gradient-to-r from-[#C9A84C] via-[#E8D48A] to-[#A07830] text-[#04150D] hover:shadow-[0_0_30px_rgba(201,168,76,0.45)] transition-all flex items-center justify-center gap-2"
          >
            <span>Explore 11 Verticals</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/membership"
            className="w-full sm:w-auto px-8 py-4 rounded text-xs font-semibold tracking-[0.25em] uppercase border border-[#C9A84C]/40 text-[#E8D48A] hover:bg-[#C9A84C]/10 hover:border-[#C9A84C] transition-all"
          >
            Apply for Membership
          </a>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <a
        href="#stats"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8CA090] hover:text-[#C9A84C] transition-colors"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-medium">Scroll to Discover</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
