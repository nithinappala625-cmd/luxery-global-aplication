'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Shield, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'BUY', href: '/#categories' },
    { label: 'SELL', href: '/#categories' },
    { label: 'RENT', href: '/#categories' },
    { label: 'BOOK', href: '/#categories' },
    { label: 'CONNECT', href: '/#categories' },
    { label: 'AUCTIONS', href: '/auctions' },
    { label: 'MEMBERSHIP', href: '/membership' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#04150D]/95 backdrop-blur-md border-b border-[#1E7A47]/30 py-3 shadow-2xl'
          : 'bg-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Crest & Title */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded border border-[#C9A84C]/60 flex items-center justify-center bg-gradient-to-br from-[#0F4A2C] to-[#04150D] text-[#C9A84C] font-serif font-bold text-lg tracking-wider group-hover:border-[#C9A84C] transition-colors shadow-md">
            NP
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-semibold tracking-[0.2em] text-white group-hover:text-[#E8D48A] transition-colors">
              NP GROUPS
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C9A84C] font-medium">
              Global Luxury Legacy
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-[11px] font-medium tracking-[0.2em] uppercase text-[#D4D8D2] hover:text-[#C9A84C] hover:bg-[#0A3320]/60 rounded transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button & User CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/membership"
            className="px-5 py-2.5 rounded text-[11px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#C9A84C] via-[#E8D48A] to-[#A07830] text-[#04150D] hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Elite Access</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#D4D8D2] hover:text-[#C9A84C] focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071F12] border-b border-[#1E7A47]/40 px-6 py-6 space-y-4 animate-in slide-in-from-top">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-[0.2em] uppercase text-[#D4D8D2] hover:text-[#C9A84C] py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#8CA090]" />
              </a>
            ))}
            <a
              href="/membership"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 mt-4 rounded text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-[#04150D]"
            >
              Elite Membership
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
