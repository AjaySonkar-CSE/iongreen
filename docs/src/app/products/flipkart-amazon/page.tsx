"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ProductCard } from '@/components/product-card';
import { ProductCardSection } from '@/components/product-card-section';

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description?: string;
  image_url?: string;
  is_featured?: boolean;
  price?: string;
  rating?: number;
}

export default function FlipkartAmazonProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const filtered = (json.data as Product[]).filter((p) =>
            ['flipkart', 'amazon', 'flipkart-amazon'].includes((p.category || '').toLowerCase())
          );
          setProducts(filtered);
        }
      } catch (e) {
        console.error('Failed to load products:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = Array.from(new Set(products.map(product => product.category)));

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image from public */}
      <div className="relative h-96 w-full">
        <Image
          src={'/images/productgreen.jpeg'}
          alt={'Flipkart & Amazon Solar Products'}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Flipkart & Amazon Solar Products
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Discover our premium range of solar energy products available on leading e-commerce platforms
            </p>
          </div>
        </div>
      </div>

      {/* ION Green Content Section - Added per requirements */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">ION Green Energy Solutions</h2>
            <p className="text-gray-600 mb-3">
              ION Green is a leading innovator in energy storage solutions, providing advanced battery energy storage systems that are safe, efficient, and environmentally friendly. Our cutting-edge technology ensures reliable performance and longevity for residential, commercial, and industrial applications.
            </p>
            <p className="text-gray-600 mb-3">
              With a global presence in over 100 countries, we continue to drive innovation in sustainable energy solutions. Our dedicated support team is available 24/7 to assist with any technical inquiries, product maintenance, or system optimization needs.
            </p>
            <p className="text-gray-600">
              Trust ION Green for comprehensive support throughout your energy storage journey, from initial consultation to ongoing maintenance and optimization.
            </p>
          </div>
          {/* DB-backed product cards shown inside Why Choose section */}
          <div className="mt-12">
            {loading ? (
              <div className="text-center py-8 text-gray-600">Loading products…</div>
            ) : products.length === 0 ? (
              <div className="text-center py-8 text-gray-600">No Flipkart/Amazon products available.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div key={product.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 block h-96">
                    {/* Full-size image background */}
                    <div className="absolute inset-0">
                      <Image
                        src={product.image_url || '/images/placeholder-product.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                    </div>

                    {/* Category badge */}
                    <span className="absolute top-4 right-4 bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-2.5 py-1 rounded-full z-10 transition-colors duration-300">
                      {product.category}
                    </span>

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Content overlay - appears on hover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                            {product.description}
                          </p>
                        )}

                        <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors duration-300">
                          <span>Read More</span>
                          <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Cards Section */}
      <ProductCardSection initialCards={[]} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === null
                ? 'bg-green-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 block h-96">
              {/* Full-size image background */}
              <div className="absolute inset-0">
                <Image
                  src={product.image_url || '/images/placeholder-product.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>

              {/* Featured badge */}
              {product.is_featured && (
                <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-medium px-2.5 py-1 rounded-full z-10">
                  Featured
                </span>
              )}

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content overlay - appears on hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm font-medium text-green-600 mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {product.name}
                  </h3>

                  {product.description && (
                    <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                      {product.description}
                    </p>
                  )}

                  {/* Price and rating */}
                  <div className="flex items-center justify-between mb-3">
                    {product.price && (
                      <span className="text-lg font-bold text-gray-900">
                        {product.price}
                      </span>
                    )}
                    {product.rating && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors duration-300">
                    <span>View on Store</span>
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Information */}
        <div className="mt-20 bg-gray-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-4">Why Buy from Flipkart & Amazon?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Enjoy the convenience of online shopping with the quality and reliability of ION Green products
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">Hassle-free returns within 30 days on all products with free pickup</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick delivery across India with secure packaging and real-time tracking</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Multiple payment options with 100% secure transactions and EMI available</p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-4">How to Purchase</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Getting started with ION Green solar products is easy and convenient
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Browse Products</h3>
              <p className="text-gray-600">Select from our wide range of solar energy solutions</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Add to Cart</h3>
              <p className="text-gray-600">Add products to your cart and proceed to checkout</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Complete your purchase with multiple payment options</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Receive your products with free shipping and installation support</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Go Solar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our complete range of solar products available on Flipkart and Amazon
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.flipkart.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Shop on Flipkart
            </a>
            <a
              href="https://www.amazon.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Shop on Amazon
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
