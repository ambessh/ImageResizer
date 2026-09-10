import { PRESETS } from '@/config/presets';

export default async function sitemap() {
  // Apna Vercel link ya custom domain yahan verify/update karein
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://imageresizer.vercel.app';

  // 1. Static root page
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. Dynamic 27 exam preset pages
  const presetRoutes = PRESETS.map((preset) => ({
    url: `${baseUrl}/${preset.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...routes, ...presetRoutes];
}