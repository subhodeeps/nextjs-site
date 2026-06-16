// next.config.mjs

import createMDX from '@next/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for static site generation (GitHub Pages)
  output: 'export',
  images: {
    unoptimized: true,
  },
  
  // Must match your GitHub repository name exactly
  basePath: '/nextjs-site',
  
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

// import createMDX from '@next/mdx'

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   images: {
//     unoptimized: true,
//   },
//   basePath: '',
//   assetPrefix: '',
// }

// const withMDX = createMDX({})

// export default withMDX(nextConfig)