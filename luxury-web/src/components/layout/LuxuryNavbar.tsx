'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Search, Shield, ArrowUpRight, Globe } from 'lucide-react';
import { useCountry } from '@/lib/countryContext';
import CountrySwitcherModal from '@/components/layout/CountrySwitcherModal';

interface LuxuryNavbarProps {
  onOpenSearch?: () => void;
  onOpenEnquiry?: () => void;
}

export default function LuxuryNavbar({ onOpenSearch, onOpenEnquiry }: LuxuryNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const { country } = useCountry();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Aviation', href: '/aviation' },
    { label: 'Marine', href: '/marine' },
    { label: 'Automotive', href: '/automotive' },
    { label: 'Timepieces', href: '/watches' },
    { label: 'Fine Jewels', href: '/jewellery' },
    { label: 'Tenders', href: '/auctions' },
    { label: 'Membership', href: '/membership' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#061C16] border-b border-[#C6A15B]/20 py-3.5 shadow-xl backdrop-blur-md'
          : 'bg-gradient-to-b from-[#080B09]/80 via-[#080B09]/40 to-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Crest & Monogram */}
        <a href="/" className="flex items-center gap-3.5 group">
          <div className="flex flex-col">
            <span className="font-serif text-2xl sm:text-[1.65rem] font-medium tracking-[0.22em] text-[#FCFBF7] group-hover:text-[#C6A15B] transition-colors leading-none">
              NP GROUPS
            </span>
            <span className="text-[8px] uppercase tracking-[0.35em] text-[#C6A15B] font-semibold mt-1">
              International Private Luxury Network
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation - Thin, Elegant, Generous Spacing */}
        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#F6F3EA]/85 hover:text-[#C6A15B] transition-colors relative py-1 group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C6A15B] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right Side: Country Selector, Search, Portal, Primary CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Sovereign Country / Currency Switcher */}
          <button
            onClick={() => setCountryModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#08241C] border border-[#C6A15B]/50 hover:border-[#C6A15B] text-white text-[11px] font-semibold transition-all hover:bg-[#0C3328] shadow-sm group"
            title="Switch Global Jurisdiction & Currency"
          >
            <span className="text-sm">{country.flag}</span>
            <span className="font-mono text-xs text-[#E8D48A]">{country.currency}</span>
            <span className="text-[9px] text-[#C6A15B] opacity-70 group-hover:opacity-100">▼</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-medium text-[#F6F3EA]/80 hover:text-[#C6A15B] transition-colors py-1"
          >
            <Search className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Search</span>
          </button>

          <a
            href="/portal"
            className="px-3 py-1.5 border border-[#C6A15B]/40 hover:border-[#C6A15B] bg-[#061C16]/60 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C6A15B] hover:text-white transition-all flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] animate-pulse" />
            <span>Broker Portal</span>
          </a>

          {/* Primary CTA */}
          <button
            onClick={onOpenEnquiry}
            className="px-4 py-2 bg-[#C6A15B] hover:bg-[#E0C17E] text-[#080B09] text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow hover:-translate-y-0.5"
          >
            Request Access
          </button>
        </div>

        {/* Mobile Hamburger & Mobile Country Switcher */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setCountryModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#08241C] border border-[#C6A15B]/40 text-xs text-[#E8D48A]"
            title="Change Country"
          >
            <span>{country.flag}</span>
            <span className="font-mono text-[10px] font-bold">{country.currency}</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="p-1.5 text-[#F6F3EA] hover:text-[#C6A15B] transition-colors"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="p-1.5 text-[#F6F3EA] hover:text-[#C6A15B] transition-colors"
            aria-label="Open menu"
          >
            {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="lg:hidden bg-[#061C16] border-b border-[#C6A15B]/30 px-8 py-8 space-y-5 animate-in slide-in-from-top duration-300 shadow-2xl">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileDrawerOpen(false)}
                className="text-xs tracking-[0.25em] uppercase text-[#F6F3EA] hover:text-[#C6A15B] py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#C6A15B]/60" />
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              <a
                href="/portal"
                onClick={() => setMobileDrawerOpen(false)}
                className="text-xs tracking-[0.25em] uppercase text-[#C6A15B] py-2 flex items-center justify-between border-b border-[#C6A15B]/20"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
                  <span>Broker / Owner Portal</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#C6A15B]" />
              </a>

              <a
                href="/membership"
                onClick={() => setMobileDrawerOpen(false)}
                className="text-xs tracking-[0.25em] uppercase text-[#F6F3EA]/90 py-2 flex items-center justify-between"
              >
                <span>The Private Circle (Membership)</span>
                <ArrowUpRight className="w-4 h-4 text-[#C6A15B]" />
              </a>

              <button
                onClick={() => {
                  setMobileDrawerOpen(false);
                  if (onOpenEnquiry) onOpenEnquiry();
                }}
                className="w-full py-3.5 mt-2 bg-[#C6A15B] text-[#080B09] text-xs font-bold tracking-[0.2em] uppercase text-center"
              >
                Request Private Access
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Sovereign Jurisdiction & Currency Switcher Modal */}
      <CountrySwitcherModal
        isOpen={countryModalOpen}
        onClose={() => setCountryModalOpen(false)}
      />
    </header>
  );
}
