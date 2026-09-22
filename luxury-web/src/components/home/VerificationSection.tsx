import { CheckCircle2, ShieldCheck, FileCheck, Award, UserCheck } from 'lucide-react';

interface VerificationPillar {
  title: string;
  category: string;
  scope: string;
  standard: string;
  icon: any;
}

const pillars: VerificationPillar[] = [
  {
    title: 'Identity Verified',
    category: 'PRINCIPAL AUTHENTICATION',
    scope: 'Government-issued biometrics, passport validation, and beneficial ownership identification under global KYC/AML standards.',
    standard: 'Tier-1 International Bank Standard KYC/AML',
    icon: UserCheck,
  },
  {
    title: 'Business Verified',
    category: 'ENTITY CREDENTIALING',
    scope: 'Corporate registry status, authorized signatory powers, fiscal domicile verification, and professional liability coverage.',
    standard: 'Sovereign Commercial Registry Verification',
    icon: ShieldCheck,
  },
  {
    title: 'Broker Verified',
    category: 'PROFESSIONAL STANDING',
    scope: 'Active licensure with recognized bodies (MYBA, EBAA, NBAA, RICS), confirmed transaction track record, and escrow bonding.',
    standard: 'Accredited Professional Association Standing',
    icon: Award,
  },
  {
    title: 'Operator Documentation Reviewed',
    category: 'TECHNICAL OPERATIONS',
    scope: 'Air Operator Certificates (AOC), maritime classification society certificates (Lloyd\'s, RINA, ABS), and current maintenance records.',
    standard: 'Current Regulatory Class & Survey Compliance',
    icon: FileCheck,
  },
  {
    title: 'Listing Documentation Reviewed',
    category: 'ASSET PROVENANCE',
    scope: 'Preliminary title deeds, hull/chassis serial verification, maintenance log completeness, and unencumbered lien checks.',
    standard: 'Fiduciary Title Audit & Documentation Review',
    icon: CheckCircle2,
  },
];

export default function VerificationSection() {
  return (
    <section id="verification" className="relative bg-[#061C16] text-[#FCFBF7] py-28 lg:py-36 border-b border-[#C6A15B]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4 pb-16">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium">
            <span className="w-1.5 h-1.5 bg-[#C6A15B] rotate-45" />
            <span>DISCIPLINE &amp; DUE DILIGENCE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
            SELECTIVE BY DESIGN.
          </h2>

          <p className="text-sm sm:text-base text-[#D8D3C8]/80 font-light leading-relaxed max-w-2xl">
            We operate on a principle of radical selectivity. Before any asset dossier or member request is admitted into our private network, documentation is rigorously reviewed.
          </p>
        </div>

        {/* 5 Verification Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-[#080B09]/60 border border-[#C6A15B]/20 p-6 flex flex-col justify-between space-y-6 hover:border-[#C6A15B] transition-colors"
              >
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-full border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#C6A15B] font-medium block">
                      {pillar.category}
                    </span>
                    <h3 className="font-serif text-xl font-light text-white mt-1">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#D8D3C8]/70 font-light leading-relaxed">
                    {pillar.scope}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 text-[9px] uppercase tracking-[0.15em] text-[#C6A15B]/80 font-medium">
                  {pillar.standard}
                </div>
              </div>
            );
          })}
        </div>

        {/* Curation Guarantee Note */}
        <div className="pt-16 mt-16 border-t border-[#C6A15B]/15 max-w-3xl">
          <p className="text-xs text-[#D8D3C8]/60 font-light leading-relaxed">
            <strong className="text-[#C6A15B] font-medium uppercase tracking-wider block mb-1">
              Independent Technical Verification Notice
            </strong>
            NP GROUPS verifies documentation integrity and participant legitimacy prior to network publication. Independent physical surveys, marine sea trials, flight tests, and horological appraisals by certified specialists accompany every qualified transaction prior to binding legal closing.
          </p>
        </div>
      </div>
    </section>
  );
}
