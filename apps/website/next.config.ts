import type { NextConfig } from "next";
import withPWAInit, { runtimeCaching } from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  publicExcludes: ["!downloads/**/*", "!*.py"],
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
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      // Canonicalize /en/* to default root English URLs
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/:path*",
        destination: "/:path*",
        permanent: true,
      },
      // Redirect legacy shorthand PDF tool paths (previously referenced in llms.txt)
      { source: "/images-to-pdf", destination: "/pdf-toolkit/tools/images-to-pdf", permanent: true },
      { source: "/scan-to-pdf", destination: "/pdf-toolkit/tools/scan-to-pdf", permanent: true },
      { source: "/html-to-pdf", destination: "/pdf-toolkit/tools/html-to-pdf", permanent: true },
      { source: "/text-to-pdf", destination: "/pdf-toolkit/tools/text-to-pdf", permanent: true },
      { source: "/ocr-pdf", destination: "/pdf-toolkit/tools/ocr-pdf", permanent: true },
      { source: "/protect-pdf", destination: "/pdf-toolkit/tools/protect-pdf", permanent: true },
      { source: "/unlock-pdf", destination: "/pdf-toolkit/tools/unlock-pdf", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
