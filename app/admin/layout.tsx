'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ADMIN_PASSWORD = 'hakimi2024'; // Change this!

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const pathname = usePathname();

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="w-full max-w-sm px-8 py-12 border border-[#1E1E1E] bg-[#111]">
          <div className="text-center mb-10">
            <div className="text-3xl font-display font-bold gold-text tracking-widest mb-1">HAKIMI</div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-gray-600 font-body">Admin Panel</div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs tracking-widest uppercase text-gray-600 font-body block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    if (password === ADMIN_PASSWORD) {
                      setAuthenticated(true);
                    } else {
                      setError('Incorrect password');
                    }
                  }
                }}
                className="admin-input"
                placeholder="Enter admin password"
              />
              {error && <p className="text-red-400 text-xs mt-2 font-body">{error}</p>}
            </div>
            <button
              onClick={() => {
                if (password === ADMIN_PASSWORD) {
                  setAuthenticated(true);
                } else {
                  setError('Incorrect password');
                }
              }}
              className="w-full bg-[#C9A84C] hover:bg-[#E8C96D] text-black py-3 text-xs tracking-widest uppercase font-medium font-body transition-colors"
            >
              Login
            </button>
            <p className="text-center text-xs text-gray-700 font-body">Default password: hakimi2024</p>
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

  return (
    <div className="min-h-screen bg-[#060606] flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-[#1E1E1E] flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-[#1E1E1E]">
          <div className="font-display font-bold gold-text tracking-widest text-xl">HAKIMI</div>
          <div className="text-[9px] tracking-[0.4em] uppercase text-gray-600 font-body mt-0.5">Admin Panel</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-xs tracking-widest uppercase font-body transition-all rounded-sm ${
                pathname === item.href
                  ? 'bg-[#C9A84C]/10 text-[#C9A84C] border-l-2 border-[#C9A84C]'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#1E1E1E]">
          <Link href="/" className="text-xs text-gray-600 hover:text-[#C9A84C] tracking-widest uppercase font-body transition-colors">
            ← View Site
          </Link>
          <button
            onClick={() => setAuthenticated(false)}
            className="block mt-3 text-xs text-red-800 hover:text-red-500 tracking-widest uppercase font-body transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-60 flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}
