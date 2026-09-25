'use client';

import { useState } from 'react';
import { Plane, Calendar, MapPin, Users, Shield, ArrowRight, Play, CheckCircle2, Sparkles, Clock, Gauge, Compass } from 'lucide-react';
import AviationCharterModal from '@/components/aviation/AviationCharterModal';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import Link from 'next/link';

interface AircraftModel {
  id: string;
  name: string;
  category: 'jet' | 'helicopter' | 'seaplane';
  typeLabel: string;
  tagline: string;
  engines: string;
  flyingHours: string;
  speed: string;
  range: string;
  passengers: number;
  askingPrice: string;
  charterRatePerHour: string;
  recommendedRoutes: string[];
  allowedMissions: string[];
  imageUrl: string;
  videoPreviewUrl: string;
  operator: string;
  operatorLocation: string;
}

const fleet: AircraftModel[] = [
  {
    id: 'g700-flagship',
    name: 'Gulfstream G700 Intercontinental Flagship',
    category: 'jet',
    typeLabel: 'Ultra-Long-Range Heavy Jet',
    tagline: 'The pinnacle of business aviation. Non-stop India to USA with zero refueling stops.',
    engines: 'Twin Rolls-Royce Pearl 700 Turbofans (18,250 lbf each)',
    flyingHours: '185 Total Time (Under Factory Warranty)',
    speed: 'Mach 0.925 Max / Mach 0.85 Cruise',
    range: '7,750 Nautical Miles (14,353 km)',
    passengers: 19,
    askingPrice: '₹578 Cr ($75,000,000)',
    charterRatePerHour: '₹9.8 Lakhs / hr',
    recommendedRoutes: ['Mumbai ➔ New York JFK', 'Delhi ➔ London Luton', 'Dubai ➔ Los Angeles'],
    allowedMissions: ['Transatlantic Corporate M&A', 'Diplomatic Delegation', 'Bespoke World Tour'],
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=800&auto=format&fit=crop',
    operator: 'Marcus Von Berg · Geneva Air Desk',
    operatorLocation: 'Geneva / Mumbai',
  },
  {
    id: 'global-7500',
    name: 'Bombardier Global 7500 Master Suite',
    category: 'jet',
    typeLabel: 'Four-Zone Ultra-Long-Range Jet',
    tagline: 'Four true living spaces, permanent master bedroom suite, and Nuage zero-gravity seating.',
    engines: 'Twin GE Passport Engines (18,920 lbf each)',
    flyingHours: '320 Airframe Hours',
    speed: 'Mach 0.925 Max Operating',
    range: '7,700 Nautical Miles',
    passengers: 17,
    askingPrice: '₹512 Cr ($68,000,000)',
    charterRatePerHour: '₹9.2 Lakhs / hr',
    recommendedRoutes: ['Bangalore ➔ San Francisco', 'Mumbai ➔ London Stansted', 'Delhi ➔ Tokyo Haneda'],
    allowedMissions: ['Global Family Office Summit', 'Sovereign Head of State Flight', 'Executive Transpacific'],
    imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?q=80&w=800&auto=format&fit=crop',
    operator: 'Capt. Rajeshwar Varma · Skyline Aviation',
    operatorLocation: 'Mumbai / Dubai',
  },
  {
    id: 'learjet-75-liberty',
    name: 'Bombardier Learjet 75 Executive Express',
    category: 'jet',
    typeLabel: 'Mid-Size High-Speed Jet',
    tagline: 'Ideal for rapid point-to-point regional charter e.g. Goa to Hyderabad or Mumbai to Udaipur.',
    engines: 'Twin Honeywell TFE731-40BR Turbofans',
    flyingHours: '940 Airframe Hours',
    speed: '465 Knots (Mach 0.81)',
    range: '2,040 Nautical Miles',
    passengers: 8,
    askingPrice: '₹85 Cr ($11,000,000)',
    charterRatePerHour: '₹3.8 Lakhs / hr',
    recommendedRoutes: ['Goa ➔ Hyderabad (1h 10m)', 'Mumbai ➔ Goa (45m)', 'Delhi ➔ Ahmedabad (1h 15m)'],
    allowedMissions: ['Executive Medical Summit', 'Rapid Same-Day Return Business', 'Private Resort Access'],
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop',
    operator: 'Capt. Rajeshwar Varma · Skyline Aviation',
    operatorLocation: 'Goa / Hyderabad / Mumbai',
  },
  {
    id: 'sikorsky-s76d',
    name: 'Sikorsky S-76D Royal VIP Helicopter',
    category: 'helicopter',
    typeLabel: 'Twin-Turbine Executive Rotorcraft',
    tagline: 'Quiet cabin technology, active vibration control, certified for wedding flower showers and rooftop palace landings.',
    engines: 'Twin Pratt & Whitney Canada PW210S Turboshafts (1,050 shp)',
    flyingHours: '410 Rotor Hours',
    speed: '155 Knots Cruise',
    range: '450 Nautical Miles',
    passengers: 8,
    askingPrice: '₹39 Cr ($5,200,000)',
    charterRatePerHour: '₹2.1 Lakhs / hr',
    recommendedRoutes: ['Mumbai Helipad ➔ Pune', 'Udaipur Airport ➔ Lake Palace', 'Goa Airport ➔ Private Beach Estate'],
    allowedMissions: ['Wedding VIP Grand Entrances', 'Ceremonial Flower Petal Drops', 'Executive Airport Transfers'],
    imageUrl: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop',
    operator: 'Deccan Royal Helo Syndicate',
    operatorLocation: 'Goa / Udaipur / Mumbai',
  },
  {
    id: 'airbus-h145-vip',
    name: 'Airbus H145 Stylence VIP Helicopter',
    category: 'helicopter',
    typeLabel: 'Five-Blade Multi-Mission Rotorcraft',
    tagline: 'Fenestron shrouded tail rotor for supreme safety in crowd environments, political rallies, and luxury hotel compounds.',
    engines: 'Twin Safran Arriel 2E Turboshafts with Dual FADEC',
    flyingHours: '280 Rotor Hours',
    speed: '140 Knots Cruise',
    range: '380 Nautical Miles',
    passengers: 9,
    askingPrice: '₹48 Cr ($6,300,000)',
    charterRatePerHour: '₹2.4 Lakhs / hr',
    recommendedRoutes: ['Delhi ➔ Agra / Jaipur', 'Goa South ➔ Goa North Coastline', 'Multi-City Political Rallies'],
    allowedMissions: ['Political Party Campaign Multi-City Tours', 'Wedding Celebrations', 'Aerial Cinematography'],
    imageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop',
    operator: 'AeroCorp VIP Charters',
    operatorLocation: 'Delhi / Lucknow / Patna',
  },
  {
    id: 'daher-tbm-960',
    name: 'Daher TBM 960 Amphibian / Turboprop',
    category: 'seaplane',
    typeLabel: 'Pressurized High-Performance Turboprop',
    tagline: 'Water landing capable on pristine lakes and coastal archipelagos with Pratt & Whitney digital power.',
    engines: 'Pratt & Whitney Canada PT6E-66XT (850 shp)',
    flyingHours: '120 Flight Hours',
    speed: '330 Knots',
    range: '1,730 Nautical Miles',
    passengers: 6,
    askingPrice: '₹38 Cr ($5,000,000)',
    charterRatePerHour: '₹1.8 Lakhs / hr',
    recommendedRoutes: ['Cochin ➔ Lakshadweep Atolls', 'Malé ➔ Baa Atoll', 'Goa ➔ Netrani Island'],
    allowedMissions: ['Private Island Access', 'Remote Coastal Expeditions', 'Marine Survey'],
    imageUrl: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=800&auto=format&fit=crop',
    operator: 'Coastal Seaplane Fleet Ltd',
    operatorLocation: 'Goa / Kerala / Maldives',
  },
];

