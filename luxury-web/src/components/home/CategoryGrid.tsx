import { 
  Ship, Plane, Building2, Gem, Watch, Car, 
  Palmtree, Trophy, Compass, ShieldCheck, Lock,
  ArrowRight
} from 'lucide-react';
import { ALL_CATEGORIES } from '@/lib/constants';
import { LuxuryCategory } from '@/types';

interface Props {
  categories?: LuxuryCategory[];
}

export default function CategoryGrid({ categories = ALL_CATEGORIES }: Props) {
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'marine': return <Ship className="w-6 h-6 text-[#E8D48A]" />;
      case 'aviation': return <Plane className="w-6 h-6 text-[#E8D48A]" />;
      case 'real-estate': return <Building2 className="w-6 h-6 text-[#E8D48A]" />;
      case 'jewellery': return <Gem className="w-6 h-6 text-[#E8D48A]" />;
      case 'watches': return <Watch className="w-6 h-6 text-[#E8D48A]" />;
      case 'cars': return <Car className="w-6 h-6 text-[#E8D48A]" />;
      case 'private-islands': return <Palmtree className="w-6 h-6 text-[#E8D48A]" />;
      case 'sports-experiences': return <Trophy className="w-6 h-6 text-[#E8D48A]" />;
      case 'travel-experiences': return <Compass className="w-6 h-6 text-[#E8D48A]" />;
      case 'digital-financial': return <ShieldCheck className="w-6 h-6 text-[#E8D48A]" />;
      case 'locker-storage': return <Lock className="w-6 h-6 text-[#E8D48A]" />;
      default: return <Gem className="w-6 h-6 text-[#E8D48A]" />;
    }
  };

  return (
    <section id="categories" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#A07830] font-bold">
            <span className="w-8 h-[1px] bg-[#C9A84C]" />
            <span>The Entire Luxury Ecosystem</span>
            <span className="w-8 h-[1px] bg-[#C9A84C]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#082015] tracking-tight">
            11 Global Luxury Verticals
          </h2>
          <p className="text-sm sm:text-base text-[#4A5E53] font-light leading-relaxed">
            Every category curated and authenticated under institutional provenance standards. Transact with direct escrow, certified title deeds, and white-glove logistics.
          </p>
        </div>

        {/* 3-Column Luxury Card Grid with White Cards & Deep Black-Green Headings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={cat.slug}
              className="group relative rounded-xl bg-white border border-[#E5EAE7] hover:border-[#082015] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-0 group-hover:opacity-100 transition-all" />

              <div className="p-8">
                {/* Header: Icon, Number */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-13 h-13 rounded-lg bg-[#051810] flex items-center justify-center shadow-md group-hover:bg-[#0F3826] transition-colors">
                    {getIcon(cat.slug)}
                  </div>
                  <span className="text-xs font-mono tracking-widest text-[#A07830] font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-[#082015] font-semibold group-hover:text-[#0F3826] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#7A8F83] mt-1.5 font-light line-clamp-1" dangerouslySetInnerHTML={{ __html: cat.tagline || '' }} />
                </div>

                {/* Subcategories / Asset Types Pills */}
                {cat.asset_types && cat.asset_types.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-[#E5EAE7] space-y-2.5">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#082015] font-bold">
                      Curated Classifications
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.asset_types.slice(0, 6).map((type) => (
                        <span
                          key={type}
                          className="px-2.5 py-1 rounded text-[10px] bg-[#F5F5F2] border border-[#E5EAE7] text-[#082015] font-medium hover:border-[#082015] transition-colors"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Action Bar */}
              <div className="px-8 py-4 bg-[#FAFAF8] border-t border-[#E5EAE7] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#082015] font-semibold px-2 py-0.5 rounded bg-white border border-[#E5EAE7]">
                    BUY
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#082015] font-semibold px-2 py-0.5 rounded bg-white border border-[#E5EAE7]">
                    SELL
                  </span>
                  {cat.slug !== 'watches' && cat.slug !== 'jewellery' ? (
                    <span className="text-[9px] uppercase tracking-wider text-[#082015] font-semibold px-2 py-0.5 rounded bg-white border border-[#E5EAE7]">
                      {cat.slug === 'aviation' || cat.slug === 'marine' ? 'CHARTER' : 'RENT'}
                    </span>
                  ) : (
                    <span className="text-[9px] uppercase tracking-wider text-[#A07830] font-bold px-2 py-0.5 rounded bg-[#FAF6EE] border border-[#E8D48A]">
                      SALES ONLY
                    </span>
                  )}
                </div>

                <a
                  href={
                    cat.slug === 'aviation'
                      ? '/aviation'
                      : cat.slug === 'marine'
                      ? '/marine'
                      : cat.slug === 'cars' || cat.slug === 'automotive'
                      ? '/automotive'
                      : cat.slug === 'watches'
                      ? '/watches'
                      : cat.slug === 'jewellery'
                      ? '/jewellery'
                      : `/categories/${cat.slug}`
                  }
                  className="text-xs font-bold tracking-wider uppercase text-[#082015] group-hover:text-[#A07830] flex items-center gap-1 transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C9A84C]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
