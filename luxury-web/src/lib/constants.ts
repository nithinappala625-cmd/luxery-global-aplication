import { LuxuryCategory, LuxuryListing, LuxuryAuction, MembershipPlan } from '@/types';

export const ALL_CATEGORIES: LuxuryCategory[] = [
  {
    id: 'c1000000-0000-0000-0000-000000000004',
    slug: 'marine',
    name: 'Marine',
    tagline: 'Yachts &middot; Superyachts &middot; Luxury Vessels',
    icon_name: 'Ship',
    banner_url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=1200&auto=format&fit=crop',
    sort_order: 1,
    is_active: true,
    asset_types: [
      'Yachts & Superyachts', 'Luxury Boats', 'Sailing Yachts', 'Commercial Vessels',
      'Ships (Cargo/Expedition)', 'Marina & Berthing', 'Refit & Maintenance', 'Yacht Services'
    ],
    listing_types: ['For Sale', 'For Charter', 'Pre-Owned', 'Crew & Management', 'New Builds', 'Yacht Clubs & Memberships']
  },
  {
    id: 'c1000000-0000-0000-0000-000000000005',
    slug: 'aviation',
    name: 'Aviation',
    tagline: 'Private Jets &middot; Helicopters &middot; Global Charters',
    icon_name: 'Plane',
    banner_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
    sort_order: 2,
    is_active: true,
    asset_types: [
      'Private Jets', 'Helicopters', 'Air Boats', 'Jet Charter',
      'Helicopter Charter', 'Empty Leg Flights', 'Jet Membership', 'Fractional Ownership'
    ],
    listing_types: ['Aircraft for Sale', 'Aircraft Management', 'Repairs & MRO', 'Fuel & Handling']
  },
  {
    id: 'c1000000-0000-0000-0000-000000000006',
    slug: 'real-estate',
    name: 'Real Estate',
    tagline: 'Private Islands &middot; Luxury Villas &middot; Estates',
    icon_name: 'Building2',
    banner_url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop',
    sort_order: 3,
    is_active: true,
    asset_types: [
      'Private Islands', 'Luxury Villas', 'Estates & Mansions', 'Commercial Properties',
      'Resorts & Hotels', 'Land & Development', 'Investment Properties', 'Property Management'
    ],
    listing_types: ['For Sale', 'For Rent', 'Island Resorts', 'Development Projects', 'Beachfront', 'Mountain Retreats', 'Commercial (Hospitality)', 'Global Locations']
  },
  {
    id: 'c1000000-0000-0000-0000-000000000002',
    slug: 'jewellery',
    name: 'Jewellery & Diamonds',
    tagline: 'Rare Gemstones &middot; Haute Joaillerie &middot; Bespoke',
    icon_name: 'Gem',
    banner_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
    sort_order: 4,
    is_active: true,
    asset_types: [
      'Diamonds', 'Fine Jewellery', 'Rare Gemstones', 'Loose Diamonds',
      'Vintage & Antique', 'Custom Design'
    ],
    listing_types: ['Engagement Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Watches (Jewellery Style)', 'Certified Diamonds', 'Bespoke Pieces', 'Investment Grade']
  },
  {
    id: 'c1000000-0000-0000-0000-000000000001',
    slug: 'watches',
    name: 'Watches',
    tagline: 'Haute Horlogerie &middot; Rare Vintage &middot; Collectible',
    icon_name: 'Watch',
    banner_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    sort_order: 5,
    is_active: true,
    asset_types: [
      'Patek Philippe', 'Audemars Piguet', 'Rolex', 'Richard Mille',
      'Vacheron Constantin', 'F.P. Journe', 'A. Lange & Söhne', 'Independent Masterpieces'
    ],
    listing_types: ['For Sale', 'Pre-Owned Certified', 'Rare & Collectible', 'Auction Lots', 'Grand Complications', 'Tourbillons']
  },
  {
    id: 'c1000000-0000-0000-0000-000000000003',
    slug: 'cars',
    name: 'Automotive',
    tagline: 'Supercars &middot; Racing Exotics &middot; Heritage Classics',
    icon_name: 'Car',
    banner_url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
    sort_order: 6,
    is_active: true,
    asset_types: [
      'Racing Exotics', 'Hypercars', 'Supercars', 'Vintage Classics',
      'Luxury Limousines', 'Bespoke Builds', 'Restoration & Preservation', 'Customization'
    ],
    listing_types: ['For Sale', 'For Rent / Track', 'Certified Pre-Owned', 'Chauffeur Services', 'Car Clubs', 'Live Concours Auction']
  },
  {
    id: 'c1000000-0000-0000-0000-000000000007',
    slug: 'private-islands',
    name: 'Private Islands',
    tagline: 'Sovereign Archipelagos &middot; Pristine Atolls',
    icon_name: 'Palmtree',
    banner_url: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=1200&auto=format&fit=crop',
    sort_order: 7,
    is_active: true,
    asset_types: [
      'Islands for Sale', 'Islands for Rent', 'Island Resorts', 'Development Land',
      'Eco & Sustainable Islands', 'Investment Opportunities', 'Island Management', 'Commercial Development'
    ],
    listing_types: ['Exclusive Sovereign Use', 'Development Ready', 'Helipad & Marina Ready', 'Private Runway Access']
  },
  {
    id: 'c1000000-0000-0000-0000-000000000008',
    slug: 'sports-experiences',
    name: 'Sports & Elite Experiences',
    tagline: 'Golf &middot; Polo &middot; Formula Racing &middot; Equestrian',
    icon_name: 'Trophy',
    banner_url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1200&auto=format&fit=crop',
    sort_order: 8,
    is_active: true,
    asset_types: [
      'Golf Clubs & Memberships', 'Equestrian & Thorough-breds', 'Polo Clubs & Ponies', 'Horse Racing Syndicates',
      'Grand Prix Track Access', 'Sailing & Regatta Entries', 'Skiing & Alpine Heli-tours', 'Private Tournaments'
    ],
    listing_types: ['Private VIP Tournaments', 'Elite Memberships', 'Sports Syndicate Shares', 'Bespoke Hospitality']
  },
  {
    id: 'c1000000-0000-0000-0000-000000000009',
    slug: 'travel-experiences',
    name: 'Travel & Experiences',
    tagline: 'VIP Expeditions &middot; Ultra Concierge &middot; Global Access',
    icon_name: 'Compass',
    banner_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    sort_order: 9,
    is_active: true,
    asset_types: [
      'Private Jet World Tours', 'Helicopter Sightseeing', 'Ultra-Luxury Private Resorts', 'Sub-Orbital Space Flights',
      'Antarctic Expeditions', 'Red Carpet VIP Gala Access', 'Bespoke 24/7 Concierge', 'Destination Management'
    ],
    listing_types: ['Book Private Itinerary', 'Connect with Lifestyle Manager', 'Gift Ultra-Luxury Experience', 'Custom Portfolio Booking']
  },
  {
    id: 'c1000000-0000-0000-0000-000000000010',
    slug: 'digital-financial',
    name: 'Digital & Financial Services',
    tagline: 'Private Banking &middot; Escrow &middot; Wealth Advisory',
    icon_name: 'ShieldCheck',
    banner_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop',
    sort_order: 10,
    is_active: true,
    asset_types: [
      'Ultra-Secure Multi-Sig Wallets', 'Swiss Private Banking Direct', 'Cross-Border Wealth Preservation',
      'Art & Asset Title Insurance', 'International Tax Structuring', 'Digital Asset Custody', 'Collateral Asset Loans'
    ],
    listing_types: ['Private Advisory Consult', 'Escrow Account Setup', 'Institutional Custody', 'Family Office Solutions']
  },
  {
    id: 'c1000000-0000-0000-0000-000000000011',
    slug: 'locker-storage',
    name: 'Locker & Storage',
    tagline: 'Armored Vaults &middot; Climate Reserves &middot; High Security',
    icon_name: 'Lock',
    banner_url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1200&auto=format&fit=crop',
    sort_order: 11,
    is_active: true,
    asset_types: [
      'Class 5 Armored Vaults', 'Jewellery & Bullion Safes', 'Rare Wine & Spirit Cellars', 'Fine Art Freeports',
      'Secure Airport Transit Lockers', 'Climate-Controlled Exotic Car Garages', 'Encrypted Biometric Data Vaults'
    ],
    listing_types: ['Book Private Vault', 'Short & Long-term Lease', "Full Underwritten Lloyd's Insurance", 'Global Freeport Transit']
  }
];

