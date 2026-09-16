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
