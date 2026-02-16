import Image from "next/image";
import Link from "next/link";
import { dbService } from "@/lib/db-service";
import { ScrollAnimate } from "@/components/scroll-animate";
import { AnimatedContentWrapper } from "@/components/client/animated-content-wrapper";

export default async function MobileEVChargingStoragePage() {
  const product = await dbService.getProductBySlug("mobile-ev-charging-storage");
  const heroImage = product?.image_url || "/data1.jpg.jpg";
  const brochureUrl = product?.brochure_url || product?.image_url || "/data1.jpg.jpg";
  const specs = [
    { label: "Capacity Range", value: "241kWh – 3.34MWh" },
    { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
    { label: "Cycle Life", value: "≥6000 cycles @ 80% DOD" },
    { label: "Efficiency", value: "≥90%" },
    { label: "Operating Temperature", value: "-20°C to 50°C" },
    { label: "Mobility", value: "Trailer-mounted or containerized" }
  ];

  const productCards = [
    {
      id: "ev-fleet-charging",
      title: "EV Fleet Charging",
      description: "Mobile charging solutions for electric vehicle fleets",
      image: "/data1.jpg.jpg",
      capacity: "241kWh - 1MWh"
    },
    {
      id: "construction-power",
      title: "Construction Site Power",
      description: "Temporary power solutions for construction and events",
      image: "/data2.jpg.jpg",
      capacity: "500kWh - 2MWh"
    },
    {
      id: "emergency-backup",
      title: "Emergency Response",
      description: "Rapid deployment backup power for disaster recovery",
      image: "/hybrid_solar_system.jpg",
      capacity: "1MWh - 3.34MWh"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section - Fixed background for smooth reveal */}
      <section className="fixed inset-0 h-screen w-full overflow-hidden z-0">
        <Image
          src={heroImage}
          alt="Mobile & EV Charging Storage"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <ScrollAnimate animation="fadeInUpElegant" delay={200}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl">Mobile & EV Charging Storage</h1>
            </ScrollAnimate>
            <ScrollAnimate animation="fadeInUpElegant" delay={400}>
              <p className="text-lg md:text-2xl font-medium text-white/90 uppercase tracking-[0.2em] drop-shadow-lg">Smart Energy Solutions on the Move</p>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      <AnimatedContentWrapper>
        {/* Intro Section */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <ScrollAnimate animation="smoothReveal" delay={200}>
                <h2 className="text-3xl md:text-5xl font-bold text-green-700 mb-8 tracking-tight">Mobile & EV Charging Storage Solutions</h2>
              </ScrollAnimate>
              <div className="space-y-6">
                <ScrollAnimate animation="fadeInUpElegant" delay={400}>
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                    {product?.description || "Mobile charging robots and containerized storage to support EV fleets, remote construction, and emergency backup. Featuring rapid deployment trailers and integrated fast-charging piles."}
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={600}>
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                    Our mobile solutions provide flexible, on-demand power wherever and whenever it's needed. From EV charging stations to temporary construction power, our systems can be deployed quickly and operated autonomously.
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={800}>
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-semibold text-green-600">
                    Equipped with smart dispatch scheduling and vehicle-to-grid capabilities for maximum utilization and revenue generation.
                  </p>
                </ScrollAnimate>
              </div>
            </div>
          </div>
        </section>

        {/* Product Cards Grid */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <ScrollAnimate animation="smoothReveal" className="mb-16">
              <h2 className="text-4xl font-bold text-center text-slate-900 tracking-tight">Available Systems</h2>
            </ScrollAnimate>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {productCards.map((card, index) => (
                <ScrollAnimate
                  key={card.id}
                  animation={index % 2 === 0 ? "slideInLeftSmooth" : "slideInRightSmooth"}
                  delay={index * 150}
                >
                  <Link
                    href={`/products/${card.id}`}
                    className="group relative overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 hover:border-green-400 block h-[500px]"
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 1200px) 100vw, 33vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-all duration-500" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-green-400 font-bold uppercase tracking-widest text-xs mb-3">{card.capacity}</span>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">{card.title}</h3>
                      <p className="text-slate-300 text-sm mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{card.description}</p>
                      <div className="flex items-center text-white font-bold group/btn">
                        <span className="text-sm underline underline-offset-8 decoration-green-500/50 group-hover:decoration-green-500 transition-all">Explore Solution</span>
                        <svg className="ml-3 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>

        {/* Features Highlights */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <ScrollAnimate animation="smoothReveal" className="mb-16">
              <h2 className="text-4xl font-bold text-center text-slate-900">Advanced Mobility Features</h2>
            </ScrollAnimate>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: "Rapid Deployment", icon: "🚀", desc: "Quick setup and relocation to any location with zero civil works required." },
                { title: "EV Integration", icon: "🔋", desc: "Built-in DC fast charging capabilities for electric vehicles and heavy-duty fleets." },
                { title: "Smart Scheduling", icon: "📱", desc: "Intelligent dispatch and charging optimization via our cloud-based management app." }
              ].map((feature, idx) => (
                <ScrollAnimate
                  key={idx}
                  animation="scaleInBounce"
                  delay={200 * idx}
                  className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-500 inline-block">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{feature.desc}</p>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Data Overview */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <ScrollAnimate animation="slideInLeftSmooth">
                <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <Image
                    src={brochureUrl}
                    alt="Technical datasheet"
                    fill
                    className="object-contain p-12 bg-white"
                    sizes="50vw"
                  />
                </div>
              </ScrollAnimate>
              <ScrollAnimate animation="slideInRightSmooth" className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
                <h3 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Technical Specifications</h3>
                <dl className="space-y-6">
                  {specs.map((s, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 group">
                      <dt className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1 md:mb-0">{s.label}</dt>
                      <dd className="text-slate-900 font-bold text-lg group-hover:text-green-600 transition-colors">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <a
                    href={brochureUrl}
                    download
                    className="flex-1 px-8 py-5 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 transition-all font-bold text-center shadow-lg shadow-orange-200 group flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Data
                  </a>
                  <Link
                    href="/contact"
                    className="flex-1 px-8 py-5 bg-slate-900 text-white rounded-2xl hover:bg-black transition-all font-bold text-center"
                  >
                    Request Consultation
                  </Link>
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </section>

        {/* Modern CTA */}
        <section className="py-24 bg-green-600 text-white text-center overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
          </div>
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <ScrollAnimate animation="fadeInUpElegant">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Powering the Future of Mobility</h2>
            </ScrollAnimate>
            <ScrollAnimate animation="fadeInUpElegant" delay={200}>
              <p className="text-xl md:text-2xl text-green-50 mb-12 font-medium opacity-90">
                Contact our engineering team to discuss customized mobile energy storage designs for your specific use cases.
              </p>
            </ScrollAnimate>
            <ScrollAnimate animation="scaleInBounce" delay={400}>
              <Link
                href="/contact"
                className="inline-block px-12 py-5 bg-white text-green-700 rounded-full hover:bg-gray-100 transition-all transform hover:scale-110 font-bold text-xl shadow-2xl"
              >
                Get Started Now
              </Link>
            </ScrollAnimate>
          </div>
        </section>
      </AnimatedContentWrapper>
    </div>
  );
}
