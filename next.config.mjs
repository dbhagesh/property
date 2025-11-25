/** @type {import('next').NextConfig} */

const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',

  // Base path for GitHub Pages (update this with your repo name)
  // For example: if your repo is 'username.github.io/property-website', use '/property-website'
  // If deploying to username.github.io (root), leave basePath empty
  // For local development, set NEXT_PUBLIC_BASE_PATH="" in .env
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // Asset prefix for GitHub Pages
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // React strict mode for better error handling
  reactStrictMode: true,

  // Disable x-powered-by header
  poweredByHeader: false,

  // Enable SWC minification
  swcMinify: true,

  // Ignore ESLint errors during build (fix them separately)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Ignore TypeScript errors during build (we've already checked)
  typescript: {
    ignoreBuildErrors: false,
  },

  // Image optimization configuration for static export
  images: {
    unoptimized: true, // Required for static export
  },

  // Compression
  compress: true,

  // Environment variables validation
  env: {
    SITE_NAME: 'Mahadev Realtors',
    SITE_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://dbhagesh.github.io/property',
  },

  // Trailing slash for better compatibility with static hosting
  trailingSlash: true,

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add any custom webpack configurations here
    if (!isServer) {
      // Client-side optimizations
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;