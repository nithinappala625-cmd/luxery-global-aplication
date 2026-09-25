'use client';

import { useState } from 'react';
import { Gem, Search, ShieldCheck, UserCheck, ArrowRight, ArrowUpDown, Award, CheckCircle2 } from 'lucide-react';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import Link from 'next/link';

interface DiamondItem {
  id: string;
  title: string;
  category: 'natural_diamond' | 'fancy_colored' | 'rare_gem' | 'gold_bullion';
  shape: string;
  carat: string;
  colorGrade: string;
  clarityGrade: string;
  cutGrade: string;
  polishAndSymmetry: string;
  fluorescence: string;
  labCertificate: string; // e.g. GIA 2185940021
  priceFormatted: string;
  priceRaw: number;
  tagline: string;
  imageUrl: string;
  brokerName: string;
  brokerType: 'independent_diamond_broker' | 'sightholder' | 'private_vault';
  brokerLocation: string;
  vaultCustody: string;
}

const diamondsInventory: DiamondItem[] = [
  {
    id: 'dia-1005ct-d-flawless',
    title: '10.05 Carat Round Brilliant D-Flawless Type IIa',
    category: 'natural_diamond',
    shape: 'Round Brilliant',
    carat: '10.05 ct',
    colorGrade: 'D (Exceptional White+)',
    clarityGrade: 'FL (Flawless Internal & External)',
    cutGrade: 'Triple Excellent (Cut, Polish, Symmetry)',
    polishAndSymmetry: 'Excellent / Excellent',
    fluorescence: 'None (Inert)',
    labCertificate: 'GIA #2215894101 Monograph Report',
    priceFormatted: '₹38.5 Cr ($4,600,000)',
    priceRaw: 385000000,
    tagline: 'The rarest 0.01% of all gem-quality diamonds. Type IIa chemical purity with complete optical transparency.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    brokerName: 'Hiren Jhaveri & Sons &middot; Bharat Diamond Bourse',
    brokerType: 'sightholder',
    brokerLocation: 'Mumbai &middot; BKC / Antwerp',
    vaultCustody: 'Malca-Amit Vault, Mumbai Free Trade Zone',
  },
  {
    id: 'pink-panther-15ct',
    title: '15.20 Carat Cushion Cut Fancy Vivid Pink Diamond',
    category: 'fancy_colored',
    shape: 'Cushion Modified Brilliant',
    carat: '15.20 ct',
    colorGrade: 'Fancy Vivid Pink (Natural Pure Pink)',
    clarityGrade: 'VVS1 (Very Very Slightly Included)',
    cutGrade: 'Excellent Polish & Symmetry',
    polishAndSymmetry: 'Excellent / Very Good',
    fluorescence: 'Faint Blue',
    labCertificate: 'GIA #6193402880 Coloured Diamond Dossier',
    priceFormatted: '₹145 Cr ($17,400,000)',
    priceRaw: 1450000000,
    tagline: 'Museum-calibre colored diamond of historic proportions. Unmodified color saturation with zero secondary modifiers.',
    imageUrl: 'https://images.unsplash.com/photo-1568944729458-ce2bf7768e44?q=80&w=800&auto=format&fit=crop',
    brokerName: 'Philippe Laurent &middot; Independent Diamond Broker',
    brokerType: 'independent_diamond_broker',
    brokerLocation: 'Geneva / London',
    vaultCustody: 'Geneva Freeport Secure Vault Room',
  },
  {
    id: 'kashmir-sapphire-87ct',
    title: '8.72 Carat Royal Blue Kashmir Sapphire (Unheated)',
    category: 'rare_gem',
    shape: 'Cushion Cut',
    carat: '8.72 ct',
    colorGrade: 'Velvety Royal Blue (Cornflower)',
    clarityGrade: 'Eye Clean / High Transparency',
    cutGrade: 'Precision Faceted',
    polishAndSymmetry: 'Excellent',
    fluorescence: 'None',
    labCertificate: 'SSEF & Gübelin Gemmological Reports (No Heat)',
    priceFormatted: '₹48 Cr ($5,800,000)',
    priceRaw: 480000000,
    tagline: 'Historical old-mine Kashmir origin. Exhibiting the legendary velvety cornflower blue with dual Swiss laboratory origin certs.',
    imageUrl: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop',
    brokerName: 'Laurent Mercier &middot; Fine Gemstones Specialist',
    brokerType: 'independent_diamond_broker',
    brokerLocation: 'Zurich / Mumbai',
    vaultCustody: 'Zurich Cantonal Bank Depository',
  },
  {
    id: 'canary-yellow-22ct',
    title: '22.45 Carat Radiant Fancy Vivid Yellow "Zimbali"',
    category: 'fancy_colored',
    shape: 'Radiant Cut',
    carat: '22.45 ct',
    colorGrade: 'Fancy Vivid Yellow (Canary)',
    clarityGrade: 'IF (Internally Flawless)',
    cutGrade: 'Excellent',
    polishAndSymmetry: 'Excellent / Excellent',
    fluorescence: 'None',
    labCertificate: 'GIA #5201193309 Special Letter',
    priceFormatted: '₹32 Cr ($3,850,000)',
    priceRaw: 320000000,
    tagline: 'Electric canary saturation with internally flawless clarity. Sourced from the historical Kimberley deposits.',
    imageUrl: 'https://images.unsplash.com/photo-1612891936954-09a2c7dd53d2?q=80&w=800&auto=format&fit=crop',
    brokerName: 'Hiren Jhaveri & Sons &middot; Bharat Diamond Bourse',
    brokerType: 'sightholder',
    brokerLocation: 'Mumbai &middot; BKC',
    vaultCustody: 'BDB Central Vault Room, Bandra Kurla',
  },
  {
    id: 'pamp-suisse-gold-1kg',
    title: 'PAMP Suisse 1kg Cast Gold Bar 999.9 Fine (10x Lot)',
    category: 'gold_bullion',
    shape: 'Cast Bar',
    carat: '10 Kilograms Total (321.5 Troy Oz)',
    colorGrade: '999.9 Pure Gold (24 Karat)',
    clarityGrade: 'LBMA Good Delivery Standard',
    cutGrade: 'Assayed with Individual Serial Stamps',
    polishAndSymmetry: 'Standard Mint Finish',
    fluorescence: 'None',
    labCertificate: 'PAMP Suisse Essayeur Fondeur Certificate',
    priceFormatted: '₹7.6 Cr ($915,000)',
    priceRaw: 76000000,
    tagline: 'Ten individual LBMA-certified 1kg gold bullion bars in tamper-evident Veriscan packaging.',
    imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=800&auto=format&fit=crop',
    brokerName: 'Swiss Bullion Custody Ltd &middot; Private Vault',
    brokerType: 'private_vault',
    brokerLocation: 'Zurich / Dubai',
    vaultCustody: 'Loomis International Secure Freeport Vault',
  },
  {
    id: 'burmese-ruby-52ct',
    title: '5.20 Carat Pigeon\'s Blood Burmese Ruby (Mogok)',
    category: 'rare_gem',
    shape: 'Oval Brilliant',
    carat: '5.20 ct',
    colorGrade: 'Pigeon\'s Blood Red (No Heat)',
    clarityGrade: 'VS1 Transparency',
    cutGrade: 'Traditional Master Facet',
    polishAndSymmetry: 'Very Good',
    fluorescence: 'Strong Red UV Reaction',
    labCertificate: 'GRS Platinum Award Report #GRS2021-098841',
    priceFormatted: '₹26.5 Cr ($3,180,000)',
    priceRaw: 265000000,
    tagline: 'Untreated Mogok provenance displaying saturated chromium glow. Free of any thermal or chemical enhancement.',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    brokerName: 'Kunal Zaveri &middot; Private Gemstone Collector',
    brokerType: 'independent_diamond_broker',
    brokerLocation: 'Mumbai / Geneva',
    vaultCustody: 'Geneva Freeport',
  },
];

