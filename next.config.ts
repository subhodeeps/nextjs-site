import type { NextConfig } from "next";
import withMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Custom Webpack configuration
  webpack: (config, { isServer }) => {
    // Suppress infrastructure warnings
    config.infrastructureLogging = {
      level: "error",
    };

    // Add any additional custom Webpack config here
    return config;
  },
  // Page extensions to include .md and .mdx files
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

// Export with MDX support
export default withMDX({
  extension: /\.mdx?$/,
})(nextConfig);