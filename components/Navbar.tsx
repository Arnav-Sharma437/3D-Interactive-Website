'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-stone-100/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md border-b border-stone-200 dark:border-[#1E1E1E]'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className="text-2xl font-display font-bold gold-shimmer tracking-widest">HAKIMI</span>
          <span className="text-[10px] tracking-[0.35em] text-stone-500 dark:text-gray-400 uppercase font-body mt-0.5">Hardware</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {[['Home', '/'], ['Products', '/products'], ['About', '/#about'], ['Contact', '/#contact']].map(([label, href]) => (
            <Link key={label} href={href} className="text-sm tracking-widest uppercase text-stone-600 dark:text-gray-400 hover:text-gold transition-colors duration-300 font-body font-medium">
              {label}
            </Link>
          ))}
          <Link href="/admin" className="text-sm tracking-widest uppercase text-stone-500 dark:text-gray-500 hover:text-gold transition-colors duration-300 font-body font-medium" title="Staff login">
            Admin
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/products" className="group relative px-6 py-2.5 text-xs tracking-widest uppercase font-medium overflow-hidden">
            <span className="absolute inset-0 border border-gold/50 group-hover:border-gold transition-colors duration-300" />
            <span className="relative text-gold group-hover:text-stone-900 dark:group-hover:text-white transition-colors duration-300">Browse All</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-6 bg-stone-900 dark:bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px w-6 bg-stone-900 dark:bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-stone-900 dark:bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-stone-100 dark:bg-[#0A0A0A] border-t border-stone-200 dark:border-[#1E1E1E] px-6 py-6 flex flex-col gap-5">
          {[['Home', '/'], ['Products', '/products'], ['About', '/#about'], ['Contact', '/#contact']].map(([label, href]) => (
            <Link key={label} href={href} className="text-sm tracking-widest uppercase text-stone-600 dark:text-gray-400 hover:text-gold transition-colors" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-[#1E1E1E]">
            <Link href="/admin" className="text-sm tracking-widest uppercase text-stone-500 hover:text-gold transition-colors" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
