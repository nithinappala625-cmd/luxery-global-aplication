import { Check, Crown, Shield, Star, ArrowRight } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '@/lib/constants';

export default function MembershipPreview() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#04150D] via-[#071F12] to-[#04150D] border-t border-[#1E7A47]/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] font-semibold">
            <Crown className="w-3.5 h-3.5" />
            <span>Sovereign Privilege</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-wide">
            Elite Membership Tiers
          </h2>
          <p className="text-sm text-[#8CA090] font-light leading-relaxed">
            Gain verified status, unlock private off-market listings, access direct bilateral deal rooms, and command our 24/7 Mayfair & Monaco concierge salons.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl flex flex-col justify-between p-8 transition-all duration-300 ${
                plan.is_popular
                  ? 'bg-gradient-to-b from-[#0F4A2C] to-[#0A3320] border-2 border-[#C9A84C] shadow-[0_0_40px_rgba(201,168,76,0.2)] lg:-translate-y-3'
                  : 'bg-[#0A3320]/50 border border-[#1E7A47]/30 hover:border-[#C9A84C]/50'
              }`}
            >
              {plan.is_popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-[#04150D] text-[10px] font-bold tracking-[0.25em] uppercase shadow-lg">
                  Most Requested Tier
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3 className="font-serif text-2xl text-white font-medium">
                    {plan.name}
                  </h3>
                  {plan.tier === 'platinum' ? (
                    <Crown className="w-6 h-6 text-[#C9A84C]" />
                  ) : plan.tier === 'gold' ? (
                    <Star className="w-6 h-6 text-[#C9A84C]" />
                  ) : (
                    <Shield className="w-6 h-6 text-[#8CA090]" />
                  )}
                </div>

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold mb-6">
                  {plan.tagline}
                </p>

                <div className="mb-8 pb-6 border-b border-white/10">
                  <div className="font-serif text-4xl sm:text-5xl text-white font-normal">
                    ₹{(plan.price_annual / 1000).toLocaleString('en-IN')}k
                    <span className="text-xs text-[#8CA090] font-sans font-normal ml-2">
                      / annum
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3.5 mb-8">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3 text-xs text-[#D4D8D2]/90">
                      <div className="w-4 h-4 rounded-full bg-[#165C36]/50 border border-[#C9A84C]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#C9A84C]" />
                      </div>
                      <span className="leading-relaxed font-light">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="/membership"
                className={`w-full py-3.5 rounded text-xs font-bold tracking-[0.2em] uppercase text-center transition-all flex items-center justify-center gap-2 ${
                  plan.is_popular
                    ? 'bg-gradient-to-r from-[#C9A84C] via-[#E8D48A] to-[#A07830] text-[#04150D] hover:shadow-[0_0_25px_rgba(201,168,76,0.5)]'
                    : 'border border-[#C9A84C]/40 text-[#E8D48A] hover:bg-[#C9A84C]/10 hover:border-[#C9A84C]'
                }`}
              >
                <span>Apply for Invitation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
