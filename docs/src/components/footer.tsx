import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Footer Top with Background Image */}
      <div className="relative">
        <div className="relative h-80 w-full overflow-hidden">
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Powering a Sustainable Future
              </h2>
              <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
                Join us in our mission to deliver innovative energy storage solutions that drive efficiency, 
                reduce carbon footprint, and create a cleaner environment for generations to come.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a 
                  href="/contact" 
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Get a Quote
                </a>
                <a 
                  href="/solutions" 
                  className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium rounded-full transition-colors duration-300"
                >
                  Explore Solutions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative py-16">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #4ade80 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="transform transition-transform hover:scale-105">
            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              Ion Green
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed italic">
              Leading provider of <span className="text-green-300 not-italic">energy storage solutions</span> for residential, commercial, and industrial applications.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="transform transition-transform hover:scale-105">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-green-400 flex items-center">
              <span className="w-6 h-0.5 bg-green-500 mr-2"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/products", label: "Products" },
                { href: "/solutions", label: "Solutions" },
                { href: "/case", label: "Case Studies" },
                { href: "/news", label: "News" }
              ].map((item) => (
                <li key={item.href} className="group">
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-white text-sm flex items-center transition-colors duration-300 group-hover:translate-x-1"
                  >
                    <span className="text-green-500 mr-2">→</span>
                    <span className="italic group-hover:not-italic group-hover:text-green-300">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="transform transition-transform hover:scale-105">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-green-400 flex items-center">
              <span className="w-6 h-0.5 bg-green-500 mr-2"></span>
              Contact Us
            </h4>
            <address className="text-gray-300 text-sm space-y-3">
              <p className="flex items-start">
                <svg className="w-4 h-4 mt-0.5 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="italic">123 Energy Street<br />Green Valley, GV 12345</span>
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@iongreen.com" className="italic hover:text-green-300 transition-colors">info@iongreen.com</a>
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:9202636627" className="italic hover:text-green-300 transition-colors">9202636627</a>
              </p>
            </address>
          </div>
          
          {/* Newsletter */}
          <div className="transform transition-transform hover:scale-105">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-green-400 flex items-center">
              <span className="w-6 h-0.5 bg-green-500 mr-2"></span>
              Newsletter
            </h4>
            <p className="text-gray-300 text-sm mb-6 italic">
              Subscribe to our <span className="text-green-300 not-italic">newsletter</span> for the latest updates and insights.
            </p>
            <div className="flex group">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 w-full rounded-l-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              />
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-r-lg text-sm font-medium transform hover:scale-105 transition-all duration-300 flex items-center">
                <span>Subscribe</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
        
      {/* Copyright */}
        <div className="border-t border-gray-700 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm italic">
              &copy; {currentYear} <span className="text-green-400 not-italic">Ion Green</span>. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/sitemap", label: "Sitemap" }
              ].map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="text-gray-500 hover:text-green-300 text-sm transition-colors duration-300 italic"
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
