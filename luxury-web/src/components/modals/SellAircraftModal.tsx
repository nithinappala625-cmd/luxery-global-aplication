'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, Upload, ShieldCheck, CheckCircle2, PhoneCall, Sparkles, Building2, UserCheck } from 'lucide-react';
import { submitAircraftForSale, SalesAircraftListing } from '@/lib/aircraftSales';

interface SellAircraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (listing: SalesAircraftListing) => void;
}

export default function SellAircraftModal({ isOpen, onClose, onSuccess }: SellAircraftModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    registrationNumber: '',
    category: 'Heavy Jet' as SalesAircraftListing['category'],
    year: new Date().getFullYear() - 3,
    totalTimeHours: 1200,
    engineProgram: 'Rolls-Royce CorporateCare / Honeywell MSP',
    quotedPriceUSD: 14500000,
    quotedPriceINR: '₹120 Crores',
    country: 'India',
    baseAirport: 'Mumbai (BOM) / New Delhi (DEL)',
    ownerNameOrType: 'Private Owner (Single Principal)',
    contactName: '',
    contactPhone: '+91 ',
    contactEmail: '',
    mediaUrl: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [createdListing, setCreatedListing] = useState<SalesAircraftListing | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const listing = await submitAircraftForSale({
        name: formData.name || 'Private Jet Executive Listing',
        registrationNumber: formData.registrationNumber || 'VT-OFFMK',
        category: formData.category,
        year: Number(formData.year),
        totalTimeHours: Number(formData.totalTimeHours),
        engineProgram: formData.engineProgram,
        quotedPriceUSD: Number(formData.quotedPriceUSD),
        quotedPriceINR: formData.quotedPriceINR,
        country: formData.country,
        baseAirport: formData.baseAirport,
        ownerNameOrType: formData.ownerNameOrType,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        mediaUrl: formData.mediaUrl || '/hawker_jet.jpg',
        description: formData.description,
      });

      setCreatedListing(listing);
      setSubmitted(true);
      if (onSuccess) onSuccess(listing);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDispatch = () => {
    const text = encodeURIComponent(
      `👑 *ROYENDISON PRIVATE AIRCRAFT LISTING SUBMISSION*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Aircraft Model:* ${formData.name}\n` +
      `*Registration:* ${formData.registrationNumber}\n` +
      `*Category:* ${formData.category}\n` +
      `*Year of Delivery:* ${formData.year}\n` +
      `*Airframe Hours (TTAF):* ${formData.totalTimeHours} hrs\n` +
      `*Engine Program:* ${formData.engineProgram}\n` +
      `*Quoted Price:* $${(formData.quotedPriceUSD / 1e6).toFixed(1)}M (${formData.quotedPriceINR})\n` +
      `*Base / Country:* ${formData.baseAirport} (${formData.country})\n` +
      `*Owner Registry:* ${formData.ownerNameOrType}\n` +
      `*Contact Person:* ${formData.contactName}\n` +
      `*Phone/WhatsApp:* ${formData.contactPhone}\n` +
      `*Email:* ${formData.contactEmail}\n` +
      `*Notes:* ${formData.description || 'Verified via Royendison Portal'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Please assign a Senior Aviation Escrow Advisor.`
    );
    window.open(`https://wa.me/917981994870?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#062B1B] text-[#FCFBF7] border border-[#C6A15B]/50 rounded-xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#03180F] border border-[#C6A15B]/30 hover:border-[#C6A15B] text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#0A3A25] border border-[#C6A15B] flex items-center justify-center text-[#C6A15B]">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#FCFBF7]">
                    Sell Your Private Aircraft
                  </h3>
                  <p className="text-xs text-[#C6A15B] font-mono tracking-wider uppercase">
                    Royendison Direct Sovereign & Family Office Escrow
                  </p>
                </div>
              </div>

              <p className="text-xs text-stone-300 mb-6 leading-relaxed">
                List your private aircraft, jet, or helicopter across our verified global network of ultra-high-net-worth principals, royal families, and corporate flight departments. Data is securely synced to Supabase with Cloudflare media protection.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Row 1: Model & Tail Reg */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Aircraft Make & Model *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gulfstream G650ER / King Air B200"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white placeholder-stone-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Tail / Registration Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. VT-BNB / N700ED / A6-G65"
                      value={formData.registrationNumber}
                      onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white placeholder-stone-500 outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Row 2: Category & Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Aircraft Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                    >
                      <option value="Ultra Long Range">Ultra Long Range Jet</option>
                      <option value="Heavy Jet">Heavy Jet</option>
                      <option value="Super Midsize">Super Midsize Jet</option>
                      <option value="Midsize">Midsize Jet</option>
                      <option value="Light Jet">Light / Lightweight Jet</option>
                      <option value="Turboprop">Twin Turboprop</option>
                      <option value="VIP Helicopter">VIP Helicopter (Twin/Single)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                        Year of Delivery
                      </label>
                      <input
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                        className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                        Airframe Hours (TTAF)
                      </label>
                      <input
                        type="number"
                        value={formData.totalTimeHours}
                        onChange={(e) => setFormData({ ...formData, totalTimeHours: Number(e.target.value) })}
                        className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Quoted Asking Price (USD & INR) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Quoted Asking Price (USD $) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 15000000"
                      value={formData.quotedPriceUSD}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFormData({ 
                          ...formData, 
                          quotedPriceUSD: val,
                          quotedPriceINR: `₹${((val * 84) / 1e7).toFixed(1)} Crores`
                        });
                      }}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Estimated INR Equivalent
                    </label>
                    <input
                      type="text"
                      value={formData.quotedPriceINR}
                      onChange={(e) => setFormData({ ...formData, quotedPriceINR: e.target.value })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none font-mono text-[#C6A15B]"
                    />
                  </div>
                </div>

                {/* Row 4: Country & Base Airport & Owner Name */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Country of Registry *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. India / UAE / UK / USA"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Base Airport / Hangar
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai (BOM) / Dubai (DWC)"
                      value={formData.baseAirport}
                      onChange={(e) => setFormData({ ...formData, baseAirport: e.target.value })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Owner Name / Registry Status
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Private Owner / Corporate Fleet"
                      value={formData.ownerNameOrType}
                      onChange={(e) => setFormData({ ...formData, ownerNameOrType: e.target.value })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                    />
                  </div>
                </div>

                {/* Row 5: Engine Program */}
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                    Engine & APU Maintenance Program
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rolls-Royce CorporateCare, Honeywell MSP Gold, Pratt & Whitney ESP"
                    value={formData.engineProgram}
                    onChange={(e) => setFormData({ ...formData, engineProgram: e.target.value })}
                    className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                  />
                </div>

                {/* Row 6: Contact Information */}
                <div className="p-3.5 bg-[#03180F] border border-[#C6A15B]/30 rounded-lg space-y-3">
                  <div className="flex items-center gap-2 text-[#C6A15B] font-bold text-[11px] uppercase tracking-wider">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Authorized Owner / Broker Contact Details</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[9.5px] uppercase font-semibold text-stone-300 mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Capt. Sharma / Mr. Singhania"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full bg-[#062B1B] border border-white/10 rounded px-2.5 py-1.5 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9.5px] uppercase font-semibold text-stone-300 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+91 98..."
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        className="w-full bg-[#062B1B] border border-white/10 rounded px-2.5 py-1.5 text-white outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[9.5px] uppercase font-semibold text-stone-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="office@company.com"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        className="w-full bg-[#062B1B] border border-white/10 rounded px-2.5 py-1.5 text-white outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 7: Media / Photo Upload & Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Photo / Brochure Media URL (Supabase & Cloudflare)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="https://... or upload link"
                        value={formData.mediaUrl}
                        onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                        className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white placeholder-stone-500 outline-none"
                      />
                    </div>
                    <span className="text-[9px] text-stone-400 mt-1 block">
                      Leave empty to use high-resolution verified aircraft photography.
                    </span>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Maintenance History & Special Features
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Fresh 12-month inspection, Ka-band Wi-Fi, VIP Master Suite bed..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-1.5 text-white placeholder-stone-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[10px] text-stone-400">
                    <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                    <span>Protected by Royendison Sovereign Escrow & NDAs</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded bg-[#C6A15B] hover:bg-[#DFC07E] text-[#061C14] font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-[#C6A15B]/30 disabled:opacity-50"
                  >
                    {loading ? 'Submitting to Supabase...' : 'List Aircraft For Sale'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#065E38] border-2 border-[#25D366] mx-auto flex items-center justify-center text-white shadow-xl">
                <CheckCircle2 className="w-9 h-9 text-[#25D366]" />
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-white mb-2">
                  Aircraft Listing Registered Successfully
                </h4>
                <p className="text-sm text-stone-300 max-w-md mx-auto">
                  Your aircraft <strong className="text-[#C6A15B]">{formData.name}</strong> (Reg: <span className="font-mono">{formData.registrationNumber}</span>) is now registered in our database and available on the Private Sales desk.
                </p>
              </div>

              <div className="p-4 bg-[#03180F] border border-[#C6A15B]/40 rounded-lg max-w-md mx-auto text-left space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">Listing Reference:</span>
                  <span className="font-mono text-[#C6A15B] font-bold">{createdListing?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Asking Price:</span>
                  <span className="font-mono text-white font-bold">{formData.quotedPriceINR} (${(formData.quotedPriceUSD / 1e6).toFixed(1)}M)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Escrow Verification:</span>
                  <span className="text-emerald-400 font-semibold">Ready for Inspection</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  onClick={handleWhatsAppDispatch}
                  className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#065E38] hover:bg-[#044B2D] border border-[#25D366]/60 text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <PhoneCall className="w-4 h-4 text-[#25D366]" />
                  <span>Send Spec Sheet to WhatsApp (+91 7981994870)</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded bg-[#03180F] border border-white/20 hover:border-white text-stone-300 text-xs font-semibold transition-all"
                >
                  Close & View Inventory
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
