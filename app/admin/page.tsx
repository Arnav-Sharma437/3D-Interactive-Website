'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAdminProducts } from '@/lib/adminStore';
import type { Product } from '@/lib/products';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getAdminProducts());
  }, []);

  const stats = {
    total: products.length,
    available: products.filter(p => p.available).length,
    featured: products.filter(p => p.featured).length,
    outOfStock: products.filter(p => !p.available).length,
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-8 md:mb-10">
        <h1 className="font-display text-2xl font-bold text-stone-900 dark:text-white md:text-3xl">Dashboard</h1>
        <p className="mt-1 font-body text-sm text-stone-600 dark:text-gray-500">Welcome to Hakimi Admin Panel</p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 md:mb-10 md:grid-cols-2 lg:grid-cols-4 md:gap-4">
        {[
          { label: 'Total Products', value: stats.total, className: 'text-stone-900 dark:text-white' },
          { label: 'In Stock', value: stats.available, className: 'text-green-700 dark:text-green-400' },
          { label: 'Featured', value: stats.featured, className: 'text-gold' },
          { label: 'Out of Stock', value: stats.outOfStock, className: 'text-red-600 dark:text-red-400' },
        ].map(s => (
          <div
            key={s.label}
            className="border border-stone-200 bg-white p-4 dark:border-[#1E1E1E] dark:bg-[#111] md:p-6"
          >
            <div className={`mb-1 font-display text-2xl font-bold md:text-3xl ${s.className}`}>{s.value}</div>
            <div className="font-body text-[10px] uppercase tracking-widest text-stone-500 dark:text-gray-600 md:text-xs">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mb-10">
        <Link
          href="/admin/products/new"
          className="inline-flex justify-center bg-gold px-6 py-3 font-body text-xs font-medium uppercase tracking-widest text-black transition-colors hover:bg-gold-light"
        >
          + Add New Product
        </Link>
        <Link
          href="/products"
          target="_blank"
          className="inline-flex justify-center border border-stone-300 px-6 py-3 font-body text-xs uppercase tracking-widest text-stone-700 transition-all hover:border-gold hover:text-stone-900 dark:border-[#1E1E1E] dark:text-gray-400 dark:hover:text-white"
        >
          View Storefront ↗
        </Link>
      </div>

      <div>
        <h2 className="mb-4 font-body text-sm uppercase tracking-widest text-stone-600 dark:text-gray-500">Recent Products</h2>
        <div className="overflow-x-auto border border-stone-200 dark:border-[#1E1E1E]">
          <table className="w-full min-w-[600px] font-body text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 dark:border-[#1E1E1E] dark:bg-[#0D0D0D]">
                {['Product', 'Category', 'Price', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-3 py-3 text-left text-[10px] uppercase tracking-widest text-stone-600 dark:text-gray-600 md:px-5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 6).map(p => (
                <tr key={p.id} className="border-b border-stone-100 transition hover:bg-stone-50 dark:border-[#1A1A1A] dark:hover:bg-[#111]">
                  <td className="px-3 py-3 text-stone-900 dark:text-white md:px-5 md:py-4">{p.name}</td>
                  <td className="px-3 py-3 text-xs text-stone-600 dark:text-gray-500 md:px-5">{p.category}</td>
                  <td className="px-3 py-3 text-gold md:px-5">₹{p.price.toLocaleString('en-IN')}</td>
                  <td className="px-3 py-3 md:px-5">
                    <span
                      className={`text-[10px] uppercase tracking-widest ${
                        p.available ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {p.available ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-3 py-3 md:px-5">
                    <Link href={`/admin/products/${p.id}/edit`} className="mr-3 text-xs text-gold hover:underline">
                      Edit
                    </Link>
                    <Link href={`/product/${p.slug}`} target="_blank" className="text-xs text-stone-600 hover:text-gold dark:text-gray-600">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-right">
          <Link href="/admin/products" className="font-body text-xs uppercase tracking-widest text-gold hover:underline">
            View All Products →
          </Link>
        </div>
      </div>
    </div>
  );
}
