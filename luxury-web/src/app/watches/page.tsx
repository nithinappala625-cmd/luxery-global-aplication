'use client';

import { useState } from 'react';
import { Watch, Search, ShieldCheck, UserCheck, Check, ArrowRight, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import Link from 'next/link';

interface WatchItem {
  id: string;
  brand: string;
  model: string;
  reference: string;
  tagline: string;
  price: number;
  priceFormatted: string;
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
    tagline: 'The most complicated wrist watch in regular production. 20 complications, reversible white gold case.',
    price: 325000000,
    priceFormatted: '₹32.5 Cr ($3,900,000)',
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
    sellerName: 'Laurent Mercier &middot; Independent Horology Broker',
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
    price: 9500000,
    priceFormatted: '₹95 Lakhs ($115,000)',
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
    sellerName: 'Vikram K. &middot; Private Vault Collector',
    sellerType: 'private_collector',
    sellerLocation: 'Mumbai &middot; Bandra Kurla',
    sellerRating: 4.96,
  },
  {
    id: 'ap-royal-oak-jumbo-16202ba',
    brand: 'Audemars Piguet',
    model: 'Royal Oak "Jumbo" Extra-Thin 18K Yellow Gold',
    reference: 'Ref. 16202BA.OO.1240BA.01',
    tagline: '50th Anniversary tribute in solid 18K yellow gold with smoke yellow-gold Petite Tapisserie dial.',
    price: 8800000,
    priceFormatted: '₹88 Lakhs ($106,000)',
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
    sellerName: 'Philippe Laurent &middot; Independent Watch Consignor',
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
    price: 24500000,
    priceFormatted: '₹2.45 Cr ($295,000)',
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
    tagline: 'The ultimate luxury sports icon. Discontinued reference with high investment appreciation.',
    price: 13500000,
    priceFormatted: '₹1.35 Cr ($162,000)',
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
    sellerName: 'Kunal Zaveri &middot; Private Collector',
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
    price: 11800000,
    priceFormatted: '₹1.18 Cr ($142,000)',
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
    sellerName: 'Laurent Mercier &middot; Independent Horology Broker',
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

  const brands = ['All', 'Patek Philippe', 'Rolex', 'Audemars Piguet', 'Richard Mille', 'Vacheron Constantin'];

  const filteredWatches = watchInventory
    .filter((w) => {
      const matchBrand = selectedBrand === 'All' || w.brand === selectedBrand;
      const matchSearch =
        w.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchBrand && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
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
              STRICTLY FOR SALE &middot; ZERO RENTAL &middot; SWISS VAULT CUSTODY
            </span>
          </div>
        </div>

        {/* Watches Header */}
        <div className="relative bg-[#061C16] text-[#FCFBF7] p-8 sm:p-14 mb-12 border border-[#C6A15B]/20 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6A15B]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium">
              <Watch className="w-3.5 h-3.5" />
              <span>HAUTE HORLOGERIE &amp; GRAND COMPLICATIONS</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-tight leading-[1.08]">
              Luxury Timepieces &middot; Sales Only
            </h1>

            <p className="text-sm sm:text-base text-[#D8D3C8]/85 font-light leading-relaxed max-w-2xl">
              Authentic luxury timepieces from verified independent horology brokers and private collectors worldwide. Every timepiece is physically inspected and backed by complete provenance papers.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#C6A15B]">
              <ShieldCheck className="w-4 h-4" />
              <span>Independent Broker &amp; Private Collector Verified Inventory &middot; Escrow Protection Guaranteed</span>
            </div>
          </div>
        </div>

        {/* E-Commerce Search & Filter Bar (Flipkart / Amazon style layout with luxury aesthetic) */}
        <div className="bg-white border border-[#D8D3C8] p-6 mb-10 shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#9D7B3E]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reference, model, or broker name..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FCFBF7] border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
              />
            </div>

            {/* Price Sort & Counter */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <span className="text-xs text-[#080B09]/60 font-light">
                Showing <strong>{filteredWatches.length}</strong> authenticated timepieces
              </span>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#9D7B3E]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-[#FCFBF7] border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                >
                  <option value="featured">Sort by: Curated Featured</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Brand Pills Filter Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-[#D8D3C8]/60 pt-4">
            <span className="text-[10px] uppercase tracking-widest text-[#080B09]/50 font-medium mr-2 whitespace-nowrap">
              Manufacture:
            </span>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-4 py-1.5 text-[11px] uppercase tracking-wider font-medium whitespace-nowrap transition-all ${
                  selectedBrand === b
                    ? 'bg-[#061C16] text-[#FCFBF7]'
                    : 'bg-[#FCFBF7] text-[#080B09]/70 border border-[#D8D3C8] hover:border-[#061C16]'
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
              className="group bg-white border border-[#D8D3C8] hover:border-[#061C16] transition-all duration-500 hover:shadow-xl flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Watch Image Banner */}
                <div className="relative aspect-square overflow-hidden bg-[#061C16]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url('${watch.imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061C16]/80 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-[#061C16]/90 border border-[#C6A15B]/30 text-[#C6A15B] text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm">
                      {watch.condition}
                    </span>
                    <span className="px-2.5 py-1 bg-black/60 border border-white/20 text-white text-[9px] uppercase tracking-widest font-mono">
                      {watch.reference}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white text-[10px] tracking-widest uppercase flex items-center justify-between">
                    <span>{watch.caseMaterial}</span>
                    <span>{watch.caseDiameter}</span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 space-y-4">
                  {/* Seller / Independent Broker Card */}
                  <div className="p-2.5 bg-[#FCFBF7] border border-[#D8D3C8]/70 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5 text-[#061C16]">
                      <UserCheck className="w-3.5 h-3.5 text-[#9D7B3E]" />
                      <span className="font-semibold">{watch.sellerName}</span>
                    </div>
                    <span className="text-[#9D7B3E] font-medium">{watch.sellerLocation}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#9D7B3E] font-semibold block">
                      {watch.brand}
                    </span>
                    <h3 className="font-serif text-xl font-light text-[#061C16] leading-snug mt-0.5">
                      {watch.model}
                    </h3>
                    <p className="text-xs text-[#080B09]/70 font-light leading-relaxed mt-1.5 line-clamp-2">
                      {watch.tagline}
                    </p>
                  </div>

                  {/* Complications Chips */}
                  <div className="flex flex-wrap gap-1">
                    {watch.complications.slice(0, 3).map((comp, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-[#FCFBF7] border border-[#D8D3C8] text-[9px] text-[#080B09]/80"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Buy Action Bar */}
              <div className="p-6 pt-0 border-t border-[#D8D3C8]/60 mt-4">
                <div className="pt-4 flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-[#080B09]/50 block">SALE PRICE</span>
                    <span className="font-serif text-xl font-semibold text-[#061C16]">{watch.priceFormatted}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5">
                    In Stock &middot; Ready for Transit
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      openEnquiry({
                        title: `Purchase Acquisition: ${watch.brand} ${watch.model}`,
                        subtitle: `Connect with consignor ${watch.sellerName}. Immediate Swiss/Geneva vault escrow release.`,
                        assetTitle: `${watch.brand} ${watch.model} (${watch.reference})`,
                        defaultVertical: 'Jewellery & Horology',
                      })
                    }
                    className="w-full py-2.5 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all text-center"
                  >
                    INQUIRE TO BUY
                  </button>
                  <Link
                    href={`/listings/${watch.id}`}
                    className="w-full py-2.5 border border-[#D8D3C8] text-[#080B09] text-[10px] uppercase tracking-[0.2em] font-medium hover:border-[#061C16] transition-all text-center flex items-center justify-center gap-1"
                  >
                    <span>SPEC SHEET</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Independent Watch Broker Onboarding Callout */}
        <div className="mt-20 p-8 sm:p-12 bg-[#061C16] text-[#FCFBF7] border border-[#C6A15B]/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] block">
              INDEPENDENT WATCH BROKERS &amp; PRIVATE COLLECTORS
            </span>
            <h3 className="font-serif text-2xl font-light text-white">
              List Your Timepieces for Global Bilateral Sale
            </h3>
            <p className="text-xs text-[#D8D3C8]/70 font-light max-w-xl">
              Individual brokers and private collectors can list timepieces directly on NP GROUPS without company incorporation. Direct client escrow and zero marketplace listing fees.
            </p>
          </div>

          <Link
            href="/portal"
            className="px-8 py-3.5 bg-[#FCFBF7] text-[#061C16] text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] transition-all whitespace-nowrap"
          >
            LIST TIMEPIECE AS BROKER
          </Link>
        </div>
      </div>
    </div>
  );
}
