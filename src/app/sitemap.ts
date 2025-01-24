import { MetadataRoute } from 'next'

export const dynamic = 'force-static'


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
    // Add more routes as needed
  ]
}