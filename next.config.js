/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed `output: 'export'` because static export requires generateStaticParams for dynamic routes
  // and prevents runtime dynamic pages like order tracking that rely on localStorage and client routing.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
