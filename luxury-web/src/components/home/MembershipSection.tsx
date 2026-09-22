'use client';

import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import { ShieldCheck, Check } from 'lucide-react';

interface Tier {
  name: string;
  tagline: string;
  focus: string;
  privileges: string[];
  recommendedFor: string;
}

const tiers: Tier[] = [
  {
    name: 'FOUNDATION',
    tagline: 'Accredited Collector & Direct Buyer',
    focus: 'Primary catalog access & verified direct inquiries.',
    privileges: [
      'Access to verified public inventory across all 8 domains',
      'Direct bilateral message routing to certified dealers',
      'Curated quarterly acquisitions digest & auction previews',
      'Priority access to physical viewings in London & Geneva',
    ],
    recommendedFor: 'Qualified private collectors and emerging asset owners.',
  },
  {
    name: 'PREMIER',
    tagline: 'Multi-Sector Discretionary Portfolio',
    focus: 'Priority allocation & assigned acquisition officer.',
    privileges: [
      'All Foundation privileges',
      'Assigned personal Acquisition Desk Officer',
      'Early pre-catalogue viewings (72-hour window)',
      'Confidential off-market inquiry privileges under standard NDA',
      'Invitations to private salon dinners in Monaco, Dubai & London',
    ],
    recommendedFor: 'Active collectors and family office principals.',
  },
  {
    name: 'ELITE',
    tagline: 'Cross-Border Syndicate & Off-Market Tier',
    focus: 'Full off-market catalogue & aviation charter desk.',
    privileges: [
      'All Premier privileges',
      'Unrestricted access to the classified Off-Market Directory',
      'Dedicated bespoke Aviation & Superyacht charter concierge',
      'Cross-border asset transfer advisory & tax neutrality structuring',
      'Bespoke search mandate execution across 42 jurisdictions',
    ],
    recommendedFor: 'Ultra-high-net-worth individuals and corporate operators.',
  },
  {
    name: 'ULTRA',
    tagline: 'Single Family Office & Sovereign Mandate',
    focus: 'Direct buy-side execution & fiduciary settlement.',
    privileges: [
      'All Elite privileges',
      'Custom multi-currency Swiss & UK escrow facilities',
      'Co-investment rights in sovereign real estate & private equity syndicates',
      'Dedicated international legal liaison for title & registry transfer',
      'Executive physical asset security & transport protocol',
    ],
    recommendedFor: 'Single family offices and institutional family trusts.',
  },
  {
    name: 'LEGACY',
    tagline: 'Institutional Patrimony & Generational Advisory',
    focus: 'Bespoke board advisory & multi-generational stewardship.',
    privileges: [
      'All Ultra privileges',
      'Direct advisory access to NP GROUPS International Board',
      'Multi-generational collection cataloguing & museum placement desk',
      'Bespoke private treaty placement for estate liquidation',
      'Diplomatic and sovereign territory acquisition assistance',
    ],
    recommendedFor: 'Prominent family offices and institutional foundations.',
  },
];

export default function MembershipSection() {
  const { openEnquiry } = useLuxuryUI();

  return (
    <section id="membership" className="relative bg-[#FCFBF7] text-[#080B09] py-28 lg:py-36 border-b border-[#D8D3C8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pb-16">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D7B3E] font-medium">
            <span className="w-1.5 h-1.5 bg-[#C6A15B] rotate-45" />
            <span>SELECTIVE ADMISSION</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#061C16] tracking-tight">
            THE PRIVATE CIRCLE
          </h2>

          <p className="font-serif text-xl sm:text-2xl text-[#061C16] font-light italic">
            &ldquo;Access is considered, not assumed.&rdquo;
          </p>

          <p className="text-xs sm:text-sm text-[#080B09]/70 font-light leading-relaxed max-w-xl mx-auto pt-2">
            Membership provides vetted principals, family offices, and certified dealers with privileged access to off-market portfolios, bilateral transaction routing, and dedicated advisory desks.
          </p>
        </div>

        {/* Vertical Membership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="group relative bg-white border border-[#D8D3C8] hover:border-[#C6A15B] p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-xl"
            >
              {/* Subtle top indicator */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#C6A15B] transition-colors" />

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-semibold block">
                    TIER
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#061C16] tracking-wide mt-1">
                    {tier.name}
                  </h3>
                  <p className="text-[11px] text-[#9D7B3E] font-light mt-1 italic">
                    {tier.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D8D3C8]/60">
                  <p className="text-xs text-[#080B09]/80 font-medium leading-snug">
                    {tier.focus}
                  </p>
                </div>

                {/* Privileges list */}
                <div className="pt-3 space-y-2.5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#080B09]/40 font-medium block">
                    Privileges
                  </span>
                  <ul className="space-y-2 text-xs text-[#080B09]/70 font-light">
                    {tier.privileges.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 leading-tight">
                        <Check className="w-3 h-3 text-[#C6A15B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Application Button */}
              <div className="pt-8 mt-6 border-t border-[#D8D3C8]/60 space-y-3">
                <button
                  onClick={() =>
                    openEnquiry({
                      title: `Application for ${tier.name} Circle`,
                      subtitle: `Submit your credentials for ${tier.name} tier admission. Vetted by our international admissions committee.`,
                      defaultVertical: 'Private Opportunities',
                    })
                  }
                  className="w-full py-3 border border-[#061C16] text-[#061C16] group-hover:bg-[#061C16] group-hover:text-white text-[10px] uppercase tracking-[0.25em] font-medium transition-all"
                >
                  APPLY FOR MEMBERSHIP
                </button>
                <div className="text-[9px] text-[#080B09]/50 text-center uppercase tracking-[0.15em]">
                  Committee Review
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust disclaimer */}
        <div className="pt-16 max-w-2xl mx-auto text-center text-xs text-[#080B09]/60 font-light leading-relaxed border-t border-[#D8D3C8] mt-16">
          <ShieldCheck className="w-4 h-4 text-[#C6A15B] mx-auto mb-2" />
          <p>
            Admission to The Private Circle is strictly by application and reference evaluation. NP GROUPS maintains unilateral discretion over membership acceptance and ongoing affiliation.
          </p>
        </div>
      </div>
    </section>
  );
}
