'use client';

import { useState } from 'react';
import { X, Anchor, CheckCircle2, Shield, MapPin, Users, ArrowRight } from 'lucide-react';
import { saveBookingRequest } from '@/lib/bookings';
import Link from 'next/link';

interface MarineCharterModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillVessel?: string;
  prefillEventType?: string;
  prefillPort?: string;
}

export default function MarineCharterModal({
  isOpen,
  onClose,
  prefillVessel,
  prefillEventType,
  prefillPort,
}: MarineCharterModalProps) {
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    organization: '',
    embarkationPort: prefillPort || 'Goa Grand Hyatt Jetty / Mandovi',
    cruisingWaters: 'Goa Coastal Waters & Sunset Strip',
    vesselCategory: prefillVessel || 'Sunseeker 131 (40m Superyacht)',
    eventType: prefillEventType || 'Private Sunset Yacht Party & DJ Celebration',
    charterDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    duration: 'Full Day Charter (8 Hours)',
    guestsCount: 25,
    budgetEstimated: '',
    specialRequirements: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const req = saveBookingRequest({
      category: 'marine',
      serviceType: formData.eventType.toLowerCase().includes('party') || formData.eventType.toLowerCase().includes('wedding')
        ? 'event_party'
        : 'yacht_charter',
      clientName: formData.clientName,
      clientPhone: formData.clientPhone,
      clientEmail: formData.clientEmail,
      organization: formData.organization,
      origin: formData.embarkationPort,
      destination: formData.cruisingWaters,
      routeLabel: `${formData.embarkationPort} ➔ ${formData.cruisingWaters}`,
      departureDate: formData.charterDate,
      departureTime: '03:00 PM',
      passengers: Number(formData.guestsCount),
      missionPurpose: `${formData.eventType} (${formData.vesselCategory})`,
      budgetEstimated: formData.budgetEstimated || 'Upon Quotation',
      specialRequests: `${formData.duration}. ${formData.specialRequirements}`,
    });
    setSubmittedId(req.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080B09]/90 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#FCFBF7] border border-[#D8D3C8] shadow-2xl p-6 sm:p-10 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C6A15B]" />

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
                YACHT CHARTER MANDATE TRANSMITTED
              </span>
              <h3 className="font-serif text-3xl font-light text-[#061C16]">
                Marine Booking Request Lodged
              </h3>
              <p className="text-sm font-mono text-[#C6A15B] font-semibold">
                Reference ID: {submittedId}
              </p>
            </div>

            <div className="max-w-lg mx-auto bg-white border border-[#D8D3C8] p-5 text-left text-xs space-y-2.5 text-[#080B09]/80">
              <div className="flex justify-between border-b border-[#D8D3C8]/60 pb-2">
                <span className="text-[#080B09]/50 uppercase tracking-widest text-[9px]">PORT &amp; WATERS:</span>
                <span className="font-semibold text-[#061C16]">{formData.embarkationPort}</span>
              </div>
              <div className="flex justify-between border-b border-[#D8D3C8]/60 pb-2">
                <span className="text-[#080B09]/50 uppercase tracking-widest text-[9px]">CELEBRATION:</span>
                <span className="font-semibold text-[#061C16]">{formData.eventType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#080B09]/50 uppercase tracking-widest text-[9px]">GUESTS &amp; DATE:</span>
                <span className="font-semibold text-[#061C16]">{formData.guestsCount} Guests &middot; {formData.charterDate}</span>
              </div>
            </div>

            <p className="text-xs text-[#080B09]/70 font-light max-w-md mx-auto leading-relaxed">
              Your yacht charter requirement has been transmitted to certified vessel owners and licensed maritime brokers in the <strong>NP GROUPS Owner &amp; Broker Portal</strong>.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/portal"
                onClick={onClose}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-[#C6A15B] hover:text-[#061C16] transition-all"
              >
                OPEN OWNER &amp; BROKER PORTAL
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
                <Anchor className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>MARITIME CHARTER DESK</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#061C16]">
                Book Yacht Charter or Private Maritime Event
              </h2>
              <p className="text-xs text-[#080B09]/60 font-light mt-1">
                Superyacht sunset celebrations, weddings at sea, offshore corporate summits, and Mediterranean berthing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                  Vessel Category
                </label>
                <select
                  value={formData.vesselCategory}
                  onChange={(e) => setFormData({ ...formData, vesselCategory: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                >
                  <option value="Mega Yacht (60m+ Transatlantic Luxury)">Mega Yacht (60m+ Transatlantic Luxury)</option>
                  <option value="Superyacht (35m - 50m Tri-Deck)">Superyacht (35m - 50m Tri-Deck)</option>
                  <option value="Motor Yacht (20m - 30m Sport Cruiser)">Motor Yacht (20m - 30m Sport Cruiser)</option>
                  <option value="Luxury Catamaran (18m - 24m Lagoon / Sunreef)">Luxury Catamaran (18m - 24m Lagoon / Sunreef)</option>
                  <option value="Classic Sailing Vessel / Schooner">Classic Sailing Vessel / Schooner</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                  Celebration or Charter Type
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                >
                  <option value="Private Sunset Yacht Party &amp; DJ Celebration">Private Sunset Yacht Party &amp; DJ Celebration</option>
                  <option value="Wedding / Pre-Wedding Cocktail Reception at Sea">Wedding / Pre-Wedding Cocktail Reception at Sea</option>
                  <option value="Offshore Corporate Summit &amp; Executive Dinner">Offshore Corporate Summit &amp; Executive Dinner</option>
                  <option value="Multi-Day Island Hopping &amp; Deep-Sea Voyage">Multi-Day Island Hopping &amp; Deep-Sea Voyage</option>
                  <option value="Monaco / Cannes Film Festival VIP Berthage">Monaco / Cannes Film Festival VIP Berthage</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                  Embarkation Marina / Jetty
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-[#9D7B3E]" />
                  <input
                    type="text"
                    required
                    value={formData.embarkationPort}
                    onChange={(e) => setFormData({ ...formData, embarkationPort: e.target.value })}
                    placeholder="e.g. Goa Mandovi, Mumbai Apollo Bunder, Monaco Port Hercule"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                  Charter Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                >
                  <option value="Half-Day Sunset Cruise (4 Hours)">Half-Day Sunset Cruise (4 Hours)</option>
                  <option value="Full Day Charter (8 Hours)">Full Day Charter (8 Hours)</option>
                  <option value="Weekend Charter (2 Days / 1 Night)">Weekend Charter (2 Days / 1 Night)</option>
                  <option value="Weekly Voyage (7 Days)">Weekly Voyage (7 Days)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                  Charter Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.charterDate}
                  onChange={(e) => setFormData({ ...formData, charterDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                  Number of Guests
                </label>
                <input
                  type="number"
                  min="2"
                  max="200"
                  value={formData.guestsCount}
                  onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[#D8D3C8]/70">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#061C16] font-semibold block mb-3">
                Principal &amp; Host Details
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Principal or Event Host Name *"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                />
                <input
                  type="text"
                  placeholder="Company / Family Office / Event Planner"
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

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#080B09]/70 font-medium mb-1.5">
                Catering, DJ, Water Toys &amp; Protocol Notes
              </label>
              <textarea
                rows={2}
                value={formData.specialRequirements}
                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                placeholder="Live sushi chef, specific champagne labels, sound equipment, tender transfers from shore, fireworks display permit, etc."
                className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-[10px] text-[#080B09]/60">
                <Shield className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>MYBA Compliant Standard &middot; Vetted Crew &amp; Captain</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>SUBMIT YACHT CHARTER MANDATE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
