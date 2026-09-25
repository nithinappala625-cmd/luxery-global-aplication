'use client';

import { useState } from 'react';
import { Ship, Calendar, MapPin, Users, Anchor, Compass, Shield, ArrowRight, Sparkles, Droplets, Waves, Globe } from 'lucide-react';
import MarineCharterModal from '@/components/marine/MarineCharterModal';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import { useCountry } from '@/lib/countryContext';
import Link from 'next/link';

interface YachtModel {
  id: string;
  name: string;
  category: 'mega' | 'super' | 'catamaran' | 'explorer';
  typeLabel: string;
  tagline: string;
  builder: string;
  loa: string;
  beam: string;
  draft: string;
  engines: string;
  guests: number;
  cabins: number;
  crew: number;
  range: string;
  speed: string;
  usdPrice: number;
  usdCharterDaily: number;
  allowedEvents: string[];
  imageUrl: string;
  ownerOrBroker: string;
  location: string;
}

const marineFleet: YachtModel[] = [
  {
    id: 'oceanco-project-bravo',
    name: 'Oceanco 73m Custom Mega Yacht',
    category: 'mega',
    typeLabel: '73-Metre Displacement Mega Yacht',
    tagline: 'Helicopter touch-and-go landing deck, 12m infinity pool, beach club spa, and hybrid eco-propulsion.',
    builder: 'Oceanco (Netherlands)',
    loa: '73.2 Metres (240 ft)',
    beam: '13.8 Metres',
    draft: '3.9 Metres',
    engines: 'Twin MTU 20V 4000 M73L (4,828 HP each)',
    guests: 14,
    cabins: 7,
    crew: 22,
    range: '5,000 Nautical Miles',
    speed: '18.5 Knots Max / 14 Knots Cruise',
    usdPrice: 105000000,
    usdCharterDaily: 58000,
    allowedEvents: ['High-Profile Corporate Summits', 'Monaco Grand Prix VIP Berthing', 'Transoceanic Expeditions'],
    imageUrl: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=1200&auto=format&fit=crop',
    ownerOrBroker: 'Aurelia Delacroix · Monaco Marine Syndicate',
    location: 'Monaco / Cannes / Dubai',
  },
  {
    id: 'sunseeker-131-aura',
    name: 'Sunseeker 131 Tri-Deck "Aura of Goa"',
    category: 'super',
    typeLabel: '40-Metre Tri-Deck Superyacht',
    tagline: 'Perfect for private sunset celebrations, destination ocean weddings, and coastal cruising in Goa, Mumbai, or the French Riviera.',
    builder: 'Sunseeker International (UK)',
    loa: '40.05 Metres (131 ft)',
    beam: '8.09 Metres',
    draft: '2.4 Metres',
    engines: 'Twin MTU 12V 4000 M93 (3,181 HP each)',
    guests: 35, // Event capacity
    cabins: 5,
    crew: 8,
    range: '1,500 Nautical Miles',
    speed: '25 Knots Max / 18 Knots Cruise',
    usdPrice: 22500000,
    usdCharterDaily: 24000,
    allowedEvents: ['Private Sunset Yacht Parties & DJ Sets', 'Weddings & Pre-Wedding Shoots', 'VIP Anniversary Celebrations'],
    imageUrl: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=1200&auto=format&fit=crop',
    ownerOrBroker: 'Sameer Singhal · Goa Superyachts',
    location: 'Goa (Mandovi) / Mumbai Harbour / Monaco',
  },
  {
    id: 'benetti-fb277',
    name: 'Benetti 90m Custom Full Custom Giga',
    category: 'mega',
    typeLabel: '90-Metre Steel & Aluminium Giga Yacht',
    tagline: 'Palatial luxury with grand piano salon, heated swimming pool on sun deck, hammam spa, and cinema.',
    builder: 'Benetti Shipyard (Livorno, Italy)',
    loa: '90.0 Metres (295 ft)',
    beam: '14.2 Metres',
    draft: '4.1 Metres',
    engines: 'Twin Rolls-Royce Diesel-Electric Propulsion',
    guests: 20,
    cabins: 10,
    crew: 29,
    range: '6,500 Nautical Miles',
    speed: '18 Knots Max',
    usdPrice: 145000000,
    usdCharterDaily: 82000,
    allowedEvents: ['International Bilateral State Summits', 'Film Festival Gala Receptions', 'Private Island Expeditions'],
    imageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200&auto=format&fit=crop',
    ownerOrBroker: 'Aurelia Delacroix · Monaco Marine Syndicate',
    location: 'Monaco / Saint-Tropez / Portofino',
  },
  {
    id: 'lagoon-seventy7',
    name: 'Lagoon Seventy 7 Luxury Sailing Catamaran',
    category: 'catamaran',
    typeLabel: '24-Metre Master Sailing Catamaran',
    tagline: 'Unmatched 11-metre beam stability, direct sea-terrace balcony off the master suite, and zero roll at anchor.',
    builder: 'Lagoon Catamarans (France)',
    loa: '23.8 Metres (77 ft)',
    beam: '11.0 Metres',
    draft: '1.9 Metres',
    engines: 'Twin Volvo Penta D4-300 (2x 300 HP) + Carbon Rig',
    guests: 18,
    cabins: 4,
    crew: 4,
    range: 'Transoceanic Sailing Capability',
    speed: '12 Knots under Sail / 10 Knots Engine',
    usdPrice: 6800000,
    usdCharterDaily: 8500,
    allowedEvents: ['Family Receptions', 'Intimate Cocktail Evenings', 'Coral Island Snorkelling'],
    imageUrl: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=1200&auto=format&fit=crop',
    ownerOrBroker: 'Sameer Singhal · Goa Superyachts',
    location: 'Goa / Lakshadweep / Maldives / Greek Isles',
  },
  {
    id: 'damen-seaxplorer',
    name: 'Damen SeaXplorer 65 Polar Expedition',
    category: 'explorer',
    typeLabel: '65-Metre Ice-Class Expedition Yacht',
    tagline: 'Polar Class compliant for true unrestricted world circumnavigation with submarine and dive support.',
    builder: 'Damen Yachting (Netherlands)',
    loa: '65.0 Metres (213 ft)',
    beam: '12.0 Metres',
    draft: '3.6 Metres',
    engines: 'Twin Caterpillar 3512C HD',
    guests: 12,
    cabins: 6,
    crew: 18,
    range: '6,000 Nautical Miles',
    speed: '15 Knots',
    usdPrice: 52000000,
    usdCharterDaily: 42000,
    allowedEvents: ['Arctic / Antarctic Exploration', 'Scientific Research Expeditions', 'Deep Sea Submersible Missions'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop',
    ownerOrBroker: 'Polaris Maritime Desk',
    location: 'North Sea / Mediterranean / Norwegian Fjords',
  },
];

const marineEventHighlights = [
  {
    title: 'Sunset Yacht Parties & Celebrations',
    location: 'Monaco / Goa Coastal Waters / Dubai Marina / Miami',
    description: 'Flybridge cocktail decks, professional DJ setups, live sushi and oyster bars with licensed marine security.',
    capacity: 'Up to 40 Guests',
    vessel: 'Sunseeker 131 or Azimut Grande',
    usdEstimate: 24000,
  },
  {
    title: 'Weddings & Pre-Wedding Galas at Sea',
    location: 'French Riviera / Goa Mandovi & Arabian Sea / Amalfi Coast',
    description: 'Ceremonial vows against the open ocean sunset, floral archways, champagne fountains and tender guest shuttles.',
    capacity: 'Up to 50 Guests',
    vessel: '40m - 50m Tri-Deck Superyacht',
    usdEstimate: 35000,
  },
  {
    title: 'Offshore Corporate Summits & Board Retreats',
    location: 'Monaco Port Hercule / Dubai / London Thames / Cannes',
    description: 'Satellite encrypted teleconferencing, private executive dining room, and absolute privacy from media or interference.',
    capacity: '12 - 20 Principals',
    vessel: 'Oceanco 73m or Benetti 90m Giga',
    usdEstimate: 65000,
  },
  {
    title: 'Grand Prix & Film Festival VIP Berths',
    location: 'Monaco Port Hercule / Cannes Vieux Port',
    description: 'Guaranteed prime quay berthage with trackside or red-carpet views, executive hostess crew, and private yacht tender transfers.',
    capacity: 'VIP Passes included',
    vessel: 'Exclusive Berth Allocation',
    usdEstimate: 75000,
  },
];

export default function MarinePage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'mega' | 'super' | 'catamaran' | 'explorer'>('all');
  const [activeTab, setActiveTab] = useState<'charter' | 'sales'>('charter');
  const [charterModalOpen, setCharterModalOpen] = useState(false);
  const [selectedVesselForModal, setSelectedVesselForModal] = useState<string | undefined>(undefined);
  const [selectedEventTypeForModal, setSelectedEventTypeForModal] = useState<string | undefined>(undefined);
  const [selectedPortForModal, setSelectedPortForModal] = useState<string | undefined>(undefined);

  const { openEnquiry } = useLuxuryUI();
  const { country, formatPrice } = useCountry();

  const filteredFleet = marineFleet.filter((yacht) => {
    if (selectedCategory === 'all') return true;
    return yacht.category === selectedCategory;
  });

  const handleBookEvent = (event: typeof marineEventHighlights[0]) => {
    setSelectedVesselForModal(event.vessel);
    setSelectedEventTypeForModal(event.title);
    setSelectedPortForModal(event.location);
    setCharterModalOpen(true);
  };

  const handleBookYacht = (yacht: YachtModel) => {
    setSelectedVesselForModal(yacht.name);
    setSelectedEventTypeForModal('Private Custom Yacht Charter');
    setSelectedPortForModal(yacht.location);
    setCharterModalOpen(true);
  };

  return (
    <div className="bg-[#FCFBF7] text-[#080B09] min-h-screen pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Global Maritime Desk Awareness Bar */}
        <div className="mb-6 p-4 rounded-xl bg-[#061C16] border border-[#C6A15B]/40 text-white flex flex-wrap items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{country.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-bold">
                  Active Maritime Syndicate Desk
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[9px] font-mono uppercase">
                  MYBA Compliant
                </span>
              </div>
              <p className="text-xs sm:text-sm font-serif font-bold text-white mt-0.5">
                {country.name} · Coastal Ports &amp; Yacht Harbours
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[9px] uppercase tracking-wider text-[#F6F3EA]/60 block font-mono">
                Currency &amp; Escrow
              </span>
              <span className="text-xs font-mono font-bold text-[#E8D48A]">
                1 USD = {country.usdRate} {country.currency}
              </span>
            </div>
            <Link
              href="/portal"
              className="px-3.5 py-1.5 rounded bg-[#C6A15B] text-[#061C16] text-[10px] font-bold uppercase tracking-widest hover:bg-[#E0C17E] transition-all"
            >
              Broker Portal
            </Link>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto py-8 sm:py-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#7A5410] font-extrabold bg-[#F5EEDB] px-3.5 py-1 rounded-full border border-[#C6A15B]/30">
            <Ship className="w-3.5 h-3.5 text-[#7A5410]" />
            <span>GLOBAL SUPERYACHT SYNDICATE</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#061C16] tracking-tight leading-none drop-shadow-sm">
            MARINE &amp; SUPERYACHTS
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#143327] font-semibold italic">
            Mega Yacht Charters, Sunset Celebrations, Ocean Weddings, and Certified Vessel Acquisitions.
          </p>

          <p className="text-xs sm:text-sm text-[#1A2E24] font-medium leading-relaxed max-w-2xl mx-auto pt-2">
            Discreet charter brokerage under MYBA standard agreements, shipyard new-build allocations, and direct ownership transfers across Monaco, the French Riviera, Dubai Marina, and the Indian Ocean.
          </p>
        </div>

        {/* Mode Selector Tabs (Charter vs Sales) */}
        <div className="flex items-center justify-between border-b border-[#D0C9BA] pb-6 mb-8 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('charter')}
              className={`px-6 py-3.5 text-xs uppercase tracking-[0.25em] font-extrabold transition-all rounded-lg shadow-sm ${
                activeTab === 'charter'
                  ? 'bg-[#061C16] text-[#F3E2B8] border border-[#061C16]'
                  : 'bg-white text-[#061C16] border border-[#D0C9BA] hover:border-[#061C16]'
              }`}
            >
              1. YACHT CHARTER &amp; CELEBRATIONS
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`px-6 py-3.5 text-xs uppercase tracking-[0.25em] font-extrabold transition-all rounded-lg shadow-sm ${
                activeTab === 'sales'
                  ? 'bg-[#061C16] text-[#F3E2B8] border border-[#061C16]'
                  : 'bg-white text-[#061C16] border border-[#D0C9BA] hover:border-[#061C16]'
              }`}
            >
              2. VESSEL SALES &amp; SYNDICATES
            </button>
          </div>

          {/* Subcategories Filter */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-[#D0C9BA]">
            {(['all', 'mega', 'super', 'catamaran', 'explorer'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold rounded transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#061C16] text-[#F3E2B8]'
                    : 'text-[#4A5E53] hover:text-[#061C16]'
                }`}
              >
                {cat === 'all' ? 'All Vessels' : cat === 'mega' ? 'Mega Yachts' : cat === 'super' ? 'Superyachts' : cat === 'catamaran' ? 'Catamarans' : 'Explorers'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Marine Events Strip */}
        {activeTab === 'charter' && (
          <div className="mb-16 space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A5410] font-extrabold bg-[#F5EEDB] px-2.5 py-0.5 rounded border border-[#C6A15B]/30 block w-fit mb-1">
                  CELEBRATIONS &amp; BESPOKE EXPERIENCES
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#061C16]">
                  Curated Private Charters &amp; Ocean Galas
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {marineEventHighlights.map((evt, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-[#D8D3C8] rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-[#061C16] transition-all hover:shadow-xl group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A5410] font-mono font-bold block bg-[#F9F8F5] px-2 py-0.5 rounded w-fit border border-[#D8D3C8]">
                      {evt.capacity}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#061C16] group-hover:text-[#0A3324] leading-snug">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-[#203127] font-medium leading-relaxed">
                      {evt.description}
                    </p>
                    <div className="text-[10px] text-[#7A5410] font-bold pt-1">
                      Location: {evt.location}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D8D3C8] flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#4D6055] font-bold block">
                        EST. CHARTER
                      </span>
                      <span className="font-serif font-extrabold text-base text-[#061C16]">
                        {formatPrice(evt.usdEstimate)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleBookEvent(evt)}
                      className="px-3.5 py-2 bg-[#061C16] text-[#F3E2B8] text-[10px] uppercase tracking-widest font-bold hover:bg-[#0D382A] hover:text-white transition-all rounded"
                    >
                      BOOK
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Yacht Fleet Grid with Punchy High-Contrast Typography */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#061C16]">
              {activeTab === 'charter' ? 'Available Yachts for Charter &amp; Private Parties' : 'Vessels Available for Acquisition'}
            </h3>
            <span className="text-xs text-[#3C4E44] font-bold bg-[#EFECE4] px-3 py-1 rounded-full">
              {filteredFleet.length} Verified Vessels
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredFleet.map((yacht) => (
              <div
                key={yacht.id}
                className="bg-white border-2 border-[#D8D3C8] hover:border-[#061C16] rounded-2xl transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col justify-between"
              >
                {/* Image Stage with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#061C16]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url('${yacht.imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04130D]/95 via-transparent to-black/30" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#061C16]/95 border border-[#C6A15B] text-[#E8D48A] text-[10px] font-bold uppercase tracking-[0.2em] rounded backdrop-blur-sm shadow">
                      {yacht.typeLabel}
                    </span>
                    <span className="px-2.5 py-1 bg-black/80 border border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded">
                      LOA: {yacht.loa}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                    <div className="flex items-center gap-1.5 drop-shadow">
                      <Users className="w-4 h-4 text-[#E8D48A]" />
                      <span>{yacht.guests} Guests &middot; {yacht.crew} Crew</span>
                    </div>
                    <div className="flex items-center gap-1.5 drop-shadow">
                      <MapPin className="w-4 h-4 text-[#E8D48A]" />
                      <span>{yacht.location}</span>
                    </div>
                  </div>
                </div>

                {/* Details Area with Rich High-Contrast Typography */}
                <div className="p-7 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A5410] font-extrabold bg-[#F5EEDB] px-3 py-1 rounded inline-block border border-[#C6A15B]/30 mb-2">
                        BROKER / OWNER: {yacht.ownerOrBroker}
                      </span>
                      <h4 className="font-serif text-2xl sm:text-[1.85rem] font-bold text-[#061C16] leading-snug tracking-tight">
                        {yacht.name}
                      </h4>
                      <p className="text-[13px] sm:text-sm text-[#1F2C24] font-medium leading-relaxed mt-2">
                        {yacht.tagline}
                      </p>
                    </div>

                    <div className="bg-[#F9F8F5] border border-[#D0C9BA] rounded-xl p-4 sm:p-5 text-xs space-y-3 shadow-sm">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-[#4D6055] font-bold block mb-0.5">
                            BUILDER &amp; SPECIFICATIONS:
                          </span>
                          <span className="font-bold text-[#061C16] text-xs sm:text-[13px] leading-tight block">
                            {yacht.builder} ({yacht.loa})
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-[#4D6055] font-bold block mb-0.5">
                            POWERPLANT / SPEED:
                          </span>
                          <span className="font-bold text-[#061C16] text-xs sm:text-[13px] leading-tight block">
                            {yacht.engines} &middot; {yacht.speed}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#D0C9BA]">
                        <span className="text-[9px] uppercase tracking-wider text-[#4D6055] font-bold block mb-1.5">
                          RECOMMENDED CELEBRATIONS &amp; ITINERARIES:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {yacht.allowedEvents.map((evt, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-white border border-[#D0C9BA] text-[10px] font-bold text-[#061C16] rounded shadow-xs"
                            >
                              &bull; {evt}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Price Bar */}
                  <div className="pt-6 border-t border-[#D0C9BA] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#4D6055] font-bold block mb-0.5">
                        {activeTab === 'charter' ? 'DAILY CHARTER VALUATION' : 'VALUATION FOR SALE'}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#061C16] tracking-tight">
                          {activeTab === 'charter'
                            ? `${formatPrice(yacht.usdCharterDaily)} / day`
                            : formatPrice(yacht.usdPrice)}
                        </span>
                        <span className="text-[10px] text-[#7A5410] font-mono font-bold bg-[#F5EEDB] px-2 py-0.5 rounded border border-[#C6A15B]/30">
                          {country.currency}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {activeTab === 'charter' ? (
                        <button
                          onClick={() => handleBookYacht(yacht)}
                          className="px-6 py-3.5 bg-[#061C16] hover:bg-[#0D382A] text-[#F3E2B8] hover:text-white text-[11px] uppercase tracking-[0.2em] font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 rounded border border-[#C6A15B]/40"
                        >
                          BOOK CHARTER CRUISE
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            openEnquiry({
                              title: `Vessel Acquisition Prospectus: ${yacht.name}`,
                              subtitle: `Valuation: ${formatPrice(yacht.usdPrice)}. Full naval architecture blueprints, survey reports, and transfer escrow documentation.`,
                              assetTitle: yacht.name,
                              defaultVertical: 'Marine & Superyachts',
                            })
                          }
                          className="px-6 py-3.5 bg-[#061C16] hover:bg-[#0D382A] text-[#F3E2B8] hover:text-white text-[11px] uppercase tracking-[0.2em] font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 rounded border border-[#C6A15B]/40"
                        >
                          REQUEST PROSPECTUS
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Live Yacht Charter Modal */}
      <MarineCharterModal
        isOpen={charterModalOpen}
        onClose={() => setCharterModalOpen(false)}
        prefillVessel={selectedVesselForModal}
        prefillEventType={selectedEventTypeForModal}
        prefillPort={selectedPortForModal}
      />
    </div>
  );
}
