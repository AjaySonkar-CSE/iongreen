export type NavItem = {
  label: string;
  href: string;
  description?: string;
  image?: string;
  items?: Omit<NavItem, 'items'>[];
};

export type StatItem = {
  label: string;
  value: string;
  helper?: string;
};

export type ProductCategory = {
  title: string;
  range: string;
  description: string;
  features: string[];
  image: string;
  backgroundImage?: string;
};

export type HeroSlide = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
};

export type Solution = {
  title: string;
  summary: string;
  bullets: string[];
};

export type Certification = {
  label: string;
};

export type NewsItem = {
  title: string;
  date: string;
  summary: string;
  image: string;
};

export type ContactChannel = {
  label: string;
  value: string;
  href?: string;
};

export type AboutContent = {
  hero: {
    title: string;
    description: string;
    tagline: string;
  };
  stats: StatItem[];
  timeline: { year: string; detail: string }[];
  values: { title: string; description: string }[];
  markets: string[];
};

export type SiteContent = {
  navItems: NavItem[];
  hero: {
    eyebrow: string;
    slides: HeroSlide[];
    stats: StatItem[];
  };
  highlights: StatItem[];
  products: ProductCategory[];
  solutions: Solution[];
  certifications: Certification[];
  news: NewsItem[];
  cta: {
    title: string;
    description: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  about: AboutContent;
  contact: {
    heading: string;
    description: string;
    channels: ContactChannel[];
  };
  support: {
    resources: { title: string; description: string }[];
    faqs: { question: string; answer: string }[];
  };
};

export const siteContent: SiteContent = {
  navItems: [
    { label: "Home", href: "/" },
    {
      label: "Products",
      href: "/products",
      description: "Explore our energy storage solutions",
      items: [
        {
          label: "Energy Storage System",
          href: "/products/energy-storage-system",
          description: "100kWh – 5.015MWh systems for businesses",
          image: "/pro2.jpg"
        },
        {
          label: "Hybrid Solar System",
          href: "/products/hybrid-solar-system",
          description: "1.2MWh – 5.015MWh for utility applications",
          image: "/data2.jpg.jpg"
        },
        {
          label: "Hydrogen Pules",
          href: "/products/hydrogen-pules",
          description: "5kWh – 35kWh for homes and small businesses",
          image: "/pro1.jpg"
        },
        {
          label: "Solar Solution",
          href: "/products/solar-solution",
          description: "16kWh – 104kWh for data centers and telecom",
          image: "/images/ai-solar-battery-installation.svg"
        },
        {
          label: "ION Green Energy Storage",
          href: "/products/ion-green",
          description: "Advanced battery energy storage systems with LiFePO₄ technology",
          image: "/1/ion1.png"
        },
        {
          label: "Hybrid Energy Storage",
          href: "/products/hybrid-energy-storage",
          description: "215kWh – 261kWh with integrated PCS and EMS"
        },
        {
          label: "Mobile & EV Charging Storage",
          href: "/products/mobile-ev-charging-storage",
          description: "241kWh – 3.34MWh for mobile and EV charging solutions"
        },
        {
          label: "Flipkart & Amazon Products",
          href: "/products/flipkart-amazon",
          description: "Solar products available on e-commerce platforms"
        },
        {
          label: "View All Products",
          href: "/products",
          description: "Complete range of energy storage solutions"
        }
      ]
    },
    {
      label: "Solutions",
      href: "/solutions",
      description: "Industry-specific energy solutions",
      items: [
        { label: "Utility Scale Energy Storage", href: "/solutions/utility-scale-energy-storage" },
        { label: "Commercial & Industrial", href: "/solutions/commercial-industrial" },
        { label: "Residential All-in-One", href: "/solutions/residential-all-in-one" },
        { label: "Microgrids", href: "/solutions/microgrids" },
        { label: "Renewable Integration", href: "/solutions/renewable-integration" },
        { label: "Telecom Industry", href: "/solutions/telecom-industry" },
        { label: "Data Centre Solutions", href: "/solutions/data-centre-solutions" },
        { label: "Battery Backup", href: "/solutions/battery-backup" }
      ]
    },
    { label: "About", href: "/about" },
    { label: "Lab Equipment", href: "/lab-equipment" },
    { label: "Support", href: "/support" },
    { label: "Case", href: "/case" },
    { label: "News", href: "/news" },
  ],
  hero: {
    eyebrow: "Energy Storage Systems Manufacturer",
    slides: [
      {
        title: "ION Green BESS storage solution provides commercial and industrial energy systems",
        description:
          "Modular, scalable options ranging from 100kWh up to 5MWh with intelligent EMS for peak shaving, load shifting, and backup power.",
        ctaLabel: "Explore Our Solutions",
        ctaHref: "/solutions",
        image: "/data1.jpg.jpg",
      },
      {
        title: "One-stop energy storage system solution for C&I facilities",
        description:
          "Engineering, manufacturing, and integration for manufacturing plants, hospitals, municipal infrastructure, and commercial buildings.",
        ctaLabel: "Explore Our Solutions",
        ctaHref: "/solutions",
        image: "/data2.jpg.jpg",
      },
      {
        title: "Your trusted one-stop energy storage solution provider",
        description:
          "Safe and efficient end-to-end energy storage solutions spanning residential, commercial, and utility-scale deployments worldwide.",
        ctaLabel: "Request a Quote",
        ctaHref: "/contact",
        image: "/data3.jpg.jpg",
      },
    ],
    stats: [
      { label: "Production Bases", value: "5+", helper: "Across China" },
      { label: "Years Experience", value: "25+", helper: "Since 1999" },
      { label: "Patents", value: "1180+", helper: "Innovation filed" },
    ],
  },
  highlights: [
    { label: "Residential ESS shipped annually", value: "2GWh+" },
    { label: "C&I & Utility ESS capacity", value: "20GWh+" },
  ],
  products: [
    {
      title: "Energy Storage System",
      range: "100kWh – 5.015MWh",
      description:
        "Modular cabinet and containerized systems for industrial parks, hospitals, data centers, and municipal infrastructure.",
      features: [
        "Air-cooled & liquid-cooled options",
        "Peak shaving and load shifting",
        "UL9540, UL1973, CE compliant",
      ],
      image: "/pro2.jpg",
    },
    {
      title: "Hybrid Solar System",
      range: "1.2MWh – 5.015MWh",
      description:
        "Containerized battery energy storage systems for utility-scale microgrids, renewable integration, and grid services.",
      features: [
        "Outdoor-rated containers",
        "High-safety LFP chemistry",
        "Smart EMS integration",
      ],
      image: "/data2.jpg.jpg",
    },
    {
      title: "Hydrogen Pules",
      range: "5kWh – 35kWh",
      description:
        "Wall-mounted, stack-mounted, and all-in-one ESS for homes and small businesses with hybrid inverter options.",
      features: [
        "5kWh – 35kWh capacity options",
        "Wall-mounted or stackable design",
        "Hybrid inverter compatibility",
        "Smart energy management",
        "10+ year lifespan"
      ],
      image: "/pro1.jpg",
      backgroundImage: "/3/green3.png"
    },
    {
      title: "Solar Solution",
      range: "16kWh – 104kWh",
      description:
        "High-voltage ESS racks and battery modules for data halls, telecom, and distributed commercial deployments.",
      features: [
        "Hot-swappable modules",
        "1P8S & 1P13S configurations",
        "Smart thermal management",
      ],
      image: "/images/ai-solar-battery-installation.svg",
    },
    {
      title: "Hybrid Energy Storage",
      range: "215kWh – 261kWh",
      description:
        "Air-cooled and liquid-cooled hybrid cabinets with integrated PCS and EMS for industrial parks and cold-chain logistics.",
      features: [
        "Factory-built safety systems",
        "Peak shaving & valley filling",
        "Designed for harsh climates",
      ],
      image: "/data5.jpg",
    },
    {
      title: "Mobile & EV Charging Storage",
      range: "241kWh – 3.34MWh",
      description:
        "Mobile charging robots and containerized storage to support EV fleets, remote construction, and emergency backup.",
      features: [
        "Rapid deployment trailers",
        "Integrated fast-charging piles",
        "Smart dispatch scheduling",
      ],
      image: "/data1.jpg.jpg",
    },
    {
      title: "Flipkart & Amazon",
      range: "Solar Products",
      description:
        "Solar products available via Flipkart & Amazon with warranty and pan-India shipping.",
      features: [
        "Easy online purchasing",
        "Fast pan-India delivery",
        "Genuine products with warranty",
      ],
      image: "/data2.jpg.jpg",
    },
    {
      title: "ION Green Energy Storage",
      range: "100kWh – 5.015MWh",
      description:
        "Advanced battery energy storage systems with LiFePO₄ technology for residential, commercial, and industrial applications. Complete solar integration solutions.",
      features: [
        "LiFePO₄ Technology",
        "Solar Integration",
        "Scalable Solutions",
        "Smart Energy Management"
      ],
      image: "/1/ion1.png",
    },
  ],
  solutions: [
    {
      title: "Solar + Storage Systems",
      summary:
        "ION Green delivers massive-scale lithium battery storage solutions with advanced BESS technology for grid stabilization and renewable energy integration.",
      bullets: [
        "Up to 5.015MWh ION Green containerized systems",
        "ION Green LiFePO₄ safety chemistry with multi-level protection",
        "ION Green SCADA & EMS for intelligent grid management",
      ],
    },
    {
      title: "Utility-Scale Battery Energy Storage Systems (BESS)",
      summary:
        "ION Green commercial battery storage reduces energy costs and ensures business continuity with high-performance lithium battery systems.",
      bullets: [
        "ION Green hybrid inverters optimized for commercial applications",
        "ION Green demand-side energy management software",
        "ION Green comprehensive O&M and financing solutions",
      ],
    },
    {
      title: "Commercial & Industrial (C&I) Energy Storage",
      summary:
        "ION Green commercial & industrial energy storage provides smart solutions with seamless integration and backup power capabilities.",
      bullets: [
        "ION Green weather-rated enclosures for any climate",
        "ION Green mobile app monitoring and control",
        "ION Green all-in-one ESS with integrated hybrid inverter",
      ],
    },
    {
      title: "Backup Power & Microgrid Solutions",
      summary:
        "ION Green microgrid solutions deliver energy independence with advanced lithium battery technology and intelligent power management.",
      bullets: [
        "ION Green islandable operation for critical facilities",
        "ION Green renewable integration and storage optimization",
        "ION Green advanced control systems for energy management",
      ],
    },
    {
      title: "Residential Energy Storage",
      summary:
        "ION Green seamlessly integrates solar, wind, and other renewables with advanced lithium battery storage for maximum efficiency in residential applications.",
      bullets: [
        "ION Green smart inverters for renewable optimization",
        "ION Green battery storage for energy smoothing and shifting",
        "ION Green predictive analytics for renewable forecasting",
      ],
    },
  ],
  certifications: [
    { label: "ION Green Certified" },
    { label: "UL9540" },
    { label: "UL1973" },
    { label: "CE/IEC Certified" },
    { label: "ISO9001" },
    { label: "ION Green LiFePO₄" },
    { label: "ROHS Compliant" },
    { label: "UN38.3 Tested" },
  ],
  news: [
    {
      title:
        "Chairman Xu Xinjian Leads Delegation to UN Climate Summit in Brazil",
      date: "Nov 24, 2025",
      summary:
        "ION Green showcases large-scale BESS innovation and signs strategic cooperation on climate resiliency.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Best BESS Battery Storage for Sale: C&I Solutions",
      date: "Nov 20, 2025",
      summary:
        "A deep dive into integrated containerized storage solutions delivering superior LCOE for commercial fleets.",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "ION Green BESS at Africa EV Mobility Expo 2025",
      date: "Nov 18, 2025",
      summary:
        "Introducing wholesale energy storage cabinets, all-in-one ESS, and EV charging integrations tailored for Africa.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Nigerian Partner Completes 12,000KM Factory Review",
      date: "Nov 17, 2025",
      summary:
        "Three-day deep dive highlights ION Green high-safety lithium technology designed for African climates.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Industrial & Commercial 215kWh LiFePO₄ Module Supplier Spotlight",
      date: "Nov 12, 2025",
      summary:
        "Where to source 215kWh cabinets, 314Ah modules, and wholesale storage racks for commercial backup power.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Commercial Energy Storage in Bulgaria",
      date: "Nov 10, 2025",
      summary:
        "Delivering large battery storage containers that stabilize Bulgarian C&I operations and accelerate sustainability goals.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  ],
  cta: {
    title: "Ready to Power Your Future with ION Green?",
    description:
      "Experience the ION Green difference with advanced lithium battery technology. Get a customized ION Green energy storage solution for your specific needs.",
    primary: { label: "Get ION Green Quote", href: "/contact" },
    secondary: { label: "Explore ION Green Products", href: "/products" },
  },
  about: {
    hero: {
      title: "Pioneering Energy Storage Solutions",
      description:
        "ION Green is a leading innovator in energy storage, delivering advanced battery energy storage systems to 100+ countries with a focus on sustainability and efficiency.",
      tagline: "Powering a Sustainable Future",
    },
    stats: [
      { label: "Production Bases", value: "5+", helper: "Across China" },
      { label: "Patents", value: "1180+", helper: "Granted worldwide" },
      { label: "Residential ESS Output", value: "2GWh+", helper: "Annual capacity" },
      { label: "C&I & Utility ESS Output", value: "20GWh+", helper: "Annual capacity" },
    ],
    timeline: [
      { year: "1999", detail: "ION Green founded with focus on energy storage innovation." },
      { year: "2008", detail: "Expanded manufacturing bases and R&D for ESS platforms." },
      { year: "2015", detail: "Began exporting integrated ESS cabinets to global partners." },
      { year: "2020", detail: "Listed on Shanghai Stock Exchange (Stock code: 603366)." },
      {
        year: "2025",
        detail: "20GWh+ annual production capacity for commercial, industrial, and large-scale ESS.",
      },
    ],
    values: [
      {
        title: "One-Stop Service",
        description: "From needs assessment and design to installation, O&M, and lifecycle upgrades.",
      },
      {
        title: "Efficient Storage Solutions",
        description: "Lower energy costs through peak shaving, load shifting, and demand-side management.",
      },
      {
        title: "Smart Management",
        description: "Advanced EMS, SCADA connectivity, and remote monitoring for every project tier.",
      },
      {
        title: "Renewable Integration",
        description: "Seamlessly pair storage with renewable energy sources and EV charging infrastructure.",
      },
    ],
    markets: [
      "United States",
      "Canada",
      "United Kingdom",
      "Germany",
      "Australia",
      "Brazil",
      "Philippines",
      "Nigeria",
      "Morocco",
      "United Arab Emirates",
    ],
  },
  contact: {
    heading: "Global Sales & Support",
    description:
      "ION Green serves more than 100 countries with multilingual support teams and local partners.",
    channels: [
      { label: "WhatsApp", value: "9202636627", href: "https://wa.me/9202636627" },
      { label: "Hotline", value: "9202636627", href: "tel:9202636627" },
      { label: "Email", value: "info@ion-green.com", href: "mailto:info@ion-green.com" },
    ],
  },
  support: {
    resources: [
      {
        title: "Company Brochure",
        description: "Download the 2025 corporate profile, certifications, and manufacturing overview.",
      },
      {
        title: "Product Sheets",
        description: "Specs for air-cooled, liquid-cooled, rack-mounted, and containerized ESS lines.",
      },
      {
        title: "Certifications",
        description: "UL, CE, CEI-021, and other compliance documents for global deployments.",
      },
    ],
    faqs: [
      {
        question: "What capacity ranges do you cover?",
        answer:
          "We deliver from 5kWh residential packs up to 5.015MWh containerized systems, configurable for grid-tied or off-grid applications.",
      },
      {
        question: "Do you support turnkey installation?",
        answer:
          "Yes. ION Green provides engineering, procurement, construction, and lifecycle O&M through global partners.",
      },
      {
        question: "Which battery chemistry is used?",
        answer:
          "High-safety LiFePO₄ prismatic cells (Grade A 105Ah / 280Ah / 314Ah) with multi-level BMS protection.",
      },
    ],
  },
};

export function getSiteContent(): SiteContent {
  return siteContent;
}
