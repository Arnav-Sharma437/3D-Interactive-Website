'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ADMIN_PASSWORD = 'hakimi2024'; // Change + move to env for production

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const tryLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4 dark:bg-[#0A0A0A]">
        <div className="w-full max-w-sm border border-stone-200 bg-white px-8 py-12 shadow-lg dark:border-[#1E1E1E] dark:bg-[#111] dark:shadow-none">
          <div className="mb-10 text-center">
            <div className="mb-1 font-display text-3xl font-bold tracking-widest gold-text">HAKIMI</div>
            <div className="font-body text-[10px] uppercase tracking-[0.4em] text-stone-500 dark:text-gray-600">Admin Panel</div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block font-body text-xs uppercase tracking-widest text-stone-600 dark:text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') tryLogin();
                }}
                className="admin-input"
                placeholder="Enter admin password"
              />
              {error && <p className="mt-2 font-body text-xs text-red-600 dark:text-red-400">{error}</p>}
            </div>
            <button
              onClick={tryLogin}
              className="w-full bg-gold py-3 font-body text-xs font-medium uppercase tracking-widest text-black transition-colors hover:bg-gold-light"
            >
              Login
            </button>
            <p className="text-center font-body text-xs text-stone-500 dark:text-gray-700">Default: hakimi2024</p>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: '📊' },
    { label: 'Products', href: '/admin/products', icon: '📦' },
    { label: 'Add Product', href: '/admin/products/new', icon: '➕' },
  ];

  const linkClass = (active: boolean) =>
    `flex items-center gap-3 rounded-sm px-4 py-3 font-body text-xs uppercase tracking-widest transition-all ${
      active
        ? 'border-l-2 border-gold bg-gold/10 text-gold'
        : 'text-stone-600 hover:bg-stone-200/80 dark:text-gray-500 dark:hover:bg-white/5 dark:hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 dark:bg-[#060606] dark:text-white">
      {/* Mobile top bar */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-stone-200 bg-stone-100/95 px-4 backdrop-blur-md dark:border-[#1E1E1E] dark:bg-[#060606]/95 md:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg border border-stone-300 px-3 py-2 font-body text-xs uppercase tracking-widest text-stone-800 dark:border-[#2A2A2A] dark:text-white"
          aria-label="Open menu"
        >
          Menu
        </button>
        <span className="font-display text-sm font-bold tracking-widest gold-text">HAKIMI</span>
        <Link href="/" className="text-[10px] uppercase tracking-widest text-gold">
          Site
        </Link>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-0 z-[70] flex h-full w-60 flex-col border-r border-stone-200 bg-white transition-transform duration-300 dark:border-[#1E1E1E] dark:bg-[#080808] md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="relative border-b border-stone-200 p-5 dark:border-[#1E1E1E] md:p-6">
          <div className="font-display text-xl font-bold tracking-widest gold-text">HAKIMI</div>
          <div className="mt-0.5 font-body text-[9px] uppercase tracking-[0.4em] text-stone-500 dark:text-gray-600">Admin Panel</div>
          <button
            type="button"
            className="absolute right-3 top-4 text-stone-500 md:hidden dark:text-gray-500"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3 md:p-4">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={linkClass(pathname === item.href)}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-stone-200 p-4 dark:border-[#1E1E1E]">
          <Link
            href="/"
            className="block font-body text-xs uppercase tracking-widest text-stone-600 transition hover:text-gold dark:text-gray-600"
          >
            ← View Site
          </Link>
          <button
            type="button"
            onClick={() => setAuthenticated(false)}
            className="mt-3 block font-body text-xs uppercase tracking-widest text-red-700 transition hover:text-red-500 dark:text-red-800 dark:hover:text-red-400"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="min-h-screen pt-14 md:ml-60 md:pt-0">{children}</main>
    </div>
  );
}
