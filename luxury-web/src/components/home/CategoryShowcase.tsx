import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  title: string;
  tagline: string;
  count: string;
  slug: string;
  imageUrl: string;
  span: string; // for asymmetrical grid sizing
}

const sectors: CategoryItem[] = [
  {
    id: 'aviation',
    title: 'Private Aviation',
    tagline: 'Ultra-long-range jets, VIP rotary craft, and fractional syndications.',
    count: '24 Available Lots',
    slug: 'aviation',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
    span: 'lg:col-span-8 aspect-[16/9]',
  },
  {
    id: 'marine',
    title: 'Marine & Superyachts',
    tagline: 'Custom displacement motor yachts, sailing superyachts, and berths.',
    count: '18 Available Lots',
    slug: 'marine',
    imageUrl: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=1200&auto=format&fit=crop',
    span: 'lg:col-span-4 aspect-[4/5]',
  },
  {
    id: 'real-estate',
    title: 'Exceptional Estates',
    tagline: 'Sovereign freehold islands, historic châteaux, and capital penthouses.',
    count: '32 Available Lots',
    slug: 'real-estate',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    span: 'lg:col-span-4 aspect-[4/5]',
  },
  {
    id: 'horology',
    title: 'Jewellery & Horology',
    tagline: 'Grand complications, independent master watchmakers, and investment gems.',
    count: '46 Available Lots',
    slug: 'jewellery-horology',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    span: 'lg:col-span-8 aspect-[16/9]',
  },
  {
    id: 'automotive',
    title: 'Automotive & Hypercars',
    tagline: 'Historical competition provenance, coachbuilt one-offs, and homologations.',
    count: '19 Available Lots',
    slug: 'automotive',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
    span: 'lg:col-span-7 aspect-[16/9]',
  },
  {
    id: 'art',
    title: 'Fine Art & Collectibles',
    tagline: 'Museum-calibre masterworks, sculpture, and blue-chip private treaty placements.',
    count: '15 Available Lots',
    slug: 'art-collectibles',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    span: 'lg:col-span-5 aspect-[4/3]',
  },
  {
    id: 'travel',
    title: 'Travel & Private Retreats',
    tagline: 'Buyout private atolls, alpine chalets, and remote sovereign sanctuaries.',
    count: '12 Available Lots',
    slug: 'travel-experiences',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    span: 'lg:col-span-5 aspect-[4/3]',
  },
  {
    id: 'opportunities',
    title: 'Private Opportunities',
    tagline: 'Direct corporate divestments, infrastructure concessions, and co-investments.',
    count: '8 Available Lots',
    slug: 'private-opportunities',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    span: 'lg:col-span-7 aspect-[16/9]',
  },
];

export default function CategoryShowcase() {
  return (
    <section id="categories" className="relative bg-[#F6F3EA] text-[#080B09] py-28 lg:py-36 border-b border-[#D8D3C8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-[#D8D3C8] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D7B3E] font-medium mb-3">
              <span className="w-1.5 h-1.5 bg-[#C6A15B] rotate-45" />
              <span>CURATED DOMAINS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#061C16]">
              Eight Sovereign Sectors of Acquisition.
            </h2>
          </div>
          <p className="text-xs text-[#080B09]/70 max-w-sm font-light leading-relaxed">
            Direct syndication and bilateral access across the world&apos;s most coveted asset classes.
          </p>
        </div>

        {/* Asymmetrical Magazine Image Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12">
          {sectors.map((sector) => (
            <Link
              key={sector.id}
              href={`/categories/${sector.slug}`}
              className={`group relative overflow-hidden bg-[#061C16] border border-[#D8D3C8] shadow-md transition-all duration-500 hover:shadow-2xl ${sector.span}`}
            >
              {/* Background Image with Zoom */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${sector.imageUrl}')` }}
              />

              {/* Sophisticated Dark Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061C16]/95 via-[#061C16]/40 to-black/30 group-hover:from-[#061C16]/90 transition-colors" />

              {/* Top Meta Tag */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] bg-[#061C16]/80 px-3 py-1 border border-[#C6A15B]/30 backdrop-blur-sm">
                  {sector.count}
                </span>
                <div className="w-8 h-8 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-white group-hover:border-[#C6A15B] group-hover:text-[#C6A15B] transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Bottom Information Panel */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-wide group-hover:text-[#C6A15B] transition-colors">
                  {sector.title}
                </h3>
                <p className="text-xs text-[#D8D3C8]/80 font-light max-w-md line-clamp-2 leading-relaxed">
                  {sector.tagline}
                </p>
              </div>

              {/* Subtle Gold Hairline on Hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-[#C6A15B]/40 transition-colors duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
