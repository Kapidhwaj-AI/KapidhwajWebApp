import { getLocalStorageItem } from "@/lib/storage";
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const localHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}')
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.kapidhwaj.ai',
        port: '9889',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'turn.kapidhwaj.ai',
        port: '10001',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'turn.kapidhwaj.ai',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: localHub?.id?.toString() ?? '**',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.hindustantimes.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wallsdesk.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'media.kapidhwaj.ai',
        pathname: '/**',
      },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: ['https://media.kapidhwaj.ai', 'https://storage.googleapis.com/kapibucket2'],
    },
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS PLAY' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
        ],
      },
    ];
  },

  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      tls: false,
      net: false,
    };
    return config;
  },

  devIndicators: false,

  async rewrites() {
    return [
      {
        source: '/video:port*/:path*',
        destination: 'https://media.kapidhwaj.ai:port*/:path*',
      },
      {
        source: '/video/:path*',
        destination: 'https://storage.googleapis.com/kapibucket2/:path*',
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
