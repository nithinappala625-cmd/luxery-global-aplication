'use client';

import { Compass, Plane, Anchor, Briefcase, Key } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenEnquiry: () => void;
  onOpenSearch: () => void;
}

export default function MobileBottomNav({ onOpenEnquiry }: MobileBottomNavProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#061C16]/95 backdrop-blur-lg border-t border-[#C6A15B]/30 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-5 text-center items-center">
        <a
          href="/"
          className="flex flex-col items-center gap-1 text-[#F6F3EA]/70 hover:text-[#C6A15B] transition-colors py-1"
        >
          <Compass className="w-4 h-4" />
          <span className="text-[8px] uppercase tracking-wider font-semibold">Home</span>
        </a>

        <a
          href="/aviation"
          className="flex flex-col items-center gap-1 text-[#F6F3EA]/70 hover:text-[#C6A15B] transition-colors py-1"
        >
          <Plane className="w-4 h-4" />
          <span className="text-[8px] uppercase tracking-wider font-semibold">Aviation</span>
        </a>

        <a
          href="/marine"
          className="flex flex-col items-center gap-1 text-[#F6F3EA]/70 hover:text-[#C6A15B] transition-colors py-1"
        >
          <Anchor className="w-4 h-4" />
          <span className="text-[8px] uppercase tracking-wider font-semibold">Marine</span>
        </a>

        <a
          href="/portal"
          className="flex flex-col items-center gap-1 text-[#C6A15B] hover:text-white transition-colors py-1"
        >
          <Briefcase className="w-4 h-4 text-[#C6A15B]" />
          <span className="text-[8px] uppercase tracking-wider font-bold">Portal</span>
        </a>

        <button
          onClick={onOpenEnquiry}
          className="flex flex-col items-center gap-1 text-[#F6F3EA]/70 hover:text-[#C6A15B] transition-colors py-1"
        >
          <Key className="w-4 h-4" />
          <span className="text-[8px] uppercase tracking-wider font-semibold">Access</span>
        </button>
      </div>
    </div>
  );
}
