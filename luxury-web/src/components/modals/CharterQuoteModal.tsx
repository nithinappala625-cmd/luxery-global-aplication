'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, Calendar, Users, MapPin, Sparkles, CheckCircle2, PhoneCall, ShieldCheck, HeartHandshake } from 'lucide-react';
import { FleetAircraft, HELICOPTER_EVENTS, AIRCRAFT_EVENTS } from '@/lib/aviationData';
import { supabase } from '@/lib/supabase';
import { saveBookingRequest } from '@/lib/bookings';

interface CharterQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAsset?: FleetAircraft | null;
  defaultMode?: 'aircraft' | 'helicopter';
}

export default function CharterQuoteModal({
  isOpen,
  onClose,
  selectedAsset,
  defaultMode = 'aircraft',
}: CharterQuoteModalProps) {
  const isHelicopter = selectedAsset ? selectedAsset.category === 'helicopter' : defaultMode === 'helicopter';

  const [formData, setFormData] = useState({
    aircraftName: selectedAsset?.name || (isHelicopter ? 'Agusta A109S (Twin Engine)' : 'Beech Super King Air B200'),
    missionEvent: isHelicopter ? 'Marriage & Wedding Grand Entry' : 'Corporate Executive Business Meetups',
    origin: 'Mumbai (BOM)',
    destination: isHelicopter ? 'Private Wedding Venue / Helipad' : 'New Delhi (DEL)',
    departureDate: '2026-10-20',
    departureTime: '10:00 AM',
    returnDate: '',
    passengers: 4,
    cateringPreference: 'Royal Michelin Caviar & Champagne',
    clientName: '',
    clientPhone: '+91 ',
    clientEmail: '',
    specialNotes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState('');

  if (!isOpen) return null;

  const eventOptions = isHelicopter ? HELICOPTER_EVENTS : AIRCRAFT_EVENTS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const ref = `ROY-CH-${Math.floor(10000 + Math.random() * 90000)}`;
    setQuoteReference(ref);

    // 1. Save local booking
    saveBookingRequest({
      category: 'aviation',
      serviceType: isHelicopter ? 'helicopter_mission' : 'private_jet_charter',
      clientName: formData.clientName || 'VIP Client',
      clientPhone: formData.clientPhone,
      clientEmail: formData.clientEmail,
      origin: formData.origin,
      destination: formData.destination,
      routeLabel: `${formData.origin} ➔ ${formData.destination}`,
      departureDate: formData.departureDate,
      departureTime: formData.departureTime,
      returnDate: formData.returnDate,
      passengers: Number(formData.passengers),
      missionPurpose: formData.missionEvent,
      specialRequests: `${formData.aircraftName} | Catering: ${formData.cateringPreference} | Notes: ${formData.specialNotes}`,
    });

    // 2. Mirror into Supabase
    try {
      await supabase.from('booking_requests').insert([
        {
          id: ref,
          client_name: formData.clientName,
          client_phone: formData.clientPhone,
          client_email: formData.clientEmail,
          asset_name: formData.aircraftName,
          category: isHelicopter ? 'helicopter' : 'aircraft',
          mission_event: formData.missionEvent,
          origin: formData.origin,
          destination: formData.destination,
          departure_date: formData.departureDate,
          departure_time: formData.departureTime,
          return_date: formData.returnDate,
          passengers: formData.passengers,
          special_notes: formData.specialNotes,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.warn('Supabase booking insert fallback:', err);
    }

    setLoading(false);
    setSubmitted(true);
  };

  const handleWhatsAppDispatch = () => {
    const text = encodeURIComponent(
      `👑 *ROYENDISON CHARTER QUOTATION REQUISITION*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Reference:* ${quoteReference}\n` +
      `*Asset Requested:* ${formData.aircraftName}\n` +
      `*Mission / Event Purpose:* ${formData.missionEvent}\n` +
      `*Sector Route:* ${formData.origin} ➔ ${formData.destination}\n` +
      `*Departure:* ${formData.departureDate} at ${formData.departureTime}\n` +
      `*Return Date:* ${formData.returnDate || 'One-Way Direct'}\n` +
      `*Passenger Count:* ${formData.passengers} Guests\n` +
      `*Catering / Service:* ${formData.cateringPreference}\n` +
      `*Principal Client:* ${formData.clientName}\n` +
      `*Contact Phone:* ${formData.clientPhone}\n` +
      `*Email:* ${formData.clientEmail}\n` +
      `*Special Details:* ${formData.specialNotes || 'None'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Please provide immediate dispatch slot & final flight quotation.`
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
          {/* Close */}
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
                    {isHelicopter ? 'Helicopter Charter & Mission Desk' : 'Private Jet & Aircraft Charter Desk'}
                  </h3>
                  <p className="text-xs text-[#C6A15B] font-mono tracking-wider uppercase">
                    Direct DGCA & Global Airway Slot Quotation
                  </p>
                </div>
              </div>

              {selectedAsset && (
                <div className="p-3 bg-[#03180F] border border-[#C6A15B]/30 rounded-lg mb-5 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Selected Aircraft</span>
                    <strong className="text-white text-sm font-serif">{selectedAsset.name}</strong>
                    <span className="text-[11px] text-[#DFC07E] block mt-0.5 font-mono">
                      {selectedAsset.seating} · {selectedAsset.speed} · {selectedAsset.range}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#062B1B] border border-[#C6A15B] text-[#DFC07E] text-[10px] font-mono font-bold uppercase">
                    {selectedAsset.subCategory || selectedAsset.category}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Mission Event Type */}
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                    Mission Purpose / Event Type *
                  </label>
                  <select
                    required
                    value={formData.missionEvent}
                    onChange={(e) => setFormData({ ...formData, missionEvent: e.target.value })}
                    className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none font-medium"
                  >
                    {eventOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#062B1B]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Itinerary Route */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Departure City / Airport / Helipad *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai (BOM) / Juhu / Delhi (DEL)"
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Destination City / Helipad / Venue *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Goa (GOX) / Wedding Palace / Kedarnath"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                    />
                  </div>
                </div>

                {/* Dates & Times */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Departure Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.departureDate}
                      onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Departure Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 10:30 AM / Flexible"
                      value={formData.departureTime}
                      onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Return Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                    />
                  </div>
                </div>

                {/* Passengers & In-flight Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      Number of Passengers / Guests *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={45}
                      required
                      value={formData.passengers}
                      onChange={(e) => setFormData({ ...formData, passengers: Number(e.target.value) })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                      In-Flight Catering & Protocol
                    </label>
                    <select
                      value={formData.cateringPreference}
                      onChange={(e) => setFormData({ ...formData, cateringPreference: e.target.value })}
                      className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-2 text-white outline-none"
                    >
                      <option value="Royal Michelin Caviar & Champagne">Royal Michelin Caviar & Champagne</option>
                      <option value="Pure Vegetarian / Jain Gourmet Menu">Pure Vegetarian / Jain Gourmet Menu</option>
                      <option value="Executive Light Refreshments & Espresso">Executive Light Refreshments & Espresso</option>
                      <option value="Wedding Red Carpet & Floral Welcome">Wedding Red Carpet & Floral Welcome</option>
                      <option value="Flower Shower Basket Preparation (Rose Petals)">Flower Shower Basket Preparation (Rose Petals)</option>
                    </select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="p-3.5 bg-[#03180F] border border-[#C6A15B]/30 rounded-lg space-y-3">
                  <div className="flex items-center gap-2 text-[#C6A15B] font-bold text-[11px] uppercase tracking-wider">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>Lead Passenger / Family Office Contact</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[9.5px] uppercase font-semibold text-stone-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Singhania"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
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
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
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
                        placeholder="office@singhania.com"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        className="w-full bg-[#062B1B] border border-white/10 rounded px-2.5 py-1.5 text-white outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Notes / Flower shower kgs / Political convoy */}
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#C6A15B] mb-1">
                    Special Event Instructions (Flower Shower Quantity, Landing Permissions, VIP Escort)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Need 100 kg rose petals for flower rain over wedding venue at 12:30 PM, DGCA permission required..."
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    className="w-full bg-[#03180F] border border-white/20 focus:border-[#C6A15B] rounded px-3 py-1.5 text-white placeholder-stone-500 outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[10px] text-stone-400">
                    <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                    <span>Instant DGCA / ATC Flight Coordination</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded bg-[#C6A15B] hover:bg-[#DFC07E] text-[#061C14] font-bold text-xs uppercase tracking-widest transition-all shadow-lg disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Request Instant Flight Quote'}
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
                  Flight Requisition Received
                </h4>
                <p className="text-sm text-stone-300 max-w-md mx-auto">
                  Your charter requisition for <strong className="text-[#C6A15B]">{formData.aircraftName}</strong> on route <strong className="text-white">{formData.origin} ➔ {formData.destination}</strong> is registered under reference <span className="font-mono text-[#DFC07E] font-bold">{quoteReference}</span>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  onClick={handleWhatsAppDispatch}
                  className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#065E38] hover:bg-[#044B2D] border border-[#25D366]/60 text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <PhoneCall className="w-4 h-4 text-[#25D366]" />
                  <span>Dispatch Manifest to WhatsApp (+91 7981994870)</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded bg-[#03180F] border border-white/20 hover:border-white text-stone-300 text-xs font-semibold transition-all"
                >
                  Close & Explore Fleet
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
