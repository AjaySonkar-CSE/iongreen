import { ContactChannels } from "@/components/contact-channels";
import { ContactForm } from "@/components/contact-form";
import { ScrollAnimate } from "@/components/scroll-animate";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section - Professional Contact Showcase */}
      <section className="relative bg-gradient-to-br from-slate-900 via-green-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollAnimate animation="fadeInUpElegant" delay={200}>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                  Get in
                  <span className="text-green-400 block">Touch</span>
                </h1>
              </ScrollAnimate>

              <ScrollAnimate animation="fadeInUpElegant" delay={400}>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Our global team is ready to discuss your energy storage needs and provide customized solutions. 
                  Contact us today to start your energy transformation journey.
                </p>
              </ScrollAnimate>

              <ScrollAnimate animation="scaleInBounce" delay={600}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold"
                  >
                    <Link href="#contact-form">
                      Send Message
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold"
                  >
                    <Link href="tel:9202636627">
                      Call Now
                    </Link>
                  </Button>
                </div>
              </ScrollAnimate>
            </div>

            <div className="relative">
              <ScrollAnimate animation="slideInRightSmooth" delay={300}>
                <div className="relative h-96 lg:h-[500px]">
                  <Image
                    src="/1/ion1.png"
                    alt="Contact ION Green"
                    fill
                    className="object-contain rounded-2xl shadow-2xl"
                    priority
                  />
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </div>
      </section>
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
    </>
  );
}

