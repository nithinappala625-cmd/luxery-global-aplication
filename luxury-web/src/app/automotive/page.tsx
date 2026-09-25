'use client';

import { useState } from 'react';
import { Car, Gauge, Zap, Shield, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import Link from 'next/link';

interface CarModel {
  id: string;
  name: string;
  category: 'exotic' | 'limousine' | 'vintage' | 'bespoke';
  typeLabel: string;
  tagline: string;
  engine: string;
  power: string;
  acceleration: string;
  topSpeed: string;
  chassisInfo: string;
  priceFormatted: string;
  imageUrl: string;
  sellerName: string;
  sellerType: 'independent_broker' | 'authorized_dealer' | 'private_collector';
  sellerLocation: string;
  provenance: string;
}

const hypercars: CarModel[] = [
  {
    id: 'bugatti-chiron-super-sport',
    name: 'Bugatti Chiron Super Sport 300+',
    category: 'exotic',
    typeLabel: 'Limited Production World Record Hypercar',
    tagline: '1 of only 30 units produced worldwide. Bare carbon weave with Jet Orange racing stripes.',
    engine: '8.0-Litre Quad-Turbocharged W16',
    power: '1,600 PS (1,578 HP)',
    acceleration: '0-100 km/h in 2.4 seconds',
    topSpeed: '304.77 mph (490.48 km/h)',
    chassisInfo: 'Chassis #14 of 30 · European Delivery',
    priceFormatted: '₹42 Cr (€4,650,000)',
    imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop',
    sellerName: 'Helmut V. &middot; Zurich Hypercar Consignments',
    sellerType: 'independent_broker',
    sellerLocation: 'Zurich / Monaco',
    provenance: 'Single owner from new, Molsheim certified, zero track use.',
  },
  {
    id: 'ferrari-250-gto-1962',
    name: 'Ferrari 250 GTO Series I (1962)',
    category: 'vintage',
    typeLabel: 'Historical Competition Icon · Matching Numbers',
    tagline: 'The Holy Grail of motor racing. Period Le Mans and Targa Florio competition provenance.',
    engine: 'Tipo 168/62 Comp. 3.0-Litre Colombo V12 (300 HP)',
    power: '300 BHP at 7,500 rpm',
    acceleration: '0-100 km/h in 5.4 seconds',
    topSpeed: '174 mph (280 km/h)',
    chassisInfo: 'Ferrari Classiche Red Book Certified',
    priceFormatted: 'PRICE ON REQUEST (POA)',
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop',
    sellerName: 'Lord Alistair Sterling &middot; Historic Motorcar Trust',
    sellerType: 'private_collector',
    sellerLocation: 'London / Goodwood',
    provenance: 'Continuous documented history since 1962, original Scaglietti bodywork.',
  },
  {
    id: 'rolls-royce-phantom-viii',
    name: 'Rolls-Royce Phantom VIII Extended Starlight',
    category: 'limousine',
    typeLabel: 'Extended Wheelbase Bespoke Limousine',
    tagline: 'The ultimate sanctuary of prestige. Fiber-optic shooting star headliner and rear theater lounge.',
    engine: '6.75-Litre Twin-Turbo V12',
    power: '563 BHP / 900 Nm Torque',
    acceleration: '0-100 km/h in 5.3 seconds',
    topSpeed: '155 mph (250 km/h Governed)',
    chassisInfo: 'Bespoke Commission · 2024 Unregistered',
    priceFormatted: '₹12.5 Cr (All Taxes & Customs Included)',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
    sellerName: 'Royal Motors Heritage Dealership',
    sellerType: 'authorized_dealer',
    sellerLocation: 'Mumbai / Dubai',
    provenance: 'Factory delivery, zero kilometers, privacy suite with electrochromic partition glass.',
  },
  {
    id: 'koenigsegg-jesko-absolut',
    name: 'Koenigsegg Jesko Absolut High-Downforce',
    category: 'exotic',
    typeLabel: 'Top Speed Theoretical Record Holder',
    tagline: 'Light Speed Transmission (LST) with 9 forward gears and twin-turbo flat-plane V8.',
    engine: '5.0-Litre Twin-Turbo V8 (E85 Biofuel compatible)',
    power: '1,600 BHP (on E85)',
    acceleration: '0-100 km/h in 2.5 seconds',
    topSpeed: '330+ mph (Theoretical)',
    chassisInfo: '1 of 125 Allocations Worldwide',
    priceFormatted: '₹38 Cr ($4,800,000)',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
    sellerName: 'Scandinavia Exotic Desk &middot; Erik Lindqvist',
    sellerType: 'independent_broker',
    sellerLocation: 'Stockholm / Geneva',
    provenance: 'Pre-allocation slot with bespoke interior configuration open.',
  },
  {
    id: 'pagani-huayra-roadster-bc',
    name: 'Pagani Huayra Roadster BC Carbonio',
    category: 'bespoke',
    typeLabel: '1 of 40 Coachbuilt Open-Top Masterworks',
    tagline: 'Carbo-Triax HP62 monocoque and bespoke Mercedes-AMG V12 bi-turbo power.',
    engine: 'Mercedes-AMG 6.0-Litre Twin-Turbo V12',
    power: '791 BHP / 1,050 Nm Torque',
    acceleration: '0-100 km/h in 2.8 seconds',
    topSpeed: '238 mph (383 km/h)',
    chassisInfo: 'Chassis #09 of 40',
    priceFormatted: '₹34 Cr ($4,400,000)',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    sellerName: 'Modena Atelier Privé',
    sellerType: 'independent_broker',
    sellerLocation: 'Modena / Monaco',
    provenance: 'Single owner, titanium exhaust system, full carbon visible bodywork.',
  },
  {
    id: 'mercedes-300sl-gullwing',
    name: 'Mercedes-Benz 300 SL Gullwing Coupe (1955)',
    category: 'vintage',
    typeLabel: 'Concours d\'Elegance Winner · Rudge Wheels',
    tagline: 'The world\'s first direct-injection production sports car with iconic upward-opening doors.',
    engine: '3.0-Litre Inline-6 Direct Injection (240 HP)',
    power: '240 BHP at 6,100 rpm',
    acceleration: '0-100 km/h in 7.0 seconds',
    topSpeed: '161 mph (260 km/h)',
    chassisInfo: 'Chassis #198.040.5500 · Silver / Blue Tartan',
    priceFormatted: '₹22 Cr ($2,850,000)',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
    sellerName: 'Stuttgart Classics Trust &middot; Klaus Weber',
    sellerType: 'private_collector',
    sellerLocation: 'Stuttgart / Zurich',
    provenance: 'Pebble Beach Concours entrant, factory fitted belly pans and fitted luggage.',
  },
];

export default function AutomotivePage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'exotic' | 'limousine' | 'vintage' | 'bespoke'>('all');
  const { openEnquiry } = useLuxuryUI();

  const filteredCars = hypercars.filter((car) => {
    if (selectedCategory === 'all') return true;
    return car.category === selectedCategory;
  });

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
              VERIFIED CHASSIS ARCHIVES &middot; MATCHING NUMBERS GUARANTEE
            </span>
          </div>
        </div>

        {/* Automotive Header */}
        <div className="relative bg-[#061C16] text-[#FCFBF7] p-8 sm:p-14 mb-12 border border-[#C6A15B]/20 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6A15B]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium">
              <Car className="w-3.5 h-3.5" />
              <span>SOVEREIGN AUTOMOTIVE DESK</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-tight leading-[1.08]">
              Racing Exotics, Vintage Icons &amp; Bespoke Commissions
            </h1>

            <p className="text-sm sm:text-base text-[#D8D3C8]/85 font-light leading-relaxed max-w-2xl">
              Curated acquisitions from authenticated private collectors, independent racecar brokers, and heritage dealerships in Monaco, London, Geneva, and Mumbai.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={() =>
                  openEnquiry({
                    title: 'Automotive Sourcing Mandate',
                    subtitle: 'Register your target hypercar or vintage racecar requirement with our private desk.',
                    defaultVertical: 'Automotive',
                  })
                }
                className="px-8 py-3.5 bg-[#FCFBF7] text-[#061C16] text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all shadow-md"
              >
                SUBMIT VEHICLE SOURCING MANDATE
              </button>
              <Link
                href="/portal"
                className="px-8 py-3.5 border border-[#C6A15B]/60 text-white text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-[#C6A15B]/20 transition-all"
              >
                MOTORCAR BROKER &amp; OWNER LOGIN
              </Link>
            </div>
          </div>
        </div>

        {/* Subcategories Filter */}
        <div className="flex items-center justify-between border-b border-[#D8D3C8] pb-6 mb-8 gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#061C16] text-[#FCFBF7]'
                  : 'bg-white border border-[#D8D3C8] text-[#080B09]/70 hover:border-[#061C16]'
              }`}
            >
              All Vehicles
            </button>
            <button
              onClick={() => setSelectedCategory('exotic')}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all ${
                selectedCategory === 'exotic'
                  ? 'bg-[#061C16] text-[#FCFBF7]'
                  : 'bg-white border border-[#D8D3C8] text-[#080B09]/70 hover:border-[#061C16]'
              }`}
            >
              Racing Exotics
            </button>
            <button
              onClick={() => setSelectedCategory('limousine')}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all ${
                selectedCategory === 'limousine'
                  ? 'bg-[#061C16] text-[#FCFBF7]'
                  : 'bg-white border border-[#D8D3C8] text-[#080B09]/70 hover:border-[#061C16]'
              }`}
            >
              Luxury Limousines
            </button>
            <button
              onClick={() => setSelectedCategory('vintage')}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all ${
                selectedCategory === 'vintage'
                  ? 'bg-[#061C16] text-[#FCFBF7]'
                  : 'bg-white border border-[#D8D3C8] text-[#080B09]/70 hover:border-[#061C16]'
              }`}
            >
              Vintage Classics
            </button>
            <button
              onClick={() => setSelectedCategory('bespoke')}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all ${
                selectedCategory === 'bespoke'
                  ? 'bg-[#061C16] text-[#FCFBF7]'
                  : 'bg-white border border-[#D8D3C8] text-[#080B09]/70 hover:border-[#061C16]'
              }`}
            >
              Bespoke One-Offs
            </button>
          </div>

          <span className="text-xs text-[#080B09]/60 font-light">
            {filteredCars.length} Verified Motorcars Listed
          </span>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white border border-[#D8D3C8] hover:border-[#061C16] transition-all duration-500 hover:shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#061C16]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                  style={{ backgroundImage: `url('${car.imageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061C16]/95 via-transparent to-black/30" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#061C16]/90 border border-[#C6A15B]/30 text-[#C6A15B] text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm">
                    {car.typeLabel}
                  </span>
                  <span className="px-2.5 py-1 bg-black/60 border border-white/20 text-white text-[9px] uppercase tracking-widest font-mono">
                    {car.topSpeed}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-light">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>{car.power}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>{car.acceleration}</span>
                  </div>
                </div>
              </div>

              {/* Information Panel */}
              <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Seller / Broker Badge */}
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#9D7B3E] font-medium border-b border-[#D8D3C8]/60 pb-3">
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>CONSIGNOR: {car.sellerName}</span>
                    </span>
                    <span>{car.sellerLocation}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-light text-[#061C16] leading-snug">
                      {car.name}
                    </h3>
                    <p className="text-xs text-[#080B09]/75 font-light leading-relaxed mt-2">
                      {car.tagline}
                    </p>
                  </div>

                  {/* Engine & Chassis Box */}
                  <div className="bg-[#FCFBF7] border border-[#D8D3C8] p-4 text-xs space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#080B09]/50 block">ENGINE SPEC:</span>
                        <span className="font-medium text-[#061C16] text-[11px]">{car.engine}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#080B09]/50 block">CHASSIS &amp; ORIGIN:</span>
                        <span className="font-medium text-[#061C16] text-[11px]">{car.chassisInfo}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-[#D8D3C8]/60 text-[11px] text-[#080B09]/70 font-light">
                      <span className="font-medium text-[#061C16]">Provenance: </span>
                      {car.provenance}
                    </div>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-6 border-t border-[#D8D3C8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#080B09]/50 block">
                      PURCHASE VALUATION
                    </span>
                    <span className="font-serif text-xl font-medium text-[#061C16]">
                      {car.priceFormatted}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      openEnquiry({
                        title: `Private Viewing & Dossier: ${car.name}`,
                        subtitle: 'Schedule physical inspection or private track evaluation with the consignor.',
                        assetTitle: car.name,
                        defaultVertical: 'Automotive',
                      })
                    }
                    className="px-6 py-3 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all shadow-md"
                  >
                    REQUEST INSPECTION &amp; DOSSIER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
