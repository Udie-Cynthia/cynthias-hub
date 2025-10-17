/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allow production builds to succeed even if there are type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Dont block builds on ESLint issues in CI.
    ignoreDuringBuilds: true,
  },
};
module.exports = nextConfig;
