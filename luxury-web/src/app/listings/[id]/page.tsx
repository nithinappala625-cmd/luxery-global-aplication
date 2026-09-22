import { notFound } from 'next/navigation';
import { getListingById } from '@/lib/api';
import { ShieldCheck, MapPin, ArrowLeft, Calendar, FileText, Lock, MessageSquare } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 30;

export default async function ListingDetailPage({ params }: Props) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    notFound();
  }

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

  return (
    <div className="pt-28 pb-24 bg-[#04150D] min-h-screen text-[#D4D8D2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb Back */}
        <a
          href="/#categories"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8CA090] hover:text-[#C9A84C] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </a>

        {/* Top Title & Valuation Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#1E7A47]/30 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase bg-[#C9A84C] text-[#04150D]">
                {listing.category_name}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-[#071F12] border border-[#1E7A47]/40 text-[#E8D48A] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>Verified Asset</span>
              </span>
              {listing.location && (
                <span className="text-xs text-[#8CA090] flex items-center gap-1 ml-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>{listing.location.city}, {listing.location.country}</span>
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light">
              {listing.title}
            </h1>
          </div>

          <div className="lg:text-right">
            <span className="text-[10px] uppercase tracking-widest text-[#8CA090] block mb-1">
              Acquisition Valuation
            </span>
            <div className="font-serif text-4xl sm:text-5xl text-[#C9A84C] font-semibold">
              {formatPrice(listing.price, listing.currency)}
            </div>
          </div>
        </div>

        {/* Gallery & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          {/* Main Image View */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#071F12] border border-[#1E7A47]/40 shadow-2xl">
              <img
                src={listing.images[0]?.original_url || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200'}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Secondary Thumbnails */}
            {listing.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {listing.images.map((img) => (
                  <div
                    key={img.id}
                    className="aspect-[16/10] rounded-lg overflow-hidden border border-[#1E7A47]/30 bg-[#071F12]"
                  >
                    <img src={img.original_url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Sidebar */}
          <div className="space-y-6">
            {/* Acquisition Box */}
            <div className="rounded-xl bg-[#0A3320]/60 border border-[#C9A84C]/40 p-6 space-y-6 shadow-xl">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C9A84C] font-semibold block mb-1">
                  Institutional Custody
                </span>
                <h3 className="font-serif text-xl text-white font-medium">
                  Direct Acquisition Order
                </h3>
                <p className="text-xs text-[#8CA090] mt-1 leading-relaxed">
                  Proceed via Swiss/London escrow holding account with complete title warranty and physical inspection.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button className="w-full py-4 rounded text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#C9A84C] via-[#E8D48A] to-[#A07830] text-[#04150D] hover:shadow-[0_0_25px_rgba(201,168,76,0.4)] transition-all flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Initiate Escrow Purchase</span>
                </button>

                <button className="w-full py-3.5 rounded text-xs font-semibold tracking-[0.2em] uppercase border border-[#C9A84C]/40 text-[#E8D48A] hover:bg-[#C9A84C]/10 transition-all flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Request Seller Dossier</span>
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] text-[#8CA090]">
                <div className="flex items-center justify-between">
                  <span>Inspection Status</span>
                  <span className="text-white font-medium">Pre-Survey Completed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Title Guarantee</span>
                  <span className="text-white font-medium">Underwritten Lloyd's</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Settlement Currencies</span>
                  <span className="text-white font-medium">USD / EUR / GBP / INR / BTC</span>
                </div>
              </div>
            </div>

            {/* Seller / Consignor Card */}
            {listing.seller && (
              <div className="rounded-xl bg-[#071F12] border border-[#1E7A47]/30 p-6 space-y-3">
                <span className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-semibold block">
                  Authorized Salon / Broker
                </span>
                <h4 className="font-serif text-lg text-white font-medium">
                  {listing.seller.business_name}
                </h4>
                <p className="text-xs text-[#8CA090]">
                  Location: {listing.seller.location_city}, {listing.seller.location_country}
                </p>
                <div className="flex items-center gap-1 text-xs text-[#E8D48A] pt-1">
                  <span>Rating: {listing.seller.reputation_score} / 5.0</span>
                  <span>&middot;</span>
                  <span>Verified Entity</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Narrative & Technical Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8 border-t border-[#1E7A47]/30">
          {/* Left: Narrative Description */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-4">
                Asset Provenance & Narrative
              </h2>
              <p className="text-sm sm:text-base text-[#D4D8D2] font-light leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-4">
              <h3 className="font-serif text-xl text-white font-medium">
                Authentication & Title Verification
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded bg-[#071F12] border border-[#1E7A47]/30 flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-white block">Official Dossier</span>
                    <span className="text-[11px] text-[#8CA090]">Complete chain of ownership registered in secure vault</span>
                  </div>
                </div>
                <div className="p-4 rounded bg-[#071F12] border border-[#1E7A47]/30 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-white block">Curatorial Review</span>
                    <span className="text-[11px] text-[#8CA090]">Audited by NP GROUPS Senior Asset Committee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Specifications Table */}
          <div>
            <h2 className="font-serif text-2xl text-white font-medium mb-6">
              Specifications
            </h2>
            <div className="rounded-xl bg-[#071F12] border border-[#1E7A47]/30 divide-y divide-[#1E7A47]/20">
              {listing.year && (
                <div className="p-4 flex items-center justify-between text-xs">
                  <span className="text-[#8CA090]">Year of Manufacture</span>
                  <span className="text-white font-medium">{listing.year}</span>
                </div>
              )}
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="text-[#8CA090]">Condition Grade</span>
                <span className="text-white font-medium">{listing.condition}</span>
              </div>
              {listing.specifications.map((spec) => (
                <div key={spec.spec_key} className="p-4 flex items-center justify-between text-xs">
                  <span className="text-[#8CA090]">{spec.spec_key}</span>
                  <span className="text-white font-medium text-right ml-4">{spec.spec_value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
