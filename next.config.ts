import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['storage.googleapis.com'],
    // Optional: if you want to specify path patterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/kph-ml/**',
      },
    ],
  },
  /* config options here */
  devIndicators: false,
};

export default nextConfig;
