import { getAuctions } from '@/lib/api';
import { Gavel, MapPin, ArrowRight } from 'lucide-react';

export const revalidate = 60;

export default async function AuctionsPage() {
  const auctions = await getAuctions();

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen text-[#082015]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#A07830] font-bold">
            <Gavel className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span>Curated Auction Rooms</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#082015] tracking-tight">
            Live & Upcoming Auctions
          </h1>
          <p className="text-sm sm:text-base text-[#4A5E53] font-light leading-relaxed">
            Direct bidding partnerships with Christie's, Sotheby's, RM Sotheby's, and Phillips. Secure your paddle and consign rare horology, classic cars, fine art, and royal provenance jewellery.
          </p>
        </div>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {auctions.map((auc) => (
            <div
              key={auc.id}
              className="rounded-2xl overflow-hidden bg-white border border-[#E5EAE7] hover:border-[#082015] flex flex-col justify-between shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#F5F5F2]">
                <img
                  src={auc.banner_url}
                  alt={auc.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase ${
                      auc.status === 'live'
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-[#051810] text-white'
                    }`}
                  >
                    {auc.status === 'live' ? 'Live Now' : 'Upcoming'}
                  </span>
                  <span className="px-2.5 py-1 rounded text-[10px] bg-white/95 text-[#082015] font-bold shadow-sm backdrop-blur-sm">
                    {auc.total_lots_count} Lots Cataloged
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-white font-medium">
                  <MapPin className="w-4 h-4 text-[#E8D48A]" />
                  <span>{auc.location}</span>
                </div>
              </div>

              <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#A07830] block mb-1">
                    {auc.auction_house_name} &middot; {auc.category_name}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#082015] font-semibold">
                    {auc.title}
                  </h3>

                  <div className="mt-6 p-5 rounded-xl bg-[#FAFAF8] border border-[#E5EAE7] space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#7A8F83] block font-bold">
                      Featured Headlining Lot
                    </span>
                    <p className="text-sm text-[#082015] font-serif font-bold">
                      {auc.featured_lot_title}
                    </p>
                    <p className="text-xs text-[#082015] font-medium">
                      {auc.featured_lot_estimate}
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#E5EAE7] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#7A8F83] block font-semibold">
                      Lead Current Bid
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl text-[#082015] font-bold">
                      {auc.currency} {auc.current_bid ? auc.current_bid.toLocaleString() : 'Est. Upon Request'}
                    </span>
                  </div>

                  <button className="px-6 py-3 rounded-lg text-xs font-bold tracking-widest uppercase bg-[#051810] text-white hover:bg-[#0F3826] transition-all flex items-center gap-2 shadow">
                    <span>Register Paddle</span>
                    <ArrowRight className="w-4 h-4 text-[#E8D48A]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consignment Banner with Deep Black-Green Anchor */}
        <div className="rounded-2xl bg-[#051810] text-white p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8D48A] font-bold block">
              Consignor Salons
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-light">
              Submit an Exceptional Asset for Next Season
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              Consign with confidence. Our senior specialists in Geneva, London, and Monaco provide complimentary valuation and worldwide auction placement.
            </p>
          </div>

          <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#C9A84C] via-[#E8D48A] to-[#A07830] text-[#051810] text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_25px_rgba(201,168,76,0.5)] transition-all whitespace-nowrap">
            Request Valuation
          </button>
        </div>
      </div>
    </div>
  );
}
