export interface FleetAircraft {
  id: string;
  name: string;
  category: 'light' | 'midsize' | 'large' | 'helicopter';
  subCategory?: string; // e.g. 'Twin Engine' | 'Single Engine'
  seating: string;
  speed: string;
  range: string;
  idealFor: string[];
  imageUrl: string;
}

export interface EmptyLegDeal {
  id: string;
  flightName: string;
  aircraftModel: string;
  registration?: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  date: string;
  departureTime?: string;
  seatsAvailable: number;
  originalPriceINR: string;
  discountedPriceINR: string;
  discountPercentage: number;
  operator: string;
  verified: boolean;
}

// 1. LIGHT / LIGHTWEIGHT AIRCRAFT
export const LIGHT_AIRCRAFT_LIST: FleetAircraft[] = [
  { id: 'b200', name: 'Beech Super King Air B200', category: 'light', seating: '7-8 VIP', speed: '540 km/h', range: '3,300 km', idealFor: ['Business Meetups', 'Regional Hops', 'Medevac'], imageUrl: '/king_air.jpg' },
  { id: 'b200gt', name: 'Beech Super King Air B200GT', category: 'light', seating: '7-8 VIP', speed: '560 km/h', range: '3,350 km', idealFor: ['Corporate Travel', 'Family Private Trips'], imageUrl: '/king_air.jpg' },
  { id: 'b300', name: 'Beech Super King Air B300', category: 'light', seating: '8-9 VIP', speed: '570 km/h', range: '3,300 km', idealFor: ['Business Meetings', 'Tier-2 Connectivity'], imageUrl: '/king_air.jpg' },
  { id: 'c90a', name: 'Beechcraft King Air C90A', category: 'light', seating: '5-6 Pax', speed: '460 km/h', range: '2,400 km', idealFor: ['Short Runway Flights', 'HNWI Private Travel'], imageUrl: '/king_air.jpg' },
  { id: 'c90b', name: 'Beechcraft King Air C90B', category: 'light', seating: '5-6 Pax', speed: '470 km/h', range: '2,450 km', idealFor: ['Regional Corporate Flights', 'Weekend Retreats'], imageUrl: '/king_air.jpg' },
  { id: 'c90gti', name: 'Beechcraft King Air C90GTI', category: 'light', seating: '6 VIP', speed: '500 km/h', range: '2,500 km', idealFor: ['Direct Executive Hops', 'Personal Aviation'], imageUrl: '/king_air.jpg' },
  { id: 'kingair-250', name: 'Beechcraft King Air 250', category: 'light', seating: '7-8 VIP', speed: '570 km/h', range: '3,180 km', idealFor: ['Corporate Charters', 'HNWI Transfers'], imageUrl: '/king_air.jpg' },
  { id: 'premier-1a', name: 'Beechcraft Premier 1A', category: 'light', seating: '6 VIP', speed: '834 km/h', range: '2,900 km', idealFor: ['High-Speed Light Jet', 'Same-Day Return'], imageUrl: '/hawker_jet.jpg' },
  { id: 'c172s', name: 'Cessna 172S', category: 'light', seating: '3 Pax', speed: '226 km/h', range: '1,180 km', idealFor: ['Site Surveys', 'Private Scenic Transfer'], imageUrl: '/vip_boarding.jpg' },
  { id: 'r172k', name: 'Cessna R172K', category: 'light', seating: '3 Pax', speed: '240 km/h', range: '1,200 km', idealFor: ['Private Regional Hops', 'Reconnaissance'], imageUrl: '/vip_boarding.jpg' },
  { id: 'c206h', name: 'Cessna 206H', category: 'light', seating: '5 Pax', speed: '280 km/h', range: '1,350 km', idealFor: ['Island & Short Strip Access', 'Family Travel'], imageUrl: '/vip_boarding.jpg' },
  { id: 't206h', name: 'Cessna T206H', category: 'light', seating: '5 Pax', speed: '310 km/h', range: '1,400 km', idealFor: ['High Altitude Flying', 'Mountain Access'], imageUrl: '/vip_boarding.jpg' },
  { id: 'caravan-208b', name: 'Cessna Caravan 208B', category: 'light', seating: '9-12 Pax', speed: '340 km/h', range: '1,980 km', idealFor: ['Remote Strip Commute', 'Group Excursions'], imageUrl: '/vip_boarding.jpg' },
  { id: 'cj1-plus', name: 'Cessna Citation CJ1+', category: 'light', seating: '5 VIP', speed: '720 km/h', range: '2,400 km', idealFor: ['Executive Fast Jet', 'Private Business Meeting'], imageUrl: '/hawker_jet.jpg' },
  { id: 'cj2', name: 'Cessna Citation CJ2', category: 'light', seating: '6 VIP', speed: '760 km/h', range: '2,900 km', idealFor: ['Point-to-Point Jet', 'HNWI Quick Hop'], imageUrl: '/hawker_jet.jpg' },
  { id: 'cj2-plus', name: 'Cessna Citation CJ2+', category: 'light', seating: '6 VIP', speed: '770 km/h', range: '3,000 km', idealFor: ['Corporate Charters', 'Private Vacation'], imageUrl: '/hawker_jet.jpg' },
  { id: 'citation-ii', name: 'Cessna Citation II', category: 'light', seating: '7-8 VIP', speed: '740 km/h', range: '3,100 km', idealFor: ['Spacious Cabin Light Jet', 'Family Trips'], imageUrl: '/hawker_jet.jpg' },
  { id: 'citation-525a', name: 'Cessna Citation 525A', category: 'light', seating: '6 VIP', speed: '750 km/h', range: '2,800 km', idealFor: ['Inter-City Business Travel', 'Quick Deployment'], imageUrl: '/hawker_jet.jpg' },
  { id: 'citation-560xl', name: 'Cessna Citation 560XL', category: 'light', seating: '8 VIP', speed: '800 km/h', range: '3,400 km', idealFor: ['Stand-Up Aisle', 'Corporate Board Flights'], imageUrl: '/hawker_jet.jpg' },
  { id: 'citation-560xls-plus', name: 'Cessna Citation 560XLS+', category: 'light', seating: '8-9 VIP', speed: '815 km/h', range: '3,500 km', idealFor: ['Top-Tier Light Jet', 'VIP Delegation'], imageUrl: '/hawker_jet.jpg' },
  { id: 'dornier-228', name: 'Dornier DO-228-201', category: 'light', seating: '15-19 Pax', speed: '428 km/h', range: '2,600 km', idealFor: ['Group Corporate Charter', 'Pilgrimage Shuttle'], imageUrl: '/vip_boarding.jpg' },
  { id: 'hawker-400a-xp', name: 'Hawker 400A XP', category: 'light', seating: '7 VIP', speed: '830 km/h', range: '2,800 km', idealFor: ['Fast Executive Jet', 'Business Meetup'], imageUrl: '/hawker_jet.jpg' },
  { id: 'learjet-40xr', name: 'Learjet 40XR', category: 'light', seating: '6 VIP', speed: '850 km/h', range: '3,100 km', idealFor: ['High-Altitude Cruise', 'Fast Regional'], imageUrl: '/hawker_jet.jpg' },
  { id: 'learjet-45', name: 'Learjet 45', category: 'light', seating: '8 VIP', speed: '840 km/h', range: '3,300 km', idealFor: ['Double Club Seating', 'Executive Board'], imageUrl: '/hawker_jet.jpg' },
  { id: 'learjet-45xr', name: 'Learjet 45XR', category: 'light', seating: '8 VIP', speed: '860 km/h', range: '3,700 km', idealFor: ['Rapid Transcontinental', 'HNWI Travel'], imageUrl: '/hawker_jet.jpg' },
  { id: 'pc12', name: 'Pilatus PC-12', category: 'light', seating: '6-8 VIP', speed: '520 km/h', range: '3,300 km', idealFor: ['Swiss Precision Turboprop', 'Short Grass Strips'], imageUrl: '/king_air.jpg' },
  { id: 'pc12-45', name: 'Pilatus PC-12/45', category: 'light', seating: '6-8 VIP', speed: '525 km/h', range: '3,350 km', idealFor: ['Rugged Luxury Transfer', 'Private Estates'], imageUrl: '/king_air.jpg' },
  { id: 'pc12-47e', name: 'Pilatus PC-12/47E', category: 'light', seating: '6-8 VIP', speed: '535 km/h', range: '3,400 km', idealFor: ['BMW Designworks Interior', 'Executive Hop'], imageUrl: '/king_air.jpg' },
  { id: 'tecnam-p2010', name: 'Tecnam P2010TDI', category: 'light', seating: '3 VIP', speed: '260 km/h', range: '1,600 km', idealFor: ['Modern Diesel Cruiser', 'Coastal Tours'], imageUrl: '/vip_boarding.jpg' },
  { id: 'tecnam-p2006t', name: 'Tecnam P2006T', category: 'light', seating: '3 VIP', speed: '270 km/h', range: '1,400 km', idealFor: ['Twin Engine Economy', 'Private Escort'], imageUrl: '/vip_boarding.jpg' },
  { id: 'tecnam-p68c', name: 'Tecnam P68C', category: 'light', seating: '5 VIP', speed: '300 km/h', range: '1,900 km', idealFor: ['High Wing Visibility', 'Aerial Survey'], imageUrl: '/vip_boarding.jpg' },
  { id: 'stemme-s6rt', name: 'Stemme S6RT', category: 'light', seating: '2 VIP', speed: '250 km/h', range: '1,400 km', idealFor: ['VIP Gliding Tour', 'Private Adventure'], imageUrl: '/vip_boarding.jpg' },
  { id: 'piaggio-p180', name: 'Piaggio P.180 Avanti II', category: 'light', seating: '7 VIP', speed: '732 km/h', range: '2,800 km', idealFor: ['Italian Supercar Jet', 'Stand-up Cabin Turboprop'], imageUrl: '/hawker_jet.jpg' },
  { id: 'piper-pa46', name: 'Piper PA-46-350P', category: 'light', seating: '5 VIP', speed: '400 km/h', range: '2,100 km', idealFor: ['Pressurized Cabin', 'Private Individual Flights'], imageUrl: '/vip_boarding.jpg' },
  { id: 'citation-cj2-525a', name: 'Cessna Citation CJ2+ 525A', category: 'light', seating: '6 VIP', speed: '775 km/h', range: '3,000 km', idealFor: ['Corporate Charter', 'Private Quick Hop'], imageUrl: '/hawker_jet.jpg' },
  { id: 'phenom-100', name: 'Embraer Phenom 100', category: 'light', seating: '4-5 VIP', speed: '720 km/h', range: '2,180 km', idealFor: ['BMW Interior Light Jet', 'Executive Day Hop'], imageUrl: '/hawker_jet.jpg' },
  { id: 'phenom-100e', name: 'Embraer Phenom 100E', category: 'light', seating: '5 VIP', speed: '730 km/h', range: '2,200 km', idealFor: ['Multi-Function Spoilers', 'HNWI Private Hops'], imageUrl: '/hawker_jet.jpg' },
];

