import { ContactChannels } from "@/components/contact-channels";
import { ContactForm } from "@/components/contact-form";
import { ScrollAnimate } from "@/components/scroll-animate";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeroSlider } from "@/components/page-hero-slider";

import { AnimatedContentWrapper } from "@/components/client/animated-content-wrapper";

export default function ContactPage() {
  // Hero slider slides for contact page
  const heroSlides = [
    {
      id: 1,
      title: "Get in Touch",
      description: "Our global team is ready to discuss your energy storage needs and provide customized solutions. Contact us today to start your energy transformation journey.",
      ctaLabel: "Send Message",
      ctaHref: "#contact-form",
      image: "/Img/image7.png"
    },
    {
      id: 2,
      title: "Expert Consultation Available",
      description: "Speak with our energy storage experts to find the perfect solution for your residential, commercial, or industrial needs. We're here to help you every step of the way.",
      ctaLabel: "Request Quote",
      ctaHref: "#contact-form",
      image: "/Img/image8.png"
    },
    {
      id: 3,
      title: "Global Support Network",
      description: "With offices and partners across 100+ countries, we provide local support with global expertise. Reach out to our team for immediate assistance.",
      ctaLabel: "Call Now",
      ctaHref: "tel:+919202836627",
      image: "/Img/image9.png"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section with Slider - Fixed like home page */}
      <PageHeroSlider
        slides={heroSlides}
        height="h-screen"
        showNavigation={true}
        showIndicators={true}
        autoPlay={true}
        autoPlayInterval={5000}
        fixed={true}
      />

      <AnimatedContentWrapper>

        <ScrollAnimate animation="fadeInUpElegant" delay={400}>
          <section id="contact-form" className="bg-white py-20">
            <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-2 md:px-6">
              <div className="space-y-4">
                <ScrollAnimate animation="fadeInUpElegant" delay={500}>
                  <h2 className="text-2xl font-semibold text-slate-900">Tell us about your project</h2>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={600}>
                  <p className="text-sm text-slate-600">
                    Provide your site load, target capacity, and preferred cooling topology. A ION Green engineer will respond
                    within 24 hours.
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="scaleInBounce" delay={700}>
                  <ContactForm />
                </ScrollAnimate>
              </div>
              <ScrollAnimate animation="slideInRightSmooth" delay={800}>
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                  <ScrollAnimate animation="fadeInUpElegant" delay={900}>
                    <h3 className="text-lg font-semibold text-slate-900">Global Headquarters</h3>
                  </ScrollAnimate>
                  <ScrollAnimate animation="fadeInUpElegant" delay={1000}>
                    <p className="mt-2 text-sm text-slate-600">
                      M/s. ION-GREEN ENERGY PVT LTD,
                      <br />506,507, 5th Floor Babylon Capital
                      <br />Behind Oswal Petrol Pump,
                      <br />G E Road, Raipur 492001, (C.G)

                      <br />

                    </p>
                  </ScrollAnimate>
                  <ScrollAnimate animation="scaleInBounce" delay={1100}>
                    <div className="mt-6 h-64 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300" aria-hidden />
                  </ScrollAnimate>
                </div>
              </ScrollAnimate>
            </div>
          </section>
        </ScrollAnimate>
        <ScrollAnimate animation="slideInLeftSmooth" delay={1200}>
          <ContactChannels />
        </ScrollAnimate>
      </AnimatedContentWrapper>
    </div>
  );
}
