import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'], // Include MDX and TSX
};

const withMDX = createMDX();

export default withMDX(nextConfig);