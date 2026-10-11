'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  MapPin, 
  Calendar, 
  Users, 
  Plane, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  PlusCircle, 
  CheckCircle2, 
  Search, 
  Clock, 
  Tag
} from 'lucide-react';
import { submitOperatorEmptyLeg } from '@/lib/aircraftSales';

interface EmptyLegSector {
  id: string;
  flightName: string;
  aircraftModel: string;
  registration: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  date: string;
  departureTime: string;
  seatsAvailable: number;
  originalPriceINR: string;
  discountedPriceINR: string;
  discountPercentage: number;
  corridor: 'India Domestic' | 'Gulf & Middle East' | 'European Transits';
  aircraftClass: 'Heavy Jet' | 'Midsize Jet' | 'Super Turboprop' | 'Twin Helicopter';
  operator: string;
  aocRating: string;
  imageUrl: string;
}

const LIVE_EMPTY_LEGS: EmptyLegSector[] = [
  {
    id: 'EL-01',
    flightName: 'Hawker 900XP Coastal Repositioning',
    aircraftModel: 'Hawker 900XP Executive Jet',
    registration: 'VT-BNB',
    origin: 'New Delhi (Indira Gandhi IGI / GA Terminal)',
    originCode: 'DEL',
    destination: 'Goa (Manohar Mopa International Airport)',
    destinationCode: 'GOX',
    date: '2026-10-18',
    departureTime: '11:30 AM IST',
    seatsAvailable: 8,
    originalPriceINR: '₹7.5 Lakhs',
    discountedPriceINR: '₹3.1 Lakhs',
    discountPercentage: 58,
    corridor: 'India Domestic',
    aircraftClass: 'Midsize Jet',
    operator: 'DGCA Part 135 Scheduled Operator',
    aocRating: 'ARGUS Platinum · IS-BAO Stage 3',
    imageUrl: '/hawker_jet.jpg',
  },
  {
    id: 'EL-02',
    flightName: 'King Air B200 Deccan Corridor Ferry',
    aircraftModel: 'Beech Super King Air B200',
    registration: 'VT-RAS',
    origin: 'Mumbai (CSIA Kalina General Aviation)',
    originCode: 'BOM',
    destination: 'Hyderabad (Begumpet VIP Airside)',
    destinationCode: 'HYD',
    date: '2026-10-19',
    departureTime: '03:15 PM IST',
    seatsAvailable: 7,
    originalPriceINR: '₹4.8 Lakhs',
    discountedPriceINR: '₹1.8 Lakhs',
    discountPercentage: 62,
    corridor: 'India Domestic',
    aircraftClass: 'Super Turboprop',
    operator: 'Air Charter India DGCA Fleet',
    aocRating: 'DGCA NSOP Certified · 100% Safety Record',
    imageUrl: '/king_air.jpg',
  },
  {
    id: 'EL-03',
    flightName: 'Gulfstream G550 Trans-Arabian Ferry',
    aircraftModel: 'Gulfstream G550 Intercontinental',
    registration: 'N550ED',
    origin: 'Dubai (Al Maktoum DWC VIP Terminal)',
    originCode: 'DWC',
    destination: 'New Delhi (IGI General Aviation)',
    destinationCode: 'DEL',
    date: '2026-10-21',
    departureTime: '06:00 PM GST',
    seatsAvailable: 14,
    originalPriceINR: '₹28.5 Lakhs',
    discountedPriceINR: '₹12.0 Lakhs',
    discountPercentage: 58,
    corridor: 'Gulf & Middle East',
    aircraftClass: 'Heavy Jet',
    operator: 'Empire Aviation Group UAE',
    aocRating: 'GCAA UAE AOC · Wyvern Wingman Certified',
    imageUrl: '/g700_flagship.jpg',
  },
  {
    id: 'EL-04',
    flightName: 'Sikorsky S-76D Rotary Transit',
    aircraftModel: 'Sikorsky S-76D Twin-Turbine',
    registration: 'VT-BBN',
    origin: 'Bangalore (Kempegowda VIP Apron)',
    originCode: 'BLR',
    destination: 'Chennai (Madras International Airside)',
    destinationCode: 'MAA',
    date: '2026-10-22',
    departureTime: '09:00 AM IST',
    seatsAvailable: 8,
    originalPriceINR: '₹3.4 Lakhs',
    discountedPriceINR: '₹1.4 Lakhs',
    discountPercentage: 59,
    corridor: 'India Domestic',
    aircraftClass: 'Twin Helicopter',
    operator: 'Pawan Hans / Apex Rotary Charter',
    aocRating: 'DGCA Heavy Rotary Class 1',
    imageUrl: '/helicopter.jpg',
  },
  {
    id: 'EL-05',
    flightName: 'Challenger 605 Alpine Mediterranean Hop',
    aircraftModel: 'Bombardier Challenger 605',
    registration: 'M-CHAL',
    origin: 'Nice Côte d’Azur (Executive Terminal)',
    originCode: 'NCE',
    destination: 'Geneva Cointrin (VIP Business Aviation)',
    destinationCode: 'GVA',
    date: '2026-10-24',
    departureTime: '02:00 PM CET',
    seatsAvailable: 10,
    originalPriceINR: '₹11.2 Lakhs',
    discountedPriceINR: '₹4.5 Lakhs',
    discountPercentage: 60,
    corridor: 'European Transits',
    aircraftClass: 'Heavy Jet',
    operator: 'Swiss Executive Jet Fleet AG',
    aocRating: 'EASA Part-CAT AOC · IS-BAO Stage 3',
    imageUrl: '/jet_interior.jpg',
  },
  {
    id: 'EL-06',
    flightName: 'Falcon 2000LX Mumbai Return Ferry',
    aircraftModel: 'Dassault Falcon 2000LX',
    registration: 'A6-FAL',
    origin: 'Dubai (Dubai International OMDB)',
    originCode: 'DXB',
    destination: 'Mumbai (CSIA Kalina General Aviation)',
    destinationCode: 'BOM',
    date: '2026-10-26',
    departureTime: '08:30 PM GST',
    seatsAvailable: 10,
    originalPriceINR: '₹22.0 Lakhs',
    discountedPriceINR: '₹8.9 Lakhs',
    discountPercentage: 60,
    corridor: 'Gulf & Middle East',
    aircraftClass: 'Heavy Jet',
    operator: 'Royal Jet Abu Dhabi / Falcon Aviation',
    aocRating: 'GCAA Air Operator Certificate · EASA TCO',
    imageUrl: '/jet_interior.jpg',
  },
];

