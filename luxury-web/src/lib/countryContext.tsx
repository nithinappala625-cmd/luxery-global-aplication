'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CountryJurisdiction {
  code: string;
  name: string;
  label: string;
  flag: string;
  currency: string;
  symbol: string;
  usdRate: number; // multiplier against USD
  hubName: string;
  primaryAirports: string[];
  keyMissions: string[];
}

export const SUPPORTED_COUNTRIES: CountryJurisdiction[] = [
  {
    code: 'global',
    name: 'Worldwide Sovereign Syndicate',
    label: 'Global / International',
    flag: '🌍',
    currency: 'USD',
    symbol: '$',
    usdRate: 1.0,
    hubName: 'Global International Desk',
    primaryAirports: ['New York JFK', 'London Farnborough', 'Dubai DXB', 'Geneva GVA', 'Tokyo HND'],
    keyMissions: ['Transatlantic M&A', 'Intercontinental Heavy Jet', 'Global Superyacht Charter'],
  },
  {
    code: 'ae',
    name: 'United Arab Emirates & Gulf GCC',
    label: 'UAE (Dubai / Abu Dhabi)',
    flag: '🇦🇪',
    currency: 'AED',
    symbol: 'د.إ',
    usdRate: 3.6725,
    hubName: 'Dubai DIFC & Al Maktoum Executive',
    primaryAirports: ['Dubai Al Maktoum (DWC)', 'Abu Dhabi Al Bateen (AZI)', 'Dubai International (DXB)'],
    keyMissions: ['Dubai ➔ Geneva Banking', 'Dubai ➔ Maldives (Male) Retreat', 'Abu Dhabi ➔ London Private Office'],
  },
  {
    code: 'uk',
    name: 'United Kingdom & European Commonwealth',
    label: 'United Kingdom (London)',
    flag: '🇬🇧',
    currency: 'GBP',
    symbol: '£',
    usdRate: 0.79,
    hubName: 'London Mayfair & Farnborough FBO',
    primaryAirports: ['London Farnborough (FAB)', 'London Luton (LTN)', 'Biggin Hill (BQH)', 'RAF Northolt'],
    keyMissions: ['London ➔ Nice Côte d\'Azur', 'Farnborough ➔ New York JFK', 'London ➔ St. Moritz Ski'],
  },
  {
    code: 'ch',
    name: 'Swiss Confederation & Private Banks',
    label: 'Switzerland (Geneva / Zurich)',
    flag: '🇨🇭',
    currency: 'CHF',
    symbol: 'CHF',
    usdRate: 0.90,
    hubName: 'Geneva Private Banking & Horology Desk',
    primaryAirports: ['Geneva Cointrin (GVA)', 'Zurich Kloten (ZRH)', 'Samedan St. Moritz (SMV)'],
    keyMissions: ['Geneva ➔ London Mayfair', 'Zurich ➔ St. Moritz Helipad', 'Geneva ➔ Dubai DIFC'],
  },
  {
    code: 'us',
    name: 'United States of America',
    label: 'United States (NY / Miami / LA)',
    flag: '🇺🇸',
    currency: 'USD',
    symbol: '$',
    usdRate: 1.0,
    hubName: 'New York Manhattan & Palm Beach Syndicate',
    primaryAirports: ['Teterboro NJ/NY (TEB)', 'Miami Opa-Locka (OPF)', 'Van Nuys Los Angeles (VNY)', 'Aspen Pitkin (ASE)'],
    keyMissions: ['Teterboro ➔ Miami Beach', 'Los Angeles ➔ Aspen Mountain', 'New York JFK ➔ London Stansted'],
  },
  {
    code: 'mc',
    name: 'Principality of Monaco & French Riviera',
    label: 'Monaco & French Riviera',
    flag: '🇲🇨',
    currency: 'EUR',
    symbol: '€',
    usdRate: 0.92,
    hubName: 'Port Hercule & Monte-Carlo Heliport',
    primaryAirports: ['Monaco Heliport (MCM)', 'Nice Côte d\'Azur (NCE)', 'Cannes Mandelieu (CEQ)'],
    keyMissions: ['Monaco Heliport ➔ Nice Airport (7m)', 'Port Hercule ➔ Saint-Tropez Yacht Tour', 'Cannes ➔ Ibiza Club Flight'],
  },
  {
    code: 'in',
    name: 'Republic of India & South Asia',
    label: 'India (Mumbai / Delhi / Goa)',
    flag: '🇮🇳',
    currency: 'INR',
    symbol: '₹',
    usdRate: 83.5,
    hubName: 'Mumbai Marine Drive & Delhi Lutyens FBO',
    primaryAirports: ['Mumbai CSMIA (BOM)', 'Delhi IGI Terminal (DEL)', 'Goa Dabolim & Mopa (GOI/GOX)', 'Hyderabad Begumpet (HYD)', 'Udaipur Dabok (UDR)'],
    keyMissions: ['Goa ➔ Hyderabad VIP Weekend (1h 10m)', 'Mumbai ➔ New York JFK Non-stop', 'Udaipur Lake Palace Heli Shower', 'Delhi ➔ Multi-State Political Campaign'],
  },
  {
    code: 'sg',
    name: 'Singapore & Asia-Pacific Hub',
    label: 'Singapore (Marina Bay)',
    flag: '🇸🇬',
    currency: 'SGD',
    symbol: 'S$',
    usdRate: 1.35,
    hubName: 'Singapore Seletar & Marina Bay Sands VIP',
    primaryAirports: ['Singapore Seletar (XSP)', 'Changi VIP Jet Quay (SIN)', 'Hong Kong International (HKG)'],
    keyMissions: ['Singapore ➔ Bali Denpasar (DPS)', 'Singapore ➔ Tokyo Haneda', 'Singapore ➔ Phuket Luxury Villa'],
  },
];

