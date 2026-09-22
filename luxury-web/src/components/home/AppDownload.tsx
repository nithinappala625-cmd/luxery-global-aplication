import { Apple, Smartphone, ShieldCheck } from 'lucide-react';

export default function AppDownload() {
  return (
    <section id="app" className="py-24 bg-gradient-to-b from-[#0A3320] to-[#04150D] border-t border-[#1E7A47]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text & Badges */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] font-semibold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Legacy Application</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-wide leading-tight">
              NP GROUPS <br />
              <span className="italic text-gold-gradient">In Your Pocket</span>
            </h2>
            <p className="text-sm text-[#D4D8D2]/80 font-light leading-relaxed max-w-lg">
              Monitor live auction bids, receive instant private-treaty drops, unlock verified dealer credentials, and manage sovereign vault custody anywhere in the world on iOS and Android.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button className="px-6 py-3 rounded bg-[#071F12] border border-[#C9A84C]/50 hover:border-[#C9A84C] text-white flex items-center gap-3 transition-all hover:bg-[#0F4A2C]/50 shadow-lg">
                <Apple className="w-6 h-6 text-[#C9A84C]" />
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-widest text-[#8CA090] block">
                    Download on the
                  </span>
                  <span className="text-xs font-semibold tracking-wider text-white">
                    App Store
                  </span>
                </div>
              </button>

              <button className="px-6 py-3 rounded bg-[#071F12] border border-[#C9A84C]/50 hover:border-[#C9A84C] text-white flex items-center gap-3 transition-all hover:bg-[#0F4A2C]/50 shadow-lg">
                <Smartphone className="w-6 h-6 text-[#C9A84C]" />
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-widest text-[#8CA090] block">
                    Get it on
                  </span>
                  <span className="text-xs font-semibold tracking-wider text-white">
                    Google Play
                  </span>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs text-[#8CA090]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
                <span>Biometric FaceID Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
                <span>End-to-End Encrypted</span>
              </div>
            </div>
          </div>

          {/* Right: Phone Frame Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[280px] h-[560px] rounded-[48px] bg-[#071F12] border-[3px] border-[#C9A84C]/50 p-3 shadow-[0_0_60px_rgba(201,168,76,0.15)] flex flex-col justify-between">
              {/* Dynamic Island Notch */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto" />

              {/* Screen Mockup Content */}
              <div className="flex-grow my-3 rounded-[36px] bg-gradient-to-b from-[#0A3320] via-[#04150D] to-[#071F12] p-4 flex flex-col justify-between border border-white/5 overflow-hidden">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#C9A84C] mb-4">
                    <span className="font-serif font-bold tracking-widest">NP GROUPS</span>
                    <span className="font-mono">LIVE VIP</span>
                  </div>

                  <div className="p-3 rounded bg-[#04150D]/90 border border-[#1E7A47]/40 mb-3">
                    <span className="text-[8px] uppercase tracking-widest text-[#C9A84C] block">
                      Gulfstream G700
                    </span>
                    <span className="text-xs text-white font-medium block">
                      Savannah Delivery Slot
                    </span>
                    <span className="font-serif text-sm text-[#C9A84C] font-semibold mt-1 block">
                      $75,000,000
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    {['Jets', 'Yachts', 'Islands', 'Watches', 'Autos', 'Jewels'].map((cat) => (
                      <div key={cat} className="p-2 rounded bg-[#0A3320]/80 border border-[#1E7A47]/30 text-[9px] text-[#D4D8D2]">
                        {cat}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full py-2 rounded bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-[#04150D] text-center text-[10px] font-bold tracking-widest uppercase shadow">
                  Enter Deal Room
                </div>
              </div>

              {/* Home indicator bar */}
              <div className="w-28 h-1 bg-white/20 rounded-full mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