// 2. MIDSIZE AIRCRAFT
export const MIDSIZE_AIRCRAFT_LIST: FleetAircraft[] = [
  { id: 'citation-excel', name: 'Cessna Citation Excel', category: 'midsize', seating: '8 VIP', speed: '800 km/h', range: '3,500 km', idealFor: ['Stand-Up Comfort', 'Corporate Meetups'], imageUrl: '/hawker_jet.jpg' },
  { id: 'citation-xls-plus', name: 'Cessna Citation XLS+', category: 'midsize', seating: '8-9 VIP', speed: '815 km/h', range: '3,900 km', idealFor: ['Leading Midsize Cabin', 'Executive Board Flights'], imageUrl: '/hawker_jet.jpg' },
  { id: 'citation-560xl-excel', name: 'Cessna Citation 560XL Excel', category: 'midsize', seating: '8 VIP', speed: '810 km/h', range: '3,600 km', idealFor: ['Corporate Syndicate', 'Family Private Travel'], imageUrl: '/hawker_jet.jpg' },
  { id: 'g150', name: 'Gulfstream G150', category: 'midsize', seating: '7-8 VIP', speed: '850 km/h', range: '5,500 km', idealFor: ['Long Range Midsize', 'Mumbai to Dubai Non-stop'], imageUrl: '/hawker_jet.jpg' },
  { id: 'g200', name: 'Gulfstream G200', category: 'midsize', seating: '9 VIP', speed: '860 km/h', range: '6,300 km', idealFor: ['Super Midsize Transcontinental', 'Delhi to Singapore'], imageUrl: '/hawker_jet.jpg' },
  { id: 'hawker-800xp', name: 'Hawker 800XP', category: 'midsize', seating: '8 VIP', speed: '820 km/h', range: '4,600 km', idealFor: ['Stand-up Midsize Classic', 'Corporate Executive'], imageUrl: '/hawker_jet.jpg' },
  { id: 'hawker-850xp', name: 'Hawker 850XP', category: 'midsize', seating: '8 VIP', speed: '830 km/h', range: '4,800 km', idealFor: ['Winglet Performance', 'Cross-Border Flights'], imageUrl: '/hawker_jet.jpg' },
  { id: 'hawker-900xp', name: 'Hawker 900XP', category: 'midsize', seating: '8 VIP', speed: '835 km/h', range: '5,100 km', idealFor: ['Fuel Efficient Long Range', 'Diplomatic Missions'], imageUrl: '/hawker_jet.jpg' },
  { id: 'hawker-beechcraft-900xp', name: 'Hawker Beechcraft 900XP', category: 'midsize', seating: '8 VIP', speed: '840 km/h', range: '5,150 km', idealFor: ['Executive Club', 'VIP Traveling'], imageUrl: '/hawker_jet.jpg' },
  { id: 'hawker-4000', name: 'Hawker 4000', category: 'midsize', seating: '9 VIP', speed: '870 km/h', range: '6,000 km', idealFor: ['Carbon-Fiber Composite Fuselage', 'Super-Midsize'], imageUrl: '/hawker_jet.jpg' },
  { id: 'learjet-60xr', name: 'Learjet 60XR', category: 'midsize', seating: '7 VIP', speed: '860 km/h', range: '4,400 km', idealFor: ['Fastest Climb to FL430', 'Rapid Transcontinental'], imageUrl: '/hawker_jet.jpg' },
  { id: 'challenger-300', name: 'Bombardier Challenger 300', category: 'midsize', seating: '9 VIP', speed: '870 km/h', range: '5,700 km', idealFor: ['Super-Midsize Benchmark', 'Coast-to-Coast Non-Stop'], imageUrl: '/hawker_jet.jpg' },
  { id: 'challenger-3500', name: 'Bombardier Challenger 3500', category: 'midsize', seating: '10 VIP', speed: '870 km/h', range: '6,300 km', idealFor: ['Nuage Seating', 'Zero Gravity Comfort', 'Corporate M&A'], imageUrl: '/hawker_jet.jpg' },
  { id: 'challenger-604', name: 'Bombardier Challenger 604', category: 'midsize', seating: '10-12 VIP', speed: '850 km/h', range: '7,400 km', idealFor: ['Widebody Midsize', 'Intercontinental Leisure'], imageUrl: '/jet_interior.jpg' },
  { id: 'challenger-605', name: 'Bombardier Challenger 605', category: 'midsize', seating: '12 VIP', speed: '860 km/h', range: '7,400 km', idealFor: ['Expansive Cabin', 'Large Video Monitors', 'VIP Delegations'], imageUrl: '/jet_interior.jpg' },
  { id: 'challenger-650', name: 'Bombardier Challenger 650', category: 'midsize', seating: '12 VIP', speed: '870 km/h', range: '7,400 km', idealFor: ['Modern Galley', 'Full Gourmet In-Flight Dining'], imageUrl: '/jet_interior.jpg' },
  { id: 'challenger-cl600', name: 'Bombardier Challenger CL-600-2B16', category: 'midsize', seating: '11 VIP', speed: '850 km/h', range: '7,200 km', idealFor: ['Executive Comfort', 'Charter Management'], imageUrl: '/jet_interior.jpg' },
  { id: 'falcon-2000', name: 'Dassault Falcon 2000', category: 'midsize', seating: '10 VIP', speed: '870 km/h', range: '5,800 km', idealFor: ['French Haute Aviation', 'Short Runway Agility'], imageUrl: '/jet_interior.jpg' },
  { id: 'falcon-2000ex', name: 'Dassault Falcon 2000EX', category: 'midsize', seating: '10 VIP', speed: '875 km/h', range: '7,000 km', idealFor: ['Extended Range Twin', 'Transatlantic Capability'], imageUrl: '/jet_interior.jpg' },
  { id: 'falcon-2000ex-easy', name: 'Dassault Falcon 2000EX EASy', category: 'midsize', seating: '10 VIP', speed: '880 km/h', range: '7,100 km', idealFor: ['EASy Cockpit Avionics', 'High-Altitude Alpine Landing'], imageUrl: '/jet_interior.jpg' },
  { id: 'falcon-2000lx', name: 'Dassault Falcon 2000LX', category: 'midsize', seating: '10 VIP', speed: '880 km/h', range: '7,400 km', idealFor: ['Blended Winglets', 'Transcontinental Non-Stop'], imageUrl: '/jet_interior.jpg' },
  { id: 'falcon-2000-lx-var', name: 'Dassault Falcon 2000 LX', category: 'midsize', seating: '10 VIP', speed: '880 km/h', range: '7,400 km', idealFor: ['Corporate Executive', 'Bespoke Interior'], imageUrl: '/jet_interior.jpg' },
  { id: 'falcon-2000-ex-easy-var', name: 'Dassault Falcon 2000 EX EASy', category: 'midsize', seating: '10 VIP', speed: '880 km/h', range: '7,100 km', idealFor: ['Executive Mobility', 'International Delegation'], imageUrl: '/jet_interior.jpg' },
];

