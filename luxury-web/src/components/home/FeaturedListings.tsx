'use client';

import { useState } from 'react';
import { ShieldCheck, MapPin, Eye, ArrowUpRight, Sparkles } from 'lucide-react';
import { FEATURED_LISTINGS } from '@/lib/constants';
import { LuxuryListing } from '@/types';

interface Props {
  initialListings?: LuxuryListing[];
}

export default function FeaturedListings({ initialListings = FEATURED_LISTINGS }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = selectedCategory === 'all'
    ? initialListings
    : initialListings.filter(l => l.category_name?.toLowerCase().includes(selectedCategory.toLowerCase()));

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'INR') {
      const cr = (price / 10000000).toFixed(1);
      return `₹${cr} Cr`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const tabs = [
    { label: 'All Featured Drops', value: 'all' },
    { label: 'Aviation', value: 'aviation' },
    { label: 'Marine', value: 'marine' },
    { label: 'Private Islands', value: 'islands' },
    { label: 'Watches', value: 'watches' },
    { label: 'Automotive', value: 'automotive' },
    { label: 'Jewellery', value: 'jewellery' },
  ];

  return (
    <section className="py-24 bg-[#071F12] border-t border-[#1E7A47]/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Physical Assets</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-wide">
              Featured Acquisitions
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedCategory(tab.value)}
                className={`px-3.5 py-1.5 rounded text-xs tracking-wider uppercase font-medium transition-all whitespace-nowrap ${
                  selectedCategory === tab.value
                    ? 'bg-[#C9A84C] text-[#04150D] font-bold shadow-md'
                    : 'bg-[#04150D]/60 text-[#8CA090] hover:text-white border border-[#1E7A47]/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listings 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-lg bg-[#0A3320]/70 border border-[#1E7A47]/30 hover:border-[#C9A84C]/60 hover:bg-[#0F4A2C]/90 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl hover:-translate-y-1.5"
            >
              {/* Image Container with Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#04150D]">
                <img
                  src={item.images[0]?.original_url || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200'}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04150D] via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded text-[9px] font-bold tracking-widest uppercase bg-[#C9A84C] text-[#04150D] shadow">
                    {item.category_name}
                  </span>
                  {item.status === 'verified' && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-semibold tracking-wider uppercase bg-[#04150D]/80 border border-[#1E7A47]/40 text-[#E8D48A] flex items-center gap-1 backdrop-blur-sm">
                      <ShieldCheck className="w-3 h-3 text-[#C9A84C]" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Info */}
                {item.location && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-white/90 drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span>{item.location.city}, {item.location.country}</span>
                  </div>
                )}
              </div>

              {/* Body Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-medium group-hover:text-[#E8D48A] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#8CA090] mt-2 font-light line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Top 2 Specs */}
                  {item.specifications && item.specifications.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
                      {item.specifications.slice(0, 2).map((s) => (
                        <div key={s.spec_key}>
                          <span className="text-[9px] uppercase tracking-wider text-[#8CA090] block">
                            {s.spec_key}
                          </span>
                          <span className="text-white font-medium text-[11px] truncate block">
                            {s.spec_value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price & Action Row */}
                <div className="mt-6 pt-4 border-t border-[#1E7A47]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#8CA090] block">
                      Valuation
                    </span>
                    <span className="font-serif text-2xl text-[#C9A84C] font-semibold">
                      {formatPrice(item.price, item.currency)}
                    </span>
                  </div>

                  <a
                    href={`/listings/${item.id}`}
                    className="px-4 py-2 rounded text-[11px] font-bold tracking-widest uppercase bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-[#04150D] hover:shadow-[0_0_15px_rgba(201,168,76,0.4)] transition-all flex items-center gap-1.5"
                  >
                    <span>Acquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
