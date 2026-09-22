'use client';

import { Compass, Sparkles, Key, MessageSquare, User } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenEnquiry: () => void;
  onOpenSearch: () => void;
}

export default function MobileBottomNav({ onOpenEnquiry, onOpenSearch }: MobileBottomNavProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#061C16]/95 backdrop-blur-lg border-t border-[#C6A15B]/30 px-4 py-2.5 shadow-2xl">
      <div className="grid grid-cols-5 text-center">
        <a
          href="/#categories"
          className="flex flex-col items-center gap-1 text-[#F6F3EA]/70 hover:text-[#C6A15B] transition-colors"
        >
          <Compass className="w-4 h-4" />
          <span className="text-[9px] uppercase tracking-widest font-semibold">Discover</span>
        </a>

        <a
          href="/#collection"
          className="flex flex-col items-center gap-1 text-[#F6F3EA]/70 hover:text-[#C6A15B] transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[9px] uppercase tracking-widest font-semibold">Collection</span>
        </a>

        <button
          onClick={onOpenEnquiry}
          className="flex flex-col items-center gap-1 text-[#C6A15B] hover:text-white transition-colors"
        >
          <Key className="w-4 h-4 text-[#C6A15B]" />
          <span className="text-[9px] uppercase tracking-widest font-bold">Access</span>
        </button>

        <button
          onClick={onOpenEnquiry}
          className="flex flex-col items-center gap-1 text-[#F6F3EA]/70 hover:text-[#C6A15B] transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-[9px] uppercase tracking-widest font-semibold">Enquiries</span>
        </button>

        <a
          href="/membership"
          className="flex flex-col items-center gap-1 text-[#F6F3EA]/70 hover:text-[#C6A15B] transition-colors"
        >
          <User className="w-4 h-4" />
          <span className="text-[9px] uppercase tracking-widest font-semibold">Profile</span>
        </a>
      </div>
    </div>
  );
}
