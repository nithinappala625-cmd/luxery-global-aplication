import { getAuctions } from '@/lib/api';
import { Gavel, Clock, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export const revalidate = 60;

export default async function AuctionsPage() {
  const auctions = await getAuctions();

  return (
    <div className="pt-28 pb-24 bg-[#04150D] min-h-screen text-[#D4D8D2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] font-semibold">
            <Gavel className="w-3.5 h-3.5" />
            <span>Curated Auction Rooms</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-wide">
            Live & Upcoming Auctions
          </h1>
          <p className="text-sm text-[#8CA090] font-light leading-relaxed">
            Direct bidding partnerships with Christie's, Sotheby's, RM Sotheby's, and Phillips. Secure your paddle and consign rare horology, classic cars, fine art, and royal provenance jewellery.
          </p>
        </div>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {auctions.map((auc) => (
            <div
              key={auc.id}
              className="rounded-xl overflow-hidden bg-[#0A3320]/70 border border-[#1E7A47]/40 hover:border-[#C9A84C]/60 flex flex-col justify-between shadow-2xl transition-all"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#071F12]">
                <img
                  src={auc.banner_url}
                  alt={auc.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3320] via-transparent to-black/30" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase ${
                      auc.status === 'live'
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-[#C9A84C] text-[#04150D]'
                    }`}
                  >
                    {auc.status === 'live' ? 'Live Now' : 'Upcoming'}
                  </span>
                  <span className="px-2.5 py-1 rounded text-[10px] bg-[#04150D]/80 text-white font-medium border border-white/10">
                    {auc.total_lots_count} Lots Cataloged
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-white">
                  <MapPin className="w-4 h-4 text-[#C9A84C]" />
                  <span>{auc.location}</span>
                </div>
              </div>

              <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[#C9A84C] block mb-1">
                    {auc.auction_house_name} &middot; {auc.category_name}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                    {auc.title}
                  </h3>

                  <div className="mt-6 p-4 rounded bg-[#071F12] border border-[#1E7A47]/30 space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#8CA090] block">
                      Featured Headlining Lot
                    </span>
                    <p className="text-sm text-white font-serif font-medium">
                      {auc.featured_lot_title}
                    </p>
                    <p className="text-xs text-[#C9A84C] font-semibold">
                      {auc.featured_lot_estimate}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#8CA090] block">
                      Lead Current Bid
                    </span>
                    <span className="font-serif text-2xl text-[#C9A84C] font-semibold">
                      {auc.currency} {auc.current_bid ? auc.current_bid.toLocaleString() : 'Est. Upon Request'}
                    </span>
                  </div>

                  <button className="px-6 py-3 rounded text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-[#04150D] hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all flex items-center gap-2">
                    <span>Register Paddle</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consignment Banner */}
        <div className="rounded-2xl bg-[#071F12] border border-[#C9A84C]/40 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A84C] font-semibold block">
              Consignor Salons
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
              Submit an Exceptional Asset for Next Season
            </h3>
            <p className="text-xs sm:text-sm text-[#8CA090] font-light leading-relaxed">
              Consign with confidence. Our senior specialists in Geneva, London, and Monaco provide complimentary valuation and worldwide auction placement.
            </p>
          </div>

          <button className="px-8 py-4 rounded bg-gradient-to-r from-[#C9A84C] via-[#E8D48A] to-[#A07830] text-[#04150D] text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_25px_rgba(201,168,76,0.4)] transition-all whitespace-nowrap">
            Request Valuation
          </button>
        </div>
      </div>
    </div>
  );
}
