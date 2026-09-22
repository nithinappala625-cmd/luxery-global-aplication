import { notFound } from 'next/navigation';
import { getCategoryBySlug, getListings } from '@/lib/api';
import { ShieldCheck, MapPin, ArrowUpRight, ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const listings = await getListings({ categorySlug: slug });

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
        {/* Breadcrumb / Back */}
        <a
          href="/#categories"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A8F83] hover:text-[#082015] mb-8 transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Verticals</span>
        </a>

        {/* Category Header Banner with Deep Black-Green Anchor */}
        <div className="relative rounded-2xl overflow-hidden bg-[#051810] text-white p-8 sm:p-14 mb-12 shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E8D48A] font-semibold block">
              Vertical 0{category.sort_order} &middot; Institutional Catalog
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-white font-light">
              {category.name}
            </h1>
            <p className="text-base sm:text-lg text-white/80 font-serif italic" dangerouslySetInnerHTML={{ __html: category.tagline || '' }} />

            {/* Subcategories / Asset Types Pills */}
            {category.asset_types && (
              <div className="pt-4 flex flex-wrap gap-2">
                {category.asset_types.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 rounded text-xs bg-white/10 border border-white/20 text-white font-medium"
                  >
                    {type}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filter / Action Bar */}
        <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E5EAE7] mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#082015] font-bold">
              Modes:
            </span>
            {['ALL', 'BUY', 'SELL', 'RENT', 'CHARTER', 'BOOK'].map((mode) => (
              <button
                key={mode}
                className="px-3.5 py-1.5 rounded text-[11px] tracking-wider uppercase font-semibold bg-white border border-[#E5EAE7] text-[#082015] hover:border-[#082015] transition-colors"
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#7A8F83] font-medium">
            Showing <span className="text-[#082015] font-bold">{listings.length}</span> Verified Assets
          </div>
        </div>

        {/* Listings Grid with White Cards */}
        {listings.length === 0 ? (
          <div className="py-24 text-center rounded-2xl bg-[#FAFAF8] border border-[#E5EAE7] p-12">
            <p className="font-serif text-3xl text-[#082015] mb-2 font-medium">No Public Listings Cataloged</p>
            <p className="text-sm text-[#4A5E53] max-w-md mx-auto mb-8 font-light">
              Assets in this vertical are currently transacting through private treaty and off-market confidential deal rooms.
            </p>
            <a
              href="/membership"
              className="inline-block px-7 py-3.5 rounded bg-[#051810] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#0F3826] transition-all shadow"
            >
              Request Private Dossier Access
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((item) => (
              <div
                key={item.id}
                className="group rounded-xl bg-white border border-[#E5EAE7] hover:border-[#082015] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F5F2]">
                  <img
                    src={item.images[0]?.original_url || category.banner_url || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded text-[9px] font-bold tracking-widest uppercase bg-[#051810] text-white">
                      {category.name}
                    </span>
                    <span className="px-2.5 py-1 rounded text-[9px] font-semibold tracking-wider uppercase bg-white/95 text-[#082015] flex items-center gap-1 shadow-sm backdrop-blur-sm">
                      <ShieldCheck className="w-3 h-3 text-[#C9A84C]" />
                      <span>Verified</span>
                    </span>
                  </div>
                  {item.location && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white font-medium drop-shadow">
                      <MapPin className="w-3.5 h-3.5 text-[#E8D48A]" />
                      <span>{item.location.city}, {item.location.country}</span>
                    </div>
                  )}
                </div>

                <div className="p-7 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-[#082015] font-semibold group-hover:text-[#0F3826] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#4A5E53] mt-2 font-light line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

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
        )}
      </div>
    </div>
  );
}
