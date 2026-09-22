'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import { ArrowLeft, ShieldCheck, Bookmark, Lock, Share2, MapPin, CheckCircle2 } from 'lucide-react';
import { LuxuryListing } from '@/types';

interface ListingDetailClientProps {
  listing: LuxuryListing;
}

export default function ListingDetailClient({ listing }: ListingDetailClientProps) {
  const { openEnquiry, toggleSaveAsset, isSaved } = useLuxuryUI();
  const saved = isSaved(listing.id);

  const images = (listing.images && listing.images.length > 0)
    ? listing.images
    : [
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
      ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const priceDisplay = (!listing.price || listing.price === 0)
    ? 'PRICE ON REQUEST'
    : listing.currency === 'INR'
    ? `₹${(listing.price / 10000000).toFixed(1)} Cr`
    : new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: listing.currency || 'EUR',
        maximumFractionDigits: 0,
      }).format(listing.price);

  return (
    <div className="bg-[#FCFBF7] text-[#080B09] min-h-screen pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Navigation Breadcrumb */}
        <div className="py-6 flex items-center justify-between border-b border-[#D8D3C8] mb-10 text-xs">
          <Link
            href="/#collection"
            className="inline-flex items-center gap-2 text-[#080B09]/70 hover:text-[#061C16] uppercase tracking-[0.25em] font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO COLLECTION</span>
          </Link>

          <div className="flex items-center gap-4 text-[#080B09]/60 uppercase tracking-[0.2em] text-[10px]">
            <span>LOT #{listing.id.slice(0, 8)}</span>
            <span>&middot;</span>
            <span className="text-[#9D7B3E] font-medium">{listing.category_name || 'CURATED LOT'}</span>
          </div>
        </div>

        {/* Main Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Gallery (7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[16/11] bg-[#061C16] border border-[#D8D3C8] overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url('${images[activeImageIndex]}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Status Tag Overlay */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#061C16]/90 border border-[#C6A15B]/40 text-[#C6A15B] text-[9px] uppercase tracking-[0.25em] px-3 py-1 backdrop-blur-sm">
                  {listing.is_featured ? 'FEATURED LOT' : 'PRIVATE SALE'}
                </span>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 pt-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[16/10] overflow-hidden border transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#061C16] ring-1 ring-[#061C16]'
                        : 'border-[#D8D3C8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${img}')` }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Discretion Note */}
            <div className="pt-8 border-t border-[#D8D3C8] text-xs text-[#080B09]/70 font-light leading-relaxed flex items-start gap-3">
              <Lock className="w-4 h-4 text-[#9D7B3E] shrink-0 mt-0.5" />
              <p>
                Beneficial owner contact information is held confidentially. All inquiries and physical viewing requests are handled through the NP GROUPS Private Office under bilateral non-disclosure.
              </p>
            </div>
          </div>

          {/* Right Information Panel (5 Columns) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Location & Meta Header */}
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-[#9D7B3E] font-medium border-b border-[#D8D3C8] pb-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    {listing.location ? `${listing.location.city}, ${listing.location.country}` : 'CANNES, FRANCE'}
                  </span>
                </div>
                <span>PRIVATE TREATY</span>
              </div>

              {/* Title in Cormorant Garamond */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#061C16] leading-[1.12]">
                {listing.title}
              </h1>

              {/* Valuation Display */}
              <div className="p-6 bg-white border border-[#D8D3C8] space-y-1">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#080B09]/50 block">
                  INDICATIVE VALUATION
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-medium text-[#061C16] block">
                  {priceDisplay}
                </span>
                <span className="text-[10px] text-[#9D7B3E] uppercase tracking-[0.2em] block pt-1">
                  Subject to Formal Mandate Confirmation
                </span>
              </div>

              {/* Description */}
              <div className="space-y-4 text-xs sm:text-sm text-[#080B09]/80 font-light leading-relaxed">
                <p>{listing.description}</p>
              </div>

              {/* Specifications Matrix */}
              <div className="space-y-3 pt-4 border-t border-[#D8D3C8]">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#080B09]/60 font-semibold block">
                  TECHNICAL SPECIFICATIONS
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white border border-[#D8D3C8]/70">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#080B09]/50 block">STATUS</span>
                    <span className="font-medium text-[#061C16]">Verified Available</span>
                  </div>
                  <div className="p-3 bg-white border border-[#D8D3C8]/70">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#080B09]/50 block">JURISDICTION</span>
                    <span className="font-medium text-[#061C16]">European Union</span>
                  </div>
                  <div className="p-3 bg-white border border-[#D8D3C8]/70">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#080B09]/50 block">ESCROW FACILITY</span>
                    <span className="font-medium text-[#061C16]">Swiss Fiduciary</span>
                  </div>
                  <div className="p-3 bg-white border border-[#D8D3C8]/70">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#080B09]/50 block">DISCLOSURE</span>
                    <span className="font-medium text-[#061C16]">Under Bilateral NDA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-8 border-t border-[#D8D3C8] space-y-3">
              <button
                onClick={() =>
                  openEnquiry({
                    title: 'Request Private Enquiry',
                    subtitle: `Submit an inquiry regarding lot: ${listing.title}. Direct response from our private office within 4 hours.`,
                    assetTitle: listing.title,
                    defaultVertical: listing.category_name,
                  })
                }
                className="w-full py-4 bg-[#061C16] text-[#FCFBF7] text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all duration-300 shadow-xl"
              >
                REQUEST PRIVATE ENQUIRY
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleSaveAsset(listing.id)}
                  className={`flex-1 py-3 border text-[10px] uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 ${
                    saved
                      ? 'bg-[#C6A15B] text-[#061C16] border-[#C6A15B]'
                      : 'border-[#D8D3C8] text-[#080B09] hover:border-[#061C16]'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                  <span>{saved ? 'SAVED TO COLLECTION' : 'SAVE TO COLLECTION'}</span>
                </button>
              </div>

              <div className="pt-2 text-center text-[10px] text-[#080B09]/50 uppercase tracking-[0.2em]">
                Reference ID: NP-{listing.id.slice(0, 8).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
