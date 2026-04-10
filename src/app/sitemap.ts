import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://villa-bouyssou.vercel.app';
  const locales = ['fr', 'en'];
  const pages = [
    '',
    '/la-villa/overview',
    '/la-villa/photos',
    '/la-villa/localisation',
    '/availability',
    '/prices',
    '/reviews',
    '/contact',
    '/travel-guide',
    '/travel-guide/villages',
    '/travel-guide/castles',
    '/travel-guide/caves',
    '/travel-guide/gardens',
    '/mentions-legales',
    '/politique-de-confidentialite',
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
      });
    }
  }
  return entries;
}
