'use client';

import { useState } from 'react';
import { X, Plane, Sparkles, CheckCircle2, Shield, Calendar, MapPin, Users, Phone, Mail, ArrowRight } from 'lucide-react';
import { saveBookingRequest } from '@/lib/bookings';
import Link from 'next/link';

interface AviationCharterModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillRoute?: { origin: string; destination: string; label: string };
  prefillAircraft?: string;
  prefillMission?: string;
}

export default function AviationCharterModal({
  isOpen,
  onClose,
  prefillRoute,
  prefillAircraft,
  prefillMission,
}: AviationCharterModalProps) {
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    organization: '',
    origin: prefillRoute?.origin || 'Goa International (GOI)',
    destination: prefillRoute?.destination || 'Hyderabad Begumpet (BPM)',
    departureDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    departureTime: '10:00 AM',
    passengers: 4,
    aircraftType: prefillAircraft || 'Ultra Long Range Private Jet',
    missionPurpose: prefillMission || 'Executive Business Travel',
    budgetEstimated: '',
    specialRequests: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const req = saveBookingRequest({
      category: 'aviation',
      serviceType: formData.aircraftType.toLowerCase().includes('helicopter')
        ? 'helicopter_mission'
        : 'private_jet_charter',
      clientName: formData.clientName,
      clientPhone: formData.clientPhone,
      clientEmail: formData.clientEmail,
      organization: formData.organization,
      origin: formData.origin,
      destination: formData.destination,
      routeLabel: `${formData.origin} ➔ ${formData.destination}`,
      departureDate: formData.departureDate,
      departureTime: formData.departureTime,
      passengers: Number(formData.passengers),
      missionPurpose: `${formData.missionPurpose} (${formData.aircraftType})`,
      budgetEstimated: formData.budgetEstimated || 'Upon Quotation',
      specialRequests: formData.specialRequests,
    });
    setSubmittedId(req.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080B09]/90 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#FCFBF7] border border-[#D8D3C8] shadow-2xl p-6 sm:p-10 my-8"
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

        {submittedId ? (
          <div className="py-8 text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#061C16] border border-[#C6A15B] flex items-center justify-center text-[#C6A15B]">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#9D7B3E] font-medium block">
                MISSION DISPATCHED SUCCESSFULLY
              </span>
              <h3 className="font-serif text-3xl font-light text-[#061C16]">
                Private Charter Request Confirmed
              </h3>
              <p className="text-sm font-mono text-[#C6A15B] font-semibold">
                Reference ID: {submittedId}
              </p>
            </div>

            <div className="max-w-lg mx-auto bg-white border border-[#D8D3C8] p-5 text-left text-xs space-y-2.5 text-[#080B09]/80">
              <div className="flex justify-between border-b border-[#D8D3C8]/60 pb-2">
                <span className="text-[#080B09]/50 uppercase tracking-widest text-[9px]">ROUTE:</span>
                <span className="font-semibold text-[#061C16]">{formData.origin} ➔ {formData.destination}</span>
              </div>
              <div className="flex justify-between border-b border-[#D8D3C8]/60 pb-2">
                <span className="text-[#080B09]/50 uppercase tracking-widest text-[9px]">MISSION:</span>
                <span className="font-semibold text-[#061C16]">{formData.missionPurpose}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#080B09]/50 uppercase tracking-widest text-[9px]">PASSENGERS &amp; DATE:</span>
                <span className="font-semibold text-[#061C16]">{formData.passengers} Pax &middot; {formData.departureDate}</span>
              </div>
            </div>

            <p className="text-xs text-[#080B09]/70 font-light max-w-md mx-auto leading-relaxed">
              Your flight requirement has been transmitted to certified DGCA/FAA Part 135 air operators and independent brokers in the <strong>NP GROUPS Owner &amp; Broker Portal</strong>. You will receive direct quotes within 2 hours.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/portal"
                onClick={onClose}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-[#C6A15B] hover:text-[#061C16] transition-all"
              >
                VIEW IN OWNER &amp; BROKER PORTAL
              </Link>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-7 py-3.5 border border-[#D8D3C8] text-[#080B09] text-[10px] uppercase tracking-[0.25em] font-medium hover:border-[#061C16] transition-all"
              >
                CLOSE
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D7B3E] font-medium mb-1">
                <Plane className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>PRIVATE FLIGHT DISPATCH</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#061C16]">
                Book Private Charter or Helicopter Mission
              </h2>
              <p className="text-xs text-[#080B09]/60 font-light mt-1">
                From executive point-to-point flights (Goa &ndash; Hyderabad, India &ndash; USA) to helicopter wedding flower showers and political rallies.
              </p>
            </div>

            {/* Quick Route / Mission Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                  Aircraft Category
                </label>
                <select
                  value={formData.aircraftType}
                  onChange={(e) => setFormData({ ...formData, aircraftType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                >
                  <option value="Heavy / Ultra Long Range Jet (G700 / Global 7500)">Ultra Long Range Jet (G700 / Global 7500)</option>
                  <option value="Mid-Size Jet (Learjet 75 / Citation Latitude)">Mid-Size Jet (Learjet 75 / Citation Latitude)</option>
                  <option value="Light Executive Jet (Phenom 300 / PC-24)">Light Executive Jet (Phenom 300 / PC-24)</option>
                  <option value="VIP Helicopter (Sikorsky S-76D / Airbus H145)">VIP Helicopter (Sikorsky S-76D / Airbus H145)</option>
                  <option value="Heavy Helicopter (Bell 525 Relentless)">Heavy Helicopter (Bell 525 Relentless)</option>
                  <option value="Amphibious Air Boat / Seaplane">Amphibious Air Boat / Seaplane</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                  Mission Purpose / Occasion
                </label>
                <select
                  value={formData.missionPurpose}
                  onChange={(e) => setFormData({ ...formData, missionPurpose: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                >
                  <option value="Executive Business Travel">Executive Business Travel</option>
                  <option value="Domestic Point-to-Point (e.g. Goa to Hyderabad)">Domestic Point-to-Point (e.g. Goa to Hyderabad)</option>
                  <option value="Intercontinental Charter (e.g. India to USA / Europe)">Intercontinental Charter (e.g. India to USA / Europe)</option>
                  <option value="Wedding VIP Grand Entry">Wedding VIP Grand Entry</option>
                  <option value="Aerial Flower Shower Ceremony">Aerial Flower Shower Ceremony</option>
                  <option value="Political Party Campaign Multi-City Transit">Political Party Campaign Multi-City Transit</option>
                  <option value="Medical Air Ambulance Transfer">Medical Air Ambulance Transfer</option>
                  <option value="Private Leisure Holiday">Private Leisure Holiday</option>
                </select>
              </div>
            </div>

            {/* Origin & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                  Departure Location / Airport
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-[#9D7B3E]" />
                  <input
                    type="text"
                    required
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="e.g. Goa (GOI) or Mumbai (BOM)"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                  Destination Location / Airport / Helipad
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-[#9D7B3E]" />
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Hyderabad (HYD), New York (JFK), Udaipur Palace"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                  />
                </div>
              </div>
            </div>

            {/* Date, Time & Passengers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                  Departure Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.departureDate}
                  onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                  Preferred Time
                </label>
                <input
                  type="text"
                  value={formData.departureTime}
                  onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                  placeholder="e.g. 10:30 AM"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                  VIP Passengers
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.passengers}
                  onChange={(e) => setFormData({ ...formData, passengers: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                />
              </div>
            </div>

            {/* Client Contact Details */}
            <div className="pt-2 border-t border-[#D8D3C8]/70">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#061C16] font-semibold block mb-3">
                Principal &amp; Coordinator Details
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Principal or Booker Name *"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                />
                <input
                  type="text"
                  placeholder="Family Office / Company / Political Org"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Direct Phone / WhatsApp Number *"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                />
                <input
                  type="email"
                  required
                  placeholder="Confidential Email Address *"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                Special Flight Instructions &amp; VIP Amenities
              </label>
              <textarea
                rows={2}
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Specific engine/cabin preferences, pet clearance, flower shower drop coordination, special diplomatic protocol, ground tarmac limousine, etc."
                className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-[10px] text-[#080B09]/60">
                <Shield className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Zero Public Indexation &middot; Direct Broker &amp; Operator Dispatch</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>TRANSMIT FLIGHT REQ TO BROKERS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
