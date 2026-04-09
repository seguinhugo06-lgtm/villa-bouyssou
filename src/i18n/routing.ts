import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  pathnames: {
    '/': '/',
    '/la-villa/overview': '/la-villa/overview',
    '/la-villa/localisation': '/la-villa/localisation',
    '/la-villa/photos': '/la-villa/photos',
    '/availability': '/availability',
    '/reviews': '/reviews',
    '/prices': '/prices',
    '/travel-guide': '/travel-guide',
    '/travel-guide/villages': '/travel-guide/villages',
    '/travel-guide/castles': '/travel-guide/castles',
    '/travel-guide/caves': '/travel-guide/caves',
    '/travel-guide/gardens': '/travel-guide/gardens',
    '/contact': '/contact',
  },
});
