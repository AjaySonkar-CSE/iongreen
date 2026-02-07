import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.ion-greensolar.com" },
      { protocol: "https", hostname: "iongreen.itmingo.com" },
      { protocol: "https", hostname: "www.iongreen.itmingo.com" },
      { protocol: "https", hostname: "www.solareastbess.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "www.metravi.com" },
    ],
    // Add quality configuration to resolve warnings
    qualities: [75, 85],
  },
};

export default nextConfig;
