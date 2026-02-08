import mysql from 'mysql2/promise';

// Database configuration from environment variables
const dbConfig = {
  host: process.env.MYSQL_HOST ?? "127.0.0.1",
  port: Number(process.env.MYSQL_PORT ?? "3306"),
  user: process.env.MYSQL_USER ?? "root",
  password: process.env.MYSQL_PASSWORD ?? "",
  database: process.env.MYSQL_DATABASE ?? "green_db",
};

const newSolutions = [
  {
    title: "Telecom Industry Solutions",
    slug: "telecom-industry",
    summary: "Reliable backup power solutions for telecommunications infrastructure, ensuring uninterrupted connectivity and network stability.",
    description: `Telecom Industry Energy Storage Solutions

Our advanced battery energy storage systems (BESS) are specifically designed for telecommunications infrastructure, providing reliable backup power to ensure uninterrupted network operations. These solutions are critical for maintaining connectivity during power outages and grid instability.

Key Features:
• High reliability with 99.9% uptime guarantee
• Long cycle life (8000+ cycles) for extended service
• Wide operating temperature range (-20°C to 60°C)
• Modular design for easy expansion
• Remote monitoring and management capabilities
• UL9540 and CE certified for safety compliance

Applications:
• Base station backup power
• Data center UPS systems
• Network equipment protection
• Emergency communication systems
• Remote site power supply

Benefits:
• Ensures continuous network availability
• Reduces operational costs through peak shaving
• Supports renewable energy integration
• Low maintenance requirements
• Scalable architecture for growing networks`,
    image_url: "/Img/image1.png",
    category: "telecom",
    is_active: true
  },
  {
    title: "Data Centre Solutions",
    slug: "data-centre-solutions",
    summary: "Mission-critical energy storage for data centers, providing seamless backup power and load management for uninterrupted operations.",
    description: `Data Centre Energy Storage Solutions

Our containerized and modular energy storage systems are engineered for data center applications, providing critical backup power and intelligent load management. These solutions ensure zero downtime and optimal power efficiency for mission-critical operations.

Key Features:
• Containerized systems from 500kWh to 5MWh
• N+1 redundancy for maximum reliability
• Advanced cooling systems for optimal performance
• Real-time monitoring and predictive maintenance
• Integration with existing UPS systems
• Fast response time (<100ms) for seamless transition

Applications:
• Data center UPS backup
• Peak shaving and load shifting
• Grid stabilization services
• Renewable energy integration
• Emergency power systems
• Power quality improvement

Benefits:
• Guaranteed uptime for critical operations
• Significant reduction in electricity costs
• Enhanced power quality and reliability
• Support for green energy initiatives
• Scalable solutions for growing data centers
• Comprehensive monitoring and control`,
    image_url: "/Img/image2.png",
    category: "data-centre",
    is_active: true
  },
  {
    title: "Commercial & Industrial (C&I) Solutions",
    slug: "commercial-industrial",
    summary: "Comprehensive energy storage solutions for commercial and industrial facilities, reducing costs and ensuring reliable power supply.",
    description: `Commercial & Industrial Energy Storage Solutions

Our C&I energy storage systems are designed to help businesses reduce electricity costs, improve power reliability, and support sustainability goals. From manufacturing facilities to retail centers, our solutions are tailored to meet diverse commercial and industrial needs.

Key Features:
• Modular cabinet systems from 100kWh to 2MWh
• Peak demand reduction capabilities
• Load shifting and time-of-use optimization
• Grid services participation
• Smart energy management system (EMS)
• Easy integration with existing infrastructure

Applications:
• Manufacturing facilities
• Retail and commercial buildings
• Warehouses and logistics centers
• Office complexes
• Healthcare facilities
• Educational institutions

Benefits:
• Up to 40% reduction in peak demand charges
• Improved power reliability and quality
• Support for renewable energy integration
• Enhanced sustainability credentials
• Quick ROI (typically 3-5 years)
• Scalable architecture for future expansion`,
    image_url: "/Img/image3.png",
    category: "commercial-industrial",
    is_active: true
  },
  {
    title: "Battery Backup Solutions",
    slug: "battery-backup",
    summary: "Reliable battery backup systems for residential, commercial, and critical applications, ensuring power continuity during outages.",
    description: `Battery Backup Solutions

Our comprehensive battery backup systems provide reliable power continuity for residential, commercial, and critical applications. Whether for home use, small businesses, or essential services, our solutions ensure you stay powered during grid outages.

Key Features:
• Residential systems from 5kWh to 35kWh
• Commercial systems up to 500kWh
• Seamless automatic transfer switching
• Solar integration ready
• Long-lasting LiFePO4 battery technology
• User-friendly monitoring apps

Applications:
• Residential backup power
• Small business continuity
• Home office power supply
• Medical equipment backup
• Security system power
• Emergency lighting systems

Benefits:
• Peace of mind during power outages
• Energy independence
• Solar energy storage capability
• Low maintenance requirements
• Long service life (10+ years)
• Quiet and clean operation`,
    image_url: "/Img/image4.png",
    category: "backup",
    is_active: true
  }
];

async function addSolutions() {
  let connection;
  try {
    connection = await mysql.createConnection({
      ...dbConfig,
      connectionLimit: 5,
    });

    console.log('✓ Connected to database\n');
    console.log('Adding new solutions to solutions table...\n');

    for (const solution of newSolutions) {
      try {
        // Check if solution already exists
        const [existing] = await connection.query(
          'SELECT id FROM solutions WHERE slug = ?',
          [solution.slug]
        ) as any[];

        if (existing.length > 0) {
          console.log(`⚠️  Solution "${solution.title}" already exists, updating...`);
          await connection.query(
            `UPDATE solutions 
             SET title = ?, summary = ?, description = ?, image_url = ?, is_active = ?
             WHERE slug = ?`,
            [
              solution.title,
              solution.summary,
              solution.description,
              solution.image_url,
              solution.is_active,
              solution.slug
            ]
          );
          console.log(`✅ Updated: ${solution.title}`);
        } else {
          await connection.query(
            `INSERT INTO solutions (title, slug, summary, description, image_url, is_active)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
              solution.title,
              solution.slug,
              solution.summary,
              solution.description,
              solution.image_url,
              solution.is_active
            ]
          );
          console.log(`✅ Added: ${solution.title}`);
        }
        console.log(`   Slug: ${solution.slug}\n`);
      } catch (error: any) {
        console.error(`✗ Error adding "${solution.title}":`, error.message);
      }
    }

    console.log('✅ All solutions processed successfully!');
  } catch (error: any) {
    console.error('✗ Database connection error:', error.message);
    console.error('\nMake sure:');
    console.error('1. MySQL is running');
    console.error('2. Database exists');
    console.error('3. User has access');
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

addSolutions();

