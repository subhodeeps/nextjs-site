import type { NextConfig } from "next";
import withMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // Enable static export
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
  // Example rewrites
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/learning/weekly-reflections/week-:num",
          destination: "/learning/weekly-reflections/weeks/week-:num",
        },
      ],
    };
  },
};

// Export with MDX support
export default withMDX({
  extension: /\.mdx?$/, // Support .mdx files
})(nextConfig);
