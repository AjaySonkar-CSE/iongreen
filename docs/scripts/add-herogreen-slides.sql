-- Insert 5 herogreen images into hero_slides table
-- Run this script in your database to add the hero green slides

INSERT INTO `hero_slides` (`title`, `description`, `cta_label`, `cta_href`, `image_url`, `category`, `position`, `is_active`, `created_at`, `updated_at`) 
VALUES 
  (
    'Advanced Energy Storage Solutions',
    'Discover cutting-edge battery technology designed for maximum efficiency and reliability.',
    'Learn More',
    '/products',
    '/herogreen.jpeg',
    'Energy Storage',
    1,
    1,
    NOW(),
    NOW()
  ),
  (
    'Renewable Energy Integration',
    'Seamlessly integrate solar and wind power with intelligent energy storage systems.',
    'Explore Solutions',
    '/solutions',
    '/herogreen1.PNG',
    'Renewable Energy',
    2,
    1,
    NOW(),
    NOW()
  ),
  (
    'Commercial & Industrial Applications',
    'Optimize operational costs with enterprise-grade energy management solutions.',
    'See Case Studies',
    '/case',
    '/herogreen3.PNG',
    'Industrial',
    3,
    1,
    NOW(),
    NOW()
  ),
  (
    'Smart Grid Solutions',
    'Transform your facility with intelligent power distribution and monitoring.',
    'Get Started',
    '/contact',
    '/herogreen4.jpeg',
    'Smart Grid',
    4,
    1,
    NOW(),
    NOW()
  ),
  (
    'Future of Energy Storage',
    'Experience the next generation of sustainable energy technology.',
    'Request Demo',
    '/contact',
    '/herogreen5.jpeg',
    'Innovation',
    5,
    1,
    NOW(),
    NOW()
  );
