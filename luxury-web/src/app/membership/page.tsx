import { getMembershipPlans } from '@/lib/api';
import { Crown, Star, Shield, Check, ArrowRight, Lock } from 'lucide-react';

export const revalidate = 300;

export default async function MembershipPage() {
  const plans = await getMembershipPlans();

  return (
    <div className="pt-28 pb-24 bg-[#04150D] min-h-screen text-[#D4D8D2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] font-semibold">
            <Crown className="w-3.5 h-3.5" />
            <span>Private Client Network</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-wide">
            Elite Membership Privileges
          </h1>
          <p className="text-sm text-[#8CA090] font-light leading-relaxed">
            By invitation and curatorial review only. Direct access to off-market bilateral deal rooms, private treaty sales, and bespoke lifestyle management.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 ${
                plan.is_popular
                  ? 'bg-gradient-to-b from-[#0F4A2C] to-[#0A3320] border-2 border-[#C9A84C] shadow-[0_0_50px_rgba(201,168,76,0.25)] lg:-translate-y-4'
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
                  <h3 className="font-serif text-3xl text-white font-medium">
                    {plan.name}
                  </h3>
                  {plan.tier === 'platinum' ? (
                    <Crown className="w-7 h-7 text-[#C9A84C]" />
                  ) : plan.tier === 'gold' ? (
                    <Star className="w-7 h-7 text-[#C9A84C]" />
                  ) : (
                    <Shield className="w-7 h-7 text-[#8CA090]" />
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
                <div className="space-y-4 mb-10">
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

              <button
                className={`w-full py-4 rounded text-xs font-bold tracking-[0.2em] uppercase text-center transition-all flex items-center justify-center gap-2 ${
                  plan.is_popular
                    ? 'bg-gradient-to-r from-[#C9A84C] via-[#E8D48A] to-[#A07830] text-[#04150D] hover:shadow-[0_0_25px_rgba(201,168,76,0.5)]'
                    : 'border border-[#C9A84C]/40 text-[#E8D48A] hover:bg-[#C9A84C]/10 hover:border-[#C9A84C]'
                }`}
              >
                <span>Request Membership Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Private Application Section */}
        <div className="max-w-3xl mx-auto rounded-2xl bg-[#071F12] border border-[#1E7A47]/40 p-8 sm:p-12 shadow-2xl">
          <div className="text-center space-y-2 mb-8">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A84C] font-semibold block">
              Confidential Application
            </span>
            <h2 className="font-serif text-3xl text-white font-medium">
              Apply for NP GROUPS Privé Status
            </h2>
            <p className="text-xs text-[#8CA090]">
              Our Membership Vetting Committee reviews credentials within 24 hours.
            </p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8CA090] block mb-1">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lord Alexander Sterling"
                  className="w-full px-4 py-3 rounded bg-[#04150D] border border-[#1E7A47]/40 text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8CA090] block mb-1">
                  Primary Jurisdiction / City
                </label>
                <input
                  type="text"
                  placeholder="e.g. London / Monaco / Dubai"
                  className="w-full px-4 py-3 rounded bg-[#04150D] border border-[#1E7A47]/40 text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8CA090] block mb-1">
                  Private Email
                </label>
                <input
                  type="email"
                  placeholder="principal@familyoffice.com"
                  className="w-full px-4 py-3 rounded bg-[#04150D] border border-[#1E7A47]/40 text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8CA090] block mb-1">
                  Encrypted Phone / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="+44 7911 123456"
                  className="w-full px-4 py-3 rounded bg-[#04150D] border border-[#1E7A47]/40 text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#8CA090] block mb-1">
                Primary Verticals of Interest
              </label>
              <select className="w-full px-4 py-3 rounded bg-[#04150D] border border-[#1E7A47]/40 text-sm text-white focus:outline-none focus:border-[#C9A84C]">
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
                className="w-full py-4 rounded text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#C9A84C] via-[#E8D48A] to-[#A07830] text-[#04150D] hover:shadow-[0_0_25px_rgba(201,168,76,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Submit Confidential Application</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
