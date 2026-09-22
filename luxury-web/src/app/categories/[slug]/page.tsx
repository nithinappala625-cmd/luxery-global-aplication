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
    <div className="pt-28 pb-20 bg-[#04150D] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb / Back */}
        <a
          href="/#categories"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8CA090] hover:text-[#C9A84C] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Verticals</span>
        </a>

        {/* Category Header Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#071F12] via-[#0A3320] to-[#04150D] border border-[#1E7A47]/40 p-8 sm:p-12 mb-12 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C9A84C] font-semibold block">
              Vertical 0{category.sort_order} &middot; Institutional Catalog
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-white font-light">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-[#D4D8D2] font-serif italic" dangerouslySetInnerHTML={{ __html: category.tagline || '' }} />

            {/* Subcategories / Asset Types Pills */}
            {category.asset_types && (
              <div className="pt-4 flex flex-wrap gap-2">
                {category.asset_types.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 rounded text-xs bg-[#04150D]/80 border border-[#1E7A47]/40 text-[#D4D8D2]"
                  >
                    {type}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filter / Action Bar */}
        <div className="p-4 rounded bg-[#071F12] border border-[#1E7A47]/30 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#C9A84C] font-semibold">
              Modes:
            </span>
            {['ALL', 'BUY', 'SELL', 'RENT', 'CHARTER', 'BOOK'].map((mode) => (
              <button
                key={mode}
                className="px-3 py-1 rounded text-[10px] tracking-wider uppercase font-medium bg-[#04150D] border border-[#1E7A47]/40 text-[#D4D8D2] hover:border-[#C9A84C] transition-colors"
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#8CA090]">
            Showing <span className="text-white font-medium">{listings.length}</span> Verified Assets
          </div>
        </div>

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <div className="py-20 text-center rounded-xl bg-[#071F12]/50 border border-[#1E7A47]/20 p-12">
            <p className="font-serif text-2xl text-white mb-2">No Public Listings Cataloged</p>
            <p className="text-sm text-[#8CA090] max-w-md mx-auto mb-6">
              Assets in this vertical are currently transacting through private treaty and off-market confidential deal rooms.
            </p>
            <a
              href="/membership"
              className="inline-block px-6 py-3 rounded bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-[#04150D] text-xs font-bold uppercase tracking-widest"
            >
              Request Private Dossier Access
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((item) => (
              <div
                key={item.id}
                className="group rounded-lg bg-[#0A3320]/70 border border-[#1E7A47]/30 hover:border-[#C9A84C]/60 hover:bg-[#0F4A2C]/90 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#04150D]">
                  <img
                    src={item.images[0]?.original_url || category.banner_url || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04150D] via-transparent to-black/20" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded text-[9px] font-bold tracking-widest uppercase bg-[#C9A84C] text-[#04150D]">
                      {category.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-semibold tracking-wider uppercase bg-[#04150D]/80 border border-[#1E7A47]/40 text-[#E8D48A] flex items-center gap-1 backdrop-blur-sm">
                      <ShieldCheck className="w-3 h-3 text-[#C9A84C]" />
                      <span>Verified</span>
                    </span>
                  </div>
                  {item.location && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-white/90 drop-shadow">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                      <span>{item.location.city}, {item.location.country}</span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-white font-medium group-hover:text-[#E8D48A] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#8CA090] mt-2 font-light line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

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
        )}
      </div>
    </div>
  );
}
