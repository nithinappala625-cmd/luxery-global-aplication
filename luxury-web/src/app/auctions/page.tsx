import { getAuctions } from '@/lib/api';
import { Gavel, MapPin, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export default async function AuctionsPage() {
  const auctions = await getAuctions();

  return (
    <div className="bg-[#FCFBF7] text-[#080B09] min-h-screen pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto py-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D7B3E] font-medium">
            <span className="w-1.5 h-1.5 bg-[#C6A15B] rotate-45" />
            <span>CURATED TIMED TENDERS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#061C16] tracking-tight">
            TENDERS &amp; PRIVATE LOTS
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#061C16] font-light italic">
            Direct Private Treaty Placements &amp; Timed Consignments.
          </p>

          <p className="text-xs sm:text-sm text-[#080B09]/70 font-light leading-relaxed max-w-xl mx-auto pt-2">
            Discreet timed tenders, sealed bids, and specialist private treaty placements across verified horology, classic competition racecars, sovereign estates, and blue-chip art.
          </p>
        </div>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 mb-20">
          {auctions.map((auc) => (
            <div
              key={auc.id}
              className="group bg-white border border-[#D8D3C8] hover:border-[#061C16] flex flex-col justify-between transition-all duration-500 hover:shadow-xl overflow-hidden"
            >
              {/* Image banner */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#061C16]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url('${auc.banner_url}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061C16]/90 via-transparent to-black/30" />

                {/* Status Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span
                    className={`px-3 py-1 text-[9px] uppercase tracking-[0.25em] font-medium border backdrop-blur-sm ${
                      auc.status === 'live'
                        ? 'bg-amber-950/80 border-[#C6A15B] text-[#C6A15B]'
                        : 'bg-[#061C16]/90 border-white/20 text-white'
                    }`}
                  >
                    {auc.status === 'live' ? 'LIVE TIMED TENDER' : 'SCHEDULED SALON'}
                  </span>

                  <span className="px-2.5 py-1 bg-black/60 border border-white/20 text-white text-[9px] uppercase tracking-[0.2em]">
                    {auc.total_lots_count} Cataloged Lots
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-light">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#C6A15B]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{auc.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/80 uppercase tracking-widest font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Sealed Protocol</span>
                  </div>
                </div>
              </div>

              {/* Information Panel */}
              <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#9D7B3E] font-medium">
                    {auc.auction_house_name || 'Independent Specialist Salon'}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#061C16] group-hover:text-[#9D7B3E] transition-colors leading-snug">
                    {auc.title}
                  </h3>
                  <p className="text-xs text-[#080B09]/70 font-light leading-relaxed">
                    Lead Lot: {auc.featured_lot_title} &middot; Estimate: {auc.featured_lot_estimate}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#D8D3C8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="text-[10px] text-[#080B09]/60 uppercase tracking-[0.2em]">
                    Fiduciary Guarantee &middot; Provenance Assured
                  </div>

                  <Link
                    href="/membership"
                    className="px-6 py-3 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#C6A15B] hover:text-[#061C16] transition-all text-center"
                  >
                    REQUEST BIDDER CREDENTIALS
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consignment Banner */}
        <div className="bg-[#061C16] text-[#FCFBF7] border border-[#C6A15B]/20 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B]">
              PRIVATE TREATY CONSIGNMENTS
            </span>
            <h3 className="font-serif text-2xl font-light text-white">
              Consign Assets for Upcoming International Tenders
            </h3>
            <p className="text-xs text-[#D8D3C8]/70 font-light max-w-xl">
              We coordinate confidential private treaties and catalog insertions in London, Geneva, Monaco, and Dubai.
            </p>
          </div>

          <Link
            href="/membership"
            className="px-8 py-3.5 bg-[#FCFBF7] text-[#061C16] text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] transition-all whitespace-nowrap"
          >
            SUBMIT CONSIGNMENT BRIEF
          </Link>
        </div>
      </div>
    </div>
  );
}
