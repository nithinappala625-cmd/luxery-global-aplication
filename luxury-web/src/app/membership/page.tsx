import { getMembershipPlans } from '@/lib/api';
import { Crown, Star, Shield, Check, ArrowRight, Lock } from 'lucide-react';

export const revalidate = 300;

export default async function MembershipPage() {
  const plans = await getMembershipPlans();

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen text-[#082015]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#A07830] font-bold">
            <Crown className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span>Private Client Network</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#082015] tracking-tight">
            Elite Membership Privileges
          </h1>
          <p className="text-sm sm:text-base text-[#4A5E53] font-light leading-relaxed">
            By invitation and curatorial review only. Direct access to off-market bilateral deal rooms, private treaty sales, and bespoke lifestyle management.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 ${
                plan.is_popular
                  ? 'bg-[#051810] text-white border-2 border-[#C9A84C] shadow-2xl lg:-translate-y-4'
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
                <div className="space-y-4 mb-10">
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

              <button
                className={`w-full py-4 rounded-lg text-xs font-bold tracking-[0.2em] uppercase text-center transition-all flex items-center justify-center gap-2 ${
                  plan.is_popular
                    ? 'bg-gradient-to-r from-[#C9A84C] via-[#E8D48A] to-[#A07830] text-[#051810] hover:shadow-[0_0_25px_rgba(201,168,76,0.5)]'
                    : 'bg-[#051810] text-white hover:bg-[#0F3826]'
                }`}
              >
                <span>Request Membership Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Private Application Section */}
        <div className="max-w-3xl mx-auto rounded-2xl bg-[#FAFAF8] border border-[#E5EAE7] p-8 sm:p-14 shadow-lg">
          <div className="text-center space-y-2 mb-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#A07830] font-bold block">
              Confidential Application
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#082015] font-semibold">
              Apply for NP GROUPS Privé Status
            </h2>
            <p className="text-xs text-[#7A8F83]">
              Our Membership Vetting Committee reviews credentials within 24 hours.
            </p>
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#082015] font-bold block mb-1.5">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lord Alexander Sterling"
                  className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#E5EAE7] text-sm text-[#082015] focus:outline-none focus:border-[#082015] shadow-sm"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#082015] font-bold block mb-1.5">
                  Primary Jurisdiction / City
                </label>
                <input
                  type="text"
                  placeholder="e.g. London / Monaco / Dubai"
                  className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#E5EAE7] text-sm text-[#082015] focus:outline-none focus:border-[#082015] shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#082015] font-bold block mb-1.5">
                  Private Email
                </label>
                <input
                  type="email"
                  placeholder="principal@familyoffice.com"
                  className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#E5EAE7] text-sm text-[#082015] focus:outline-none focus:border-[#082015] shadow-sm"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#082015] font-bold block mb-1.5">
                  Encrypted Phone / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="+44 7911 123456"
                  className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#E5EAE7] text-sm text-[#082015] focus:outline-none focus:border-[#082015] shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#082015] font-bold block mb-1.5">
                Primary Verticals of Interest
              </label>
              <select className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#E5EAE7] text-sm text-[#082015] focus:outline-none focus:border-[#082015] shadow-sm">
                <option>Aviation & Private Jets</option>
                <option>Marine & Superyachts</option>
                <option>Sovereign Private Islands</option>
                <option>Haute Horlogerie & Rare Timepieces</option>
                <option>Rare Gemstones & Jewellery</option>
                <option>Hypercars & Historic Concours</option>
                <option>All 11 Verticals (Institutional / Family Office)</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="button"
                className="w-full py-4 rounded-lg text-xs font-bold tracking-[0.2em] uppercase bg-[#051810] text-white hover:bg-[#0F3826] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Lock className="w-4 h-4 text-[#E8D48A]" />
                <span>Submit Confidential Application</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
