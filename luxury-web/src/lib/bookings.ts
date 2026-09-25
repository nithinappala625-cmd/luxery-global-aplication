'use client';

export interface BookingRequest {
  id: string;
  category: 'aviation' | 'marine' | 'custom';
  serviceType: 'private_jet_charter' | 'helicopter_mission' | 'yacht_charter' | 'event_party' | 'custom_flight';
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  organization?: string;
  origin?: string;
  destination?: string;
  routeLabel: string;
  departureDate: string;
  departureTime?: string;
  returnDate?: string;
  passengers: number;
  missionPurpose: string; // e.g. "Executive Board Summit", "Wedding Flower Shower", "Political Rally", "Private Party"
  budgetEstimated?: string;
  specialRequests?: string;
  status: 'pending' | 'quoted' | 'assigned' | 'confirmed' | 'completed';
  assignedAsset?: string;
  assignedBrokerOrOwner?: string;
  quotationAmount?: string;
  createdAt: string;
}

export interface CustomUploadedAsset {
  id: string;
  category: 'aviation' | 'marine' | 'automotive' | 'watches' | 'jewellery';
  subCategory: string; // e.g. 'Private Jets', 'VIP Helicopters', 'Mega Yachts', 'Natural Diamonds', 'High Complications'
  title: string;
  model: string;
  manufacturer: string;
  year: string;
  priceOrRate: string;
  listingMode: 'sale' | 'charter' | 'both';
  specs: {
    engines?: string;
    flyingHours?: string;
    speed?: string;
    range?: string;
    seatingCapacity?: number;
    loa?: string; // Length Overall for yachts
    cabins?: string;
    carat?: string;
    clarity?: string;
    cut?: string;
    movement?: string;
    caseMaterial?: string;
  };
  allowedUses?: string[]; // e.g. ['Executive Travel', 'Weddings', 'Flower Showers', 'Political Campaigns', 'Private Parties']
  imageUrl: string;
  videoUrl?: string;
  sellerName: string;
  sellerType: 'independent_broker' | 'fleet_owner' | 'authorized_dealer' | 'operator' | 'private_collector';
  sellerLocation: string;
  sellerPhone: string;
  sellerEmail: string;
  verified: boolean;
  createdAt: string;
}

export interface BrokerOrOwnerProfile {
  id: string;
  name: string;
  type: 'independent_broker' | 'fleet_owner' | 'authorized_dealer' | 'operator' | 'private_collector';
  sector: 'aviation' | 'marine' | 'automotive' | 'watches' | 'jewellery' | 'multi_asset';
  location: string;
  credentials: string;
  activeInventoryCount: number;
  completedDeals: number;
  rating: number;
  phone: string;
  email: string;
  verified: boolean;
  avatarUrl: string;
}

const STORAGE_KEY_BOOKINGS = 'npgroups_booking_requests_v1';
const STORAGE_KEY_LISTINGS = 'npgroups_custom_listings_v1';

export const INITIAL_BROKERS: BrokerOrOwnerProfile[] = [
  {
    id: 'brk-01',
    name: 'Capt. Rajeshwar Varma',
    type: 'fleet_owner',
    sector: 'aviation',
    location: 'Mumbai & Goa, India',
    credentials: 'DGCA & EASA Certified Part 135 Operator · 12 Aircraft Fleet',
    activeInventoryCount: 6,
    completedDeals: 142,
    rating: 4.95,
    phone: '+91 98201 44552',
    email: 'r.varma@skyline-aviation.in',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'brk-02',
    name: 'Marcus Von Berg',
    type: 'independent_broker',
    sector: 'aviation',
    location: 'Geneva & Dubai',
    credentials: 'EBAA Accredited Aviation Broker · Long-Range Syndicate Specialist',
    activeInventoryCount: 8,
    completedDeals: 88,
    rating: 4.98,
    phone: '+41 22 710 4400',
    email: 'm.vonberg@geneva-airdesk.ch',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'brk-03',
    name: 'Aurelia Delacroix',
    type: 'fleet_owner',
    sector: 'marine',
    location: 'Monaco & Cannes, France',
    credentials: 'MYBA Member · Mediterranean Superyacht Syndicate',
    activeInventoryCount: 5,
    completedDeals: 64,
    rating: 4.92,
    phone: '+377 97 98 00 22',
    email: 'aurelia@monaco-yachts.mc',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'brk-04',
    name: 'Sameer Singhal',
    type: 'independent_broker',
    sector: 'marine',
    location: 'Goa & Mumbai Harbour',
    credentials: 'Indian Marine Charter Licentiate · Wedding & Event Yacht Specialist',
    activeInventoryCount: 4,
    completedDeals: 95,
    rating: 4.89,
    phone: '+91 98221 77889',
    email: 'sameer@goa-superyachts.com',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'brk-05',
    name: 'Philippe Dufour Vault / Laurent Mercier',
    type: 'independent_broker',
    sector: 'watches',
    location: 'Geneva & Zurich, Switzerland',
    credentials: 'Independent Horology Specialist · High Complications & Patek Philippe Provenance',
    activeInventoryCount: 14,
    completedDeals: 310,
    rating: 5.0,
    phone: '+41 79 402 1190',
    email: 'l.mercier@genevavault.ch',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'brk-06',
    name: 'Hiren Jhaveri & Sons',
    type: 'independent_broker',
    sector: 'jewellery',
    location: 'Bharat Diamond Bourse, Mumbai & Antwerp',
    credentials: 'GIA Certified Diamond Sightholder · Type IIb & Natural Colored Diamonds',
    activeInventoryCount: 22,
    completedDeals: 420,
    rating: 4.97,
    phone: '+91 98200 12345',
    email: 'hiren@jhaveridiamonds.com',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
  },
];