const popularCharterRoutes = [
  {
    origin: 'Goa International (GOI)',
    destination: 'Hyderabad Begumpet (BPM)',
    label: 'Goa ➔ Hyderabad',
    flightTime: '1h 10m',
    recommendedJet: 'Learjet 75 / Phenom 300',
    purpose: 'Executive Board Summit & Urgent Regional Transit',
    estRate: '₹8.5 - 11 Lakhs',
  },
  {
    origin: 'Mumbai (BOM)',
    destination: 'New York JFK (JFK)',
    label: 'Mumbai ➔ New York (India to USA)',
    flightTime: '15h 30m (Non-Stop)',
    recommendedJet: 'Gulfstream G700 / Bombardier Global 7500',
    purpose: 'Intercontinental Corporate M&A & Family Office',
    estRate: '₹1.35 - 1.55 Cr',
  },
  {
    origin: 'Delhi Safdarjung (VIDD)',
    destination: 'Varanasi / Lucknow / Patna',
    label: 'Delhi ➔ Multi-State Political Circuit',
    flightTime: 'Daily Standby Dispatch',
    recommendedJet: 'Airbus H145 / Bell 525 Helicopter',
    purpose: 'Political Party Campaign VIP Transit',
    estRate: '₹42 - 50 Lakhs (3 Days)',
  },
  {
    origin: 'Udaipur Airport (UDR)',
    destination: 'Lake Palace Helipad, Udaipur',
    label: 'Udaipur Helipad ➔ Wedding Palace',
    flightTime: '25m Flight + Petal Drop Clearance',
    recommendedJet: 'Sikorsky S-76D VIP Helicopter',
    purpose: 'Wedding VIP Grand Entry & Rose Petal Flower Shower',
    estRate: '₹12 - 15 Lakhs',
  },
];

