'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  Zap, 
  Search,
  Filter,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { 
  LIGHT_AIRCRAFT_LIST, 
  MIDSIZE_AIRCRAFT_LIST, 
  LARGE_AIRCRAFT_LIST, 
  HELICOPTERS_LIST,
  HELICOPTER_EVENTS,
  AIRCRAFT_EVENTS,
  FleetAircraft,
} from '@/lib/aviationData';
import CharterQuoteModal from '@/components/modals/CharterQuoteModal';
import Link from 'next/link';

export default function ChartersPage() {
  // Main switchable mode: Aircraft vs Helicopter
  const [mainMode, setMainMode] = useState<'aircraft' | 'helicopter'>('aircraft');

  // Subcategory filters
  const [aircraftSubCat, setAircraftSubCat] = useState<'all' | 'light' | 'midsize' | 'large'>('all');
  const [helicopterSubCat, setHelicopterSubCat] = useState<'all' | 'twin' | 'single'>('all');

  // Mission event purpose filter
  const [selectedMission, setSelectedMission] = useState<string>('all');

  // Live search query
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedAssetForQuote, setSelectedAssetForQuote] = useState<FleetAircraft | null>(null);

  // Filtered aircraft list
  const filteredFleet = useMemo(() => {
    let list: FleetAircraft[] = [];

    if (mainMode === 'aircraft') {
      if (aircraftSubCat === 'light') list = LIGHT_AIRCRAFT_LIST;
      else if (aircraftSubCat === 'midsize') list = MIDSIZE_AIRCRAFT_LIST;
      else if (aircraftSubCat === 'large') list = LARGE_AIRCRAFT_LIST;
      else list = [...LIGHT_AIRCRAFT_LIST, ...MIDSIZE_AIRCRAFT_LIST, ...LARGE_AIRCRAFT_LIST];
    } else {
      if (helicopterSubCat === 'twin') {
        list = HELICOPTERS_LIST.filter(h => h.subCategory === 'Twin Engine');
      } else if (helicopterSubCat === 'single') {
        list = HELICOPTERS_LIST.filter(h => h.subCategory === 'Single Engine');
      } else {
        list = HELICOPTERS_LIST;
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.idealFor.some(tag => tag.toLowerCase().includes(q)) ||
        (item.subCategory && item.subCategory.toLowerCase().includes(q))
      );
    }

    // Filter by selected mission purpose
    if (selectedMission !== 'all') {
      const missionKeyword = selectedMission.toLowerCase().slice(0, 7);
      list = list.filter(item =>
        item.idealFor.some(tag => tag.toLowerCase().includes(missionKeyword))
      );
    }

    return list;
  }, [mainMode, aircraftSubCat, helicopterSubCat, searchQuery, selectedMission]);

  const handleOpenQuote = (asset?: FleetAircraft) => {
    setSelectedAssetForQuote(asset || null);
    setQuoteModalOpen(true);
  };

  const currentEventList = mainMode === 'helicopter' ? HELICOPTER_EVENTS : AIRCRAFT_EVENTS;

  return (
    <div className="bg-[#FAFBF8] text-[#0A1A12] min-h-screen pt-24 pb-20">
      
      {/* 1. HERO HEADER: LUXURY GREEN & CHAMPAGNE GOLD */}
      <section className="bg-[#041D12] text-[#FCFBF7] border-b border-[#C6A15B]/30 py-16 px-6 sm:px-10 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0A3A25] border border-[#C6A15B]/50 text-[#DFC07E] text-xs font-mono font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Royendison VIP Air Charter & Mission Desk</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FCFBF7] leading-tight">
                Global Charter Desk
              </h1>
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-light">
                Direct dispatch for sovereigns, corporate boards, and private family offices. Complete fleet of <strong>81 private jets</strong> and <strong>40 VIP helicopters</strong> equipped for wedding grand arrivals, floral rain, political campaigns, and urgent transcontinental hops.
              </p>
            </div>

            {/* Quick Header Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/deals"
                className="px-4 py-3 rounded bg-[#0A3A25] hover:bg-[#02140B] border border-[#C6A15B] text-[#DFC07E] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Best Deals & Empty Legs</span>
              </Link>

              <button
                onClick={() => handleOpenQuote()}
                className="px-5 py-3 rounded bg-gradient-to-r from-[#C6A15B] to-[#DFC07E] hover:from-[#DFC07E] hover:to-[#C6A15B] text-[#041D12] text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:-translate-y-0.5"
              >
                Request Custom Flight Quote
              </button>
            </div>
          </div>

          {/* 2. REGAL MODE SWITCHER: FIXED-WING JETS vs VIP ROTARY HELICOPTERS */}
          <div className="max-w-2xl mx-auto bg-[#02140B] p-2 rounded-xl border border-[#C6A15B]/40 grid grid-cols-2 gap-2 shadow-2xl">
            <button
              onClick={() => {
                setMainMode('aircraft');
                setSelectedMission('all');
              }}
              className={`py-3.5 px-4 rounded-lg font-serif text-sm sm:text-base font-bold transition-all flex items-center justify-center gap-3 ${
                mainMode === 'aircraft'
                  ? 'bg-[#0A3A25] text-[#DFC07E] border border-[#C6A15B] shadow-lg'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Plane className={`w-5 h-5 ${mainMode === 'aircraft' ? 'text-[#C6A15B]' : 'text-stone-400'}`} />
              <span>Private Jets & Aircraft ({LIGHT_AIRCRAFT_LIST.length + MIDSIZE_AIRCRAFT_LIST.length + LARGE_AIRCRAFT_LIST.length})</span>
            </button>

            <button
              onClick={() => {
                setMainMode('helicopter');
                setSelectedMission('all');
              }}
              className={`py-3.5 px-4 rounded-lg font-serif text-sm sm:text-base font-bold transition-all flex items-center justify-center gap-3 ${
                mainMode === 'helicopter'
                  ? 'bg-[#0A3A25] text-[#DFC07E] border border-[#C6A15B] shadow-lg'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <svg viewBox="0 0 24 24" className={`w-5 h-5 fill-current ${mainMode === 'helicopter' ? 'text-[#C6A15B]' : 'text-stone-400'}`}>
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H14.8C14.4 14.2 13.3 15 12 15C10.7 15 9.6 14.2 9.2 13H4V11H9.2C9.6 9.8 10.7 9 12 9C13.3 9 14.4 9.8 14.8 11H17V8H19V16H17V13Z"/>
              </svg>
              <span>VIP Helicopters ({HELICOPTERS_LIST.length})</span>
            </button>
          </div>

        </div>
      </section>

      {/* 3. REFINED LUXURY CONTROLS (NO UGLY OVERLAP, GENEROUS SPACING) */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 py-8">
        <div className="bg-white border border-[#041D12]/15 rounded-xl p-6 shadow-lg space-y-6">
          
          {/* Top Row: Categories + Search Input */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Segmented Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#041D12] mr-2">
                Class Category:
              </span>

              {mainMode === 'aircraft' ? (
                <>
                  <button
                    onClick={() => setAircraftSubCat('all')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      aircraftSubCat === 'all'
                        ? 'bg-[#041D12] text-[#DFC07E] shadow'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    All Aircraft (81)
                  </button>
                  <button
                    onClick={() => setAircraftSubCat('light')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      aircraftSubCat === 'light'
                        ? 'bg-[#041D12] text-[#DFC07E] shadow'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Light & Lightweight (37)
                  </button>
                  <button
                    onClick={() => setAircraftSubCat('midsize')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      aircraftSubCat === 'midsize'
                        ? 'bg-[#041D12] text-[#DFC07E] shadow'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Midsize Jets (23)
                  </button>
                  <button
                    onClick={() => setAircraftSubCat('large')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      aircraftSubCat === 'large'
                        ? 'bg-[#041D12] text-[#DFC07E] shadow'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Large & Heavy Jets (21)
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setHelicopterSubCat('all')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      helicopterSubCat === 'all'
                        ? 'bg-[#041D12] text-[#DFC07E] shadow'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    All Rotary (40)
                  </button>
                  <button
                    onClick={() => setHelicopterSubCat('twin')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      helicopterSubCat === 'twin'
                        ? 'bg-[#041D12] text-[#DFC07E] shadow'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Twin Engine Helicopters (27)
                  </button>
                  <button
                    onClick={() => setHelicopterSubCat('single')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      helicopterSubCat === 'single'
                        ? 'bg-[#041D12] text-[#DFC07E] shadow'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Single Engine Helicopters (13)
                  </button>
                </>
              )}
            </div>

            {/* Instant Search Bar */}
            <div className="relative min-w-[300px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={mainMode === 'aircraft' ? "Search e.g. King Air, Falcon, Hawker, Global..." : "Search e.g. Bell 429, Agusta, EC135, Dhruv..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-[#041D12] rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#041D12] outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Mission Purpose Dropdown Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-stone-100">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#041D12]">
                {mainMode === 'helicopter' ? 'Rotary Mission Purpose:' : 'Aviation Mission Purpose:'}
              </span>
              <div className="relative">
                <select
                  value={selectedMission}
                  onChange={(e) => setSelectedMission(e.target.value)}
                  className="appearance-none bg-stone-50 border border-stone-300 focus:border-[#041D12] rounded-lg pl-3 pr-8 py-2 text-xs font-medium text-[#041D12] outline-none cursor-pointer"
                >
                  <option value="all">Show All Fleet Applications</option>
                  {currentEventList.map((evt) => (
                    <option key={evt} value={evt}>
                      {evt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="text-xs text-stone-500 font-mono">
              Displaying <strong className="text-[#041D12]">{filteredFleet.length}</strong> matching models
            </div>
          </div>

        </div>
      </section>

      {/* 4. FLEET GRID SHOWCASE */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10">
        
        {/* Count and state indicator */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#041D12]">
              {mainMode === 'aircraft' ? 'Fixed-Wing Private Jet Fleet' : 'VIP Rotary & Helicopter Fleet'}
            </h2>
            <p className="text-xs text-stone-500 font-mono">
              All aircraft operated under valid DGCA / EASA / FAA Air Operator Certificates (AOC)
            </p>
          </div>

          <button
            onClick={() => handleOpenQuote()}
            className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#041D12] hover:text-[#C6A15B] transition-colors"
          >
            <span>Request Bespoke Dispatch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFleet.map((aircraft) => (
            <div
              key={aircraft.id}
              className="bg-white border border-[#041D12]/15 hover:border-[#041D12] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Header Tag */}
                <div className="relative h-48 bg-stone-900 overflow-hidden">
                  <img
                    src={aircraft.imageUrl}
                    alt={aircraft.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-[#041D12]/95 backdrop-blur-md border border-[#C6A15B] text-[#DFC07E] text-[10px] font-mono font-bold uppercase tracking-wider">
                      {aircraft.subCategory || `${aircraft.category.toUpperCase()} CLASS`}
                    </span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#DFC07E] transition-colors">
                      {aircraft.name}
                    </h3>
                  </div>
                </div>

                {/* Specs Row */}
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-stone-100 text-center">
                    <div>
                      <span className="text-[9.5px] uppercase font-bold text-stone-400 block">Seating</span>
                      <strong className="text-xs text-[#041D12] font-mono">{aircraft.seating}</strong>
                    </div>
                    <div>
                      <span className="text-[9.5px] uppercase font-bold text-stone-400 block">Speed</span>
                      <strong className="text-xs text-[#041D12] font-mono">{aircraft.speed}</strong>
                    </div>
                    <div>
                      <span className="text-[9.5px] uppercase font-bold text-stone-400 block">Range</span>
                      <strong className="text-xs text-[#041D12] font-mono">{aircraft.range}</strong>
                    </div>
                  </div>

                  {/* Ideal For / Mission Events */}
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-1.5">
                      Recommended Applications:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {aircraft.idealFor.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10.5px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenQuote(aircraft)}
                  className="w-full py-2.5 rounded-lg bg-[#041D12] hover:bg-[#0A3A25] text-[#DFC07E] font-bold text-xs uppercase tracking-wider transition-all shadow"
                >
                  Request Quote
                </button>

                <a
                  href={`https://wa.me/917981994870?text=${encodeURIComponent(`Hello Royendison Concierge, I wish to book or request a quote for the *${aircraft.name}* (${aircraft.seating}, ${aircraft.subCategory || aircraft.category}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-[#065E38] hover:bg-[#044B2D] border border-[#25D366]/50 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredFleet.length === 0 && (
          <div className="text-center py-16 bg-white border border-dashed border-stone-300 rounded-xl space-y-3">
            <p className="text-stone-500 text-sm">
              No aircraft found matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMission('all');
                setAircraftSubCat('all');
                setHelicopterSubCat('all');
              }}
              className="px-4 py-2 rounded bg-[#041D12] text-[#DFC07E] text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Quote Modal */}
      <CharterQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        selectedAsset={selectedAssetForQuote}
        defaultMode={mainMode}
      />
    </div>
  );
}
