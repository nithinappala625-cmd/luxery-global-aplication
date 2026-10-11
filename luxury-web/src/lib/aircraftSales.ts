import { supabase } from '@/lib/supabase';

export interface SalesAircraftListing {
  id: string;
  name: string;
  registrationNumber: string;
  country: string;
  countryFlag: string;
  ownerNameOrType: string;
  category: 'Ultra Long Range' | 'Heavy Jet' | 'Super Midsize' | 'Midsize' | 'Light Jet' | 'Turboprop' | 'VIP Helicopter';
  year: number;
  totalTimeHours: number;
  engineProgram: string;
  avionics: string;
  seatingCapacity: number;
  rangeNM: number;
  speedMach: string;
  quotedPriceUSD: number;
  quotedPriceINR: string;
  baseAirport: string;
  status: 'Available' | 'Under Escrow' | 'Off-Market Exclusive';
  imageUrl: string;
  description: string;
  exteriorCondition: string;
  interiorSpec: string;
  verified: boolean;
}

export const INITIAL_SALES_INVENTORY: SalesAircraftListing[] = [
  {
    id: 'G700-01',
    name: 'Gulfstream G700 Flagship',
    registrationNumber: 'N700ED',
    country: 'United Kingdom / Dubai',
    countryFlag: '🇬🇧',
    ownerNameOrType: 'Single Principal Private Family Office',
    category: 'Ultra Long Range',
    year: 2024,
    totalTimeHours: 195,
    engineProgram: 'Rolls-Royce CorporateCare Enhanced (100% Paid)',
    avionics: 'Symmetry Flight Deck with Active Control Sidesticks',
    seatingCapacity: 19,
    rangeNM: 7750,
    speedMach: 'Mach 0.925',
    quotedPriceUSD: 74500000,
    quotedPriceINR: '₹625.8 Crores',
    baseAirport: 'Farnborough (EGLF) / Dubai (DWC)',
    status: 'Available',
    imageUrl: '/g700_flagship.jpg',
    description: 'Factory delivery 2024. Master stateroom suite with permanent bed, en-suite stand-up shower, circadian LED lighting, and dual Ka-band Jet ConneX satellite Wi-Fi.',
    exteriorCondition: '10/10 Factory Paint — Oyster Pearl with Heritage Green and Champagne Gold stripe',
    interiorSpec: 'Bespoke Hermès leather club seats, handcrafted Macassar ebony cabinetry, stone flooring in galley',
    verified: true,
  },
  {
    id: 'GLOBAL-7500-02',
    name: 'Bombardier Global 7500',
    registrationNumber: 'VT-BMR',
    country: 'India',
    countryFlag: '🇮🇳',
    ownerNameOrType: 'Tier-1 Industrial Conglomerate Chairman',
    category: 'Ultra Long Range',
    year: 2023,
    totalTimeHours: 340,
    engineProgram: 'GE Passport OnPoint Solutions',
    avionics: 'Bombardier Vision Flight Deck (Rockwell Collins Pro Line Fusion)',
    seatingCapacity: 17,
    rangeNM: 7700,
    speedMach: 'Mach 0.925',
    quotedPriceUSD: 67900000,
    quotedPriceINR: '₹570.3 Crores',
    baseAirport: 'Mumbai Chhatrapati Shivaji (VABB) / Geneva (LSGG)',
    status: 'Off-Market Exclusive',
    imageUrl: '/empty_leg.jpg',
    description: 'Four distinct living zones featuring Nuage zero-gravity ergonomic club suites, private conference dining suite, and dedicated crew rest stateroom. Non-stop Mumbai to New York capability.',
    exteriorCondition: '10/10 Mint — Metallic Royal Emerald with Gold accents',
    interiorSpec: 'Cashmere-wool carpets, bespoke dining credenza with Baccarat crystal glassware stowage',
    verified: true,
  },
  {
    id: 'FALCON-7X-03',
    name: 'Dassault Falcon 7X',
    registrationNumber: 'A6-FAL',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    ownerNameOrType: 'Royal Private Flight Wing (Managed Escrow)',
    category: 'Heavy Jet',
    year: 2021,
    totalTimeHours: 890,
    engineProgram: 'Pratt & Whitney ESP Platinum Program',
    avionics: 'EASy II Cockpit with HUD & Synthetic Vision',
    seatingCapacity: 14,
    rangeNM: 5950,
    speedMach: 'Mach 0.90',
    quotedPriceUSD: 29800000,
    quotedPriceINR: '₹250.3 Crores',
    baseAirport: 'Dubai International (OMDB)',
    status: 'Available',
    imageUrl: '/jet_interior.jpg',
    description: 'Legendary Tri-Jet safety and London City airport steep-approach certification. Tri-zone acoustic cabin under 50 dBA. Forward full galley with convection oven.',
    exteriorCondition: '9.8/10 Impeccable — Matterhorn White with Charcoal Pearl and Gold leaf',
    interiorSpec: '14-passenger executive club layout in supple cream leather with walnut high-gloss wood',
    verified: true,
  },
  {
    id: 'HAWKER-900XP-04',
    name: 'Hawker 900XP Midsize Jet',
    registrationNumber: 'VT-BNB',
    country: 'India',
    countryFlag: '🇮🇳',
    ownerNameOrType: 'Private Corporate Aviation Trust',
    category: 'Midsize',
    year: 2018,
    totalTimeHours: 2150,
    engineProgram: 'Honeywell MSP Gold (Engines & APU 100%)',
    avionics: 'Rockwell Collins Pro Line 21 Integrated Avionics Suite',
    seatingCapacity: 8,
    rangeNM: 2930,
    speedMach: 'Mach 0.80',
    quotedPriceUSD: 5950000,
    quotedPriceINR: '₹49.9 Crores',
    baseAirport: 'New Delhi IGI Terminal (VIDP)',
    status: 'Available',
    imageUrl: '/hawker_jet.jpg',
    description: 'True stand-up cabin headroom with private aft lavatory and exterior baggage access. Fresh 12-year structural and landing gear inspection by certified MRO. Turnkey delivery.',
    exteriorCondition: '9.5/10 Excellent — Snow White with Deep Racing Green lower fuselage',
    interiorSpec: '8-place executive double-club seating in saddle tan leather with bird’s-eye maple veneer',
    verified: true,
  },
  {
    id: 'CHALLENGER-3500-05',
    name: 'Bombardier Challenger 3500',
    registrationNumber: 'M-CHAL',
    country: 'Switzerland / Monaco',
    countryFlag: '🇨🇭',
    ownerNameOrType: 'European Private Equity Principal',
    category: 'Super Midsize',
    year: 2023,
    totalTimeHours: 280,
    engineProgram: 'Honeywell HTF7350 MSP Comprehensive',
    avionics: 'Pro Line 21 Advanced with Dual FMS & Head-Up Display',
    seatingCapacity: 10,
    rangeNM: 3400,
    speedMach: 'Mach 0.83',
    quotedPriceUSD: 24500000,
    quotedPriceINR: '₹205.8 Crores',
    baseAirport: 'Geneva Cointrin (LSGG) / Nice (LFMN)',
    status: 'Under Escrow',
    imageUrl: '/jet_interior.jpg',
    description: 'Industry-first voice-controlled cabin environment. Nuage zero-gravity tilt seats, wireless smartphone chargers throughout, 4K display monitors and 24-hr high-capacity oxygen system.',
    exteriorCondition: '10/10 Immaculate showroom gloss finish',
    interiorSpec: 'Neutral graphite and pearl upholstery, eco-certified eucalyptus woodwork, wool carpet',
    verified: true,
  },
  {
    id: 'KINGAIR-B200-06',
    name: 'Beech Super King Air B200',
    registrationNumber: 'VT-RAS',
    country: 'India',
    countryFlag: '🇮🇳',
    ownerNameOrType: 'High-Net-Worth Healthcare & Real Estate Family',
    category: 'Turboprop',
    year: 2019,
    totalTimeHours: 1420,
    engineProgram: 'Pratt & Whitney PT6A-42 ESP Gold',
    avionics: 'Garmin G1000 NXi Next Generation Integrated Flight Deck',
    seatingCapacity: 8,
    rangeNM: 1800,
    speedMach: '310 Knots',
    quotedPriceUSD: 3850000,
    quotedPriceINR: '₹32.3 Crores',
    baseAirport: 'Hyderabad Begumpet (VOHY)',
    status: 'Available',
    imageUrl: '/king_air.jpg',
    description: 'Dual Raisbeck EPIC performance package installed: swept-blade turbofan propellers, dual aft body strakes, and high-flotation gear doors. Medevac stretcher conversion kit included.',
    exteriorCondition: '9.6/10 Pristine condition, hangared since delivery',
    interiorSpec: 'Six VIP club seats plus two aft jump seats, rich camel leather with walnut cabinetry',
    verified: true,
  },
  {
    id: 'AW139-07',
    name: 'Leonardo AW139 VIP Helicopter',
    registrationNumber: 'VT-LEO',
    country: 'India',
    countryFlag: '🇮🇳',
    ownerNameOrType: 'Infrastructure Magnate Private Hangar',
    category: 'VIP Helicopter',
    year: 2022,
    totalTimeHours: 490,
    engineProgram: 'Pratt & Whitney PT6C-67C Fleet Program',
    avionics: 'Honeywell Primus Epic 4-Axis Digital Dual Duplex AFCS',
    seatingCapacity: 8,
    rangeNM: 570,
    speedMach: '165 Knots',
    quotedPriceUSD: 11200000,
    quotedPriceINR: '₹94.1 Crores',
    baseAirport: 'Bangalore HAL / Juhu Aerodrome (VAJJ)',
    status: 'Available',
    imageUrl: '/helicopter.jpg',
    description: 'Twin turbine VIP layout with soundproofing kit reducing noise to limousine levels. Retractable heavy landing gear, air conditioning, and dual cargo pods.',
    exteriorCondition: '9.9/10 Flawless gloss black and champagne finish',
    interiorSpec: '8 bespoke VIP leather armchairs in club layout, champagne cooler, entertainment screen',
    verified: true,
  },
  {
    id: 'LEGACY-650-08',
    name: 'Embraer Legacy 650',
    registrationNumber: 'A6-LEG',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    ownerNameOrType: 'Dubai Sovereign Wealth Family Trustee',
    category: 'Heavy Jet',
    year: 2020,
    totalTimeHours: 1240,
    engineProgram: 'Rolls-Royce AE 3007A2 CorporateCare',
    avionics: 'Honeywell Primus Elite Avionics Suite with Dual Cursor Controls',
    seatingCapacity: 14,
    rangeNM: 3900,
    speedMach: 'Mach 0.80',
    quotedPriceUSD: 16500000,
    quotedPriceINR: '₹138.6 Crores',
    baseAirport: 'Dubai Al Maktoum VIP (OMDW)',
    status: 'Available',
    imageUrl: '/jet_interior.jpg',
    description: 'Three distinct cabin zones seating 14 guests with the largest in-flight accessible baggage compartment in heavy business aviation (286 cu ft). Wet bar and full dining stateroom.',
    exteriorCondition: '9.7/10 High-gloss pearl white with midnight green striping',
    interiorSpec: 'Two-tone beige leather seats, dark teak wood cabinetry, dual forward & aft lavatories',
    verified: true,
  },
];

