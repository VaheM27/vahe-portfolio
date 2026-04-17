import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  distDir: ".next",
  // Workaround: Next.js 15.5.x passes null to generateBuildId when unset, causing runtime error
  generateBuildId: async () => null,
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

export default nextConfig;
