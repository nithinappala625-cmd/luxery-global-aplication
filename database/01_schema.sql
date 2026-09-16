-- ==============================================================================
-- GLOBAL LUXURY MARKETPLACE - SUPABASE POSTGRESQL SCHEMA
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum Types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'dealer', 'auction_house', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE listing_status AS ENUM ('draft', 'pending_review', 'verified', 'rejected', 'sold', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_status AS ENUM ('unverified', 'pending', 'verified', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE unlock_status AS ENUM ('pending', 'paid', 'failed', 'refunded', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_provider_type AS ENUM ('razorpay', 'paypal', 'stripe_future');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('created', 'authorized', 'captured', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE auction_status AS ENUM ('upcoming', 'live', 'ended', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. PROFILES (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'buyer',
    avatar_url TEXT,
    phone TEXT,
    country TEXT DEFAULT 'US',
    preferred_currency TEXT DEFAULT 'USD',
    is_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SELLER PROFILES
CREATE TABLE IF NOT EXISTS seller_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    business_name TEXT,
    seller_type TEXT NOT NULL DEFAULT 'private_collector', -- 'private_collector', 'boutique_dealer', 'authorized_dealer'
    tax_id TEXT,
    bio TEXT,
    website_url TEXT,
    location_city TEXT,
    location_country TEXT,
    verification_status verification_status NOT NULL DEFAULT 'pending',
    reputation_score NUMERIC(3, 2) DEFAULT 5.00,
    total_sales_count INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CATEGORIES (V1: Fine Jewellery, Luxury Watches, Luxury & Exotic Cars, Yachts & Marine)
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    icon_name TEXT,
    banner_url TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. SUBCATEGORIES
CREATE TABLE IF NOT EXISTS subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    spec_schema JSONB DEFAULT '{}'::jsonb,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(category_id, slug)
);

-- 5. BRANDS
CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    country_of_origin TEXT,
    logo_url TEXT,
    is_heritage BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(category_id, slug)
);

-- 6. LISTINGS
CREATE TABLE IF NOT EXISTS listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    subcategory_id UUID REFERENCES subcategories(id) ON DELETE SET NULL,
    brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(14, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    year INT,
    condition TEXT NOT NULL,
    status listing_status NOT NULL DEFAULT 'draft',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    view_count INT NOT NULL DEFAULT 0,
    contact_unlock_fee NUMERIC(10, 2) DEFAULT 0.00,
    curator_notes TEXT,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. LISTING LOCATIONS
CREATE TABLE IF NOT EXISTS listing_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID UNIQUE NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    city TEXT NOT NULL,
    state_province TEXT,
    country TEXT NOT NULL,
    country_code VARCHAR(2) NOT NULL DEFAULT 'US',
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. LISTING IMAGES (Cloudflare R2 keys & URLs)
CREATE TABLE IF NOT EXISTS listing_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    r2_key TEXT NOT NULL,
    original_url TEXT NOT NULL,
    optimized_url TEXT,
    thumbnail_url TEXT,
    is_cover BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0,
    width INT,
    height INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. LISTING SPECIFICATIONS
CREATE TABLE IF NOT EXISTS listing_specifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    spec_key TEXT NOT NULL,
    spec_value TEXT NOT NULL,
    spec_group TEXT DEFAULT 'General',
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(listing_id, spec_key)
);

-- 10. LISTING DOCUMENTS (Private / Verified Certificates stored in R2)
CREATE TABLE IF NOT EXISTS listing_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    r2_key TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size_bytes BIGINT,
    mime_type TEXT NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. WISHLISTS
CREATE TABLE IF NOT EXISTS wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, listing_id)
);

-- 12. RECENTLY VIEWED
CREATE TABLE IF NOT EXISTS recently_viewed (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, listing_id)
);

-- 13. SAVED SEARCHES
CREATE TABLE IF NOT EXISTS saved_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    criteria JSONB NOT NULL,
    notify_on_new_match BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. ENQUIRIES
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    offer_amount NUMERIC(14, 2),
    currency VARCHAR(3) DEFAULT 'USD',
    phone_shared BOOLEAN DEFAULT false,
    status TEXT NOT NULL DEFAULT 'unread',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. PAYMENTS (Abstraction for Razorpay & PayPal)
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    amount NUMERIC(14, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    provider payment_provider_type NOT NULL,
    provider_order_id TEXT UNIQUE NOT NULL,
    provider_payment_id TEXT,
    provider_signature TEXT,
    status payment_status NOT NULL DEFAULT 'created',
    purpose TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. PAYMENT TRANSACTIONS (Audit ledger)
CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    raw_response JSONB NOT NULL,
    status payment_status NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. CONTACT UNLOCKS (Secured seller contact reveals)
CREATE TABLE IF NOT EXISTS contact_unlocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
    status unlock_status NOT NULL DEFAULT 'pending',
    unlocked_contact_info JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(listing_id, buyer_id)
);

-- 18. AUCTION HOUSES
CREATE TABLE IF NOT EXISTS auction_houses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    description TEXT,
    website_url TEXT NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 19. AUCTIONS
CREATE TABLE IF NOT EXISTS auctions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auction_house_id UUID NOT NULL REFERENCES auction_houses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    cover_image_url TEXT NOT NULL,
    banner_image_url TEXT,
    location TEXT NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    status auction_status NOT NULL DEFAULT 'upcoming',
    total_lots INT NOT NULL DEFAULT 0,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    external_bidding_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 20. AUCTION LOTS (Prepared for future native bidding)
CREATE TABLE IF NOT EXISTS auction_lots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auction_id UUID NOT NULL REFERENCES auctions(id) ON DELETE CASCADE,
    lot_number INT NOT NULL,
    title TEXT NOT NULL,
    estimate_low NUMERIC(14, 2) NOT NULL,
    estimate_high NUMERIC(14, 2) NOT NULL,
    starting_bid NUMERIC(14, 2),
    current_bid NUMERIC(14, 2),
    reserve_met BOOLEAN DEFAULT false,
    image_url TEXT NOT NULL,
    external_lot_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 21. VERIFICATION RECORDS
CREATE TABLE IF NOT EXISTS verification_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
    seller_id UUID REFERENCES seller_profiles(id) ON DELETE CASCADE,
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    decision TEXT NOT NULL,
    verification_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 22. REPORTS
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    details TEXT,
    status TEXT NOT NULL DEFAULT 'open',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 23. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    type TEXT NOT NULL,
    payload JSONB DEFAULT '{}'::jsonb,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category_id);
