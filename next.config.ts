import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['media.kapidhwaj.ai', 'storage.googleapis.com', 'images.unsplash.com'],
    // Optional: if you want to specify path patterns

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.kapidhwaj.ai',
        port: '9889',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/kph-ml/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      // bodySizeLimit: '10mb',
      allowedOrigins: ['https://media.kapidhwaj.ai'],
    },
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin'
          }
        ],
      },
    ]
  },
  // Bypass TLS/SSL in development (temporary)
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      tls: false,
      net: false,
    }
    return config
  },
  /* config options here */
  devIndicators: false,
  // Add support for video streaming
  /* async rewrites() { // Remove or comment out the rewrites section
    return [
      {
        source: '/video/:path*',
        destination: 'https://media.kapidhwaj.ai:9889/:path*',
      },
    ]
  }, */
};

export default nextConfig;
