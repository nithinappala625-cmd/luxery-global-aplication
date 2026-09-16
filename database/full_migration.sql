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
-- ==============================================================================
-- GLOBAL LUXURY MARKETPLACE - SEED DATA
-- ==============================================================================

-- 1. CATEGORIES
INSERT INTO categories (id, slug, name, tagline, icon_name, banner_url, sort_order, is_active) VALUES
('c1000000-0000-0000-0000-000000000001', 'watches', 'Luxury Watches', 'Horological masterpieces & haute horlogerie', 'watch', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop', 1, true),
('c1000000-0000-0000-0000-000000000002', 'jewellery', 'Fine Jewellery & Diamonds', 'Exquisite gemstones & heritage pieces', 'diamond', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop', 2, true),
('c1000000-0000-0000-0000-000000000003', 'cars', 'Luxury & Exotic Cars', 'Rare collector automobiles & hypercars', 'directions_car', 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop', 3, true),
('c1000000-0000-0000-0000-000000000004', 'yachts', 'Yachts & Marine', 'Superyachts, catamarans & nautical prestige', 'sailing', 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=1200&auto=format&fit=crop', 4, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, tagline = EXCLUDED.tagline, banner_url = EXCLUDED.banner_url;

-- 2. SUBCATEGORIES
INSERT INTO subcategories (id, category_id, slug, name, sort_order) VALUES
-- Watches
('s1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'grand-complications', 'Grand Complications', 1),
('s1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'chronographs', 'Sports Chronographs', 2),
('s1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'vintage-timepieces', 'Vintage Timepieces', 3),
-- Jewellery
('s1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000002', 'high-jewellery-rings', 'High Jewellery Rings', 1),
('s1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000002', 'haute-necklaces', 'Haute Joaillerie Necklaces', 2),
('s1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000002', 'rare-gemstones', 'Rare Colored Gemstones', 3),
-- Cars
('s1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000003', 'hypercars', 'Hypercars & Limited Editions', 1),
('s1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000003', 'supercars', 'Supercars', 2),
('s1000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000003', 'historic-classics', 'Historic Classics', 3),
-- Yachts
('s1000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000004', 'catamarans', 'Luxury Catamarans', 1),
('s1000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000004', 'motor-yachts', 'Motor Superyachts', 2),
('s1000000-0000-0000-0000-000000000012', 'c1000000-0000-0000-0000-000000000004', 'sailing-yachts', 'High-Performance Sailing Yachts', 3)
ON CONFLICT (category_id, slug) DO NOTHING;

-- 3. BRANDS
INSERT INTO brands (id, category_id, name, slug, country_of_origin, is_heritage) VALUES
('b1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'Patek Philippe', 'patek-philippe', 'Switzerland', true),
('b1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'Audemars Piguet', 'audemars-piguet', 'Switzerland', true),
('b1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'Rolex', 'rolex', 'Switzerland', true),
('b1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001', 'Richard Mille', 'richard-mille', 'Switzerland', false),

('b1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000002', 'Cartier', 'cartier', 'France', true),
('b1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000002', 'Graff', 'graff', 'United Kingdom', true),
('b1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000002', 'Harry Winston', 'harry-winston', 'United States', true),
('b1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000002', 'Van Cleef & Arpels', 'van-cleef-arpels', 'France', true),

('b1000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000003', 'Ferrari', 'ferrari', 'Italy', true),
('b1000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000003', 'Bugatti', 'bugatti', 'France', true),
('b1000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000003', 'Porsche', 'porsche', 'Germany', true),
('b1000000-0000-0000-0000-000000000012', 'c1000000-0000-0000-0000-000000000003', 'Pagani', 'pagani', 'Italy', false),

('b1000000-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000004', 'Bali Catamarans', 'bali-catamarans', 'France', false),
('b1000000-0000-0000-0000-000000000014', 'c1000000-0000-0000-0000-000000000004', 'Sunseeker', 'sunseeker', 'United Kingdom', true),
('b1000000-0000-0000-0000-000000000015', 'c1000000-0000-0000-0000-000000000004', 'Riva', 'riva', 'Italy', true),
('b1000000-0000-0000-0000-000000000016', 'c1000000-0000-0000-0000-000000000004', 'Azimut', 'azimut', 'Italy', true)
ON CONFLICT (category_id, slug) DO NOTHING;

-- 4. AUCTION HOUSES
INSERT INTO auction_houses (id, name, slug, logo_url, city, country, description, website_url, is_verified) VALUES
('a1000000-0000-0000-0000-000000000001', 'Sotheby''s', 'sothebys', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Sotheby%27s_logo.svg/800px-Sotheby%27s_logo.svg.png', 'London', 'United Kingdom', 'Founded in 1744, Sotheby''s is the world''s premier destination for art and luxury.', 'https://www.sothebys.com', true),
('a1000000-0000-0000-0000-000000000002', 'Christie''s', 'christies', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Christie%27s_logo.svg/800px-Christie%27s_logo.svg.png', 'Geneva', 'Switzerland', 'World-leading auction house renowned for extraordinary jewellery and rare horology.', 'https://www.christies.com', true),
('a1000000-0000-0000-0000-000000000003', 'RM Sotheby''s', 'rm-sothebys', 'https://rmsothebys.com/assets/images/logo.svg', 'Monaco', 'Monaco', 'The global leader in collector car auctions and historic racing machinery.', 'https://rmsothebys.com', true),
('a1000000-0000-0000-0000-000000000004', 'Phillips', 'phillips', 'https://www.phillips.com/assets/img/phillips-logo.svg', 'New York', 'United States', 'Specialized international auction house focused on 20th century and contemporary watches.', 'https://www.phillips.com', true)
ON CONFLICT (slug) DO NOTHING;

-- 5. AUCTIONS
INSERT INTO auctions (id, auction_house_id, title, slug, description, cover_image_url, banner_image_url, location, start_date, end_date, status, total_lots, currency, external_bidding_url) VALUES
('e1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Important Watches: Geneva Spring Sale', 'geneva-spring-watches-2026', 'Featuring museum-grade Patek Philippe perpetual calendars and prototype Rolex Daytona chronographs.', 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop', 'Hôtel Beau-Rivage, Geneva', NOW() + INTERVAL '2 days', NOW() + INTERVAL '4 days', 'upcoming', 142, 'CHF', 'https://www.sothebys.com/en/auctions/geneva-watches'),
('e1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000003', 'Villa d''Este & Monaco Historic Concours', 'monaco-historic-concours-2026', 'A curated assembly of the most historically significant GT and sports racing cars.', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop', 'Monte Carlo Sporting, Monaco', NOW() - INTERVAL '6 hours', NOW() + INTERVAL '18 hours', 'live', 88, 'EUR', 'https://rmsothebys.com/en/auctions/monaco'),
('e1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', 'Magnificent Jewels & Royal Provenance', 'magnificent-jewels-royal-provenance', 'Exceptional colored diamonds, Kashmir sapphires, and royal tiaras from European private collections.', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop', 'Rockefeller Plaza, New York', NOW() + INTERVAL '12 days', NOW() + INTERVAL '14 days', 'upcoming', 210, 'USD', 'https://www.christies.com/en/auctions/magnificent-jewels')
ON CONFLICT (id) DO NOTHING;
-- ==============================================================================
-- GLOBAL LUXURY MARKETPLACE - CURATED SEED LISTINGS
-- ==============================================================================

-- Create a system/dealer profile for initial listings
INSERT INTO profiles (id, email, full_name, role, avatar_url, country, preferred_currency, is_verified) VALUES
('00000000-0000-0000-0000-000000000001', 'concierge@luxurymarketplace.global', 'Monaco Private Heritage Salons', 'dealer', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop', 'MC', 'EUR', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO seller_profiles (id, profile_id, business_name, seller_type, bio, location_city, location_country, verification_status, reputation_score, total_sales_count) VALUES
('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Monaco Private Heritage Salons', 'authorized_dealer', 'Specialized brokerage of museum-quality horology, nautical assets and collector automobiles across the Côte d''Azur and Geneva.', 'Monaco', 'Monaco', 'verified', 4.98, 38)
ON CONFLICT (profile_id) DO NOTHING;

-- 1. BALI 4.0 Catamaran
INSERT INTO listings (id, seller_id, category_id, subcategory_id, brand_id, title, slug, description, price, currency, year, condition, status, is_featured, view_count, contact_unlock_fee) VALUES
('l1000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000004', 's1000000-0000-0000-0000-000000000010', 'b1000000-0000-0000-0000-000000000013', 'Bali 4.0 Lounge Catamaran', 'bali-4-0-lounge-2017-cannes', 'Exceptional 2017 Bali 4.0 Catamaran presented in impeccable turnkey condition. Featuring the signature open-space concept with a tilting aft door connecting the saloon and cockpit, forward rigid cockpit with sunbathing lounge, and upgraded Yanmar engines with full Mediterranean service history.', 260000.00, 'EUR', 2017, 'Pristine / Turnkey Marina Ready', 'verified', true, 1420, 150.00)
ON CONFLICT (id) DO NOTHING;

INSERT INTO listing_locations (listing_id, city, state_province, country, country_code, latitude, longitude) VALUES
('l1000000-0000-0000-0000-000000000001', 'Cannes', 'Provence-Alpes-Côte d''Azur', 'France', 'FR', 43.5528, 7.0174)
ON CONFLICT (listing_id) DO NOTHING;

INSERT INTO listing_images (listing_id, r2_key, original_url, is_cover, sort_order) VALUES
('l1000000-0000-0000-0000-000000000001', 'listings/bali-40/1.jpg', 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=1200&auto=format&fit=crop', true, 1),
('l1000000-0000-0000-0000-000000000001', 'listings/bali-40/2.jpg', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop', false, 2),
('l1000000-0000-0000-0000-000000000001', 'listings/bali-40/3.jpg', 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1200&auto=format&fit=crop', false, 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO listing_specifications (listing_id, spec_key, spec_value, spec_group, sort_order) VALUES
('l1000000-0000-0000-0000-000000000001', 'Length Overall', '11.93 m (39 ft 2 in)', 'Dimensions', 1),
('l1000000-0000-0000-0000-000000000001', 'Beam', '6.72 m (22 ft 1 in)', 'Dimensions', 2),
('l1000000-0000-0000-0000-000000000001', 'Draft', '1.12 m', 'Dimensions', 3),
('l1000000-0000-0000-0000-000000000001', 'Engines', '2x Yanmar 40 HP Diesel', 'Mechanical', 4),
('l1000000-0000-0000-0000-000000000001', 'Cabins / Berths', '4 Cabins / 8 Berths + 4 Heads', 'Accommodations', 5),
('l1000000-0000-0000-0000-000000000001', 'Fuel Capacity', '400 Litres', 'Capacities', 6),
('l1000000-0000-0000-0000-000000000001', 'Freshwater', '800 Litres', 'Capacities', 7)
ON CONFLICT (listing_id, spec_key) DO NOTHING;

-- 2. Patek Philippe Grand Complications 5270P
INSERT INTO listings (id, seller_id, category_id, subcategory_id, brand_id, title, slug, description, price, currency, year, condition, status, is_featured, view_count, contact_unlock_fee) VALUES
('l1000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 's1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Patek Philippe Grand Complications 5270P Salmon Dial', 'patek-philippe-5270p-salmon-dial-geneva', 'An apex of high horology: Reference 5270P in 950 Platinum housing the in-house manual-wind Caliber CH 29-535 PS Q. Featuring the coveted golden opaline salmon dial with blackened gold applied numerals. Complete with original presentation chest, setting stylus, platinum solid case back, and Certificate of Origin.', 195000.00, 'USD', 2022, 'Unworn / Double Sealed with Papers', 'verified', true, 3190, 200.00)
ON CONFLICT (id) DO NOTHING;

INSERT INTO listing_locations (listing_id, city, state_province, country, country_code, latitude, longitude) VALUES
('l1000000-0000-0000-0000-000000000002', 'Geneva', 'Geneva', 'Switzerland', 'CH', 46.2044, 6.1432)
ON CONFLICT (listing_id) DO NOTHING;

INSERT INTO listing_images (listing_id, r2_key, original_url, is_cover, sort_order) VALUES
('l1000000-0000-0000-0000-000000000002', 'listings/patek-5270p/1.jpg', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop', true, 1),
('l1000000-0000-0000-0000-000000000002', 'listings/patek-5270p/2.jpg', 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop', false, 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO listing_specifications (listing_id, spec_key, spec_value, spec_group, sort_order) VALUES
('l1000000-0000-0000-0000-000000000002', 'Reference', '5270P-001', 'General', 1),
('l1000000-0000-0000-0000-000000000002', 'Case Material', '950 Platinum', 'Case', 2),
('l1000000-0000-0000-0000-000000000002', 'Case Diameter', '41 mm', 'Case', 3),
('l1000000-0000-0000-0000-000000000002', 'Dial', 'Golden Opaline Salmon', 'Dial', 4),
('l1000000-0000-0000-0000-000000000002', 'Movement', 'Caliber CH 29-535 PS Q Manual Wind', 'Movement', 5),
('l1000000-0000-0000-0000-000000000002', 'Complications', 'Perpetual Calendar, Chronograph, Moonphase, Day/Night', 'Movement', 6)
ON CONFLICT (listing_id, spec_key) DO NOTHING;

-- 3. Ferrari SF90 Stradale Assetto Fiorano
INSERT INTO listings (id, seller_id, category_id, subcategory_id, brand_id, title, slug, description, price, currency, year, condition, status, is_featured, view_count, contact_unlock_fee) VALUES
('l1000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000003', 's1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000009', 'Ferrari SF90 Stradale Assetto Fiorano', 'ferrari-sf90-assetto-fiorano-dubai', 'Factory Assetto Fiorano lightweight package in historic Grigio Ferro with contrasting Giallo Modena livery. Equipped with carbon fiber racing wheels, Multimatic shock absorbers, titanium exhaust system, and Michelin Pilot Sport Cup 2R tires. Under 900 km from new.', 620000.00, 'USD', 2023, 'Collector Grade / Mint', 'verified', true, 2870, 250.00)
ON CONFLICT (id) DO NOTHING;

INSERT INTO listing_locations (listing_id, city, state_province, country, country_code, latitude, longitude) VALUES
('l1000000-0000-0000-0000-000000000003', 'Dubai', 'Dubai', 'United Arab Emirates', 'AE', 25.2048, 55.2708)
ON CONFLICT (listing_id) DO NOTHING;

INSERT INTO listing_images (listing_id, r2_key, original_url, is_cover, sort_order) VALUES
('l1000000-0000-0000-0000-000000000003', 'listings/ferrari-sf90/1.jpg', 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop', true, 1),
('l1000000-0000-0000-0000-000000000003', 'listings/ferrari-sf90/2.jpg', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop', false, 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO listing_specifications (listing_id, spec_key, spec_value, spec_group, sort_order) VALUES
('l1000000-0000-0000-0000-000000000003', 'Power Output', '1,000 cv (986 bhp)', 'Performance', 1),
('l1000000-0000-0000-0000-000000000003', '0-100 km/h', '2.5 seconds', 'Performance', 2),
('l1000000-0000-0000-0000-000000000003', 'Drivetrain', 'PHEV Twin-Turbo V8 + 3 Electric Motors AWD', 'Engine', 3),
('l1000000-0000-0000-0000-000000000003', 'Transmission', '8-Speed Dual Clutch F1', 'Transmission', 4),
('l1000000-0000-0000-0000-000000000003', 'Mileage', '890 km', 'General', 5)
ON CONFLICT (listing_id, spec_key) DO NOTHING;

-- 4. Graff 10.50ct Vivid Yellow Diamond Ring
INSERT INTO listings (id, seller_id, category_id, subcategory_id, brand_id, title, slug, description, price, currency, year, condition, status, is_featured, view_count, contact_unlock_fee) VALUES
('l1000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002', 's1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000006', 'Graff 10.50ct Fancy Vivid Yellow Diamond Solitaire', 'graff-10ct-vivid-yellow-diamond-london', 'A monument of gemstone rarity: A 10.50-carat radiant-cut Fancy Vivid Yellow diamond certified by the GIA with VS1 clarity and excellent polish and symmetry. Flanked by tapered white diamond baguettes and mounted in bespoke 18k yellow gold and platinum Graff mounting.', 850000.00, 'GBP', 2021, 'Mint / Original Graff Presentation Box', 'verified', true, 1980, 300.00)
ON CONFLICT (id) DO NOTHING;

INSERT INTO listing_locations (listing_id, city, state_province, country, country_code, latitude, longitude) VALUES
('l1000000-0000-0000-0000-000000000004', 'London', 'Greater London', 'United Kingdom', 'GB', 51.5074, -0.1278)
ON CONFLICT (listing_id) DO NOTHING;

INSERT INTO listing_images (listing_id, r2_key, original_url, is_cover, sort_order) VALUES
('l1000000-0000-0000-0000-000000000004', 'listings/graff-yellow-diamond/1.jpg', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop', true, 1),
('l1000000-0000-0000-0000-000000000004', 'listings/graff-yellow-diamond/2.jpg', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop', false, 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO listing_specifications (listing_id, spec_key, spec_value, spec_group, sort_order) VALUES
('l1000000-0000-0000-0000-000000000004', 'Center Stone Weight', '10.50 Carats', 'Gemology', 1),
('l1000000-0000-0000-0000-000000000004', 'Color Grade', 'Fancy Vivid Yellow (Natural)', 'Gemology', 2),
('l1000000-0000-0000-0000-000000000004', 'Clarity Grade', 'VS1', 'Gemology', 3),
('l1000000-0000-0000-0000-000000000004', 'Cut / Shape', 'Radiant Cut', 'Gemology', 4),
('l1000000-0000-0000-0000-000000000004', 'Certification', 'GIA Dossier + Graff Certificate', 'Provenance', 5),
('l1000000-0000-0000-0000-000000000004', 'Metal', 'Platinum 950 & 18k Yellow Gold', 'Mounting', 6)
ON CONFLICT (listing_id, spec_key) DO NOTHING;