export const INITIAL_BOOKING_REQUESTS: BookingRequest[] = [
  {
    id: 'REQ-1001',
    category: 'aviation',
    serviceType: 'private_jet_charter',
    clientName: 'Dr. K. R. Rao & Family',
    clientPhone: '+91 98490 22331',
    clientEmail: 'dr.rao@biotech-syndicate.org',
    organization: 'Apex Biotech Syndicate',
    origin: 'Goa International (GOI)',
    destination: 'Hyderabad Begumpet (BPM)',
    routeLabel: 'Goa ➔ Hyderabad',
    departureDate: '2026-10-04',
    departureTime: '10:30 AM',
    passengers: 8,
    missionPurpose: 'Executive Medical Board Summit & Urgent Transit',
    budgetEstimated: '₹8.5 Lakhs - ₹11 Lakhs',
    specialRequests: 'Mid-size Jet (Learjet 75 / Phenom 300) with medical storage & VIP catering.',
    status: 'assigned',
    assignedAsset: 'Bombardier Learjet 75 (VT-APX)',
    assignedBrokerOrOwner: 'Capt. Rajeshwar Varma (Skyline Aviation)',
    quotationAmount: '₹9,20,000 all-inclusive',
    createdAt: '2026-09-24T14:20:00Z',
  },
  {
    id: 'REQ-1002',
    category: 'aviation',
    serviceType: 'private_jet_charter',
    clientName: 'Ananya Singhania',
    clientPhone: '+91 99201 88990',
    clientEmail: 'ananya.s@singhania-office.com',
    organization: 'Singhania Family Office',
    origin: 'Mumbai Chhatrapati Shivaji (BOM)',
    destination: 'New York JFK (JFK)',
    routeLabel: 'Mumbai ➔ New York (India to USA)',
    departureDate: '2026-10-12',
    departureTime: '02:00 AM',
    passengers: 14,
    missionPurpose: 'Transatlantic Corporate M&A Closing Summit',
    budgetEstimated: '₹1.35 Cr - ₹1.60 Cr',
    specialRequests: 'Ultra Long Range Jet (Gulfstream G700 / Global 7500), private stateroom with double bed, high-speed Ka-band WiFi, fine dining menu.',
    status: 'quoted',
    assignedAsset: 'Gulfstream G700 Ultra Flagship',
    assignedBrokerOrOwner: 'Marcus Von Berg (Geneva Air Desk)',
    quotationAmount: '₹1,48,00,000 (US$ 178,000)',
    createdAt: '2026-09-24T18:45:00Z',
  },
  {
    id: 'REQ-1003',
    category: 'aviation',
    serviceType: 'helicopter_mission',
    clientName: 'Vikramaditya Mehta',
    clientPhone: '+91 98110 33445',
    clientEmail: 'vmehta@mehtaindustries.in',
    organization: 'Mehta Heritage Group',
    origin: 'Udaipur Airport (UDR)',
    destination: 'The Leela Palace Lake Pichola, Udaipur',
    routeLabel: 'Udaipur Palace Helipad ➔ Venue',
    departureDate: '2026-10-20',
    departureTime: '04:30 PM',
    passengers: 4,
    missionPurpose: 'Wedding VIP Grand Entry & Rose Petal Flower Shower',
    budgetEstimated: '₹12 Lakhs - ₹15 Lakhs',
    specialRequests: 'Twin-engine VIP Helicopter (Sikorsky S-76D or Airbus H145) with aerial flower shower clearance over the lake ceremony venue.',
    status: 'pending',
    createdAt: '2026-09-25T08:15:00Z',
  },
  {
    id: 'REQ-1004',
    category: 'aviation',
    serviceType: 'helicopter_mission',
    clientName: 'Senior Directorate Liaison Office',
    clientPhone: '+91 94150 99881',
    clientEmail: 'transit.liaison@national-party.org',
    organization: 'State Campaign Advisory',
    origin: 'Delhi Safdarjung (VIDD)',
    destination: 'Multi-City State Rallies (UP & Bihar)',
    routeLabel: 'Delhi ➔ Lucknow ➔ Varanasi ➔ Patna',
    departureDate: '2026-10-08',
    departureTime: '07:00 AM',
    passengers: 6,
    missionPurpose: 'Political Party Campaign VIP Air Transit',
    budgetEstimated: '₹45 Lakhs - ₹55 Lakhs',
    specialRequests: 'Reliable twin-engine aircraft (Bell 525 or Leonardo AW139) with 3-day continuous standby, security clearance & experienced mountain/field pilot.',
    status: 'quoted',
    assignedBrokerOrOwner: 'Capt. Rajeshwar Varma',
    quotationAmount: '₹48,00,000 for 3-day multi-state circuit',
    createdAt: '2026-09-25T11:30:00Z',
  },
  {
    id: 'REQ-1005',
    category: 'marine',
    serviceType: 'event_party',
    clientName: 'Kunal Zaveri',
    clientPhone: '+91 98205 66778',
    clientEmail: 'kunal@zaveri-ventures.com',
    organization: 'Zaveri Private Equity',
    origin: 'Grand Hyatt Bambolim Jetty, Goa',
    destination: 'Goa Coastal Waters & Mandovi Sunset Cruise',
    routeLabel: 'Goa Coastal Waters Charter',
    departureDate: '2026-10-18',
    departureTime: '03:00 PM',
    passengers: 35,
    missionPurpose: 'Private Anniversary Celebration & Sunset Yacht Party',
    budgetEstimated: '₹15 Lakhs - ₹22 Lakhs',
    specialRequests: '40m+ Superyacht with flybridge sound system, DJ deck, 5-star live sushi & champagne bar, dedicated service crew and tender for guest transfers.',
    status: 'assigned',
    assignedAsset: 'Sunseeker 131 Yacht "Aura of Goa"',
    assignedBrokerOrOwner: 'Sameer Singhal (Goa Superyachts)',
    quotationAmount: '₹18,50,000',
    createdAt: '2026-09-25T13:00:00Z',
  },
];

