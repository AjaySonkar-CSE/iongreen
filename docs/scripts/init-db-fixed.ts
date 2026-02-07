import { getDbPool } from "../src/lib/db";

async function main() {
  try {
    // Create a connection without specifying the database
    const config = {
      host: process.env.MYSQL_HOST ?? "127.0.0.1",
      port: Number(process.env.MYSQL_PORT ?? "3306"),
      user: process.env.MYSQL_USER ?? "root",
      password: process.env.MYSQL_PASSWORD ?? "Pravin2005",
      multipleStatements: true,
    };

    // Create a temporary connection to create the database
    const tempConnection = await require('mysql2/promise').createConnection(config);
    
    // Create the database if it doesn't exist
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS green_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    
    console.log("✅ Database 'green_db' created or already exists");
    
    // Now connect to the specific database to create tables
    const pool = await getDbPool();
    
    // Create lab_equipment table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lab_equipment (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        image_url VARCHAR(255),
        category VARCHAR(100),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Table 'lab_equipment' created or already exists.");

    // Seed lab_equipment table
    const equipment = [
      { name: 'Digital PH Meter', description: 'High-precision digital pH meter for accurate measurements.', image_url: '/images/lab/digital-ph-meter.jpg' },
      { name: 'Conductivity Meter', description: 'Measures the electrical conductivity in a solution.', image_url: '/images/lab/conductivity-meter.jpg' },
      { name: 'Hot Plate', description: 'Used for heating samples and chemical reactions.', image_url: '/images/lab/hot-plate.jpg' },
      { name: 'Magnetic Stirrer', description: 'For stirring liquids with a magnetic bar.', image_url: '/images/lab/magnetic-stirrer.jpg' },
      { name: 'Water Bath', description: 'Maintains a constant water temperature for incubating samples.', image_url: '/images/lab/water-bath.jpg' },
      { name: 'Digital Balance', description: 'For precise measurement of mass.', image_url: '/images/lab/digital-balance.jpg' },
      { name: 'Oven', description: 'Used for drying and sterilizing laboratory equipment.', image_url: '/images/lab/oven.jpg' },
      { name: 'Fume Hood', description: 'A ventilated enclosure to protect from hazardous fumes.', image_url: '/images/lab/fume-hood.jpg' },
    ];

    // Clear the table before inserting to avoid duplicates on re-run
    await pool.query('TRUNCATE TABLE lab_equipment');

    for (const item of equipment) {
      await pool.query('INSERT INTO lab_equipment (name, slug, description, image_url) VALUES (?, ?, ?, ?)', [
        item.name,
        item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        item.description,
        item.image_url,
      ]);
    }
    
    // Create solutions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS solutions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        summary TEXT,
        description TEXT,
        image_url VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Table 'solutions' created or already exists.");
    
    // Seed solutions table
    const solutions = [
      { 
        title: "Utility Scale Energy Storage", 
        slug: "utility-scale-energy-storage",
        summary: "Optimize energy efficiency, enable renewable integration, and provide grid services with turnkey BESS containers.",
        description: "Containerized battery energy storage systems up to 5.015MWh\nAdvanced safety with multi-level protection systems\nSCADA & EMS ready for remote operations and monitoring\nOutdoor-rated containers designed for harsh environments\nHigh-safety LFP chemistry with 8000+ cycle life",
        image_url: "/1/ion1.png"
      },
      { 
        title: "Commercial & Industrial", 
        slug: "commercial-industrial",
        summary: "Reduce peak demand charges, stabilize power supply, and ensure business continuity for manufacturing and logistics sites.",
        description: "Modular cabinet and containerized systems from 100kWh to 5.015MWh\nPeak shaving and load shifting capabilities\nUL9540, UL1973, CE compliant for safety assurance\nSmart EMS integration for intelligent energy management\nExpandable capacity modules for future growth",
        image_url: "/1/ion2.png"
      },
      { 
        title: "Residential All-in-One", 
        slug: "residential-all-in-one",
        summary: "Smart home battery systems with wall-mounted and stackable options to pair with rooftop solar or EV charging.",
        description: "Wall-mounted and stackable ESS options from 5kWh to 35kWh\nSeamless solar integration with hybrid inverters\nBackup power ready for emergency situations\nExpandable capacity modules for growing energy needs\nApp-based monitoring for real-time system status",
        image_url: "/1/ion3.png"
      },
      { 
        title: "Microgrids", 
        slug: "microgrids",
        summary: "Independent energy systems that can operate connected to or disconnected from the main grid, providing resilience and energy independence.",
        description: "Islandable operation for critical facility independence\nIntegration with multiple renewable energy sources\nAdvanced control systems for optimal energy management\nScalable architecture for community-wide deployment\nCyber-secure communication protocols",
        image_url: "/1/ion4.png"
      },
      { 
        title: "Renewable Integration", 
        slug: "renewable-integration",
        summary: "Seamlessly integrate solar, wind, and other renewable energy sources with battery storage for maximum efficiency and reliability.",
        description: "Smart inverters for renewable source optimization\nBattery storage for energy smoothing and shifting\nPredictive analytics for renewable energy forecasting\nGrid-tied and off-grid configuration options\nAdvanced power electronics for maximum efficiency",
        image_url: "/1/ion5.png"
      }
    ];
    
    // Clear the table before inserting to avoid duplicates on re-run
    await pool.query('TRUNCATE TABLE solutions');
    
    for (const solution of solutions) {
      await pool.query('INSERT INTO solutions (title, slug, summary, description, image_url) VALUES (?, ?, ?, ?, ?)', [
        solution.title,
        solution.slug,
        solution.summary,
        solution.description,
        solution.image_url,
      ]);
    }
    
    // Create case_studies table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS case_studies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        client_name VARCHAR(200),
        location VARCHAR(200),
        industry VARCHAR(100),
        challenge TEXT,
        solution TEXT,
        results TEXT,
        image_url VARCHAR(255),
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Table 'case_studies' created or already exists.");
    
    // Seed case_studies table
    const caseStudies = [
      { 
        title: "Commercial Energy Storage System", 
        slug: "commercial-energy-storage-system",
        client_name: "TechCorp Industries",
        location: "North America",
        industry: "Manufacturing",
        challenge: "The client faced high peak demand charges and wanted to reduce their electricity costs while ensuring uninterrupted power supply for critical operations.",
        solution: "We deployed a 2MWh energy storage system integrated with their existing solar installation to reduce peak demand charges and provide backup power.",
        results: "Achieved 40% reduction in peak demand charges and 30% increase in renewable energy usage with seamless backup during grid outages.",
        image_url: "/images/casegreen.jpeg",
        is_featured: true
      },
      { 
        title: "Industrial Microgrid Project", 
        slug: "industrial-microgrid-project",
        client_name: "Global Manufacturing Ltd",
        location: "Europe",
        industry: "Automotive",
        challenge: "The automotive plant required 24/7 power availability to avoid costly production downtime and needed to reduce their carbon footprint.",
        solution: "Implemented a 5MWh microgrid solution with solar integration and battery storage to ensure continuous power supply and reduce grid dependence.",
        results: "Achieved 99.9% power reliability, 50% reduction in carbon footprint, and ROI in 3.5 years.",
        image_url: "/images/casegreen.jpeg",
        is_featured: true
      },
      { 
        title: "Residential Community Storage", 
        slug: "residential-community-storage",
        client_name: "Green Valley Residents Association",
        location: "Asia",
        industry: "Residential",
        challenge: "The residential complex wanted to reduce energy costs and improve grid stability while promoting renewable energy adoption among residents.",
        solution: "Deployed community energy storage for the residential complex, enabling energy sharing and cost savings through peak shaving and load shifting.",
        results: "Achieved 25% reduction in energy costs, improved grid stability, and enhanced renewable energy integration.",
        image_url: "/images/casegreen.jpeg",
        is_featured: true
      }
    ];
    
    // Clear the table before inserting to avoid duplicates on re-run
    await pool.query('TRUNCATE TABLE case_studies');
    
    for (const caseStudy of caseStudies) {
      await pool.query('INSERT INTO case_studies (title, slug, client_name, location, industry, challenge, solution, results, image_url, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        caseStudy.title,
        caseStudy.slug,
        caseStudy.client_name,
        caseStudy.location,
        caseStudy.industry,
        caseStudy.challenge,
        caseStudy.solution,
        caseStudy.results,
        caseStudy.image_url,
        caseStudy.is_featured,
      ]);
    }
    
    console.log("✅ Database tables initialized and seeded successfully");
    
    // Close the connections
    await pool.end();
    await tempConnection.end();
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1);
  }
}

main();