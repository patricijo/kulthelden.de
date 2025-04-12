import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
  },
  images: {
    remotePatterns: [new URL("https://image.tmdb.org/**")],
  },
};

export default nextConfig;
