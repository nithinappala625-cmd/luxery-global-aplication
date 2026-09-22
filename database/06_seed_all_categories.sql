-- ==============================================================================
-- 11 FULL CATEGORIES SEED FOR NP GROUPS LUXURY MARKETPLACE
-- ==============================================================================

INSERT INTO categories (id, slug, name, tagline, icon_name, banner_url, sort_order, is_active) VALUES
('c1000000-0000-0000-0000-000000000001', 'watches', 'Luxury Watches', 'Horological masterpieces & haute horlogerie', 'watch', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop', 1, true),
('c1000000-0000-0000-0000-000000000002', 'jewellery', 'Jewellery & Diamonds', 'Exquisite gemstones & heritage pieces', 'diamond', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop', 2, true),
('c1000000-0000-0000-0000-000000000003', 'cars', 'Automotive', 'Rare collector automobiles, supercars & racing exotics', 'directions_car', 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop', 3, true),
('c1000000-0000-0000-0000-000000000004', 'marine', 'Marine', 'Superyachts, luxury boats & nautical prestige', 'sailing', 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=1200&auto=format&fit=crop', 4, true),
('c1000000-0000-0000-0000-000000000005', 'aviation', 'Aviation', 'Private jets, VIP helicopters & global charters', 'flight_takeoff', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop', 5, true),
('c1000000-0000-0000-0000-000000000006', 'real-estate', 'Real Estate', 'Sovereign estates, luxury villas & beachfront palaces', 'villa', 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop', 6, true),
('c1000000-0000-0000-0000-000000000007', 'private-islands', 'Private Islands', 'Untouched archipelagos & sovereign island retreats', 'beach_access', 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=1200&auto=format&fit=crop', 7, true),
('c1000000-0000-0000-0000-000000000008', 'sports-experiences', 'Sports & Elite Experiences', 'Polo, Formula racing, grand slam golf & equestrian', 'sports_golf', 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1200&auto=format&fit=crop', 8, true),
('c1000000-0000-0000-0000-000000000009', 'travel-experiences', 'Travel & Experiences', 'Curated expeditions, bespoke itineraries & VIP lifestyle', 'travel_explore', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop', 9, true),
('c1000000-0000-0000-0000-000000000010', 'digital-financial', 'Digital & Financial Services', 'Private banking, wealth preservation, crypto & escrow', 'account_balance', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop', 10, true),
('c1000000-0000-0000-0000-000000000011', 'locker-storage', 'Locker & Storage', 'Armored vaults, art preservation & climate reserves', 'lock', 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1200&auto=format&fit=crop', 11, true)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name, 
  tagline = EXCLUDED.tagline, 
  icon_name = EXCLUDED.icon_name,
  banner_url = EXCLUDED.banner_url,
  sort_order = EXCLUDED.sort_order;
