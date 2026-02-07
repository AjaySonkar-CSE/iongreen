const mysql = require('mysql2/promise');

const heroGreenSlides = [
  {
    title: 'Advanced Energy Storage Solutions',
    description: 'Discover cutting-edge battery technology designed for maximum efficiency and reliability.',
    cta_label: 'Learn More',
    cta_href: '/products',
    image_url: '/herogreen.jpeg',
    category: 'Energy Storage',
    position: 1,
    is_active: 1,
  },
  {
    title: 'Renewable Energy Integration',
    description: 'Seamlessly integrate solar and wind power with intelligent energy storage systems.',
    cta_label: 'Explore Solutions',
    cta_href: '/solutions',
    image_url: '/herogreen1.PNG',
    category: 'Renewable Energy',
    position: 2,
    is_active: 1,
  },
  {
    title: 'Commercial & Industrial Applications',
    description: 'Optimize operational costs with enterprise-grade energy management solutions.',
    cta_label: 'See Case Studies',
    cta_href: '/case',
    image_url: '/herogreen3.PNG',
    category: 'Industrial',
    position: 3,
    is_active: 1,
  },
  {
    title: 'Smart Grid Solutions',
    description: 'Transform your facility with intelligent power distribution and monitoring.',
    cta_label: 'Get Started',
    cta_href: '/contact',
    image_url: '/herogreen4.jpeg',
    category: 'Smart Grid',
    position: 4,
    is_active: 1,
  },
  {
    title: 'Future of Energy Storage',
    description: 'Experience the next generation of sustainable energy technology.',
    cta_label: 'Request Demo',
    cta_href: '/contact',
    image_url: '/herogreen5.jpeg',
    category: 'Innovation',
    position: 5,
    is_active: 1,
  },
];

async function addHeroGreenSlides() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'green_db',
    });

    console.log('✓ Connected to database\n');
    console.log('Adding 5 herogreen images to hero_slides table...\n');

    for (const slide of heroGreenSlides) {
      try {
        const query = `INSERT INTO hero_slides (title, description, cta_label, cta_href, image_url, category, position, is_active, created_at, updated_at)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;
        
        await connection.execute(query, [
          slide.title,
          slide.description,
          slide.cta_label,
          slide.cta_href,
          slide.image_url,
          slide.category,
          slide.position,
          slide.is_active,
        ]);

        console.log(`✓ Added: ${slide.title}`);
        console.log(`  Image: ${slide.image_url}`);
        console.log(`  Position: ${slide.position}\n`);
      } catch (error) {
        console.error(`✗ Error adding "${slide.title}":`, error.message);
      }
    }

    console.log('✓ All herogreen slides added successfully!');
  } catch (error) {
    console.error('✗ Database connection error:', error.message);
    console.error('\nMake sure:');
    console.error('1. MySQL is running on localhost:3306');
    console.error('2. Database "green_db" exists');
    console.error('3. User "root" has access');
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

addHeroGreenSlides();
