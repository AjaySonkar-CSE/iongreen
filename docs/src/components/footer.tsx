import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Footer Top with Background Image */}
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
              alt="Solar Panels Installation"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-blue-900/80 mix-blend-multiply" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center px-4">
            <div className="text-center max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Powering a Sustainable Future
              </h2>
              <p className="text-sm text-gray-100 max-w-2xl mx-auto leading-relaxed mb-4">
                Join us in our mission to deliver innovative energy storage solutions that drive efficiency, 
                reduce carbon footprint, and create a cleaner environment for generations to come.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a 
                  href="/contact" 
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Get a Quote
                </a>
                <a 
                  href="/solutions" 
                  className="px-6 py-2.5 bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium rounded-full transition-colors duration-300"
                >
                  Explore Solutions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                Ion Green
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed italic">
                Leading provider of <span className="text-green-300 not-italic">energy storage solutions</span> for residential, commercial, and industrial applications.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-green-400 flex items-center">
                <span className="w-5 h-0.5 bg-green-500 mr-2"></span>
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/products", label: "Products" },
                  { href: "/solutions", label: "Solutions" },
                  { href: "/case", label: "Case Studies" },
                  { href: "/news", label: "News" }
                ].map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className="text-gray-300 hover:text-white text-sm transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-green-400 flex items-center">
                <span className="w-5 h-0.5 bg-green-500 mr-2"></span>
                Contact Us
              </h4>
              <address className="text-gray-300 text-sm space-y-2">
                <p className="flex items-start">
                  <span className="text-green-400 mr-2">📍</span>
                  <span>123 Energy Street, Green Valley, GV 12345</span>
                </p>
                <p className="flex items-center">
                  <span className="text-green-400 mr-2">✉️</span>
                  <a href="mailto:info@iongreen.com" className="hover:text-green-300 transition-colors">info@iongreen.com</a>
                </p>
                <p className="flex items-center">
                  <span className="text-green-400 mr-2">📞</span>
                  <a href="tel:9202636627" className="hover:text-green-300 transition-colors">9202636627</a>
                </p>
              </address>
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-green-400 flex items-center">
                <span className="w-5 h-0.5 bg-green-500 mr-2"></span>
                Newsletter
              </h4>
              <p className="text-gray-300 text-sm mb-3">
                Subscribe for the latest updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 w-full rounded-l-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        
      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} <span className="text-green-400">Ion Green</span>. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-3 md:mt-0">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/sitemap", label: "Sitemap" }
              ].map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="text-gray-500 hover:text-green-300 text-sm transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
