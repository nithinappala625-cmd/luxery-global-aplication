'use client';

import { useState } from 'react';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import { ShieldCheck, Check, ArrowRight, Lock, FileCheck2 } from 'lucide-react';

const tiers = [
  {
    name: 'FOUNDATION',
    tagline: 'Accredited Collector & Direct Buyer',
    scope: 'Primary catalog access & verified bilateral direct inquiries.',
    privileges: [
      'Access to verified public inventory across all 8 domains',
      'Direct bilateral message routing to certified dealers',
      'Curated quarterly acquisitions digest & auction previews',
      'Priority access to physical viewings in London & Geneva',
    ],
    vetting: 'Proof of principal identity & primary address verification.',
  },
  {
    name: 'PREMIER',
    tagline: 'Multi-Sector Discretionary Portfolio',
    scope: 'Priority allocation & assigned acquisition officer.',
    privileges: [
      'All Foundation privileges',
      'Assigned personal Acquisition Desk Officer',
      'Early pre-catalogue viewings (72-hour window)',
      'Confidential off-market inquiry privileges under standard NDA',
      'Invitations to private salon dinners in Monaco, Dubai & London',
    ],
    vetting: 'Commercial or personal bank reference attestation.',
  },
  {
    name: 'ELITE',
    tagline: 'Cross-Border Syndicate & Off-Market Tier',
    scope: 'Full off-market catalogue & aviation charter desk.',
    privileges: [
      'All Premier privileges',
      'Unrestricted access to the classified Off-Market Directory',
      'Dedicated bespoke Aviation & Superyacht charter concierge',
      'Cross-border asset transfer advisory & tax neutrality structuring',
      'Bespoke search mandate execution across 42 jurisdictions',
    ],
    vetting: 'Accredited investor or beneficial owner verification.',
  },
  {
    name: 'ULTRA',
    tagline: 'Single Family Office & Sovereign Mandate',
    scope: 'Direct buy-side execution & fiduciary settlement.',
    privileges: [
      'All Elite privileges',
      'Custom multi-currency Swiss & UK escrow facilities',
      'Co-investment rights in sovereign real estate & private equity syndicates',
      'Dedicated international legal liaison for title & registry transfer',
      'Executive physical asset security & transport protocol',
    ],
    vetting: 'Institutional fiduciary audit or family office credentialing.',
  },
  {
    name: 'LEGACY',
    tagline: 'Institutional Patrimony & Generational Advisory',
    scope: 'Bespoke board advisory & multi-generational stewardship.',
    privileges: [
      'All Ultra privileges',
      'Direct advisory access to NP GROUPS International Board',
      'Multi-generational collection cataloguing & museum placement desk',
      'Bespoke private treaty placement for estate liquidation',
      'Diplomatic and sovereign territory acquisition assistance',
    ],
    vetting: 'By invitation and unanimous committee evaluation only.',
  },
];

export default function MembershipPage() {
  const { openEnquiry } = useLuxuryUI();
  const [selectedTier, setSelectedTier] = useState('PREMIER');

  return (
    <div className="bg-[#FCFBF7] text-[#080B09] min-h-screen pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto py-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D7B3E] font-medium">
            <span className="w-1.5 h-1.5 bg-[#C6A15B] rotate-45" />
            <span>ADMISSIONS DOSSIER</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#061C16] tracking-tight">
            THE PRIVATE CIRCLE
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#061C16] font-light italic">
            &ldquo;Access is considered, not assumed.&rdquo;
          </p>

          <p className="text-xs sm:text-sm text-[#080B09]/70 font-light leading-relaxed max-w-xl mx-auto pt-2">
            The Private Circle is an international assembly of verified asset owners, single family offices, certified operators, and collectors. All applications undergo bilateral compliance review.
          </p>
        </div>

        {/* 5 Vertical Membership Cards Grid */}
        <div id="tiers" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-8 mb-24">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`group relative bg-white border p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-xl ${
                selectedTier === tier.name
                  ? 'border-[#061C16] shadow-md ring-1 ring-[#061C16]'
                  : 'border-[#D8D3C8] hover:border-[#C6A15B]'
              }`}
            >
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
                    {tier.scope}
                  </p>
                </div>

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

              <div className="pt-6 mt-6 border-t border-[#D8D3C8]/60 space-y-3">
                <button
                  onClick={() => {
                    setSelectedTier(tier.name);
                    openEnquiry({
                      title: `Application: ${tier.name} Circle`,
                      subtitle: `Submit credentials for ${tier.name} tier admission. Bilateral compliance review.`,
                      defaultVertical: 'Private Opportunities',
                    });
                  }}
                  className="w-full py-3 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-[#C6A15B] hover:text-[#061C16] transition-all"
                >
                  APPLY FOR ACCESS
                </button>
                <div className="text-[9px] text-[#080B09]/50 text-center uppercase tracking-[0.15em]">
                  {tier.vetting}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Admissions Protocol Guide */}
        <div id="apply" className="bg-[#061C16] text-[#FCFBF7] border border-[#C6A15B]/20 p-8 sm:p-14 shadow-2xl">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B]">
                CONFIDENTIAL APPLICATION PROTOCOL
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
                How Applications Are Evaluated
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-[#C6A15B]/20 text-xs text-[#D8D3C8]/80 font-light leading-relaxed">
              <div className="space-y-2">
                <span className="text-[#C6A15B] font-mono block">STAGE 01</span>
                <h4 className="font-serif text-lg text-white font-normal">Preliminary Submission</h4>
                <p>
                  Submit your principal dossier including legal entity name, jurisdiction of tax residency, and asset categories of primary interest.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[#C6A15B] font-mono block">STAGE 02</span>
                <h4 className="font-serif text-lg text-white font-normal">Compliance Review</h4>
                <p>
                  Our Geneva compliance desk conducts independent KYC/AML and beneficial ownership confirmation under international banking protocols.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[#C6A15B] font-mono block">STAGE 03</span>
                <h4 className="font-serif text-lg text-white font-normal">Desk Activation</h4>
                <p>
                  Upon admission, you are assigned a dedicated Acquisition Desk Officer and issued encrypted credentials for bilateral communications.
                </p>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-[#D8D3C8]/60">
                <FileCheck2 className="w-4 h-4 text-[#C6A15B]" />
                <span>Zero Public Indexation &middot; Bilateral NDA Encrypted</span>
              </div>

              <button
                onClick={() =>
                  openEnquiry({
                    title: 'Private Circle Application',
                    subtitle: 'Direct submission to the admissions committee.',
                    defaultVertical: 'Private Opportunities',
                  })
                }
                className="px-8 py-3.5 bg-[#FCFBF7] text-[#061C16] text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] transition-all"
              >
                SUBMIT APPLICATION DOSSIER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