CREATE INDEX IF NOT EXISTS idx_listings_subcategory ON listings(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_listings_brand ON listings(brand_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_price ON listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listings_featured ON listings(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_listing_images_listing ON listing_images(listing_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_listing_specs_listing ON listing_specifications(listing_id);
CREATE INDEX IF NOT EXISTS idx_listing_locations_country ON listing_locations(country);
CREATE INDEX IF NOT EXISTS idx_listing_locations_city ON listing_locations(city);
CREATE INDEX IF NOT EXISTS idx_wishlists_user ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_seller ON enquiries(seller_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_buyer ON enquiries(buyer_id);
CREATE INDEX IF NOT EXISTS idx_contact_unlocks_buyer ON contact_unlocks(buyer_id);
CREATE INDEX IF NOT EXISTS idx_contact_unlocks_listing ON contact_unlocks(listing_id);
CREATE INDEX IF NOT EXISTS idx_auctions_status_dates ON auctions(status, start_date);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(provider_order_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE recently_viewed ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_unlocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE auction_houses ENABLE ROW LEVEL SECURITY;
ALTER TABLE auctions ENABLE ROW LEVEL SECURITY;
ALTER TABLE auction_lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public categories are viewable by everyone" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public subcategories are viewable by everyone" ON subcategories FOR SELECT USING (true);
CREATE POLICY "Public brands are viewable by everyone" ON brands FOR SELECT USING (true);
CREATE POLICY "Active verified listings are viewable by everyone" ON listings FOR SELECT USING (
    status IN ('verified', 'sold') OR (auth.uid() IS NOT NULL AND auth.uid() = seller_id)
);
CREATE POLICY "Public listing locations are viewable by everyone" ON listing_locations FOR SELECT USING (true);
CREATE POLICY "Public listing images are viewable by everyone" ON listing_images FOR SELECT USING (true);
CREATE POLICY "Public listing specs are viewable by everyone" ON listing_specifications FOR SELECT USING (true);
CREATE POLICY "Public auction houses are viewable by everyone" ON auction_houses FOR SELECT USING (true);
CREATE POLICY "Public auctions are viewable by everyone" ON auctions FOR SELECT USING (true);
CREATE POLICY "Public auction lots are viewable by everyone" ON auction_lots FOR SELECT USING (true);

-- 2. Owner Policies
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Sellers can manage their own listings" ON listings FOR ALL USING (auth.uid() = seller_id);
CREATE POLICY "Users can manage their own wishlists" ON wishlists FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own recently viewed" ON recently_viewed FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their saved searches" ON saved_searches FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Buyers and sellers can view their enquiries" ON enquiries FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "Buyers can create enquiries" ON enquiries FOR INSERT WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Buyers can view their unlocked contacts" ON contact_unlocks FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "Users can view their notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
