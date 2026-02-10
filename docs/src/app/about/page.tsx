import { ScrollAnimate } from "@/components/scroll-animate";
import { CertificationBar } from "@/components/certification-bar";
import { CTAPanel } from "@/components/cta-panel";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeroSlider } from "@/components/page-hero-slider";

export default function AboutPage() {
  // Hero slider slides for about page
  const heroSlides = [
    {
      id: 1,
      title: "About ION Green Energy",
      description: "Leading innovator in energy storage solutions, committed to sustainable energy transformation worldwide. We deliver advanced battery energy storage systems to 100+ countries with a focus on sustainability and efficiency.",
      ctaLabel: "Our Story",
      ctaHref: "#our-story",
      image: "/image5.png"
    },
    {
      id: 2,
      title: "25+ Years of Excellence",
      description: "With over 25 years of experience, 5000+ employees, and 5+ production bases, we are a global leader in clean energy technology and energy storage solutions.",
      ctaLabel: "Learn More",
      ctaHref: "#manufacturing-strength",
      image: "/image2.png"
    },
    {
      id: 3,
      title: "Global Presence & Innovation",
      description: "Operating across 100+ countries with headquarters in UAE, engineering centers in India, and strategic partners worldwide. Delivering localized execution with global expertise.",
      ctaLabel: "Contact Us",
      ctaHref: "/contact",
      image: "/Img/image3.png"
    }
  ];

  return (
    <>
      {/* Hero Section with Slider */}
      <PageHeroSlider
        slides={heroSlides}
        height="h-[80vh]"
        showNavigation={true}
        showIndicators={true}
        autoPlay={true}
        autoPlayInterval={5000}
      />

      {/* Company Story Section */}
      <ScrollAnimate animation="fadeInUpElegant" delay={400}>
        <section id="our-story" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <ScrollAnimate animation="slideInLeftSmooth" delay={500}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={600}>
                  <p className="text-gray-600 mb-4">
                    ION Green Energy was founded with a vision to revolutionize the energy storage industry through innovative, sustainable, and reliable solutions. Since our inception, we've been at the forefront of technological advancement in battery energy storage systems.
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={700}>
                  <p className="text-gray-600 mb-4">
                    Our commitment to excellence has led us to develop cutting-edge lithium-ion battery technologies that power homes, businesses, and entire communities across the globe. We believe in creating energy solutions that are not just efficient, but also environmentally responsible.
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={800}>
                  <p className="text-gray-600">
                    Today, ION Green serves customers in over 100 countries, providing comprehensive energy storage solutions that combine safety, performance, and sustainability.
                  </p>
                </ScrollAnimate>
              </div>
              <div className="relative">
                <ScrollAnimate animation="scaleInBounce" delay={900}>
                  <div className="relative h-96 w-full rounded-lg overflow-hidden">
                    <Image
                      src="/image2.png"
                      alt="ION Green Energy Team"
                      fill
                      className="object-cover"
                    />
                  </div>
                </ScrollAnimate>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimate>

      {/* Mission & Vision Section */}
      <ScrollAnimate animation="slideInRightSmooth" delay={1000}>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <ScrollAnimate animation="smoothReveal" delay={1100}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
              </ScrollAnimate>
              <ScrollAnimate animation="fadeInUpElegant" delay={1200}>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Driving the global energy transition through innovative, sustainable, and accessible energy storage solutions
                </p>
              </ScrollAnimate>
            </div>

            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <ScrollAnimate animation="scaleInBounce" delay={1300}>
                  <div className="bg-white p-8 rounded-xl shadow-sm">
                    <div className="text-green-600 text-4xl mb-4">🎯</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                    <p className="text-gray-600">
                      To design, manufacture, and deliver world-class energy solutions that comply with international standards, optimize performance, and create measurable value for our customers, partners, and stakeholders.
                    </p>
                  </div>
                </ScrollAnimate>

                <ScrollAnimate animation="scaleInBounce" delay={1400}>
                  <div className="bg-white p-8 rounded-xl shadow-sm">
                    <div className="text-green-600 text-4xl mb-4">🔭</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                    <p className="text-gray-600">
                      To be a globally trusted clean energy and engineering partner, enabling sustainable growth and accelerating the transition to low-carbon and resilient energy systems worldwide.
                    </p>
                  </div>
                </ScrollAnimate>
              </div>

              <ScrollAnimate animation="scaleInBounce" delay={1500}>
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="text-green-600 text-4xl mb-4">🌍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Global Approach</h3>
                  <p className="text-gray-600 mb-3">
                    ION Green operates through a combination of headquarters, engineering and manufacturing bases, and strategic regional partners. This model allows us to deliver:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 mb-3">
                    <li>Global quality and compliance</li>
                    <li>Local execution and responsiveness</li>
                    <li>Cost-effective and scalable solutions</li>
                  </ul>
                  <p className="text-gray-600">
                    Our international presence ensures consistent delivery standards while addressing region-specific technical, commercial, and regulatory requirements.
                  </p>
                </div>
              </ScrollAnimate>
            </div>

            {/* Who Are You Section */}
            <ScrollAnimate animation="fadeInUpElegant" delay={1500}>
              <div className="mt-16 bg-white p-8 rounded-xl shadow-sm">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Who Are You</h3>
                </div>
                <div className="max-w-4xl mx-auto">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    ION Green is an international clean energy and engineering solutions company focused on delivering reliable, scalable, and future-ready power systems. We operate across renewable energy, energy storage, EV charging infrastructure, and industrial power solutions, supporting clients in commercial, industrial, utility, and public-sector markets.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    With a strong engineering foundation and a global outlook, ION Green combines technology, compliance, and execution excellence to deliver projects that meet international standards and local regulatory requirements. Our approach is driven by performance, safety, and long-term value creation.
                  </p>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </section>
      </ScrollAnimate>

      {/* Core Values Section */}
      <ScrollAnimate animation="fadeInUpElegant" delay={1500}>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <ScrollAnimate animation="smoothReveal" delay={1600}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Values</h2>
              </ScrollAnimate>
              <ScrollAnimate animation="fadeInUpElegant" delay={1700}>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  The fundamental principles that drive our commitment to excellence
                </p>
              </ScrollAnimate>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Engineering Excellence',
                  description: 'Technology-driven, performance-focused solutions.',
                },
                {
                  title: 'Global Compliance',
                  description: 'Adherence to international standards and best practices.',
                },
                {
                  title: 'Reliability & Safety',
                  description: 'Systems designed for long-term, safe operation.',
                },
                {
                  title: 'Sustainability',
                  description: 'Responsible energy solutions for a cleaner future.',
                }
              ].map((value, index) => (
                <ScrollAnimate
                  key={value.title}
                  animation="scaleInBounce"
                  delay={1800 + (index * 100)}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimate>

      {/* Global Presence & Delivery Network Section */}
      <ScrollAnimate animation="slideInLeftSmooth" delay={1900}>
        <section className="py-20 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <ScrollAnimate animation="smoothReveal" delay={2000}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Presence & Delivery Network</h2>
              </ScrollAnimate>
              <ScrollAnimate animation="fadeInUpElegant" delay={2100}>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Operating through headquarters, engineering and manufacturing bases, and strategic regional partners across international markets.
                </p>
              </ScrollAnimate>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Middle East Card */}
              <ScrollAnimate
                animation="fadeInUpElegant"
                delay={2200}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">🇦🇪</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Middle East</h3>
                <h4 className="text-lg font-semibold text-green-600 mb-3">United Arab Emirates</h4>
                <p className="text-gray-600 font-medium mb-2">Headquarters & International Trading</p>
                <p className="text-gray-600">
                  Corporate leadership, global business operations, regional project coordination, and commercial management.
                </p>
              </ScrollAnimate>

              {/* South Asia Card */}
              <ScrollAnimate
                animation="fadeInUpElegant"
                delay={2300}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">🇮🇳</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">South Asia</h3>
                <h4 className="text-lg font-semibold text-green-600 mb-3">India</h4>
                <p className="text-gray-600 font-medium mb-2">Engineering & Manufacturing</p>
                <p className="text-gray-600">
                  System engineering, product development, sourcing, and manufacturing support for domestic and international projects.
                </p>
              </ScrollAnimate>

              {/* Africa Card */}
              <ScrollAnimate
                animation="fadeInUpElegant"
                delay={2400}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Africa</h3>
                <h4 className="text-lg font-semibold text-green-600 mb-3">Multiple Countries</h4>
                <p className="text-gray-600 font-medium mb-2">Project Execution & Distribution Partners</p>
                <p className="text-gray-600">
                  On-ground project execution, logistics coordination, and regional distribution through qualified local partners.
                </p>
              </ScrollAnimate>
            </div>
          </div>
        </section>
      </ScrollAnimate>

      {/* Global Presence Stats Section */}
      <ScrollAnimate animation="slideInRightSmooth" delay={2500}>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <ScrollAnimate animation="smoothReveal" delay={2600}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">🌍 Global Presence</h2>
              </ScrollAnimate>
              <ScrollAnimate animation="fadeInUpElegant" delay={2700}>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Serving customers across the globe with reliable energy solutions and local support
                </p>
              </ScrollAnimate>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: '100+', label: 'Countries Served' },
                { number: '10,000+', label: 'Installations' },
                { number: '50+', label: 'Partners' },
                { number: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <ScrollAnimate
                  key={stat.label}
                  animation="scaleInBounce"
                  delay={2800 + (index * 100)}
                  className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100 hover:border-green-200 transition-colors duration-300"
                >
                  <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                  <div className="text-gray-700 font-medium">{stat.label}</div>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimate>

      {/* Global Footprint Section */}
      <ScrollAnimate animation="fadeInUpElegant" delay={3200}>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <ScrollAnimate animation="smoothReveal" delay={3300}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Footprint</h2>
              </ScrollAnimate>
              <ScrollAnimate animation="fadeInUpElegant" delay={3400}>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                  International Presence & Delivery Model
                </p>
              </ScrollAnimate>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-8 text-center">
                ION Green operates through a globally integrated model combining headquarters leadership, engineering and manufacturing capabilities, and strategic regional partnerships. This structure enables consistent global standards with efficient local execution.
              </p>

              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Regional Presence</h3>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="text-xl font-semibold text-green-600 mb-3">Middle East – United Arab Emirates (UAE)</h4>
                    <p className="font-medium text-gray-900 mb-2">Headquarters & International Trading</p>
                    <p className="text-gray-600">
                      Corporate leadership, global business strategy, commercial management, and regional project coordination.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="text-xl font-semibold text-green-600 mb-3">South Asia – India</h4>
                    <p className="font-medium text-gray-900 mb-2">Engineering & Manufacturing</p>
                    <p className="text-gray-600">
                      System engineering, product development, sourcing, and manufacturing support for domestic and international projects.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="text-xl font-semibold text-green-600 mb-3">Africa</h4>
                    <p className="font-medium text-gray-900 mb-2">Project Execution & Distribution Partners</p>
                    <p className="text-gray-600">
                      On-ground project delivery, logistics coordination, and regional distribution through qualified local partners.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="text-xl font-semibold text-green-600 mb-3">Europe (Partners) (Selective)</h4>
                    <p className="font-medium text-gray-900 mb-2">Technology & Compliance Alignment</p>
                    <p className="text-gray-600">
                      Technology collaboration and alignment with international standards and regulatory frameworks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Global Delivery Advantage</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Centralized governance and quality control</li>
                  <li>Local market knowledge and execution capability</li>
                  <li>Compliance with international codes and standards</li>
                  <li>Scalable operating model for cross-border projects</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="inline-block bg-green-50 p-6 rounded-lg border border-green-200 max-w-2xl">
                  <h4 className="text-lg font-bold text-green-700 mb-2">Positioning Statement</h4>
                  <p className="text-gray-700">
                    Delivering localized execution with global engineering expertise, compliance discipline, and long-term performance assurance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimate>

      {/* Manufacturing Strength Section - Similar to Reference Sites */}
      <ScrollAnimate animation="fadeInUpElegant" delay={3500}>
        <section id="manufacturing-strength" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <ScrollAnimate animation="smoothReveal" delay={3600}>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Manufacturing Strength</h2>
              </ScrollAnimate>
              <ScrollAnimate animation="fadeInUpElegant" delay={3700}>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  ION Green owns 25+ years' experience in solar thermal, heat pump and energy storage production.
                  We have established multiple production bases and boast significant annual production capacity for energy storage systems.
                </p>
              </ScrollAnimate>
            </div>

            {/* Manufacturing Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                { value: "25+", label: "Years Experience", helper: "Since 1999" },
                { value: "5000+", label: "Employees", helper: "Global Team" },
                { value: "2GWh+", label: "Annual Production", helper: "Energy Storage Capacity" },
                { value: "5+", label: "Production Bases", helper: "Across India & UAE" }
              ].map((stat, index) => (
                <ScrollAnimate
                  key={stat.label}
                  animation="scaleInBounce"
                  delay={3800 + (index * 100)}
                >
                  <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-lg text-center border border-green-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">{stat.value}</div>
                    <div className="text-sm md:text-base text-gray-700 font-semibold uppercase tracking-wide mb-1">
                      {stat.label}
                    </div>
                    {stat.helper && (
                      <div className="text-xs text-gray-500">{stat.helper}</div>
                    )}
                  </div>
                </ScrollAnimate>
              ))}
            </div>

            {/* Production Bases */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Raipur Manufacturing Base",
                  location: "Chhattisgarh, India",
                  description: "Primary production facility for residential and commercial energy storage systems with advanced assembly lines and quality control systems.",
                  image: "/Img/image1.png"
                },
                {
                  name: "Mumbai Engineering Center",
                  location: "Maharashtra, India",
                  description: "R&D and engineering hub for product development, system integration, and technical innovation in battery technology.",
                  image: "/Img/image2.png"
                },
                {
                  name: "Delhi Distribution Center",
                  location: "Delhi, India",
                  description: "Strategic distribution and logistics hub serving North India with comprehensive inventory and fast delivery capabilities.",
                  image: "/Img/image3.png"
                },
                {
                  name: "Bangalore Tech Center",
                  location: "Karnataka, India",
                  description: "Software development and smart energy management systems with IoT integration and cloud-based monitoring solutions.",
                  image: "/Img/image4.png"
                },
                {
                  name: "UAE Headquarters",
                  location: "United Arab Emirates",
                  description: "International headquarters for global operations, commercial management, and strategic partnerships across Middle East and Africa.",
                  image: "/Img/image5.png"
                },
                {
                  name: "Chennai Assembly Plant",
                  location: "Tamil Nadu, India",
                  description: "Specialized facility for large-scale commercial and industrial energy storage systems with containerized BESS production.",
                  image: "/Img/image6.png"
                }
              ].map((base, index) => (
                <ScrollAnimate
                  key={base.name}
                  animation="scaleInBounce"
                  delay={4200 + (index * 100)}
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
                    <div className="relative h-48">
                      <Image
                        src={base.image}
                        alt={base.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg mb-1">{base.name}</h3>
                        <p className="text-green-300 text-sm">{base.location}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 leading-relaxed">{base.description}</p>
                    </div>
                  </div>
                </ScrollAnimate>
              ))}
            </div>

            {/* Manufacturing Capabilities */}
            <ScrollAnimate animation="fadeInUpElegant" delay={4800}>
              <div className="mt-16 bg-gradient-to-r from-green-50 to-white p-8 rounded-xl border border-green-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Manufacturing Capabilities</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    "Advanced Assembly & Testing Infrastructure",
                    "Automated Module Integration",
                    "Robust Quality Management & Control",
                    "Alignment with Global Standards (UL, IEC, CE)"
                  ].map((capability, index) => (
                    <div key={capability} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-medium">{capability}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </section>
      </ScrollAnimate>

      <ScrollAnimate animation="cascadeDown" delay={4900}>
        <CertificationBar />
      </ScrollAnimate>
      <ScrollAnimate animation="slideInRightSmooth" delay={5000}>
        <CTAPanel />
      </ScrollAnimate>
    </>
  );
}







