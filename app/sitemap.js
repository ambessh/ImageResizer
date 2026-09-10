import { EXAM_PRESETS } from '@/config/presets';

export default async function sitemap() {
  // Apna exact live domain ya Vercel URL yahan set karein
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

  // 15 dynamic pSEO preset pages ke liye automated entries
  const presetUrls = EXAM_PRESETS.map((preset) => ({
    url: `${baseUrl}/${preset.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...presetUrls,
  ];
}