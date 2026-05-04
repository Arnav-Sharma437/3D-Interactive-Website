'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

const NAV_SECTIONS = [
  ['Home', '/'],
  ['Products', '/products'],
  ['About', '/#about'],
  ['Contact', '/#contact'],
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (hash: string) => {
    const id = hash.replace('#', '');
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleSectionNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('/#')) return;
    const hash = href.slice(1);
    e.preventDefault();
    setMenuOpen(false);
    if (pathname === '/') {
      scrollToSection(hash);
      window.history.replaceState(null, '', href);
      return;
    }
    router.push(href);
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-stone-200 bg-stone-100/95 backdrop-blur-md dark:border-[#1E1E1E] dark:bg-[#0A0A0A]/95'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-2xl font-bold tracking-widest gold-shimmer">HAKIMI</span>
          <span className="mt-0.5 font-body text-[10px] uppercase tracking-[0.35em] text-stone-500 dark:text-gray-400">Hardware</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex md:gap-10">
          {NAV_SECTIONS.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={e => handleSectionNav(e, href)}
              scroll={href.startsWith('/#') ? false : undefined}
              className="font-body text-sm font-medium uppercase tracking-widest text-stone-600 transition-colors duration-300 hover:text-gold dark:text-gray-400"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/products"
            className="group relative overflow-hidden px-6 py-2.5 text-xs font-medium uppercase tracking-widest"
          >
            <span className="absolute inset-0 border border-gold/50 transition-colors duration-300 group-hover:border-gold" />
            <span className="relative text-gold transition-colors duration-300 group-hover:text-stone-900 dark:group-hover:text-white">
              Browse All
            </span>
          </Link>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 bg-stone-900 transition-all duration-300 dark:bg-white ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`block h-px w-6 bg-stone-900 transition-all duration-300 dark:bg-white ${menuOpen ? 'opacity-0' : ''}`} />
          <span
            className={`block h-px w-6 bg-stone-900 transition-all duration-300 dark:bg-white ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${menuOpen ? 'max-h-[min(70vh,420px)] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex flex-col gap-4 border-t border-stone-200 bg-stone-100 px-6 py-6 dark:border-[#1E1E1E] dark:bg-[#0A0A0A]">
          {NAV_SECTIONS.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={e => handleSectionNav(e, href)}
              scroll={href.startsWith('/#') ? false : undefined}
              className="font-body text-sm uppercase tracking-widest text-stone-600 transition-colors hover:text-gold dark:text-gray-400"
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center justify-end border-t border-stone-200 pt-4 dark:border-[#1E1E1E]">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
