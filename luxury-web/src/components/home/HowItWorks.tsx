import { Search, MessageSquare, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Browse & Discover',
      desc: 'Explore thousands of verified ultra-luxury listings across 11 verticals filtered by jurisdiction, rarity, and price.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Connect & Enquire',
      desc: 'Connect directly with verified sellers, yacht brokers, aircraft managers, and private banks via encrypted channels.',
      icon: MessageSquare,
    },
    {
      num: '03',
      title: 'Verify & Authenticate',
      desc: 'Every asset undergoes forensic multi-step verification — title checks, GIA/service logs, and third-party inspection.',
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: 'Transact Securely',
      desc: 'Execute settlements with confidence using Swiss/London escrow, legal structure advisory, and multi-currency rails.',
      icon: CreditCard,
    },
    {
      num: '05',
      title: 'Enjoy Your Asset',
      desc: 'Take title delivery. Our after-sale concierge oversees registration, berthing, flight management, and ongoing custody.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="process" className="py-24 bg-[#04150D] border-t border-[#1E7A47]/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] font-semibold">
            <span>The Acquisition Protocol</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-wide">
            How NP GROUPS Operates
          </h2>
          <p className="text-sm text-[#8CA090] font-light leading-relaxed">
            Institutional deal-making made frictionless for ultra-high-net-worth principals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative rounded-lg bg-[#0A3320]/40 border border-[#1E7A47]/30 p-6 flex flex-col justify-between hover:border-[#C9A84C]/40 hover:bg-[#0F4A2C]/60 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl text-[#C9A84C] font-light">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded bg-[#04150D]/80 border border-[#1E7A47]/40 flex items-center justify-center text-[#C9A84C]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg text-white font-medium mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#8CA090] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
