-- =============================================
-- ION GREEN - Solutions Data SQL Insert Script
-- =============================================
-- Run this in your MySQL database (green_db)
-- Make sure the 'gallery' column exists (run add-gallery-to-solutions migration first)
-- =============================================

USE green_db;

-- 1. Solar EPC Solutions (Residential to Utility)
INSERT INTO solutions (title, slug, summary, description, image_url, gallery, category, is_active, created_at, updated_at)
VALUES (
  'Solar EPC Solutions (Residential to Utility)',
  'solar-epc-solutions-residential-to-utility',
  'End-to-end solar EPC services from residential rooftop to large-scale utility plants — covering design, supply, installation, and commissioning.',
  'Solar EPC Solutions (Residential to Utility)

ION GREEN offers complete Engineering, Procurement, and Construction (EPC) services for solar power systems across all scales — from 3 kW home systems to 1 MW+ utility-grade solar plants.

What We Offer:
✔ Rooftop Solar (Home & Commercial)
✔ Industrial Solar EPC
✔ Ground Mounted Solar Plant
✔ Solar + Storage Integration

Capacity Range:
- 3 kW (Home)
- 10–500 kW (Commercial)
- 1 MW+ (Industrial / Utility)

Revenue Model:
- EPC Turnkey
- CAPEX & RESCO Model
- AMC Services

Our experienced team handles every phase of the project lifecycle — from site assessment and system design to installation, grid connectivity, and post-commissioning support. We use tier-1 panels, certified inverters, and robust mounting structures to ensure maximum energy yield and long-term reliability.

Key Benefits:
• Highest quality components with 25-year performance warranty
• Faster project delivery with experienced installation teams
• End-to-end project management and documentation
• Competitive pricing through strong supplier relationships
• After-sales support and annual maintenance contracts',
  '/Img/solar-epc.jpg',
  JSON_ARRAY(
    JSON_OBJECT('image_url', '/Img/solar-rooftop.jpg', 'description', 'Rooftop solar installation for commercial buildings. Our systems provide clean energy and reduce electricity bills by up to 80% through net metering.'),
    JSON_OBJECT('image_url', '/Img/solar-industrial.jpg', 'description', 'Ground-mounted industrial solar plant (1 MW+). Ideal for factories, warehouses and large institutions seeking energy independence.'),
    JSON_OBJECT('image_url', '/Img/solar-storage.jpg', 'description', 'Solar + Battery Storage integration. Combine solar generation with energy storage for 24/7 clean power regardless of grid availability.')
  ),
  'solar',
  1,
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  summary = VALUES(summary),
  description = VALUES(description),
  image_url = VALUES(image_url),
  gallery = VALUES(gallery),
  category = VALUES(category),
  is_active = VALUES(is_active),
  updated_at = NOW();


-- 2. IC Battery Energy Storage (Industrial & Commercial BESS)
INSERT INTO solutions (title, slug, summary, description, image_url, gallery, category, is_active, created_at, updated_at)
VALUES (
  'IC Battery Energy Storage (Industrial & Commercial BESS)',
  'ic-battery-energy-storage',
  'Advanced LFP battery energy storage systems for industrial and commercial applications — enabling peak shaving, demand charge reduction, and grid stability.',
  'IC Battery Energy Storage (Industrial & Commercial BESS)

ION GREEN designs and deploys high-performance Battery Energy Storage Systems (BESS) using LFP technology for industrial and commercial clients across India.

Focus Areas:
• Peak Shaving
• Demand Charge Reduction
• Grid Stability
• DG Hybridization

System Range:
- 50 kWh – 5 MWh
- Rack Type & Containerized
- Air Cooled / Liquid Cooled

This solution matches ION GREEN''s LFP battery assembly manufacturing vision and supports India''s transition to clean, reliable industrial energy.

Key Features:
✔ LFP chemistry for safety and long life (8000+ cycles)
✔ Modular and scalable architecture
✔ BMS with real-time monitoring
✔ Containerized systems for rapid deployment
✔ Integration with solar PV, DG sets, and grid
✔ Remote monitoring and management

Applications:
• Manufacturing plants
• Data centers
• Hospitals and healthcare
• Commercial buildings
• Telecom towers
• Cold storage facilities

Financial Benefits:
• Reduce peak demand charges by up to 40%
• Avoid costly DG set operation
• Monetize grid services (frequency regulation, demand response)
• ROI typically within 3–5 years',
  '/Img/bess-industrial.jpg',
  JSON_ARRAY(
    JSON_OBJECT('image_url', '/Img/bess-rack.jpg', 'description', 'Rack-type BESS systems (50kWh–500kWh) for commercial installations. Compact design fits within existing electrical rooms with minimal civil work required.'),
    JSON_OBJECT('image_url', '/Img/bess-container.jpg', 'description', 'Containerized energy storage system (500kWh–5MWh) for large industrial applications. Fully integrated solution with cooling, BMS, and fire suppression.'),
    JSON_OBJECT('image_url', '/Img/bess-hybrid.jpg', 'description', 'BESS + DG Hybridization system reducing diesel consumption by 60-70% while maintaining power reliability at manufacturing facilities.')
  ),
  'bess',
  1,
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  summary = VALUES(summary),
  description = VALUES(description),
  image_url = VALUES(image_url),
  gallery = VALUES(gallery),
  category = VALUES(category),
  is_active = VALUES(is_active),
  updated_at = NOW();


-- 3. UPS Battery Backup Solutions (Up to 500 kW)
INSERT INTO solutions (title, slug, summary, description, image_url, gallery, category, is_active, created_at, updated_at)
VALUES (
  'UPS Battery Backup Solutions (Up to 500 kW)',
  'ups-battery-backup-solutions',
  'High-performance lithium UPS backup systems from 10 kW to 500 kW for data centers, hospitals, IT parks, manufacturing units, and telecom infrastructure.',
  'UPS Battery Backup Solutions (Up to 500 kW)

ION GREEN provides mission-critical lithium UPS battery backup solutions engineered for maximum reliability and minimum downtime across high-demand applications.

Target Market:
• Data Centers
• Hospitals and Healthcare Facilities
• IT Parks
• Manufacturing Units
• Telecom Infrastructure

Offering Range:
- 10 kW – 500 kW Lithium UPS Backup
- Fast Charging LFP Battery
- Modular Scalable Design
- Integration with Existing UPS Systems

This is a high-margin segment with rapid ROI for ION GREEN''s business.

Key Features:
✔ LFP battery technology for 6000+ cycle life
✔ Fast charging capability (1C/2C charge rate)
✔ Modular design — add capacity without downtime
✔ Seamless integration with existing UPS infrastructure
✔ BMS with remote monitoring and alerts
✔ Low maintenance — no acid, no fumes
✔ UL, CE, and BIS certified products

Why Lithium over Lead Acid:
• 3–4x longer life (10+ years vs 3–4 years)
• 50% smaller footprint
• No maintenance watering required
• Higher efficiency (98% vs 80%)
• Better performance in high temperatures
• Safe LFP chemistry — no thermal runaway risk

Service & Support:
• 24/7 technical support
• Annual preventive maintenance contracts
• Remote diagnostics and firmware updates
• Battery health monitoring dashboard',
  '/Img/ups-backup.jpg',
  JSON_ARRAY(
    JSON_OBJECT('image_url', '/Img/ups-datacenter.jpg', 'description', 'UPS lithium backup system for data centers. Provides seamless power transition during grid failure, protecting critical servers and network equipment.'),
    JSON_OBJECT('image_url', '/Img/ups-hospital.jpg', 'description', 'Reliable battery backup for hospitals and healthcare facilities. Ensures life-critical medical equipment never loses power during outages.'),
    JSON_OBJECT('image_url', '/Img/ups-modular.jpg', 'description', 'Modular UPS battery system for IT parks and commercial buildings. Scalable from 10kW to 500kW as your power needs grow.')
  ),
  'ups',
  1,
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  summary = VALUES(summary),
  description = VALUES(description),
  image_url = VALUES(image_url),
  gallery = VALUES(gallery),
  category = VALUES(category),
  is_active = VALUES(is_active),
  updated_at = NOW();


-- 4. Hybrid Solar System (Home & Office)
INSERT INTO solutions (title, slug, summary, description, image_url, gallery, category, is_active, created_at, updated_at)
VALUES (
  'Hybrid Solar System (Home & Office)',
  'hybrid-solar-system-home-office',
  'Smart hybrid solar systems combining solar generation, battery storage, net metering, and grid backup for homes and offices — complete energy independence at an affordable cost.',
  'Hybrid Solar System (Home & Office)

ION GREEN''s Hybrid Solar Systems are the most complete home and office energy solution — combining solar panels, lithium battery storage, smart inverter, and grid connectivity in one integrated package.

Product Line:
- 3 kW Hybrid (Home)
- 5 kW Hybrid (Premium Home / Small Office)
- 10 kW Office System

Smart Monitoring:
- Mobile app with real-time data
- Solar generation tracking
- Battery status and health
- Grid import/export monitoring
- Energy savings calculator

Combo Model:
Solar + Battery + Net Metering + Grid Backup

This is ION GREEN''s mass market scalable product — designed for the rapidly growing residential and MSME solar market in India.

System Components:
✔ Tier-1 Solar Panels (25-year performance warranty)
✔ Hybrid Inverter with inbuilt MPPT & charger
✔ LFP Battery Pack (10-year warranty)
✔ Smart monitoring system
✔ Weatherproof mounting structure
✔ Complete wiring, protection, and installation

Key Benefits:
• Zero electricity bill (or minimum grid import)
• Power during outages — no more inverter + generator dependency
• Net metering income from surplus solar energy
• 5-year comprehensive warranty
• Easy mobile app monitoring
• Government subsidy eligible (PM Surya Ghar scheme)

Ideal For:
• Residential homes (2BHK, 3BHK, villas)
• Small shops and retail outlets
• Small offices and clinics
• Petrol pumps and small factories',
  '/Img/hybrid-solar-home.jpg',
  JSON_ARRAY(
    JSON_OBJECT('image_url', '/Img/hybrid-residential.jpg', 'description', 'Hybrid solar system for a residential home with 3kW solar + 10kWh battery storage. Provides 24-hour clean power with mobile app monitoring.'),
    JSON_OBJECT('image_url', '/Img/hybrid-office.jpg', 'description', '10kW office hybrid solar system with net metering. Eliminates electricity bills and provides backup during power cuts — ideal for small businesses.'),
    JSON_OBJECT('image_url', '/Img/hybrid-monitoring.jpg', 'description', 'Smart monitoring dashboard showing real-time solar generation, battery state of charge, and grid export. Available on mobile and web.')
  ),
  'solar',
  1,
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  summary = VALUES(summary),
  description = VALUES(description),
  image_url = VALUES(image_url),
  gallery = VALUES(gallery),
  category = VALUES(category),
  is_active = VALUES(is_active),
  updated_at = NOW();


-- 5. Home & Office Lithium Battery Packs
INSERT INTO solutions (title, slug, summary, description, image_url, gallery, category, is_active, created_at, updated_at)
VALUES (
  'Home & Office Lithium Battery Packs',
  'home-office-lithium-battery-packs',
  'High-performance LFP lithium battery packs for homes and offices — 5 kWh to 15 kWh models with 6000+ cycle life, 1C discharge, and smart BMS for reliable energy storage.',
  'Home & Office Lithium Battery Packs

ION GREEN manufactures and supplies premium LFP (Lithium Iron Phosphate) battery packs for residential, office, and telecom applications — built for Indian climate conditions with the highest safety standards.

Available Models:
- 5 kWh — Ideal for small homes
- 10 kWh — Standard home & office
- 15 kWh — Premium / high-consumption homes
- 48V Rack Systems — For telecom & UPS OEMs

Specifications:
✔ 6000+ Cycles (at 80% DoD)
✔ 1C Discharge Rate
✔ Smart BMS (Battery Management System)
✔ Operating Temperature: -10°C to 55°C
✔ IP55 Protection Rating
✔ Wall-mounted or floor-standing options

This product line matches ION GREEN''s telecom & UPS market strategy and directly supports the company''s battery assembly manufacturing capabilities.

Technologies:
• LFP (LiFePO4) chemistry — safest lithium technology
• Prismatic or Cylindrical cells (Grade A)
• Active cell balancing BMS
• Built-in protection: overcharge, over-discharge, short circuit, temperature
• RS485 / CAN bus communication interface
• Compatible with all major inverter brands

Certifications:
• BIS (IS 16270) compliant
• IEC 62619 certified
• CE & RoHS marked

Warranty:
• 5-year capacity warranty (min 80% at end of warranty)
• 10-year design life',
  '/Img/lithium-battery-pack.jpg',
  JSON_ARRAY(
    JSON_OBJECT('image_url', '/Img/battery-5kwh.jpg', 'description', '5kWh wall-mounted LFP battery pack — compact and sleek design for residential installation. Pairs seamlessly with any solar hybrid inverter.'),
    JSON_OBJECT('image_url', '/Img/battery-rack.jpg', 'description', '48V rack battery system for telecom towers and UPS OEMs. Modular design allows capacity expansion without system replacement.'),
    JSON_OBJECT('image_url', '/Img/battery-bms.jpg', 'description', 'Smart BMS with real-time cell-level monitoring, temperature protection, and mobile app connectivity. Ensures maximum safety and performance.')
  ),
  'storage',
  1,
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  summary = VALUES(summary),
  description = VALUES(description),
  image_url = VALUES(image_url),
  gallery = VALUES(gallery),
  category = VALUES(category),
  is_active = VALUES(is_active),
  updated_at = NOW();


-- 6. Hydrogen Fuel Cell (Drone & Vehicle Application)
INSERT INTO solutions (title, slug, summary, description, image_url, gallery, category, is_active, created_at, updated_at)
VALUES (
  'Hydrogen Fuel Cell (Drone & Vehicle Application)',
  'hydrogen-fuel-cell-drone-vehicle',
  'Next-generation hydrogen fuel cell technology for drones and electric vehicles — enabling long-endurance UAVs and zero-emission mobility solutions.',
  'Hydrogen Fuel Cell (Drone & Vehicle Application)

ION GREEN''s Hydrogen Fuel Cell division represents our Advanced Research & Innovation arm — developing cutting-edge clean energy solutions for aerial and ground mobility applications.

This is high-tech and future-focused technology that positions ION GREEN as a forward-thinking innovation leader in the Indian clean energy space.

Applications:
• 2 kW Drone System (Current Development)
• Long Endurance UAV Power Systems
• Hydrogen Range Extender for Electric Vehicles
• Stationary Hydrogen Power Backup

Current Development:
ION GREEN is actively developing a 2 kW PEM fuel cell system for drone applications — targeting agriculture, surveillance, and delivery drones that require 3–5x longer flight endurance than conventional lithium batteries.

Key Advantages Over Battery-Only Drones:
✔ 3–5x longer flight time
✔ Rapid refueling (vs slow charging)
✔ Higher energy density
✔ Zero CO2 emissions
✔ Quiet operation

Fuel Cell System Specifications (2 kW):
- Output Power: 2 kW continuous
- Peak Power: 2.5 kW
- Operating Temperature: -10°C to 40°C
- Fuel: Pure Hydrogen (99.99%)
- System Weight: <5 kg
- Integration: Compatible with standard drone platforms

Positioning:
Advanced Research & Innovation Division – Coming Soon

This builds ION GREEN''s brand as a technology leader beyond conventional energy storage, attracting premium B2B clients, government contracts, and investor interest.',
  '/Img/hydrogen-fuel-cell.jpg',
  JSON_ARRAY(
    JSON_OBJECT('image_url', '/Img/hydrogen-drone.jpg', 'description', 'Hydrogen fuel cell powered drone system achieving 3-5x longer flight endurance versus conventional lithium battery drones. Ideal for agriculture, surveying, and delivery applications.'),
    JSON_OBJECT('image_url', '/Img/hydrogen-vehicle.jpg', 'description', 'Hydrogen range extender module for electric vehicles. Eliminates range anxiety by providing continuous power generation from hydrogen, extending EV range by 300%+.'),
    JSON_OBJECT('image_url', '/Img/hydrogen-system.jpg', 'description', 'PEM (Proton Exchange Membrane) fuel cell stack — the core of ION GREEN''s hydrogen energy technology. Clean, silent power with only water as a byproduct.')
  ),
  'hydrogen',
  1,
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  summary = VALUES(summary),
  description = VALUES(description),
  image_url = VALUES(image_url),
  gallery = VALUES(gallery),
  category = VALUES(category),
  is_active = VALUES(is_active),
  updated_at = NOW();


-- 7. EV Motorcycle / E-Mobility Solutions
INSERT INTO solutions (title, slug, summary, description, image_url, gallery, category, is_active, created_at, updated_at)
VALUES (
  'EV Motorcycle / E-Mobility Solutions',
  'ev-motorcycle-e-mobility-solutions',
  'Electric vehicle battery packs, motor-controller systems, and complete EV motorcycle solutions — enabling affordable and sustainable two-wheeler mobility for India.',
  'EV Motorcycle / E-Mobility Solutions

ION GREEN''s E-Mobility division supplies high-performance EV battery packs, motor-controller combinations, and is developing complete electric motorcycles — targeting India''s massive and rapidly growing two-wheeler market.

Product Options:
- EV Battery Pack Supply (OEM)
- Motor + Controller Integration
- Complete Electric Motorcycle (Phase 2)

Phase 1 — Current Offering:
✔ Battery Pack + Controller Supply to EV OEMs and kit converters
✔ 48V / 60V / 72V LFP battery packs
✔ BLDC / PMSM motor + controller systems
✔ Conversion kits for existing petrol motorcycles

EV Battery Pack Specifications:
- Voltage: 48V / 60V / 72V
- Capacity: 30 Ah – 100 Ah
- Chemistry: LFP (LiFePO4)
- BMS: Integrated smart BMS
- Cycle Life: 2000+ cycles
- Charging Time: 4–8 hours (standard), 2 hours (fast charge)

Phase 2 — Complete Electric Motorcycle:
ION GREEN plans to launch a branded electric motorcycle combining:
- In-house LFP battery pack (3 kWh)
- 3 kW PMSM motor
- Smart digital display
- Mobile app connectivity
- 120 km range per charge
- Affordable price point for Indian market

Market Opportunity:
India sells 15+ million two-wheelers annually. Even capturing 1% of this market means 150,000 units. With government push for EV adoption (FAME-II, PLI schemes), this is a massive opportunity.

Start with battery + controller supply, then move to full vehicle as ION GREEN''s manufacturing capabilities scale.',
  '/Img/ev-motorcycle.jpg',
  JSON_ARRAY(
    JSON_OBJECT('image_url', '/Img/ev-battery-pack.jpg', 'description', 'EV battery pack (48V-72V LFP) for electric motorcycles and three-wheelers. Lightweight, fast-charging design with integrated BMS and 2000+ cycle life.'),
    JSON_OBJECT('image_url', '/Img/ev-motor-controller.jpg', 'description', 'BLDC motor and controller system for electric two-wheelers. Provides smooth torque delivery and regenerative braking for maximum efficiency.'),
    JSON_OBJECT('image_url', '/Img/ev-complete.jpg', 'description', 'ION GREEN complete electric motorcycle concept (Phase 2). 3kWh LFP battery, 3kW motor, 120km range, smart connectivity — targeting the affordable Indian EV market.')
  ),
  'ev-mobility',
  1,
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  summary = VALUES(summary),
  description = VALUES(description),
  image_url = VALUES(image_url),
  gallery = VALUES(gallery),
  category = VALUES(category),
  is_active = VALUES(is_active),
  updated_at = NOW();

-- =============================================
-- Verify insertion
-- =============================================
SELECT id, title, slug, category, is_active, created_at 
FROM solutions 
ORDER BY id DESC;
