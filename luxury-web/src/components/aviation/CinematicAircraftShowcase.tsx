'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  Compass, 
  Wind, 
  Gauge, 
  Layers, 
  Eye, 
  CheckCircle2, 
  Sliders,
  Maximize2
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  xPercent: number;
  yPercent: number;
  spec: string;
  detail: string;
}

const SHOWCASE_PERSPECTIVES = [
  {
    id: 'exterior',
    label: 'Aerodynamic Airframe',
    badge: 'Mach 0.925 Flagship',
    image: '/g700_flagship.jpg',
    headline: 'Rolls-Royce Pearl 700 Powerplant & Clean-Wing Aerodynamics',
    telemetry: {
      speed: 'Mach 0.925 (516 KTAS)',
      range: '7,750 Nautical Miles',
      ceiling: 'FL510 (51,000 Feet)',
      cabinAlt: '4,100 FT at FL450',
    },
    hotspots: [
      {
        id: 'engines',
        title: 'Rolls-Royce Pearl 700',
        subtitle: '18,250 lbf Thrust per Engine',
        xPercent: 67,
        yPercent: 49,
        spec: 'CorporateCare Enhanced',
        detail: '100% engine maintenance coverage enrolled with 24/7 global AOG response.',
      },
      {
        id: 'avionics',
        title: 'Symmetry Flight Deck',
        subtitle: 'Active Control Sidesticks',
        xPercent: 24,
        yPercent: 57,
        spec: 'Synthetic Vision II',
        detail: 'Ten touchscreen displays with dual head-up guidance and predictive windshear.',
      },
      {
        id: 'winglets',
        title: 'Supercritical Wing',
        subtitle: 'Whisper-Quiet Cruise',
        xPercent: 92,
        yPercent: 60,
        spec: 'Extended Wing Span',
        detail: 'Optimized high-speed cruise geometry enabling non-stop London to Singapore flights.',
      },
    ],
  },
  {
    id: 'cabin',
    label: 'Master Living Zone',
    badge: 'Four Distinct Staterooms',
    image: '/jet_interior.jpg',
    headline: 'Bespoke Hand-Stitched Leather & Nuage Zero-Gravity Suites',
    telemetry: {
      speed: 'Mach 0.90 Normal Cruise',
      range: '7,750 NM Non-Stop',
      ceiling: '51,000 FT Smooth Air',
      cabinAlt: '100% Fresh Air Replaced Every 2 Min',
    },
    hotspots: [
      {
        id: 'master-bed',
        title: 'Permanent Master Bed',
        subtitle: 'Aft En-Suite Stateroom',
        xPercent: 35,
        yPercent: 55,
        spec: 'King-Single Berth',
        detail: 'Dedicated bedroom stateroom with stand-up shower and wardrobe credenza.',
      },
      {
        id: 'circadian',
        title: 'Circadian LED Spectrum',
        subtitle: 'Zero Jet-Lag Simulation',
        xPercent: 50,
        yPercent: 22,
        spec: 'Dynamic Lighting',
        detail: 'Synchronizes cabin light temperatures to destination time zones to eliminate fatigue.',
      },
      {
        id: 'connectivity',
        title: 'Dual Ka-Band Satcom',
        subtitle: 'Jet ConneX High Speed',
        xPercent: 75,
        yPercent: 65,
        spec: '50 Mbps Streaming',
        detail: 'Global seamless high-definition videoconferencing and encrypted financial transfers.',
      },
    ],
  },
  {
    id: 'galley',
    label: 'Gourmet Aviation Galley',
    badge: 'Michelin Star En-Route',
    image: '/jet_galley.jpg',
    headline: 'Full-Service Forward Galley with Dual Convection Ovens & Fine Crystal',
    telemetry: {
      speed: 'Mach 0.925',
      range: '14,350 KM Range',
      ceiling: 'FL510 Ceiling',
      cabinAlt: 'Ultra-Quiet Soundproofing',
    },
    hotspots: [
      {
        id: 'convection',
        title: 'Steam & Convection Ovens',
        subtitle: 'Fine Dining At Altitude',
        xPercent: 62,
        yPercent: 78,
        spec: 'Commercial Part 135',
        detail: 'Enables caviar service and freshly prepared multi-course bespoke dinners.',
      },
      {
        id: 'cellar',
        title: 'Chilled Wine Storage',
        subtitle: 'Sommelier Dedicated Rack',
        xPercent: 86,
        yPercent: 22,
        spec: 'Dual-Zone Temperature',
        detail: 'Maintains Grand Cru vintages at precise serving cellar temperatures.',
      },
    ],
  },
];

