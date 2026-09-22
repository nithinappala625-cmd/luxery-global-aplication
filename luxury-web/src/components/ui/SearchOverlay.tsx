'use client';

import { useState } from 'react';
import { Search, X, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVertical, setSelectedVertical] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [accessLevel, setAccessLevel] = useState('All');

  if (!isOpen) return null;

  const verticals = [
    'Private Aviation',
    'Marine',
    'Automotive',
    'Jewellery & Horology',
    'Real Estate',
    'Art & Collectibles',
    'Travel & Experiences',
    'Private Opportunities',
  ];

  const quickPicks = [
    { title: 'Gulfstream G700', vertical: 'Private Aviation', location: 'Geneva', price: 'POA' },
    { title: '2021 Fairline Targa 65 GTO', vertical: 'Marine', location: 'Cannes', price: '€2,600,000' },
    { title: 'Emerald Sanctuary Sovereign Atoll', vertical: 'Real Estate', location: 'Maldives', price: '$32,000,000' },
    { title: 'Patek Philippe Ref 5270P Salmon Dial', vertical: 'Jewellery & Horology', location: 'Switzerland', price: 'Private Sale' },
    { title: 'Ferrari SF90 Stradale Assetto Fiorano', vertical: 'Automotive', location: 'Monaco', price: 'Private Acquisition' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 bg-[#080B09]/90 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#FCFBF7] border border-[#D8D3C8] shadow-2xl p-8 sm:p-12 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Gold line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C6A15B]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#7A8F83] hover:text-[#080B09] transition-colors"
          aria-label="Close discovery interface"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <span className="label-micro text-[#C6A15B] block mb-2">
            Institutional Discovery Engine
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#061C16] font-light">
            What are you looking for?
          </h2>
        </div>

        {/* Search Input Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9D7B3E]" />
          <input
            type="text"
            autoFocus
            placeholder="Search by vessel, aircraft model, dial reference, sovereign territory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-[#D8D3C8] text-sm text-[#080B09] focus:outline-none focus:border-[#061C16] shadow-sm font-serif"
          />
        </div>

        {/* Vertical Chips */}
        <div className="mb-8">
          <span className="label-micro text-[#7A8F83] block mb-2.5">
            Select Domain
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedVertical('All')}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold transition-all ${
                selectedVertical === 'All'
                  ? 'bg-[#061C16] text-[#F6F3EA]'
                  : 'bg-white border border-[#D8D3C8] text-[#4A5E53] hover:border-[#061C16]'
              }`}
            >
              All Domains
            </button>
            {verticals.map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVertical(v)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold transition-all ${
                  selectedVertical === v
                    ? 'bg-[#061C16] text-[#F6F3EA]'
                    : 'bg-white border border-[#D8D3C8] text-[#4A5E53] hover:border-[#061C16]'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Multi-parameter Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8 mb-8 border-b border-[#D8D3C8]/60 text-xs">
          <div>
            <label className="label-micro text-[#7A8F83] block mb-1.5">Availability</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#D8D3C8] text-xs text-[#080B09] focus:outline-none focus:border-[#061C16]"
            >
              <option>All Listings</option>
              <option>Private Sale (Immediate Delivery)</option>
              <option>Private Acquisition Mandate</option>
              <option>Charter / Sovereign Lease</option>
              <option>Private Tender / Auction Lot</option>
            </select>
          </div>

          <div>
            <label className="label-micro text-[#7A8F83] block mb-1.5">Access Tier</label>
            <select
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#D8D3C8] text-xs text-[#080B09] focus:outline-none focus:border-[#061C16]"
            >
              <option>All Tiers</option>
              <option>Public Curated Directory</option>
              <option>Confidential / Off-Market</option>
              <option>Invitation-Only Sovereign Tenders</option>
            </select>
          </div>

          <div>
            <label className="label-micro text-[#7A8F83] block mb-1.5">Jurisdiction / Location</label>
            <select className="w-full px-3 py-2 bg-white border border-[#D8D3C8] text-xs text-[#080B09] focus:outline-none focus:border-[#061C16]">
              <option>Worldwide / Any Port</option>
              <option>Geneva & Zurich, Switzerland</option>
              <option>London & Mayfair, UK</option>
              <option>Monaco & Côte d'Azur</option>
              <option>Dubai & DIFC, UAE</option>
              <option>New York & Miami, USA</option>
              <option>Mumbai, India</option>
              <option>Caribbean & Bahamas</option>
            </select>
          </div>
        </div>

        {/* Featured Discovery Opportunities */}
        <div>
          <span className="label-micro text-[#7A8F83] block mb-3">
            Priority Catalog Matches
          </span>
          <div className="space-y-2">
            {quickPicks.map((item) => (
              <a
                key={item.title}
                href="/#collection"
                onClick={onClose}
                className="p-3.5 bg-white border border-[#D8D3C8] hover:border-[#061C16] flex items-center justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#C6A15B] font-semibold">
                      {item.vertical}
                    </span>
                    <span className="text-[10px] text-[#7A8F83] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg text-[#080B09] font-medium group-hover:text-[#061C16] transition-colors">
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-serif text-sm font-semibold text-[#061C16]">
                    {item.price}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#F6F3EA] flex items-center justify-center text-[#061C16] group-hover:bg-[#061C16] group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
