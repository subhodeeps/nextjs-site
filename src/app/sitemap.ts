// src/app/sitemap.ts
//
// Generates /sitemap.xml, the list of pages that search engines are invited to
// index (like the jekyll-sitemap plugin, but written by hand). Add a page here
// when you want it indexed; the blog posts and subpages are not listed yet.
import { MetadataRoute } from 'next'

// Build the sitemap once, when the site is built, which a static site requires
export const dynamic = 'force-static'

/** Returns the entries of sitemap.xml: each page's address and how often it changes. */
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://subhodeeps.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://subhodeeps.vercel.app/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://subhodeeps.vercel.app/cv',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://subhodeeps.vercel.app/reading',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://subhodeeps.vercel.app/learning',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://subhodeeps.vercel.app/blog',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}
