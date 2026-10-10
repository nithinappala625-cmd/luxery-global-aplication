'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Plane, Calendar, Users, MapPin, Tag, PlusCircle, CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-react';
import { INITIAL_EMPTY_LEGS, EmptyLegDeal } from '@/lib/aviationData';
import { submitOperatorEmptyLeg } from '@/lib/aircraftSales';

interface EmptyLegsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmptyLegsModal({ isOpen, onClose }: EmptyLegsModalProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'operator-upload'>('browse');
  const [deals, setDeals] = useState<EmptyLegDeal[]>(INITIAL_EMPTY_LEGS);

  // Operator listing state
  const [operatorForm, setOperatorForm] = useState({
    flightName: '',
    aircraftModel: 'Hawker 900XP',
    registration: '',
    origin: '',
    destination: '',
    date: '2026-10-18',
    departureTime: '10:00 AM',
    seatsAvailable: 8,
    discountedPriceINR: '₹2.8 Lakhs',
    operatorName: '',
    contactPhone: '+91 ',
  });
  const [operatorSubmitted, setOperatorSubmitted] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  if (!isOpen) return null;

  const handleBookDeal = (deal: EmptyLegDeal) => {
    const text = encodeURIComponent(
      `⚡ *ROYENDISON EMPTY LEG RESERVATION REQUEST*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Flight:* ${deal.flightName}\n` +
      `*Aircraft:* ${deal.aircraftModel} (${deal.registration || 'Verified'})\n` +
      `*Route:* ${deal.origin} ➔ ${deal.destination}\n` +
      `*Date:* ${deal.date} at ${deal.departureTime || 'Flexible'}\n` +
      `*Seats Available:* ${deal.seatsAvailable}\n` +
      `*Discounted Rate:* ${deal.discountedPriceINR} (${deal.discountPercentage}% OFF)\n` +
      `*Operator:* ${deal.operator}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Please lock this empty leg sector for my travel.`
    );
    window.open(`https://wa.me/917981994870?text=${text}`, '_blank');
  };

  const handleOperatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadLoading(true);

    try {
      const newDeal = await submitOperatorEmptyLeg({
        flightName: operatorForm.flightName || `${operatorForm.aircraftModel} Repositioning`,
        aircraftModel: operatorForm.aircraftModel,
        registration: operatorForm.registration || 'VT-XXX',
        origin: operatorForm.origin,
        destination: operatorForm.destination,
        date: operatorForm.date,
        departureTime: operatorForm.departureTime,
        seatsAvailable: Number(operatorForm.seatsAvailable),
        discountedPriceINR: operatorForm.discountedPriceINR,
        operatorName: operatorForm.operatorName || 'DGCA Registered Charter Operator',
        contactPhone: operatorForm.contactPhone,
      });

      setDeals([newDeal as any, ...deals]);
      setOperatorSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#062B1B] text-[#FCFBF7] border border-[#C6A15B]/50 rounded-xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#03180F] border border-[#C6A15B]/30 hover:border-[#C6A15B] text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#C6A15B]/30 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0A3A25] border border-[#C6A15B] flex items-center justify-center text-[#DFC07E]">
                <Zap className="w-5 h-5 text-[#DFC07E] fill-[#DFC07E]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-2xl font-bold text-[#FCFBF7]">
                    Empty Legs & Ferry Deals
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400 text-amber-300 text-[10px] font-mono font-bold uppercase">
                    Up to 65% OFF
                  </span>
                </div>
                <p className="text-xs text-[#C6A15B] font-mono tracking-wider">
                  Live Repositioning Sectors · One-Way Private Flight Pricing
                </p>
              </div>
            </div>

            {/* Switch tabs */}
            <div className="flex items-center bg-[#03180F] p-1 rounded-lg border border-white/10 self-start sm:self-auto">
              <button
                onClick={() => { setActiveTab('browse'); setOperatorSubmitted(false); }}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                  activeTab === 'browse'
                    ? 'bg-[#0A3A25] text-white border border-[#C6A15B]'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Available Deals ({deals.length})
              </button>
              <button
                onClick={() => setActiveTab('operator-upload')}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'operator-upload'
                    ? 'bg-[#C6A15B] text-[#061C14]'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>List a Ferry Deal</span>
              </button>
            </div>
          </div>

          {activeTab === 'browse' ? (
            <div className="space-y-4">
              <p className="text-xs text-stone-300">
                Empty legs are private aircraft repositioning flights without passengers. Lock an entire private jet or twin-engine aircraft at up to 65% discount compared to full roundtrip charter costs.
              </p>

              <div className="grid grid-cols-1 gap-3.5">
                {deals.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-4 bg-[#03180F] border border-[#C6A15B]/30 hover:border-[#C6A15B] rounded-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#C6A15B] font-bold">[{deal.id}]</span>
                        <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#DFC07E] transition-colors">
                          {deal.flightName}
                        </h4>
                        <span className="text-[10px] bg-[#062B1B] text-[#DFC07E] border border-[#C6A15B]/40 px-2 py-0.5 rounded font-mono font-semibold">
                          {deal.aircraftModel}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300">
                        <div className="flex items-center gap-1.5 font-bold text-white">
                          <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                          <span>{deal.origin}</span>
                          <span className="text-[#C6A15B]">➔</span>
                          <span>{deal.destination}</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{deal.date} ({deal.departureTime})</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-400">
                          <Users className="w-3.5 h-3.5" />
                          <span>Up to {deal.seatsAvailable} Seats</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-stone-400">
                        Operator: <span className="text-stone-200 font-semibold">{deal.operator}</span> · Tail: <span className="font-mono text-stone-300">{deal.registration || 'Verified Part 135'}</span>
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10">
                      <div>
                        <div className="text-[10px] text-stone-400 line-through">
                          Normal: {deal.originalPriceINR}
                        </div>
                        <div className="font-serif text-xl font-bold text-[#DFC07E]">
                          {deal.discountedPriceINR}
                        </div>
                        <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                          Save {deal.discountPercentage}%
                        </span>
                      </div>

                      <button
                        onClick={() => handleBookDeal(deal)}
                        className="px-4 py-2 rounded bg-[#065E38] hover:bg-[#044B2D] border border-[#25D366]/70 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Book via WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {!operatorSubmitted ? (
                <div>
                  <h4 className="font-serif text-xl font-bold text-white mb-1">
                    Aircraft Operator Portal: List Empty Leg or Ferry Sector
                  </h4>
                  <p className="text-xs text-stone-300 mb-5">
                    Are you a DGCA or International Part 135 charter operator with an upcoming empty leg or repositioning flight? Post your sector here to connect directly with pre-verified high-net-worth travelers.
                  </p>

                  <form onSubmit={handleOperatorSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                          Flight Title / Sector Code *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Challenger 605 Coastal Reposition"
                          value={operatorForm.flightName}
                          onChange={(e) => setOperatorForm({ ...operatorForm, flightName: e.target.value })}
                          className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                          Aircraft Model *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Hawker 900XP / King Air B200 / Falcon 2000"
                          value={operatorForm.aircraftModel}
                          onChange={(e) => setOperatorForm({ ...operatorForm, aircraftModel: e.target.value })}
                          className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                          Origin Airport (ICAO / City) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mumbai (BOM) / VIDP"
                          value={operatorForm.origin}
                          onChange={(e) => setOperatorForm({ ...operatorForm, origin: e.target.value })}
                          className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                          Destination Airport *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Goa (GOX) / Dubai (DWC)"
                          value={operatorForm.destination}
                          onChange={(e) => setOperatorForm({ ...operatorForm, destination: e.target.value })}
                          className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                          Tail / Registration No.
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. VT-RAX / N-500"
                          value={operatorForm.registration}
                          onChange={(e) => setOperatorForm({ ...operatorForm, registration: e.target.value })}
                          className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                          Available Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={operatorForm.date}
                          onChange={(e) => setOperatorForm({ ...operatorForm, date: e.target.value })}
                          className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                          Departure Slot / Window
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 11:30 AM / Flexible Afternoon"
                          value={operatorForm.departureTime}
                          onChange={(e) => setOperatorForm({ ...operatorForm, departureTime: e.target.value })}
                          className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                          Seats Available
                        </label>
                        <input
                          type="number"
                          value={operatorForm.seatsAvailable}
                          onChange={(e) => setOperatorForm({ ...operatorForm, seatsAvailable: Number(e.target.value) })}
                          className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                          Discounted Asking Rate (INR) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. ₹2.8 Lakhs / ₹4.5 Lakhs"
                          value={operatorForm.discountedPriceINR}
                          onChange={(e) => setOperatorForm({ ...operatorForm, discountedPriceINR: e.target.value })}
                          className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none text-[#DFC07E] font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                          Operator / AOC Holder Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Skyline Aviation / DGCA NSOP"
                          value={operatorForm.operatorName}
                          onChange={(e) => setOperatorForm({ ...operatorForm, operatorName: e.target.value })}
                          className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                          Operator WhatsApp / Phone *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="+91 98..."
                          value={operatorForm.contactPhone}
                          onChange={(e) => setOperatorForm({ ...operatorForm, contactPhone: e.target.value })}
                          className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-stone-400 text-[10px]">
                        <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                        <span>Direct sync with Supabase and verified operator escrow</span>
                      </div>

                      <button
                        type="submit"
                        disabled={uploadLoading}
                        className="px-6 py-2.5 rounded bg-[#C6A15B] hover:bg-[#DFC07E] text-[#061C14] font-bold text-xs uppercase tracking-widest transition-all shadow-lg disabled:opacity-50"
                      >
                        {uploadLoading ? 'Uploading Sector...' : 'Publish Empty Leg Deal'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#065E38] border-2 border-[#25D366] mx-auto flex items-center justify-center text-white shadow-xl">
                    <CheckCircle2 className="w-8 h-8 text-[#25D366]" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-white">
                    Empty Leg Sector Published
                  </h4>
                  <p className="text-xs text-stone-300 max-w-md mx-auto">
                    Your repositioning flight from <strong className="text-[#DFC07E]">{operatorForm.origin}</strong> to <strong className="text-[#DFC07E]">{operatorForm.destination}</strong> on <strong className="text-white">{operatorForm.date}</strong> is now live on our discount desk.
                  </p>
                  <button
                    onClick={() => setActiveTab('browse')}
                    className="px-6 py-2 rounded bg-[#C6A15B] text-[#061C14] font-bold text-xs uppercase tracking-widest"
                  >
                    View Updated Live Deals
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
