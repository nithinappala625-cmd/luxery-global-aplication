'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plane, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  Zap, 
  CheckCircle2, 
  Calendar,
  Gauge,
  Tag,
  Mail,
  Clock,
  Award,
  ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('+91 ');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
      engineProgram: 'Rolls-Royce CorporateCare Enhanced',
      imageUrl: '/g700_flagship.jpg',
    },
    {
      name: 'Bombardier Global 7500',
      registration: 'VT-BMR',
      category: 'Ultra Long Range',
      country: 'India (Mumbai / Delhi)',
      flag: '🇮🇳',
      priceUSD: '$67.9M',
      priceINR: '₹570.3 Cr',
      hours: '340 TTAF',
      engineProgram: 'GE Passport OnPoint Solutions',
      imageUrl: '/empty_leg.jpg',
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
      engineProgram: 'Honeywell MSP Gold (100% Paid)',
      imageUrl: '/hawker_jet.jpg',
    },
  ];

  const numbersData = [
    { value: '70+', label: 'AIRCRAFT MODELS', sub: 'Across Private Jets & Turboprops' },
    { value: '5+', label: 'YEARS OF EXPERIENCE', sub: 'In Private Aviation Transactions' },
    { value: 'UAM / RAM', label: 'ADVANCED AIR MOBILITY', sub: 'Next-Gen eVTOL & Helideck Network' },
    { value: '₹1,200+ Cr', label: 'TRANSACTION ADVISORY', sub: 'Audited Aviation Capital Deployed' },
  ];

  const aviationHubs = [
    { city: 'Mumbai', code: 'VABB', terminal: 'Kalina GA Terminal', type: 'Flagship Headquarters' },
    { city: 'New Delhi', code: 'VIDP', terminal: 'IGI Terminal 3 Airside', type: 'Sovereign Dispatch Hub' },
    { city: 'Bangalore', code: 'VOBL', terminal: 'Kempegowda VIP Apron', type: 'Tech & Aerotech Corridor' },
    { city: 'Dubai', code: 'OMDW', terminal: 'Al Maktoum DWC VIP', type: 'Middle East Gateway' },
    { city: 'London', code: 'EGLF', terminal: 'Farnborough Airport', type: 'Transatlantic Terminal' },
    { city: 'Geneva', code: 'LSGG', terminal: 'Geneva Cointrin VIP', type: 'European Escrow Desk' },
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `👑 *PLANEDEKHO INDIA / ROYENDISON CONSULTATION REQUEST*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Name:* ${inquiryName || 'Verified Principal'}\n` +
      `*Phone:* ${inquiryPhone}\n` +
      `*Message:* ${inquiryMessage || 'Requesting aircraft acquisition & consultation details.'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`
    );
    window.open(`https://wa.me/917981994870?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAFBF8] text-[#1A1A1A] font-sans antialiased selection:bg-[#C6A15B] selection:text-white">
      
      {/* 1. CINEMATIC HERO SECTION (PlaneDekho India Style) */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Runway Tarmac Hero Photography */}
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.82] scale-100 transition-transform duration-1000"
          style={{ backgroundImage: "url('/g700_flagship.jpg')" }}
        />
        
        {/* Gradient overlays for high contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#041D12]/95 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-12 w-full relative z-10 pt-28 pb-20 text-center sm:text-left">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-sm bg-[#041D12]/80 backdrop-blur-md border border-[#C6A15B]/60 text-[#DFC07E] text-[11px] uppercase tracking-[0.25em] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>PlaneDekho India · Royendison Aviation</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-[0.08em] sm:tracking-[0.12em] uppercase leading-[1.18] text-white">
              Redefining The Standards Of <br className="hidden sm:inline" />
              <span className="font-semibold text-white">Private Aviation In India</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-200 font-light leading-[1.8] max-w-2xl">
              A boutique philosophy delivering holistic aircraft transactions, bespoke fleet management, transparent DGCA title escrow, and priority access to Advanced Air Mobility.
            </p>

            {/* PlaneDekho-style Minimalist Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 justify-center sm:justify-start">
              <Link
                href="/aviation/sales"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#C6A15B] hover:bg-[#DFC07E] text-[#041D12] text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-lg hover:-translate-y-0.5 group"
              >
                <span>Aircrafts For Sale</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/charters"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/40 hover:border-white text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all group"
              >
                <span>What We Do</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="https://wa.me/917981994870?text=Hello%20PlaneDekho%20India,%20I%20wish%20to%20inquire%20about%20aircraft%20acquisition%20and%20charters."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-sm bg-[#065E38]/90 hover:bg-[#065E38] border border-[#25D366]/50 text-white text-xs font-semibold tracking-wider transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#25D366]" />
                <span>+91 7981994870</span>
              </a>
            </div>

          </div>
        </div>
      </section>


      {/* 2. OUR VISION (PlaneDekho India 2-Column Split Layout) */}
      <section className="w-full bg-[#1A1A1A] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left: Dark Content Panel with Vertical Accent Bar */}
          <div className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center bg-[#141414] border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="max-w-xl space-y-6">
              
              <div className="border-l-2 border-[#C6A15B] pl-4">
                <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#C6A15B] block mb-2">
                  OUR VISION
                </span>
                <h2 className="text-2xl sm:text-4xl font-normal tracking-[0.1em] uppercase text-white leading-snug">
                  Transforming Private Aviation
                </h2>
              </div>

              <p className="text-sm sm:text-base text-stone-300 font-light leading-[1.85]">
                At PlaneDekho India, we are transforming private aviation by providing a diverse range of aircraft, streamlined ownership processes, and expert consultation. Our mission is to simplify and innovate aircraft acquisition in India, meeting the unique needs and aspirations of every client.
              </p>

              <p className="text-xs sm:text-sm text-stone-400 font-light leading-[1.8] pt-2 border-t border-white/10">
                From intercontinental long-range business jets to light turbine aircraft and rotary helideck transfers, our team delivers complete lifecycle stewardship with uncompromised discretion.
              </p>

              <div className="pt-4">
                <Link
                  href="/aviation/sales"
                  className="inline-flex items-center gap-3 px-6 py-3 border border-white/40 hover:border-white text-white text-xs tracking-[0.2em] uppercase transition-all group"
                >
                  <span>Explore Our Fleet</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

            </div>
          </div>

          {/* Right: VIP Boarding Photo */}
          <div className="relative min-h-[380px] sm:min-h-[500px] overflow-hidden">
            <img 
              src="/vip_boarding.jpg"
              alt="PlaneDekho India VIP Boarding Experience"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md border border-white/20 text-xs text-stone-300">
              <strong className="text-white block font-medium uppercase tracking-wider mb-0.5">Sovereign Airside Protocol</strong>
              <span>Direct tarmac escort, red-carpet boarding, and executive lounges across Indian and international FBOs.</span>
            </div>
          </div>

        </div>
      </section>


      {/* 3. OUR SERVICES / "What We Offer" (PlaneDekho Alternating Split Blocks) */}
      <section className="bg-white text-[#1A1A1A] py-16 sm:py-24">
        
        {/* Header with Vertical Line */}
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12 mb-16">
          <div className="border-l-2 border-[#1A1A1A] pl-4">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-stone-500 block mb-1">
              OUR SERVICES
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-[0.1em] text-[#1A1A1A]">
              What We Offer
            </h2>
          </div>
        </div>

        {/* Block 1: AIRCRAFT ACQUISITION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-stone-200">
          <div className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center bg-[#FAFBF8] order-2 lg:order-1">
            <div className="max-w-xl space-y-6">
              <h3 className="text-2xl sm:text-3xl font-light tracking-[0.18em] uppercase text-[#1A1A1A]">
                AIRCRAFT <br />
                <span className="font-semibold">ACQUISITION</span>
              </h3>
              <p className="text-sm sm:text-base text-stone-600 font-light leading-[1.85]">
                We provide exceptional aircraft acquisition services, connecting you with the perfect aircraft through a transparent and seamless sales process. Our diverse inventory is designed to meet every client’s unique needs, ensuring a smooth ownership experience from start to finish. Click below to explore our available aircraft.
              </p>
              <div>
                <Link
                  href="/aviation/sales"
                  className="inline-flex items-center gap-3 px-6 py-3 border border-stone-800 hover:border-black text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all text-xs tracking-[0.2em] uppercase group"
                >
                  <span>Explore Inventory</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative min-h-[360px] sm:min-h-[460px] order-1 lg:order-2 overflow-hidden">
            <img 
              src="/g700_flagship.jpg"
              alt="Aircraft Acquisition Fleet"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Block 2: EXCLUSIVE ACCESS (UAM / eVTOL) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-stone-200">
          <div className="relative min-h-[360px] sm:min-h-[460px] overflow-hidden">
            <img 
              src="/empty_leg.jpg"
              alt="Exclusive Access to Advanced Air Mobility"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          <div className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center bg-[#FAFBF8]">
            <div className="max-w-xl space-y-6">
              <h3 className="text-2xl sm:text-3xl font-light tracking-[0.18em] uppercase text-[#1A1A1A]">
                EXCLUSIVE <br />
                <span className="font-semibold">ACCESS</span>
              </h3>
              <p className="text-sm sm:text-base text-stone-600 font-light leading-[1.85]">
                Get early access to the future of Urban Air Mobility (UAM) and Advanced Air Mobility (AAM) in India. Partnering with us gives you priority access to the latest eVTOL innovations and expert insights in the rapidly evolving aviation landscape.
              </p>
              <div>
                <Link
                  href="/charters"
                  className="inline-flex items-center gap-3 px-6 py-3 border border-stone-800 hover:border-black text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all text-xs tracking-[0.2em] uppercase group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Block 3: PERSONALIZED EXPERIENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-b border-stone-200">
          <div className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center bg-[#FAFBF8] order-2 lg:order-1">
            <div className="max-w-xl space-y-6">
              <h3 className="text-2xl sm:text-3xl font-light tracking-[0.18em] uppercase text-[#1A1A1A]">
                PERSONALIZED <br />
                <span className="font-semibold">EXPERIENCE</span>
              </h3>
              <p className="text-sm sm:text-base text-stone-600 font-light leading-[1.85]">
                Experience effortless aircraft ownership with our expert management services. We turn your aviation dreams into reality through a flexible and customized range of services. From acquisition to operations, we’re with you every step of the way.
              </p>
              <div>
                <Link
                  href="/aviation/sales"
                  className="inline-flex items-center gap-3 px-6 py-3 border border-stone-800 hover:border-black text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all text-xs tracking-[0.2em] uppercase group"
                >
                  <span>Our Services</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative min-h-[360px] sm:min-h-[460px] order-1 lg:order-2 overflow-hidden">
            <img 
              src="/jet_interior.jpg"
              alt="Personalized Luxury Cabin Experience"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>

      </section>


      {/* 4. WHY CHOOSE US (Exact User-Requested Section & Typography) */}
      <section className="bg-[#FAFBF8] py-20 sm:py-28 border-b border-stone-200">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
          
          <div className="max-w-3xl mb-14 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-stone-500 block">
              WHY CHOOSE US
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-[0.06em] text-[#1A1A1A] leading-tight">
              Exceptional Service, <br className="hidden sm:inline" />
              <span className="font-semibold">Unmatched Experience</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#C6A15B] my-4" />
            <p className="text-sm sm:text-base lg:text-lg text-stone-700 font-light leading-[1.9]">
              At PlaneDekho India, we take a holistic approach to aviation that extends beyond simple aircraft transactions. We pride ourselves on a boutique philosophy, tailoring every detail to your specific needs while adapting to the evolving market landscape. With us, your journey is a unique experience designed to meet your expectations and navigate the current market effectively.
            </p>

            <div className="pt-2">
              <Link
                href="/aviation/sales"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#1A1A1A] hover:bg-black text-white text-xs tracking-[0.2em] uppercase transition-all shadow-md group"
              >
                <span>Discover More</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Boutique Philosophy Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            
            <div className="p-8 bg-white border border-stone-200/80 rounded-sm shadow-sm hover:shadow-md transition-shadow space-y-3">
              <span className="text-xs font-mono font-bold text-[#C6A15B] tracking-widest block">01 / PHILOSOPHY</span>
              <h3 className="text-lg font-medium text-[#1A1A1A] uppercase tracking-wide">Boutique Tailoring</h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                Every acquisition is customized to your specific operational envelope, passenger requirements, and regional flight corridors.
              </p>
            </div>

            <div className="p-8 bg-white border border-stone-200/80 rounded-sm shadow-sm hover:shadow-md transition-shadow space-y-3">
              <span className="text-xs font-mono font-bold text-[#C6A15B] tracking-widest block">02 / APPROACH</span>
              <h3 className="text-lg font-medium text-[#1A1A1A] uppercase tracking-wide">Holistic Stewardship</h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                Comprehensive lifecycle advisory from borescope engine audits and DGCA title verification to hangarage and Part 135 operations.
              </p>
            </div>

            <div className="p-8 bg-white border border-stone-200/80 rounded-sm shadow-sm hover:shadow-md transition-shadow space-y-3">
              <span className="text-xs font-mono font-bold text-[#C6A15B] tracking-widest block">03 / INTELLIGENCE</span>
              <h3 className="text-lg font-medium text-[#1A1A1A] uppercase tracking-wide">Market Adaptability</h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                Real-time aviation intelligence and verified off-market listings protect your capital in dynamic global market cycles.
              </p>
            </div>

            <div className="p-8 bg-white border border-stone-200/80 rounded-sm shadow-sm hover:shadow-md transition-shadow space-y-3">
              <span className="text-xs font-mono font-bold text-[#C6A15B] tracking-widest block">04 / DISCRETION</span>
              <h3 className="text-lg font-medium text-[#1A1A1A] uppercase tracking-wide">Unmatched Experience</h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                24/7 dedicated aviation concierge, bilateral non-disclosure agreements, and sovereign escrow facilities ensuring seamless privacy.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* 5. IN NUMBERS SECTION (PlaneDekho India In Numbers) */}
      <section className="bg-[#141414] text-white py-20 sm:py-24 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
          
          <div className="border-l-2 border-[#C6A15B] pl-4 mb-14">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#C6A15B] block mb-1">
              PROVEN METRICS
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-[0.1em] uppercase text-white">
              PlaneDekho India In Numbers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {numbersData.map((item, index) => (
              <div 
                key={item.label}
                className="p-8 bg-[#1A1A1A] border border-white/10 rounded-sm space-y-2 hover:border-[#C6A15B]/50 transition-colors"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#DFC07E] font-mono tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white pt-2">
                  {item.label}
                </div>
                <div className="text-xs text-stone-400 font-light">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 6. FEATURED AIRCRAFTS FOR SALE */}
      <section className="py-20 sm:py-24 bg-white border-b border-stone-200">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div className="border-l-2 border-[#1A1A1A] pl-4">
              <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-stone-500 block mb-1">
                VERIFIED INVENTORY
              </span>
              <h2 className="text-2xl sm:text-4xl font-normal tracking-[0.1em] text-[#1A1A1A]">
                Aircrafts For Sale
              </h2>
            </div>

            <Link
              href="/aviation/sales"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 hover:text-[#065E38] transition-colors group"
            >
              <span>View All Available Aircraft</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAircraft.map((plane) => (
              <div
                key={plane.registration}
                className="bg-[#FAFBF8] border border-stone-200 hover:border-stone-400 rounded-sm overflow-hidden transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 bg-stone-900 overflow-hidden">
                    <img
                      src={plane.imageUrl}
                      alt={plane.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-bold">
                        REG: {plane.registration}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#DFC07E] block mb-0.5">
                        {plane.category}
                      </span>
                      <h3 className="text-lg font-medium text-white">
                        {plane.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-3 text-xs">
                    <div className="flex justify-between text-stone-500 border-b border-stone-200/60 pb-2">
                      <span>Base Corridor:</span>
                      <strong className="text-stone-900 font-medium">{plane.flag} {plane.country}</strong>
                    </div>
                    <div className="flex justify-between text-stone-500 border-b border-stone-200/60 pb-2">
                      <span>Airframe Hours:</span>
                      <strong className="font-mono text-stone-900">{plane.hours}</strong>
                    </div>
                    <div className="flex justify-between text-stone-500 border-b border-stone-200/60 pb-2">
                      <span>Powerplant Program:</span>
                      <strong className="text-stone-900 truncate max-w-[170px]">{plane.engineProgram}</strong>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500">
                        Asking Price
                      </span>
                      <span className="font-mono text-base font-bold text-[#065E38]">
                        {plane.priceINR} <span className="text-xs text-stone-500 font-normal">({plane.priceUSD})</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href="/aviation/sales"
                    className="w-full py-3 border border-stone-800 hover:border-black text-stone-900 hover:bg-[#1A1A1A] hover:text-white font-medium text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-btn-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 7. DOMESTIC & INTERNATIONAL CORRIDORS */}
      <section className="py-20 sm:py-24 bg-[#FAFBF8] border-b border-stone-200">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
          
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-stone-500 block mb-1">
              OPERATIONAL REACH
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-[0.1em] text-[#1A1A1A]">
              Primary Aviation Corridors
            </h2>
            <p className="text-sm text-stone-600 font-light mt-2">
              Dedicated airside FBO handling, expedited customs clearance, and sovereign apron management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aviationHubs.map((hub) => (
              <div
                key={hub.city}
                className="p-6 bg-white border border-stone-200 rounded-sm space-y-2 hover:border-stone-400 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-[#065E38]">{hub.code}</span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">{hub.type}</span>
                </div>
                <h3 className="text-lg font-medium text-[#1A1A1A]">{hub.city}</h3>
                <p className="text-xs text-stone-500 font-mono">{hub.terminal}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 8. CONTACT & CONSULTATION (PlaneDekho Direct Advisory Desk) */}
      <section className="py-20 sm:py-28 bg-[#141414] text-white">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="space-y-6">
              <div className="border-l-2 border-[#C6A15B] pl-4">
                <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#C6A15B] block mb-1">
                  GET IN TOUCH
                </span>
                <h2 className="text-2xl sm:text-4xl font-light tracking-[0.08em] uppercase text-white leading-tight">
                  Start Your <br />
                  <span className="font-semibold">Aviation Journey</span>
                </h2>
              </div>

              <p className="text-sm sm:text-base text-stone-300 font-light leading-[1.85] max-w-lg">
                Whether you are seeking to acquire an executive business jet, evaluate off-market listings, or structure fleet management, our boutique advisory team is at your disposal.
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-stone-300">
                  <PhoneCall className="w-4 h-4 text-[#C6A15B]" />
                  <span>VIP Concierge: +91 7981994870</span>
                </div>
                <div className="flex items-center gap-3 text-stone-300">
                  <Mail className="w-4 h-4 text-[#C6A15B]" />
                  <span>Desk: concierge@planedekhoindia.com / acquisitions@royendison.com</span>
                </div>
                <div className="flex items-center gap-3 text-stone-300">
                  <Clock className="w-4 h-4 text-[#C6A15B]" />
                  <span>24/7 Global AOG & Mission Dispatch Support</span>
                </div>
              </div>
            </div>

            {/* Direct Consultation Form */}
            <div className="bg-[#1A1A1A] border border-white/10 p-8 sm:p-10 rounded-sm">
              <h3 className="text-lg uppercase tracking-wider font-medium text-white mb-6">
                Request Private Consultation
              </h3>

              {submitted ? (
                <div className="p-6 bg-[#065E38]/30 border border-[#25D366]/50 rounded text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#25D366] mx-auto" />
                  <h4 className="text-white font-medium text-sm">Inquiry Dispatched</h4>
                  <p className="text-xs text-stone-300">
                    Your requisition has been forwarded to our aviation desk. Our senior advisor will respond promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                      Full Name / Entity
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Adani Capital / Sharma Family Office"
                      className="w-full px-4 py-3 bg-[#121212] border border-white/15 focus:border-[#C6A15B] text-white text-xs outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                      Direct Telephone / WhatsApp
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="+91 "
                      className="w-full px-4 py-3 bg-[#121212] border border-white/15 focus:border-[#C6A15B] text-white text-xs outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                      Aircraft Requirement / Mission Profile
                    </label>
                    <textarea
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="e.g. Seeking Gulfstream G700 / Bombardier Global acquisition or charter advisory..."
                      className="w-full px-4 py-3 bg-[#121212] border border-white/15 focus:border-[#C6A15B] text-white text-xs outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C6A15B] hover:bg-[#DFC07E] text-[#041D12] font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-md"
                  >
                    Dispatch Consultation Request
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
