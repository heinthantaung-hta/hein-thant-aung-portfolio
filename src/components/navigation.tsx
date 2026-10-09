'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Menu, X, Moon, Sun } from 'lucide-react';
import type { Portfolio } from '@/data/portfolio';

export function Navigation({ name, initials, items }: { name: string; initials: string; items: Portfolio['navigation'] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    const sections = items.map(item => document.getElementById(item.id)).filter((item): item is HTMLElement => Boolean(item));
    const update = () => {
      let current = '';
      for (const section of sections) if (section.getBoundingClientRect().top <= window.innerHeight * 0.4) current = section.id;
      setActive(current);
    };
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [items]);
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const handle = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node) && !toggle.current?.contains(event.target as Node)) setOpen(false);
    };
    const media = window.matchMedia('(min-width: 768px)');
    const resize = () => { if (media.matches) setOpen(false); };
    document.addEventListener('keydown', handle); document.addEventListener('pointerdown', outside); media.addEventListener('change', resize);
    return () => { document.removeEventListener('keydown', handle); document.removeEventListener('pointerdown', outside); media.removeEventListener('change', resize); };
  }, [open]);
  return <header className="site-header"><div className="header-inner">
    <Link className="wordmark" href="/#home" aria-label={`${name}, home`}>{initials}<span>.</span></Link>
    <nav ref={menu} id="main-navigation" className={`navigation ${open ? 'is-open' : ''}`} aria-label="Main navigation">
      {items.map(item => <a key={item.id} href={`/#${item.id}`} aria-current={active === item.id ? 'location' : undefined} onClick={() => {
        setOpen(false);
        // Move focus to the destination after an in-page navigation.
        requestAnimationFrame(() => document.getElementById(item.id)?.focus({ preventScroll: true }));
      }}>{item.label}</a>)}
    </nav>
    <div className="header-controls"><ThemeControl /><button ref={toggle} type="button" className="icon-button menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button></div>
  </div></header>;
}
const hydratedSubscribe = () => () => {};
function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}
function ThemeControl() {
  const ready = useSyncExternalStore(hydratedSubscribe, () => true, () => false);
  const dark = useSyncExternalStore(subscribeTheme, () => document.documentElement.dataset.theme === 'dark', () => false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const system = () => {
      let manual = false;
      try { manual = ['light', 'dark'].includes(localStorage.getItem('hta-theme') || ''); } catch { /* Storage can be unavailable. */ }
      if (!manual) document.documentElement.dataset.theme = media.matches ? 'dark' : 'light';
    };
    media.addEventListener('change', system);
    return () => media.removeEventListener('change', system);
  }, []);
  return <button type="button" className="icon-button theme-toggle" disabled={!ready} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} onClick={() => {
    const next = dark ? 'light' : 'dark'; document.documentElement.dataset.theme = next;
    try { localStorage.setItem('hta-theme', next); } catch { /* Apply theme for this visit. */ }
  }}>{dark ? <Sun size={19} /> : <Moon size={19} />}</button>;
}
