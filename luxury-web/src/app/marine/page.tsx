'use client';

import { useState } from 'react';
import { Anchor, Users, Compass, Shield, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import MarineCharterModal from '@/components/marine/MarineCharterModal';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import Link from 'next/link';

interface YachtModel {
  id: string;
  name: string;
  category: 'mega' | 'super' | 'catamaran' | 'explorer';
  typeLabel: string;
  tagline: string;
  builder: string;
  loa: string; // Length overall
  beam: string;
  draft: string;
  engines: string;
  guests: number;
  cabins: number;
  crew: number;
  range: string;
  speed: string;
  askingPrice: string;
  charterRatePerDay: string;
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
    askingPrice: '₹850 Cr (€94,000,000)',
    charterRatePerDay: '₹45 Lakhs / day ($54,000)',
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
    tagline: 'Perfect for private sunset celebrations, destination weddings, and coastal cruising in Goa & Mumbai Harbour.',
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
    askingPrice: '₹185 Cr (€20,500,000)',
    charterRatePerDay: '₹18.5 Lakhs / day (Goa Charter)',
    allowedEvents: ['Private Sunset Yacht Parties & DJ Sets', 'Weddings & Pre-Wedding Shoots', 'VIP Anniversary Celebrations'],
    imageUrl: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=1200&auto=format&fit=crop',
    ownerOrBroker: 'Sameer Singhal · Goa Superyachts',
    location: 'Goa (Mandovi) / Mumbai Harbour',
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
    askingPrice: '₹1,200 Cr (€135,000,000)',
    charterRatePerDay: '₹65 Lakhs / day',
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
    askingPrice: '₹55 Cr (€6,100,000)',
    charterRatePerDay: '₹6.5 Lakhs / day',
    allowedEvents: ['Family Receptions', 'Intimate Cocktail Evenings', 'Coral Island Snorkelling'],
    imageUrl: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=1200&auto=format&fit=crop',
    ownerOrBroker: 'Sameer Singhal · Goa Superyachts',
    location: 'Goa / Lakshadweep / Maldives',
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
    askingPrice: '₹420 Cr (€46,500,000)',
    charterRatePerDay: '₹32 Lakhs / day',
    allowedEvents: ['Arctic / Antarctic Exploration', 'Scientific Research Expeditions', 'Deep Sea Submersible Missions'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop',
    ownerOrBroker: 'Polaris Maritime Desk',
    location: 'North Sea / Mediterranean',
  },
];

const marineEventHighlights = [
  {
    title: 'Sunset Yacht Parties & Celebrations',
    location: 'Goa Coastal Waters / Mumbai Harbour / Monaco',
    description: 'Flybridge cocktail decks, professional DJ setups, live sushi and oyster bars with licensed marine security.',
    capacity: 'Up to 40 Guests',
    vessel: 'Sunseeker 131 or Azimut Grande',
  },
  {
    title: 'Weddings & Pre-Wedding Galas at Sea',
    location: 'Goa Mandovi River & Arabian Sea / French Riviera',
    description: 'Ceremonial vows against the open ocean sunset, floral archways, champagne fountains and tender guest shuttles.',
    capacity: 'Up to 50 Guests',
    vessel: '40m - 50m Tri-Deck Superyacht',
  },
  {
    title: 'Offshore Corporate Summits & Board Retreats',
    location: 'Monaco / Dubai Marina / Goa Coast',
    description: 'Satellite encrypted teleconferencing, private executive dining room, and absolute privacy from media or interference.',
    capacity: '12 - 20 Principals',
    vessel: 'Oceanco 73m or Benetti 90m Giga',
  },
  {
    title: 'Grand Prix & Film Festival VIP Berths',
    location: 'Monaco Port Hercule / Cannes Vieux Port',
    description: 'Guaranteed prime quay berthage with trackside or red-carpet views, executive hostess crew, and private yacht tender transfers.',
    capacity: 'VIP Passes included',
    vessel: 'Exclusive Berth Allocation',
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

  const handleBookVessel = (vessel: YachtModel) => {
    setSelectedVesselForModal(`${vessel.name} (${vessel.loa})`);
    setSelectedEventTypeForModal(vessel.allowedEvents[0]);
    setSelectedPortForModal(vessel.location);
    setCharterModalOpen(true);
  };

  return (
    <div className="bg-[#FCFBF7] text-[#080B09] min-h-screen pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Navigation Breadcrumb */}
        <div className="py-6 border-b border-[#D8D3C8] mb-10 flex items-center justify-between text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#080B09]/70 hover:text-[#061C16] uppercase tracking-[0.25em] font-medium transition-colors"
          >
            <span>&larr; BACK TO NP GROUPS NETWORK</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#9D7B3E] font-medium">
              MYBA MEMBER &middot; LLOYD&apos;S REGISTER CLASS CERTIFIED
            </span>
          </div>
        </div>

        {/* Marine Banner */}
        <div className="relative bg-[#061C16] text-[#FCFBF7] p-8 sm:p-14 mb-12 border border-[#C6A15B]/20 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6A15B]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium">
              <Anchor className="w-3.5 h-3.5" />
              <span>SOVEREIGN MARITIME DESK</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-tight leading-[1.08]">
              Mega Yachts, Superyacht Charters &amp; Private Parties
            </h1>

            <p className="text-sm sm:text-base text-[#D8D3C8]/85 font-light leading-relaxed max-w-2xl">
              From private sunset celebrations in Goa &amp; Mumbai Harbour to Mediterranean megayacht berths in Monaco, weddings at sea, and polar explorer vessels.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => {
                  setSelectedVesselForModal(undefined);
                  setSelectedEventTypeForModal(undefined);
                  setCharterModalOpen(true);
                }}
                className="px-8 py-3.5 bg-[#FCFBF7] text-[#061C16] text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all shadow-md"
              >
                BOOK YACHT CHARTER OR EVENT
              </button>
              <Link
                href="/portal"
                className="px-8 py-3.5 border border-[#C6A15B]/60 text-white text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-[#C6A15B]/20 transition-all"
              >
                YACHT OWNER &amp; BROKER PORTAL
              </Link>
            </div>
          </div>
        </div>

        {/* Tab & Subcategory Switcher */}
        <div className="flex items-center justify-between border-b border-[#D8D3C8] pb-6 mb-8 gap-4 flex-wrap">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('charter')}
              className={`px-6 py-3 text-[11px] uppercase tracking-[0.25em] font-semibold transition-all ${
                activeTab === 'charter'
                  ? 'bg-[#061C16] text-[#FCFBF7] border border-[#061C16]'
                  : 'bg-transparent text-[#080B09]/70 border border-[#D8D3C8] hover:border-[#061C16]'
              }`}
            >
              1. CHARTER &amp; PRIVATE PARTIES
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`px-6 py-3 text-[11px] uppercase tracking-[0.25em] font-semibold transition-all ${
                activeTab === 'sales'
                  ? 'bg-[#061C16] text-[#FCFBF7] border border-[#061C16]'
                  : 'bg-transparent text-[#080B09]/70 border border-[#D8D3C8] hover:border-[#061C16]'
              }`}
            >
              2. VESSEL SALES &amp; SYNDICATES
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                selectedCategory === 'all' ? 'text-[#061C16] font-bold border-b border-[#061C16]' : 'text-[#080B09]/60'
              }`}
            >
              All Vessels
            </button>
            <button
              onClick={() => setSelectedCategory('mega')}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                selectedCategory === 'mega' ? 'text-[#061C16] font-bold border-b border-[#061C16]' : 'text-[#080B09]/60'
              }`}
            >
              Mega Yachts (60m+)
            </button>
            <button
              onClick={() => setSelectedCategory('super')}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                selectedCategory === 'super' ? 'text-[#061C16] font-bold border-b border-[#061C16]' : 'text-[#080B09]/60'
              }`}
            >
              Superyachts
            </button>
            <button
              onClick={() => setSelectedCategory('catamaran')}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                selectedCategory === 'catamaran' ? 'text-[#061C16] font-bold border-b border-[#061C16]' : 'text-[#080B09]/60'
              }`}
            >
              Catamarans
            </button>
            <button
              onClick={() => setSelectedCategory('explorer')}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                selectedCategory === 'explorer' ? 'text-[#061C16] font-bold border-b border-[#061C16]' : 'text-[#080B09]/60'
              }`}
            >
              Explorer
            </button>
          </div>
        </div>

        {/* Event Charter Strip */}
        {activeTab === 'charter' && (
          <div className="mb-16 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#9D7B3E] font-medium">
                CURATED CELEBRATIONS AT SEA
              </span>
              <h3 className="font-serif text-2xl font-light text-[#061C16]">
                Superyacht Parties, Weddings &amp; Offshore Summits
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {marineEventHighlights.map((evt, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#D8D3C8] p-6 flex flex-col justify-between space-y-4 hover:border-[#061C16] transition-all hover:shadow-lg"
                >
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#C6A15B] font-medium block">
                      {evt.capacity}
                    </span>
                    <h4 className="font-serif text-lg font-light text-[#061C16]">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-[#080B09]/70 font-light leading-relaxed">
                      {evt.description}
                    </p>
                    <div className="text-[10px] text-[#9D7B3E] font-medium pt-1">
                      {evt.location}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D8D3C8]/60 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-widest text-[#080B09]/50 block">{evt.vessel}</span>
                    <button
                      onClick={() => handleBookEvent(evt)}
                      className="px-3 py-1.5 bg-[#061C16] text-[#FCFBF7] text-[9px] uppercase tracking-widest font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all"
                    >
                      BOOK EVENT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Yacht Fleet Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#061C16]">
              {activeTab === 'charter' ? 'Available Yachts for Charter &amp; Private Parties' : 'Vessels Available for Acquisition'}
            </h3>
            <span className="text-xs text-[#080B09]/60 font-light">
              {filteredFleet.length} Verified Vessels Listed
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredFleet.map((yacht) => (
              <div
                key={yacht.id}
                className="bg-white border border-[#D8D3C8] hover:border-[#061C16] transition-all duration-500 hover:shadow-2xl overflow-hidden flex flex-col justify-between"
              >
                {/* Image Stage with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#061C16]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                    style={{ backgroundImage: `url('${yacht.imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061C16]/95 via-transparent to-black/30" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#061C16]/90 border border-[#C6A15B]/30 text-[#C6A15B] text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm">
                      {yacht.typeLabel}
                    </span>
                    <span className="px-2.5 py-1 bg-black/60 border border-white/20 text-white text-[9px] uppercase tracking-widest font-mono">
                      LOA: {yacht.loa}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-light">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>{yacht.guests} Guests &middot; {yacht.crew} Crew</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>{yacht.location}</span>
                    </div>
                  </div>
                </div>

                {/* Details Area */}
                <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#9D7B3E] font-medium block">
                        BROKER / OWNER: {yacht.ownerOrBroker}
                      </span>
                      <h4 className="font-serif text-2xl font-light text-[#061C16] leading-snug mt-1">
                        {yacht.name}
                      </h4>
                      <p className="text-xs text-[#080B09]/75 font-light leading-relaxed mt-2">
                        {yacht.tagline}
                      </p>
                    </div>

                    <div className="bg-[#FCFBF7] border border-[#D8D3C8] p-4 text-xs space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#080B09]/50 block">BUILDER &amp; YEAR:</span>
                          <span className="font-medium text-[#061C16] text-[11px]">{yacht.builder}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#080B09]/50 block">ENGINES:</span>
                          <span className="font-medium text-[#061C16] text-[11px]">{yacht.engines}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#D8D3C8]/60">
                        <span className="text-[9px] uppercase tracking-widest text-[#080B09]/50 block mb-1">
                          RECOMMENDED CELEBRATIONS &amp; ITINERARIES:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {yacht.allowedEvents.map((evt, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-white border border-[#D8D3C8] text-[9px] text-[#061C16]"
                            >
                              &bull; {evt}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Price Bar */}
                  <div className="pt-6 border-t border-[#D8D3C8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#080B09]/50 block">
                        {activeTab === 'charter' ? 'DAILY CHARTER RATE' : 'VALUATION FOR SALE'}
                      </span>
                      <span className="font-serif text-xl font-medium text-[#061C16]">
                        {activeTab === 'charter' ? yacht.charterRatePerDay : yacht.askingPrice}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {activeTab === 'charter' ? (
                        <button
                          onClick={() => handleBookVessel(yacht)}
                          className="px-6 py-3 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all shadow-md"
                        >
                          BOOK YACHT CHARTER
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            openEnquiry({
                              title: `Vessel Acquisition: ${yacht.name}`,
                              subtitle: 'Request Lloyd\'s survey documentation, GA drawings, and bilateral purchase contract.',
                              assetTitle: yacht.name,
                              defaultVertical: 'Marine',
                            })
                          }
                          className="px-6 py-3 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all shadow-md"
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

        {/* Yacht Owner Consignment Strip */}
        <div className="mt-20 p-8 sm:p-12 bg-[#061C16] text-[#FCFBF7] border border-[#C6A15B]/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] block">
              YACHT OWNERS &amp; CAPTAINS
            </span>
            <h3 className="font-serif text-2xl font-light text-white">
              List Your Vessel for Charter or Private Sale
            </h3>
            <p className="text-xs text-[#D8D3C8]/70 font-light max-w-xl">
              Monetize empty berths, list for private parties in Goa, Cannes or Monaco, and receive direct pre-screened client charter mandates with zero commission leakage.
            </p>
          </div>

          <Link
            href="/portal"
            className="px-8 py-3.5 bg-[#FCFBF7] text-[#061C16] text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] transition-all whitespace-nowrap"
          >
            ENTER YACHT BROKER PORTAL
          </Link>
        </div>
      </div>

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