const STORAGE_KEY_SALES = 'royendison_sales_inventory_v1';
const STORAGE_KEY_EMPTY_LEGS = 'royendison_empty_legs_v1';

export function getSalesInventory(): SalesAircraftListing[] {
  if (typeof window === 'undefined') return INITIAL_SALES_INVENTORY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SALES);
    if (!raw) return INITIAL_SALES_INVENTORY;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SALES_INVENTORY;
  } catch {
    return INITIAL_SALES_INVENTORY;
  }
}

export async function submitAircraftForSale(data: {
  name: string;
  registrationNumber: string;
  country: string;
  countryFlag?: string;
  ownerNameOrType: string;
  category: SalesAircraftListing['category'];
  year: number;
  totalTimeHours: number;
  engineProgram: string;
  avionics?: string;
  seatingCapacity?: number;
  quotedPriceUSD?: number;
  quotedPriceINR?: string;
  baseAirport: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  mediaUrl?: string;
  description?: string;
}) {
  const newListing: SalesAircraftListing = {
    id: `SALE-${Date.now().toString().slice(-6)}`,
    name: data.name,
    registrationNumber: data.registrationNumber.toUpperCase(),
    country: data.country || 'International',
    countryFlag: data.countryFlag || '🌐',
    ownerNameOrType: data.ownerNameOrType || 'Private Seller / Verified Broker',
    category: data.category || 'Heavy Jet',
    year: data.year || new Date().getFullYear(),
    totalTimeHours: data.totalTimeHours || 0,
    engineProgram: data.engineProgram || 'Enrolled in Program',
    avionics: data.avionics || 'Modern Integrated Avionics',
    seatingCapacity: data.seatingCapacity || 8,
    rangeNM: 3500,
    speedMach: 'Mach 0.85',
    quotedPriceUSD: data.quotedPriceUSD || 5000000,
    quotedPriceINR: data.quotedPriceINR || '₹40.0 Crores',
    baseAirport: data.baseAirport || 'Primary Apron',
    status: 'Available',
    imageUrl: data.mediaUrl || '/hawker_jet.jpg',
    description: data.description || 'Verified private aircraft listed for direct sovereign acquisition.',
    exteriorCondition: 'Inspected by Royendison Technical Desk',
    interiorSpec: 'Bespoke executive interior',
    verified: true,
  };

  // 1. Save to local storage for immediate browser reflection
  if (typeof window !== 'undefined') {
    const current = getSalesInventory();
    const updated = [newListing, ...current];
    localStorage.setItem(STORAGE_KEY_SALES, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('royendison_sales_added', { detail: newListing }));
  }

  // 2. Mirror into Supabase
  try {
    await supabase.from('aircraft_sales_listings').insert([
      {
        id: newListing.id,
        aircraft_name: newListing.name,
        registration_number: newListing.registrationNumber,
        country: newListing.country,
        owner_name_or_type: newListing.ownerNameOrType,
        category: newListing.category,
        year_of_manufacture: newListing.year,
        airframe_hours: newListing.totalTimeHours,
        engine_program: newListing.engineProgram,
        quoted_price_usd: newListing.quotedPriceUSD,
        quoted_price_inr: newListing.quotedPriceINR,
        base_airport: newListing.baseAirport,
        contact_name: data.contactName,
        contact_phone: data.contactPhone,
        contact_email: data.contactEmail,
        media_url: newListing.imageUrl,
        notes: data.description,
        created_at: new Date().toISOString(),
      },
    ]);
  } catch (err) {
    console.warn('Supabase sales insert fallback to local storage:', err);
  }

  return newListing;
}

