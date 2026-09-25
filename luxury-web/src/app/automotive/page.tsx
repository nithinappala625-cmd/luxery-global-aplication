'use client';

import { useState } from 'react';
import { Car, Gauge, Zap, Shield, ArrowRight, ShieldCheck, UserCheck, Globe } from 'lucide-react';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import { useCountry } from '@/lib/countryContext';
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
  usdPrice: number;
  isPoa?: boolean;
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
    usdPrice: 4650000,
    imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop',
    sellerName: 'Helmut V. · Zurich Hypercar Consignments',
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
    usdPrice: 52000000,
    isPoa: true,
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop',
    sellerName: 'Lord Alistair Sterling · Historic Motorcar Trust',
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
    usdPrice: 850000,
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
    sellerName: 'Royal Motors Heritage Dealership',
    sellerType: 'authorized_dealer',
    sellerLocation: 'London / Dubai / Mumbai',
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
    usdPrice: 4800000,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
    sellerName: 'Scandinavia Exotic Desk · Erik Lindqvist',
    sellerType: 'independent_broker',
    sellerLocation: 'Stockholm / Geneva',
    provenance: 'Pre-allocation slot with bespoke interior configuration open.',
  },
  {
    id: 'pagani-huayra-roadster-bc',
    name: 'Pagani Huayra Roadster BC Carbon Titânio',
    category: 'bespoke',
    typeLabel: 'Hand-Crafted One-Off Carbo-Triax Art Piece',
    tagline: '1 of only 40 units handcrafted in San Cesario sul Panaro. Dry weight only 1,250 kg.',
    engine: 'Mercedes-AMG 6.0-Litre Twin-Turbo 60° V12',
    power: '791 BHP / 1,050 Nm Torque',
    acceleration: '0-100 km/h in 2.8 seconds',
    topSpeed: '238 mph (383 km/h)',
    chassisInfo: 'Chassis #08 of 40 · Bespoke Matte Blue Carbon',
    usdPrice: 4200000,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    sellerName: 'Horacio Syndicate Partner · Matteo Rossi',
    sellerType: 'independent_broker',
    sellerLocation: 'Milan / Monaco',
    provenance: 'Factory delivery certification, museum preserved, all telemetry logged.',
  },
  {
    id: 'mercedes-300sl-gullwing',
    name: 'Mercedes-Benz 300 SL Gullwing (1955)',
    category: 'vintage',
    typeLabel: 'Concours D\'Elegance Award-Winning Icon',
    tagline: 'Direct fuel injection mechanical masterpiece. Factory Rudge knock-off wheels and fitted leather luggage.',
    engine: '3.0-Litre M198 Overhead Cam Inline-6',
    power: '240 BHP at 6,100 rpm',
    acceleration: '0-100 km/h in 7.0 seconds',
    topSpeed: '161 mph (260 km/h)',
    chassisInfo: 'Matching Engine & Body Numbers · Silver DB180',
    usdPrice: 2200000,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
    sellerName: 'Classic Star Heritage Vault',
    sellerType: 'private_collector',
    sellerLocation: 'Stuttgart / Zurich',
    provenance: 'Pebble Beach Concours participant, documented restoration by Mercedes-Benz Classic Center.',
  },
];

