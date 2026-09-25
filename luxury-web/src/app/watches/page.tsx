'use client';

import { useState } from 'react';
import { Watch, Search, ShieldCheck, UserCheck, Check, ArrowRight, SlidersHorizontal, ArrowUpDown, Globe } from 'lucide-react';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import { useCountry } from '@/lib/countryContext';
import Link from 'next/link';

interface WatchItem {
  id: string;
  brand: string;
  model: string;
  reference: string;
  tagline: string;
  usdPrice: number;
  year: string;
  caseMaterial: string;
  caseDiameter: string;
  dialColor: string;
  movement: string;
  complications: string[];
  condition: 'Unworn 2024 (Full Set)' | 'Mint / Box & Papers' | 'Vintage Historical';
  boxAndPapers: boolean;
  warranty: string;
  imageUrl: string;
  sellerName: string;
  sellerType: 'independent_broker' | 'private_collector' | 'authorized_dealer';
  sellerLocation: string;
  sellerRating: number;
}

const watchInventory: WatchItem[] = [
  {
    id: 'patek-6300g',
    brand: 'Patek Philippe',
    model: 'Grandmaster Chime 6300G-010',
    reference: 'Ref. 6300G',
    tagline: 'The most complicated wristwatch in regular production. 20 complications, reversible white gold case.',
    usdPrice: 3900000,
    year: '2023',
    caseMaterial: '18K White Gold Hand-Guilloché',
    caseDiameter: '47.7 mm',
    dialColor: 'Opaline Black & White Reversible',
    movement: 'Manual Calibre 300 GS AL 36-750 QIS FUS IRM',
    complications: ['Grande Sonnerie', 'Petite Sonnerie', 'Minute Repeater', 'Perpetual Calendar', 'Alarm'],
    condition: 'Unworn 2024 (Full Set)',
    boxAndPapers: true,
    warranty: 'Factory Sealed Double Boxed & Certificate of Origin',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    sellerName: 'Laurent Mercier · Independent Horology Broker',
    sellerType: 'independent_broker',
    sellerLocation: 'Geneva / Zurich',
    sellerRating: 5.0,
  },
  {
    id: 'rolex-daytona-116506',
    brand: 'Rolex',
    model: 'Cosmograph Daytona Platinum Ice Blue Dial',
    reference: 'Ref. 116506-0002',
    tagline: 'Solid 950 Platinum with iconic ice blue sunray dial and chestnut brown Cerachrom bezel.',
    usdPrice: 115000,
    year: '2024',
    caseMaterial: '950 Platinum',
    caseDiameter: '40 mm',
    dialColor: 'Ice Blue Baguette Diamond Hour Markers',
    movement: 'Automatic Calibre 4130',
    complications: ['Column-Wheel Chronograph', 'Tachymetric Scale'],
    condition: 'Unworn 2024 (Full Set)',
    boxAndPapers: true,
    warranty: '5-Year International Rolex Factory Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=800&auto=format&fit=crop',
    sellerName: 'Vikram K. · Private Vault Collector',
    sellerType: 'private_collector',
    sellerLocation: 'Mumbai · Bandra Kurla',
    sellerRating: 4.96,
  },
  {
    id: 'ap-royal-oak-jumbo-16202ba',
    brand: 'Audemars Piguet',
    model: 'Royal Oak "Jumbo" Extra-Thin 18K Yellow Gold',
    reference: 'Ref. 16202BA.OO.1240BA.01',
    tagline: '50th Anniversary tribute in solid 18K yellow gold with smoked yellow-gold Petite Tapisserie dial.',
    usdPrice: 106000,
    year: '2023',
    caseMaterial: '18K Yellow Gold',
    caseDiameter: '39 mm',
    dialColor: 'Smoked Yellow Gold Petite Tapisserie',
    movement: 'Selfwinding Calibre 7121',
    complications: ['Hours, Minutes, Date', 'Extra-Thin 8.1mm'],
    condition: 'Unworn 2024 (Full Set)',
    boxAndPapers: true,
    warranty: 'Audemars Piguet Extended 5-Year Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop',
    sellerName: 'Philippe Laurent · Independent Watch Consignor',
    sellerType: 'independent_broker',
    sellerLocation: 'Monaco / London',
    sellerRating: 4.98,
  },
  {
    id: 'richard-mille-rm-11-03',
    brand: 'Richard Mille',
    model: 'RM 11-03 Flyback Chronograph Titanium',
    reference: 'Ref. RM 11-03 Ti',
    tagline: 'Ergonomic tonneau architecture with variable-geometry skeletonized rotor and countdown timer.',
    usdPrice: 295000,
    year: '2022',
    caseMaterial: 'Grade 5 Titanium',
    caseDiameter: '44.5 x 49.9 mm',
    dialColor: 'Skeletonized Sapphire Crystal',
    movement: 'Automatic Calibre RMAC3',
    complications: ['Flyback Chronograph', 'Annual Calendar', 'Oversize Date'],
    condition: 'Mint / Box & Papers',
    boxAndPapers: true,
    warranty: 'Richard Mille Certified Pre-Owned Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=800&auto=format&fit=crop',
    sellerName: 'Geneva Chrono Syndicate Ltd',
    sellerType: 'authorized_dealer',
    sellerLocation: 'Geneva / Dubai',
    sellerRating: 4.94,
  },
  {
    id: 'patek-5711-1r',
    brand: 'Patek Philippe',
    model: 'Nautilus 5711/1R-001 Rose Gold Chocolate Dial',
    reference: 'Ref. 5711/1R',
    tagline: 'The ultimate luxury sports icon. Discontinued reference with strong international secondary liquidity.',
    usdPrice: 162000,
    year: '2021',
    caseMaterial: '18K Rose Gold',
    caseDiameter: '40 mm',
    dialColor: 'Light/Dark Brown Gradated Dial',
    movement: 'Automatic Calibre 26-330 S C',
    complications: ['Date, Sweep Seconds'],
    condition: 'Mint / Box & Papers',
    boxAndPapers: true,
    warranty: 'Complete Original Set, Patek Certificate of Origin',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    sellerName: 'Kunal Zaveri · Private Collector',
    sellerType: 'private_collector',
    sellerLocation: 'Mumbai / Antwerp',
    sellerRating: 4.97,
  },
  {
    id: 'vacheron-overseas-tourbillon',
    brand: 'Vacheron Constantin',
    model: 'Overseas Tourbillon Ultra-Thin Blue Lacquer',
    reference: 'Ref. 6000V/110A-B544',
    tagline: 'Maltese cross tourbillon cage at 6 o\'clock with peripheral rotor and quick-change interchangeable straps.',
    usdPrice: 142000,
    year: '2023',
    caseMaterial: 'Stainless Steel',
    caseDiameter: '42.5 mm',
    dialColor: 'Translucent Blue Lacquer Dial',
    movement: 'Automatic Calibre 2160 (Hallmark of Geneva)',
    complications: ['Tourbillon', 'Ultra-Thin 10.39mm', 'Interchangeable Straps'],
    condition: 'Unworn 2024 (Full Set)',
    boxAndPapers: true,
    warranty: 'Vacheron Constantin 8-Year Passport Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?q=80&w=800&auto=format&fit=crop',
    sellerName: 'Laurent Mercier · Independent Horology Broker',
    sellerType: 'independent_broker',
    sellerLocation: 'Geneva / Paris',
    sellerRating: 5.0,
  },
];

