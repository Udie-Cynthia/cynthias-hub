/** @type {import('next').NextConfig} */
const inCI = !!process.env.CI;

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  ...(inCI ? { eslint: { ignoreDuringBuilds: true } } : {}),
  ...(inCI ? { typescript: { ignoreBuildErrors: true } } : {}),
};

module.exports = nextConfig;
