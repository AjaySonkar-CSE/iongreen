import { dbService } from '../src/lib/db-service';

async function initializeDatabase() {
  console.log('Initializing database...');
  
  try {
    const result = await dbService.initialize();
    
    if (result.success) {
      console.log('✅ Database initialized successfully');
      
      // Add some sample hero slides if none exist
      await addSampleHeroSlides();
      
      // Add sample navigation if none exist
      await addSampleNavigation();
      
      console.log('✅ Sample data added successfully');
    } else {
      console.error('❌ Database initialization failed:', result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

async function addSampleHeroSlides() {
  const pool = await import('../src/lib/db').then(mod => mod.getDbPool());
  
  // Check if hero slides already exist
  const [existingSlides] = await pool.query('SELECT COUNT(*) as count FROM hero_slides') as any;
  
  if (existingSlides[0].count === 0) {
    console.log('Adding sample hero slides...');
    
    const sampleSlides = [
      {
        title: "Advanced Energy Solutions",
        description: "Leading provider of cutting-edge energy storage systems for residential, commercial, and industrial applications.",
        cta_label: "Explore Solutions",
        cta_href: "/solutions",
        image_url: "/images/hero-slide-1.jpg",
        category: "energy",
        position: 1
      },
      {
        title: "Sustainable Power Systems",
        description: "Innovative green technology solutions designed to power a sustainable future.",
        cta_label: "Our Products",
        cta_href: "/products",
        image_url: "/images/hero-slide-2.jpg",
        category: "sustainability",
        position: 2
      },
      {
        title: "Clean Energy Innovation",
        description: "Pioneering the next generation of clean energy storage and management systems.",
        cta_label: "About Us",
        cta_href: "/about",
        image_url: "/images/hero-slide-3.jpg",
        category: "innovation",
        position: 3
      }
    ];

    for (const slide of sampleSlides) {
      await pool.query(`
        INSERT INTO hero_slides (title, description, cta_label, cta_href, image_url, category, position, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        slide.title,
        slide.description,
        slide.cta_label,
        slide.cta_href,
        slide.image_url,
        slide.category,
        slide.position,
        true
      ]);
    }
    
    console.log(`✅ Added ${sampleSlides.length} sample hero slides`);
  } else {
    console.log('ℹ️ Hero slides already exist, skipping sample data');
  }
}

async function addSampleNavigation() {
  const pool = await import('../src/lib/db').then(mod => mod.getDbPool());
  
  // Check if navigation items already exist
  const [existingNav] = await pool.query('SELECT COUNT(*) as count FROM navigation') as any;
  
  if (existingNav[0].count === 0) {
    console.log('Adding sample navigation...');
    
    const sampleNavItems = [
      { label: "Home", href: "/", position: 1 },
      { label: "Products", href: "/products", position: 2 },
      { label: "Solutions", href: "/solutions", position: 3 },
      { label: "About", href: "/about", position: 4 },
      { label: "News", href: "/news", position: 5 },
      { label: "Contact", href: "/contact", position: 6 }
    ];

    for (const item of sampleNavItems) {
      await pool.query(`
        INSERT INTO navigation (label, href, position, is_active)
        VALUES (?, ?, ?, ?)
      `, [
        item.label,
        item.href,
        item.position,
        true
      ]);
    }
    
    console.log(`✅ Added ${sampleNavItems.length} sample navigation items`);
  } else {
    console.log('ℹ️ Navigation items already exist, skipping sample data');
  }
}

initializeDatabase();