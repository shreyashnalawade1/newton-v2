/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Merge with existing webpack configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };

    return config;
  },
};

export default nextConfig;