export default function AviationPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'jet' | 'helicopter' | 'seaplane'>('all');
  const [activeTab, setActiveTab] = useState<'charter' | 'sales'>('charter');
  const [charterModalOpen, setCharterModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<{ origin: string; destination: string; label: string } | undefined>(undefined);
  const [selectedAircraftForModal, setSelectedAircraftForModal] = useState<string | undefined>(undefined);
  const [selectedMissionForModal, setSelectedMissionForModal] = useState<string | undefined>(undefined);

  const { openEnquiry } = useLuxuryUI();

  const filteredFleet = fleet.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleBookRoute = (route: typeof popularCharterRoutes[0]) => {
    setSelectedRoute({ origin: route.origin, destination: route.destination, label: route.label });
    setSelectedAircraftForModal(route.recommendedJet);
    setSelectedMissionForModal(route.purpose);
    setCharterModalOpen(true);
  };

  const handleBookAircraft = (aircraft: AircraftModel) => {
    setSelectedRoute(undefined);
    setSelectedAircraftForModal(`${aircraft.name} (${aircraft.typeLabel})`);
    setSelectedMissionForModal(aircraft.allowedMissions[0]);
    setCharterModalOpen(true);
  };

  return (
    <div className="bg-[#FCFBF7] text-[#080B09] min-h-screen pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Breadcrumb Back */}
        <div className="py-6 border-b border-[#D8D3C8] mb-10 flex items-center justify-between text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#080B09]/70 hover:text-[#061C16] uppercase tracking-[0.25em] font-medium transition-colors"
          >
            <span>&larr; BACK TO NP GROUPS NETWORK</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#9D7B3E] font-medium">
              DGCA &middot; FAA &middot; EASA COMPLIANT PART 135 DESK
            </span>
          </div>
        </div>

        {/* Cinematic Aviation Header */}
        <div className="relative bg-[#061C16] text-[#FCFBF7] p-8 sm:p-14 mb-12 border border-[#C6A15B]/20 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6A15B]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium">
              <Plane className="w-3.5 h-3.5" />
              <span>SOVEREIGN PRIVATE AVIATION DESK</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-tight leading-[1.08]">
              Private Jets, VIP Helicopters &amp; Aerial Missions
            </h1>

            <p className="text-sm sm:text-base text-[#D8D3C8]/85 font-light leading-relaxed max-w-2xl">
              From point-to-point regional charters (Goa to Hyderabad) and non-stop intercontinental business flights (India to USA) to helicopter wedding flower showers and political party campaigns.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => {
                  setSelectedRoute(undefined);
                  setSelectedAircraftForModal(undefined);
                  setCharterModalOpen(true);
                }}
                className="px-8 py-3.5 bg-[#FCFBF7] text-[#061C16] text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all shadow-md"
              >
                BOOK PRIVATE CHARTER FLIGHT
              </button>
              <Link
                href="/portal"
                className="px-8 py-3.5 border border-[#C6A15B]/60 text-white text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-[#C6A15B]/20 transition-all"
              >
                OWNER &amp; OPERATOR DISPATCH LOGIN
              </Link>
            </div>
          </div>
        </div>

        {/* Mode Selector Tabs (Charter vs Sales) */}
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
              1. PRIVATE CHARTER &amp; MISSIONS
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`px-6 py-3 text-[11px] uppercase tracking-[0.25em] font-semibold transition-all ${
                activeTab === 'sales'
                  ? 'bg-[#061C16] text-[#FCFBF7] border border-[#061C16]'
                  : 'bg-transparent text-[#080B09]/70 border border-[#D8D3C8] hover:border-[#061C16]'
              }`}
            >
              2. AIRCRAFT SALES &amp; SYNDICATES
            </button>
          </div>

          {/* Subcategories Filter */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                selectedCategory === 'all' ? 'text-[#061C16] font-bold border-b border-[#061C16]' : 'text-[#080B09]/60'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedCategory('jet')}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                selectedCategory === 'jet' ? 'text-[#061C16] font-bold border-b border-[#061C16]' : 'text-[#080B09]/60'
              }`}
            >
              Jets
            </button>
            <button
              onClick={() => setSelectedCategory('helicopter')}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                selectedCategory === 'helicopter' ? 'text-[#061C16] font-bold border-b border-[#061C16]' : 'text-[#080B09]/60'
              }`}
            >
              Helicopters
            </button>
            <button
              onClick={() => setSelectedCategory('seaplane')}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                selectedCategory === 'seaplane' ? 'text-[#061C16] font-bold border-b border-[#061C16]' : 'text-[#080B09]/60'
              }`}
            >
              Air Boats
            </button>
          </div>
        </div>

        {/* Tab 1: Charter Routes & Flight Mission Booking Strip */}
        {activeTab === 'charter' && (
          <div className="mb-16 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#9D7B3E] font-medium">
                INSTANT DISPATCH ROUTES
              </span>
              <h3 className="font-serif text-2xl font-light text-[#061C16]">
                Popular Executive Charters &amp; Aerial Event Missions
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularCharterRoutes.map((route, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#D8D3C8] p-6 flex flex-col justify-between space-y-4 hover:border-[#061C16] transition-all hover:shadow-lg"
                >
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#C6A15B] font-medium block">
                      {route.flightTime}
                    </span>
                    <h4 className="font-serif text-lg font-light text-[#061C16]">
                      {route.label}
                    </h4>
                    <p className="text-xs text-[#080B09]/70 font-light leading-relaxed">
                      {route.purpose}
                    </p>
                    <div className="text-[10px] text-[#9D7B3E] font-medium pt-1">
                      Aircraft: {route.recommendedJet}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D8D3C8]/60 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] uppercase tracking-widest text-[#080B09]/50 block">EST. CHARTER</span>
                      <span className="font-medium text-xs text-[#061C16]">{route.estRate}</span>
                    </div>
                    <button
                      onClick={() => handleBookRoute(route)}
                      className="px-3 py-1.5 bg-[#061C16] text-[#FCFBF7] text-[9px] uppercase tracking-widest font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all"
                    >
                      BOOK FLIGHT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aircraft Fleet Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#061C16]">
              {activeTab === 'charter' ? 'Available Fleet for Charter Dispatch' : 'Certified Aircraft for Acquisition & Sale'}
            </h3>
            <span className="text-xs text-[#080B09]/60 font-light">
              {filteredFleet.length} Verified Airframes Listed
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredFleet.map((aircraft) => (
              <div
                key={aircraft.id}
                className="bg-white border border-[#D8D3C8] hover:border-[#061C16] transition-all duration-500 hover:shadow-2xl overflow-hidden flex flex-col justify-between"
              >
                {/* Image Stage with Info Overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#061C16]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                    style={{ backgroundImage: `url('${aircraft.imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061C16]/95 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#061C16]/90 border border-[#C6A15B]/30 text-[#C6A15B] text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm">
                      {aircraft.typeLabel}
                    </span>
                    <span className="px-2.5 py-1 bg-black/60 border border-white/20 text-white text-[9px] uppercase tracking-widest font-mono">
                      {aircraft.speed}
                    </span>
                  </div>

                  {/* Bottom Image Spec strip */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-light">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>{aircraft.passengers} VIP Club Seats</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>Range: {aircraft.range}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#9D7B3E] font-medium block">
                        OPERATOR: {aircraft.operator} ({aircraft.operatorLocation})
                      </span>
                      <h4 className="font-serif text-2xl font-light text-[#061C16] leading-snug mt-1">
                        {aircraft.name}
                      </h4>
                      <p className="text-xs text-[#080B09]/75 font-light leading-relaxed mt-2">
                        {aircraft.tagline}
                      </p>
                    </div>

                    {/* Detailed Specifications Box */}
                    <div className="bg-[#FCFBF7] border border-[#D8D3C8] p-4 text-xs space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#080B09]/50 block">POWERPLANT / ENGINES:</span>
                          <span className="font-medium text-[#061C16] text-[11px]">{aircraft.engines}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#080B09]/50 block">AIRFRAME / FLYING HOURS:</span>
                          <span className="font-medium text-[#061C16] text-[11px]">{aircraft.flyingHours}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#D8D3C8]/60">
                        <span className="text-[9px] uppercase tracking-widest text-[#080B09]/50 block mb-1">
                          VERIFIED MISSIONS &amp; USES:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {aircraft.allowedMissions.map((mission, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-white border border-[#D8D3C8] text-[9px] text-[#061C16]"
                            >
                              &bull; {mission}
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
                        {activeTab === 'charter' ? 'HOURLY CHARTER RATE' : 'ASKING ACQUISITION VALUATION'}
                      </span>
                      <span className="font-serif text-xl font-medium text-[#061C16]">
                        {activeTab === 'charter' ? aircraft.charterRatePerHour : aircraft.askingPrice}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {activeTab === 'charter' ? (
                        <button
                          onClick={() => handleBookAircraft(aircraft)}
                          className="px-6 py-3 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all shadow-md"
                        >
                          BOOK CHARTER FLIGHT
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            openEnquiry({
                              title: `Acquisition Prospectus: ${aircraft.name}`,
                              subtitle: 'Receive complete logbooks, avionics documentation, and bilateral purchase contract.',
                              assetTitle: aircraft.name,
                              defaultVertical: 'Private Aviation',
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

        {/* Bottom Operator Banner */}
        <div className="mt-20 p-8 sm:p-12 bg-[#061C16] text-[#FCFBF7] border border-[#C6A15B]/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] block">
              AIRCRAFT OWNERS &amp; OPERATORS
            </span>
            <h3 className="font-serif text-2xl font-light text-white">
              List Your Aircraft or Manage Charter Requests
            </h3>
            <p className="text-xs text-[#D8D3C8]/70 font-light max-w-xl">
              Are you an aircraft owner, Part 135 operator, or independent aviation broker? Connect your fleet to view incoming client route requests and submit private proposals.
            </p>
          </div>

          <Link
            href="/portal"
            className="px-8 py-3.5 bg-[#FCFBF7] text-[#061C16] text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] transition-all whitespace-nowrap"
          >
            ENTER OWNER &amp; BROKER PORTAL
          </Link>
        </div>
      </div>

      {/* Interactive Modal */}
      <AviationCharterModal
        isOpen={charterModalOpen}
        onClose={() => setCharterModalOpen(false)}
        prefillRoute={selectedRoute}
        prefillAircraft={selectedAircraftForModal}
        prefillMission={selectedMissionForModal}
      />
    </div>
  );
}
