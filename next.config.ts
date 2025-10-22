import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // basePath can be set if deploying to a subpath
  // basePath: '/repo-name',
};

export default nextConfig;
