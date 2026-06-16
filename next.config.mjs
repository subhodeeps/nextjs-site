// next.config.mjs
import createMDX from '@next/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for static exports
  output: 'export',
  images: {
    unoptimized: true,
  },
    
  // Ensures MDX files are treated as pages
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  
  // Fixes the Turbopack "Unknown module type" error
  turbopack: {
    resolveExtensions: ['.mdx', '.md', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    rules: {
      '*.mdx': {
        loaders: ['@mdx-js/loader'],
        as: '*.js',
      },
      '*.md': {
        loaders: ['@mdx-js/loader'],
        as: '*.js',
      },
    },
  },
}

// Injects the math plugins so LaTeX renders correctly
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
})

export default withMDX(nextConfig)