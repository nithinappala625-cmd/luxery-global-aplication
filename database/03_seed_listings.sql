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
