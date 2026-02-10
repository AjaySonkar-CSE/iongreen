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

export default async function HomePage() {
  const heroSlides = await dbService.getHeroSlides();

  return (
    <main className="bg-white">
      {/* Hero with modern carousel and product categories */}
      <Hero slides={heroSlides} />

      {/* Key stats below hero for clean separation */}
      <div className="relative z-10">
        <StatsSection />
      </div>

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
    </main>
  );
}