export default function BestDealsPage() {
  const [deals, setDeals] = useState<EmptyLegSector[]>(LIVE_EMPTY_LEGS);
  const [selectedCorridor, setSelectedCorridor] = useState<string>('All Corridors');
  const [selectedClass, setSelectedClass] = useState<string>('All Classes');
  const [searchQuery, setSearchQuery] = useState('');

  // Operator upload form
  const [operatorForm, setOperatorForm] = useState({
    flightName: '',
    aircraftModel: 'Hawker 900XP',
    registration: '',
    origin: '',
    destination: '',
    date: '2026-10-28',
    departureTime: '10:00 AM',
    seatsAvailable: 8,
    discountedPriceINR: '₹2.8 Lakhs',
    operatorName: '',
    contactPhone: '+91 ',
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const filteredDeals = useMemo(() => {
    let list = deals;

    if (selectedCorridor !== 'All Corridors') {
      list = list.filter((d) => d.corridor === selectedCorridor);
    }

    if (selectedClass !== 'All Classes') {
      list = list.filter((d) => d.aircraftClass === selectedClass);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) =>
          d.flightName.toLowerCase().includes(q) ||
          d.aircraftModel.toLowerCase().includes(q) ||
          d.registration.toLowerCase().includes(q) ||
          d.origin.toLowerCase().includes(q) ||
          d.destination.toLowerCase().includes(q)
      );
    }

    return list;
  }, [deals, selectedCorridor, selectedClass, searchQuery]);

  const handleBookDeal = (deal: EmptyLegSector) => {
    const text = encodeURIComponent(
      `⚡ *ROYENDISON BEST DEALS: EMPTY LEG RESERVATION*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Sector:* ${deal.flightName}\n` +
      `*Aircraft:* ${deal.aircraftModel} (${deal.registration})\n` +
      `*Route:* ${deal.origin} (${deal.originCode}) ➔ ${deal.destination} (${deal.destinationCode})\n` +
      `*Date & Time:* ${deal.date} · ${deal.departureTime}\n` +
      `*Seats Available:* ${deal.seatsAvailable} VIP Guests\n` +
      `*Preferential Rate:* ${deal.discountedPriceINR} (${deal.discountPercentage}% OFF regular charter)\n` +
      `*Operator AOC:* ${deal.operator}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Please confirm slot availability and lock this sector.`
    );
    window.open(`https://wa.me/917981994870?text=${text}`, '_blank');
  };

  const handleOperatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadLoading(true);

    try {
      await submitOperatorEmptyLeg({
        flightName: operatorForm.flightName || `${operatorForm.aircraftModel} Ferry Sector`,
        aircraftModel: operatorForm.aircraftModel,
        registration: operatorForm.registration || 'VT-XXX',
        origin: operatorForm.origin,
        destination: operatorForm.destination,
        date: operatorForm.date,
        departureTime: operatorForm.departureTime,
        seatsAvailable: Number(operatorForm.seatsAvailable),
        discountedPriceINR: operatorForm.discountedPriceINR,
        operatorName: operatorForm.operatorName || 'DGCA Registered Operator',
        contactPhone: operatorForm.contactPhone,
      });

      const newSector: EmptyLegSector = {
        id: `EL-${Date.now().toString().slice(-4)}`,
        flightName: operatorForm.flightName || `${operatorForm.aircraftModel} Ferry Sector`,
        aircraftModel: operatorForm.aircraftModel,
        registration: operatorForm.registration || 'VT-XXX',
        origin: operatorForm.origin,
        originCode: operatorForm.origin.slice(0, 3).toUpperCase(),
        destination: operatorForm.destination,
        destinationCode: operatorForm.destination.slice(0, 3).toUpperCase(),
        date: operatorForm.date,
        departureTime: operatorForm.departureTime,
        seatsAvailable: Number(operatorForm.seatsAvailable),
        originalPriceINR: 'Market Charter Rate',
        discountedPriceINR: operatorForm.discountedPriceINR,
        discountPercentage: 55,
        corridor: 'India Domestic',
        aircraftClass: 'Midsize Jet',
        operator: operatorForm.operatorName || 'Verified Operator',
        aocRating: 'Certified Part 135',
        imageUrl: '/hawker_jet.jpg',
      };

      setDeals([newSector, ...deals]);
      setUploadSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="bg-[#FAFBF8] text-[#0A1A12] min-h-screen pt-24 pb-20">
      
      {/* 1. HERO HEADER: LUXURY GREEN & CHAMPAGNE GOLD */}
      <section className="bg-[#041D12] text-[#FCFBF7] border-b border-[#C6A15B]/30 py-16 px-6 sm:px-10 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0A3A25] border border-[#C6A15B]/50 text-[#DFC07E] text-xs font-mono font-semibold tracking-wider uppercase">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Live Ferry & Repositioning Sectors · Preferential Rates</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FCFBF7] leading-tight">
                Best Deals & Empty Legs
              </h1>
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-light">
                Empty legs are verified aircraft repositioning flights without passengers. Lock full private jets and twin-turbine aircraft at up to <strong>65% savings</strong> compared to standard roundtrip charter costs.
              </p>
            </div>

            {/* Quick Stats / Concierge Button */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#operator-portal"
                className="px-4 py-3 rounded bg-[#0A3A25] hover:bg-[#02140B] border border-[#C6A15B] text-[#DFC07E] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>List a Ferry Sector</span>
              </a>

              <a
                href="https://wa.me/917981994870?text=Hello%20Royendison%20Concierge,%20I%20wish%20to%20inquire%20about%20live%20empty%20leg%20deals."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded bg-[#065E38] hover:bg-[#044B2D] border border-[#25D366]/50 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow"
              >
                <PhoneCall className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Desk (+91 7981994870)</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FILTER CONTROLS & SEARCH */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 mt-8 mb-8">
        <div className="bg-white border border-[#041D12]/15 rounded-xl p-5 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Corridor Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#041D12] mr-1">
              Corridor:
            </span>
            {['All Corridors', 'India Domestic', 'Gulf & Middle East', 'European Transits'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCorridor(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCorridor === c
                    ? 'bg-[#041D12] text-[#DFC07E] shadow'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city, airport, aircraft, or tail reg..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 focus:border-[#041D12] rounded-lg pl-9 pr-3 py-2 text-xs text-[#041D12] outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

        </div>
      </section>

      {/* 3. FLIGHT SECTOR DEALS GRID */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#041D12]">
              Live Repositioning Sectors
            </h2>
            <p className="text-xs text-stone-500 font-mono">
              Showing {filteredDeals.length} available empty legs · Ready for immediate passenger manifest confirmation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white border border-[#041D12]/15 hover:border-[#041D12] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image and Route Bar */}
                <div className="relative h-48 bg-stone-900 overflow-hidden">
                  <img
                    src={deal.imageUrl}
                    alt={deal.flightName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-[#041D12]/95 backdrop-blur-md border border-[#C6A15B] text-white font-mono text-xs font-bold shadow">
                      TAIL: {deal.registration}
                    </span>

                    <span className="px-2.5 py-1 rounded bg-amber-500/90 text-black text-xs font-mono font-bold uppercase shadow">
                      SAVE {deal.discountPercentage}%
                    </span>
                  </div>

                  {/* Bottom Route Title Overlay */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#DFC07E] block mb-0.5">
                      {deal.aircraftModel} · {deal.corridor}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#DFC07E] transition-colors">
                      {deal.flightName}
                    </h3>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-5 space-y-4">
                  
                  {/* Route & Airport Codes */}
                  <div className="p-3 bg-[#FAFBF8] border border-stone-200 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-sm font-bold text-[#041D12]">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#C6A15B]" />
                        <span className="font-mono text-base text-[#041D12]">{deal.originCode}</span>
                        <span className="text-stone-400 font-light truncate max-w-[150px] text-xs">
                          {deal.origin.split('(')[0]}
                        </span>
                      </div>

                      <div className="text-[#C6A15B] font-bold">➔</div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base text-[#041D12]">{deal.destinationCode}</span>
                        <span className="text-stone-400 font-light truncate max-w-[150px] text-xs">
                          {deal.destination.split('(')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Flight Date, Time & Passenger Capacity */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-stone-50 rounded border border-stone-100 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-stone-500" />
                      <div>
                        <span className="text-[9.5px] uppercase font-bold text-stone-400 block">Flight Date</span>
                        <strong className="text-xs text-[#041D12] font-mono block">{deal.date}</strong>
                      </div>
                    </div>

                    <div className="p-2.5 bg-stone-50 rounded border border-stone-100 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-stone-500" />
                      <div>
                        <span className="text-[9.5px] uppercase font-bold text-stone-400 block">Departure Window</span>
                        <strong className="text-xs text-[#041D12] font-mono block">{deal.departureTime}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Operator Credentials */}
                  <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-stone-700 font-medium">{deal.operator}</span>
                    </div>
                    <div className="flex items-center gap-1 text-stone-600 font-mono text-[11px]">
                      <Users className="w-3 h-3 text-stone-400" />
                      <span>Up to {deal.seatsAvailable} Seats</span>
                    </div>
                  </div>

                  {/* Pricing Comparison */}
                  <div className="p-3.5 bg-[#041D12] text-[#FCFBF7] rounded-lg border border-[#C6A15B]/30 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-wider text-stone-400 line-through block">
                        Standard Charter: {deal.originalPriceINR}
                      </span>
                      <span className="font-serif text-xl font-bold text-[#DFC07E]">
                        {deal.discountedPriceINR}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] uppercase font-mono tracking-wider text-emerald-400 font-bold block">
                        Confirmed Empty Leg
                      </span>
                      <span className="text-[10px] text-stone-300 font-light">
                        Full Aircraft Entire Cabin
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleBookDeal(deal)}
                  className="w-full py-2.5 rounded-lg bg-[#041D12] hover:bg-[#0A3A25] text-[#DFC07E] font-bold text-xs uppercase tracking-wider transition-all shadow"
                >
                  Reserve Sector
                </button>

                <a
                  href={`https://wa.me/917981994870?text=${encodeURIComponent(`Hello Royendison Concierge, I would like to reserve Empty Leg *${deal.flightName}* (${deal.originCode} to ${deal.destinationCode}) on ${deal.date} for ${deal.discountedPriceINR}.`)}`}
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

        {filteredDeals.length === 0 && (
          <div className="text-center py-16 bg-white border border-dashed border-stone-300 rounded-xl space-y-3">
            <p className="text-stone-500 text-sm">
              No empty legs currently found matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCorridor('All Corridors');
              }}
              className="px-4 py-2 rounded bg-[#041D12] text-[#DFC07E] text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. OPERATOR INTAKE PORTAL SECTION (AT BOTTOM) */}
      <section id="operator-portal" className="max-w-[1440px] mx-auto px-6 sm:px-10 mt-16">
        <div className="bg-[#041D12] text-[#FCFBF7] border border-[#C6A15B]/40 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-[#C6A15B]">
              AOC Charter Fleet Distribution
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Aircraft Operator Portal: List Your Upcoming Ferry Flights
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              Are you a DGCA or International Part 135 charter operator with an upcoming empty leg or repositioning flight? Post your sector here to connect directly with pre-verified high-net-worth travelers and monetize empty airframe hours.
            </p>
          </div>

          {!uploadSuccess ? (
            <form onSubmit={handleOperatorSubmit} className="space-y-4 text-xs max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                    Flight Sector Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Challenger 605 Coastal Reposition"
                    value={operatorForm.flightName}
                    onChange={(e) => setOperatorForm({ ...operatorForm, flightName: e.target.value })}
                    className="w-full bg-[#02140B] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                    Aircraft Make & Model *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hawker 900XP / King Air B200"
                    value={operatorForm.aircraftModel}
                    onChange={(e) => setOperatorForm({ ...operatorForm, aircraftModel: e.target.value })}
                    className="w-full bg-[#02140B] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                    Origin Airport (City / ICAO) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai (BOM) / VABB"
                    value={operatorForm.origin}
                    onChange={(e) => setOperatorForm({ ...operatorForm, origin: e.target.value })}
                    className="w-full bg-[#02140B] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                    Destination Airport *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Goa Mopa (GOX)"
                    value={operatorForm.destination}
                    onChange={(e) => setOperatorForm({ ...operatorForm, destination: e.target.value })}
                    className="w-full bg-[#02140B] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                    Tail Registration No. *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VT-RAX / N-500"
                    value={operatorForm.registration}
                    onChange={(e) => setOperatorForm({ ...operatorForm, registration: e.target.value })}
                    className="w-full bg-[#02140B] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                    Available Flight Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={operatorForm.date}
                    onChange={(e) => setOperatorForm({ ...operatorForm, date: e.target.value })}
                    className="w-full bg-[#02140B] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                    Discounted Price (INR) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹2.8 Lakhs"
                    value={operatorForm.discountedPriceINR}
                    onChange={(e) => setOperatorForm({ ...operatorForm, discountedPriceINR: e.target.value })}
                    className="w-full bg-[#02140B] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-[#DFC07E] font-bold outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                    Operator WhatsApp / Phone *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98..."
                    value={operatorForm.contactPhone}
                    onChange={(e) => setOperatorForm({ ...operatorForm, contactPhone: e.target.value })}
                    className="w-full bg-[#02140B] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-stone-400 text-[10px]">
                  <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                  <span>Direct sync with Supabase and verified operator escrow</span>
                </div>

                <button
                  type="submit"
                  disabled={uploadLoading}
                  className="px-6 py-2.5 rounded bg-gradient-to-r from-[#C6A15B] to-[#DFC07E] text-[#041D12] font-bold text-xs uppercase tracking-widest transition-all shadow-lg disabled:opacity-50"
                >
                  {uploadLoading ? 'Publishing...' : 'Publish Ferry Flight Sector'}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6 bg-[#02140B] border border-emerald-500/40 rounded-xl max-w-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Sector Successfully Published to Best Deals Desk</span>
              </div>
              <p className="text-xs text-stone-300">
                Your flight from <strong className="text-white">{operatorForm.origin}</strong> to <strong className="text-white">{operatorForm.destination}</strong> is now live.
              </p>
              <button
                onClick={() => setUploadSuccess(false)}
                className="px-4 py-2 rounded bg-[#0A3A25] text-[#DFC07E] text-xs font-semibold"
              >
                List Another Sector
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
