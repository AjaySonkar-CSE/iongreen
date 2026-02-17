"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingContactPanel } from "@/components/floating-contact-panel";
import { ParallaxWrapper } from "@/components/providers/parallax-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import Preloader from "@/components/preloader";

export function LayoutWrapper({
  children,
  initialNavbarData
}: {
  children: React.ReactNode;
  initialNavbarData?: any;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Preloader />
      <SmoothScrollProvider>
        <ParallaxWrapper>
          <SiteHeader initialNavbarData={initialNavbarData} />
          <main>
            {children}
            <SiteFooter />
          </main>
          <FloatingContactPanel />
        </ParallaxWrapper>
      </SmoothScrollProvider>
    </>
  );
}
