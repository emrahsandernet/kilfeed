/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'mertg.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'mertg.com',
        port: '4000',
        pathname: '/maps/**',
      },
      {
        protocol: 'http',
        hostname: 'mertg.com',
        port: '4000',
        pathname: '/logos/**',
      },
      {
        protocol: 'https',
        hostname: 'mertg.com',
        port: '',
        pathname: '/maps/**',
      },
      {
        protocol: 'https',
        hostname: 'mertg.com',
        port: '',
        pathname: '/logos/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 