"use client";

import { ScrollReveal } from "@/components/enhanced-scroll-reveal";

export function CompanyProfileText() {
  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <ScrollReveal direction="down" duration={0.8} delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-montserrat leading-tight text-center">
            Company Profile
          </h2>
        </ScrollReveal>
        
        <ScrollReveal direction="up" duration={0.8} delay={0.2}>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto font-roboto leading-relaxed text-center">
            Ion Green Energy is a clean energy technology company providing solutions in energy storage, renewable integration, and intelligent power systems, supporting the development of safe, reliable, and sustainable energy infrastructure across global markets.
            <br /><br />
            Ion Green Energy offers a modular container-based Battery Energy Storage System (BESS) designed for scalable deployment up to 10 MW, subject to project configuration. The modular architecture enables reduced installation time, optimized transportation logistics, and simplified on-site handling, minimizing the requirement for heavy lifting equipment during installation. This design supports faster deployment and flexible capacity expansion while improving overall project economics.
            <br /><br />
            Ion Green Energy delivers integrated solutions covering BESS, Energy Management Systems (EMS), grid-scale storage, and solar power EPC, suitable for utility, commercial, industrial, and residential applications. Systems are engineered to support grid stability, renewable energy integration, peak load management, and backup power applications, in accordance with applicable project requirements.
            <br /><br />
            The company's broader technology portfolio includes hybrid solar systems, hydrogen fuel cell technologies, electric vehicle energy infrastructure, and advanced battery and fuel-cell solutions for mobility and unmanned platforms, offered based on customer and regulatory needs.
            <br /><br />
            Ion Green Energy designs and supplies its systems with due consideration to applicable international standards and certification pathways, including UL, IEC, and other relevant regional requirements, as specified in project scope and tender documentation.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