export default function JewelleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-desc' | 'price-asc'>('featured');
  const { openEnquiry } = useLuxuryUI();

  const filteredItems = diamondsInventory
    .filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brokerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shape.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.labCertificate.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-desc') return b.priceRaw - a.priceRaw;
      if (sortBy === 'price-asc') return a.priceRaw - b.priceRaw;
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
              STRICTLY FOR SALE &middot; ZERO RENTAL &middot; GIA CERTIFIED NATURAL DIAMONDS ONLY
            </span>
          </div>
        </div>

        {/* Diamond Header Banner */}
        <div className="relative bg-[#061C16] text-[#FCFBF7] p-8 sm:p-14 mb-12 border border-[#C6A15B]/20 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6A15B]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium">
              <Gem className="w-3.5 h-3.5" />
              <span>NATURAL DIAMONDS &amp; HAUTE JOAILLERIE</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-tight leading-[1.08]">
              Natural Diamonds &middot; Sales Only
            </h1>

            <p className="text-sm sm:text-base text-[#D8D3C8]/85 font-light leading-relaxed max-w-2xl">
              Type IIa D-Flawless diamonds, rare fancy colored pink and yellow diamonds, and investment bullion directly from certified diamond brokers and sightholders.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#C6A15B]">
              <Award className="w-4 h-4" />
              <span>Independent Diamond Broker Profiles &middot; GIA Verification &middot; Vault Fiduciary Escrow</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-[#D8D3C8] p-6 mb-10 shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#9D7B3E]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search GIA cert #, shape, color, or broker name..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FCFBF7] border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
              />
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <span className="text-xs text-[#080B09]/60 font-light">
                Showing <strong>{filteredItems.length}</strong> certified diamond lots
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

          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-[#D8D3C8]/60 pt-4">
            <span className="text-[10px] uppercase tracking-widest text-[#080B09]/50 font-medium mr-2 whitespace-nowrap">
              Diamond Category:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 text-[11px] uppercase tracking-wider font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#061C16] text-[#FCFBF7]'
                  : 'bg-[#FCFBF7] text-[#080B09]/70 border border-[#D8D3C8] hover:border-[#061C16]'
              }`}
            >
              All Diamonds &amp; Gems
            </button>
            <button
              onClick={() => setSelectedCategory('natural_diamond')}
              className={`px-4 py-1.5 text-[11px] uppercase tracking-wider font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'natural_diamond'
                  ? 'bg-[#061C16] text-[#FCFBF7]'
                  : 'bg-[#FCFBF7] text-[#080B09]/70 border border-[#D8D3C8] hover:border-[#061C16]'
              }`}
            >
              Natural White Diamonds (D-FL)
            </button>
            <button
              onClick={() => setSelectedCategory('fancy_colored')}
              className={`px-4 py-1.5 text-[11px] uppercase tracking-wider font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'fancy_colored'
                  ? 'bg-[#061C16] text-[#FCFBF7]'
                  : 'bg-[#FCFBF7] text-[#080B09]/70 border border-[#D8D3C8] hover:border-[#061C16]'
              }`}
            >
              Fancy Vivid Diamonds
            </button>
            <button
              onClick={() => setSelectedCategory('rare_gem')}
              className={`px-4 py-1.5 text-[11px] uppercase tracking-wider font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'rare_gem'
                  ? 'bg-[#061C16] text-[#FCFBF7]'
                  : 'bg-[#FCFBF7] text-[#080B09]/70 border border-[#D8D3C8] hover:border-[#061C16]'
              }`}
            >
              Rare Gemstones (Kashmir / Burma)
            </button>
            <button
              onClick={() => setSelectedCategory('gold_bullion')}
              className={`px-4 py-1.5 text-[11px] uppercase tracking-wider font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'gold_bullion'
                  ? 'bg-[#061C16] text-[#FCFBF7]'
                  : 'bg-[#FCFBF7] text-[#080B09]/70 border border-[#D8D3C8] hover:border-[#061C16]'
              }`}
            >
              24K Pure Gold Bullion
            </button>
          </div>
        </div>

        {/* Diamond Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((diamond) => (
            <div
              key={diamond.id}
              className="group bg-white border border-[#D8D3C8] hover:border-[#061C16] transition-all duration-500 hover:shadow-xl flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Image Banner */}
                <div className="relative aspect-square overflow-hidden bg-[#061C16]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url('${diamond.imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061C16]/80 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-[#061C16]/90 border border-[#C6A15B]/30 text-[#C6A15B] text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm">
                      {diamond.shape} &middot; {diamond.carat}
                    </span>
                    <span className="px-2.5 py-1 bg-black/60 border border-white/20 text-white text-[9px] uppercase tracking-widest font-mono">
                      GIA CERTIFIED
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white text-[10px] tracking-widest uppercase flex items-center justify-between">
                    <span>Color: {diamond.colorGrade.split(' ')[0]}</span>
                    <span>Clarity: {diamond.clarityGrade.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 space-y-4">
                  {/* Broker Profile Card */}
                  <div className="p-2.5 bg-[#FCFBF7] border border-[#D8D3C8]/70 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5 text-[#061C16]">
                      <UserCheck className="w-3.5 h-3.5 text-[#9D7B3E]" />
                      <span className="font-semibold">{diamond.brokerName}</span>
                    </div>
                    <span className="text-[#9D7B3E] font-medium">{diamond.brokerLocation}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-light text-[#061C16] leading-snug">
                      {diamond.title}
                    </h3>
                    <p className="text-xs text-[#080B09]/70 font-light leading-relaxed mt-1.5 line-clamp-2">
                      {diamond.tagline}
                    </p>
                  </div>

                  {/* 4Cs Technical Specs Box */}
                  <div className="bg-[#FCFBF7] border border-[#D8D3C8] p-3 text-[11px] space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#080B09]/50 uppercase tracking-widest text-[9px]">CUT &amp; POLISH:</span>
                      <span className="font-medium text-[#061C16]">{diamond.cutGrade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#080B09]/50 uppercase tracking-widest text-[9px]">CERTIFICATE:</span>
                      <span className="font-mono text-[#061C16] text-[10px]">{diamond.labCertificate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#080B09]/50 uppercase tracking-widest text-[9px]">VAULT CUSTODY:</span>
                      <span className="font-medium text-[#9D7B3E] text-[10px]">{diamond.vaultCustody}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Buy Action */}
              <div className="p-6 pt-0 border-t border-[#D8D3C8]/60 mt-4">
                <div className="pt-4 flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-[#080B09]/50 block">ACQUISITION PRICE</span>
                    <span className="font-serif text-xl font-semibold text-[#061C16]">{diamond.priceFormatted}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5">
                    Sealed in Tamper-Proof Vault
                  </span>
                </div>

                <button
                  onClick={() =>
                    openEnquiry({
                      title: `Diamond Acquisition: ${diamond.title}`,
                      subtitle: `Direct broker transaction with ${diamond.brokerName}. Fiduciary Swiss/Mumbai vault release under escrow.`,
                      assetTitle: `${diamond.title} (${diamond.labCertificate})`,
                      defaultVertical: 'Jewellery & Horology',
                    })
                  }
                  className="w-full py-3 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all text-center shadow-md"
                >
                  INQUIRE TO PURCHASE DIAMOND
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Diamond Broker Registration Banner */}
        <div className="mt-20 p-8 sm:p-12 bg-[#061C16] text-[#FCFBF7] border border-[#C6A15B]/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] block">
              DIAMOND SIGHTHOLDERS &amp; INDEPENDENT BROKERS
            </span>
            <h3 className="font-serif text-2xl font-light text-white">
              List Natural Diamonds for International Vault Placement
            </h3>
            <p className="text-xs text-[#D8D3C8]/70 font-light max-w-xl">
              Connect directly with ultra-high-net-worth buyers and family offices seeking D-Flawless and rare colored diamonds. Zero rental, strictly vetted acquisition.
            </p>
          </div>

          <Link
            href="/portal"
            className="px-8 py-3.5 bg-[#FCFBF7] text-[#061C16] text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] transition-all whitespace-nowrap"
          >
            ENTER DIAMOND BROKER PORTAL
          </Link>
        </div>
      </div>
    </div>
  );
}