export default function WatchesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const { openEnquiry } = useLuxuryUI();
  const { country, formatPrice } = useCountry();

  const brands = ['All', 'Patek Philippe', 'Rolex', 'Audemars Piguet', 'Richard Mille', 'Vacheron Constantin'];

  const filteredWatches = watchInventory
    .filter((w) => {
      const matchesBrand = selectedBrand === 'All' || w.brand === selectedBrand;
      const matchesSearch =
        w.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesBrand && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.usdPrice - b.usdPrice;
      if (sortBy === 'price-desc') return b.usdPrice - a.usdPrice;
      return 0;
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
                  Sovereign Horology Desk
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[9px] font-mono uppercase font-bold">
                  STRICTLY SALES ONLY &middot; ZERO RENTAL
                </span>
              </div>
              <p className="text-xs sm:text-sm font-serif font-bold text-white mt-0.5">
                {country.name} · Curated Vault Deliveries in {country.currency}
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

        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto py-8 sm:py-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#7A5410] font-extrabold bg-[#F5EEDB] px-3.5 py-1 rounded-full border border-[#C6A15B]/30">
            <Watch className="w-3.5 h-3.5 text-[#7A5410]" />
            <span>CERTIFIED HAUTE HOROLOGY SALON</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#061C16] tracking-tight leading-none drop-shadow-sm">
            HAUTE HOROLOGY &amp; TIMEPIECES
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#143327] font-semibold italic">
            Physical Vault In-Stock Timepieces, Independent Master Watchmakers, and Bilateral Private Treaty.
          </p>

          <p className="text-xs sm:text-sm text-[#1A2E24] font-medium leading-relaxed max-w-2xl mx-auto pt-2">
            Every timepiece inspected by independent Swiss horologists, delivered with factory extract of archives, original presentation cases, and guaranteed authentic provenance.
          </p>
        </div>

        {/* Search, Filter & Sorter Toolbar */}
        <div className="bg-white border-2 border-[#D8D3C8] rounded-xl p-4 sm:p-6 mb-10 space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A5410]" />
              <input
                type="text"
                placeholder="Search reference, brand, complication, or broker name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F5] border border-[#D0C9BA] rounded-lg text-xs text-[#061C16] placeholder-[#7A8F83] focus:border-[#061C16] outline-none font-medium"
              />
            </div>

            {/* Price sort */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[#4D6055] font-bold whitespace-nowrap">
                SORT VALUATION:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-[#FAF9F5] border border-[#D0C9BA] rounded-lg text-xs text-[#061C16] font-bold outline-none"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* Brand pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-[#D8D3C8]">
            <span className="text-[10px] uppercase tracking-wider text-[#4D6055] font-bold mr-1 whitespace-nowrap">
              BRANDS:
            </span>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-4 py-1.5 text-[11px] uppercase tracking-wider font-bold whitespace-nowrap transition-all rounded ${
                  selectedBrand === b
                    ? 'bg-[#061C16] text-[#F3E2B8]'
                    : 'bg-[#FAF9F5] text-[#061C16] border border-[#D0C9BA] hover:border-[#061C16]'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Watches E-Commerce Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWatches.map((watch) => (
            <div
              key={watch.id}
              className="group bg-white border-2 border-[#D8D3C8] hover:border-[#061C16] rounded-2xl transition-all duration-300 hover:shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Watch Image Banner */}
                <div className="relative aspect-square overflow-hidden bg-[#061C16]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${watch.imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04130D]/80 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-[#061C16]/95 border border-[#C6A15B] text-[#E8D48A] text-[9px] font-bold uppercase tracking-[0.2em] rounded backdrop-blur-sm shadow">
                      {watch.condition}
                    </span>
                    <span className="px-2.5 py-1 bg-black/80 border border-white/20 text-white text-[9px] uppercase tracking-widest font-mono font-bold rounded">
                      {watch.reference}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white text-[10px] tracking-widest uppercase font-bold flex items-center justify-between drop-shadow">
                    <span>{watch.caseMaterial}</span>
                    <span>{watch.caseDiameter}</span>
                  </div>
                </div>

                {/* Card Content Area with High-Contrast Typography */}
                <div className="p-6 space-y-4">
                  {/* Seller / Independent Broker Card */}
                  <div className="p-3 bg-[#F9F8F5] border border-[#D0C9BA] rounded-lg flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-[#061C16]">
                      <UserCheck className="w-4 h-4 text-[#7A5410]" />
                      <span className="font-bold">{watch.sellerName}</span>
                    </div>
                    <span className="text-[#7A5410] font-bold">{watch.sellerLocation}</span>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A5410] font-extrabold block">
                      {watch.brand}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#061C16] leading-snug mt-1">
                      {watch.model}
                    </h3>
                    <p className="text-[13px] text-[#1F2C24] font-medium leading-relaxed mt-2 line-clamp-2">
                      {watch.tagline}
                    </p>
                  </div>

                  {/* Complications Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {watch.complications.slice(0, 3).map((comp, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#FAF9F5] border border-[#D0C9BA] text-[10px] font-bold text-[#061C16] rounded"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Buy Action Bar */}
              <div className="p-6 pt-0 border-t border-[#D8D3C8] mt-4">
                <div className="pt-4 flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#4D6055] font-bold block mb-0.5">
                      SALE VALUATION
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-extrabold text-[#061C16] tracking-tight">
                        {formatPrice(watch.usdPrice)}
                      </span>
                      <span className="text-[9px] text-[#7A5410] font-mono font-bold bg-[#F5EEDB] px-1.5 py-0.5 rounded border border-[#C6A15B]/30">
                        {country.currency}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded font-bold">
                    Vault Certified
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      openEnquiry({
                        title: `Acquisition Order: ${watch.brand} ${watch.model}`,
                        subtitle: `Reference ${watch.reference}. Valuation: ${formatPrice(watch.usdPrice)}. Ready for private vault dispatch or insured transit.`,
                        assetTitle: `${watch.brand} ${watch.model} (${watch.reference})`,
                        defaultVertical: 'Luxury Watches',
                      })
                    }
                    className="py-3 bg-[#061C16] hover:bg-[#0D382A] text-[#F3E2B8] hover:text-white text-[11px] font-bold uppercase tracking-wider text-center rounded transition-all shadow"
                  >
                    BUY NOW
                  </button>

                  <button
                    onClick={() =>
                      openEnquiry({
                        title: `Consignor Direct Message: ${watch.sellerName}`,
                        subtitle: `Inquiring about ${watch.brand} ${watch.model} (${watch.reference}) located in ${watch.sellerLocation}.`,
                        assetTitle: `${watch.brand} ${watch.model}`,
                        defaultVertical: 'Luxury Watches',
                      })
                    }
                    className="py-3 bg-white hover:bg-[#FAF9F5] border border-[#061C16] text-[#061C16] text-[11px] font-bold uppercase tracking-wider text-center rounded transition-all"
                  >
                    CONTACT BROKER
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
