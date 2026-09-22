'use client';

import { useState } from 'react';
import { ShieldCheck, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';
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
    <section className="py-28 bg-[#FAFAF8] border-t border-[#E5EAE7]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#A07830] font-bold mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>Curated Physical Assets</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#082015] tracking-tight">
              Featured Acquisitions
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedCategory(tab.value)}
                className={`px-4 py-2 rounded text-xs tracking-wider uppercase font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === tab.value
                    ? 'bg-[#051810] text-white shadow-md'
                    : 'bg-white text-[#4A5E53] hover:text-[#082015] border border-[#E5EAE7] hover:border-[#082015]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listings 3-Column Grid with Crisp White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl bg-white border border-[#E5EAE7] hover:border-[#082015] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-2xl hover:-translate-y-1.5"
            >
              {/* Image Container with Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F5F2]">
                <img
                  src={item.images[0]?.original_url || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200'}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded text-[9px] font-bold tracking-widest uppercase bg-[#051810] text-white shadow">
                    {item.category_name}
                  </span>
                  {item.status === 'verified' && (
                    <span className="px-2.5 py-1 rounded text-[9px] font-semibold tracking-wider uppercase bg-white/95 text-[#082015] flex items-center gap-1 shadow-sm backdrop-blur-sm">
                      <ShieldCheck className="w-3 h-3 text-[#C9A84C]" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Info */}
                {item.location && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white font-medium drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-[#E8D48A]" />
                    <span>{item.location.city}, {item.location.country}</span>
                  </div>
                )}
              </div>

              {/* Body Details */}
              <div className="p-7 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#082015] font-semibold group-hover:text-[#0F3826] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4A5E53] mt-2 font-light line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Top 2 Specs */}
                  {item.specifications && item.specifications.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-[#E5EAE7] grid grid-cols-2 gap-3 text-xs">
                      {item.specifications.slice(0, 2).map((s) => (
                        <div key={s.spec_key}>
                          <span className="text-[9px] uppercase tracking-wider text-[#7A8F83] block font-semibold">
                            {s.spec_key}
                          </span>
                          <span className="text-[#082015] font-medium text-xs truncate block mt-0.5">
                            {s.spec_value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price & Action Row */}
                <div className="mt-6 pt-5 border-t border-[#E5EAE7] flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#7A8F83] block font-semibold">
                      Valuation
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl text-[#082015] font-semibold">
                      {formatPrice(item.price, item.currency)}
                    </span>
                  </div>

                  <a
                    href={`/listings/${item.id}`}
                    className="px-5 py-2.5 rounded text-[11px] font-bold tracking-widest uppercase bg-[#051810] text-white hover:bg-[#0F3826] hover:text-[#E8D48A] transition-all flex items-center gap-1.5 shadow"
                  >
                    <span>Acquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A84C]" />
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
