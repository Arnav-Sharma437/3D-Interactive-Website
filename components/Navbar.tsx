'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
      scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1E1E1E]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className="text-2xl font-display font-bold gold-shimmer tracking-widest">HAKIMI</span>
          <span className="text-[10px] tracking-[0.35em] text-gray-400 uppercase font-body mt-0.5">Hardware</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {[['Home', '/'], ['Products', '/products'], ['About', '/#about'], ['Contact', '/#contact']].map(([label, href]) => (
            <Link key={label} href={href} className="text-sm tracking-widest uppercase text-gray-400 hover:text-[#C9A84C] transition-colors duration-300 font-body font-medium">
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/products" className="group relative px-6 py-2.5 text-xs tracking-widest uppercase font-medium overflow-hidden">
            <span className="absolute inset-0 border border-[#C9A84C]/50 group-hover:border-[#C9A84C] transition-colors duration-300" />
            <span className="relative text-[#C9A84C] group-hover:text-white transition-colors duration-300">Browse All</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#0A0A0A] border-t border-[#1E1E1E] px-6 py-6 flex flex-col gap-5">
          {[['Home', '/'], ['Products', '/products'], ['About', '/#about'], ['Contact', '/#contact']].map(([label, href]) => (
            <Link key={label} href={href} className="text-sm tracking-widest uppercase text-gray-400 hover:text-[#C9A84C] transition-colors" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
