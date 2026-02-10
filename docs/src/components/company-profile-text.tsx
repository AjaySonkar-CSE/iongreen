"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ScrollAnimate } from "@/components/scroll-animate";

export function CompanyProfileText() {
  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <AnimatedSection animation="fadeInDown" duration={0.8} delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-10 font-montserrat leading-tight text-center">
            Company Profile
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content with smooth left slide */}
          <ScrollAnimate animation="slideInLeftSmooth" delay={200}>
            <div className="space-y-5 font-roboto leading-relaxed text-gray-700 text-base md:text-lg">
              <p>
                Ion Green Energy is a clean energy technology company providing solutions in energy storage,
                renewable integration, and intelligent power systems. We support the development of safe, reliable,
                and sustainable energy infrastructure across global markets.
              </p>
              <p>
                Our modular container-based Battery Energy Storage Systems (BESS) are designed for scalable deployment
                up to utility scale. The modular architecture reduces installation time, optimizes transportation,
                and simplifies on-site handling, supporting faster deployment and flexible capacity expansion.
              </p>
              <p>
                Ion Green delivers integrated solutions covering BESS, Energy Management Systems (EMS), grid-scale
                storage, and solar power EPC for utility, commercial, industrial, and residential applications.
                Systems are engineered to support grid stability, renewable integration, peak load management, and
                backup power.
              </p>
              <p>
                Our broader technology portfolio includes hybrid solar systems, hydrogen fuel cell technologies,
                EV energy infrastructure, and advanced battery and fuel-cell solutions for mobility and unmanned
                platforms.
              </p>
              <p>
                All systems are designed with due consideration to international standards and certification pathways,
                including UL, IEC, and regional requirements as specified in project scope and tender documentation.
              </p>
            </div>
          </ScrollAnimate>

          <ScrollAnimate animation="slideInRightSmooth" delay={300}>
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/Cinematic_Renewable_Energy_Ecosystem_Video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-xl md:text-2xl font-semibold mb-1">
                  Advanced Battery Energy Storage
                </h3>
                <p className="text-green-200 text-sm md:text-base">
                  Modular containerized systems engineered for safety, reliability, and long-term performance.
                </p>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}
