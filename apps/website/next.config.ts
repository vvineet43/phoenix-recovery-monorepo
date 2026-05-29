import type { NextConfig } from "next";
import withPWAInit, { runtimeCaching } from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  publicExcludes: ["!downloads/**/*"],
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /^\/downloads\/.*/,
        handler: "NetworkOnly",
      },
      ...runtimeCaching,
    ],
  },
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPWA(nextConfig);

