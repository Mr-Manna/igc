import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    // /industries was renamed to /sectors. Keep the old path working for any
    // external link or index entry that predates the rename.
    return [
      { source: "/industries", destination: "/sectors", permanent: true },
      { source: "/industries/:slug*", destination: "/sectors/:slug*", permanent: true },
    ];
  },
};

export default nextConfig;
