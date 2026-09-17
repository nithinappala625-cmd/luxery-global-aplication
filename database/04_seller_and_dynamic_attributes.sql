-- ==============================================================================
-- 04_SELLER_AND_DYNAMIC_ATTRIBUTES.SQL
-- Decoupled Seller System, Subtype Profiles, Seller Verifications,
-- and Category-Specific Dynamic Attribute System
-- ==============================================================================

-- 1. ENUMS FOR SELLER AND VERIFICATION
DO  BEGIN
    CREATE TYPE seller_type_enum AS ENUM (
        'INDIVIDUAL_SELLER',
        'DEALER',
        'BROKER',
        'AUCTION_HOUSE',
        'JEWELLERY_DEALER',
        'WATCH_DEALER',
        'CAR_DEALER',
        'YACHT_BROKER',
        'OTHER'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END ;

DO  BEGIN
    CREATE TYPE seller_verification_status_enum AS ENUM (
        'UNVERIFIED',
        'PENDING',
        'VERIFIED',
        'REJECTED',
        'SUSPENDED'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END ;

DO  BEGIN
    CREATE TYPE seller_verification_level_enum AS ENUM (
        'LEVEL_0', -- Unverified
        'LEVEL_1', -- Contact Verified
        'LEVEL_2', -- Identity / Business Verified
        'LEVEL_3'  -- Professionally Curated / Accredited Partner
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END ;

DO  BEGIN
    CREATE TYPE attribute_data_type_enum AS ENUM (
        'TEXT',
        'LONG_TEXT',
        'NUMBER',
        'DECIMAL',
        'BOOLEAN',
        'DATE',
        'SELECT',
        'MULTI_SELECT',
        'CURRENCY',
        'URL',
        'EMAIL',
        'PHONE'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END ;

DO  BEGIN
    CREATE TYPE media_visibility_enum AS ENUM (
        'PUBLIC',
        'PRIVATE',
        'ADMIN_ONLY'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END ;

-- 2. SELLER PROFILES TABLE
CREATE TABLE IF NOT EXISTS seller_profiles_v2 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    seller_type seller_type_enum NOT NULL DEFAULT 'INDIVIDUAL_SELLER',
    display_name TEXT NOT NULL,
    legal_name TEXT,
    profile_photo TEXT,
    cover_photo TEXT,
    bio TEXT,
    country TEXT NOT NULL,
    state_province TEXT,
    city TEXT NOT NULL,
    address TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    whatsapp TEXT,
    website TEXT,
    years_experience INT DEFAULT 0,
    year_established INT,
    preferred_contact_method TEXT DEFAULT 'IN_APP',
    languages JSONB DEFAULT '[\"English\"]'::jsonb,
    categories_sold JSONB DEFAULT '[]'::jsonb,
    verification_status seller_verification_status_enum NOT NULL DEFAULT 'PENDING',
    verification_level seller_verification_level_enum NOT NULL DEFAULT 'LEVEL_0',
    is_active BOOLEAN NOT NULL DEFAULT true,
    reputation_score NUMERIC(3, 2) DEFAULT 5.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. BUSINESS PROFILES (DEALERS / RETAILERS)
CREATE TABLE IF NOT EXISTS business_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID UNIQUE NOT NULL REFERENCES seller_profiles_v2(id) ON DELETE CASCADE,
    legal_name TEXT NOT NULL,
    trading_name TEXT,
    business_type TEXT NOT NULL DEFAULT 'Dealer',
    registration_country TEXT NOT NULL,
    registration_number TEXT, -- Sensitive: Not public
    tax_number TEXT,          -- Sensitive: Not public
    website TEXT,
    business_email TEXT,
    business_phone TEXT,
    business_address TEXT,
    year_established INT,
    number_of_employees TEXT,
    description TEXT,
    brands_represented JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. BROKER PROFILES
CREATE TABLE IF NOT EXISTS broker_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID UNIQUE NOT NULL REFERENCES seller_profiles_v2(id) ON DELETE CASCADE,
    agency_name TEXT,
    specialization TEXT NOT NULL,
    years_experience INT DEFAULT 0,
    has_owner_representation_authorization BOOLEAN NOT NULL DEFAULT false,
    authorization_ref TEXT,
    authorization_doc_url TEXT,
    authorization_expires_at DATE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. AUCTION HOUSE PROFILES
CREATE TABLE IF NOT EXISTS auction_house_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID UNIQUE NOT NULL REFERENCES seller_profiles_v2(id) ON DELETE CASCADE,
    legal_name TEXT NOT NULL,
    display_name TEXT NOT NULL,
    registration_country TEXT NOT NULL,
    business_address TEXT,
    website TEXT,
    upcoming_auction_info TEXT,
    specializations JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. SELLER VERIFICATIONS (TRACKS VERIFICATION REVIEW HISTORY)
CREATE TABLE IF NOT EXISTS seller_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES seller_profiles_v2(id) ON DELETE CASCADE,
    verification_type TEXT NOT NULL, -- 'EMAIL', 'PHONE', 'IDENTITY', 'BUSINESS', 'BROKER', 'AUCTION_HOUSE', 'DOCUMENT'
    status TEXT NOT NULL DEFAULT 'PENDING', -- 'NOT_STARTED', 'PENDING', 'VERIFIED', 'REJECTED', 'REQUIRES_UPDATE'
    document_id TEXT,
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    review_notes TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ
);

-- 7. SELLER MEDIA (CLOUDFLARE R2 PRIVATE & PUBLIC MEDIA)
CREATE TABLE IF NOT EXISTS seller_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES seller_profiles_v2(id) ON DELETE CASCADE,
    media_type TEXT NOT NULL, -- 'PROFILE_PHOTO', 'COVER_PHOTO', 'LOGO', 'SHOWROOM', 'OFFICE', 'CERTIFICATE', 'DOCUMENT'
    storage_key TEXT NOT NULL,
    media_url TEXT NOT NULL,
    visibility media_visibility_enum NOT NULL DEFAULT 'PUBLIC',
    mime_type TEXT NOT NULL,
    file_size BIGINT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. DYNAMIC ATTRIBUTE DEFINITIONS (NO HARD-CODED COLUMNS)
CREATE TABLE IF NOT EXISTS attribute_definitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    label TEXT NOT NULL,
    description TEXT,
    data_type attribute_data_type_enum NOT NULL DEFAULT 'TEXT',
    unit TEXT, -- 'carats', 'mm', 'meters', 'hp', 'hrs', 'km'
    required BOOLEAN NOT NULL DEFAULT false,
    seller_editable BOOLEAN NOT NULL DEFAULT true,
    admin_only BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    filterable BOOLEAN NOT NULL DEFAULT false,
    searchable BOOLEAN NOT NULL DEFAULT false,
    active BOOLEAN NOT NULL DEFAULT true,
    options JSONB DEFAULT '[]'::jsonb, -- Array of strings for SELECT / MULTI_SELECT
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(category_id, slug)
);

-- 9. LISTING ATTRIBUTES (STORES DYNAMIC VALUES FOR EACH LISTING)
CREATE TABLE IF NOT EXISTS listing_attributes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    attribute_definition_id UUID NOT NULL REFERENCES attribute_definitions(id) ON DELETE CASCADE,
    value_text TEXT,
    value_number NUMERIC(16, 4),
    value_boolean BOOLEAN,
    value_date DATE,
    value_json JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(listing_id, attribute_definition_id)
);

-- 10. DOCUMENT REQUIREMENTS (CONFIGURABLE LEGAL/VERIFICATION REQUIREMENTS)
CREATE TABLE IF NOT EXISTS document_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_type seller_type_enum NOT NULL,
    country TEXT, -- NULL for all countries
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    label TEXT NOT NULL,
    required BOOLEAN NOT NULL DEFAULT true,
    active BOOLEAN NOT NULL DEFAULT true,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for lightning fast dynamic querying
CREATE INDEX IF NOT EXISTS idx_seller_profiles_v2_user ON seller_profiles_v2(user_id);
CREATE INDEX IF NOT EXISTS idx_seller_profiles_v2_status ON seller_profiles_v2(verification_status);
CREATE INDEX IF NOT EXISTS idx_attribute_definitions_cat ON attribute_definitions(category_id, active, display_order);
CREATE INDEX IF NOT EXISTS idx_listing_attributes_listing ON listing_attributes(listing_id);
CREATE INDEX IF NOT EXISTS idx_listing_attributes_def ON listing_attributes(attribute_definition_id);
