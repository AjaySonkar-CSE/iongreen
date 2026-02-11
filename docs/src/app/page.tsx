import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/stats-section";
import { CompanyProfileText } from "@/components/company-profile-text";
import { SolarEastProductShowcase } from "@/components/solareast-product-showcase";
import { SimpleHomepageSidebar } from "@/components/simple-homepage-sidebar";
import { SolarEastNewsSection } from "@/components/solareast-news-section";
import { CertificationBar } from "@/components/certification-bar";
import { CTAPanel } from "@/components/cta-panel";
import { CooperationSection } from "@/components/cooperation-section";
import { SungrowStyleShowcase } from "@/components/sungrow-style-showcase";
import SolarSolutions from "@/components/solar-solutions";
import LabEquipmentShowcase from "@/components/client/lab-equipment-showcase-client";
import { dbService } from "@/lib/db-service";

import { AnimatedSection } from "@/components/ui/animated-section";

export default async function HomePage() {
  const heroSlides = await dbService.getHeroSlides();

  return (
    <div className="relative bg-transparent">
      {/* Hero with modern carousel and product categories */}
      {/* This is fixed inset-0 on home page */}
      <Hero slides={heroSlides} page="home" />

      <div className="relative z-10 bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.2)] mt-[100vh] border-t border-white/10">
        {/* Key stats below hero for clean separation */}
        <StatsSection />

        {/* Company profile / who we are */}
        <CompanyProfileText />

        {/* Technology & solutions showcases */}
        <SungrowStyleShowcase />

        <SolarSolutions />
        <SolarEastProductShowcase />

        {/* Trust & social proof */}
        <CertificationBar />
        <LabEquipmentShowcase />
        <SimpleHomepageSidebar />
        <SolarEastNewsSection />

        {/* Call to action & partnerships */}
        <CTAPanel />
        <CooperationSection />
      </div>
    </div>
  );
}