export async function submitOperatorEmptyLeg(data: {
  flightName: string;
  aircraftModel: string;
  registration?: string;
  origin: string;
  destination: string;
  date: string;
  departureTime?: string;
  seatsAvailable: number;
  discountedPriceINR: string;
  operatorName: string;
  contactPhone: string;
  contactEmail?: string;
}) {
  const newDeal = {
    id: `EL-${Date.now().toString().slice(-4)}`,
    flightName: data.flightName,
    aircraftModel: data.aircraftModel,
    registration: data.registration?.toUpperCase() || 'VT-XXX',
    origin: data.origin,
    originCode: data.origin.slice(0, 3).toUpperCase(),
    destination: data.destination,
    destinationCode: data.destination.slice(0, 3).toUpperCase(),
    date: data.date,
    departureTime: data.departureTime || 'TBD with Operator',
    seatsAvailable: data.seatsAvailable,
    originalPriceINR: 'Market Charter Rate',
    discountedPriceINR: data.discountedPriceINR,
    discountPercentage: 55,
    operator: data.operatorName,
    verified: true,
  };

  // Supabase sync
  try {
    await supabase.from('empty_leg_deals').insert([
      {
        id: newDeal.id,
        flight_name: newDeal.flightName,
        aircraft_model: newDeal.aircraftModel,
        registration: newDeal.registration,
        origin: newDeal.origin,
        destination: newDeal.destination,
        flight_date: newDeal.date,
        seats_available: newDeal.seatsAvailable,
        discounted_price_inr: newDeal.discountedPriceINR,
        operator_name: data.operatorName,
        contact_phone: data.contactPhone,
        created_at: new Date().toISOString(),
      },
    ]);
  } catch (err) {
    console.warn('Supabase empty leg insert fallback:', err);
  }

  return newDeal;
}
