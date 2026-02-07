import { ScrollAnimate } from "@/components/scroll-animate";
import { CertificationBar } from "@/components/certification-bar";
import { CTAPanel } from "@/components/cta-panel";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section - Professional About Showcase */}
      <section className="relative bg-gradient-to-br from-slate-900 via-green-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollAnimate animation="fadeInUpElegant" delay={200}>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                  About ION Green
                  <span className="text-green-400 block">Energy</span>
                </h1>
              </ScrollAnimate>

              <ScrollAnimate animation="fadeInUpElegant" delay={400}>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Leading innovator in energy storage solutions, committed to sustainable energy transformation worldwide. 
                  We deliver advanced battery energy storage systems to 100+ countries with a focus on sustainability and efficiency.
                </p>
              </ScrollAnimate>

              <ScrollAnimate animation="scaleInBounce" delay={600}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold"
                  >
                    <Link href="#our-story">
                      Our Story
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold"
                  >
                    <Link href="/contact">
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </ScrollAnimate>
            </div>

            <div className="relative">
              <ScrollAnimate animation="slideInRightSmooth" delay={300}>
                <div className="relative h-96 lg:h-[500px]">
                  <Image
                    src="/image5.png"
                    alt="About ION Green Energy"
                    fill
                    className="object-cover rounded-2xl shadow-2xl"
                    priority
                  />
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </div>
      </section>

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

      <ScrollAnimate animation="cascadeDown" delay={2300}>
        <CertificationBar />
      </ScrollAnimate>
      <ScrollAnimate animation="slideInRightSmooth" delay={2400}>
        <CTAPanel />
      </ScrollAnimate>
    </>
  );
}







