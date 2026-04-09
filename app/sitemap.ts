import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hippocampus-plongee.fr'
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/le-club`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
