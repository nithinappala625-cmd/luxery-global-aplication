import { Shield, Building2, Anchor, Plane, Landmark, Sparkles, UserCheck, Briefcase } from 'lucide-react';

interface ParticipantType {
  title: string;
  role: string;
  description: string;
  credentials: string;
  icon: any;
}

const participants: ParticipantType[] = [
  {
    title: 'Asset Owners',
    role: 'Confidential Disposals & Collection Stewardship',
    description: 'Private individuals and family principals seeking discreet placement of significant assets without public dissipation of value.',
    credentials: 'Beneficial ownership verified & identity authenticated.',
    icon: Shield,
  },
  {
    title: 'Certified Dealers',
    role: 'Curated Institutional Inventory Distribution',
    description: 'Premier heritage dealerships syndicating rare inventory directly to vetted international family offices and collectors.',
    credentials: 'Verified commercial registry & trade association standing.',
    icon: Building2,
  },
  {
    title: 'Chartered Brokers',
    role: 'Bilateral Co-Brokerage & Mandate Execution',
    description: 'Elite maritime, aviation, and prime real estate brokers accessing off-market buyers under strict commission protection.',
    credentials: 'Active professional licensure & transactional record.',
    icon: Briefcase,
  },
  {
    title: 'Aviation Operators',
    role: 'AOC Charter Fleet Distribution & Empty Legs',
    description: 'Certified Part 135 / Part 121 and European AOC operators optimizing fleet utilization and long-range charter dispatch.',
    credentials: 'Valid Air Operator Certificate & safety audit ratings.',
    icon: Plane,
  },
  {
    title: 'Auction Houses',
    role: 'Private Treaty Syndication & Timed Lots',
    description: 'Co-curated private sales and specialized consignment auctions in partnership with leading global appraisal houses.',
    credentials: 'Established provenance cataloguing & cataloguer standards.',
    icon: Landmark,
  },
  {
    title: 'Luxury Houses',
    role: 'Bespoke Atelier Commissions & Allocations',
    description: 'Independent horological ateliers, bespoke coachbuilders, and high jewellery maisons presenting allocation pieces.',
    credentials: 'Manufacture verification & master artisan credentialing.',
    icon: Sparkles,
  },
  {
    title: 'Private Offices',
    role: 'Direct Buy-Side Execution & Family Trusts',
    description: 'Single and multi-family offices executing targeted acquisitions, corporate divestments, and sovereign land concessions.',
    credentials: 'Fiduciary registration & compliance attestation.',
    icon: UserCheck,
  },
  {
    title: 'Concierge Partners',
    role: 'Sovereign Hospitality & Security Logistics',
    description: 'Specialist service providers managing diplomatic transport, armoured logistics, private island logistics, and secure yacht berths.',
    credentials: 'Vetted operational security and global liaison capability.',
    icon: Anchor,
  },
];

export default function NetworkSection() {
  return (
    <section id="network" className="relative bg-[#F6F3EA] text-[#080B09] py-28 lg:py-36 border-b border-[#D8D3C8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-[#D8D3C8] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D7B3E] font-medium mb-3">
              <span className="w-1.5 h-1.5 bg-[#C6A15B] rotate-45" />
              <span>ECOSYSTEM</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#061C16]">
              THE NETWORK
            </h2>
            <p className="font-serif text-lg sm:text-xl text-[#080B09]/70 font-light italic mt-2">
              Connecting established participants across international markets.
            </p>
          </div>

          <div className="text-xs text-[#080B09]/70 font-light max-w-md leading-relaxed">
            NP GROUPS provides institutional connective infrastructure between qualified supply and discreet capital. Zero open listings. Zero unauthorized syndication.
          </div>
        </div>

        {/* Participant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {participants.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#FCFBF7] border border-[#D8D3C8] p-6 sm:p-7 flex flex-col justify-between hover:border-[#061C16] hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 border border-[#D8D3C8] bg-white flex items-center justify-center text-[#061C16]">
                    <Icon className="w-4 h-4 text-[#9D7B3E]" />
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-light text-[#061C16]">
                      {item.title}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#9D7B3E] font-medium mt-1">
                      {item.role}
                    </p>
                  </div>

                  <p className="text-xs text-[#080B09]/70 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#D8D3C8]/60 text-[10px] text-[#061C16]/60 font-light italic">
                  {item.credentials}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
