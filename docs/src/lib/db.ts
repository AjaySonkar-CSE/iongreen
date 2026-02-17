import 'server-only';
import mysql from "mysql2/promise";
import type { Pool } from "mysql2/promise";

declare global {
  // Allow global pool in Next.js hot reload environment
  var __mysqlPool: Pool | undefined;
}

const config = {
  host: process.env.MYSQL_HOST ?? "127.0.0.1",
  port: Number(process.env.MYSQL_PORT ?? "3306"),
  user: process.env.MYSQL_USER ?? "root",
  password: process.env.MYSQL_PASSWORD ?? "",
  database: process.env.MYSQL_DATABASE ?? "green_db",
  connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT ?? "5"),
};

export function getDbPool() {
  if (!global.__mysqlPool) {
    console.log("Creating new database connection pool with config:", {
      ...config,
      password: config.password ? "[HIDDEN]" : undefined,
    });

    global.__mysqlPool = mysql.createPool(config);

    // Test the connection
    global.__mysqlPool
      .getConnection()
      .then((connection) => {
        console.log("Successfully connected to database");
        connection.release();
      })
      .catch((err) => {
        console.error("Error connecting to database:", err);
        // Don't throw here, just log the error
      });
  }

  return global.__mysqlPool;
}

// Initialize all database tables
export async function initializeDatabase() {
  const pool = getDbPool();



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

  // products
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

  await ensureContactTable();
  await ensureNewsletterTable();
  await ensureCaseStudiesTable();
  await ensureTestimonialsTable();
  await ensureLabEquipmentTable();
  await ensureSolutionsTable();
  await ensureHeroSlidesTable();
  await ensureProductSpecificationsTable();
  await ensureProductApplicationsTable();
  await migrateExistingTables();

  console.log("Database initialized with all tables");
}

// Contact form submissions
export async function ensureContactTable() {
  const pool = getDbPool();
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
}

// Newsletter subscriptions
export async function ensureNewsletterTable() {
  const pool = getDbPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(180) NOT NULL UNIQUE,
      name VARCHAR(120),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

// Case studies
export async function ensureCaseStudiesTable() {
  const pool = getDbPool();
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
}

// Testimonials
export async function ensureTestimonialsTable() {
  const pool = getDbPool();
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
}

// Lab equipment
export async function ensureLabEquipmentTable() {
  const pool = getDbPool();
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
}

// Solutions
export async function ensureSolutionsTable() {
  const pool = getDbPool();
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
}

// Hero slides
export async function ensureHeroSlidesTable() {
  const pool = getDbPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS hero_slides (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      cta_label VARCHAR(100),
      cta_href VARCHAR(255),
      image_url VARCHAR(512),
      category VARCHAR(100), -- Add category column
      position INT DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

// Product specifications (one record per product)
export async function ensureProductSpecificationsTable() {
  const pool = getDbPool();
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
}

// Product applications (one record per product)
export async function ensureProductApplicationsTable() {
  const pool = getDbPool();
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
  const [columns] = await pool.query('DESCRIBE product_applications');
  const colNames = (columns as any[]).map((c: any) => c.Field);
  if (!colNames.includes('icon_url')) {
    await pool.query('ALTER TABLE product_applications ADD COLUMN icon_url VARCHAR(512) NULL AFTER description');
  }
}

// Migrate existing tables to add missing columns
export async function migrateExistingTables() {
  const pool = getDbPool();

  try {
    // Check and add missing columns to products table
    const [productColumns] = await pool.query('DESCRIBE products');
    const productColNames = (productColumns as any[]).map((c: any) => c.Field);

    if (!productColNames.includes('name')) {
      await pool.query('ALTER TABLE products ADD COLUMN name VARCHAR(255) NOT NULL AFTER id');
    }
    if (!productColNames.includes('description')) {
      await pool.query('ALTER TABLE products ADD COLUMN description TEXT AFTER slug');
    }
    if (!productColNames.includes('image_url')) {
      await pool.query('ALTER TABLE products ADD COLUMN image_url VARCHAR(512) AFTER description');
    }
    if (!productColNames.includes('category')) {
      await pool.query('ALTER TABLE products ADD COLUMN category VARCHAR(100) AFTER image_url');
    }
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
    if (!productColNames.includes('price')) {
      await pool.query('ALTER TABLE products ADD COLUMN price DECIMAL(10,2) NULL AFTER benefits');
    }
    if (!productColNames.includes('is_featured')) {
      await pool.query('ALTER TABLE products ADD COLUMN is_featured BOOLEAN DEFAULT false AFTER price');
    }

    // Check and add missing columns to navigation table
    const [navColumns] = await pool.query('DESCRIBE navigation');
    const navColNames = (navColumns as any[]).map((c: any) => c.Field);

    if (!navColNames.includes('description')) {
      await pool.query('ALTER TABLE navigation ADD COLUMN description VARCHAR(255) NULL AFTER href');
    }
    if (!navColNames.includes('image_url')) {
      await pool.query('ALTER TABLE navigation ADD COLUMN image_url VARCHAR(512) NULL AFTER description');
    }

    // Check and add missing columns to news table
    const [newsColumns] = await pool.query('DESCRIBE news');
    const newsColNames = (newsColumns as any[]).map((c: any) => c.Field);

    if (!newsColNames.includes('is_active')) {
      await pool.query('ALTER TABLE news ADD COLUMN is_active BOOLEAN DEFAULT true AFTER is_published');
    }

    console.log("Database migration completed successfully");
  } catch (error) {
    console.error("Migration error:", error);
    // Don't throw error, just log it
  }
}