// 3. LARGE / HEAVY AIRCRAFT
export const LARGE_AIRCRAFT_LIST: FleetAircraft[] = [
  { id: 'falcon-6x', name: 'Dassault Falcon 6X', category: 'large', seating: '14-16 VIP', speed: 'Mach 0.90', range: '10,200 km', idealFor: ['Tallest & Widest Cabin in Business Aviation'], imageUrl: '/jet_interior.jpg' },
  { id: 'falcon-7x', name: 'Dassault Falcon 7X', category: 'large', seating: '14-16 VIP', speed: 'Mach 0.90', range: '11,000 km', idealFor: ['Tri-Jet Safety', 'London City Steep Approach Certified'], imageUrl: '/jet_interior.jpg' },
  { id: 'falcon-900ex', name: 'Dassault Falcon 900EX', category: 'large', seating: '14 VIP', speed: 'Mach 0.84', range: '8,300 km', idealFor: ['Tri-Jet Transoceanic', 'Spacious 3-Zone Cabin'], imageUrl: '/jet_interior.jpg' },
  { id: 'g550', name: 'Gulfstream G550', category: 'large', seating: '16 VIP', speed: 'Mach 0.885', range: '12,500 km', idealFor: ['Intercontinental Benchmark', 'Private Master Suite'], imageUrl: '/jet_interior.jpg' },
  { id: 'global-5000', name: 'Bombardier Global 5000', category: 'large', seating: '13-16 VIP', speed: 'Mach 0.89', range: '9,600 km', idealFor: ['Three True Living Zones', 'Transatlantic Powerhouse'], imageUrl: '/jet_interior.jpg' },
  { id: 'global-5500', name: 'Bombardier Global 5500', category: 'large', seating: '16 VIP', speed: 'Mach 0.90', range: '10,900 km', idealFor: ['Rolls-Royce Pearl 15 Engines', 'Nuage Lounges'], imageUrl: '/jet_interior.jpg' },
  { id: 'global-6000', name: 'Bombardier Global 6000', category: 'large', seating: '16 VIP', speed: 'Mach 0.89', range: '11,100 km', idealFor: ['Aft Private Stateroom', 'Crew Rest Facility'], imageUrl: '/jet_interior.jpg' },
  { id: 'global-6500', name: 'Bombardier Global 6500', category: 'large', seating: '17 VIP', speed: 'Mach 0.90', range: '12,200 km', idealFor: ['NextGen Wing Aerodynamics', 'Intercontinental'], imageUrl: '/jet_interior.jpg' },
  { id: 'global-7500', name: 'Bombardier Global 7500', category: 'large', seating: '19 VIP', speed: 'Mach 0.925', range: '14,300 km', idealFor: ['Four Zone Master Living', 'Permanent Bed & Shower'], imageUrl: '/jet_interior.jpg' },
  { id: 'global-express', name: 'Bombardier Global Express', category: 'large', seating: '14 VIP', speed: 'Mach 0.88', range: '11,000 km', idealFor: ['Pioneering Long Range', 'Corporate Heavy Jet'], imageUrl: '/jet_interior.jpg' },
  { id: 'global-express-xrs', name: 'Bombardier Global Express XRS', category: 'large', seating: '14 VIP', speed: 'Mach 0.89', range: '11,390 km', idealFor: ['Extended Fuel Capacity', 'Global Family Office'], imageUrl: '/jet_interior.jpg' },
  { id: 'legacy-600', name: 'Embraer Legacy 600', category: 'large', seating: '13 VIP', speed: '830 km/h', range: '6,300 km', idealFor: ['Three Cabin Zones', 'Massive Baggage Bay'], imageUrl: '/jet_interior.jpg' },
  { id: 'legacy-650', name: 'Embraer Legacy 650', category: 'large', seating: '14 VIP', speed: '835 km/h', range: '7,200 km', idealFor: ['Extended Range Heavy', 'Bespoke Catering'], imageUrl: '/jet_interior.jpg' },
  { id: 'lineage-1000', name: 'Embraer Lineage 1000', category: 'large', seating: '19 VIP', speed: '870 km/h', range: '8,500 km', idealFor: ['Ultra-Large Flying Penthouse', 'Master Bedroom with Bath'], imageUrl: '/jet_interior.jpg' },
  { id: 'erj-170', name: 'Embraer ERJ 170-200 LR', category: 'large', seating: '25-40 VIP', speed: '870 km/h', range: '4,000 km', idealFor: ['Sports Team & Delegation Charter', 'VIP Corporate Shuttle'], imageUrl: '/vip_boarding.jpg' },
  { id: 'a319-cj', name: 'Airbus A319-115 CJ', category: 'large', seating: '19-29 VIP', speed: '870 km/h', range: '11,100 km', idealFor: ['Head of State Flying Palace', 'Dining Room & Master Suite'], imageUrl: '/vip_boarding.jpg' },
  { id: 'a320-232', name: 'Airbus A320-232 Corporate', category: 'large', seating: '30-45 VIP', speed: '880 km/h', range: '6,200 km', idealFor: ['Bespoke Royal Escort', 'High-Capacity VIP Manifest'], imageUrl: '/vip_boarding.jpg' },
  { id: 'b737-800-cargo', name: 'Boeing 737-800 Freighter', category: 'large', seating: 'Cargo Only', speed: '850 km/h', range: '5,400 km', idealFor: ['High-Value Art, Gold & Diplomatic Freight Transfer'], imageUrl: '/vip_boarding.jpg' },
  { id: 'b737-9', name: 'Boeing 737-9 BBJ', category: 'large', seating: '25 VIP', speed: '870 km/h', range: '10,000 km', idealFor: ['Boeing Business Jet', 'Bespoke Stateroom & Boardroom'], imageUrl: '/vip_boarding.jpg' },
  { id: 'emb-135er', name: 'Embraer EMB-135ER', category: 'large', seating: '16-30 VIP', speed: '830 km/h', range: '3,200 km', idealFor: ['Corporate Executive Shuttle', 'Event Group Transit'], imageUrl: '/vip_boarding.jpg' },
  { id: 'emb-135lr', name: 'Embraer EMB-135LR', category: 'large', seating: '16-30 VIP', speed: '830 km/h', range: '3,700 km', idealFor: ['Long Range Corporate Air Shuttle', 'Political Campaign Tour'], imageUrl: '/vip_boarding.jpg' },
];

