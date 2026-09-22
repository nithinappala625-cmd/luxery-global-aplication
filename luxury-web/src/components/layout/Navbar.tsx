'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Shield, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
          ? 'bg-[#051810]/98 backdrop-blur-md border-b border-[#C9A84C]/30 py-3.5 shadow-2xl'
          : 'bg-[#051810] py-4 border-b border-[#1E7A52]/30 shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Crest & Title */}
        <a href="/" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded border border-[#C9A84C] flex items-center justify-center bg-gradient-to-br from-[#0F3826] to-[#051810] text-[#E8D48A] font-serif font-bold text-lg tracking-wider group-hover:border-[#E8D48A] transition-colors shadow">
            NP
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.2em] text-white group-hover:text-[#E8D48A] transition-colors">
              NP GROUPS
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C9A84C] font-semibold">
              Global Luxury Legacy
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/90 hover:text-[#E8D48A] hover:bg-white/5 rounded transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/membership"
            className="px-5 py-2.5 rounded text-[11px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#C9A84C] via-[#E8D48A] to-[#A07830] text-[#051810] hover:shadow-[0_0_20px_rgba(201,168,76,0.5)] transition-all flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Elite Access</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-[#C9A84C] focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#051810] border-b border-[#C9A84C]/30 px-6 py-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-[0.2em] uppercase text-white hover:text-[#C9A84C] py-2 border-b border-white/10 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#C9A84C]" />
              </a>
            ))}
            <a
              href="/membership"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3.5 mt-4 rounded text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#C9A84C] to-[#A07830] text-[#051810]"
            >
              Elite Membership
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
