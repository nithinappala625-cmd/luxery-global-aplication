'use client';

import React from 'react';
import { X, Check, Globe, Shield, ArrowRight, Plane, Building2 } from 'lucide-react';
import { SUPPORTED_COUNTRIES, useCountry, CountryJurisdiction } from '@/lib/countryContext';

interface CountrySwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CountrySwitcherModal({ isOpen, onClose }: CountrySwitcherModalProps) {
  const { country: currentCountry, setCountryCode } = useCountry();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#061C16] border border-[#C6A15B]/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#C6A15B]/30 bg-[#04150F]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#082015] border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B]">
              <Globe className="w-5 h-5 text-[#C6A15B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-bold">
                  Sovereign Jurisdiction &amp; Currency Switcher
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold uppercase tracking-wider">
                  8 Desks Active
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-white font-medium mt-0.5">
                Select Your Regional Syndicate &amp; Currency
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
            aria-label="Close country switcher"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informational Sub-banner */}
        <div className="px-6 sm:px-8 py-3 bg-[#08241C] border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#F6F3EA]/80">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Switching jurisdiction updates all inventory valuations, flight rates, and private regional routing corridors.</span>
          </div>
          <div className="font-mono text-[11px] text-[#C6A15B]">
            Active: <strong className="text-white">{currentCountry.flag} {currentCountry.name} ({currentCountry.currency})</strong>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUPPORTED_COUNTRIES.map((item) => {
            const isSelected = item.code === currentCountry.code;

            return (
              <button
                key={item.code}
                onClick={() => {
                  setCountryCode(item.code);
                  onClose();
                }}
                className={`text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'border-[#C6A15B] bg-[#0A2E22] shadow-lg shadow-[#C6A15B]/10 ring-1 ring-[#C6A15B]/40'
                    : 'border-white/10 bg-[#051812] hover:border-[#C6A15B]/60 hover:bg-[#072017]'
                }`}
              >
                <div>
                  {/* Flag, Name, Currency Tag */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl drop-shadow">{item.flag}</span>
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[#E8D48A] transition-colors leading-snug">
                          {item.label}
                        </h3>
                        <p className="text-[11px] text-[#F6F3EA]/60 font-light mt-0.5 line-clamp-1">
                          {item.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="px-2.5 py-1 rounded bg-[#082015] border border-[#C6A15B]/40 font-mono text-xs font-bold text-[#E8D48A]">
                        {item.currency} ({item.symbol})
                      </span>
                      {isSelected && (
                        <span className="mt-1 flex items-center gap-1 text-[9px] text-emerald-400 font-bold uppercase tracking-wider">
                          <Check className="w-3 h-3" /> Selected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Regional Hub & Airports */}
                  <div className="mt-3 pt-3 border-t border-white/5 space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-2 text-[#C6A15B] font-medium">
                      <Building2 className="w-3 h-3" />
                      <span>{item.hubName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#F6F3EA]/70">
                      <Plane className="w-3 h-3 text-[#C6A15B]/70" />
                      <span className="truncate">{item.primaryAirports.slice(0, 3).join(' • ')}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#F6F3EA]/50 font-mono">
                    {item.code === 'global' ? 'Base Valuation: 1.0 USD' : `Rate: 1 USD = ${item.usdRate} ${item.currency}`}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C6A15B] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Select Desk</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 sm:px-8 py-4 bg-[#04150F] border-t border-[#C6A15B]/30 flex items-center justify-between text-xs text-[#F6F3EA]/70">
          <span>Need custom cross-border multi-currency escrow in Swiss Francs or Dirhams?</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-[#C6A15B] hover:bg-[#E0C17E] text-[#061C16] text-[10px] font-bold uppercase tracking-widest transition-all"
          >
            Apply &amp; Return
          </button>
        </div>

      </div>
    </div>
  );
}
