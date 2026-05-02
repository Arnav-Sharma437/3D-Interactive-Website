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
    <div className="p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-display font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500 text-sm font-body">Welcome to Hakimi Admin Panel</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Products', value: stats.total, color: 'text-white' },
          { label: 'In Stock', value: stats.available, color: 'text-green-400' },
          { label: 'Featured', value: stats.featured, color: 'text-[#C9A84C]' },
          { label: 'Out of Stock', value: stats.outOfStock, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="bg-[#111] border border-[#1E1E1E] p-6">
            <div className={`text-3xl font-display font-bold ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs tracking-widest uppercase text-gray-600 font-body">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-4 mb-10">
        <Link href="/admin/products/new" className="bg-[#C9A84C] hover:bg-[#E8C96D] text-black px-6 py-3 text-xs tracking-widest uppercase font-medium font-body transition-colors">
          + Add New Product
        </Link>
        <Link href="/products" target="_blank" className="border border-[#1E1E1E] hover:border-[#C9A84C]/50 text-gray-400 hover:text-white px-6 py-3 text-xs tracking-widest uppercase font-body transition-all">
          View Storefront ↗
        </Link>
      </div>

      {/* Recent products */}
      <div>
        <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-4 font-body">Recent Products</h2>
        <div className="border border-[#1E1E1E] overflow-hidden">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-[#1E1E1E] bg-[#0D0D0D]">
                {['Product', 'Category', 'Price', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] tracking-widest uppercase text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 6).map(p => (
                <tr key={p.id} className="border-b border-[#1A1A1A] hover:bg-[#111] transition-colors">
                  <td className="px-5 py-4 text-white">{p.name}</td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{p.category}</td>
                  <td className="px-5 py-4 text-[#C9A84C]">₹{p.price.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] tracking-widest uppercase px-2 py-1 ${p.available ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                      {p.available ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/admin/products/${p.id}/edit`} className="text-xs text-[#C9A84C] hover:underline mr-4">Edit</Link>
                    <Link href={`/product/${p.slug}`} target="_blank" className="text-xs text-gray-600 hover:text-white">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-right">
          <Link href="/admin/products" className="text-xs text-[#C9A84C] hover:underline tracking-widest uppercase font-body">
            View All Products →
          </Link>
        </div>
      </div>
    </div>
  );
}
