export default function AcquisitionProtocol() {
  const steps = [
    {
      number: '01',
      title: 'DISCOVER',
      subtitle: 'Identify Exceptional Assets & Placements',
      description: 'Explore curated public lots or engage our private office for off-market asset search mandates across physical assets, fine instruments, and sovereign opportunities.',
      protocol: 'Pre-vetted lot catalogue & tailored search briefs.',
    },
    {
      number: '02',
      title: 'VERIFY',
      subtitle: 'Review Technical Dossiers & Provenance',
      description: 'Inspect preliminary specifications, condition reports, ownership histories, and registry documentation made available under confidential privilege.',
      protocol: 'Identity credentials & preliminary capability review.',
    },
    {
      number: '03',
      title: 'CONNECT',
      subtitle: 'Execute Bilateral Non-Disclosure Protocol',
      description: 'Connect directly with the asset owner, certified dealer, or family office trustee under bilateral confidentiality safeguards, facilitated by NP GROUPS.',
      protocol: 'Bilateral NDA & direct principal introduction.',
    },
    {
      number: '04',
      title: 'APPRAISE',
      subtitle: 'Independent Survey & Physical Inspection',
      description: 'Coordinate physical viewings, aviation pre-purchase inspections (PPI), maritime marine surveys, or horological authentication at private freeports.',
      protocol: 'Certified maritime/aviation surveyor verification.',
    },
    {
      number: '05',
      title: 'ACQUIRE',
      subtitle: 'Institutional Escrow & Title Settlement',
      description: 'Proceed through neutral Swiss or UK escrow facilities, managing cross-border currency settlement, title conveyancing, and white-glove transport logistics.',
      protocol: 'Institutional escrow settlement & sovereign registry transfer.',
    },
  ];

  return (
    <section id="protocol" className="relative bg-[#FCFBF7] text-[#080B09] py-28 lg:py-36 border-b border-[#D8D3C8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-[#D8D3C8] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D7B3E] font-medium mb-3">
              <span className="w-1.5 h-1.5 bg-[#C6A15B] rotate-45" />
              <span>THE PROCESS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#061C16]">
              ACQUISITION PROTOCOL
            </h2>
            <p className="font-serif text-lg sm:text-xl text-[#9D7B3E] font-light italic mt-2">
              DISCOVER &middot; VERIFY &middot; CONNECT &middot; ACQUIRE
            </p>
          </div>

          <div className="text-xs text-[#080B09]/70 font-light max-w-md leading-relaxed">
            NP GROUPS facilitates qualified connections and transaction structuring between independent principals, certified operators, and global dealers.
          </div>
        </div>

        {/* 5 Stages with Large Numbers and Thin Gold Hairlines */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pt-16">
          {steps.map((step, idx) => (
            <div key={step.number} className="relative flex flex-col justify-between space-y-6">
              {/* Thin Gold Line indicator */}
              <div className="relative">
                <div className="h-[1px] bg-[#C6A15B]/30 w-full mb-6" />
                <span className="font-serif text-4xl sm:text-5xl font-light text-[#C6A15B] block">
                  {step.number}
                </span>
              </div>

              <div className="space-y-3 flex-grow">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-[#061C16] tracking-wide">
                  {step.title}
                </h3>
                <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#9D7B3E] font-medium leading-snug">
                  {step.subtitle}
                </h4>
                <p className="text-xs text-[#080B09]/70 font-light leading-relaxed pt-1">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8D3C8]/50 text-[10px] uppercase tracking-[0.15em] text-[#080B09]/50">
                {step.protocol}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
