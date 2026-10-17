// next.config.mjs
//
// Build settings for Next.js, the counterpart of Jekyll's _config.yml. See
// docs/for-jekyll-users.md for how the pieces of this site map onto Jekyll.
import createMDX from '@next/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

// The next line tells code editors which settings are allowed in nextConfig
/** @type {import('next').NextConfig} */

const nextConfig = {
    // Build a fully static site into out/, as Jekyll writes _site/. Vercel serves
    // those files; no server runs code when a page is requested.
    output: 'export',
    // Next.js can resize images on a server, but a static site has none, so
    // images are served exactly as they are in public/.
    images: {
        unoptimized: true,
    },

    // File types that can act as pages, so a page.mdx works as well as a page.tsx
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

// MDX support (Markdown that may contain components). The remark plugins work on
// the Markdown: remark-math finds $...$ and $$...$$, and the two frontmatter
// plugins read the --- block at the top of a post. rehype-katex then turns the
// math into HTML when the site is built, so no math library runs in the browser.
// The plugins are handed over as functions, which only webpack supports; that is
// why the npm scripts run Next.js with --webpack.
const withMDX = createMDX({
    options: {
        remarkPlugins: [remarkMath, remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [rehypeKatex],
    },
})

// Add MDX support to the settings above and hand the result to Next.js
export default withMDX(nextConfig)
