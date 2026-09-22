'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import LuxuryNavbar from '@/components/layout/LuxuryNavbar';
import LuxuryFooter from '@/components/layout/LuxuryFooter';
import SearchOverlay from '@/components/ui/SearchOverlay';
import EnquiryModal from '@/components/ui/EnquiryModal';
import MobileBottomNav from '@/components/ui/MobileBottomNav';

interface EnquiryData {
  title?: string;
  subtitle?: string;
  defaultVertical?: string;
  assetTitle?: string;
}

interface LuxuryUIContextType {
  openSearch: () => void;
  closeSearch: () => void;
  openEnquiry: (data?: EnquiryData) => void;
  closeEnquiry: () => void;
  savedAssets: string[];
  toggleSaveAsset: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const LuxuryUIContext = createContext<LuxuryUIContextType | undefined>(undefined);

export function useLuxuryUI() {
  const context = useContext(LuxuryUIContext);
  if (!context) {
    throw new Error('useLuxuryUI must be used within a LuxuryShell');
  }
  return context;
}

export default function LuxuryShell({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryData, setEnquiryData] = useState<EnquiryData>({});
  const [savedAssets, setSavedAssets] = useState<string[]>([]);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openEnquiry = (data?: EnquiryData) => {
    if (data) setEnquiryData(data);
    else setEnquiryData({ title: 'Request Private Access', defaultVertical: 'Private Aviation' });
    setIsEnquiryOpen(true);
  };

  const closeEnquiry = () => {
    setIsEnquiryOpen(false);
  };

  const toggleSaveAsset = (id: string) => {
    setSavedAssets((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedAssets.includes(id);

  return (
    <LuxuryUIContext.Provider
      value={{
        openSearch,
        closeSearch,
        openEnquiry,
        closeEnquiry,
        savedAssets,
        toggleSaveAsset,
        isSaved,
      }}
    >
      <div className="min-h-screen flex flex-col bg-[#FCFBF7] text-[#080B09] antialiased selection:bg-[#C6A15B] selection:text-white">
        <LuxuryNavbar onOpenSearch={openSearch} onOpenEnquiry={() => openEnquiry()} />
        <main className="flex-grow">{children}</main>
        <LuxuryFooter />
        <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
        <EnquiryModal
          isOpen={isEnquiryOpen}
          onClose={closeEnquiry}
          title={enquiryData.title}
          subtitle={enquiryData.subtitle}
          defaultVertical={enquiryData.defaultVertical}
          assetTitle={enquiryData.assetTitle}
        />
        <MobileBottomNav onOpenSearch={openSearch} onOpenEnquiry={() => openEnquiry()} />
      </div>
    </LuxuryUIContext.Provider>
  );
}
