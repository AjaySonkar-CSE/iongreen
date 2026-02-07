"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingContactPanel } from "@/components/floating-contact-panel";
import { ParallaxWrapper } from "@/components/providers/parallax-provider";
import Preloader from "@/components/preloader";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Preloader />
      <ParallaxWrapper>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <FloatingContactPanel />
      </ParallaxWrapper>
    </>
  );
}
