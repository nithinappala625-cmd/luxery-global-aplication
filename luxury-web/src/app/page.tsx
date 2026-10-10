'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Plane, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  Zap, 
  Building2, 
  CheckCircle2, 
  Anchor,
  Compass,
  FileCheck2,
  Lock,
  PlusCircle
} from 'lucide-react';

export default function HomePage() {
  const aviationCountries = [
    {
      country: 'United Kingdom',
      flag: '🇬🇧',
      city: 'London',
      airports: 'Farnborough (EGLF) · Luton (EGGW)',
      description: 'Primary transatlantic heavy jet hub with dedicated sovereign FBO lounges.',
    },
    {
      country: 'United Arab Emirates',
      flag: '🇦🇪',
      city: 'Dubai',
      airports: 'Al Maktoum VIP (OMDW) · Dubai (OMDB)',
      description: 'Gulf aviation corridor connecting Europe, Africa, and South Asia with 24-hr slots.',
    },
    {
      country: 'India',
      flag: '🇮🇳',
      city: 'Mumbai & New Delhi',
      airports: 'Kalina GA (VABB) · Delhi IGI Terminal (VIDP)',
      description: 'Subcontinent industrialist jet fleet with DGCA Part 135 air ambulance & charter dispatch.',
    },
    {
      country: 'Switzerland',
      flag: '🇨🇭',
      city: 'Geneva & Zurich',
      airports: 'Geneva Cointrin (LSGG) · Zurich (LSZH)',
      description: 'Neutral private banking escrow and alpine ski resort helicopter transfers.',
    },
    {
      country: 'United States',
      flag: '🇺🇸',
      city: 'New York & Miami',
      airports: 'Teterboro (KTEB) · Miami Executive (KTMB)',
      description: 'North American business aviation corridor with rapid coast-to-coast departures.',
    },
    {
      country: 'Singapore',
      flag: '🇸🇬',
      city: 'Singapore',
      airports: 'Seletar Business Aviation (WSSL)',
      description: 'Pan-Asian family office flight gateway with zero slot congestion.',
    },
    {
      country: 'Monaco & France',
      flag: '🇲🇨',
      city: 'Monaco / Côte d’Azur',
      airports: 'Nice Côte d’Azur (LFMN) · Monaco Heliport (LNMC)',
      description: 'Direct tarmac-to-superyacht helicopter transfers and Mediterranean charters.',
    },
  ];

  const featuredAircraft = [
    {
      name: 'Gulfstream G700 Flagship',
      registration: 'N700ED',
      category: 'Ultra Long Range',
      country: 'United Kingdom / Dubai',
      flag: '🇬🇧',
      priceUSD: '$74.5M',
      priceINR: '₹625.8 Cr',
      hours: '195 TTAF',
      engineProgram: 'Rolls-Royce CorporateCare',
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'Bombardier Global 7500',
      registration: 'VT-BMR',
      category: 'Ultra Long Range',
      country: 'India / Geneva',
      flag: '🇮🇳',
      priceUSD: '$67.9M',
      priceINR: '₹570.3 Cr',
      hours: '340 TTAF',
      engineProgram: 'GE Passport OnPoint',
      imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'Hawker 900XP Executive',
      registration: 'VT-BNB',
      category: 'Midsize Jet',
      country: 'India (New Delhi)',
      flag: '🇮🇳',
      priceUSD: '$5.95M',
      priceINR: '₹49.9 Cr',
      hours: '2,150 TTAF',
      engineProgram: 'Honeywell MSP Gold',
      imageUrl: '/hawker_jet.jpg',
    },
  ];

  return (
    <div className="bg-[#FAFBF8] text-[#0A1A12] min-h-screen">
      
      {/* 1. CINEMATIC HERO SECTION: PURE LUXURY AVIATION EMPIRE */}
      <section className="relative min-h-[92vh] flex items-center bg-[#041D12] text-[#FCFBF7] overflow-hidden pt-24 pb-16 px-6 sm:px-10 border-b border-[#C6A15B]/30 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
        
        {/* Subtle background jet photography */}
        <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center mix-blend-luminosity" style={{ backgroundImage: "url('/vip_boarding.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041D12] via-[#041D12]/90 to-transparent z-0" />

        <div className="max-w-[1440px] mx-auto w-full relative z-10">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#0A3A25] border border-[#C6A15B]/50 text-[#DFC07E] text-xs font-mono font-bold tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Royendison Global Heritage Aviation Marketplace</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FCFBF7] leading-[1.08]">
              The Sovereign Aviation Marketplace
            </h1>

            <p className="text-base sm:text-lg text-stone-200 font-light leading-relaxed max-w-2xl">
              Facilitating private aircraft sales, audited acquisitions, and on-demand flight charters for high-net-worth principals, royal flight wings, and corporate leaders across London, Dubai, and New Delhi.
            </p>

            {/* Core Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/aviation/sales"
                className="px-6 py-3.5 rounded bg-gradient-to-r from-[#C6A15B] to-[#DFC07E] hover:from-[#DFC07E] hover:to-[#C6A15B] text-[#041D12] text-xs font-bold tracking-[0.18em] uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Explore Private Sales
              </Link>

              <Link
                href="/charters"
                className="px-6 py-3.5 rounded bg-[#0A3A25] hover:bg-[#02140B] border border-[#C6A15B] text-[#DFC07E] text-xs font-bold tracking-[0.18em] uppercase transition-all shadow hover:-translate-y-0.5"
              >
                Open Charter Desk
              </Link>

              <Link
                href="/deals"
                className="px-5 py-3.5 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-bold tracking-[0.15em] uppercase transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-amber-400" />
                <span>Empty Legs (-65%)</span>
              </Link>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">Fixed-Wing Jets</span>
                <strong className="font-serif text-2xl font-bold text-[#DFC07E]">81 Models</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">Rotary Helicopters</span>
                <strong className="font-serif text-2xl font-bold text-white">40 Models</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">Global Corridors</span>
                <strong className="font-serif text-2xl font-bold text-[#DFC07E]">7 Hubs</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">Escrow Standard</span>
                <strong className="font-serif text-2xl font-bold text-white">100% Audited</strong>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE TWO PRIMARY LAUNCH PILLARS: PRIVATE SALES vs CHARTER DESK */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#065E38] font-bold">
            Dual Operational Desks
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#041D12]">
            Two Pillars of Private Aviation
          </h2>
          <p className="text-sm text-stone-600 font-light">
            Whether acquiring multi-million dollar long-range aircraft or chartering executive helicopters for weddings and state summits, our desks operate with uncompromising precision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pillar 1: Private Sales */}
          <div className="bg-white border border-[#041D12]/15 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative h-72 bg-stone-900 overflow-hidden">
                <img
                  src="/vip_boarding.jpg"
                  alt="Private Aircraft Sales"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041D12] via-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-[#041D12]/95 backdrop-blur-md border border-[#C6A15B] text-[#DFC07E] text-xs font-mono font-bold uppercase tracking-wider">
                    Capital Acquisitions
                  </span>
                </div>
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Private Sales & Title Escrow
                  </h3>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <p className="text-sm text-stone-600 leading-relaxed font-light">
                  Acquire verified business jets and turbine aircraft directly from private owners and sovereign flight departments. Every transaction includes certified logbook audits, borescope engine inspections, and bilateral escrow facilities.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 bg-[#FAFBF8] border border-stone-200 rounded-lg">
                    <strong className="text-[#041D12] block mb-0.5">Registration Verified</strong>
                    <span className="text-stone-500">Official FAA, DGCA & EASA tail registrations displayed.</span>
                  </div>
                  <div className="p-3 bg-[#FAFBF8] border border-stone-200 rounded-lg">
                    <strong className="text-[#041D12] block mb-0.5">Sovereign Escrow</strong>
                    <span className="text-stone-500">Multi-currency neutral settlement in USD, GBP, and EUR.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 pt-0">
              <Link
                href="/aviation/sales"
                className="w-full py-3.5 rounded bg-[#041D12] hover:bg-[#0A3A25] text-[#DFC07E] font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow"
              >
                <span>Inspect Sales Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pillar 2: Charter Desk */}
          <div className="bg-white border border-[#041D12]/15 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative h-72 bg-stone-900 overflow-hidden">
                <img
                  src="/helicopter.jpg"
                  alt="Aviation Charter Desk"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041D12] via-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-[#041D12]/95 backdrop-blur-md border border-[#C6A15B] text-[#DFC07E] text-xs font-mono font-bold uppercase tracking-wider">
                    On-Demand Operations
                  </span>
                </div>
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    VIP Charter & Rotary Operations
                  </h3>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <p className="text-sm text-stone-600 leading-relaxed font-light">
                  Switch between 81 fixed-wing executive jets and 40 VIP helicopters. Tailored flight solutions for wedding grand entries, rose-petal flower showers, high-level political campaigns, and urgent transcontinental family travel.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 bg-[#FAFBF8] border border-stone-200 rounded-lg">
                    <strong className="text-[#041D12] block mb-0.5">Wedding Grand Entries</strong>
                    <span className="text-stone-500">Flower shower drops and rooftop venue helipad landings.</span>
                  </div>
                  <div className="p-3 bg-[#FAFBF8] border border-stone-200 rounded-lg">
                    <strong className="text-[#041D12] block mb-0.5">Corporate Hops</strong>
                    <span className="text-stone-500">Same-day return business itineraries with zero security delay.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 pt-0">
              <Link
                href="/charters"
                className="w-full py-3.5 rounded bg-[#041D12] hover:bg-[#0A3A25] text-[#DFC07E] font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow"
              >
                <span>Access Charter Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. REQUESTED SHIP BANNER: HORIZONTAL AERIAL TOP-VIEW SHIP IN DEEP SEA WITH OVERLAY TEXT */}
      <section className="relative w-full h-[460px] sm:h-[500px] overflow-hidden my-12 shadow-2xl border-y border-[#C6A15B]/40">
        {/* Background image of aerial superyacht in the sea */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-90"
          style={{ backgroundImage: "url('/aerial_ship_sea.jpg')" }}
        />

        {/* Subtle luxury vignette and text backing */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041D12]/90 via-[#041D12]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041D12]/80 via-transparent to-black/30" />

        {/* Overlay Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto h-full flex items-center px-6 sm:px-12">
          <div className="max-w-2xl space-y-5 text-white">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0A3A25]/90 backdrop-blur-md border border-[#C6A15B] text-[#DFC07E] text-xs font-mono font-bold tracking-[0.2em] uppercase">
              <Anchor className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Runway to Anchorage · Integrated Helideck Transfers</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Sovereign Mobility: Connecting Tarmac to Helideck
            </h2>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-light">
              For principals requiring seamless transit from executive airport aprons directly to offshore mega superyacht helipads. Operating bespoke twin-turbine rotary transfers across Monaco, Dubai, the French Riviera, and the Maldivian atolls.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/charters"
                className="px-6 py-3 rounded bg-gradient-to-r from-[#C6A15B] to-[#DFC07E] hover:from-[#DFC07E] hover:to-[#C6A15B] text-[#041D12] text-xs font-bold tracking-widest uppercase transition-all shadow-lg"
              >
                Inquire Helideck Transfer
              </Link>

              <a
                href="https://wa.me/917981994870?text=Hello%20Royendison,%20I%20wish%20to%20arrange%20a%20yacht%20helideck%20transfer."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded bg-[#065E38] hover:bg-[#044B2D] border border-[#25D366]/50 text-white text-xs font-semibold tracking-wider transition-all flex items-center gap-2 shadow"
              >
                <PhoneCall className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Ops (+91 7981994870)</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 4. GLOBAL AVIATION CORRIDORS & COUNTRIES */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#065E38] font-bold">
            Sovereign Flight Network
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#041D12]">
            International Aviation Corridors
          </h2>
          <p className="text-sm text-stone-600 font-light">
            Seven primary general aviation hubs with expedited FBO ground handling, dedicated private terminals, and direct tarmac limousine escort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {aviationCountries.map((hub) => (
            <div
              key={hub.city}
              className="bg-white border border-[#041D12]/15 hover:border-[#041D12] p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{hub.flag}</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Active Airside Desk
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#041D12] group-hover:text-[#065E38] transition-colors">
                  {hub.city}
                </h3>
                <span className="text-xs text-stone-500 font-medium">{hub.country}</span>
              </div>

              <div className="p-2.5 bg-stone-50 rounded border border-stone-200 text-xs font-mono text-[#041D12] font-semibold">
                {hub.airports}
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {hub.description}
              </p>
            </div>
          ))}

          {/* Callout Card */}
          <div className="bg-[#041D12] text-white p-6 rounded-xl border border-[#C6A15B]/40 shadow-md flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#DFC07E]">
                Custom Flight Routing
              </span>
              <h3 className="font-serif text-xl font-bold">
                Transcontinental Flight Clearance
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Need overflight permits across non-standard diplomatic air corridors? Our dispatch team manages full clearance under bilateral sovereign protocols.
              </p>
            </div>

            <a
              href="https://wa.me/917981994870"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#DFC07E] font-bold uppercase tracking-wider hover:underline"
            >
              <span>Contact Flight Planning Desk ➔</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRIVATE SALES AIRCRAFT PREVIEW */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 py-16 border-t border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#065E38] font-bold">
              Verified Logbooks & Titles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#041D12]">
              Acquisition Inventory Highlights
            </h2>
          </div>

          <Link
            href="/aviation/sales"
            className="text-xs font-bold uppercase tracking-wider text-[#041D12] hover:text-[#065E38] flex items-center gap-1.5"
          >
            <span>View Complete Sales Inventory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredAircraft.map((plane) => (
            <div
              key={plane.registration}
              className="bg-white border border-[#041D12]/15 hover:border-[#041D12] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 bg-stone-900 overflow-hidden">
                  <img
                    src={plane.imageUrl}
                    alt={plane.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-[#041D12]/95 backdrop-blur-md border border-[#C6A15B] text-white font-mono text-xs font-bold">
                      TAIL: {plane.registration}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#DFC07E] transition-colors">
                      {plane.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-3 text-xs">
                  <div className="flex justify-between text-stone-500">
                    <span>Base & Country:</span>
                    <strong className="text-[#041D12]">{plane.flag} {plane.country}</strong>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Airframe Time:</span>
                    <strong className="font-mono text-[#041D12]">{plane.hours}</strong>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Engine Program:</span>
                    <strong className="text-[#041D12] truncate max-w-[160px]">{plane.engineProgram}</strong>
                  </div>

                  <div className="p-3 bg-[#041D12] text-white rounded-lg border border-[#C6A15B]/30 flex items-center justify-between mt-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">
                      Asking Price
                    </span>
                    <span className="font-serif text-lg font-bold text-[#DFC07E]">
                      {plane.priceINR} ({plane.priceUSD})
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href="/aviation/sales"
                  className="w-full py-2.5 rounded bg-[#041D12] hover:bg-[#0A3A25] text-[#DFC07E] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Acquisition Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BEST DEALS & EMPTY LEGS BANNER */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 py-10">
        <div className="bg-[#041D12] text-[#FCFBF7] border border-[#C6A15B]/40 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[11px] font-mono font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>Empty Legs & Ferry Flights Desk</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Repositioning Sectors at Up to 65% Preferential Rates
            </h3>
            <p className="text-sm text-stone-300 font-light leading-relaxed">
              Lock full-cabin executive jet charters between Mumbai, Delhi, Goa, London, Nice, and Dubai on pre-confirmed empty positioning flights.
            </p>
          </div>

          <Link
            href="/deals"
            className="px-8 py-4 rounded bg-gradient-to-r from-[#C6A15B] to-[#DFC07E] hover:from-[#DFC07E] hover:to-[#C6A15B] text-[#041D12] font-bold text-xs uppercase tracking-widest transition-all shadow-xl whitespace-nowrap hover:-translate-y-0.5"
          >
            Explore Best Deals Desk
          </Link>
        </div>
      </section>

      {/* 7. SOVEREIGN ESCROW PROTOCOL */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 py-16 border-t border-stone-200">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#065E38] font-bold">
            Fiduciary Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#041D12]">
            The Royendison Acquisition Protocol
          </h2>
          <p className="text-sm text-stone-600 font-light">
            Every transaction follows rigorous legal, technical, and escrow protocols to safeguard capital and ensure unencumbered title delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-[#041D12]/15 rounded-xl space-y-3">
            <span className="font-mono text-2xl font-bold text-[#C6A15B]">01</span>
            <h3 className="font-serif text-lg font-bold text-[#041D12]">Borescope & Logbook Audit</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              Independent technical pre-purchase inspection (PPI) including turbine borescope, avionics flight test, and FAA/DGCA title verification.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#041D12]/15 rounded-xl space-y-3">
            <span className="font-mono text-2xl font-bold text-[#C6A15B]">02</span>
            <h3 className="font-serif text-lg font-bold text-[#041D12]">Bilateral LOI & Escrow</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              Funds deposited into neutral Swiss or UK banking escrow facilities under bilateral Non-Disclosure and Purchase Agreements.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#041D12]/15 rounded-xl space-y-3">
            <span className="font-mono text-2xl font-bold text-[#C6A15B]">03</span>
            <h3 className="font-serif text-lg font-bold text-[#041D12]">Export C of A & Deregistration</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              Civil aviation authority title clearance, Export Certificate of Airworthiness, and unencumbered sovereign flag transfer.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#041D12]/15 rounded-xl space-y-3">
            <span className="font-mono text-2xl font-bold text-[#C6A15B]">04</span>
            <h3 className="font-serif text-lg font-bold text-[#041D12]">Turnkey Ferry Delivery</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              Full-service international ferry flight crew, custom interior detailing, and direct delivery to your home hangar apron.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