interface CountryContextType {
  country: CountryJurisdiction;
  setCountryCode: (code: string) => void;
  formatPrice: (usdBase: number) => string;
  formatHourlyRate: (usdHourly: number) => string;
}

const CountryContext = createContext<CountryContextType>({
  country: SUPPORTED_COUNTRIES[0],
  setCountryCode: () => {},
  formatPrice: (val) => `$${val.toLocaleString()}`,
  formatHourlyRate: (val) => `$${val.toLocaleString()} / hr`,
});

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [selectedCode, setSelectedCode] = useState<string>('global');

  useEffect(() => {
    const saved = localStorage.getItem('npgroups_selected_country');
    if (saved && SUPPORTED_COUNTRIES.some(c => c.code === saved)) {
      setSelectedCode(saved);
    }
  }, []);

  const setCountryCode = (code: string) => {
    setSelectedCode(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('npgroups_selected_country', code);
    }
  };

  const country = SUPPORTED_COUNTRIES.find(c => c.code === selectedCode) || SUPPORTED_COUNTRIES[0];

  const formatPrice = (usdBase: number): string => {
    const converted = usdBase * country.usdRate;
    
    if (country.code === 'in') {
      const inrCr = converted / 10000000;
      if (inrCr >= 1) {
        return `₹${inrCr.toFixed(inrCr >= 10 ? 1 : 2)} Cr`;
      }
      const inrLakh = converted / 100000;
      return `₹${inrLakh.toFixed(1)} Lakhs`;
    }

    if (converted >= 1000000) {
      const millions = converted / 1000000;
      return `${country.symbol}${millions.toFixed(millions >= 100 ? 0 : 1)}M ${country.currency}`;
    }

    return `${country.symbol}${Math.round(converted).toLocaleString('en-US')} ${country.currency}`;
  };

  const formatHourlyRate = (usdHourly: number): string => {
    const converted = usdHourly * country.usdRate;

    if (country.code === 'in') {
      const inrLakh = converted / 100000;
      if (inrLakh >= 1) {
        return `₹${inrLakh.toFixed(1)} Lakhs / hr`;
      }
      return `₹${Math.round(converted).toLocaleString('en-IN')} / hr`;
    }

    return `${country.symbol}${Math.round(converted).toLocaleString('en-US')} / hr`;
  };

  return (
    <CountryContext.Provider value={{ country, setCountryCode, formatPrice, formatHourlyRate }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  return useContext(CountryContext);
}
