'use client';

import { useState } from 'react';
import { Plane, Calendar, MapPin, Users, Shield, ArrowRight, Play, CheckCircle2, Sparkles, Clock, Gauge, Compass, Globe } from 'lucide-react';
import AviationCharterModal from '@/components/aviation/AviationCharterModal';
import { useLuxuryUI } from '@/components/layout/LuxuryShell';
import { useCountry } from '@/lib/countryContext';
import Link from 'next/link';

interface AircraftModel {
  id: string;
  name: string;
  category: 'jet' | 'helicopter' | 'seaplane';
  typeLabel: string;
  tagline: string;
  engines: string;
  flyingHours: string;
  speed: string;
  range: string;
  passengers: number;
  usdPrice: number;
  usdCharterHourly: number;
  recommendedRoutes: string[];
  allowedMissions: string[];
  imageUrl: string;
  videoPreviewUrl: string;
  operator: string;
  operatorLocation: string;
}

const fleet: AircraftModel[] = [
  {
    id: 'g700-flagship',
    name: 'Gulfstream G700 Intercontinental Flagship',
    category: 'jet',
    typeLabel: 'Ultra-Long-Range Heavy Jet',
    tagline: 'The pinnacle of business aviation. Non-stop global intercontinental range with zero refueling stops.',
    engines: 'Twin Rolls-Royce Pearl 700 Turbofans (18,250 lbf each)',
    flyingHours: '185 Total Time (Under Factory Warranty)',
    speed: 'Mach 0.925 Max / Mach 0.85 Cruise',
    range: '7,750 Nautical Miles (14,353 km)',
    passengers: 19,
    usdPrice: 75000000,
    usdCharterHourly: 12500,
    recommendedRoutes: ['Mumbai ➔ New York JFK', 'London Luton ➔ Dubai', 'Dubai ➔ Los Angeles', 'Geneva ➔ Tokyo'],
    allowedMissions: ['Transatlantic Corporate M&A', 'Diplomatic Delegation', 'Bespoke World Tour'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg/1280px-Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg',
    videoPreviewUrl: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=800&auto=format&fit=crop',
    operator: 'Marcus Von Berg · Geneva Air Desk',
    operatorLocation: 'Geneva / Dubai / London',
  },
  {
    id: 'global-7500',
    name: 'Bombardier Global 7500 Master Suite',
    category: 'jet',
    typeLabel: 'Four-Zone Ultra-Long-Range Jet',
    tagline: 'Four true living spaces, permanent master bedroom suite, and Nuage zero-gravity seating.',
    engines: 'Twin GE Passport Engines (18,920 lbf each)',
    flyingHours: '320 Airframe Hours',
    speed: 'Mach 0.925 Max Operating',
    range: '7,700 Nautical Miles',
    passengers: 17,
    usdPrice: 68000000,
    usdCharterHourly: 11800,
    recommendedRoutes: ['Bangalore ➔ San Francisco', 'London Farnborough ➔ New York', 'Delhi ➔ Tokyo Haneda'],
    allowedMissions: ['Global Family Office Summit', 'Sovereign Head of State Flight', 'Executive Transpacific'],
    imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?q=80&w=800&auto=format&fit=crop',
    operator: 'Capt. Rajeshwar Varma · Skyline Aviation',
    operatorLocation: 'Mumbai / Dubai / London',
  },
  {
    id: 'learjet-75-liberty',
    name: 'Bombardier Learjet 75 Executive Express',
    category: 'jet',
    typeLabel: 'Mid-Size High-Speed Jet',
    tagline: 'Ideal for rapid point-to-point regional charter e.g. Goa to Hyderabad, London to Nice, or Teterboro to Miami.',
    engines: 'Twin Honeywell TFE731-40BR Turbofans',
    flyingHours: '940 Airframe Hours',
    speed: '465 Knots (Mach 0.81)',
    range: '2,040 Nautical Miles',
    passengers: 8,
    usdPrice: 11000000,
    usdCharterHourly: 4500,
    recommendedRoutes: ['Goa ➔ Hyderabad (1h 10m)', 'London ➔ Nice (2h 05m)', 'Teterboro ➔ Miami (2h 45m)', 'Dubai ➔ Riyadh (1h 45m)'],
    allowedMissions: ['Executive Medical Summit', 'Rapid Same-Day Return Business', 'Private Resort Access'],
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop',
    operator: 'Capt. Rajeshwar Varma · Skyline Aviation',
    operatorLocation: 'Goa / Hyderabad / Dubai / London',
  },
  {
    id: 'sikorsky-s76d',
    name: 'Sikorsky S-76D Royal VIP Helicopter',
    category: 'helicopter',
    typeLabel: 'Twin-Turbine Executive Rotorcraft',
    tagline: 'Quiet cabin technology, active vibration control, certified for wedding flower showers, rooftop palace and Monaco helipad landings.',
    engines: 'Twin Pratt & Whitney Canada PW210S Turboshafts (1,050 shp)',
    flyingHours: '410 Rotor Hours',
    speed: '155 Knots Cruise',
    range: '450 Nautical Miles',
    passengers: 8,
    usdPrice: 52000000,
    usdCharterHourly: 2600,
    recommendedRoutes: ['Monaco Heliport ➔ Nice Airport (7m)', 'Udaipur Airport ➔ Lake Palace', 'London Battersea ➔ Silverstone', 'Miami ➔ Palm Beach'],
    allowedMissions: ['Wedding VIP Grand Entrances', 'Ceremonial Flower Petal Drops', 'Executive Airport Transfers'],
    imageUrl: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop',
    operator: 'Deccan Royal Helo Syndicate',
    operatorLocation: 'Goa / Udaipur / Monaco / London',
  },
  {
    id: 'airbus-h145-vip',
    name: 'Airbus H145 Stylence VIP Helicopter',
    category: 'helicopter',
    typeLabel: 'Five-Blade Multi-Mission Rotorcraft',
    tagline: 'Fenestron shrouded tail rotor for supreme safety in crowd environments, political rallies, and luxury hotel compounds.',
    engines: 'Twin Safran Arriel 2E Turboshafts with Dual FADEC',
    flyingHours: '280 Rotor Hours',
    speed: '140 Knots Cruise',
    range: '380 Nautical Miles',
    passengers: 9,
    usdPrice: 6300000,
    usdCharterHourly: 3000,
    recommendedRoutes: ['Delhi ➔ Multi-City Political Circuit', 'Geneva ➔ St. Moritz Helipad', 'Singapore ➔ Coastal Resort'],
    allowedMissions: ['Political Party Campaign Multi-City Tours', 'Wedding Celebrations', 'Aerial Cinematography'],
    imageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop',
    operator: 'AeroCorp VIP Charters',
    operatorLocation: 'Delhi / Geneva / Singapore',
  },
  {
    id: 'daher-tbm-960',
    name: 'Daher TBM 960 Air Boat & Amphibious Turboprop',
    category: 'seaplane',
    typeLabel: 'Luxury High-Speed Seaplane / Island Hopper',
    tagline: 'Equipped for amphibious water landing, private island runway access, and short coastal hops.',
    engines: 'Pratt & Whitney Canada PT6E-66XT Turboprop (850 shp)',
    flyingHours: '120 Total Time',
    speed: '330 Knots Max Cruise',
    range: '1,730 Nautical Miles',
    passengers: 6,
    usdPrice: 5000000,
    usdCharterHourly: 2200,
    recommendedRoutes: ['Cochin ➔ Lakshadweep Atolls', 'Malé ➔ Baa Atoll Resorts', 'Nice ➔ Saint-Tropez Coastal', 'Miami ➔ Key West'],
    allowedMissions: ['Private Island Access', 'Remote Coastal Expeditions', 'Marine Survey'],
    imageUrl: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=800&auto=format&fit=crop',
    operator: 'Coastal Seaplane Fleet Ltd',
    operatorLocation: 'Goa / Maldives / French Riviera',
  },
];

interface RegionalRoute {
  origin: string;
  destination: string;
  label: string;
  flightTime: string;
  recommendedJet: string;
  purpose: string;
  usdRateEstimate: number;
}

export default function AviationPage() {
  const [activeTab, setActiveTab] = useState<'charter' | 'sales'>('charter');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'jet' | 'helicopter' | 'seaplane'>('all');
  const [selectedAircraftForModal, setSelectedAircraftForModal] = useState<AircraftModel | null>(null);
  const [isCharterModalOpen, setIsCharterModalOpen] = useState(false);
  const [customOrigin, setCustomOrigin] = useState('');
  const [customDestination, setCustomDestination] = useState('');
  const { openEnquiry } = useLuxuryUI();
  const { country, formatPrice, formatHourlyRate } = useCountry();

  const getCountryRoutes = (): RegionalRoute[] => {
    switch (country.code) {
      case 'ae':
        return [
          {
            origin: 'Dubai Al Maktoum (DWC)',
            destination: 'Geneva Cointrin (GVA)',
            label: 'Dubai ➔ Geneva Private Banking Corridor',
            flightTime: '6h 30m',
            recommendedJet: 'Gulfstream G700 / Global 7500',
            purpose: 'Sovereign Wealth Executive & Banking Mandate',
            usdRateEstimate: 85000,
          },
          {
            origin: 'Dubai International (DXB)',
            destination: 'Malé Velana (MLE)',
            label: 'Dubai ➔ Maldives Private Island',
            flightTime: '4h 15m',
            recommendedJet: 'Learjet 75 / Challenger 350',
            purpose: 'Ultra-Luxury Atoll Resort Direct Charter',
            usdRateEstimate: 38000,
          },
          {
            origin: 'Abu Dhabi Al Bateen (AZI)',
            destination: 'London Farnborough (FAB)',
            label: 'Abu Dhabi ➔ London Sovereign Office',
            flightTime: '7h 15m',
            recommendedJet: 'Bombardier Global 7500',
            purpose: 'Diplomatic & Cross-Border Syndicate',
            usdRateEstimate: 92000,
          },
          {
            origin: 'Dubai Heliport',
            destination: 'Abu Dhabi Yas Marina Circuit',
            label: 'Dubai ➔ Yas Marina Grand Prix Heli',
            flightTime: '30m Rotor Mission',
            recommendedJet: 'Sikorsky S-76D VIP Helicopter',
            purpose: 'Formula 1 VIP Paddock Transfer',
            usdRateEstimate: 8500,
          },
        ];
      case 'uk':
        return [
          {
            origin: 'London Farnborough (FAB)',
            destination: 'Nice Côte d\'Azur (NCE)',
            label: 'London ➔ Nice French Riviera Weekend',
            flightTime: '2h 05m',
            recommendedJet: 'Learjet 75 / Citation Latitude',
            purpose: 'Monaco Yacht Show & Private Villa Retreat',
            usdRateEstimate: 16500,
          },
          {
            origin: 'London Luton (LTN)',
            destination: 'New York JFK (JFK)',
            label: 'London ➔ New York Transatlantic Corridor',
            flightTime: '7h 45m',
            recommendedJet: 'Gulfstream G700 Flagship',
            purpose: 'Bilateral Wall Street / Mayfair Corporate M&A',
            usdRateEstimate: 89000,
          },
          {
            origin: 'London Biggin Hill (BQH)',
            destination: 'Samedan St. Moritz (SMV)',
            label: 'London ➔ St. Moritz Alpine Ski Express',
            flightTime: '1h 45m',
            recommendedJet: 'Pilatus PC-24 / Learjet 75',
            purpose: 'High-Altitude Alpine Chalet Access',
            usdRateEstimate: 18500,
          },
          {
            origin: 'London Battersea Heliport',
            destination: 'Silverstone Grand Prix Circuit',
            label: 'London ➔ Silverstone F1 Heli Transfer',
            flightTime: '25m Rotary Mission',
            recommendedJet: 'Airbus H145 VIP Helicopter',
            purpose: 'VIP Paddock Airside Direct Arrival',
            usdRateEstimate: 7500,
          },
        ];
      case 'us':
        return [
          {
            origin: 'Teterboro NJ/NY (TEB)',
            destination: 'Miami Opa-Locka (OPF)',
            label: 'New York ➔ Miami Executive Express',
            flightTime: '2h 45m',
            recommendedJet: 'Learjet 75 / Challenger 350',
            purpose: 'Art Basel & Private Equity Winter Summit',
            usdRateEstimate: 22000,
          },
          {
            origin: 'Van Nuys LA (VNY)',
            destination: 'Aspen Pitkin County (ASE)',
            label: 'Los Angeles ➔ Aspen Mountain Express',
            flightTime: '2h 10m',
            recommendedJet: 'Bombardier Global 7500',
            purpose: 'Private Ski Chalet & Winter Retreat',
            usdRateEstimate: 26000,
          },
          {
            origin: 'New York JFK (JFK)',
            destination: 'London Stansted (STN)',
            label: 'New York ➔ London Transatlantic Non-stop',
            flightTime: '6h 50m',
            recommendedJet: 'Gulfstream G700 Intercontinental',
            purpose: 'Intercontinental Family Office Deployment',
            usdRateEstimate: 88000,
          },
          {
            origin: 'Miami Helipad',
            destination: 'Palm Beach Ocean Estate',
            label: 'Miami ➔ Palm Beach Heli Transit',
            flightTime: '20m Rotary Mission',
            recommendedJet: 'Sikorsky S-76D VIP',
            purpose: 'Private Estate Lawn & Island Access',
            usdRateEstimate: 6500,
          },
        ];
      case 'mc':
        return [
          {
            origin: 'Monaco Heliport (MCM)',
            destination: 'Nice Côte d\'Azur Airport (NCE)',
            label: 'Monaco ➔ Nice Côte d\'Azur Airport',
            flightTime: '7m Express Helicopter',
            recommendedJet: 'Airbus H145 Stylence VIP',
            purpose: 'Yacht-to-Airliner Instant Connection',
            usdRateEstimate: 3200,
          },
          {
            origin: 'Monaco Port Hercule',
            destination: 'Saint-Tropez Pampelonne Beach',
            label: 'Monaco ➔ Saint-Tropez Beach Heli Shuttle',
            flightTime: '20m Coastal Helicopter',
            recommendedJet: 'Sikorsky S-76D Royal Rotorcraft',
            purpose: 'Club 55 & Yacht Charter Rendezvous',
            usdRateEstimate: 6200,
          },
          {
            origin: 'Nice Côte d\'Azur (NCE)',
            destination: 'Ibiza Private Terminal (IBZ)',
            label: 'Riviera ➔ Ibiza Sunset Jet Charter',
            flightTime: '1h 15m',
            recommendedJet: 'Learjet 75 Liberty',
            purpose: 'Balearic Island VIP Summer Season',
            usdRateEstimate: 14500,
          },
          {
            origin: 'Nice Côte d\'Azur (NCE)',
            destination: 'Geneva Cointrin (GVA)',
            label: 'Nice ➔ Geneva Lake Leman Flight',
            flightTime: '45m High-Speed Jet',
            recommendedJet: 'Learjet 75 / Citation',
            purpose: 'Riviera to Swiss Bank Executive Flight',
            usdRateEstimate: 11500,
          },
        ];
      case 'ch':
        return [
          {
            origin: 'Geneva Cointrin (GVA)',
            destination: 'London Farnborough (FAB)',
            label: 'Geneva ➔ London Mayfair Private Office',
            flightTime: '1h 35m',
            recommendedJet: 'Learjet 75 / Global 7500',
            purpose: 'Private Banking & Asset Management Audit',
            usdRateEstimate: 15500,
          },
          {
            origin: 'Zurich Kloten (ZRH)',
            destination: 'Samedan St. Moritz Helipad',
            label: 'Zurich ➔ St. Moritz Alpine Shuttle',
            flightTime: '35m VIP Helicopter',
            recommendedJet: 'Sikorsky S-76D Royal VIP',
            purpose: 'Engadin Ski & World Economic Summit',
            usdRateEstimate: 8200,
          },
          {
            origin: 'Geneva Cointrin (GVA)',
            destination: 'Dubai Al Maktoum (DWC)',
            label: 'Geneva ➔ Dubai DIFC Corridors',
            flightTime: '6h 15m',
            recommendedJet: 'Gulfstream G700 Flagship',
            purpose: 'Swiss-Gulf Sovereign Cross-Investment',
            usdRateEstimate: 82000,
          },
          {
            origin: 'Zurich Kloten (ZRH)',
            destination: 'Paris Le Bourget (LBG)',
            label: 'Zurich ➔ Paris Le Bourget Haute Horlogerie',
            flightTime: '1h 05m',
            recommendedJet: 'Learjet 75 Executive',
            purpose: 'Collector Salon & Private Treaty Preview',
            usdRateEstimate: 14000,
          },
        ];
      case 'sg':
        return [
          {
            origin: 'Singapore Seletar (XSP)',
            destination: 'Bali Ngurah Rai (DPS)',
            label: 'Singapore ➔ Bali Luxury Resort Escape',
            flightTime: '2h 25m',
            recommendedJet: 'Learjet 75 / Challenger 350',
            purpose: 'Private Villa & Yacht Rendezvous',
            usdRateEstimate: 24000,
          },
          {
            origin: 'Singapore Changi VIP',
            destination: 'Tokyo Haneda (HND)',
            label: 'Singapore ➔ Tokyo Executive Summit',
            flightTime: '6h 45m',
            recommendedJet: 'Bombardier Global 7500',
            purpose: 'Asia-Pacific Multi-Family Office Tour',
            usdRateEstimate: 78000,
          },
          {
            origin: 'Singapore Seletar (XSP)',
            destination: 'Phuket International (HKT)',
            label: 'Singapore ➔ Phuket Andaman Island Villa',
            flightTime: '1h 25m',
            recommendedJet: 'Learjet 75 Liberty',
            purpose: 'Superyacht Boarding & Island Access',
            usdRateEstimate: 15000,
          },
          {
            origin: 'Marina Bay Sands Helipad',
            destination: 'Bawah Reserve Private Island',
            label: 'Singapore ➔ Anambas Islands Amphibious Flight',
            flightTime: '1h 10m Water Landing',
            recommendedJet: 'Daher TBM 960 Seaplane',
            purpose: 'Exclusive Eco-Sanctuary Lagoon Landing',
            usdRateEstimate: 9500,
          },
        ];
      case 'in':
      default:
        return [
          {
            origin: 'Goa International (GOI/GOX)',
            destination: 'Hyderabad Begumpet (HYD)',
            label: 'Goa ➔ Hyderabad Executive Weekend',
            flightTime: '1h 10m Rapid Transit',
            recommendedJet: 'Learjet 75 Executive Express',
            purpose: 'Executive Board Summit & Urgent Regional Flight',
            usdRateEstimate: 12500,
          },
          {
            origin: 'Mumbai CSMIA (BOM)',
            destination: 'New York JFK (JFK)',
            label: 'Mumbai ➔ New York (India to USA Non-Stop)',
            flightTime: '15h 30m Ultra-Long-Range',
            recommendedJet: 'Gulfstream G700 / Global 7500',
            purpose: 'Transatlantic Corporate M&A & Sovereign Family Office',
            usdRateEstimate: 175000,
          },
          {
            origin: 'Delhi IGI Safdarjung (DEL)',
            destination: 'Varanasi / Lucknow / Patna',
            label: 'Delhi ➔ Multi-State Political Campaign Tour',
            flightTime: 'Daily Standby Dispatch',
            recommendedJet: 'Airbus H145 VIP Helicopter',
            purpose: 'Political Party Campaign VIP Transport with Rally Clearances',
            usdRateEstimate: 52000,
          },
          {
            origin: 'Udaipur Airport (UDR)',
            destination: 'Lake Palace Helipad, Udaipur',
            label: 'Udaipur Helipad ➔ Lake Palace Wedding Shower',
            flightTime: '25m Flight + Petal Shower Clearance',
            recommendedJet: 'Sikorsky S-76D Royal Rotorcraft',
            purpose: 'Royal Wedding Grand Groom Entrance & Rose Petal Drops',
            usdRateEstimate: 8500,
          },
        ];
    }
  };

  const currentRoutes = getCountryRoutes();

  const filteredFleet = fleet.filter((ac) => {
    if (selectedCategory === 'all') return true;
    return ac.category === selectedCategory;
  });

  const handleBookRoute = (route: RegionalRoute) => {
    setCustomOrigin(route.origin);
    setCustomDestination(route.destination);
    const matchingAircraft = fleet.find((f) => f.name.toLowerCase().includes(route.recommendedJet.split(' ')[0].toLowerCase())) || fleet[0];
    setSelectedAircraftForModal(matchingAircraft);
    setIsCharterModalOpen(true);
  };

  const handleBookAircraft = (aircraft: AircraftModel) => {
    setCustomOrigin(currentRoutes[0].origin);
    setCustomDestination(currentRoutes[0].destination);
    setSelectedAircraftForModal(aircraft);
    setIsCharterModalOpen(true);
  };

  return (
    <div className="bg-[#FCFBF7] text-[#080B09] min-h-screen pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Global Jurisdiction Awareness Bar */}
        <div className="mb-6 p-4 rounded-xl bg-[#061C16] border border-[#C6A15B]/40 text-white flex flex-wrap items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{country.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-bold">
                  Active Sovereign Flight Desk
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[9px] font-mono uppercase">
                  Part 135 Compliant
                </span>
              </div>
              <p className="text-xs sm:text-sm font-serif font-bold text-white mt-0.5">
                {country.name} · {country.hubName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[9px] uppercase tracking-wider text-[#F6F3EA]/60 block font-mono">
                Currency &amp; Base Rate
              </span>
              <span className="text-xs font-mono font-bold text-[#E8D48A]">
                1 USD = {country.usdRate} {country.currency}
              </span>
            </div>
            <Link
              href="/portal"
              className="px-3.5 py-1.5 rounded bg-[#C6A15B] text-[#061C16] text-[10px] font-bold uppercase tracking-widest hover:bg-[#E0C17E] transition-all"
            >
              Broker Portal
            </Link>
          </div>
        </div>

        {/* Hero Section with High-Contrast Deep Emerald Headings */}
        <div className="text-center max-w-4xl mx-auto py-8 sm:py-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#7A5410] font-extrabold bg-[#F5EEDB] px-3.5 py-1 rounded-full border border-[#C6A15B]/30">
            <Plane className="w-3.5 h-3.5 text-[#7A5410]" />
            <span>GLOBAL PRIVATE AVIATION SYNDICATE</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#061C16] tracking-tight leading-none drop-shadow-sm">
            PRIVATE JETS &amp; VIP ROTARY
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#143327] font-semibold italic">
            Direct Intercontinental Charters, Heli Missions, and Bilateral Aircraft Acquisitions.
          </p>

          <p className="text-xs sm:text-sm text-[#1A2E24] font-medium leading-relaxed max-w-2xl mx-auto pt-2">
            Discreet charter dispatch, long-range heavy jet positioning, and turnkey aircraft ownership transfers under strict FAA, EASA, and DGCA Part 135 airworthiness standards.
          </p>
        </div>

        {/* Mode Selector Tabs (Charter vs Sales) */}
        <div className="flex items-center justify-between border-b border-[#D0C9BA] pb-6 mb-8 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('charter')}
              className={`px-6 py-3.5 text-xs uppercase tracking-[0.25em] font-extrabold transition-all rounded-lg shadow-sm ${
                activeTab === 'charter'
                  ? 'bg-[#061C16] text-[#F3E2B8] border border-[#061C16]'
                  : 'bg-white text-[#061C16] border border-[#D0C9BA] hover:border-[#061C16]'
              }`}
            >
              1. PRIVATE CHARTER &amp; MISSIONS
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`px-6 py-3.5 text-xs uppercase tracking-[0.25em] font-extrabold transition-all rounded-lg shadow-sm ${
                activeTab === 'sales'
                  ? 'bg-[#061C16] text-[#F3E2B8] border border-[#061C16]'
                  : 'bg-white text-[#061C16] border border-[#D0C9BA] hover:border-[#061C16]'
              }`}
            >
              2. AIRCRAFT SALES &amp; SYNDICATES
            </button>
          </div>

          {/* Subcategories Filter */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-[#D0C9BA]">
            {(['all', 'jet', 'helicopter', 'seaplane'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold rounded transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#061C16] text-[#F3E2B8]'
                    : 'text-[#4A5E53] hover:text-[#061C16]'
                }`}
              >
                {cat === 'all' ? 'All Craft' : cat === 'jet' ? 'Jets' : cat === 'helicopter' ? 'Helicopters' : 'Air Boats'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Instant Dispatch Regional Routes */}
        {activeTab === 'charter' && (
          <div className="mb-16 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A5410] font-extrabold bg-[#F5EEDB] px-2.5 py-0.5 rounded border border-[#C6A15B]/30 block w-fit mb-1">
                  REGIONAL ROUTING CORRIDORS ({country.currency})
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#061C16]">
                  Curated Executive Flights for {country.name}
                </h3>
              </div>
              <span className="text-xs text-[#3C4E44] font-semibold">
                Instant Operator Slot Allocation
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentRoutes.map((route, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-[#D8D3C8] rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-[#061C16] transition-all hover:shadow-xl group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A5410] font-mono font-bold block bg-[#F9F8F5] px-2 py-0.5 rounded w-fit border border-[#D8D3C8]">
                      {route.flightTime}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#061C16] group-hover:text-[#0A3324] leading-snug">
                      {route.label}
                    </h4>
                    <p className="text-xs text-[#203127] font-medium leading-relaxed">
                      {route.purpose}
                    </p>
                    <div className="text-[10px] text-[#7A5410] font-bold pt-1">
                      Aircraft: {route.recommendedJet}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D8D3C8] flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#4D6055] font-bold block">
                        EST. CHARTER
                      </span>
                      <span className="font-serif font-extrabold text-base text-[#061C16]">
                        {formatPrice(route.usdRateEstimate)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleBookRoute(route)}
                      className="px-3.5 py-2 bg-[#061C16] text-[#F3E2B8] text-[10px] uppercase tracking-widest font-bold hover:bg-[#0D382A] hover:text-white transition-all rounded"
                    >
                      BOOK
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aircraft Fleet Grid with Punchy High-Contrast Typography */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#061C16]">
              {activeTab === 'charter' ? 'Available Fleet for Charter Dispatch' : 'Certified Aircraft for Acquisition & Sale'}
            </h3>
            <span className="text-xs text-[#3C4E44] font-bold bg-[#EFECE4] px-3 py-1 rounded-full">
              {filteredFleet.length} Verified Airframes
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredFleet.map((aircraft) => (
              <div
                key={aircraft.id}
                className="bg-white border-2 border-[#D8D3C8] hover:border-[#061C16] rounded-2xl transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col justify-between"
              >
                {/* Image Stage with Info Overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#061C16]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url('${aircraft.imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04130D]/95 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#061C16]/95 border border-[#C6A15B] text-[#E8D48A] text-[10px] font-bold uppercase tracking-[0.2em] rounded backdrop-blur-sm shadow">
                      {aircraft.typeLabel}
                    </span>
                    <span className="px-2.5 py-1 bg-black/80 border border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded">
                      {aircraft.speed}
                    </span>
                  </div>

                  {/* Bottom Image Spec strip */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                    <div className="flex items-center gap-1.5 drop-shadow">
                      <Users className="w-4 h-4 text-[#E8D48A]" />
                      <span>{aircraft.passengers} VIP Club Seats</span>
                    </div>
                    <div className="flex items-center gap-1.5 drop-shadow">
                      <Compass className="w-4 h-4 text-[#E8D48A]" />
                      <span>Range: {aircraft.range}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section with High-Contrast Typography */}
                <div className="p-7 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A5410] font-extrabold bg-[#F5EEDB] px-3 py-1 rounded inline-block border border-[#C6A15B]/30 mb-2">
                        OPERATOR: {aircraft.operator} ({aircraft.operatorLocation})
                      </span>
                      <h4 className="font-serif text-2xl sm:text-[1.85rem] font-bold text-[#061C16] leading-snug tracking-tight">
                        {aircraft.name}
                      </h4>
                      <p className="text-[13px] sm:text-sm text-[#1F2C24] font-medium leading-relaxed mt-2">
                        {aircraft.tagline}
                      </p>
                    </div>

                    {/* Detailed Specifications Box */}
                    <div className="bg-[#F9F8F5] border border-[#D0C9BA] rounded-xl p-4 sm:p-5 text-xs space-y-3 shadow-sm">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-[#4D6055] font-bold block mb-0.5">
                            POWERPLANT / ENGINES:
                          </span>
                          <span className="font-bold text-[#061C16] text-xs sm:text-[13px] leading-tight block">
                            {aircraft.engines}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-[#4D6055] font-bold block mb-0.5">
                            AIRFRAME / FLYING HOURS:
                          </span>
                          <span className="font-bold text-[#061C16] text-xs sm:text-[13px] leading-tight block">
                            {aircraft.flyingHours}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#D0C9BA]">
                        <span className="text-[9px] uppercase tracking-wider text-[#4D6055] font-bold block mb-1.5">
                          VERIFIED MISSIONS &amp; USES:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {aircraft.allowedMissions.map((mission, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-white border border-[#D0C9BA] text-[10px] font-bold text-[#061C16] rounded shadow-xs"
                            >
                              &bull; {mission}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Price Bar */}
                  <div className="pt-6 border-t border-[#D0C9BA] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#4D6055] font-bold block mb-0.5">
                        {activeTab === 'charter' ? 'HOURLY CHARTER RATE' : 'ASKING ACQUISITION VALUATION'}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#061C16] tracking-tight">
                          {activeTab === 'charter'
                            ? formatHourlyRate(aircraft.usdCharterHourly)
                            : formatPrice(aircraft.usdPrice)}
                        </span>
                        <span className="text-[10px] text-[#7A5410] font-mono font-bold bg-[#F5EEDB] px-2 py-0.5 rounded border border-[#C6A15B]/30">
                          {country.currency}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {activeTab === 'charter' ? (
                        <button
                          onClick={() => handleBookAircraft(aircraft)}
                          className="px-6 py-3.5 bg-[#061C16] hover:bg-[#0D382A] text-[#F3E2B8] hover:text-white text-[11px] uppercase tracking-[0.2em] font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 rounded border border-[#C6A15B]/40"
                        >
                          BOOK CHARTER FLIGHT
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            openEnquiry({
                              title: `Acquisition Prospectus: ${aircraft.name}`,
                              subtitle: `Valuation: ${formatPrice(aircraft.usdPrice)}. Receive complete logbooks, avionics documentation, and bilateral purchase contract.`,
                              assetTitle: aircraft.name,
                              defaultVertical: 'Private Aviation',
                            })
                          }
                          className="px-6 py-3.5 bg-[#061C16] hover:bg-[#0D382A] text-[#F3E2B8] hover:text-white text-[11px] uppercase tracking-[0.2em] font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 rounded border border-[#C6A15B]/40"
                        >
                          REQUEST PROSPECTUS
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Concierge Assistance */}
        <div className="mt-20 p-8 sm:p-12 rounded-2xl bg-[#061C16] border-2 border-[#C6A15B]/40 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-2 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-bold">
              CROSS-BORDER MULTI-CURRENCY CONCIERGE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Custom Flight Corridors in {country.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#F6F3EA]/80 font-light leading-relaxed">
              Require diplomatic clearance, armed close protection, or specialized cargo transit across {country.hubName}? Our 24/7 global flight dispatch officers manage your itinerary end-to-end.
            </p>
          </div>

          <button
            onClick={() =>
              openEnquiry({
                title: 'Bespoke Sovereign Aviation Mission',
                subtitle: `Operating from ${country.hubName}. Multi-leg, political campaign, or long-range charter dispatch.`,
                defaultVertical: 'Private Aviation',
              })
            }
            className="relative z-10 px-8 py-4 bg-[#C6A15B] hover:bg-[#E0C17E] text-[#061C16] text-xs font-bold uppercase tracking-[0.22em] transition-all shadow-lg hover:-translate-y-0.5 whitespace-nowrap rounded"
          >
            DISPATCH CUSTOM FLIGHT
          </button>
        </div>

      </div>

      {/* Live Charter Modal */}
      {selectedAircraftForModal && (
        <AviationCharterModal
          isOpen={isCharterModalOpen}
          onClose={() => setIsCharterModalOpen(false)}
          prefillAircraft={selectedAircraftForModal.name}
          prefillRoute={{
            origin: customOrigin,
            destination: customDestination,
            label: `${customOrigin} ➔ ${customDestination}`,
          }}
          prefillMission={selectedAircraftForModal.allowedMissions[0]}
        />
      )}
    </div>
  );
}
