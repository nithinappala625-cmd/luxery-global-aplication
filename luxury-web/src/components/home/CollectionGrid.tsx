'use client';

import { useState } from 'react';
import Link from 'next/link';
import LuxuryAssetCard, { LuxuryAsset } from './LuxuryAssetCard';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import { ArrowRight } from 'lucide-react';

const curatedAssets: LuxuryAsset[] = [
  {
    id: 'fairline-targa-65',
    title: 'Fairline Targa 65 GTO',
    subtitle: 'Twin MAN V12 1800hp · Alberto Mancini Italian Design',
    category: 'Marine & Superyachts',
    location: 'Cannes, France',
    year: '2021',
    specs: '20.24 M',
    priceFormatted: '€2,600,000',
    isPoa: false,
    statusBadge: 'PRIVATE SALE',
    imageUrl: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=1200&auto=format&fit=crop',
    verified: true,
  },
  {
    id: 'gulfstream-g700',
    title: 'Gulfstream G700 Private Syndicate',
    subtitle: '7,750 nm Range · 19 VIP Club Seats · Rolls-Royce Pearl 700',
    category: 'Private Aviation',
    location: 'Geneva, Switzerland',
    year: '2023',
    specs: 'Mach 0.925',
    priceFormatted: 'PRICE ON REQUEST',
    isPoa: true,
    statusBadge: 'OFF-MARKET LOT',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
    verified: true,
  },
  {
    id: 'patek-5270p',
    title: 'Patek Philippe Ref. 5270P Perpetual Calendar',
    subtitle: 'Grand Complication · Platinum Salmon Dial · Sealed Provenance',
    category: 'Jewellery & Horology',
    location: 'Zurich, Switzerland',
    year: '2022',
    specs: '41mm Platinum',
    priceFormatted: '€215,000',
    isPoa: false,
    statusBadge: 'CURATED LOT',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    verified: true,
  },
  {
    id: 'ferrari-sf90-xx',
    title: 'Ferrari SF90 XX Stradale',
    subtitle: '1,030 CV Hybrid V8 · 1 of 799 Coupes Worldwide',
    category: 'Automotive & Hypercars',
    location: 'Monaco',
    year: '2024',
    specs: '0-100 2.3s',
    priceFormatted: 'PRICE ON REQUEST',
    isPoa: true,
    statusBadge: 'PRE-ALLOCATION',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
    verified: true,
  },
  {
    id: 'emerald-sanctuary',
    title: 'Emerald Sanctuary Sovereign Atoll',
    subtitle: '140-Acre Private Freehold Island · Deep Water Superyacht Mooring',
    category: 'Exceptional Estates',
    location: 'Exumas, Bahamas',
    year: 'Tenure: Freehold',
    specs: '140 Acres',
    priceFormatted: '$38,500,000',
    isPoa: false,
    statusBadge: 'EXCLUSIVE MANDATE',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    verified: true,
  },
  {
    id: 'basquiat-masterwork',
    title: 'Jean-Michel Basquiat (1982) Untitled',
    subtitle: 'Acrylic and oilstick on canvas · Private European Foundation',
    category: 'Fine Art & Collectibles',
    location: 'London, Mayfair',
    year: '1982',
    specs: '183 x 152 cm',
    priceFormatted: 'PRICE ON REQUEST',
    isPoa: true,
    statusBadge: 'PRIVATE TREATY',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    verified: true,
  },
];

interface CollectionGridProps {
  initialListings?: any[];
}

export default function CollectionGrid({ initialListings }: CollectionGridProps) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const { openEnquiry } = useLuxuryUI();

  const filters = [
    { label: 'ALL ACQUISITIONS', key: 'ALL' },
    { label: 'PRIVATE AVIATION', key: 'Private Aviation' },
    { label: 'MARINE & SUPERYACHTS', key: 'Marine & Superyachts' },
    { label: 'AUTOMOTIVE', key: 'Automotive & Hypercars' },
    { label: 'HOROLOGY & GEMS', key: 'Jewellery & Horology' },
    { label: 'ESTATES', key: 'Exceptional Estates' },
    { label: 'OFF-MARKET', key: 'OFF-MARKET' },
  ];

  // Convert any backend listings if present, or fallback to curated high-caliber items
  const backendItems: LuxuryAsset[] = (initialListings || []).map((item) => {
    const rawImg = item.images?.[0];
    const imgUrl =
      typeof rawImg === 'string'
        ? rawImg
        : rawImg?.original_url ||
          rawImg?.optimized_url ||
          (item as any).image_url ||
          'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop';

    const loc = item.location
      ? typeof item.location === 'string'
        ? item.location
        : `${item.location.city || ''}, ${item.location.country || ''}`
      : 'Monaco';

    return {
      id: item.id,
      title: item.title,
      subtitle: item.description?.slice(0, 100),
      category: item.category_name || (item as any).category?.name || 'Curated Asset',
      location: loc,
      year: item.year ? String(item.year) : '',
      specs: item.specifications?.[0]
        ? `${item.specifications[0].spec_key}: ${item.specifications[0].spec_value}`
        : '',
      priceFormatted: item.price ? `€${Number(item.price).toLocaleString()}` : 'PRICE ON REQUEST',
      isPoa: !item.price || item.price === 0,
      statusBadge: item.is_featured ? 'FEATURED LOT' : 'PRIVATE SALE',
      imageUrl: imgUrl,
      verified: item.status === 'verified',
    };
  });

  const allAssets = backendItems.length > 0 ? [...backendItems, ...curatedAssets] : curatedAssets;

  const filteredAssets = allAssets.filter((asset) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'OFF-MARKET') return asset.statusBadge?.includes('OFF-MARKET') || asset.isPoa;
    return asset.category.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  return (
    <section id="collection" className="relative bg-[#FCFBF7] text-[#080B09] py-28 lg:py-36 border-b border-[#D8D3C8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#D8D3C8] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D7B3E] font-medium mb-3">
              <span className="w-1.5 h-1.5 bg-[#C6A15B] rotate-45" />
              <span>THE CURATED COLLECTION</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#061C16]">
              Verified Assets &amp; Private Treaty Lots.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                openEnquiry({
                  title: 'Acquisition Mandate Registration',
                  subtitle: 'Register your bespoke acquisition mandate with our private office.',
                  defaultVertical: 'Private Aviation',
                })
              }
              className="px-6 py-3 border border-[#061C16] text-[#061C16] text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-[#061C16] hover:text-[#FCFBF7] transition-all"
            >
              REGISTER ACQUISITION MANDATE
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="py-8 flex flex-wrap items-center gap-2 sm:gap-3 overflow-x-auto pb-4">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all ${
                selectedFilter === filter.key
                  ? 'bg-[#061C16] text-[#FCFBF7] border border-[#061C16]'
                  : 'bg-transparent text-[#080B09]/70 border border-[#D8D3C8] hover:border-[#061C16] hover:text-[#061C16]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {filteredAssets.map((asset) => (
            <LuxuryAssetCard key={asset.id} asset={asset} />
          ))}
        </div>

        {/* Footer Link */}
        <div className="pt-16 text-center">
          <Link
            href="/categories/all"
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#061C16] font-semibold border-b border-[#061C16] pb-1.5 hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
          >
            <span>VIEW COMPLETE CATALOGUE (8 DOMAINS)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