// 4. HELICOPTERS (SEPARATE LIST WITH TWIN & SINGLE ENGINE TAGS)
export const HELICOPTERS_LIST: FleetAircraft[] = [
  // Twin Engine
  { id: 'a109s', name: 'Agusta A109S', category: 'helicopter', subCategory: 'Twin Engine', seating: '6 VIP', speed: '285 km/h', range: '850 km', idealFor: ['Wedding Grand Entry', 'Flower Shower', 'Corporate Meetup'], imageUrl: '/helicopter.jpg' },
  { id: 'a109e', name: 'Agusta A109E Power', category: 'helicopter', subCategory: 'Twin Engine', seating: '6 VIP', speed: '280 km/h', range: '820 km', idealFor: ['VIP Political Tour', 'Marriages', 'Executive Transit'], imageUrl: '/helicopter.jpg' },
  { id: 'a109sp', name: 'Agusta A109SP GrandNew', category: 'helicopter', subCategory: 'Twin Engine', seating: '6 VIP', speed: '290 km/h', range: '860 km', idealFor: ['Corporate Top Executives', 'Luxury Resort Hop'], imageUrl: '/helicopter.jpg' },
  { id: 'bell-427', name: 'Bell 427', category: 'helicopter', subCategory: 'Twin Engine', seating: '7 VIP', speed: '250 km/h', range: '730 km', idealFor: ['Dual Turbine Safety', 'Political Campaigns'], imageUrl: '/helicopter.jpg' },
  { id: 'bell-429', name: 'Bell 429 GlobalRanger', category: 'helicopter', subCategory: 'Twin Engine', seating: '7 VIP', speed: '278 km/h', range: '760 km', idealFor: ['Rooftop Hospital Medevac', 'Weddings', 'VIP Transit'], imageUrl: '/helicopter.jpg' },
  { id: 'bell-412', name: 'Bell 412', category: 'helicopter', subCategory: 'Twin Engine', seating: '13 Pax', speed: '226 km/h', range: '745 km', idealFor: ['Large Family Wedding Party', 'Pilgrimage Shuttles'], imageUrl: '/helicopter.jpg' },
  { id: 'bell-412ep', name: 'Bell 412EP', category: 'helicopter', subCategory: 'Twin Engine', seating: '13 Pax', speed: '230 km/h', range: '745 km', idealFor: ['Offshore & Mountain Flying', 'State Delegations'], imageUrl: '/helicopter.jpg' },
  { id: 'bell-412epi', name: 'Bell 412EPI', category: 'helicopter', subCategory: 'Twin Engine', seating: '13 Pax', speed: '235 km/h', range: '750 km', idealFor: ['Glass Cockpit Heavy Rotary', 'VIP Political Rally'], imageUrl: '/helicopter.jpg' },
  { id: 'as355n', name: 'Eurocopter AS355N Twin Star', category: 'helicopter', subCategory: 'Twin Engine', seating: '5 VIP', speed: '220 km/h', range: '700 km', idealFor: ['Flower Shower', 'City Skyline Flights', 'Weddings'], imageUrl: '/helicopter.jpg' },
  { id: 'as355-f1', name: 'Eurocopter AS-355 F1', category: 'helicopter', subCategory: 'Twin Engine', seating: '5 VIP', speed: '220 km/h', range: '700 km', idealFor: ['Marriage Entry', 'VIP Security Recon'], imageUrl: '/helicopter.jpg' },
  { id: 'as365n2', name: 'Eurocopter AS365N2 Dauphin', category: 'helicopter', subCategory: 'Twin Engine', seating: '8-10 VIP', speed: '280 km/h', range: '850 km', idealFor: ['Offshore Yacht Landings', 'Bespoke Executive Flights'], imageUrl: '/helicopter.jpg' },
  { id: 'as365n3', name: 'Eurocopter AS365N3', category: 'helicopter', subCategory: 'Twin Engine', seating: '8-10 VIP', speed: '287 km/h', range: '860 km', idealFor: ['High Temperature & Hot Altitude Performance', 'Corporate'], imageUrl: '/helicopter.jpg' },
  { id: 'ec135', name: 'Eurocopter EC135', category: 'helicopter', subCategory: 'Twin Engine', seating: '6 VIP', speed: '254 km/h', range: '635 km', idealFor: ['Ultra-Quiet Fenestron Tail', 'Wedding Ceremony Rain'], imageUrl: '/helicopter.jpg' },
  { id: 'ec135p2-plus', name: 'Eurocopter EC135P2+', category: 'helicopter', subCategory: 'Twin Engine', seating: '6 VIP', speed: '256 km/h', range: '640 km', idealFor: ['Pratt & Whitney Turbines', 'Hospital ICU Medevac'], imageUrl: '/helicopter.jpg' },
  { id: 'ec135p3h', name: 'Eurocopter EC135P3H', category: 'helicopter', subCategory: 'Twin Engine', seating: '6 VIP', speed: '260 km/h', range: '650 km', idealFor: ['Advanced Helionix Cockpit', 'Executive VIP Transfers'], imageUrl: '/helicopter.jpg' },
  { id: 'h145', name: 'Airbus H145', category: 'helicopter', subCategory: 'Twin Engine', seating: '8-10 VIP', speed: '240 km/h', range: '650 km', idealFor: ['Mercedes-Benz Style Luxury Interior', 'Weddings & Flower Rain'], imageUrl: '/helicopter.jpg' },
  { id: 'h145-d3', name: 'Airbus H145 D3', category: 'helicopter', subCategory: 'Twin Engine', seating: '10 VIP', speed: '245 km/h', range: '680 km', idealFor: ['5-Bladed Bearingless Rotor', 'Maximum Payload VIP'], imageUrl: '/helicopter.jpg' },
  { id: 'h160-b', name: 'Airbus H160-B', category: 'helicopter', subCategory: 'Twin Engine', seating: '12 VIP', speed: '285 km/h', range: '850 km', idealFor: ['NextGen Super-Medium Rotary', 'Blue Edge Noise Reduction'], imageUrl: '/helicopter.jpg' },
  { id: 'aw139', name: 'Leonardo AW139', category: 'helicopter', subCategory: 'Twin Engine', seating: '12-15 VIP', speed: '306 km/h', range: '1,060 km', idealFor: ['Fastest In Class', 'Political Leaders & Billionaires', 'Char Dham'], imageUrl: '/helicopter.jpg' },
  { id: 'aw169', name: 'Leonardo AW169', category: 'helicopter', subCategory: 'Twin Engine', seating: '8-10 VIP', speed: '290 km/h', range: '820 km', idealFor: ['Light-Intermediate Executive', 'Luxury Villa Helipads'], imageUrl: '/helicopter.jpg' },
  { id: 's76c', name: 'Sikorsky S-76C', category: 'helicopter', subCategory: 'Twin Engine', seating: '8 VIP', speed: '287 km/h', range: '760 km', idealFor: ['Royal Head of State Classic', 'Weddings', 'Corporate'], imageUrl: '/helicopter.jpg' },
  { id: 's76c-plus-plus', name: 'Sikorsky S-76C++', category: 'helicopter', subCategory: 'Twin Engine', seating: '8 VIP', speed: '287 km/h', range: '780 km', idealFor: ['Turbomeca Arriel 2S2 Engines', 'Diplomatic Missions'], imageUrl: '/helicopter.jpg' },
  { id: 's76d', name: 'Sikorsky S-76D', category: 'helicopter', subCategory: 'Twin Engine', seating: '8 VIP', speed: '287 km/h', range: '800 km', idealFor: ['Active Vibration Control', 'Silense Cabin Technology'], imageUrl: '/helicopter.jpg' },
  { id: 'dauphin-2', name: 'Dauphin 2', category: 'helicopter', subCategory: 'Twin Engine', seating: '8 VIP', speed: '280 km/h', range: '850 km', idealFor: ['Offshore Operations', 'Corporate Executive Shuttle'], imageUrl: '/helicopter.jpg' },
  { id: 'mi-172', name: 'MI-172', category: 'helicopter', subCategory: 'Twin Engine', seating: '24 Pax', speed: '250 km/h', range: '650 km', idealFor: ['High-Capacity Heavy Transport', 'Pilgrimages & VIP Group'], imageUrl: '/helicopter.jpg' },
  { id: 'mi-171a2', name: 'MI-171A2', category: 'helicopter', subCategory: 'Twin Engine', seating: '20 VIP', speed: '260 km/h', range: '800 km', idealFor: ['Heavy Lift Luxury Interior', 'Multi-City Campaigns'], imageUrl: '/helicopter.jpg' },
  { id: 'alh-dhruv', name: 'ALH Dhruv', category: 'helicopter', subCategory: 'Twin Engine', seating: '12 VIP', speed: '290 km/h', range: '630 km', idealFor: ['Indigenous Twin Turbine', 'Mountain All-Weather Flights'], imageUrl: '/helicopter.jpg' },

  // Single Engine
  { id: 'a119', name: 'Agusta A119 Koala', category: 'helicopter', subCategory: 'Single Engine', seating: '6-7 VIP', speed: '260 km/h', range: '950 km', idealFor: ['Fastest Single Turbine', 'Flower Shower', 'Corporate Trips'], imageUrl: '/helicopter.jpg' },
  { id: 'bell-206-l3', name: 'Bell 206 L3 LongRanger', category: 'helicopter', subCategory: 'Single Engine', seating: '5-6 VIP', speed: '215 km/h', range: '600 km', idealFor: ['Wedding Grand Arrival', 'Sightseeing & Surveys'], imageUrl: '/helicopter.jpg' },
  { id: 'bell-206-l4', name: 'Bell 206 L4', category: 'helicopter', subCategory: 'Single Engine', seating: '6 VIP', speed: '220 km/h', range: '620 km', idealFor: ['Marriage Entry', 'Flower Shower', 'Temple Visits'], imageUrl: '/helicopter.jpg' },
  { id: 'bell-407', name: 'Bell 407', category: 'helicopter', subCategory: 'Single Engine', seating: '6 VIP', speed: '246 km/h', range: '630 km', idealFor: ['Char Dham Mountain Yatra', 'Smooth 4-Blade Ride'], imageUrl: '/helicopter.jpg' },
  { id: 'bell-407gxp', name: 'Bell 407GXP', category: 'helicopter', subCategory: 'Single Engine', seating: '6 VIP', speed: '246 km/h', range: '630 km', idealFor: ['Rolls-Royce 250-C47B/8 Turbine', 'High Hot Performance'], imageUrl: '/helicopter.jpg' },
  { id: 'bell-407gx', name: 'Bell 407GX', category: 'helicopter', subCategory: 'Single Engine', seating: '6 VIP', speed: '246 km/h', range: '630 km', idealFor: ['Garmin G1000H Glass Cockpit', 'Political Travel'], imageUrl: '/helicopter.jpg' },
  { id: 'as350b2', name: 'Eurocopter AS350B2 Ecureuil', category: 'helicopter', subCategory: 'Single Engine', seating: '5 VIP', speed: '245 km/h', range: '660 km', idealFor: ['Himalayan High Altitude', 'Pilgrimages', 'Flower Rain'], imageUrl: '/helicopter.jpg' },
  { id: 'as350b3', name: 'Eurocopter AS350B3', category: 'helicopter', subCategory: 'Single Engine', seating: '5 VIP', speed: '250 km/h', range: '665 km', idealFor: ['Everest Landing Record Class', 'Kedarnath Mountain Hops'], imageUrl: '/helicopter.jpg' },
  { id: 'as350b3e', name: 'Eurocopter AS350B3E (H125)', category: 'helicopter', subCategory: 'Single Engine', seating: '5-6 VIP', speed: '255 km/h', range: '665 km', idealFor: ['Gold Standard High Altitude', 'VIP Darshan'], imageUrl: '/helicopter.jpg' },
  { id: 'ec130t2', name: 'Eurocopter EC130T2 (H130)', category: 'helicopter', subCategory: 'Single Engine', seating: '7 VIP', speed: '237 km/h', range: '610 km', idealFor: ['Theatre-Style Panoramic Windows', 'Wedding Entrance'], imageUrl: '/helicopter.jpg' },
  { id: 'ec130b4', name: 'Eurocopter EC130B4', category: 'helicopter', subCategory: 'Single Engine', seating: '7 VIP', speed: '235 km/h', range: '610 km', idealFor: ['Whisper-Quiet Fenestron', 'Luxury Sightseeing'], imageUrl: '/helicopter.jpg' },
  { id: 'r44', name: 'Robinson R44', category: 'helicopter', subCategory: 'Single Engine', seating: '3 Pax', speed: '200 km/h', range: '560 km', idealFor: ['Flower Shower', 'Proposal Entry', 'Aerial Photography'], imageUrl: '/helicopter.jpg' },
  { id: 'r44-raven2', name: 'Robinson R44 Raven II', category: 'helicopter', subCategory: 'Single Engine', seating: '3 Pax', speed: '205 km/h', range: '560 km', idealFor: ['Fuel-Injected Piston', 'Private Birthday Surprise Entry'], imageUrl: '/helicopter.jpg' },
  { id: 'r66', name: 'Robinson R66 Turbine', category: 'helicopter', subCategory: 'Single Engine', seating: '4 VIP', speed: '222 km/h', range: '650 km', idealFor: ['Rolls-Royce RR300 Turbine', 'Spacious Baggage Bay'], imageUrl: '/helicopter.jpg' },
];

