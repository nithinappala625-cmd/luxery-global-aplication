'use client';

import { useState } from 'react';
import { Gem, Search, ShieldCheck, UserCheck, Check, ArrowRight, Shield, Award, Sparkles, ArrowUpDown, Globe } from 'lucide-react';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import { useCountry } from '@/lib/countryContext';
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
  labCertificate: string;
  usdPrice: number;
  tagline: string;
  imageUrl: string;
  brokerName: string;
  brokerType: 'sightholder' | 'independent_diamond_broker' | 'vault_custodian';
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
    usdPrice: 4600000,
    tagline: 'The rarest 0.01% of all gem-quality diamonds. Type IIa chemical purity with complete optical transparency.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    brokerName: 'Hiren Jhaveri & Sons · Bharat Diamond Bourse',
    brokerType: 'sightholder',
    brokerLocation: 'Mumbai · BKC / Antwerp',
    vaultCustody: 'Malca-Amit Vault, Free Trade Zone',
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
    usdPrice: 17400000,
    tagline: 'Museum-calibre colored diamond of historic proportions. Unmodified color saturation with zero secondary modifiers.',
    imageUrl: 'https://images.unsplash.com/photo-1568944729458-ce2bf7768e44?q=80&w=800&auto=format&fit=crop',
    brokerName: 'Philippe Laurent · Independent Diamond Broker',
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
    usdPrice: 5800000,
    tagline: 'Historical old-mine Kashmir origin. Exhibiting the legendary velvety cornflower blue with dual Swiss laboratory origin certs.',
    imageUrl: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop',
    brokerName: 'Laurent Mercier · Fine Gemstones Specialist',
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
    clarityGrade: 'VVS2',
    cutGrade: 'Radiant Brilliant',
    polishAndSymmetry: 'Excellent / Excellent',
    fluorescence: 'None',
    labCertificate: 'GIA #5182901452 Dossier',
    usdPrice: 5100000,
    tagline: 'Electrifying pure canary yellow saturation. Exceptional dispersion and brilliance in oversized carat weight.',
    imageUrl: 'https://images.unsplash.com/photo-1612891936954-09a2c7dd53d2?q=80&w=800&auto=format&fit=crop',
    brokerName: 'Hiren Jhaveri & Sons · Bharat Diamond Bourse',
    brokerType: 'sightholder',
    brokerLocation: 'Mumbai / Dubai',
    vaultCustody: 'Brink’s Global Vault, Dubai Multi Commodities Centre (DMCC)',
  },
  {
    id: 'pamp-gold-1kg',
    title: '1 Kilogram PAMP Suisse 999.9 Fine Gold Bullion Bar',
    category: 'gold_bullion',
    shape: 'Cast Bar in Sealed Assay Blister',
    carat: '1,000 Grams (32.15 Troy Oz)',
    colorGrade: '24 Karat (999.9 Purity)',
    clarityGrade: 'LBMA Good Delivery Standard',
    cutGrade: 'PAMP Suisse Lady Fortuna Monogram',
    polishAndSymmetry: 'Mirror Assay Finish',
    fluorescence: 'None',
    labCertificate: 'Swiss Federal Assay Office Certificate & Individual Serial Number',
    usdPrice: 90000,
    tagline: 'Direct sovereign wealth hedge. Certified LBMA Good Delivery physical bar stored in allocated high-security vault facilities.',
    imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=800&auto=format&fit=crop',
    brokerName: 'Swiss Bullion Depository Escrow Desk',
    brokerType: 'vault_custodian',
    brokerLocation: 'Zurich / Singapore',
    vaultCustody: 'Le Freeport Singapore / Zurich Cantonal Vault',
  },
  {
    id: 'colombian-emerald-12ct',
    title: '12.40 Carat Muzo Colombian Emerald (Insignificant Oil)',
    category: 'rare_gem',
    shape: 'Classic Emerald Cut',
    carat: '12.40 ct',
    colorGrade: 'Vivid Deep Green ("Verde Muzo")',
    clarityGrade: 'Exceptional Transparency',
    cutGrade: 'Step Cut Octagon',
    polishAndSymmetry: 'Very Good / Excellent',
    fluorescence: 'Inert',
    labCertificate: 'Gübelin Gemmological Report #21040082',
    usdPrice: 3800000,
    tagline: 'From the famed historic Muzo mines of Colombia. Highly saturated green with only minor cedarwood oil indication.',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    brokerName: 'Philippe Laurent · Independent Broker',
    brokerType: 'independent_diamond_broker',
    brokerLocation: 'Geneva / Bogota',
    vaultCustody: 'Geneva Freeport Secure Vault Room',
  },
];

