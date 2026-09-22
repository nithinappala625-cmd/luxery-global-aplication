'use client';

import Link from 'next/link';
import { Bookmark, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';

export interface LuxuryAsset {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  location: string;
  year?: string | number;
  specs?: string;
  priceFormatted: string;
  isPoa?: boolean;
  statusBadge?: string;
  imageUrl: string;
  verified?: boolean;
}

interface LuxuryAssetCardProps {
  asset: LuxuryAsset;
}

export default function LuxuryAssetCard({ asset }: LuxuryAssetCardProps) {
  const { openEnquiry, toggleSaveAsset, isSaved } = useLuxuryUI();
  const saved = isSaved(asset.id);

  return (
    <div className="group relative bg-[#FCFBF7] border border-[#D8D3C8] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
      {/* Image Container with Editorial Aspect Ratio */}
      <div className="relative aspect-[16/11] overflow-hidden bg-[#061C16]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url('${asset.imageUrl}')` }}
        />

        {/* Subtle Dark Gradient at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061C16]/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#C6A15B] bg-[#061C16]/90 px-2.5 py-1 border border-[#C6A15B]/30 backdrop-blur-sm">
            {asset.statusBadge || 'PRIVATE SALE'}
          </span>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaveAsset(asset.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              saved
                ? 'bg-[#C6A15B] text-[#061C16]'
                : 'bg-black/40 text-white/80 hover:text-white border border-white/20'
            }`}
            aria-label="Save asset to collection"
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Tag: Category & Verification */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-[10px] tracking-[0.2em] uppercase font-light">
          <span>{asset.category}</span>
          {asset.verified !== false && (
            <span className="inline-flex items-center gap-1 text-[#C6A15B]">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Lot</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#9D7B3E]">
            {asset.year ? `${asset.year} · ` : ''}
            {asset.specs ? `${asset.specs} · ` : ''}
            {asset.location}
          </div>

          <Link href={`/listings/${asset.id}`}>
            <h3 className="font-serif text-xl sm:text-2xl font-light text-[#061C16] group-hover:text-[#9D7B3E] transition-colors leading-snug">
              {asset.title}
            </h3>
          </Link>

          {asset.subtitle && (
            <p className="text-xs text-[#080B09]/60 line-clamp-1 font-light">
              {asset.subtitle}
            </p>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 border-t border-[#D8D3C8]/70 flex items-center justify-between gap-4">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-[#080B09]/50">
              VALUATION
            </span>
            <span className="font-serif text-lg font-medium text-[#061C16]">
              {asset.isPoa ? 'PRICE ON REQUEST' : asset.priceFormatted}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                openEnquiry({
                  title: 'Private Asset Enquiry',
                  subtitle: `Confidential dossier request for ${asset.title}.`,
                  assetTitle: asset.title,
                  defaultVertical: asset.category,
                })
              }
              className="px-4 py-2 border border-[#061C16] text-[#061C16] text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#061C16] hover:text-[#FCFBF7] transition-all"
            >
              ENQUIRE
            </button>
            <Link
              href={`/listings/${asset.id}`}
              className="p-2 border border-[#D8D3C8] text-[#080B09]/70 hover:text-[#061C16] hover:border-[#061C16] transition-colors"
              aria-label="View full details"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
