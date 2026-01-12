import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for GitHub Pages
  // output: "export",
  // basePath: "/dev-stream",
  // assetPrefix: "/dev-stream",
  reactStrictMode: true,

  // Replicate / AI images MUST bypass Next optimizer
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3003",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
