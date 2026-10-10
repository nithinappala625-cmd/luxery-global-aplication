-- ==============================================================================
-- ROYENDISON GLOBAL HERITAGE LUXURY MARKETPLACE
-- SUPABASE SCHEMA SPECIFICATION FOR AVIATION SALES, CHARTERS & EMPTY LEGS
-- ==============================================================================

-- 1. Table: Aircraft Sales Listings (Private Sales Intake & Verified Fleet)
CREATE TABLE IF NOT EXISTS public.aircraft_sales_listings (
    id TEXT PRIMARY KEY,
    aircraft_name TEXT NOT NULL,
    registration_number TEXT NOT NULL,
    country TEXT,
    owner_name_or_type TEXT,
    category TEXT,
    year_of_manufacture INTEGER,
    airframe_hours NUMERIC,
    engine_program TEXT,
    quoted_price_usd NUMERIC,
    quoted_price_inr TEXT,
    base_airport TEXT,
    contact_name TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    media_url TEXT,
    notes TEXT,
    status TEXT DEFAULT 'Available',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and public policies
ALTER TABLE public.aircraft_sales_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on aircraft_sales_listings" 
ON public.aircraft_sales_listings FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Allow public insert on aircraft_sales_listings" 
ON public.aircraft_sales_listings FOR INSERT 
TO public 
WITH CHECK (true);


-- 2. Table: Charter Booking Requests (Private Jet & VIP Helicopter Manifests)
CREATE TABLE IF NOT EXISTS public.booking_requests (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    client_email TEXT,
    asset_name TEXT,
    category TEXT,
    mission_event TEXT,
    origin TEXT,
    destination TEXT,
    departure_date TEXT,
    departure_time TEXT,
    return_date TEXT,
    passengers INTEGER DEFAULT 1,
    special_notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on booking_requests" 
ON public.booking_requests FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Allow public read access on booking_requests" 
ON public.booking_requests FOR SELECT 
TO public 
USING (true);


-- 3. Table: Empty Leg Deals (Operator Repositioning & Ferry Flight Desk)
CREATE TABLE IF NOT EXISTS public.empty_leg_deals (
    id TEXT PRIMARY KEY,
    flight_name TEXT NOT NULL,
    aircraft_model TEXT NOT NULL,
    registration TEXT,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    flight_date TEXT NOT NULL,
    seats_available INTEGER DEFAULT 8,
    discounted_price_inr TEXT NOT NULL,
    operator_name TEXT,
    contact_phone TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.empty_leg_deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on empty_leg_deals" 
ON public.empty_leg_deals FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Allow public insert on empty_leg_deals" 
ON public.empty_leg_deals FOR INSERT 
TO public 
WITH CHECK (true);

-- 4. Initial Seed for Empty Leg Deals
INSERT INTO public.empty_leg_deals (id, flight_name, aircraft_model, registration, origin, destination, flight_date, seats_available, discounted_price_inr, operator_name, contact_phone)
VALUES 
    ('EL-01', 'Hawker 900XP Coastal Repositioning', 'Hawker 900XP Executive Jet', 'VT-BNB', 'New Delhi (DEL)', 'Goa (GOX)', '2026-10-18', 8, '₹3.1 Lakhs', 'DGCA Part 135 Operator', '+91 7981994870'),
    ('EL-02', 'King Air B200 Deccan Corridor Ferry', 'Beech Super King Air B200', 'VT-RAS', 'Mumbai (BOM)', 'Hyderabad (HYD)', '2026-10-19', 7, '₹1.8 Lakhs', 'Air Charter India DGCA Fleet', '+91 7981994870'),
    ('EL-03', 'Gulfstream G550 Trans-Arabian Ferry', 'Gulfstream G550 Intercontinental', 'N550ED', 'Dubai (DWC)', 'New Delhi (DEL)', '2026-10-21', 14, '₹12.0 Lakhs', 'Empire Aviation Group UAE', '+91 7981994870'),
    ('EL-04', 'Sikorsky S-76D Rotary Transit', 'Sikorsky S-76D Twin-Turbine', 'VT-BBN', 'Bangalore (BLR)', 'Chennai (MAA)', '2026-10-22', 8, '₹1.4 Lakhs', 'Apex Rotary Charter', '+91 7981994870')
ON CONFLICT (id) DO NOTHING;
