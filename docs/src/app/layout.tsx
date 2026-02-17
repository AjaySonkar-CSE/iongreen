import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout-wrapper";
import "./animations.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: "--font-montserrat",
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ION Green Energy Storage Systems",
  description:
    "ION Green BESS clone – commercial, industrial, and residential energy storage systems from 5kWh to 5MWh.",
  metadataBase: new URL("https://iongreen.itmingo.com"),
  openGraph: {
    title: "ION Green Energy Storage Systems",
    description:
      "One-stop ESS integrator delivering rack-mounted, hybrid, and containerized battery solutions.",
    url: "https://iongreen.itmingo.com",
    siteName: "ION Green Energy",
  },
};

import { dbService } from "@/lib/db-service";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarData = await dbService.getNavbarData();

  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable} font-sans`}>
      <body className="min-h-screen bg-background font-sans antialiased font-roboto">
        <LayoutWrapper initialNavbarData={navbarData}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
