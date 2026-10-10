'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  Search,
  Filter,
  CheckCircle2,
  PlusCircle,
  Building2,
  Tag,
  Gauge,
  MapPin,
  Calendar,
  Lock,
  Layers,
  FileText
} from 'lucide-react';
import CinematicAircraftShowcase from '@/components/aviation/CinematicAircraftShowcase';
import SellAircraftModal from '@/components/modals/SellAircraftModal';
import { getSalesInventory, SalesAircraftListing } from '@/lib/aircraftSales';

export default function AviationSalesPage() {
  const [inventory, setInventory] = useState<SalesAircraftListing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [selectedListingForInquiry, setSelectedListingForInquiry] = useState<SalesAircraftListing | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // Inquiry form state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('+91 ');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  useEffect(() => {
    setInventory(getSalesInventory());

    const handleCustomAdded = () => {
      setInventory(getSalesInventory());
    };
    window.addEventListener('royendison_sales_added', handleCustomAdded);
    return () => window.removeEventListener('royendison_sales_added', handleCustomAdded);
  }, []);

  const categories = [
    'All',
    'Ultra Long Range',
    'Heavy Jet',
    'Super Midsize',
    'Midsize',
    'Turboprop',
    'VIP Helicopter'
  ];

  const filteredInventory = useMemo(() => {
    let list = inventory;

    if (selectedCategory !== 'All') {
      list = list.filter(item => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.registrationNumber.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q) ||
        item.ownerNameOrType.toLowerCase().includes(q)
      );
    }

    return list;
  }, [inventory, selectedCategory, searchQuery]);

  const handleOpenInquiry = (aircraft: SalesAircraftListing) => {
    setSelectedListingForInquiry(aircraft);
    setInquirySubmitted(false);
    setInquiryModalOpen(true);
  };

  const handleDispatchInquiryWhatsApp = () => {
    if (!selectedListingForInquiry) return;
    const text = encodeURIComponent(
      `👑 *ROYENDISON PRIVATE ACQUISITION INQUIRY*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Aircraft:* ${selectedListingForInquiry.name}\n` +
      `*Tail Registration:* ${selectedListingForInquiry.registrationNumber}\n` +
      `*Country:* ${selectedListingForInquiry.countryFlag} ${selectedListingForInquiry.country}\n` +
      `*Owner Registry:* ${selectedListingForInquiry.ownerNameOrType}\n` +
      `*Asking Price:* $${(selectedListingForInquiry.quotedPriceUSD / 1e6).toFixed(1)}M (${selectedListingForInquiry.quotedPriceINR})\n` +
      `*Total Time Hours:* ${selectedListingForInquiry.totalTimeHours} TTAF\n` +
      `*Engine Program:* ${selectedListingForInquiry.engineProgram}\n` +
      `*Inquiring Principal:* ${inquiryName || 'Verified Buyer'}\n` +
      `*Phone:* ${inquiryPhone}\n` +
      `*Email:* ${inquiryEmail}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Please provide the technical spec sheet, logbook audit, and LOI escrow terms.`
    );
    window.open(`https://wa.me/917981994870?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#FAFBF8] text-[#0A1A12] min-h-screen pt-24 pb-20">
      
      {/* 1. HERO HEADER: LUXURY GREEN & CHAMPAGNE GOLD */}
      <section className="bg-[#062B1B] text-[#FCFBF7] border-b border-[#C6A15B]/40 py-16 px-4 sm:px-8 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0A3A25] border border-[#C6A15B]/50 text-[#DFC07E] text-xs font-mono font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Royendison Private Aviation Acquisitions & Sales Desk</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FCFBF7] leading-tight">
                Private Aircraft Sales
              </h1>
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-light">
                Off-market corporate jet and turbine aircraft transactions. Each listing displays official <strong>Tail Registration Numbers</strong>, <strong>Country of Base</strong>, <strong>Owner / Registry Status</strong>, and <strong>Airframe Total Time</strong> backed by audited logbooks and sovereign escrow protection.
              </p>
            </div>

            {/* Header Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setSellModalOpen(true)}
                className="px-5 py-3 rounded-lg bg-[#C6A15B] hover:bg-[#DFC07E] text-[#061C14] text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center gap-2 hover:-translate-y-0.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Sell Your Aircraft</span>
              </button>

              <a
                href="https://wa.me/917981994870?text=Hello%20Royendison%20Acquisitions,%20I%20wish%20to%20inquire%20about%20purchasing%20or%20selling%20a%20private%20aircraft."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-lg bg-[#065E38] hover:bg-[#044B2D] border border-[#25D366]/60 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow"
              >
                <PhoneCall className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Concierge (+91 7981994870)</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CINEMATIC PRODUCT STORYTELLING (GSAP + SCROLLTRIGGER REPLACING THREE.JS) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 -mt-6 mb-12">
        <CinematicAircraftShowcase />
      </section>

      {/* 3. INVENTORY FILTER BAR */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 mb-8">
        <div className="bg-white border border-[#062B1B]/15 rounded-xl p-5 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#062B1B] mr-1">
              Filter By:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#062B1B] text-[#DFC07E] shadow'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search by Model or Reg */}
          <div className="relative min-w-[300px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Model, Reg (e.g. VT-BMR, N700ED), Country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 focus:border-[#062B1B] rounded-lg pl-9 pr-3 py-2 text-xs text-[#062B1B] outline-none"
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

      {/* 4. PRIVATE SALES INVENTORY GRID */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#062B1B]">
              Verified Acquisition Inventory
            </h2>
            <p className="text-xs text-stone-500 font-mono">
              Showing {filteredInventory.length} off-market private aircraft with active logbook verification
            </p>
          </div>

          <button
            onClick={() => setSellModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#062B1B] hover:text-[#C6A15B] transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-[#C6A15B]" />
            <span>List an Aircraft For Private Sale</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInventory.map((aircraft) => (
            <div
              key={aircraft.id}
              className="bg-white border border-[#062B1B]/15 hover:border-[#062B1B] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Registration Badge Header */}
                <div className="relative h-56 bg-stone-900 overflow-hidden">
                  <img
                    src={aircraft.imageUrl}
                    alt={aircraft.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Tail Reg Badge & Status */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-[#062B1B]/95 backdrop-blur-md border border-[#C6A15B] text-white font-mono text-xs font-bold shadow-md">
                      REG: {aircraft.registrationNumber}
                    </span>

                    <span className="px-2 py-0.5 rounded bg-[#03180F]/90 backdrop-blur-md border border-white/20 text-[#DFC07E] text-[10px] font-mono font-semibold uppercase">
                      {aircraft.status}
                    </span>
                  </div>

                  {/* Country & Owner info overlay */}
                  <div className="absolute bottom-3 left-3 right-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-[#DFC07E] font-medium">
                      <span>{aircraft.countryFlag}</span>
                      <span>{aircraft.country}</span>
                      <span>·</span>
                      <span className="truncate">{aircraft.baseAirport}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#DFC07E] transition-colors">
                      {aircraft.name}
                    </h3>
                  </div>
                </div>

                {/* Specs & Pricing Details */}
                <div className="p-5 space-y-4">
                  {/* Owner & Registry Status Row */}
                  <div className="p-2.5 bg-[#FAFBF8] border border-stone-200 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between text-stone-500 text-[10px] uppercase font-bold tracking-wider">
                      <span>Owner / Registry Status:</span>
                      <span className="text-emerald-700 font-semibold font-mono">Verified Title</span>
                    </div>
                    <div className="font-medium text-[#062B1B] text-[11.5px]">
                      {aircraft.ownerNameOrType}
                    </div>
                  </div>

                  {/* Airframe & Engines specs */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2 bg-stone-50 rounded border border-stone-100">
                      <span className="text-[9.5px] uppercase font-bold text-stone-400 block">Airframe Hours</span>
                      <strong className="text-xs text-[#062B1B] font-mono block mt-0.5">
                        {aircraft.totalTimeHours} TTAF (Yr {aircraft.year})
                      </strong>
                    </div>

                    <div className="p-2 bg-stone-50 rounded border border-stone-100">
                      <span className="text-[9.5px] uppercase font-bold text-stone-400 block">Cabin Seating</span>
                      <strong className="text-xs text-[#062B1B] font-mono block mt-0.5">
                        {aircraft.seatingCapacity} VIP Passengers
                      </strong>
                    </div>
                  </div>

                  {/* Engine Program */}
                  <div>
                    <span className="text-[9.5px] uppercase font-bold text-stone-400 block">
                      Engine & APU Maintenance Program:
                    </span>
                    <span className="text-xs font-semibold text-[#062B1B] block mt-0.5 truncate">
                      {aircraft.engineProgram}
                    </span>
                  </div>

                  {/* Quoted Asking Price */}
                  <div className="p-3 bg-[#062B1B] text-[#FCFBF7] rounded-lg border border-[#C6A15B]/30 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-wider text-[#C6A15B] block">
                        Quoted Asking Price
                      </span>
                      <span className="font-serif text-lg font-bold text-[#DFC07E]">
                        {aircraft.quotedPriceINR}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase font-mono tracking-wider text-stone-400 block">
                        USD Valuation
                      </span>
                      <span className="font-mono text-xs font-bold text-white">
                        ${(aircraft.quotedPriceUSD / 1e6).toFixed(1)} Million
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenInquiry(aircraft)}
                  className="w-full py-2.5 rounded-lg bg-[#062B1B] hover:bg-[#0A3A25] text-[#DFC07E] font-bold text-xs uppercase tracking-wider transition-all shadow"
                >
                  Acquisition Escrow
                </button>

                <a
                  href={`https://wa.me/917981994870?text=${encodeURIComponent(`Hello Royendison Concierge, I would like to inquire about purchasing the *${aircraft.name}* (Reg: ${aircraft.registrationNumber}, Asking: $${(aircraft.quotedPriceUSD / 1e6).toFixed(1)}M / ${aircraft.quotedPriceINR}).`)}`}
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

        {filteredInventory.length === 0 && (
          <div className="text-center py-16 bg-white border border-dashed border-stone-300 rounded-xl space-y-3">
            <p className="text-stone-500 text-sm">
              No aircraft found matching &quot;{searchQuery}&quot; under &quot;{selectedCategory}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded bg-[#062B1B] text-[#DFC07E] text-xs font-bold uppercase tracking-wider"
            >
              Show All Available Aircraft
            </button>
          </div>
        )}
      </section>

      {/* 5. DEDICATED "SELL YOUR AIRCRAFT" BOTTOM ATELIER BANNER */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 mt-16">
        <div className="bg-[#062B1B] text-[#FCFBF7] border border-[#C6A15B]/50 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs uppercase font-mono tracking-widest text-[#C6A15B]">
                Exclusive Sovereign Listing Service
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Looking to Sell Your Private Jet or Helicopter?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                Position your aircraft directly before pre-vetted corporate principals, private family offices, and sovereign flight departments across India, the UAE, the UK, and Europe. Backed by guaranteed escrow and discreet off-market transactions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => setSellModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#C6A15B] hover:bg-[#DFC07E] text-[#061C14] font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>List Your Aircraft For Sale</span>
              </button>

              <a
                href="https://wa.me/917981994870?text=Hello%20Royendison%20Escrow,%20I%20have%20an%20aircraft%20available%20for%20sale%20and%20wish%20to%20list%20it%20discreetly."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#065E38] hover:bg-[#044B2D] border border-[#25D366]/60 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <PhoneCall className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Broker Desk (+91 7981994870)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MODALS */}
      <SellAircraftModal
        isOpen={sellModalOpen}
        onClose={() => setSellModalOpen(false)}
        onSuccess={() => setInventory(getSalesInventory())}
      />

      {/* Acquisition Inquiry Modal */}
      <AnimatePresence>
        {inquiryModalOpen && selectedListingForInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#062B1B] text-[#FCFBF7] border border-[#C6A15B]/50 rounded-xl shadow-2xl p-6 sm:p-8 my-8"
            >
              <button
                onClick={() => setInquiryModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#03180F] border border-[#C6A15B]/30 hover:border-[#C6A15B] text-stone-300 hover:text-white transition-colors"
              >
                ✕
              </button>

              {!inquirySubmitted ? (
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-1">
                    Acquisition Escrow & Logbook Request
                  </h3>
                  <p className="text-xs text-[#C6A15B] font-mono uppercase tracking-wider mb-4">
                    Aircraft: {selectedListingForInquiry.name} (Reg: {selectedListingForInquiry.registrationNumber})
                  </p>

                  <div className="p-3 bg-[#03180F] border border-[#C6A15B]/30 rounded-lg mb-5 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Asking Price:</span>
                      <span className="font-serif font-bold text-[#DFC07E]">
                        {selectedListingForInquiry.quotedPriceINR} (${(selectedListingForInquiry.quotedPriceUSD / 1e6).toFixed(1)}M)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Owner Registry:</span>
                      <span className="text-white font-medium">{selectedListingForInquiry.ownerNameOrType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Base Airport / Flag:</span>
                      <span className="text-white font-medium">{selectedListingForInquiry.countryFlag} {selectedListingForInquiry.country}</span>
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setInquirySubmitted(true);
                    }}
                    className="space-y-3.5 text-xs"
                  >
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                        Principal Buyer / Family Office Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Singhania Family Office"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="+91 98..."
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                          Official Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="office@familyoffice.com"
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-stone-400 text-[10px]">
                        <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                        <span>Protected by strict bilateral NDA</span>
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded bg-[#C6A15B] hover:bg-[#DFC07E] text-[#061C14] font-bold text-xs uppercase tracking-widest transition-all shadow"
                      >
                        Request Due Diligence Package
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#065E38] border-2 border-[#25D366] mx-auto flex items-center justify-center text-white shadow-xl">
                    <CheckCircle2 className="w-8 h-8 text-[#25D366]" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-white">
                    Acquisition Requisition Registered
                  </h4>
                  <p className="text-xs text-stone-300 max-w-sm mx-auto">
                    Your request for <strong className="text-[#DFC07E]">{selectedListingForInquiry.name}</strong> (Reg: {selectedListingForInquiry.registrationNumber}) has been assigned to our Senior Aircraft Escrow Desk.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={handleDispatchInquiryWhatsApp}
                      className="w-full px-5 py-2.5 rounded bg-[#065E38] hover:bg-[#044B2D] border border-[#25D366]/60 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow"
                    >
                      <PhoneCall className="w-4 h-4 text-[#25D366]" />
                      <span>Dispatch Spec Sheet Request to WhatsApp (+91 7981994870)</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
