'use client';

import { useState } from 'react';
import { X, Lock, CheckCircle2 } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  defaultVertical?: string;
  assetTitle?: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  title = 'Request Private Access',
  subtitle = 'Connect with the NP GROUPS Private Office. Inquiries are handled with absolute confidentiality.',
  defaultVertical = 'Private Aviation',
  assetTitle,
}: EnquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    titlePrefix: 'Mr.',
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    vertical: defaultVertical,
    message: assetTitle ? `Inquiry regarding: ${assetTitle}` : '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds or allow manual close
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080B09]/85 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-2xl bg-[#FCFBF7] border border-[#D8D3C8] shadow-2xl p-8 sm:p-12 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle top gold hairline */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C6A15B]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#7A8F83] hover:text-[#080B09] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#061C16] flex items-center justify-center text-[#C6A15B]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-3xl text-[#061C16] font-light">
              Inquiry Received
            </h3>
            <p className="text-xs text-[#4A5E53] max-w-md mx-auto leading-relaxed">
              Your transmission has been encrypted and routed directly to a Senior Partner at the NP GROUPS Private Office. A discreet response will follow shortly.
            </p>
            <div className="pt-6">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="btn-editorial-dark"
              >
                Return to Network
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="label-micro text-[#C6A15B] mb-2 flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                <span>Privileged & Confidential</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#061C16] font-light tracking-tight">
                {title}
              </h2>
              <p className="text-xs text-[#7A8F83] mt-2 font-light leading-relaxed">
                {subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="label-micro text-[#080B09] block mb-1">Title</label>
                  <select
                    value={formData.titlePrefix}
                    onChange={(e) => setFormData({ ...formData, titlePrefix: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-[#D8D3C8] text-xs text-[#080B09] focus:outline-none focus:border-[#061C16]"
                  >
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                    <option>Dr.</option>
                    <option>Lord / Lady</option>
                    <option>Excellency</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="label-micro text-[#080B09] block mb-1">Full Legal Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Lord Alexander Vance"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs text-[#080B09] focus:outline-none focus:border-[#061C16]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label-micro text-[#080B09] block mb-1">Organization / Family Office</label>
                  <input
                    type="text"
                    placeholder="Optional / Private capacity"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs text-[#080B09] focus:outline-none focus:border-[#061C16]"
                  />
                </div>
                <div>
                  <label className="label-micro text-[#080B09] block mb-1">Private Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="principal@privateoffice.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs text-[#080B09] focus:outline-none focus:border-[#061C16]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label-micro text-[#080B09] block mb-1">Secure Mobile / WhatsApp *</label>
                  <input
                    required
                    type="text"
                    placeholder="+44 20 7946 0912"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs text-[#080B09] focus:outline-none focus:border-[#061C16]"
                  />
                </div>
                <div>
                  <label className="label-micro text-[#080B09] block mb-1">Sector of Interest</label>
                  <select
                    value={formData.vertical}
                    onChange={(e) => setFormData({ ...formData, vertical: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs text-[#080B09] focus:outline-none focus:border-[#061C16]"
                  >
                    <option>Private Aviation</option>
                    <option>Marine & Superyachts</option>
                    <option>Automotive & Historic Cars</option>
                    <option>Jewellery & Horology</option>
                    <option>Real Estate & Sovereign Islands</option>
                    <option>Art & Collectibles</option>
                    <option>Private Opportunities & Tenders</option>
                    <option>Full Private Circle Membership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label-micro text-[#080B09] block mb-1">Confidential Notes / Acquisition Mandate</label>
                <textarea
                  rows={3}
                  placeholder="Outline your acquisition criteria, timeframe, or specific asset reference..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs text-[#080B09] focus:outline-none focus:border-[#061C16]"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[10px] text-[#7A8F83] font-light">
                  Protected by Swiss & UK Non-Disclosure Protocols.
                </span>
                <button type="submit" className="btn-editorial-gold w-full sm:w-auto">
                  Transmit Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
