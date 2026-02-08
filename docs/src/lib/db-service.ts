import 'server-only';
import { getDbPool } from "./db";

// Flag to enable/disable database usage for development
const USE_DATABASE = process.env.USE_DATABASE !== 'false';

interface Page {
  id: number;
  slug: string;
  title: string;
  content: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

interface NavigationItem {
  id: number;
  label: string;
  href: string;
  parent_id: number | null;
  position: number;
  is_active: boolean;
  children?: NavigationItem[];
}

interface ContentBlock {
  id: number;
  page_id: number;
  block_type: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  button_text: string | null;
  button_url: string | null;
  position: number;
  is_active: boolean;
}

export const dbService = {
  // Initialize the database
  async initialize() {
    try {
      const pool = getDbPool();
      // Import the initializeDatabase function directly to avoid circular dependency
      const { initializeDatabase } = await import('./db');
      await initializeDatabase();
      console.log('Database initialized successfully');
      return true;
    } catch (error) {
      console.warn('Running in offline mode - using mock data');
      return false;
    }
  },

  // Mock data for products
  mockProducts: [
    {
      id: 1,
      name: 'Residential Energy Storage',
      slug: 'residential-storage',
      description: 'Efficient home energy storage solution',
      price: 5000,
      image_url: '/images/products/residential.jpg',
      category: 'residential',
      features: ['High capacity', 'Long lifespan', 'Smart monitoring'],
      specifications: { capacity: '10kWh', weight: '120kg', warranty: '10 years' },
      applications: ['Home backup', 'Solar integration', 'Load shifting'],
      benefits: ['Energy independence', 'Cost savings', 'Reduced carbon footprint'],
      is_featured: true,
      is_active: true
    },
    // Add more mock products as needed
  ],

  // Page operations
  async getPageBySlug(slug: string): Promise<Page | null> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM pages WHERE slug = ? AND is_active = TRUE', 
      [slug]
    ) as unknown as [Page[]];
    return rows && rows.length > 0 ? rows[0] : null;
  },

  async getPageBlocks(pageId: number): Promise<ContentBlock[]> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM content_blocks WHERE page_id = ? AND is_active = TRUE ORDER BY position ASC',
      [pageId]
    ) as unknown as [ContentBlock[]];
    return rows || [];
  },

  // Navigation
  async getNavigation(): Promise<NavigationItem[]> {
    const pool = getDbPool();
    const [items] = await pool.query(
      'SELECT * FROM navigation WHERE is_active = TRUE ORDER BY position ASC'
    ) as unknown as [NavigationItem[]];

    // Build hierarchical navigation
    const navMap = new Map<number, NavigationItem>();
    const rootItems: NavigationItem[] = [];

    // First pass: create map of all items
    items.forEach(item => {
      navMap.set(item.id, { ...item, children: [] });
    });

    // Second pass: build hierarchy
    items.forEach(item => {
      const navItem = navMap.get(item.id);
      if (navItem) {
        if (item.parent_id) {
          const parent = navMap.get(item.parent_id);
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push(navItem);
          }
        } else {
          rootItems.push(navItem);
        }
      }
    });

    return rootItems;
  },

  // Get products with filtering options
  async getProducts(category?: string, limit = 10, isFeatured?: boolean): Promise<Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    features: any;
    specifications: any;
    applications: any;
    benefits: any;
    is_featured: boolean;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
  }>> {
    return this._getProducts(category, limit, isFeatured, true); // Only active by default
  },

  // Get all products (both active and inactive)
  async getAllProducts(category?: string, limit = 100): Promise<Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    features: any;
    specifications: any;
    applications: any;
    benefits: any;
    is_featured: boolean;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
  }>> {
    return this._getProducts(category, limit, undefined, false); // All products (active and inactive)
  },

  // Private helper method for getting products with active status control
  async _getProducts(category?: string, limit = 10, isFeatured?: boolean, activeOnly = true): Promise<Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    features: any;
    specifications: any;
    applications: any;
    benefits: any;
    is_featured: boolean;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
  }>> {
    // Use mock data when not using database or when database is not available
    if (!USE_DATABASE) {
      let products = [...this.mockProducts];
      
      if (category) {
        products = products.filter(p => p.category === category);
      }
      
      if (isFeatured !== undefined) {
        products = products.filter(p => p.is_featured === isFeatured);
      }
      
      return products.slice(0, limit);
    }
    
    // Try to get data from database if available
    try {
      const pool = getDbPool();
      let query = 'SELECT * FROM products';
      const params: any[] = [];
      
      // Add active filter only if activeOnly is true
      if (activeOnly) {
        query += ' WHERE is_active = 1';
      } else {
        query += ' WHERE 1=1'; // Always true condition to allow adding other filters
      }
      
      if (category) {
        query += ' AND category = ?';
        params.push(category);
      }
      
      if (isFeatured !== undefined) {
        query += ' AND is_featured = ?';
        params.push(isFeatured ? 1 : 0);
      }
      
      query += ' ORDER BY created_at DESC LIMIT ?';
      params.push(limit);

      const [rows] = await pool.query(query, params) as unknown as [Array<{
        id: number;
        name: string;
        slug: string;
        description: string;
        price: number;
        image_url: string;
        category: string;
        features: any;
        specifications: any;
        applications: any;
        benefits: any;
        is_featured: boolean;
        is_active: boolean;
        created_at: string;
        updated_at: string;
      }>];
      
      return rows.map(row => ({
        ...row,
        features: row.features ? JSON.parse(row.features) : [],
        specifications: row.specifications ? JSON.parse(row.specifications) : {},
        applications: row.applications ? JSON.parse(row.applications) : [],
        benefits: row.benefits ? JSON.parse(row.benefits) : []
      }));
    } catch (error) {
      console.warn('Database error, using mock data instead:', error);
      let products = [...this.mockProducts];
      
      if (category) {
        products = products.filter(p => p.category === category);
      }
      
      if (isFeatured !== undefined) {
        products = products.filter(p => p.is_featured === isFeatured);
      }
      
      return products.slice(0, limit);
    }
  },

  // Get single product by slug
  async getProductBySlug(slug: string): Promise<{
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    features: any;
    specifications: any;
    applications: any;
    benefits: any;
    is_featured: boolean;
    is_active: boolean;
    brochure_url?: string;
  } | null> {
    // Use mock data when not using database or when database is not available
    if (!USE_DATABASE) {
      const product = this.mockProducts.find(p => p.slug === slug && p.is_active !== false);
      return product ? {
        ...product,
        brochure_url: undefined
      } : null;
    }
    
    try {
      const pool = getDbPool();
      const [rows] = await pool.query(
        'SELECT * FROM products WHERE slug = ? AND is_active = TRUE LIMIT 1',
        [slug]
      ) as unknown as [Array<{
        id: number;
        name: string;
        slug: string;
        description: string;
        price: number;
        image_url: string;
        category: string;
        features: any;
        specifications: any;
        applications: any;
        benefits: any;
        is_featured: boolean;
        is_active: boolean;
        brochure_url?: string;
      }>];
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.warn('Database error fetching product by slug, using mock data:', error);
      const product = this.mockProducts.find(p => p.slug === slug && p.is_active !== false);
      return product ? {
        ...product,
        brochure_url: undefined
      } : null;
    }
  },

  // Get single product by ID
  async getProductById(id: number): Promise<{
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    features: any;
    specifications: any;
    applications: any;
    benefits: any;
    is_featured: boolean;
    is_active: boolean;
    brochure_url?: string;
  } | null> {
    // Use mock data when not using database or when database is not available
    if (!USE_DATABASE) {
      const product = this.mockProducts.find(p => p.id === id);
      return product ? {
        ...product,
        brochure_url: undefined
      } : null;
    }
    
    try {
      const pool = getDbPool();
      const [rows] = await pool.query(
        'SELECT * FROM products WHERE id = ? LIMIT 1',
        [id]
      ) as unknown as [Array<{
        id: number;
        name: string;
        slug: string;
        description: string;
        price: number;
        image_url: string;
        category: string;
        features: any;
        specifications: any;
        applications: any;
        benefits: any;
        is_featured: boolean;
        is_active: boolean;
        brochure_url?: string;
      }>];
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.warn('Database error fetching product by ID, using mock data:', error);
      const product = this.mockProducts.find(p => p.id === id);
      return product ? {
        ...product,
        brochure_url: undefined
      } : null;
    }
  },

  async getProductSpecification(productId: number): Promise<{
    id: number;
    product_id: number;
    title: string;
    description: string | null;
    image_url: string | null;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
  } | null> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM product_specifications WHERE product_id = ? AND is_active = TRUE LIMIT 1',
      [productId]
    ) as unknown as [Array<{
      id: number;
      product_id: number;
      title: string;
      description: string | null;
      image_url: string | null;
      is_active: boolean;
      created_at: Date;
      updated_at: Date;
    }>];
    return rows && rows.length > 0 ? rows[0] : null;
  },

  // Hero Slides
  async getHeroSlides(): Promise<Array<{
    id: number;
    title: string;
    description: string;
    cta_label: string;
    cta_href: string;
    image_url: string;
    category: string;
    position: number;
    is_active: boolean;
  }>> {
    if (!USE_DATABASE) {
      // Return sample data when database is disabled
      return [
        {
          id: 1,
          title: "Advanced Energy Solutions",
          description: "Leading provider of cutting-edge energy storage systems for residential, commercial, and industrial applications.",
          cta_label: "Explore Solutions",
          cta_href: "/solutions",
          image_url: "/images/hero-slide-1.jpg",
          category: "energy",
          position: 1,
          is_active: true
        },
        {
          id: 2,
          title: "Sustainable Power Systems",
          description: "Innovative green technology solutions designed to power a sustainable future.",
          cta_label: "Our Products",
          cta_href: "/products",
          image_url: "/images/hero-slide-2.jpg",
          category: "sustainability",
          position: 2,
          is_active: true
        }
      ];
    }
    
    try {
      const pool = getDbPool();
      const [rows] = await pool.query(
        'SELECT * FROM hero_slides WHERE is_active = TRUE ORDER BY position ASC, created_at DESC'
      ) as unknown as [Array<{
        id: number;
        title: string;
        description: string;
        cta_label: string;
        cta_href: string;
        image_url: string;
        category: string;
        position: number;
        is_active: boolean;
      }>];
      return rows || [];
    } catch (error) {
      console.error('Database error fetching hero slides:', error);
      // Return sample data in case of database connection failure
      return [
        {
          id: 1,
          title: "Advanced Energy Solutions",
          description: "Leading provider of cutting-edge energy storage systems for residential, commercial, and industrial applications.",
          cta_label: "Explore Solutions",
          cta_href: "/solutions",
          image_url: "/images/hero-slide-1.jpg",
          category: "energy",
          position: 1,
          is_active: true
        },
        {
          id: 2,
          title: "Sustainable Power Systems",
          description: "Innovative green technology solutions designed to power a sustainable future.",
          cta_label: "Our Products",
          cta_href: "/products",
          image_url: "/images/hero-slide-2.jpg",
          category: "sustainability",
          position: 2,
          is_active: true
        }
      ];
    }
  },

  async upsertProductSpecification(data: {
    product_id: number;
    title: string;
    description?: string | null;
    image_url?: string | null;
    is_active?: boolean;
  }) {
    const pool = getDbPool();
    await pool.query(
      'INSERT INTO product_specifications (product_id, title, description, image_url, is_active) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), image_url = VALUES(image_url), is_active = VALUES(is_active)',
      [
        data.product_id,
        data.title,
        data.description ?? null,
        data.image_url ?? null,
        data.is_active === undefined ? 1 : data.is_active ? 1 : 0,
      ]
    );
    return { success: true };
  },

  async deleteProductSpecification(productId: number) {
    const pool = getDbPool();
    await pool.query('DELETE FROM product_specifications WHERE product_id = ?', [productId]);
    return { success: true };
  },

  async getProductApplication(productId: number): Promise<{
    id: number;
    product_id: number;
    title: string;
    description: string | null;
    icon_url: string | null;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
  } | null> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM product_applications WHERE product_id = ? AND is_active = TRUE LIMIT 1',
      [productId]
    ) as unknown as [Array<{
      id: number;
      product_id: number;
      title: string;
      description: string | null;
      icon_url: string | null;
      is_active: boolean;
      created_at: Date;
      updated_at: Date;
    }>];
    return rows && rows.length > 0 ? rows[0] : null;
  },

  async upsertProductApplication(data: {
    product_id: number;
    title: string;
    description?: string | null;
    icon_url?: string | null;
    is_active?: boolean;
  }) {
    const pool = getDbPool();
    await pool.query(
      'INSERT INTO product_applications (product_id, title, description, icon_url, is_active) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), icon_url = VALUES(icon_url), is_active = VALUES(is_active)',
      [
        data.product_id,
        data.title,
        data.description ?? null,
        data.icon_url ?? null,
        data.is_active === undefined ? 1 : data.is_active ? 1 : 0,
      ]
    );
    return { success: true };
  },

  async deleteProductApplication(productId: number) {
    const pool = getDbPool();
    await pool.query('DELETE FROM product_applications WHERE product_id = ?', [productId]);
    return { success: true };
  },

  // Lab Equipment
  async getLabEquipment(): Promise<Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string;
  }>> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT id, name, slug, description, image_url FROM lab_equipment WHERE is_active = TRUE'
    ) as unknown as [Array<{
      id: number;
      name: string;
      slug: string;
      description: string;
      image_url: string;
    }>];
    return rows || [];
  },

  async getLabEquipmentBySlug(slug: string): Promise<{
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string;
  } | null> {
    // Use mock data when not using database or when database is not available
    if (!USE_DATABASE) {
      const equipment = [
        {
          id: 1,
          name: "Battery Testing Equipment",
          slug: "battery-testing",
          description: "Advanced equipment for testing battery performance and safety.",
          image_url: "/images/lab-equipment/battery-testing.jpg"
        },
        {
          id: 2,
          name: "Solar Panel Analyzer",
          slug: "solar-analyzer",
          description: "Professional equipment for analyzing solar panel efficiency.",
          image_url: "/images/lab-equipment/solar-analyzer.jpg"
        }
      ];
      const item = equipment.find(e => e.slug === slug);
      return item || null;
    }
    
    try {
      const pool = getDbPool();
      const [rows] = await pool.query(
        'SELECT id, name, slug, description, image_url FROM lab_equipment WHERE slug = ? AND is_active = TRUE LIMIT 1',
        [slug]
      ) as unknown as [Array<{
        id: number;
        name: string;
        slug: string;
        description: string;
        image_url: string;
      }>];
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.warn('Database error fetching lab equipment by slug, using mock data:', error);
      const equipment = [
        {
          id: 1,
          name: "Battery Testing Equipment",
          slug: "battery-testing",
          description: "Advanced equipment for testing battery performance and safety.",
          image_url: "/images/lab-equipment/battery-testing.jpg"
        },
        {
          id: 2,
          name: "Solar Panel Analyzer",
          slug: "solar-analyzer",
          description: "Professional equipment for analyzing solar panel efficiency.",
          image_url: "/images/lab-equipment/solar-analyzer.jpg"
        }
      ];
      const item = equipment.find(e => e.slug === slug);
      return item || null;
    }
  },

  // Get a specific lab equipment item by ID
  async getLabEquipmentById(id: number): Promise<{
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string;
  } | null> {
    // Use mock data when not using database or when database is not available
    if (!USE_DATABASE) {
      const equipment = [
        {
          id: 1,
          name: "Battery Testing Equipment",
          slug: "battery-testing",
          description: "Advanced equipment for testing battery performance and safety.",
          image_url: "/images/lab-equipment/battery-testing.jpg"
        },
        {
          id: 2,
          name: "Solar Panel Analyzer",
          slug: "solar-analyzer",
          description: "Professional equipment for analyzing solar panel efficiency.",
          image_url: "/images/lab-equipment/solar-analyzer.jpg"
        }
      ];
      const item = equipment.find(e => e.id === id);
      return item || null;
    }
    
    try {
      const pool = getDbPool();
      const [rows] = await pool.query(
        'SELECT id, name, slug, description, image_url FROM lab_equipment WHERE id = ? LIMIT 1',
        [id]
      ) as unknown as [Array<{
        id: number;
        name: string;
        slug: string;
        description: string;
        image_url: string;
      }>];
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.warn('Database error fetching lab equipment by ID, using mock data:', error);
      const equipment = [
        {
          id: 1,
          name: "Battery Testing Equipment",
          slug: "battery-testing",
          description: "Advanced equipment for testing battery performance and safety.",
          image_url: "/images/lab-equipment/battery-testing.jpg"
        },
        {
          id: 2,
          name: "Solar Panel Analyzer",
          slug: "solar-analyzer",
          description: "Professional equipment for analyzing solar panel efficiency.",
          image_url: "/images/lab-equipment/solar-analyzer.jpg"
        }
      ];
      const item = equipment.find(e => e.id === id);
      return item || null;
    }
  },

  // Get active news
  async getNews(limit = 5): Promise<Array<{
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    image_url: string;
    publish_date: string;
    created_at: Date;
    is_active: boolean;
  }>> {
    return this._getNews(limit, true); // Only active by default
  },

  // Get all news (both active and inactive)
  async getAllNews(limit = 100): Promise<Array<{
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    image_url: string;
    publish_date: string;
    created_at: Date;
    is_active: boolean;
  }>> {
    return this._getNews(limit, false); // All news (active and inactive)
  },

  // Private helper method for getting news with active status control
  async _getNews(limit = 5, activeOnly = true): Promise<Array<{
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    image_url: string;
    publish_date: string;
    created_at: Date;
    is_active: boolean;
  }>> {
    // Use mock data when not using database or when database is not available
    if (!USE_DATABASE) {
      // Return mock news data
      return [
        {
          id: 1,
          title: "Latest Energy Storage Innovation",
          slug: "latest-energy-storage-innovation",
          summary: "Revolutionary new approach to energy storage announced.",
          content: "Detailed content about the innovation in energy storage.",
          image_url: "/images/news/storage-innovation.jpg",
          publish_date: new Date().toISOString().split('T')[0],
          created_at: new Date(),
          is_active: true
        },
        {
          id: 2,
          title: "Sustainability Report Released",
          slug: "sustainability-report-released",
          summary: "Annual sustainability report shows significant progress.",
          content: "Comprehensive details about our sustainability efforts.",
          image_url: "/images/news/sustainability-report.jpg",
          publish_date: new Date().toISOString().split('T')[0],
          created_at: new Date(),
          is_active: true
        }
      ];
    }
    
    try {
      const pool = getDbPool();
      let query = 'SELECT * FROM news';
      const params: any[] = [];
      
      // Add active filter only if activeOnly is true
      if (activeOnly) {
        query += ' WHERE is_published = TRUE';
      } else {
        query += ' WHERE 1=1'; // Always true condition to allow adding other filters
      }
      
      query += ' ORDER BY publish_date DESC, created_at DESC LIMIT ?';
      params.push(limit);
      
      const [rows] = await pool.query(query, params) as unknown as [Array<{
        id: number;
        title: string;
        slug: string;
        summary: string;
        content: string;
        image_url: string;
        publish_date: string;
        created_at: Date;
        is_active: boolean;
      }>];
      
      return rows || [];
    } catch (error) {
      console.warn('Database error fetching news, using mock data instead:', error);
      // Return mock news data
      return [
        {
          id: 1,
          title: "Latest Energy Storage Innovation",
          slug: "latest-energy-storage-innovation",
          summary: "Revolutionary new approach to energy storage announced.",
          content: "Detailed content about the innovation in energy storage.",
          image_url: "/images/news/storage-innovation.jpg",
          publish_date: new Date().toISOString().split('T')[0],
          created_at: new Date(),
          is_active: true
        },
        {
          id: 2,
          title: "Sustainability Report Released",
          slug: "sustainability-report-released",
          summary: "Annual sustainability report shows significant progress.",
          content: "Comprehensive details about our sustainability efforts.",
          image_url: "/images/news/sustainability-report.jpg",
          publish_date: new Date().toISOString().split('T')[0],
          created_at: new Date(),
          is_active: true
        }
      ];
    }
  },

  async getNewsBySlug(slug: string): Promise<{
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    image_url: string;
    publish_date: string;
    created_at: Date;
    is_active: boolean;
  } | null> {
    // Use mock data when not using database or when database is not available
    if (!USE_DATABASE) {
      const news = [
        {
          id: 1,
          title: "Latest Energy Storage Innovation",
          slug: "latest-energy-storage-innovation",
          summary: "Revolutionary new approach to energy storage announced.",
          content: "Detailed content about the innovation in energy storage.",
          image_url: "/images/news/storage-innovation.jpg",
          publish_date: new Date().toISOString().split('T')[0],
          created_at: new Date(),
          is_active: true
        },
        {
          id: 2,
          title: "Sustainability Report Released",
          slug: "sustainability-report-released",
          summary: "Annual sustainability report shows significant progress.",
          content: "Comprehensive details about our sustainability efforts.",
          image_url: "/images/news/sustainability-report.jpg",
          publish_date: new Date().toISOString().split('T')[0],
          created_at: new Date(),
          is_active: true
        }
      ];
      const article = news.find(n => n.slug === slug && n.is_active);
      return article || null;
    }
    
    try {
      const pool = getDbPool();
      const [rows] = await pool.query(
        'SELECT * FROM news WHERE slug = ? AND is_published = TRUE LIMIT 1',
        [slug]
      ) as unknown as [Array<{
        id: number;
        title: string;
        slug: string;
        summary: string;
        content: string;
        image_url: string;
        publish_date: string;
        created_at: Date;
        is_active: boolean;
      }>];
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.warn('Database error fetching news by slug, using mock data:', error);
      const news = [
        {
          id: 1,
          title: "Latest Energy Storage Innovation",
          slug: "latest-energy-storage-innovation",
          summary: "Revolutionary new approach to energy storage announced.",
          content: "Detailed content about the innovation in energy storage.",
          image_url: "/images/news/storage-innovation.jpg",
          publish_date: new Date().toISOString().split('T')[0],
          created_at: new Date(),
          is_active: true
        },
        {
          id: 2,
          title: "Sustainability Report Released",
          slug: "sustainability-report-released",
          summary: "Annual sustainability report shows significant progress.",
          content: "Comprehensive details about our sustainability efforts.",
          image_url: "/images/news/sustainability-report.jpg",
          publish_date: new Date().toISOString().split('T')[0],
          created_at: new Date(),
          is_active: true
        }
      ];
      const article = news.find(n => n.slug === slug && n.is_active);
      return article || null;
    }
  },

  // Get a specific news article by ID
  async getNewsById(id: number): Promise<{
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    image_url: string;
    publish_date: string;
    created_at: Date;
    is_active: boolean;
  } | null> {
    // Use mock data when not using database or when database is not available
    if (!USE_DATABASE) {
      const news = [
        {
          id: 1,
          title: "Latest Energy Storage Innovation",
          slug: "latest-energy-storage-innovation",
          summary: "Revolutionary new approach to energy storage announced.",
          content: "Detailed content about the innovation in energy storage.",
          image_url: "/images/news/storage-innovation.jpg",
          publish_date: new Date().toISOString().split('T')[0],
          created_at: new Date(),
          is_active: true
        },
        {
          id: 2,
          title: "Sustainability Report Released",
          slug: "sustainability-report-released",
          summary: "Annual sustainability report shows significant progress.",
          content: "Comprehensive details about our sustainability efforts.",
          image_url: "/images/news/sustainability-report.jpg",
          publish_date: new Date().toISOString().split('T')[0],
          created_at: new Date(),
          is_active: true
        }
      ];
      const article = news.find(n => n.id === id);
      return article || null;
    }
    
    try {
      const pool = getDbPool();
      const [rows] = await pool.query(
        'SELECT * FROM news WHERE id = ? LIMIT 1',
        [id]
      ) as unknown as [Array<{
        id: number;
        title: string;
        slug: string;
        summary: string;
        content: string;
        image_url: string;
        publish_date: string;
        created_at: Date;
        is_active: boolean;
      }>];
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.warn('Database error fetching news by ID, using mock data:', error);
      const news = [
        {
          id: 1,
          title: "Latest Energy Storage Innovation",
          slug: "latest-energy-storage-innovation",
          summary: "Revolutionary new approach to energy storage announced.",
          content: "Detailed content about the innovation in energy storage.",
          image_url: "/images/news/storage-innovation.jpg",
          publish_date: new Date().toISOString().split('T')[0],
          created_at: new Date(),
          is_active: true
        },
        {
          id: 2,
          title: "Sustainability Report Released",
          slug: "sustainability-report-released",
          summary: "Annual sustainability report shows significant progress.",
          content: "Comprehensive details about our sustainability efforts.",
          image_url: "/images/news/sustainability-report.jpg",
          publish_date: new Date().toISOString().split('T')[0],
          created_at: new Date(),
          is_active: true
        }
      ];
      const article = news.find(n => n.id === id);
      return article || null;
    }
  },

  // Solutions
  async getSolutions(): Promise<Array<{
    id: number;
    title: string;
    slug: string;
    summary: string;
    description: string;
    image_url: string;
    category: string;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }>> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM solutions WHERE is_active = TRUE ORDER BY created_at DESC'
    ) as unknown as [Array<{
      id: number;
      title: string;
      slug: string;
      summary: string;
      description: string;
      image_url: string;
      category: string;
      seo_title: string;
      seo_description: string;
      seo_keywords: string;
      is_active: boolean;
      created_at: string;
      updated_at: string;
    }>];
    return rows || [];
  },

  // Get a specific solution by slug
  async getSolutionBySlug(slug: string): Promise<{
    id: number;
    title: string;
    slug: string;
    summary: string;
    description: string;
    image_url: string;
    category: string;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  } | null> {
    // Use mock data when not using database or when database is not available
    if (!USE_DATABASE) {
      const solutions = [
        {
          id: 1,
          title: "Solar Energy Solutions",
          slug: "solar-energy",
          summary: "Comprehensive solar energy systems for residential and commercial use.",
          description: "Our solar energy solutions provide clean, renewable power with maximum efficiency.",
          image_url: "/images/solar-energy.jpg",
          category: "renewable",
          seo_title: "Solar Energy Solutions",
          seo_description: "Professional solar energy systems for homes and businesses.",
          seo_keywords: "solar, energy, renewable",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          title: "Wind Power Systems",
          slug: "wind-power",
          summary: "Advanced wind power generation systems.",
          description: "Harness the power of wind for clean, sustainable energy.",
          image_url: "/images/wind-power.jpg",
          category: "renewable",
          seo_title: "Wind Power Systems",
          seo_description: "Efficient wind power systems for large-scale energy generation.",
          seo_keywords: "wind, power, renewable",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      const solution = solutions.find(s => s.slug === slug && s.is_active);
      return solution || null;
    }
    
    try {
      const pool = getDbPool();
      const [rows] = await pool.query(
        'SELECT * FROM solutions WHERE slug = ? AND is_active = TRUE',
        [slug]
      ) as unknown as [Array<{
        id: number;
        title: string;
        slug: string;
        summary: string;
        description: string;
        image_url: string;
        category: string;
        seo_title: string;
        seo_description: string;
        seo_keywords: string;
        is_active: boolean;
        created_at: string;
        updated_at: string;
      }>];
    
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.warn('Database error fetching solution by slug, using mock data:', error);
      const solutions = [
        {
          id: 1,
          title: "Solar Energy Solutions",
          slug: "solar-energy",
          summary: "Comprehensive solar energy systems for residential and commercial use.",
          description: "Our solar energy solutions provide clean, renewable power with maximum efficiency.",
          image_url: "/images/solar-energy.jpg",
          category: "renewable",
          seo_title: "Solar Energy Solutions",
          seo_description: "Professional solar energy systems for homes and businesses.",
          seo_keywords: "solar, energy, renewable",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          title: "Wind Power Systems",
          slug: "wind-power",
          summary: "Advanced wind power generation systems.",
          description: "Harness the power of wind for clean, sustainable energy.",
          image_url: "/images/wind-power.jpg",
          category: "renewable",
          seo_title: "Wind Power Systems",
          seo_description: "Efficient wind power systems for large-scale energy generation.",
          seo_keywords: "wind, power, renewable",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      const solution = solutions.find(s => s.slug === slug && s.is_active);
      return solution || null;
    }
  },

  // Get a specific solution by ID
  async getSolutionById(id: number): Promise<{
    id: number;
    title: string;
    slug: string;
    summary: string;
    description: string;
    image_url: string;
    category: string;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  } | null> {
    // Use mock data when not using database or when database is not available
    if (!USE_DATABASE) {
      const solutions = [
        {
          id: 1,
          title: "Solar Energy Solutions",
          slug: "solar-energy",
          summary: "Comprehensive solar energy systems for residential and commercial use.",
          description: "Our solar energy solutions provide clean, renewable power with maximum efficiency.",
          image_url: "/images/solar-energy.jpg",
          category: "renewable",
          seo_title: "Solar Energy Solutions",
          seo_description: "Professional solar energy systems for homes and businesses.",
          seo_keywords: "solar, energy, renewable",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          title: "Wind Power Systems",
          slug: "wind-power",
          summary: "Advanced wind power generation systems.",
          description: "Harness the power of wind for clean, sustainable energy.",
          image_url: "/images/wind-power.jpg",
          category: "renewable",
          seo_title: "Wind Power Systems",
          seo_description: "Efficient wind power systems for large-scale energy generation.",
          seo_keywords: "wind, power, renewable",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      const solution = solutions.find(s => s.id === id);
      return solution || null;
    }
    
    try {
      const pool = getDbPool();
      const [rows] = await pool.query(
        'SELECT * FROM solutions WHERE id = ?',
        [id]
      ) as unknown as [Array<{
        id: number;
        title: string;
        slug: string;
        summary: string;
        description: string;
        image_url: string;
        category: string;
        seo_title: string;
        seo_description: string;
        seo_keywords: string;
        is_active: boolean;
        created_at: string;
        updated_at: string;
      }>];
    
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.warn('Database error fetching solution by ID, using mock data:', error);
      const solutions = [
        {
          id: 1,
          title: "Solar Energy Solutions",
          slug: "solar-energy",
          summary: "Comprehensive solar energy systems for residential and commercial use.",
          description: "Our solar energy solutions provide clean, renewable power with maximum efficiency.",
          image_url: "/images/solar-energy.jpg",
          category: "renewable",
          seo_title: "Solar Energy Solutions",
          seo_description: "Professional solar energy systems for homes and businesses.",
          seo_keywords: "solar, energy, renewable",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          title: "Wind Power Systems",
          slug: "wind-power",
          summary: "Advanced wind power generation systems.",
          description: "Harness the power of wind for clean, sustainable energy.",
          image_url: "/images/wind-power.jpg",
          category: "renewable",
          seo_title: "Wind Power Systems",
          seo_description: "Efficient wind power systems for large-scale energy generation.",
          seo_keywords: "wind, power, renewable",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      const solution = solutions.find(s => s.id === id);
      return solution || null;
    }
  },

  // Case Studies
  async getCaseStudies(): Promise<Array<{
    id: number;
    title: string;
    slug: string;
    client_name: string;
    location: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string;
    image_url: string;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
  }>> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM case_studies WHERE is_featured = TRUE ORDER BY created_at DESC'
    ) as unknown as [Array<{
      id: number;
      title: string;
      slug: string;
      client_name: string;
      location: string;
      industry: string;
      challenge: string;
      solution: string;
      results: string;
      image_url: string;
      is_featured: boolean;
      created_at: string;
      updated_at: string;
    }>];
  
    // Transform the data to match what the frontend expects
    const caseStudies = rows.map(caseStudy => ({
      id: caseStudy.id,
      title: caseStudy.title,
      region: caseStudy.location,
      summary: caseStudy.challenge.substring(0, 150) + (caseStudy.challenge.length > 150 ? '...' : ''),
      impact: [
        `Client: ${caseStudy.client_name}`,
        `Industry: ${caseStudy.industry}`,
        caseStudy.results
      ],
      image_url: caseStudy.image_url || '/images/casegreen.jpeg',
      is_active: true,
      created_at: caseStudy.created_at,
      updated_at: caseStudy.updated_at
    }));
  
    return caseStudies as any;
  },

  // Contact form submission
  async submitContactForm(data: {
    name: string;
    email: string;
    company?: string;
    message: string;
  }) {
    const pool = getDbPool();
    const [result] = await pool.query(
      'INSERT INTO contact_requests (name, email, company, message) VALUES (?, ?, ?, ?)',
      [data.name, data.email, data.company || null, data.message]
    );
    return { success: true, id: (result as any).insertId };
  },

  // Newsletter subscription
  async subscribeToNewsletter(email: string, name?: string) {
    const pool = getDbPool();
    try {
      await pool.query(
        'INSERT INTO newsletter_subscriptions (email, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP',
        [email, name || null]
      );
      return { success: true };
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return { success: false, error };
    }
  },

  // Get all pages for sitemap
  async getAllPages(): Promise<Array<{ slug: string; updated_at: Date }>> {
    const pool = getDbPool();
    const [rows] = await pool.query('SELECT slug, updated_at FROM pages WHERE is_active = TRUE');
    return rows as Array<{ slug: string; updated_at: Date }>;
  }
};

// Initialize the database when this module is imported
dbService.initialize().catch(console.error);
