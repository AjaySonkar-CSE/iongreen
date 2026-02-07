import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/stats-section";
import { CompanyProfileText } from "@/components/company-profile-text";
import { SolarEastProductShowcase } from "@/components/solareast-product-showcase";
import { SimpleHomepageSidebar } from "@/components/simple-homepage-sidebar";
import { SolarEastNewsSection } from "@/components/solareast-news-section";
import { CertificationBar } from "@/components/certification-bar";
import { CTAPanel } from "@/components/cta-panel";
import { CooperationSection } from "@/components/cooperation-section";
import { ScrollAnimate } from "@/components/scroll-animate";
import { SungrowStyleShowcase } from "@/components/sungrow-style-showcase";

import SolarSolutions from "@/components/solar-solutions";
import LabEquipmentShowcase from '@/components/client/lab-equipment-showcase-client';
import { dbService } from "@/lib/db-service";

export default async function HomePage() {
  const heroSlides = await dbService.getHeroSlides();

  return (
    <>
      <Hero slides={heroSlides} />

      <StatsSection />

      <ScrollAnimate animation="fadeInUpElegant" delay={200}>
        <CompanyProfileText />
      </ScrollAnimate>

      <ScrollAnimate animation="fadeInUpElegant" delay={300}>
        <SungrowStyleShowcase />
      </ScrollAnimate>

      <ScrollAnimate animation="scaleInBounce" delay={300}>
        <SolarEastProductShowcase />
      </ScrollAnimate>

      <ScrollAnimate animation="fadeInUpElegant" delay={400}>
        <SolarSolutions />
      </ScrollAnimate>

      <ScrollAnimate animation="fadeInUpElegant" delay={400}>
        <CertificationBar />
      </ScrollAnimate>

      <ScrollAnimate animation="fadeInUpElegant" delay={750}>
        <LabEquipmentShowcase />
      </ScrollAnimate>

      <ScrollAnimate animation="slideInRightSmooth" delay={650}>
        <SimpleHomepageSidebar />
      </ScrollAnimate>

      <ScrollAnimate animation="cascadeDown" delay={800}>
        <SolarEastNewsSection />
      </ScrollAnimate>

      <ScrollAnimate animation="scaleInBounce" delay={850}>
        <CTAPanel />
      </ScrollAnimate>

      <ScrollAnimate animation="smoothReveal" delay={950}>
        <CooperationSection />
      </ScrollAnimate>


    </>
  );
}