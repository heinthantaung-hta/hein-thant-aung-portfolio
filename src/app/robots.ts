import type { MetadataRoute } from 'next';
import { getOrigin } from '@/lib/metadata';
export default function robots(): MetadataRoute.Robots { const origin = getOrigin(); return { rules: { userAgent: '*', allow: '/' }, ...(origin ? { sitemap: `${origin}/sitemap.xml` } : {}) }; }
