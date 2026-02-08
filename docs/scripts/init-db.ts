import mysql from 'mysql2/promise';

// Database configuration from environment variables
const dbConfig = {
  host: process.env.MYSQL_HOST ?? "127.0.0.1",
  port: Number(process.env.MYSQL_PORT ?? "3306"),
  user: process.env.MYSQL_USER ?? "root",
  password: process.env.MYSQL_PASSWORD ?? "",
  database: process.env.MYSQL_DATABASE ?? "green_db",
};

async function initializeDatabase() {
  console.log('Initializing database...');
  
  try {
    const pool = mysql.createPool({
      ...dbConfig,
      connectionLimit: 5,
    });

    // Initialize all tables (same as db.ts but without server-only import)
    await initializeAllTables(pool);
    
    console.log('✅ Database initialized successfully');
    
    // Add some sample hero slides if none exist
    await addSampleHeroSlides(pool);
    
    // Add sample navigation if none exist
    await addSampleNavigation(pool);
    
    console.log('✅ Sample data added successfully');
    
    await pool.end();
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

async function initializeAllTables(pool: mysql.Pool) {
  // pages table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      content LONGTEXT,
      meta_title VARCHAR(255),
      meta_description TEXT,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);

  // products table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      content LONGTEXT,
      seo_title VARCHAR(255),
      seo_description TEXT,
      seo_keywords TEXT,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // navigation table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS navigation (
      id INT AUTO_INCREMENT PRIMARY KEY,
      label VARCHAR(100) NOT NULL,
      href VARCHAR(255) NOT NULL,
      parent_id INT DEFAULT NULL,
      position INT DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (parent_id) REFERENCES navigation(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // content blocks
  await pool.query(`
    CREATE TABLE IF NOT EXISTS content_blocks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      page_id INT,
      block_type VARCHAR(50) NOT NULL,
      title VARCHAR(255),
      content LONGTEXT,
      image_url VARCHAR(512),
      button_text VARCHAR(100),
      button_url VARCHAR(512),
      position INT DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // products (full schema)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      image_url VARCHAR(512),
      category VARCHAR(100),
      features JSON,
      specifications JSON,
      applications JSON,
      benefits JSON,
      is_featured BOOLEAN DEFAULT false,
      is_active BOOLEAN DEFAULT true,
      price DECIMAL(10,2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // news
  await pool.query(`
    CREATE TABLE IF NOT EXISTS news (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      summary TEXT,
      content LONGTEXT,
      image_url VARCHAR(512),
      publish_date DATE,
      is_published BOOLEAN DEFAULT false,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Contact form submissions
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(180) NOT NULL,
      company VARCHAR(180),
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Newsletter subscriptions
  await pool.query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(180) NOT NULL UNIQUE,
      name VARCHAR(120),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Case studies
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Testimonials
  await pool.query(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      author_name VARCHAR(120) NOT NULL,
      author_title VARCHAR(200),
      author_company VARCHAR(200),
      content TEXT NOT NULL,
      rating TINYINT,
      is_featured BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Lab equipment
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Solutions
  await pool.query(`
    CREATE TABLE IF NOT EXISTS solutions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      summary TEXT,
      description TEXT,
      image_url VARCHAR(255),
      category VARCHAR(100),
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Hero slides
  await pool.query(`
    CREATE TABLE IF NOT EXISTS hero_slides (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      cta_label VARCHAR(100),
      cta_href VARCHAR(255),
      image_url VARCHAR(512),
      category VARCHAR(100),
      position INT DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Product specifications
  await pool.query(`
    CREATE TABLE IF NOT EXISTS product_specifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      image_url VARCHAR(512),
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uniq_product_spec (product_id),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Product applications
  await pool.query(`
    CREATE TABLE IF NOT EXISTS product_applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      icon_url VARCHAR(512),
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uniq_product_app (product_id),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Migrate existing tables to add missing columns
  try {
    // Check and add missing columns to products table
    const [productColumns] = await pool.query('DESCRIBE products');
    const productColNames = (productColumns as any[]).map((c: any) => c.Field);
    
    if (!productColNames.includes('features')) {
      await pool.query('ALTER TABLE products ADD COLUMN features JSON NULL AFTER category');
    }
    if (!productColNames.includes('specifications')) {
      await pool.query('ALTER TABLE products ADD COLUMN specifications JSON NULL AFTER features');
    }
    if (!productColNames.includes('applications')) {
      await pool.query('ALTER TABLE products ADD COLUMN applications JSON NULL AFTER specifications');
    }
    if (!productColNames.includes('benefits')) {
      await pool.query('ALTER TABLE products ADD COLUMN benefits JSON NULL AFTER applications');
    }
    if (!productColNames.includes('is_featured')) {
      await pool.query('ALTER TABLE products ADD COLUMN is_featured BOOLEAN DEFAULT false AFTER benefits');
    }
    if (!productColNames.includes('price')) {
      await pool.query('ALTER TABLE products ADD COLUMN price DECIMAL(10,2) NULL AFTER is_featured');
    }
    
    // Check and add missing columns to news table
    const [newsColumns] = await pool.query('DESCRIBE news');
    const newsColNames = (newsColumns as any[]).map((c: any) => c.Field);
    
    if (!newsColNames.includes('publish_date')) {
      await pool.query('ALTER TABLE news ADD COLUMN publish_date DATE NULL AFTER image_url');
    }
    if (!newsColNames.includes('is_published')) {
      await pool.query('ALTER TABLE news ADD COLUMN is_published BOOLEAN DEFAULT false AFTER image_url');
    }
    if (!newsColNames.includes('is_active')) {
      await pool.query('ALTER TABLE news ADD COLUMN is_active BOOLEAN DEFAULT true AFTER is_published');
    }
    
    console.log("Database migration completed successfully");
  } catch (error) {
    console.error("Migration error:", error);
    // Don't throw error, just log it
  }

  console.log("Database initialized with all tables");
}

async function addSampleHeroSlides(pool: mysql.Pool) {
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

async function addSampleNavigation(pool: mysql.Pool) {
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