export const FEATURED_LISTINGS: LuxuryListing[] = [
  {
    id: 'l1000000-0000-0000-0000-000000000005',
    seller_id: '00000000-0000-0000-0000-000000000001',
    category_id: 'c1000000-0000-0000-0000-000000000005',
    category_name: 'Aviation',
    title: 'Gulfstream G700 Ultra-Long Range Flagship',
    slug: 'gulfstream-g700-ultra-long-range',
    description: 'The pinnacle of business aviation. Features 5 living zones, master suite with standing shower, circadian lighting, and Mach 0.90 cruise speed.',
    price: 75000000,
    currency: 'USD',
    year: 2024,
    condition: 'Factory Delivery Hours / Brand New',
    status: 'verified',
    is_featured: true,
    view_count: 8420,
    contact_unlock_fee: 500,
    location: { city: 'Savannah / Geneva', country: 'Switzerland', country_code: 'CH' },
    images: [
      { id: 'av-1', original_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop', is_cover: true },
      { id: 'av-2', original_url: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=1200&auto=format&fit=crop', is_cover: false }
    ],
    specifications: [
      { spec_key: 'Maximum Range', spec_value: '7,750 nm (14,353 km)', spec_group: 'Performance' },
      { spec_key: 'Passenger Capacity', spec_value: 'Up to 19 Passengers (Sleeps 13)', spec_group: 'Cabin' },
      { spec_key: 'Engines', spec_value: '2x Rolls-Royce Pearl 700', spec_group: 'Avionics & Power' },
      { spec_key: 'Cruising Altitude', spec_value: '51,000 ft', spec_group: 'Performance' }
    ],
    seller: {
      id: '00000000-0000-0000-0000-000000000001',
      business_name: 'NP GROUPS Private Aviation Division',
      seller_type: 'authorized_dealer',
      location_city: 'Geneva',
      location_country: 'Switzerland',
      reputation_score: 5.0,
      is_verified: true
    },
    created_at: new Date('2026-03-15').toISOString()
  },
  {
    id: 'l1000000-0000-0000-0000-000000000001',
    seller_id: '00000000-0000-0000-0000-000000000001',
    category_id: 'c1000000-0000-0000-0000-000000000004',
    category_name: 'Marine',
    title: 'Ferretti 920 Maxi Flybridge Superyacht',
    slug: 'ferretti-920-monaco',
    description: 'Striking 92-foot Italian design with panoramic master stateroom on main deck, wide-body hull, beach club transom, and zero-speed fin stabilizers.',
    price: 4200000,
    currency: 'EUR',
    year: 2022,
    condition: 'Turnkey Luxury Condition',
    status: 'verified',
    is_featured: true,
    view_count: 5120,
    contact_unlock_fee: 350,
    location: { city: 'Monaco', country: 'Monaco', country_code: 'MC' },
    images: [
      { id: 'mar-1', original_url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=1200&auto=format&fit=crop', is_cover: true },
      { id: 'mar-2', original_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop', is_cover: false }
    ],
    specifications: [
      { spec_key: 'Length Overall', spec_value: '28.49 m (93 ft 6 in)', spec_group: 'Dimensions' },
      { spec_key: 'Guests / Cabins', spec_value: '10 Guests / 5 Ensuite Suites', spec_group: 'Accommodation' },
      { spec_key: 'Engines', spec_value: '2x MTU 16V 2000 M96L (2638 mhp)', spec_group: 'Mechanical' },
      { spec_key: 'Cruising Speed', spec_value: '26 Knots', spec_group: 'Performance' }
    ],
    seller: {
      id: '00000000-0000-0000-0000-000000000001',
      business_name: 'Monaco Heritage Yacht Salons',
      seller_type: 'boutique_dealer',
      location_city: 'Monaco',
      location_country: 'Monaco',
      reputation_score: 4.98,
      is_verified: true
    },
    created_at: new Date('2026-03-10').toISOString()
  },
  {
    id: 'l1000000-0000-0000-0000-000000000007',
    seller_id: '00000000-0000-0000-0000-000000000001',
    category_id: 'c1000000-0000-0000-0000-000000000007',
    category_name: 'Private Islands',
    title: 'Emerald Sanctuary Sovereign Atoll',
    slug: 'emerald-sanctuary-atoll-maldives',
    description: 'Freehold 18-acre private island in North Malé Atoll with completed 8-villa overwater compound, private deep-water superyacht jetty, helipad, and solar micro-grid.',
    price: 32000000,
    currency: 'USD',
    year: 2023,
    condition: 'Newly Developed Sovereign Sanctuary',
    status: 'verified',
    is_featured: true,
    view_count: 9810,
    contact_unlock_fee: 500,
    location: { city: 'North Malé Atoll', country: 'Maldives', country_code: 'MV' },
    images: [
      { id: 'isl-1', original_url: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=1200&auto=format&fit=crop', is_cover: true }
    ],
    specifications: [
      { spec_key: 'Total Land Area', spec_value: '18.4 Acres (7.45 Hectares)', spec_group: 'Property' },
      { spec_key: 'Villas', spec_value: '8 Overwater & 4 Beachfront Residences', spec_group: 'Infrastructure' },
      { spec_key: 'Berthing', spec_value: 'Up to 60m Superyacht Draft', spec_group: 'Marine' },
      { spec_key: 'Air Access', spec_value: 'ICAO Certified Helipad', spec_group: 'Aviation' }
    ],
    seller: {
      id: '00000000-0000-0000-0000-000000000001',
      business_name: 'NP GROUPS Sovereign Land Advisory',
      seller_type: 'authorized_dealer',
      location_city: 'London & Dubai',
      location_country: 'UK',
      reputation_score: 5.0,
      is_verified: true
    },
    created_at: new Date('2026-03-01').toISOString()
  },
  {
    id: 'l1000000-0000-0000-0000-000000000002',
    seller_id: '00000000-0000-0000-0000-000000000001',
    category_id: 'c1000000-0000-0000-0000-000000000001',
    category_name: 'Watches',
    title: 'Patek Philippe 5270P Perpetual Calendar Chronograph',
    slug: 'patek-philippe-5270p-salmon-dial',
    description: 'Reference 5270P in 950 Platinum with iconic Golden Opaline Salmon dial. Features caliber CH 29-535 PS Q with perpetual calendar, moon phases, and chronograph.',
    price: 38000000,
    currency: 'INR',
    year: 2023,
    condition: 'Unworn / Double Sealed Full Set',
    status: 'verified',
    is_featured: true,
    view_count: 6310,
    contact_unlock_fee: 200,
    location: { city: 'Geneva / Mumbai', country: 'Switzerland', country_code: 'CH' },
    images: [
      { id: 'wt-1', original_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop', is_cover: true }
    ],
    specifications: [
      { spec_key: 'Case Material', spec_value: 'Solid 950 Platinum', spec_group: 'Case' },
      { spec_key: 'Dial Color', spec_value: 'Golden Opaline Salmon', spec_group: 'Dial' },
      { spec_key: 'Movement', spec_value: 'Manual Caliber CH 29-535 PS Q', spec_group: 'Calibre' },
      { spec_key: 'Diameter', spec_value: '41 mm', spec_group: 'Case' }
    ],
    seller: {
      id: '00000000-0000-0000-0000-000000000001',
      business_name: 'Maison Horlogère Genève',
      seller_type: 'authorized_dealer',
      location_city: 'Geneva',
      location_country: 'Switzerland',
      reputation_score: 5.0,
      is_verified: true
    },
    created_at: new Date('2026-03-05').toISOString()
  },
  {
    id: 'l1000000-0000-0000-0000-000000000003',
    seller_id: '00000000-0000-0000-0000-000000000001',
    category_id: 'c1000000-0000-0000-0000-000000000003',
    category_name: 'Automotive',
    title: 'Ferrari SF90 Stradale Assetto Fiorano',
    slug: 'ferrari-sf90-assetto-fiorano',
    description: 'Factory Assetto Fiorano lightweight package in historic Grigio Ferro with Giallo Modena livery. 1,000 cv hybrid powertrain with carbon fiber wheels and Michelin Cup 2R tires.',
    price: 85000000,
    currency: 'INR',
    year: 2023,
    condition: 'Collector Grade / 890 km Only',
    status: 'verified',
    is_featured: true,
    view_count: 7200,
    contact_unlock_fee: 250,
    location: { city: 'Dubai / London', country: 'United Arab Emirates', country_code: 'AE' },
    images: [
      { id: 'car-1', original_url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop', is_cover: true }
    ],
    specifications: [
      { spec_key: 'Engine', spec_value: '4.0L Twin-Turbo V8 + 3 Electric Motors', spec_group: 'Powertrain' },
      { spec_key: 'Total Output', spec_value: '1,000 cv (986 bhp)', spec_group: 'Performance' },
      { spec_key: '0-100 km/h', spec_value: '2.5 Seconds', spec_group: 'Performance' },
      { spec_key: 'Top Speed', spec_value: '340 km/h (211 mph)', spec_group: 'Performance' }
    ],
    seller: {
      id: '00000000-0000-0000-0000-000000000001',
      business_name: 'Emirates Private Vault & Supercars',
      seller_type: 'boutique_dealer',
      location_city: 'Dubai',
      location_country: 'UAE',
      reputation_score: 4.96,
      is_verified: true
    },
    created_at: new Date('2026-03-08').toISOString()
  },
  {
    id: 'l1000000-0000-0000-0000-000000000004',
    seller_id: '00000000-0000-0000-0000-000000000001',
    category_id: 'c1000000-0000-0000-0000-000000000002',
    category_name: 'Jewellery & Diamonds',
    title: 'Graff 10.50ct Fancy Vivid Yellow Diamond Solitaire',
    slug: 'graff-10ct-vivid-yellow-diamond',
    description: 'Certified GIA VS1 center stone of peerless golden brilliance, flanked by tapered baguette diamond shoulders mounted in 18k yellow gold and platinum.',
    price: 110000000,
    currency: 'INR',
    year: 2022,
    condition: 'Mint / Original Graff Presentation Dossier',
    status: 'verified',
    is_featured: true,
    view_count: 4890,
    contact_unlock_fee: 300,
    location: { city: 'Mayfair, London', country: 'United Kingdom', country_code: 'GB' },
    images: [
      { id: 'jwl-1', original_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop', is_cover: true }
    ],
    specifications: [
      { spec_key: 'Center Stone', spec_value: '10.50 Carats Natural Diamond', spec_group: 'Gemology' },
      { spec_key: 'Color Grade', spec_value: 'Fancy Vivid Yellow', spec_group: 'Gemology' },
      { spec_key: 'Clarity Grade', spec_value: 'VS1 (GIA Certified)', spec_group: 'Gemology' },
      { spec_key: 'Metal', spec_value: '18k Yellow Gold & 950 Platinum', spec_group: 'Mounting' }
    ],
    seller: {
      id: '00000000-0000-0000-0000-000000000001',
      business_name: 'Mayfair High Jewellery Vaults',
      seller_type: 'authorized_dealer',
      location_city: 'London',
      location_country: 'UK',
      reputation_score: 4.99,
      is_verified: true
    },
    created_at: new Date('2026-03-02').toISOString()
  }
];

export const LIVE_AUCTIONS: LuxuryAuction[] = [
  {
    id: 'auc-01',
    title: "Christie's Geneva Spring Magnificent Jewels & Rare Horology",
    slug: 'christies-geneva-spring-magnificent-jewels',
    auction_house_name: "Christie's",
    auction_house_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Christie%27s_logo.svg/800px-Christie%27s_logo.svg.png',
    category_name: 'Watches & Jewellery',
    start_time: new Date().toISOString(),
    end_time: new Date(Date.now() + 86400000 * 2.5).toISOString(),
    status: 'live',
    total_lots_count: 148,
    banner_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    featured_lot_title: 'Patek Philippe Ref 5270P Perpetual Calendar Chronograph',
    featured_lot_estimate: 'CHF 180,000 - 240,000',
    current_bid: 210000,
    currency: 'CHF',
    location: 'Four Seasons Hotel des Bergues, Geneva'
  },
  {
    id: 'auc-02',
    title: "RM Sotheby's Monaco Concours Historique Sale",
    slug: 'rm-sothebys-monaco-concours',
    auction_house_name: "RM Sotheby's",
    auction_house_logo: 'https://rmsothebys.com/assets/images/logo.svg',
    category_name: 'Automotive & Racing',
    start_time: new Date(Date.now() + 86400000 * 4).toISOString(),
    end_time: new Date(Date.now() + 86400000 * 6).toISOString(),
    status: 'upcoming',
    total_lots_count: 62,
    banner_url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
    featured_lot_title: '1962 Ferrari 250 GTO Scaglietti Berlinetta',
    featured_lot_estimate: 'Estimate Upon Request (€45,000,000+)',
    currency: 'EUR',
    location: 'Le Sporting Monte-Carlo, Monaco'
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'mem-silver',
    name: 'Silver Tier',
    tier: 'silver',
    tagline: 'THE ENTRY INTO THE LUXURY ECOSYSTEM',
    price_annual: 99000,
    currency: 'INR',
    features: [
      'Full access to all 11 global luxury verticals',
      'Verified Buyer status & encrypted direct messaging',
      '3 complimentary verified seller contact reveals per year',
      'Priority alerts on newly cataloged assets',
      '24/7 dedicated email concierge'
    ]
  },
  {
    id: 'mem-gold',
    name: 'Gold Tier',
    tier: 'gold',
    tagline: 'THE ELITE CIRCLE OF COLLECTORS & INVESTORS',
    price_annual: 499000,
    currency: 'INR',
    is_popular: true,
    features: [
      'Everything in Silver Tier included',
      'Exclusive access to Off-Market & Private Treaty sales',
      '15 verified seller contact unlocks per year',
      'Live auction bidding rights & provenance dossiers',
      'Dedicated Private Client Relationship Director',
      'Invitations to NP GROUPS Monaco, London & Dubai VIP salons'
    ]
  },
  {
    id: 'mem-platinum',
    name: 'Platinum Legacy',
    tier: 'platinum',
    tagline: 'SOVEREIGN PRIVILEGE & BOARD-LEVEL ACCESS',
    price_annual: 2499000,
    currency: 'INR',
    features: [
      'Everything in Gold Tier included',
      'Unlimited verified seller contact unlocks across all assets',
      'Direct escrow structuring & Swiss banking introduction',
      'Complimentary 50 hours of private jet charter credits',
      'Guaranteed allocations on rare hypercar & haute horlogerie drops',
      'Bespoke board-level wealth and asset protection consultation'
    ]
  }
];
