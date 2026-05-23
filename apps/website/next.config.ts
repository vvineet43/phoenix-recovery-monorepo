import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  publicExcludes: ["downloads/**/*"],
});

const nextConfig: NextConfig = {
  experimental: {
    // Inlines critical CSS and defers the rest — eliminates the render-blocking
    // local CSS file reported by PageSpeed Insights
    optimizeCss: true,
  },
};

export default withPWA(nextConfig);
