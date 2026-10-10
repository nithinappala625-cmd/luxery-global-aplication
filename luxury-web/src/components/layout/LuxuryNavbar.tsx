'use client';

import { useState, useEffect } from 'react';
import { Menu, X, PlusCircle } from 'lucide-react';
import { useCountry } from '@/lib/countryContext';
import CountrySwitcherModal from '@/components/layout/CountrySwitcherModal';
import SellAircraftModal from '@/components/modals/SellAircraftModal';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LuxuryNavbarProps {
  onOpenSearch?: () => void;
  onOpenEnquiry?: () => void;
}

export default function LuxuryNavbar({ onOpenSearch, onOpenEnquiry }: LuxuryNavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const { country } = useCountry();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // THREE DISTINGUISHED TABS ONLY
  const navTabs = [
    { label: 'Private Sales', href: '/aviation/sales' },
    { label: 'Charter Desk', href: '/charters' },
    { label: 'Best Deals', href: '/deals' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#041D12]/98 border-b border-[#C6A15B]/30 py-3 shadow-2xl backdrop-blur-md'
            : 'bg-[#041D12] border-b border-[#C6A15B]/20 py-4 shadow-xl'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          
          {/* Brand Crest & Monogram */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded bg-[#02140B] border border-[#C6A15B] p-0.5 overflow-hidden flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <img
                src="/royendison_logo.jpeg"
                alt="Royendison Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.22em] text-[#FCFBF7] group-hover:text-[#DFC07E] transition-colors leading-none">
                ROYENDISON
              </span>
              <span className="text-[7.5px] uppercase tracking-[0.3em] text-[#C6A15B] font-semibold mt-1">
                Global Aviation Marketplace
              </span>
            </div>
          </Link>

          {/* Center: THREE ELEGANT TABS (NO CHEAP CRAMPED BADGES) */}
          <nav className="hidden md:flex items-center gap-10">
            {navTabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className={`text-xs uppercase tracking-[0.24em] font-semibold transition-all py-1 relative group ${
                    isActive
                      ? 'text-[#DFC07E] font-bold'
                      : 'text-[#FCFBF7]/90 hover:text-[#DFC07E]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#C6A15B] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* 1. "Sell Your Aircraft" CTA */}
            <button
              onClick={() => setSellModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded bg-gradient-to-r from-[#C6A15B] to-[#DFC07E] hover:from-[#DFC07E] hover:to-[#C6A15B] text-[#041D12] text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#041D12]" />
              <span>Sell Your Aircraft</span>
            </button>

            {/* 2. Direct WhatsApp VIP Concierge */}
            <a
              href="https://wa.me/917981994870?text=Hello%20Royendison%20Aviation%20Concierge,%20I%20wish%20to%20dispatch%20a%20private%20charter%20or%20aircraft%20acquisition."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded bg-[#065E38] hover:bg-[#044B2D] border border-[#25D366]/50 text-white text-xs font-semibold tracking-wider transition-all flex items-center gap-2 shadow"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#25D366]">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/>
              </svg>
              <span>+91 7981994870</span>
            </a>

            {/* 3. Sovereign Currency Switcher */}
            <button
              onClick={() => setCountryModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded bg-[#02140B] border border-[#C6A15B]/30 hover:border-[#C6A15B] text-white text-xs font-semibold transition-all"
              title="Select Global Currency"
            >
              <span>{country.flag}</span>
              <span className="font-mono text-xs text-[#DFC07E]">{country.currency}</span>
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setSellModalOpen(true)}
              className="px-2.5 py-1.5 rounded bg-[#C6A15B] text-[#041D12] text-[10px] font-bold uppercase tracking-wider"
            >
              Sell
            </button>

            <a
              href="https://wa.me/917981994870"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded bg-[#065E38] text-white"
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/>
              </svg>
            </a>

            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="p-1.5 text-white hover:text-[#C6A15B] transition-colors"
              aria-label="Open menu"
            >
              {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="lg:hidden bg-[#041D12] border-b border-[#C6A15B]/30 px-6 py-6 flex flex-col gap-4 shadow-2xl">
            {navTabs.map((tab) => (
              <Link
                key={tab.label}
                href={tab.href}
                onClick={() => setMobileDrawerOpen(false)}
                className="text-xs uppercase tracking-widest text-[#FCFBF7] font-bold py-2 border-b border-white/10 flex justify-between items-center"
              >
                <span>{tab.label}</span>
              </Link>
            ))}

            <button
              onClick={() => {
                setMobileDrawerOpen(false);
                setSellModalOpen(true);
              }}
              className="w-full py-2.5 rounded bg-[#C6A15B] text-[#041D12] text-xs font-bold uppercase tracking-widest text-center"
            >
              Sell Your Aircraft
            </button>

            <a
              href="https://wa.me/917981994870"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 rounded bg-[#065E38] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <span>WhatsApp Concierge (+91 7981994870)</span>
            </a>
          </div>
        )}
      </header>

      {/* Sell Modal */}
      <SellAircraftModal
        isOpen={sellModalOpen}
        onClose={() => setSellModalOpen(false)}
      />

      <CountrySwitcherModal
        isOpen={countryModalOpen}
        onClose={() => setCountryModalOpen(false)}
      />
    </>
  );
}
