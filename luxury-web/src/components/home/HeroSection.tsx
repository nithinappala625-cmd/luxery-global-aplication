import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-20">
      {/* Subtle Luxury Pattern / Light Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E8D48A]/15 rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#082015 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
        {/* Prestige Eyebrow */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F5F5F2] border border-[#082015]/15 text-[#082015] text-[11px] font-semibold tracking-[0.25em] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
          <span>Elite &middot; Exclusive &middot; Eternal</span>
        </div>

        {/* Editorial Heading in Deep Dark Black-like Green */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#082015] tracking-tight leading-[1.06]">
          The World's Most <br />
          <span className="italic font-normal text-gold-gradient">
            Exclusive Luxury
          </span>{' '}
          Marketplace
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#4A5E53] font-serif italic tracking-wide leading-relaxed">
          Extraordinary Assets. Elite Experiences. One Sovereign Platform.
        </p>

        {/* Primary Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#categories"
            className="w-full sm:w-auto px-8 py-4 rounded text-xs font-bold tracking-[0.25em] uppercase bg-[#051810] text-white hover:bg-[#0F3826] hover:text-[#E8D48A] shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Explore 11 Verticals</span>
            <ArrowRight className="w-4 h-4 text-[#C9A84C]" />
          </a>
          <a
            href="/membership"
            className="w-full sm:w-auto px-8 py-4 rounded text-xs font-semibold tracking-[0.25em] uppercase border border-[#082015]/30 text-[#082015] hover:bg-[#082015] hover:text-white transition-all"
          >
            Apply for Membership
          </a>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <a
        href="#stats"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#7A8F83] hover:text-[#082015] transition-colors"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-semibold">Scroll to Discover</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#C9A84C]" />
      </a>
    </section>
  );
}
