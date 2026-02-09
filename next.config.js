/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'ecommerce-be-production-73f6.up.railway.app',
        pathname: '/uploads/**',
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
