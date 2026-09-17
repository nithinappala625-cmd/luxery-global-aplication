-- ==============================================================================
-- 05_SEED_DYNAMIC_ATTRIBUTES.SQL
-- Seed Dynamic Attribute Definitions for the 4 Launch Categories
-- ==============================================================================

-- ==========================================
-- 1. LUXURY WATCHES ATTRIBUTES
-- ==========================================
INSERT INTO attribute_definitions (category_id, name, slug, label, description, data_type, unit, required, filterable, searchable, display_order, options)
VALUES
('c1000000-0000-0000-0000-000000000001', 'Reference Number', 'reference_number', 'Reference Number', 'Manufacturer official reference code', 'TEXT', NULL, true, true, true, 1, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000001', 'Movement', 'movement', 'Movement Type', 'Horological caliber movement mechanism', 'SELECT', NULL, true, true, true, 2, '[\"Automatic\", \"Manual\", \"Quartz\", \"Solar\", \"Spring Drive\", \"Tourbillon\", \"Other\"]'::jsonb),
('c1000000-0000-0000-0000-000000000001', 'Case Material', 'case_material', 'Case Material', 'Primary alloy or precious metal', 'SELECT', NULL, true, true, true, 3, '[\"Stainless Steel\", \"950 Platinum\", \"18k Yellow Gold\", \"18k White Gold\", \"18k Rose/Pink Gold\", \"Titanium\", \"Ceramic\", \"Carbon Composite\", \"Bronze\", \"Other\"]'::jsonb),
('c1000000-0000-0000-0000-000000000001', 'Case Diameter', 'case_diameter', 'Case Diameter', 'Case diameter excluding crown', 'NUMBER', 'mm', true, true, false, 4, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000001', 'Dial Color', 'dial_color', 'Dial Color', 'Dial hue and finishing', 'SELECT', NULL, true, true, true, 5, '[\"Black\", \"Blue\", \"Silver/White\", \"Salmon\", \"Green\", \"Champagne\", \"Meteorite\", \"Skeleton/Openworked\", \"Other\"]'::jsonb),
('c1000000-0000-0000-0000-000000000001', 'Strap / Bracelet', 'bracelet_material', 'Strap / Bracelet Material', 'Bracelet or strap composition', 'SELECT', NULL, false, true, false, 6, '[\"Integrated Steel Bracelet\", \"Alligator Leather\", \"Calfskin Leather\", \"Rubber / Oysterflex\", \"Gold Bracelet\", \"Platinum Bracelet\", \"NATO Fabric\", \"Other\"]'::jsonb),
('c1000000-0000-0000-0000-000000000001', 'Complications', 'complications', 'Complications', 'Special horological complications', 'MULTI_SELECT', NULL, false, true, true, 7, '[\"Chronograph\", \"Date\", \"GMT / Dual Time\", \"Moonphase\", \"Perpetual Calendar\", \"Annual Calendar\", \"Tourbillon\", \"Minute Repeater\", \"World Time\", \"Power Reserve Indicator\"]'::jsonb),
('c1000000-0000-0000-0000-000000000001', 'Water Resistance', 'water_resistance', 'Water Resistance', 'Depth rating', 'NUMBER', 'meters', false, true, false, 8, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000001', 'Power Reserve', 'power_reserve', 'Power Reserve', 'Autonomous runtime hours', 'NUMBER', 'hours', false, false, false, 9, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000001', 'Box & Papers', 'box_and_papers', 'Box & Papers Provenance', 'Accompanying accessories', 'SELECT', NULL, true, true, false, 10, '[\"Full Set (Original Box & Papers)\", \"Papers Only\", \"Box Only\", \"Watch Only (Archive Extract Available)\", \"Service Papers Only\"]'::jsonb),
('c1000000-0000-0000-0000-000000000001', 'Serial Number', 'serial_number', 'Serial Number (Confidential)', 'Serial number stored privately for verification', 'TEXT', NULL, false, false, false, 11, '[]'::jsonb)
ON CONFLICT (category_id, slug) DO NOTHING;

-- ==========================================
-- 2. FINE JEWELLERY & DIAMONDS ATTRIBUTES
-- ==========================================
INSERT INTO attribute_definitions (category_id, name, slug, label, description, data_type, unit, required, filterable, searchable, display_order, options)
VALUES
('c1000000-0000-0000-0000-000000000002', 'Jewellery Type', 'jewellery_type', 'Jewellery Classification', 'Type of jewellery piece', 'SELECT', NULL, true, true, true, 1, '[\"Ring\", \"Necklace\", \"Earrings\", \"Bracelet\", \"Bangle\", \"Pendant\", \"Brooch\", \"Tiara\", \"Cuff\", \"High Jewellery Set\", \"Other\"]'::jsonb),
('c1000000-0000-0000-0000-000000000002', 'Primary Material', 'primary_material', 'Precious Metal / Material', 'Mounting and setting metal', 'SELECT', NULL, true, true, true, 2, '[\"Platinum 950\", \"18k Yellow Gold\", \"18k White Gold\", \"18k Rose Gold\", \"Platinum & Gold Combination\", \"Fine Silver\", \"Titanium\", \"Other\"]'::jsonb),
('c1000000-0000-0000-0000-000000000002', 'Gemstone Type', 'gemstone_type', 'Primary Gemstone', 'Primary natural stone', 'SELECT', NULL, true, true, true, 3, '[\"Diamond\", \"Ruby\", \"Emerald\", \"Sapphire\", \"Fancy Colored Diamond\", \"Paraiba Tourmaline\", \"Alexandrite\", \"Natural Pearl\", \"Other Gemstone\", \"No Gemstone (Gold/Metal Only)\"]'::jsonb),
('c1000000-0000-0000-0000-000000000002', 'Diamond Origin', 'diamond_origin', 'Diamond Origin Classification', 'Natural or laboratory grown', 'SELECT', NULL, true, true, false, 4, '[\"Natural Earth-Mined\", \"Laboratory Grown\", \"Not Applicable\"]'::jsonb),
('c1000000-0000-0000-0000-000000000002', 'Carat Weight', 'carat_weight', 'Center Stone Carat Weight', 'Total carat weight of center stone', 'DECIMAL', 'carats', true, true, false, 5, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000002', 'Diamond Shape / Cut', 'diamond_shape', 'Gemstone Shape & Cut', 'Geometric cut profile', 'SELECT', NULL, false, true, true, 6, '[\"Round Brilliant\", \"Cushion\", \"Emerald Cut\", \"Radiant\", \"Oval\", \"Pear Shape\", \"Marquise\", \"Heart\", \"Asscher\", \"Bespoke / Fancy\"]'::jsonb),
('c1000000-0000-0000-0000-000000000002', 'Color Grade', 'color_grade', 'Color Grade', 'GIA D-Z or Fancy Colored rating', 'SELECT', NULL, false, true, false, 7, '[\"D (Colorless)\", \"E (Colorless)\", \"F (Colorless)\", \"G (Near Colorless)\", \"H (Near Colorless)\", \"Fancy Vivid Yellow\", \"Fancy Intense Yellow\", \"Fancy Pink\", \"Fancy Blue\", \"Fancy Green\", \"Other Fancy Color\"]'::jsonb),
('c1000000-0000-0000-0000-000000000002', 'Clarity Grade', 'clarity_grade', 'Clarity Grade', 'Gemological clarity rating', 'SELECT', NULL, false, true, false, 8, '[\"FL (Flawless)\", \"IF (Internally Flawless)\", \"VVS1\", \"VVS2\", \"VS1\", \"VS2\", \"SI1\", \"SI2\"]'::jsonb),
('c1000000-0000-0000-0000-000000000002', 'Cut Grade', 'cut_grade', 'Cut Grade', 'Proportions and brilliance', 'SELECT', NULL, false, true, false, 9, '[\"Excellent\", \"Very Good\", \"Good\", \"Fair\"]'::jsonb),
('c1000000-0000-0000-0000-000000000002', 'Polish & Symmetry', 'polish_symmetry', 'Polish & Symmetry Finish', 'Triple Excellent standard', 'SELECT', NULL, false, false, false, 10, '[\"Triple Excellent (3EX)\", \"Excellent\", \"Very Good\", \"Good\"]'::jsonb),
('c1000000-0000-0000-0000-000000000002', 'Fluorescence', 'fluorescence', 'Fluorescence', 'Reaction under UV light', 'SELECT', NULL, false, false, false, 11, '[\"None / Inert\", \"Faint\", \"Medium Blue\", \"Strong Blue\"]'::jsonb),
('c1000000-0000-0000-0000-000000000002', 'Certification Available', 'is_certified', 'Official Certification Available', 'Independent laboratory dossier available', 'BOOLEAN', NULL, true, true, false, 12, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000002', 'Certificate Laboratory', 'certificate_lab', 'Grading Laboratory', 'Issuing gemological authority', 'SELECT', NULL, false, true, true, 13, '[\"GIA (Gemological Institute of America)\", \"IGI (International Gemological Institute)\", \"HRD Antwerp\", \"Gübelin Gem Lab\", \"SSEF Swiss Gemmological Institute\", \"GCAL\", \"Other\"]'::jsonb),
('c1000000-0000-0000-0000-000000000002', 'Certificate Number', 'certificate_number', 'Certificate / Report Number', 'Unique report identifier', 'TEXT', NULL, false, false, true, 14, '[]'::jsonb)
ON CONFLICT (category_id, slug) DO NOTHING;

-- ==========================================
-- 3. LUXURY & EXOTIC CARS ATTRIBUTES
-- ==========================================
INSERT INTO attribute_definitions (category_id, name, slug, label, description, data_type, unit, required, filterable, searchable, display_order, options)
VALUES
('c1000000-0000-0000-0000-000000000003', 'Make', 'make', 'Manufacturer / Make', 'Automotive marquee', 'TEXT', NULL, true, true, true, 1, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000003', 'Model', 'model', 'Model Name', 'Vehicle model designation', 'TEXT', NULL, true, true, true, 2, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000003', 'Variant', 'variant', 'Variant / Trim / Spec', 'Special trim or edition package', 'TEXT', NULL, false, true, true, 3, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000003', 'VIN / Chassis Number', 'vin_number', 'VIN / Chassis Number (Confidential)', '17-character VIN stored privately', 'TEXT', NULL, false, false, false, 4, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000003', 'Mileage', 'mileage', 'Odometer Mileage', 'Verified distance traveled', 'NUMBER', 'km', true, true, false, 5, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000003', 'Engine Type', 'engine_type', 'Engine Configuration', 'Engine displacement & cylinder layout', 'SELECT', NULL, true, true, true, 6, '[\"Naturally Aspirated V12\", \"Twin-Turbo V8\", \"Naturally Aspirated Flat-6\", \"Quad-Turbo W16\", \"Hybrid V8 + Triple Electric\", \"Pure Electric (EV)\", \"Twin-Turbo V6\", \"Naturally Aspirated V10\", \"Other\"]'::jsonb),
('c1000000-0000-0000-0000-000000000003', 'Power Output', 'power_output', 'Total Power Output', 'Brake horsepower / PS', 'NUMBER', 'bhp', true, true, false, 7, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000003', 'Fuel Type', 'fuel_type', 'Fuel Type', 'Propulsion energy source', 'SELECT', NULL, true, true, false, 8, '[\"Petrol / Gasoline\", \"Plug-in Hybrid (PHEV)\", \"Hybrid\", \"All-Electric (BEV)\", \"Diesel\", \"Other\"]'::jsonb),
('c1000000-0000-0000-0000-000000000003', 'Transmission', 'transmission', 'Transmission', 'Gearbox system', 'SELECT', NULL, true, true, false, 9, '[\"Dual-Clutch Automatic (PDK/DCT)\", \"Manual (Gated 6-Speed)\", \"Sequential Racing Box\", \"Automatic (Torque Converter)\", \"Single-Speed EV Direct\", \"Other\"]'::jsonb),
('c1000000-0000-0000-0000-000000000003', 'Drivetrain', 'drivetrain', 'Drivetrain Configuration', 'Wheel drive configuration', 'SELECT', NULL, false, true, false, 10, '[\"Rear-Wheel Drive (RWD)\", \"All-Wheel Drive (AWD)\", \"Four-Wheel Drive (4WD)\", \"Front-Wheel Drive (FWD)\"]'::jsonb),
('c1000000-0000-0000-0000-000000000003', 'Exterior Color', 'exterior_color', 'Exterior Paint / Livery', 'Factory paint name or bespoke PTS', 'TEXT', NULL, true, true, true, 11, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000003', 'Interior Color', 'interior_color', 'Interior Upholstery', 'Leather / Alcantara specifications', 'TEXT', NULL, false, false, false, 12, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000003', 'Previous Owners', 'previous_owners', 'Number of Previous Owners', 'Ownership history count', 'NUMBER', 'owners', false, true, false, 13, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000003', 'Accident History', 'accident_history', 'Accident / Damage History', 'Structural integrity history', 'SELECT', NULL, true, true, false, 14, '[\"Clean (Zero Accident History)\", \"Minor Cosmetic Blemish Restored\", \"Repaired with Official Records\"]'::jsonb)
ON CONFLICT (category_id, slug) DO NOTHING;

-- ==========================================
-- 4. YACHTS & MARINE ATTRIBUTES
-- ==========================================
INSERT INTO attribute_definitions (category_id, name, slug, label, description, data_type, unit, required, filterable, searchable, display_order, options)
VALUES
('c1000000-0000-0000-0000-000000000004', 'Vessel Name', 'vessel_name', 'Vessel Name', 'Official boat or yacht title', 'TEXT', NULL, true, true, true, 1, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000004', 'Builder / Shipyard', 'builder', 'Builder / Shipyard', 'Naval manufacturer or shipyard', 'TEXT', NULL, true, true, true, 2, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000004', 'Vessel Type', 'vessel_type', 'Vessel Classification', 'Naval architecture type', 'SELECT', NULL, true, true, true, 3, '[\"Motor Yacht\", \"Sailing Yacht\", \"Catamaran (Sail)\", \"Power Catamaran\", \"Superyacht (40m+)\", \"Sportfly / Open Cruiser\", \"Explorer / Expedition\", \"Classic / Heritage Wooden\"]'::jsonb),
('c1000000-0000-0000-0000-000000000004', 'Length Overall (LOA)', 'length_overall', 'Length Overall (LOA)', 'Total length from bow to stern', 'DECIMAL', 'meters', true, true, false, 4, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000004', 'Beam', 'beam', 'Beam Width', 'Maximum vessel width', 'DECIMAL', 'meters', true, false, false, 5, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000004', 'Draft', 'draft', 'Draft Depth', 'Water depth required to float', 'DECIMAL', 'meters', false, false, false, 6, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000004', 'Hull Material', 'hull_material', 'Hull Construction Material', 'Hull composite or alloy', 'SELECT', NULL, true, true, false, 7, '[\"GRP / Fiberglass\", \"Carbon Fiber Composite\", \"Aluminium\", \"Steel\", \"Wood / Composite\", \"Kevlar Reinforcement\"]'::jsonb),
('c1000000-0000-0000-0000-000000000004', 'Engine Manufacturer', 'engine_make', 'Engine Manufacturer', 'Marine propulsion make', 'SELECT', NULL, true, true, true, 8, '[\"MTU\", \"Yanmar\", \"Caterpillar\", \"Volvo Penta\", \"MAN\", \"Cummins\", \"Mercury Racing\", \"Electric Pods\", \"Other\"]'::jsonb),
('c1000000-0000-0000-0000-000000000004', 'Engine Hours', 'engine_hours', 'Engine Running Hours', 'Total operating hours logged', 'NUMBER', 'hours', true, true, false, 9, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000004', 'Cruising Speed', 'cruising_speed', 'Cruising Speed', 'Economic cruise speed', 'NUMBER', 'knots', false, true, false, 10, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000004', 'Maximum Speed', 'maximum_speed', 'Maximum Speed', 'Top velocity', 'NUMBER', 'knots', false, true, false, 11, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000004', 'Guest Cabins', 'guest_cabins', 'Guest Cabins Count', 'Staterooms count', 'NUMBER', 'cabins', true, true, false, 12, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000004', 'Heads / Bathrooms', 'heads_count', 'Heads / En-suite Bathrooms', 'Total bathrooms on board', 'NUMBER', 'heads', false, false, false, 13, '[]'::jsonb),
('c1000000-0000-0000-0000-000000000004', 'VAT Status', 'vat_status', 'VAT / Tax Status', 'European or global maritime VAT compliance', 'SELECT', NULL, true, true, false, 14, '[\"VAT Paid\", \"VAT Not Paid\", \"Commercial Exemption\", \"Export Scheme Eligible\"]'::jsonb)
ON CONFLICT (category_id, slug) DO NOTHING;