export default function CinematicAircraftShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const currentView = SHOWCASE_PERSPECTIVES[activeTab];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animated text reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
      }

      // Parallax scroll effect for showcase
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.to('.showcase-metric-card', {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div ref={containerRef} className="bg-[#062B1B] text-[#FCFBF7] rounded-2xl border border-[#C6A15B]/40 overflow-hidden shadow-2xl">
      
      {/* Top Header & Perspective Selector */}
      <div className="p-6 sm:p-8 border-b border-[#C6A15B]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#C6A15B] uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Engineering Telemetry</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Cinematic Aircraft Inspection Atelier
          </h3>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center bg-[#03180F] p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
          {SHOWCASE_PERSPECTIVES.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(index);
                setActiveHotspot(null);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === index
                  ? 'bg-[#0A3A25] text-[#DFC07E] border border-[#C6A15B] shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative min-h-[480px] sm:min-h-[560px] bg-black overflow-hidden flex items-end">
        {/* Background Aircraft Imagery */}
        <motion.img
          key={currentView.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          src={currentView.image}
          alt={currentView.label}
          className="absolute inset-0 w-full h-full object-cover object-center brightness-90"
        />

        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#062B1B] via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />

        {/* Perspective Badge */}
        <div className="absolute top-6 left-6 z-20">
          <span className="px-3 py-1 rounded bg-[#03180F]/90 backdrop-blur-md border border-[#C6A15B] text-[#DFC07E] text-xs font-mono font-bold uppercase tracking-wider shadow-lg">
            {currentView.badge}
          </span>
        </div>

        {/* Interactive Hotspot Pins */}
        {currentView.hotspots.map((hs) => (
          <div
            key={hs.id}
            style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <button
              onClick={() => setActiveHotspot(activeHotspot?.id === hs.id ? null : hs)}
              className="relative group p-2 focus:outline-none"
              title={hs.title}
            >
              {/* Pulsing beacon */}
              <span className="absolute inset-0 rounded-full bg-[#C6A15B]/40 animate-ping group-hover:bg-amber-400/60" />
              <div className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg ${
                activeHotspot?.id === hs.id
                  ? 'bg-[#C6A15B] border-white text-[#061C14]'
                  : 'bg-[#03180F]/90 border-[#C6A15B] text-[#DFC07E]'
              }`}>
                <Activity className="w-4 h-4" />
              </div>
            </button>

            {/* Hotspot Floating Tooltip Card */}
            <AnimatePresence>
              {activeHotspot?.id === hs.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 bg-[#03180F]/95 backdrop-blur-lg border border-[#C6A15B] rounded-xl p-3.5 shadow-2xl z-30 text-left pointer-events-auto"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] uppercase font-mono font-bold text-[#C6A15B] tracking-wider">
                      {hs.spec}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(null);
                      }}
                      className="text-stone-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-white mb-0.5">{hs.title}</h4>
                  <p className="text-[11px] text-[#DFC07E] font-medium mb-1.5">{hs.subtitle}</p>
                  <p className="text-[10px] text-stone-300 leading-relaxed font-light">{hs.detail}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Bottom Headline & Live Telemetry Bar */}
        <div className="relative z-10 p-6 sm:p-8 w-full space-y-4">
          <h4
            ref={headlineRef}
            className="font-serif text-lg sm:text-2xl font-bold text-white max-w-2xl text-shadow"
          >
            {currentView.headline}
          </h4>

          {/* Telemetry metrics cards */}
          <div
            ref={metricsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/15"
          >
            <div className="showcase-metric-card p-3 rounded-lg bg-[#03180F]/80 backdrop-blur-md border border-[#C6A15B]/30 opacity-90">
              <span className="text-[9px] uppercase tracking-wider text-stone-400 font-mono block">Max Cruise Speed</span>
              <strong className="font-mono text-sm sm:text-base text-[#DFC07E] block mt-0.5">{currentView.telemetry.speed}</strong>
            </div>

            <div className="showcase-metric-card p-3 rounded-lg bg-[#03180F]/80 backdrop-blur-md border border-[#C6A15B]/30 opacity-90">
              <span className="text-[9px] uppercase tracking-wider text-stone-400 font-mono block">Intercontinental Range</span>
              <strong className="font-mono text-sm sm:text-base text-white block mt-0.5">{currentView.telemetry.range}</strong>
            </div>

            <div className="showcase-metric-card p-3 rounded-lg bg-[#03180F]/80 backdrop-blur-md border border-[#C6A15B]/30 opacity-90">
              <span className="text-[9px] uppercase tracking-wider text-stone-400 font-mono block">Service Ceiling</span>
              <strong className="font-mono text-sm sm:text-base text-[#DFC07E] block mt-0.5">{currentView.telemetry.ceiling}</strong>
            </div>

            <div className="showcase-metric-card p-3 rounded-lg bg-[#03180F]/80 backdrop-blur-md border border-[#C6A15B]/30 opacity-90">
              <span className="text-[9px] uppercase tracking-wider text-stone-400 font-mono block">Cabin Altitude Comfort</span>
              <strong className="font-mono text-xs sm:text-sm text-white block mt-0.5">{currentView.telemetry.cabinAlt}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Technical Guarantee */}
      <div className="px-6 py-4 bg-[#03180F] border-t border-[#C6A15B]/30 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-stone-300">
          <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
          <span>Every acquisition inspected with borescope engine audits and FAA/DGCA deregistration escrows.</span>
        </div>
        <span className="text-[#DFC07E] font-mono text-[11px] font-semibold">
          Click glowing markers on aircraft for engineering diagnostics
        </span>
      </div>

    </div>
  );
}