export function getBookingRequests(): BookingRequest[] {
  if (typeof window === 'undefined') return INITIAL_BOOKING_REQUESTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(INITIAL_BOOKING_REQUESTS));
      return INITIAL_BOOKING_REQUESTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BOOKING_REQUESTS;
  }
}

export function saveBookingRequest(request: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>): BookingRequest {
  const all = getBookingRequests();
  const newReq: BookingRequest = {
    ...request,
    id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const updated = [newReq, ...all];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('npgroups_booking_added', { detail: newReq }));
  }
  return newReq;
}

export function updateBookingStatus(
  id: string,
  status: BookingRequest['status'],
  assignedAsset?: string,
  assignedBroker?: string,
  quotationAmount?: string
): BookingRequest[] {
  const all = getBookingRequests();
  const updated = all.map((req) => {
    if (req.id === id) {
      return {
        ...req,
        status,
        ...(assignedAsset ? { assignedAsset } : {}),
        ...(assignedBroker ? { assignedBrokerOrOwner: assignedBroker } : {}),
        ...(quotationAmount ? { quotationAmount } : {}),
      };
    }
    return req;
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('npgroups_booking_updated', { detail: { id, status } }));
  }
  return updated;
}

export function getCustomListings(): CustomUploadedAsset[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LISTINGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomListing(listing: Omit<CustomUploadedAsset, 'id' | 'createdAt' | 'verified'>): CustomUploadedAsset {
  const all = getCustomListings();
  const newListing: CustomUploadedAsset = {
    ...listing,
    id: `LST-${Date.now().toString().slice(-6)}`,
    verified: true,
    createdAt: new Date().toISOString(),
  };

  const updated = [newListing, ...all];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_LISTINGS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('npgroups_listing_added', { detail: newListing }));
  }
  return newListing;
}
