'use client';

import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const { openEnquiry } = useLuxuryUI();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#061C16] text-[#FCFBF7]">
      {/* Cinematic Full-Bleed Dark Atmospheric Photography */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2694&auto=format&fit=crop')`,
          }}
        />
        {/* Layered Deep Forest Green & Near Black Editorial Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061C16] via-[#061C16]/80 to-[#080B09]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#061C16]/60 to-[#061C16]" />
      </div>

      {/* Subtle Hairline Geometry */}
      <div className="absolute inset-x-8 top-28 bottom-28 border border-[#C6A15B]/15 pointer-events-none hidden lg:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-20 space-y-8">
        {/* Micro-caps Brand Eyebrow */}
        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#C6A15B]/30 bg-[#061C16]/60 backdrop-blur-md">
            <span className="w-1 h-1 bg-[#C6A15B] rotate-45" />
            <span className="text-[10px] tracking-[0.35em] text-[#C6A15B] uppercase font-medium">
              NP GROUPS &middot; INTERNATIONAL PRIVATE LUXURY NETWORK
            </span>
            <span className="w-1 h-1 bg-[#C6A15B] rotate-45" />
          </div>
          <span className="text-[11px] tracking-[0.45em] text-[#D8D3C8]/75 uppercase font-serif italic pt-1">
            PRIVATE. EXCEPTIONAL. GLOBAL.
          </span>
        </div>

        {/* Grand Editorial Headline in Cormorant Garamond */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light text-[#FCFBF7] tracking-tight leading-[1.08] max-w-4xl mx-auto">
          A Private World of <br className="hidden sm:inline" />
          <span className="font-normal italic text-[#F6F3EA] border-b border-[#C6A15B]/40 pb-1">
            Exceptional Possibilities.
          </span>
        </h1>

        {/* Narrative Description */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#D8D3C8]/85 font-light tracking-wide leading-relaxed">
          A curated international network connecting exceptional assets, distinguished businesses and private opportunities across forty-two sovereign jurisdictions.
        </p>

        {/* Editorial Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href="#collection"
            className="w-full sm:w-auto px-9 py-4 bg-[#FCFBF7] text-[#061C16] text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all duration-300 shadow-xl flex items-center justify-center gap-3"
          >
            <span>EXPLORE THE COLLECTION</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() =>
              openEnquiry({
                title: 'Request Private Access',
                subtitle: 'Discreet allocation protocol for qualified individuals, family offices, and certified brokers.',
                defaultVertical: 'Private Aviation',
              })
            }
            className="w-full sm:w-auto px-9 py-4 border border-[#C6A15B]/60 text-[#FCFBF7] text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#C6A15B]/15 hover:border-[#C6A15B] transition-all duration-300 backdrop-blur-sm"
          >
            REQUEST PRIVATE ACCESS
          </button>
        </div>

        {/* Global Desks Nodes */}
        <div className="pt-12 hidden md:flex items-center justify-center gap-6 text-[10px] uppercase tracking-[0.3em] text-[#D8D3C8]/60">
          <span>GENEVA</span>
          <span className="text-[#C6A15B]/50">&middot;</span>
          <span>MONACO</span>
          <span className="text-[#C6A15B]/50">&middot;</span>
          <span>LONDON</span>
          <span className="text-[#C6A15B]/50">&middot;</span>
          <span>DUBAI</span>
          <span className="text-[#C6A15B]/50">&middot;</span>
          <span>SINGAPORE</span>
          <span className="text-[#C6A15B]/50">&middot;</span>
          <span>NEW YORK</span>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <a
        href="#manifesto"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#D8D3C8]/50 hover:text-[#C6A15B] transition-colors"
      >
        <span className="text-[9px] uppercase tracking-[0.35em]">DISCOVER</span>
        <div className="w-px h-6 bg-gradient-to-b from-[#C6A15B] to-transparent" />
      </a>
    </section>
  );
}
