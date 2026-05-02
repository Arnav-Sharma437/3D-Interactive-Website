'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span className="inline-flex h-9 w-9 rounded-full border border-gold/30 bg-black/20 dark:bg-white/5" aria-hidden />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-black/10 transition hover:border-gold hover:bg-gold/10 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        <svg className="h-4 w-4 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.6 4.6 9 9 0 01-10.38-10.4 5.389 5.389 0 014.6 4.6c.44-.06.9-.1 1.36-.1z" />
        </svg>
      ) : (
        <svg className="h-4 w-4 text-amber-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 001-1V9a1 1 0 00-1-1H2v6zm18 0h2v-2h-2a1 1 0 01-1 1v2a1 1 0 001 1zM11 2v2a1 1 0 001 1h2a1 1 0 001-1V2h-6zm0 18v2h6v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1zM6.34 5.66l1.41 1.41a1 1 0 001.42 0 1 1 0 000-1.41l-1.41-1.41a1 1 0 00-1.42 1.42zm12.02 12.02l1.41 1.41a1 1 0 001.42-1.42l-1.41-1.41a1 1 0 10-1.42 1.42zM5.66 18.34l1.41-1.41a1 1 0 10-1.42-1.42l-1.41 1.41a1 1 0 001.42 1.42zm12.02-12.02l1.41-1.41a1 1 0 10-1.42-1.42l-1.41 1.41a1 1 0 001.42 1.42z" />
        </svg>
      )}
    </button>
  );
}
