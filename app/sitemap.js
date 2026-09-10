import { PRESETS } from '@/config/presets';

export default async function sitemap() {
const baseUrl = "https://www.resizewala.in";
  const currentDate = new Date();

  // 1. Static root page
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. Dynamic 27 exam preset pages
  const presetRoutes = PRESETS.map((preset) => ({
    url: `${baseUrl}/${preset.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...routes, ...presetRoutes];
}