export default function JewelleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'natural_diamond' | 'fancy_colored' | 'rare_gem' | 'gold_bullion'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-desc' | 'price-asc'>('featured');
  const { openEnquiry } = useLuxuryUI();
  const { country, formatPrice } = useCountry();

  const filteredItems = diamondsInventory
    .filter((d) => {
      if (selectedCategory === 'all') return true;
      return d.category === selectedCategory;
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
                  Sovereign Gemological Desk
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[9px] font-mono uppercase font-bold">
                  STRICTLY SALES ONLY &middot; ZERO RENTAL
                </span>
              </div>
              <p className="text-xs sm:text-sm font-serif font-bold text-white mt-0.5">
                {country.name} · GIA Certified Vault Deliveries in {country.currency}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[9px] uppercase tracking-wider text-[#F6F3EA]/60 block font-mono">
                Currency &amp; Gold Escrow
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
            <Gem className="w-3.5 h-3.5 text-[#7A5410]" />
            <span>NATURAL CERTIFIED DIAMONDS &amp; GOLD BULLION</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#061C16] tracking-tight leading-none drop-shadow-sm">
            FINE JEWELS &amp; GEMS
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#143327] font-semibold italic">
            GIA Monograph Certified Diamonds, Historic Unheated Gems, and 24K Physical Bullion.
          </p>

          <p className="text-xs sm:text-sm text-[#1A2E24] font-medium leading-relaxed max-w-2xl mx-auto pt-2">
            Direct bilateral access to Bharat Diamond Bourse sightholders, Geneva freeport vaults, and Cantonal Swiss bullion depositories. All stones authenticated under GIA, Gübelin, and SSEF monographs.
          </p>
        </div>

        {/* Category Filter & Sorter */}
        <div className="bg-white border-2 border-[#D8D3C8] rounded-xl p-4 sm:p-6 mb-10 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <span className="text-xs font-bold text-[#061C16]">
              Showing <strong>{filteredItems.length}</strong> certified sovereign lots
            </span>

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

          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-[#D8D3C8] pt-3 scrollbar-none">
            <span className="text-[10px] uppercase tracking-wider text-[#4D6055] font-bold mr-1 whitespace-nowrap">
              CLASSIFICATION:
            </span>
            {[
              { id: 'all', label: 'All Diamonds & Gems' },
              { id: 'natural_diamond', label: 'Natural White (D-FL)' },
              { id: 'fancy_colored', label: 'Fancy Vivid Colors' },
              { id: 'rare_gem', label: 'Rare Gems (Kashmir/Muzo)' },
              { id: 'gold_bullion', label: '24K Pure Gold Bullion' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-1.5 text-[11px] uppercase tracking-wider font-bold whitespace-nowrap transition-all rounded ${
                  selectedCategory === cat.id
                    ? 'bg-[#061C16] text-[#F3E2B8]'
                    : 'bg-[#FAF9F5] text-[#061C16] border border-[#D0C9BA] hover:border-[#061C16]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Diamond Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((diamond) => (
            <div
              key={diamond.id}
              className="group bg-white border-2 border-[#D8D3C8] hover:border-[#061C16] rounded-2xl transition-all duration-300 hover:shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Image Banner */}
                <div className="relative aspect-square overflow-hidden bg-[#061C16]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${diamond.imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04130D]/80 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-[#061C16]/95 border border-[#C6A15B] text-[#E8D48A] text-[9px] font-bold uppercase tracking-[0.2em] rounded backdrop-blur-sm shadow">
                      {diamond.shape} &middot; {diamond.carat}
                    </span>
                    <span className="px-2.5 py-1 bg-black/80 border border-white/20 text-white text-[9px] uppercase tracking-widest font-mono font-bold rounded">
                      GIA CERTIFIED
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white text-[10px] tracking-widest uppercase font-bold flex items-center justify-between drop-shadow">
                    <span>Color: {diamond.colorGrade.split(' ')[0]}</span>
                    <span>Clarity: {diamond.clarityGrade.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Content Box with High-Contrast Typography */}
                <div className="p-6 space-y-4">
                  {/* Broker Profile Card */}
                  <div className="p-3 bg-[#F9F8F5] border border-[#D0C9BA] rounded-lg flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-[#061C16]">
                      <UserCheck className="w-4 h-4 text-[#7A5410]" />
                      <span className="font-bold">{diamond.brokerName}</span>
                    </div>
                    <span className="text-[#7A5410] font-bold">{diamond.brokerLocation}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#061C16] leading-snug">
                      {diamond.title}
                    </h3>
                    <p className="text-[13px] text-[#1F2C24] font-medium leading-relaxed mt-2 line-clamp-2">
                      {diamond.tagline}
                    </p>
                  </div>

                  {/* 4Cs Technical Specs Box */}
                  <div className="bg-[#F9F8F5] border border-[#D0C9BA] rounded-xl p-3.5 text-xs space-y-2 shadow-xs">
                    <div className="flex justify-between">
                      <span className="text-[#4D6055] font-bold uppercase tracking-wider text-[9px]">CUT &amp; POLISH:</span>
                      <span className="font-bold text-[#061C16]">{diamond.cutGrade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4D6055] font-bold uppercase tracking-wider text-[9px]">CERTIFICATE:</span>
                      <span className="font-mono font-bold text-[#061C16] text-[10px]">{diamond.labCertificate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4D6055] font-bold uppercase tracking-wider text-[9px]">VAULT CUSTODY:</span>
                      <span className="font-bold text-[#7A5410] text-[10px]">{diamond.vaultCustody}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Buy Action */}
              <div className="p-6 pt-0 border-t border-[#D8D3C8] mt-4">
                <div className="pt-4 flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#4D6055] font-bold block mb-0.5">
                      ACQUISITION VALUATION
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-extrabold text-[#061C16] tracking-tight">
                        {formatPrice(diamond.usdPrice)}
                      </span>
                      <span className="text-[9px] text-[#7A5410] font-mono font-bold bg-[#F5EEDB] px-1.5 py-0.5 rounded border border-[#C6A15B]/30">
                        {country.currency}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded font-bold">
                    Sealed in Vault
                  </span>
                </div>

                <button
                  onClick={() =>
                    openEnquiry({
                      title: `Diamond Acquisition: ${diamond.title}`,
                      subtitle: `Valuation: ${formatPrice(diamond.usdPrice)}. Direct sightholder transaction with ${diamond.brokerName}. Escrow transfer under Swiss/Freeport custody protocol.`,
                      assetTitle: `${diamond.title} (${diamond.labCertificate})`,
                      defaultVertical: 'Jewels & Gemstones',
                    })
                  }
                  className="w-full py-3.5 bg-[#061C16] hover:bg-[#0D382A] text-[#F3E2B8] hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-[#C6A15B]/40"
                >
                  INQUIRE TO PURCHASE DIAMOND
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
