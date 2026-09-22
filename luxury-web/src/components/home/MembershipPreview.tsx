import { Check, Crown, Shield, Star, ArrowRight } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '@/lib/constants';

export default function MembershipPreview() {
  return (
    <section className="py-28 bg-white border-t border-[#E5EAE7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#A07830] font-bold">
            <Crown className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span>Sovereign Privilege</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#082015] tracking-tight">
            Elite Membership Tiers
          </h2>
          <p className="text-sm sm:text-base text-[#4A5E53] font-light leading-relaxed">
            Gain verified status, unlock private off-market listings, access direct bilateral deal rooms, and command our 24/7 Mayfair & Monaco concierge salons.
          </p>
        </div>

        {/* 3 Tier Cards: Clean White & One Rich Black-Green Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 ${
                plan.is_popular
                  ? 'bg-[#051810] text-white border-2 border-[#C9A84C] shadow-2xl lg:-translate-y-3'
                  : 'bg-[#FAFAF8] text-[#082015] border border-[#E5EAE7] hover:border-[#082015] shadow-sm'
              }`}
            >
              {plan.is_popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-[#051810] text-[10px] font-bold tracking-[0.25em] uppercase shadow-lg">
                  Most Requested Tier
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3 className={`font-serif text-3xl font-semibold ${plan.is_popular ? 'text-white' : 'text-[#082015]'}`}>
                    {plan.name}
                  </h3>
                  {plan.tier === 'platinum' ? (
                    <Crown className="w-7 h-7 text-[#C9A84C]" />
                  ) : plan.tier === 'gold' ? (
                    <Star className="w-7 h-7 text-[#E8D48A]" />
                  ) : (
                    <Shield className="w-7 h-7 text-[#0F3826]" />
                  )}
                </div>

                <p className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-6 ${plan.is_popular ? 'text-[#E8D48A]' : 'text-[#A07830]'}`}>
                  {plan.tagline}
                </p>

                <div className={`mb-8 pb-6 border-b ${plan.is_popular ? 'border-white/10' : 'border-[#E5EAE7]'}`}>
                  <div className="font-serif text-4xl sm:text-5xl font-light">
                    ₹{(plan.price_annual / 1000).toLocaleString('en-IN')}k
                    <span className={`text-xs font-sans font-normal ml-2 ${plan.is_popular ? 'text-white/60' : 'text-[#7A8F83]'}`}>
                      / annum
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3 text-xs leading-relaxed">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.is_popular ? 'bg-[#0F3826] text-[#E8D48A]' : 'bg-[#051810] text-white'
                      }`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className={`font-light ${plan.is_popular ? 'text-white/90' : 'text-[#4A5E53]'}`}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="/membership"
                className={`w-full py-4 rounded text-xs font-bold tracking-[0.2em] uppercase text-center transition-all flex items-center justify-center gap-2 ${
                  plan.is_popular
                    ? 'bg-gradient-to-r from-[#C9A84C] via-[#E8D48A] to-[#A07830] text-[#051810] hover:shadow-[0_0_25px_rgba(201,168,76,0.5)]'
                    : 'bg-[#051810] text-white hover:bg-[#0F3826] hover:text-[#E8D48A]'
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
