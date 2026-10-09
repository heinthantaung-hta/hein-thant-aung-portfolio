import type { ReactNode } from 'react';
import { portfolio } from '@/data/portfolio';
import { pageMetadata } from '@/lib/metadata';
import './globals.css';
export const metadata = { ...pageMetadata(`${portfolio.name} — Developer Portfolio`, portfolio.description), icons: { icon: '/icon.svg' }, robots: { index: true, follow: true } };
const themeScript = `(function(){var t;try{t=localStorage.getItem('hta-theme')}catch(e){}if(t!=='light'&&t!=='dark')t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t})()`;
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
