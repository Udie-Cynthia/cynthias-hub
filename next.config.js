/** @type {import('next').NextConfig} */
const inCI = !!process.env.CI;
module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  ...(inCI ? { eslint: { ignoreDuringBuilds: true } } : {}),
  ...(inCI ? { typescript: { ignoreBuildErrors: true } } : {}),
};
