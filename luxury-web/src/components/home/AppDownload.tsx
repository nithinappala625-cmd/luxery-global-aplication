import { Apple, Smartphone, ShieldCheck } from 'lucide-react';

export default function AppDownload() {
  return (
    <section id="app" className="py-28 bg-[#FAFAF8] border-t border-[#E5EAE7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text & Badges */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#A07830] font-bold">
              <Smartphone className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>Mobile Legacy Application</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#082015] tracking-tight leading-tight">
              NP GROUPS <br />
              <span className="italic font-normal text-gold-gradient">In Your Pocket</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4A5E53] font-light leading-relaxed max-w-lg">
              Monitor live auction bids, receive instant private-treaty drops, unlock verified dealer credentials, and manage sovereign vault custody anywhere in the world on iOS and Android.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button className="px-7 py-3.5 rounded-lg bg-[#051810] text-white hover:bg-[#0F3826] flex items-center gap-3 transition-all shadow-lg hover:-translate-y-0.5">
                <Apple className="w-6 h-6 text-[#E8D48A]" />
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-widest text-[#7A8F83] block font-semibold">
                    Download on the
                  </span>
                  <span className="text-xs font-semibold tracking-wider text-white">
                    App Store
                  </span>
                </div>
              </button>

              <button className="px-7 py-3.5 rounded-lg bg-[#051810] text-white hover:bg-[#0F3826] flex items-center gap-3 transition-all shadow-lg hover:-translate-y-0.5">
                <Smartphone className="w-6 h-6 text-[#E8D48A]" />
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-widest text-[#7A8F83] block font-semibold">
                    Get it on
                  </span>
                  <span className="text-xs font-semibold tracking-wider text-white">
                    Google Play
                  </span>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs text-[#4A5E53]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#082015]" />
                <span className="font-medium">Biometric FaceID Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#082015]" />
                <span className="font-medium">End-to-End Encrypted</span>
              </div>
            </div>
          </div>

          {/* Right: Phone Frame Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[280px] h-[560px] rounded-[48px] bg-[#051810] border-[4px] border-[#082015] p-3 shadow-2xl flex flex-col justify-between">
              {/* Dynamic Island Notch */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto" />

              {/* Screen Mockup Content */}
              <div className="flex-grow my-3 rounded-[36px] bg-gradient-to-b from-[#0F3826] via-[#051810] to-[#082015] p-4 flex flex-col justify-between border border-white/10 overflow-hidden">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#E8D48A] mb-4">
                    <span className="font-serif font-bold tracking-widest">NP GROUPS</span>
                    <span className="font-mono">LIVE VIP</span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/50 border border-white/10 mb-3">
                    <span className="text-[8px] uppercase tracking-widest text-[#E8D48A] block font-semibold">
                      Gulfstream G700
                    </span>
                    <span className="text-xs text-white font-medium block">
                      Savannah Delivery Slot
                    </span>
                    <span className="font-serif text-sm text-[#E8D48A] font-semibold mt-1 block">
                      $75,000,000
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    {['Jets', 'Yachts', 'Islands', 'Watches', 'Autos', 'Jewels'].map((cat) => (
                      <div key={cat} className="p-2 rounded bg-white/5 border border-white/10 text-[9px] text-white/90">
                        {cat}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full py-2.5 rounded bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-[#051810] text-center text-[10px] font-bold tracking-widest uppercase shadow">
                  Enter Deal Room
                </div>
              </div>

              {/* Home indicator bar */}
              <div className="w-28 h-1 bg-white/30 rounded-full mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
