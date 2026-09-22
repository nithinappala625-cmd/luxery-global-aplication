import { notFound } from 'next/navigation';
import { getListingById } from '@/lib/api';
import { ShieldCheck, MapPin, ArrowLeft, FileText, Lock, MessageSquare } from 'lucide-react';

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
    <div className="pt-32 pb-24 bg-white min-h-screen text-[#082015]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb Back */}
        <a
          href="/#categories"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A8F83] hover:text-[#082015] mb-8 transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </a>

        {/* Top Title & Valuation Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5EAE7] mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase bg-[#051810] text-white">
                {listing.category_name}
              </span>
              <span className="px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider uppercase bg-[#FAFAF8] border border-[#E5EAE7] text-[#082015] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>Verified Asset</span>
              </span>
              {listing.location && (
                <span className="text-xs text-[#7A8F83] flex items-center gap-1 ml-2 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>{listing.location.city}, {listing.location.country}</span>
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#082015] font-light">
              {listing.title}
            </h1>
          </div>

          <div className="lg:text-right">
            <span className="text-[10px] uppercase tracking-widest text-[#7A8F83] block mb-1 font-semibold">
              Acquisition Valuation
            </span>
            <div className="font-serif text-4xl sm:text-5xl text-[#082015] font-semibold">
              {formatPrice(listing.price, listing.currency)}
            </div>
          </div>
        </div>

        {/* Gallery & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          {/* Main Image View */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F5F5F2] border border-[#E5EAE7] shadow-xl">
              <img
                src={listing.images[0]?.original_url || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200'}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            {listing.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {listing.images.map((img) => (
                  <div
                    key={img.id}
                    className="aspect-[16/10] rounded-xl overflow-hidden border border-[#E5EAE7] bg-[#F5F5F2]"
                  >
                    <img src={img.original_url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-[#FAFAF8] border border-[#E5EAE7] p-8 space-y-6 shadow-sm">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#A07830] font-bold block mb-1">
                  Institutional Custody
                </span>
                <h3 className="font-serif text-2xl text-[#082015] font-semibold">
                  Direct Acquisition Order
                </h3>
                <p className="text-xs text-[#4A5E53] mt-1.5 leading-relaxed font-light">
                  Proceed via Swiss/London escrow holding account with complete title warranty and physical inspection.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button className="w-full py-4 rounded-lg text-xs font-bold tracking-[0.2em] uppercase bg-[#051810] text-white hover:bg-[#0F3826] transition-all flex items-center justify-center gap-2 shadow-lg">
                  <Lock className="w-4 h-4 text-[#E8D48A]" />
                  <span>Initiate Escrow Purchase</span>
                </button>

                <button className="w-full py-3.5 rounded-lg text-xs font-bold tracking-[0.2em] uppercase border border-[#082015]/30 text-[#082015] hover:bg-[#082015] hover:text-white transition-all flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Request Seller Dossier</span>
                </button>
              </div>

              <div className="pt-5 border-t border-[#E5EAE7] space-y-2.5 text-xs text-[#4A5E53]">
                <div className="flex items-center justify-between">
                  <span>Inspection Status</span>
                  <span className="text-[#082015] font-semibold">Pre-Survey Completed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Title Guarantee</span>
                  <span className="text-[#082015] font-semibold">Underwritten Lloyd's</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Settlement Currencies</span>
                  <span className="text-[#082015] font-semibold">USD / EUR / GBP / INR / BTC</span>
                </div>
              </div>
            </div>

            {listing.seller && (
              <div className="rounded-2xl bg-white border border-[#E5EAE7] p-7 space-y-3 shadow-sm">
                <span className="text-[9px] uppercase tracking-widest text-[#A07830] font-bold block">
                  Authorized Salon / Broker
                </span>
                <h4 className="font-serif text-xl text-[#082015] font-semibold">
                  {listing.seller.business_name}
                </h4>
                <p className="text-xs text-[#7A8F83]">
                  Location: {listing.seller.location_city}, {listing.seller.location_country}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#082015] font-medium pt-1">
                  <span>Rating: {listing.seller.reputation_score} / 5.0</span>
                  <span>&middot;</span>
                  <span className="text-[#0F3826] font-semibold">Verified Entity</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Narrative & Technical Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8 border-t border-[#E5EAE7]">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-serif text-3xl text-[#082015] font-medium mb-4">
                Asset Provenance & Narrative
              </h2>
              <p className="text-sm sm:text-base text-[#4A5E53] font-light leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            <div className="pt-6 border-t border-[#E5EAE7] space-y-4">
              <h3 className="font-serif text-2xl text-[#082015] font-medium">
                Authentication & Title Verification
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-[#FAFAF8] border border-[#E5EAE7] flex items-start gap-3.5">
                  <FileText className="w-5 h-5 text-[#082015] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#082015] block">Official Dossier</span>
                    <span className="text-[11px] text-[#4A5E53]">Complete chain of ownership registered in secure vault</span>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-[#FAFAF8] border border-[#E5EAE7] flex items-start gap-3.5">
                  <ShieldCheck className="w-5 h-5 text-[#082015] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#082015] block">Curatorial Review</span>
                    <span className="text-[11px] text-[#4A5E53]">Audited by NP GROUPS Senior Asset Committee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-[#082015] font-medium mb-6">
              Specifications
            </h2>
            <div className="rounded-2xl bg-[#FAFAF8] border border-[#E5EAE7] divide-y divide-[#E5EAE7]">
              {listing.year && (
                <div className="p-4 flex items-center justify-between text-xs">
                  <span className="text-[#7A8F83] font-semibold">Year of Manufacture</span>
                  <span className="text-[#082015] font-bold">{listing.year}</span>
                </div>
              )}
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="text-[#7A8F83] font-semibold">Condition Grade</span>
                <span className="text-[#082015] font-bold">{listing.condition}</span>
              </div>
              {listing.specifications.map((spec) => (
                <div key={spec.spec_key} className="p-4 flex items-center justify-between text-xs">
                  <span className="text-[#7A8F83] font-semibold">{spec.spec_key}</span>
                  <span className="text-[#082015] font-bold text-right ml-4">{spec.spec_value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
