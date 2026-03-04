const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // If using placeholder key, alias Clerk to mock
    if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === 'pk_test_placeholder') {
      config.resolve.alias['@clerk/nextjs'] = path.resolve(__dirname, 'lib/clerk-mock.tsx');
      config.resolve.alias['@clerk/nextjs/server'] = path.resolve(__dirname, 'lib/clerk-mock.tsx');
    }
    return config;
  },
};

module.exports = nextConfig;
