'use client';

import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import { Plane, Anchor, Palmtree, Home, Key, Compass, Shield } from 'lucide-react';

interface ConciergeService {
  title: string;
  scope: string;
  details: string;
  icon: any;
}

const services: ConciergeService[] = [
  {
    title: 'Private Aviation Charter',
    scope: 'On-demand heavy jet charter, global positioning, and empty leg monetization.',
    details: 'Global ultra-long-range fleet with dedicated flight operational desk.',
    icon: Plane,
  },
  {
    title: 'Yacht Charter & Berthage',
    scope: 'Seasonal charter itineraries and guaranteed superyacht berths in prime Mediterranean marinas.',
    details: 'Monaco Grand Prix, Cannes Film Festival, and Saint-Barthélemy New Year berthing.',
    icon: Anchor,
  },
  {
    title: 'Luxury Travel & Island Buyouts',
    scope: 'Private sovereign island takeovers, remote eco-sanctuaries, and bespoke polar expeditions.',
    details: 'Uncompromising privacy and personalized estate provisioning.',
    icon: Palmtree,
  },
  {
    title: 'Private Residences Provisioning',
    scope: 'Short and medium-term acquisition retreats in prime capitals and alpine destinations.',
    details: 'Discreet tenancy agreements and full household staffing.',
    icon: Home,
  },
  {
    title: 'Acquisition Assistance',
    scope: 'Independent maritime surveyors, aviation pre-purchase inspections, and import tax counsel.',
    details: 'End-to-end guidance from preliminary evaluation to flag registration.',
    icon: Key,
  },
  {
    title: 'Specialist Vaulting & Transport',
    scope: 'Armoured bullion transport, museum-grade fine art courier, and duty-free freeport vaulting.',
    details: 'Direct custody partnerships in Geneva, Zurich, and Singapore.',
    icon: Shield,
  },
];

export default function ConciergeSection() {
  const { openEnquiry } = useLuxuryUI();

  return (
    <section id="concierge" className="relative bg-[#FCFBF7] text-[#080B09] py-28 lg:py-36 border-b border-[#D8D3C8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-[#D8D3C8] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D7B3E] font-medium mb-3">
              <span className="w-1.5 h-1.5 bg-[#C6A15B] rotate-45" />
              <span>BESPOKE SERVICES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#061C16]">
              BEYOND THE ASSET.
            </h2>
            <p className="font-serif text-lg sm:text-xl text-[#080B09]/70 font-light italic mt-2">
              Bespoke Operational, Maritime &amp; Aviation Facilitation.
            </p>
          </div>

          <div>
            <button
              onClick={() =>
                openEnquiry({
                  title: 'Request Concierge Assistance',
                  subtitle: 'Our private office desk will coordinate your bespoke requirements.',
                  defaultVertical: 'Travel & Experiences',
                })
              }
              className="px-8 py-3.5 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all shadow-md"
            >
              REQUEST ASSISTANCE
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="bg-white border border-[#D8D3C8] p-8 flex flex-col justify-between space-y-6 hover:border-[#061C16] hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 border border-[#D8D3C8] bg-[#F6F3EA] flex items-center justify-center text-[#061C16]">
                    <Icon className="w-4 h-4 text-[#9D7B3E]" />
                  </div>

                  <h3 className="font-serif text-2xl font-light text-[#061C16]">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-[#080B09]/70 font-light leading-relaxed">
                    {svc.scope}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D8D3C8]/60 text-[10px] uppercase tracking-[0.15em] text-[#9D7B3E]">
                  {svc.details}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
