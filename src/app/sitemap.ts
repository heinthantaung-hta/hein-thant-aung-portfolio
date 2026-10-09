import type { MetadataRoute } from 'next';
import { enabledProjects } from '@/data/portfolio';
import { getOrigin } from '@/lib/metadata';
export default function sitemap(): MetadataRoute.Sitemap { const origin = getOrigin(); return origin ? [{ url: origin, changeFrequency: 'monthly', priority: 1 }, ...enabledProjects.map(project => ({ url: `${origin}/projects/${project.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 }))] : []; }
