/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // 🔹 Local
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/uploads/products/**',
      },

      // 🔹 Backend prod (Railway)
      {
        protocol: 'https',
        hostname: 'ecommerce-be-production-73f6.up.railway.app',
        pathname: '/uploads/products/**',
      },

      // 🔹 Wasabi (fallback / debug)
      {
        protocol: 'https',
        hostname: 's3.us-west-1.wasabisys.com',
        pathname: '/ecommerce-2026/products/**',
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
