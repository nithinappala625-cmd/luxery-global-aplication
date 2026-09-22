import { notFound } from 'next/navigation';
import { getCategoryBySlug, getListings } from '@/lib/api';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import LuxuryAssetCard, { LuxuryAsset } from '@/components/home/LuxuryAssetCard';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category && slug !== 'all') {
    notFound();
  }

  const listings = await getListings({ categorySlug: slug === 'all' ? undefined : slug });

  const mappedAssets: LuxuryAsset[] = (listings || []).map((item) => {
    const rawImg = item.images?.[0];
    const imgUrl =
      typeof rawImg === 'string'
        ? rawImg
        : rawImg?.original_url ||
          rawImg?.optimized_url ||
          'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop';

    const specText = item.specifications?.[0]
      ? `${item.specifications[0].spec_key}: ${item.specifications[0].spec_value}`
      : '';

    return {
      id: item.id,
      title: item.title,
      subtitle: item.description?.slice(0, 100),
      category: item.category_name || category?.name || 'Curated Lot',
      location: item.location ? `${item.location.city}, ${item.location.country}` : 'Monaco / Geneva',
      year: item.year ? String(item.year) : '',
      specs: specText,
      priceFormatted: item.price ? `€${Number(item.price).toLocaleString()}` : 'PRICE ON REQUEST',
      isPoa: !item.price || item.price === 0,
      statusBadge: item.is_featured ? 'FEATURED LOT' : 'PRIVATE SALE',
      imageUrl: imgUrl,
      verified: item.status === 'verified',
    };
  });

  const categoryTitle = category?.name || (slug === 'all' ? 'All Acquisitions' : 'Curated Domain');

  return (
    <div className="bg-[#FCFBF7] text-[#080B09] min-h-screen pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Breadcrumb Back */}
        <div className="py-6 border-b border-[#D8D3C8] mb-8">
          <Link
            href="/#categories"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#080B09]/70 hover:text-[#061C16] font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO CURATED DOMAINS</span>
          </Link>
        </div>

        {/* Editorial Sector Header Banner */}
        <div className="relative bg-[#061C16] text-[#FCFBF7] p-8 sm:p-14 mb-12 border border-[#C6A15B]/20 overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C6A15B]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SOVEREIGN ASSET PORTFOLIO</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-tight">
              {categoryTitle}
            </h1>

            {category?.tagline && (
              <p
                className="text-base text-[#D8D3C8]/85 font-light leading-relaxed max-w-2xl"
                dangerouslySetInnerHTML={{ __html: category.tagline }}
              />
            )}

            {/* Asset Types Filter Strip */}
            {category?.asset_types && (
              <div className="pt-4 flex flex-wrap gap-2">
                {category.asset_types.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-[#080B09]/80 border border-[#C6A15B]/30 text-[9px] uppercase tracking-[0.2em] text-[#D8D3C8]"
                  >
                    {type}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Listings Catalogue Grid */}
        {mappedAssets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mappedAssets.map((asset) => (
              <LuxuryAssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <div className="p-16 border border-[#D8D3C8] text-center bg-white space-y-4">
            <h3 className="font-serif text-2xl text-[#061C16] font-light">
              Current Lots Under Bilateral Reservation
            </h3>
            <p className="text-xs text-[#080B09]/60 max-w-md mx-auto leading-relaxed">
              New lots in this domain are held in private off-market reserves. Contact the private office to receive the confidential prospectus under NDA.
            </p>
            <div className="pt-2">
              <Link
                href="/membership"
                className="inline-block px-6 py-3 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.25em] font-medium"
              >
                REQUEST PRIVATE DOSSIER
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