// EMPTY LEGS & FERRY DEALS
export const INITIAL_EMPTY_LEGS: EmptyLegDeal[] = [
  {
    id: 'EL-01',
    flightName: 'Hawker 900XP Coastal Ferry',
    aircraftModel: 'Hawker 900XP (Midsize Jet)',
    registration: 'VT-BNB',
    origin: 'New Delhi (DEL)',
    originCode: 'DEL',
    destination: 'Goa Mopa (GOX)',
    destinationCode: 'GOX',
    date: '2026-10-14',
    departureTime: '11:30 AM',
    seatsAvailable: 8,
    originalPriceINR: '₹7.5 Lakhs',
    discountedPriceINR: '₹3.1 Lakhs',
    discountPercentage: 58,
    operator: 'Skyline Aviation Ltd',
    verified: true,
  },
  {
    id: 'EL-02',
    flightName: 'King Air B200 Begumpet Hop',
    aircraftModel: 'Beech Super King Air B200',
    registration: 'VT-RAS',
    origin: 'Mumbai (BOM)',
    originCode: 'BOM',
    destination: 'Hyderabad (HYD)',
    destinationCode: 'HYD',
    date: '2026-10-15',
    departureTime: '03:15 PM',
    seatsAvailable: 7,
    originalPriceINR: '₹4.8 Lakhs',
    discountedPriceINR: '₹1.8 Lakhs',
    discountPercentage: 62,
    operator: 'Air Charter India DGCA',
    verified: true,
  },
  {
    id: 'EL-03',
    flightName: 'Gulfstream G550 Gulf Corridor',
    aircraftModel: 'Gulfstream G550 (Heavy Jet)',
    registration: 'N550ED',
    origin: 'Dubai (DWC)',
    originCode: 'DWC',
    destination: 'New Delhi (DEL)',
    destinationCode: 'DEL',
    date: '2026-10-16',
    departureTime: '06:00 PM',
    seatsAvailable: 14,
    originalPriceINR: '₹28 Lakhs',
    discountedPriceINR: '₹12 Lakhs',
    discountPercentage: 57,
    operator: 'Empire Aviation Dubai',
    verified: true,
  },
  {
    id: 'EL-04',
    flightName: 'Sikorsky S-76D Rotary Reposition',
    aircraftModel: 'Sikorsky S-76D (Twin Engine)',
    registration: 'VT-BBN',
    origin: 'Bangalore (BLR)',
    originCode: 'BLR',
    destination: 'Chennai (MAA)',
    destinationCode: 'MAA',
    date: '2026-10-17',
    departureTime: '09:00 AM',
    seatsAvailable: 8,
    originalPriceINR: '₹3.2 Lakhs',
    discountedPriceINR: '₹1.4 Lakhs',
    discountPercentage: 56,
    operator: 'Pawan Hans / Apex Rotary',
    verified: true,
  },
];

// MISSION / EVENT TYPES FOR BOOKING
export const HELICOPTER_EVENTS = [
  'Marriage & Wedding Grand Entry',
  'Flower Shower / Flower Rain Ceremony',
  'VIP Political Campaign & Election Rallies',
  'Executive Business Meetings & Site Inspections',
  'Char Dham & Sacred Temple Pilgrimages',
  'Birthday & Milestone Celebration Entry',
  'Aerial Survey & Cinematic Film Shoot',
  'Emergency Hospital ICU Medevac',
  'Luxury Resort & Helipad Direct Hop',
  'Other Bespoke Rotary Mission',
];

export const AIRCRAFT_EVENTS = [
  'Corporate Executive Business Meetups',
  'Ultra-HNWI Private & Family Vacation',
  'Aircraft Dry / Wet Leasing Requisition',
  'Confirmed Empty Leg & Ferry Booking',
  'Birthday, Anniversary & Milestone Parties',
  'Sports, Film & Entertainment Delegations',
  'Diplomatic State & Sovereign Missions',
  'International Bed-to-Bed Air Ambulance',
  'Other Corporate Mission',
];
