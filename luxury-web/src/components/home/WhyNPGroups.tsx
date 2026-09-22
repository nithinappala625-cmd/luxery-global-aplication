import { Shield, Globe2, KeyRound, UserCheck, Lock, Scale } from 'lucide-react';

export default function WhyNPGroups() {
  const pillars = [
    {
      title: '100% Verified Listings & KYC',
      desc: 'Zero tolerance for fraudulent or phantom assets. Every seller, vessel, airframe, and timepiece is rigorously vetted before catalog publication.',
      icon: Shield,
    },
    {
      title: 'Global High-Net-Worth Network',
      desc: 'Spanning 120+ jurisdictions with private client salons in London, Monaco, Dubai, Mumbai, and Geneva.',
      icon: Globe2,
    },
    {
      title: 'Exclusive Off-Market Access',
      desc: 'The rarest hypercars, trophy penthouses, and sovereign islands transact discreetly without public press exposure.',
      icon: KeyRound,
    },
    {
      title: 'End-to-End Deal Stewardship',
      desc: 'From initial letter of intent through title conveyance, maritime survey, FAA airworthiness, and secure escrow settlement.',
      icon: UserCheck,
    },
    {
      title: 'Uncompromised Confidentiality',
      desc: 'All communications, deal rooms, and proof of funds are encrypted with military-grade privacy and non-disclosure standards.',
      icon: Lock,
    },
    {
      title: 'Strict Cross-Border Compliance',
      desc: 'Full alignment with Swiss FINMA, UK FCA, Dubai DFSA, and FATF AML/CFT standards for frictionless international settlement.',
      icon: Scale,
    },
  ];

  return (
    <section id="why" className="py-28 bg-white border-t border-[#E5EAE7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#A07830] font-bold">
            <span>The Trust Standard</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#082015] tracking-tight">
            The NP GROUPS Distinction
          </h2>
          <p className="text-sm sm:text-base text-[#4A5E53] font-light leading-relaxed">
            Why sovereign wealth managers, private family offices, and discerning connoisseurs select our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-xl bg-[#FAFAF8] border border-[#E5EAE7] p-8 hover:border-[#082015] hover:bg-white transition-all shadow-sm hover:shadow-xl group"
              >
                <div className="w-13 h-13 rounded-lg bg-[#051810] flex items-center justify-center text-[#E8D48A] mb-6 group-hover:bg-[#0F3826] transition-colors shadow">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#082015] font-semibold mb-3">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5E53] font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
