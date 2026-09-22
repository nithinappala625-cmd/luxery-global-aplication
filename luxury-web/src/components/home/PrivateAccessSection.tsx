'use client';

import Link from 'next/link';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import { Shield, Lock, FileText, ArrowRight } from 'lucide-react';

export default function PrivateAccessSection() {
  const { openEnquiry } = useLuxuryUI();

  return (
    <section id="private-access" className="relative bg-[#061C16] text-[#FCFBF7] py-28 lg:py-36 border-b border-[#C6A15B]/20 overflow-hidden">
      {/* Background ambient texture */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C6A15B] rounded-full blur-[180px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-[#C6A15B]/30 bg-[#080B09]/60 backdrop-blur-md">
            <Lock className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium">
              DISCRETIONARY ALLOCATION PROTOCOL
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FCFBF7] tracking-tight leading-[1.12]">
            NOT EVERYTHING IS PUBLIC.
          </h2>

          {/* Subtitle */}
          <p className="font-serif text-xl sm:text-2xl text-[#C6A15B] font-light italic">
            Some acquisitions require a different level of access.
          </p>

          {/* Descriptive text */}
          <p className="text-sm sm:text-base text-[#D8D3C8]/80 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Over sixty percent of acquisitions negotiated through NP GROUPS never appear in open market channels. Confidential asset syndicates, generational family estate transfers, and pre-allocation supercar allocations are handled exclusively under bilateral non-disclosure agreements.
          </p>

          {/* 3 Family Office Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 text-left border-t border-[#C6A15B]/15">
            <div className="p-6 border border-[#C6A15B]/20 bg-[#080B09]/40 space-y-3">
              <div className="w-8 h-8 rounded-full border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B]">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-lg text-white font-normal">Principal Introductions</h4>
              <p className="text-xs text-[#D8D3C8]/70 font-light leading-relaxed">
                Direct engagement between verified principals and family office trustees with zero intermediary markups.
              </p>
            </div>

            <div className="p-6 border border-[#C6A15B]/20 bg-[#080B09]/40 space-y-3">
              <div className="w-8 h-8 rounded-full border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B]">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-lg text-white font-normal">Bilateral NDA Shield</h4>
              <p className="text-xs text-[#D8D3C8]/70 font-light leading-relaxed">
                Technical registries, serial numbers, and ownership structures remain concealed until bilateral execution.
              </p>
            </div>

            <div className="p-6 border border-[#C6A15B]/20 bg-[#080B09]/40 space-y-3">
              <div className="w-8 h-8 rounded-full border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B]">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-lg text-white font-normal">Institutional Escrow</h4>
              <p className="text-xs text-[#D8D3C8]/70 font-light leading-relaxed">
                Independent Swiss and UK fiduciary legal settlement governing maritime, aviation, and physical title transfer.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() =>
                openEnquiry({
                  title: 'Request Private Access',
                  subtitle: 'Initiate bilateral verification for off-market asset portfolios.',
                  defaultVertical: 'Private Opportunities',
                })
              }
              className="w-full sm:w-auto px-9 py-4 bg-[#FCFBF7] text-[#061C16] text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all duration-300 shadow-xl"
            >
              REQUEST PRIVATE ACCESS
            </button>
            <Link
              href="/membership"
              className="w-full sm:w-auto px-9 py-4 border border-[#C6A15B]/60 text-[#FCFBF7] text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#C6A15B]/15 hover:border-[#C6A15B] transition-all duration-300"
            >
              DISCOVER MEMBERSHIP
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
