import React from 'react';
import { FaInfoCircle, FaTools, FaQuestionCircle, FaNewspaper, FaEnvelope, FaBatteryFull } from 'react-icons/fa';
import { MdOutlineSolarPower } from 'react-icons/md';

type PageType = 'products' | 'solutions' | 'about' | 'lab-equipment' | 'support' | 'case' | 'news' | 'contact';

interface PageContent {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  sidebarContent: React.ReactNode;
}

export const getPageContent = (pageType: PageType): PageContent => {
  // Define default content first
  let content: Omit<PageContent, 'sidebarContent'> = {
    title: 'Page',
    description: 'Page content',
    imageUrl: '/images/default.jpg',
    imageAlt: 'Default Image'
  };

  const commonSidebar = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
      <ul className="space-y-2">
        <li>
          <a href="/products" className="flex items-center text-blue-600 hover:text-blue-800">
            <FaBatteryFull className="mr-2" /> Products
          </a>
        </li>
        <li>
          <a href="/solutions" className="flex items-center text-blue-600 hover:text-blue-800">
            <MdOutlineSolarPower className="mr-2" /> Solutions
          </a>
        </li>
        <li>
          <a href="/about" className="flex items-center text-blue-600 hover:text-blue-800">
            <FaInfoCircle className="mr-2" /> About Us
          </a>
        </li>
        <li>
          <a href="/lab-equipment" className="flex items-center text-blue-600 hover:text-blue-800">
            <FaTools className="mr-2" /> Lab Equipment
          </a>
        </li>
        <li>
          <a href="/support" className="flex items-center text-blue-600 hover:text-blue-800">
            <FaQuestionCircle className="mr-2" /> Support
          </a>
        </li>
        <li>
          <a href="/news" className="flex items-center text-blue-600 hover:text-blue-800">
            <FaNewspaper className="mr-2" /> News
          </a>
        </li>
        <li>
          <a href="/contact" className="flex items-center text-blue-600 hover:text-blue-800">
            <FaEnvelope className="mr-2" /> Contact
          </a>
        </li>
      </ul>
    </div>
  );

  switch (pageType) {
    case 'products':
      content = {
        title: 'Our Products',
        description: 'Explore our range of high-quality energy storage solutions for residential, commercial, and industrial applications.',
        imageUrl: '/images/products-sidebar.jpg',
        imageAlt: 'Energy Storage Products'
      };
      break;
    case 'solutions':
      content = {
        title: 'Energy Solutions',
        description: 'Innovative energy storage solutions tailored to meet your specific needs and requirements.',
        imageUrl: '/images/solutions-sidebar.jpg',
        imageAlt: 'Energy Solutions'
      };
      break;
    case 'about':
      content = {
        title: 'About Us',
        description: 'Learn about our mission, vision, and the team behind our innovative energy storage solutions.',
        imageUrl: '/images/about-sidebar.jpg',
        imageAlt: 'About Our Company'
      };
      break;
    case 'lab-equipment':
      content = {
        title: 'Lab Equipment',
        description: 'State-of-the-art laboratory equipment for research and development of energy storage technologies.',
        imageUrl: '/images/lab-equipment-sidebar.jpg',
        imageAlt: 'Laboratory Equipment'
      };
      break;
    case 'support':
      content = {
        title: 'Support Center',
        description: 'Find answers to your questions, access documentation, and get in touch with our support team.',
        imageUrl: '/images/support-sidebar.jpg',
        imageAlt: 'Customer Support'
      };
      break;
    case 'case':
      content = {
        title: 'Case Studies',
        description: 'Explore our successful projects and see how our solutions have helped businesses and communities.',
        imageUrl: '/images/case-studies-sidebar.jpg',
        imageAlt: 'Case Studies'
      };
      break;
    case 'news':
      content = {
        title: 'Latest News',
        description: 'Stay updated with the latest news, announcements, and developments in energy storage technology.',
        imageUrl: '/images/news-sidebar.jpg',
        imageAlt: 'Latest News'
      };
      break;
    case 'contact':
      content = {
        title: 'Contact Us',
        description: 'Get in touch with our team for inquiries, support, or partnership opportunities.',
        imageUrl: '/images/contact-sidebar.jpg',
        imageAlt: 'Contact Information'
      };
      break;
  }

  return {
    ...content,
    sidebarContent: commonSidebar
  } as PageContent;
};
