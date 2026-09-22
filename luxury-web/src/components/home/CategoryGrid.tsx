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
      case 'marine': return <Ship className="w-6 h-6 text-[#C9A84C]" />;
      case 'aviation': return <Plane className="w-6 h-6 text-[#C9A84C]" />;
      case 'real-estate': return <Building2 className="w-6 h-6 text-[#C9A84C]" />;
      case 'jewellery': return <Gem className="w-6 h-6 text-[#C9A84C]" />;
      case 'watches': return <Watch className="w-6 h-6 text-[#C9A84C]" />;
      case 'cars': return <Car className="w-6 h-6 text-[#C9A84C]" />;
      case 'private-islands': return <Palmtree className="w-6 h-6 text-[#C9A84C]" />;
      case 'sports-experiences': return <Trophy className="w-6 h-6 text-[#C9A84C]" />;
      case 'travel-experiences': return <Compass className="w-6 h-6 text-[#C9A84C]" />;
      case 'digital-financial': return <ShieldCheck className="w-6 h-6 text-[#C9A84C]" />;
      case 'locker-storage': return <Lock className="w-6 h-6 text-[#C9A84C]" />;
      default: return <Gem className="w-6 h-6 text-[#C9A84C]" />;
    }
  };

  return (
    <section id="categories" className="py-24 bg-[#04150D]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] font-semibold">
            <span className="w-6 h-[1px] bg-[#C9A84C]" />
            <span>The Entire Luxury Ecosystem</span>
            <span className="w-6 h-[1px] bg-[#C9A84C]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-wide">
            11 Global Luxury Verticals
          </h2>
          <p className="text-sm text-[#8CA090] font-light leading-relaxed">
            Every category curated and authenticated under institutional provenance standards. Transact with direct escrow, certified title deeds, and white-glove logistics.
          </p>
        </div>

        {/* 3-Column Luxury Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.slug}
              className="group relative rounded bg-[#0A3320]/60 border border-[#1E7A47]/30 hover:border-[#C9A84C]/50 hover:bg-[#0F4A2C]/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent group-hover:via-[#C9A84C] transition-all" />

              <div className="p-6">
                {/* Header: Icon, Number, Name */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded bg-[#04150D]/80 border border-[#1E7A47]/40 flex items-center justify-center group-hover:border-[#C9A84C]/50 transition-colors">
                    {getIcon(cat.slug)}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#C9A84C] font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-medium group-hover:text-[#E8D48A] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#8CA090] mt-1 font-light line-clamp-1" dangerouslySetInnerHTML={{ __html: cat.tagline || '' }} />
                </div>

                {/* Subcategories / Asset Types Pills */}
                {cat.asset_types && cat.asset_types.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#C9A84C] font-semibold">
                      Curated Classifications
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.asset_types.slice(0, 6).map((type) => (
                        <span
                          key={type}
                          className="px-2 py-0.5 rounded text-[10px] bg-[#04150D]/60 border border-[#1E7A47]/30 text-[#D4D8D2]/90 hover:border-[#C9A84C]/40 transition-colors"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Action Bar */}
              <div className="px-6 py-4 bg-[#04150D]/50 border-t border-[#1E7A47]/20 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#8CA090] px-1.5 py-0.5 rounded bg-white/5">
                    BUY
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#8CA090] px-1.5 py-0.5 rounded bg-white/5">
                    SELL
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#8CA090] px-1.5 py-0.5 rounded bg-white/5">
                    RENT
                  </span>
                </div>

                <a
                  href={`/categories/${cat.slug}`}
                  className="text-xs font-semibold tracking-wider uppercase text-[#C9A84C] group-hover:text-[#E8D48A] flex items-center gap-1 transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
