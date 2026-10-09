import type { Metadata } from 'next';
import { portfolio } from '@/data/portfolio';
export function getOrigin(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
  if (!raw) return;
  try { const url = new URL(raw); if (['http:', 'https:'].includes(url.protocol) && !url.username && !url.password) return url.origin; } catch { /* Omit an invalid origin. */ }
}
export function pageMetadata(title: string, description: string, path = '/'): Metadata {
  const origin = getOrigin();
  return {
    title, description,
    ...(origin ? { metadataBase: new URL(origin), alternates: { canonical: path } } : {}),
    openGraph: { title, description, type: 'website', siteName: portfolio.name, ...(origin ? { url: `${origin}${path}` } : {}) },
    twitter: { card: 'summary', title, description },
  };
}
