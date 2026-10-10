'use client';

import { Home, Plane, Calendar, Zap, PhoneCall } from 'lucide-react';
import Link from 'next/link';

interface MobileBottomNavProps {
  onOpenSearch?: () => void;
  onOpenEnquiry?: () => void;
}

export default function MobileBottomNav({ onOpenSearch, onOpenEnquiry }: MobileBottomNavProps = {}) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#02140B]/98 backdrop-blur-lg border-t border-[#C6A15B]/30 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-5 text-center items-center">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-[#FCFBF7]/70 hover:text-[#DFC07E] transition-colors py-1"
        >
          <Home className="w-4 h-4" />
          <span className="text-[8px] uppercase tracking-wider font-semibold">Home</span>
        </Link>

        <Link
          href="/aviation/sales"
          className="flex flex-col items-center gap-1 text-[#FCFBF7]/70 hover:text-[#DFC07E] transition-colors py-1"
        >
          <Plane className="w-4 h-4" />
          <span className="text-[8px] uppercase tracking-wider font-semibold">Sales</span>
        </Link>

        <Link
          href="/charters"
          className="flex flex-col items-center gap-1 text-[#DFC07E] hover:text-white transition-colors py-1"
        >
          <Calendar className="w-4 h-4 text-[#C6A15B]" />
          <span className="text-[8px] uppercase tracking-wider font-bold">Charters</span>
        </Link>

        <Link
          href="/deals"
          className="flex flex-col items-center gap-1 text-amber-300 hover:text-white transition-colors py-1"
        >
          <Zap className="w-4 h-4 fill-amber-400" />
          <span className="text-[8px] uppercase tracking-wider font-bold">Deals</span>
        </Link>

        <a
          href="https://wa.me/917981994870"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-[#25D366] hover:text-white transition-colors py-1"
        >
          <PhoneCall className="w-4 h-4" />
          <span className="text-[8px] uppercase tracking-wider font-semibold">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
