import { MetadataRoute } from 'next';
import { AREAS } from '@/constants/areas';
import { SEO_CONFIG } from '@/constants/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.siteUrl;
  const currentDate = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic area pages
  const areaPages: MetadataRoute.Sitemap = AREAS.map((area) => ({
    url: `${baseUrl}/deals/${area.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Combine all pages
  return [...staticPages, ...areaPages];
}