import mysql from 'mysql2/promise';

async function main() {
  try {
    // Database configuration
    const config = {
      host: process.env.MYSQL_HOST ?? "localhost",
      port: Number(process.env.MYSQL_PORT ?? "3306"),
      user: process.env.MYSQL_USER ?? "root",
      password: process.env.MYSQL_PASSWORD ?? "",  // Empty string if no password
      multipleStatements: true,
    };

    console.log("Connecting to MySQL with config:", {
      ...config,
      password: config.password ? "[HIDDEN]" : "[EMPTY]"
    });

    // Create a temporary connection to create the database
    const tempConnection = await mysql.createConnection(config);
    
    // Create the database if it doesn't exist
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS ?? CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`, [process.env.MYSQL_DATABASE ?? "green_db"]);
    
    console.log("✅ Database created or already exists");
    
    // Close temp connection and create pool connection to the specific database
    await tempConnection.end();
    
    // Connect to the specific database to create tables
    const poolConfig = {
      ...config,
      database: process.env.MYSQL_DATABASE ?? "green_db",
      connectionLimit: 5
    };
    
    const pool = mysql.createPool(poolConfig);

    // Create hero_slides table
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
    console.log("✅ Table 'hero_slides' created or already exists.");

    // Create navigation table
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
    console.log("✅ Table 'navigation' created or already exists.");

    // Create pages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content LONGTEXT,
        seo_title VARCHAR(255),
        seo_description TEXT,
        seo_keywords TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log("✅ Table 'pages' created or already exists.");

    // Create products table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        price DECIMAL(10, 2) DEFAULT 0.00,
        image_url VARCHAR(512),
        category VARCHAR(100),
        features JSON,
        specifications JSON,
        applications JSON,
        benefits JSON,
        is_featured BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log("✅ Table 'products' created or already exists.");

    // Create news table
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log("✅ Table 'news' created or already exists.");

    // Create contact_requests table
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
    console.log("✅ Table 'contact_requests' created or already exists.");

    // Create newsletter_subscriptions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(180) NOT NULL UNIQUE,
        name VARCHAR(120),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log("✅ Table 'newsletter_subscriptions' created or already exists.");

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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log("✅ Table 'lab_equipment' created or already exists.");

    // Create solutions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS solutions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        summary TEXT,
        description TEXT,
        image_url VARCHAR(255),
        category VARCHAR(100),
        seo_title VARCHAR(255),
        seo_description TEXT,
        seo_keywords TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log("✅ Table 'solutions' created or already exists.");

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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log("✅ Table 'case_studies' created or already exists.");

    // Create product_specifications table
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
    console.log("✅ Table 'product_specifications' created or already exists.");

    // Create product_applications table
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
    console.log("✅ Table 'product_applications' created or already exists.");

    // Add sample hero slides if none exist
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

    // Add sample navigation if none exist
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

    console.log("✅ Database tables initialized successfully");
    
    // Close the pool
    await pool.end();
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1);
  }
}

main();