"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ProductCard } from '@/components/product-card';
import { ProductCardSection } from '@/components/product-card-section';
import { ScrollAnimate } from "@/components/scroll-animate";
import { AnimatedContentWrapper } from "@/components/client/animated-content-wrapper";

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
    <div className="min-h-screen bg-transparent">
      {/* Hero Section - Fixed background for smooth reveal */}
      <section className="fixed inset-0 h-screen w-full overflow-hidden z-0">
        <Image
          src={'/images/productgreen.jpeg'}
          alt={'Flipkart & Amazon Solar Products'}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <ScrollAnimate animation="fadeInUpElegant" delay={200}>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
                Flipkart & Amazon Store
              </h1>
            </ScrollAnimate>
            <ScrollAnimate animation="fadeInUpElegant" delay={400}>
              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto font-medium tracking-wide drop-shadow-lg">
                Premium ION Green Solar Solutions Delivered to Your Doorstep
              </p>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      <AnimatedContentWrapper>
        {/* Intro Section */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <ScrollAnimate animation="smoothReveal" delay={200}>
                <h2 className="text-3xl md:text-5xl font-bold text-green-700 mb-8 tracking-tight">ION Green Energy Solutions</h2>
              </ScrollAnimate>
              <div className="space-y-6">
                <ScrollAnimate animation="fadeInUpElegant" delay={400}>
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                    ION Green is a leading innovator in energy storage solutions, providing advanced battery energy storage systems that are safe, efficient, and environmentally friendly. Our cutting-edge technology ensures reliable performance and longevity for residential, commercial, and industrial applications.
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={600}>
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                    With a global presence in over 100 countries, we continue to drive innovation in sustainable energy solutions. Our dedicated support team is available 24/7 to assist with any technical inquiries, product maintenance, or system optimization needs.
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={800}>
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-semibold text-green-600">
                    Trust ION Green for comprehensive support throughout your energy storage journey, from initial consultation to ongoing maintenance and optimization.
                  </p>
                </ScrollAnimate>
              </div>
            </div>

            {/* DB-backed product cards */}
            <div className="mt-20">
              {loading ? (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                </div>
              ) : products.length === 0 ? (
                <ScrollAnimate animation="fadeInUpElegant">
                  <div className="text-center py-12 text-gray-400 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    No Flipkart/Amazon products available at the moment.
                  </div>
                </ScrollAnimate>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product, idx) => (
                    <ScrollAnimate
                      key={product.id}
                      animation="scaleInBounce"
                      delay={idx * 100}
                    >
                      <div className="group relative overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-green-300 block h-96">
                        <div className="absolute inset-0">
                          <Image
                            src={product.image_url || '/images/placeholder-product.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 1200px) 100vw, 33vw"
                          />
                        </div>

                        <span className="absolute top-6 right-6 bg-green-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full z-10">
                          {product.category}
                        </span>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-70 group-hover:opacity-100 transition-all duration-500"></div>

                        <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                              {product.name}
                            </h3>
                            {product.description && (
                              <p className="text-gray-600 text-xs mb-4 line-clamp-2 leading-relaxed">
                                {product.description}
                              </p>
                            )}

                            <div className="flex items-center text-green-600 font-bold text-sm">
                              <span className="underline underline-offset-4">Explore More</span>
                              <svg className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimate>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Dynamic Static Section */}
        <ScrollAnimate animation="smoothReveal">
          <ProductCardSection initialCards={[]} />
        </ScrollAnimate>

        {/* Main Grid Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimate animation="smoothReveal" className="mb-16">
              <h2 className="text-4xl font-bold text-center text-slate-900">Explore Our Full Range</h2>
            </ScrollAnimate>

            {/* Category Filter */}
            <ScrollAnimate animation="fadeInUpElegant" delay={200} className="flex flex-wrap justify-center gap-3 mb-16">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-all transform hover:scale-105 ${selectedCategory === null
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                  : 'bg-white text-slate-600 hover:bg-green-50'
                  }`}
              >
                ALL PRODUCTS
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-all transform hover:scale-105 ${selectedCategory === category
                    ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                    : 'bg-white text-slate-600 hover:bg-green-50 border border-slate-100'
                    }`}
                >
                  {category?.toUpperCase()}
                </button>
              ))}
            </ScrollAnimate>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProducts.map((product, idx) => (
                <ScrollAnimate
                  key={product.id}
                  animation={idx % 2 === 0 ? "slideInLeftSmooth" : "slideInRightSmooth"}
                  delay={idx * 100}
                >
                  <div className="group relative overflow-hidden rounded-[2.5rem] shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 border border-transparent hover:border-green-200 block h-[450px]">
                    <div className="absolute inset-0">
                      <Image
                        src={product.image_url || '/images/placeholder-product.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        sizes="(max-width: 1200px) 100vw, 33vw"
                      />
                    </div>

                    {product.is_featured && (
                      <span className="absolute top-6 left-6 bg-yellow-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full z-10 shadow-lg">
                        Featured
                      </span>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-green-400 text-xs font-black uppercase tracking-[0.2em] mb-3">
                        {product.category}
                      </div>
                      <h3 className="text-2xl font-black text-white mb-4 group-hover:text-green-300 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between mb-8">
                        {product.price && (
                          <span className="text-2xl font-black text-white">
                            {product.price}
                          </span>
                        )}
                        {product.rating && (
                          <div className="flex items-center bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                            <span className="text-yellow-400 mr-2 text-lg">★</span>
                            <span className="text-white font-bold text-sm">{product.rating}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white transform group-hover:rotate-[360deg] transition-transform duration-700">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <span className="text-white font-bold tracking-widest text-xs uppercase underline underline-offset-8">Shop Now</span>
                      </div>
                    </div>
                  </div>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>

        {/* Value Props Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimate animation="smoothReveal" className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 underline decoration-green-500 decoration-8 underline-offset-8">E-Commerce Excellence</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Official ION Green products delivered through the world's most trusted marketplaces.
              </p>
            </ScrollAnimate>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Easy Returns",
                  icon: "🔄",
                  color: "green",
                  desc: "Hassle-free returns within 30 days on all products with free doorstep pickup."
                },
                {
                  title: "Fast Delivery",
                  icon: "⚡",
                  color: "blue",
                  desc: "Next-day delivery available in most cities with real-time tracking and secure packaging."
                },
                {
                  title: "Secure Payment",
                  icon: "🛡️",
                  color: "purple",
                  desc: "100% encrypted transactions with No-Cost EMI and multiple digital payment options."
                }
              ].map((prop, idx) => (
                <ScrollAnimate key={idx} animation="scaleInBounce" delay={idx * 200}>
                  <div className="bg-slate-50 rounded-[3rem] p-12 text-center group hover:bg-white hover:shadow-2xl transition-all duration-500 border border-slate-100">
                    <div className="text-6xl mb-8 group-hover:scale-125 transition-transform">{prop.icon}</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{prop.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{prop.desc}</p>
                  </div>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>

        {/* Purchase Flow */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-green-600/10 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <ScrollAnimate animation="smoothReveal" className="text-center mb-20 text-white">
              <h2 className="text-4xl font-bold mb-4">How to Purchase</h2>
              <div className="h-1 w-20 bg-green-500 mx-auto rounded-full"></div>
            </ScrollAnimate>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
              {[
                { step: "01", title: "Browse", desc: "Select from our wide range of solar solutions" },
                { step: "02", title: "Add to Cart", desc: "Select your store and click Add to Cart" },
                { step: "03", title: "Pay Securely", desc: "Complete checkout with preferred method" },
                { step: "04", title: "Installation", desc: "Get free doorstep installation support" }
              ].map((step, idx) => (
                <ScrollAnimate key={idx} animation="fadeInUpElegant" delay={idx * 150}>
                  <div className="relative group">
                    <div className="text-7xl font-black text-white/5 absolute -top-10 -left-6 group-hover:text-green-500/10 transition-colors">{step.step}</div>
                    <h3 className="text-2xl font-bold mb-4 relative z-10 group-hover:text-green-400 transition-colors">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed relative z-10">{step.desc}</p>
                  </div>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <ScrollAnimate animation="scaleInBounce">
              <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-900 rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight">Ready to Go Solar?</h2>
                  <p className="text-xl md:text-2xl text-green-50 mb-12 max-w-3xl mx-auto font-medium opacity-90 leading-relaxed">
                    Explore our complete premium range of solar products available on Flipkart and Amazon today.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <ScrollAnimate animation="slideInLeftSmooth" delay={300}>
                      <a
                        href="https://www.flipkart.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-[#2874f0] hover:bg-[#1b5ec4] text-white font-black py-6 px-12 rounded-2xl transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-4 text-lg"
                      >
                        <span className="text-2xl">⚡</span> Shop on Flipkart
                      </a>
                    </ScrollAnimate>
                    <ScrollAnimate animation="slideInRightSmooth" delay={400}>
                      <a
                        href="https://www.amazon.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-[#ff9900] hover:bg-[#e68a00] text-black font-black py-6 px-12 rounded-2xl transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-4 text-lg"
                      >
                        <span className="text-2xl">📦</span> Shop on Amazon
                      </a>
                    </ScrollAnimate>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </section>
      </AnimatedContentWrapper>
    </div>
  );
}
