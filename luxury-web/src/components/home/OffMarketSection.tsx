'use client';

import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import { Lock, FileCheck2, ArrowRight } from 'lucide-react';

interface OffMarketItem {
  id: string;
  category: string;
  codename: string;
  specs: string;
  jurisdiction: string;
  tenure: string;
  description: string;
  imageUrl: string;
}

const offMarketCatalogue: OffMarketItem[] = [
  {
    id: 'om-aircraft',
    category: 'Private Aircraft',
    codename: 'PROJECT PEGASUS // G700',
    specs: 'Ultra-Long Range · 19 VIP Seats',
    jurisdiction: 'Geneva Registry',
    tenure: 'Syndicate Disposal',
    description: 'Fresh manufacture completion with turnkey intercontinental avionics and custom whisper-quiet cabin configuration.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'om-superyacht',
    category: 'Superyachts',
    codename: 'M/Y AURELIA // 72M DISPLACEMENT',
    specs: '72.4 Metres · Steel / Aluminium',
    jurisdiction: 'Monaco Flag',
    tenure: 'Discreet Owner Mandate',
    description: 'Master stateroom with private fold-down balcony, commercial helipad, beach club spa, and 6,000nm transatlantic range.',
    imageUrl: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'om-island',
    category: 'Private Islands',
    codename: 'ATOLL ESPERANZA // BAHAMAS',
    specs: '160 Acres Freehold · Deep Water',
    jurisdiction: 'Commonwealth Sovereignty',
    tenure: 'Sovereign Freehold',
    description: 'Pristine sovereign freehold island with certified runway feasibility, natural deep-water marina basin, and two private beaches.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'om-estate',
    category: 'Exceptional Estates',
    codename: 'CHÂTEAU DE COUBERT // NORMANDY',
    specs: '3,200 sq.m · 140 Hectares',
    jurisdiction: 'French Republic',
    tenure: 'Private Treaty',
    description: '18th-century French architectural monument with historic classification, restored equestrian facilities, and private hunting grounds.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'om-art',
    category: 'Rare Art',
    codename: 'POST-WAR OIL ON CANVAS // 1961',
    specs: 'Important European Provenance',
    jurisdiction: 'Geneva Free Port Vault',
    tenure: 'Direct Foundation Sale',
    description: 'Seminal abstract expressionist masterwork. Unseen publicly since 1978. Fully authenticated with catalogue raisonné indexation.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'om-automobile',
    category: 'Historic Automobiles',
    codename: '1962 COMPETITION SWB BERLINETTA',
    specs: 'Matching Numbers · Classiche Red Book',
    jurisdiction: 'United Kingdom',
    tenure: 'Private Consignment',
    description: 'Factory lightweight period competition history with Goodwood Revival eligibility and immaculate continuous mechanical stewardship.',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'om-collectibles',
    category: 'Rare Collectibles',
    codename: 'THE L'
      + 'ÉTOILE ROYALE // 14.2CT FANCY VIVID',
    specs: 'Type IIb Diamond · Flawless Clarity',
    jurisdiction: 'Zurich Vault',
    tenure: 'Institutional Placement',
    description: 'Exceptional untreated fancy vivid blue diamond with GIA monographic pedigree report and sovereign bank custody.',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
  },
];

export default function OffMarketSection() {
  const { openEnquiry } = useLuxuryUI();

  return (
    <section id="off-market" className="relative bg-[#080B09] text-[#FCFBF7] py-28 lg:py-36 border-b border-[#C6A15B]/20 overflow-hidden">
      {/* Background Deep Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C6A15B] rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-[#C6A15B]/20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>CONFIDENTIAL INVENTORY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-wide">
              OFF-MARKET
            </h2>
            <p className="font-serif text-lg sm:text-xl text-[#D8D3C8]/80 font-light italic mt-2">
              Opportunities that are not intended for the open market.
            </p>
          </div>

          <div className="text-xs text-[#D8D3C8]/60 font-light max-w-md leading-relaxed">
            All listings in this section require bilateral non-disclosure agreements and proof of capability prior to technical dossier disclosure.
          </div>
        </div>

        {/* Off-Market Catalogue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {offMarketCatalogue.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#061C16] border border-[#C6A15B]/20 hover:border-[#C6A15B]/50 transition-all duration-500 flex flex-col justify-between p-6 sm:p-8"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/9] overflow-hidden border border-white/5 mb-6">
                <div
                  className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 opacity-60"
                  style={{ backgroundImage: `url('${item.imageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061C16] via-[#061C16]/60 to-transparent" />
                <div className="absolute top-3 left-3 bg-[#080B09]/90 border border-[#C6A15B]/30 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-[#C6A15B]">
                  {item.category}
                </div>
              </div>

              {/* Codename & Spec */}
              <div className="space-y-3 flex-grow">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#C6A15B]">
                  <span>{item.jurisdiction}</span>
                  <span>{item.tenure}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-light text-white group-hover:text-[#C6A15B] transition-colors">
                  {item.codename}
                </h3>

                <p className="text-xs text-[#D8D3C8]/70 font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 text-[10px] tracking-[0.2em] uppercase text-[#D8D3C8]/50">
                  {item.specs}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-[#C6A15B]/80">
                  <FileCheck2 className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>NDA Required</span>
                </div>

                <button
                  onClick={() =>
                    openEnquiry({
                      title: 'Request Confidential Dossier',
                      subtitle: `Confidential dossier and preliminary prospectus for ${item.codename}. Bilateral NDA required.`,
                      assetTitle: item.codename,
                      defaultVertical: item.category,
                    })
                  }
                  className="px-4 py-2 border border-[#C6A15B]/40 text-[#C6A15B] text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#C6A15B] hover:text-[#080B09] transition-all"
                >
                  REQUEST DOSSIER
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