export default function AutomotivePage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'exotic' | 'limousine' | 'vintage' | 'bespoke'>('all');
  const { openEnquiry } = useLuxuryUI();
  const { country, formatPrice } = useCountry();

  const filteredCars = hypercars.filter((car) => {
    if (selectedCategory === 'all') return true;
    return car.category === selectedCategory;
  });

  return (
    <div className="bg-[#FCFBF7] text-[#080B09] min-h-screen pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Global Awareness Bar */}
        <div className="mb-6 p-4 rounded-xl bg-[#061C16] border border-[#C6A15B]/40 text-white flex flex-wrap items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{country.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-bold">
                  Sovereign Motorcar Desk
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[9px] font-mono uppercase">
                  Classiche Verified
                </span>
              </div>
              <p className="text-xs sm:text-sm font-serif font-bold text-white mt-0.5">
                {country.name} · Direct Bilateral Escrow in {country.currency}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[9px] uppercase tracking-wider text-[#F6F3EA]/60 block font-mono">
                Currency Conversion
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

        {/* Header Section with Rich High-Contrast Typography */}
        <div className="text-center max-w-4xl mx-auto py-8 sm:py-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#7A5410] font-extrabold bg-[#F5EEDB] px-3.5 py-1 rounded-full border border-[#C6A15B]/30">
            <Car className="w-3.5 h-3.5 text-[#7A5410]" />
            <span>EXOTIC HYPERCARS &amp; VINTAGE INVESTMENTS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#061C16] tracking-tight leading-none drop-shadow-sm">
            LUXURY AUTOMOTIVE
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#143327] font-semibold italic">
            Homologation Specials, Coachbuilt One-Offs, Racing Provenance, and Executive Limousines.
          </p>

          <p className="text-xs sm:text-sm text-[#1A2E24] font-medium leading-relaxed max-w-2xl mx-auto pt-2">
            Independent private collector consignments, factory allocation transfers, and certified historic competition cars with Ferrari Classiche and manufacturer red books.
          </p>
        </div>

        {/* Subcategories Filter */}
        <div className="flex items-center justify-between border-b border-[#D0C9BA] pb-4 mb-10 overflow-x-auto gap-4">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Motorcars' },
              { id: 'exotic', label: 'Racing Exotics & Hypercars' },
              { id: 'limousine', label: 'Bespoke Limousines' },
              { id: 'vintage', label: 'Vintage Classics' },
              { id: 'bespoke', label: 'One-Off Commissions' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all rounded ${
                  selectedCategory === cat.id
                    ? 'bg-[#061C16] text-[#F3E2B8]'
                    : 'bg-white text-[#061C16] border border-[#D0C9BA] hover:border-[#061C16]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#3C4E44] font-bold whitespace-nowrap bg-[#EFECE4] px-3 py-1 rounded-full">
            {filteredCars.length} Certified Chassis Listed
          </span>
        </div>

        {/* Automotive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white border-2 border-[#D8D3C8] hover:border-[#061C16] rounded-2xl transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Image Section */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#061C16]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url('${car.imageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04130D]/95 via-transparent to-black/30" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#061C16]/95 border border-[#C6A15B] text-[#E8D48A] text-[10px] font-bold uppercase tracking-[0.2em] rounded backdrop-blur-sm shadow">
                    {car.typeLabel}
                  </span>
                  <span className="px-2.5 py-1 bg-black/80 border border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded">
                    {car.topSpeed}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                  <div className="flex items-center gap-1.5 drop-shadow">
                    <Zap className="w-4 h-4 text-[#E8D48A]" />
                    <span>{car.power}</span>
                  </div>
                  <div className="flex items-center gap-1.5 drop-shadow">
                    <Gauge className="w-4 h-4 text-[#E8D48A]" />
                    <span>0-100: {car.acceleration}</span>
                  </div>
                </div>
              </div>

              {/* Content Section with High-Contrast Typography */}
              <div className="p-7 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Consignor Badge */}
                  <div className="p-3 bg-[#F9F8F5] border border-[#D0C9BA] rounded-lg flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-[#061C16]">
                      <UserCheck className="w-4 h-4 text-[#7A5410]" />
                      <span className="font-bold">{car.sellerName}</span>
                    </div>
                    <span className="text-[#7A5410] font-bold">{car.sellerLocation}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl sm:text-[1.85rem] font-bold text-[#061C16] leading-snug tracking-tight">
                      {car.name}
                    </h3>
                    <p className="text-[13px] sm:text-sm text-[#1F2C24] font-medium leading-relaxed mt-2">
                      {car.tagline}
                    </p>
                  </div>

                  {/* Specifications Card */}
                  <div className="bg-[#F9F8F5] border border-[#D0C9BA] rounded-xl p-4 sm:p-5 text-xs space-y-2.5 shadow-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#4D6055] font-bold block mb-0.5">
                          POWERPLANT:
                        </span>
                        <span className="font-bold text-[#061C16] text-xs sm:text-[13px] block">
                          {car.engine}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#4D6055] font-bold block mb-0.5">
                          CHASSIS PROVENANCE:
                        </span>
                        <span className="font-bold text-[#061C16] text-xs sm:text-[13px] block">
                          {car.chassisInfo}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#D0C9BA]">
                      <span className="text-[9px] uppercase tracking-wider text-[#4D6055] font-bold block mb-0.5">
                        DOCUMENTED HISTORY:
                      </span>
                      <p className="text-[11px] text-[#203127] font-medium italic">
                        {car.provenance}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price & Action Bar */}
                <div className="pt-6 border-t border-[#D0C9BA] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#4D6055] font-bold block mb-0.5">
                      ACQUISITION VALUATION
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#061C16] tracking-tight">
                        {car.isPoa ? 'PRICE ON APPLICATION' : formatPrice(car.usdPrice)}
                      </span>
                      {!car.isPoa && (
                        <span className="text-[10px] text-[#7A5410] font-mono font-bold bg-[#F5EEDB] px-2 py-0.5 rounded border border-[#C6A15B]/30">
                          {country.currency}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      openEnquiry({
                        title: `Acquisition Mandate: ${car.name}`,
                        subtitle: `${car.chassisInfo}. Direct bilateral negotiation with ${car.sellerName}. Title escrow and enclosed transport.`,
                        assetTitle: car.name,
                        defaultVertical: 'Automotive & Hypercars',
                      })
                    }
                    className="px-6 py-3.5 bg-[#061C16] hover:bg-[#0D382A] text-[#F3E2B8] hover:text-white text-[11px] uppercase tracking-[0.2em] font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 rounded border border-[#C6A15B]/40"
                  >
                    REQUEST CHASSIS DOSSIER
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
