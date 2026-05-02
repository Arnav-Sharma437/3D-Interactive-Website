'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAdminProducts, deleteProduct } from '@/lib/adminStore';
import { PRODUCTS } from '@/lib/products';
import type { Product } from '@/lib/products';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    setProducts(getAdminProducts());
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    setTimeout(() => {
      deleteProduct(id);
      setProducts(getAdminProducts());
      setDeleting(null);
    }, 400);
  };

  const handleToggleAvailable = (id: string) => {
    const { updateProduct } = require('@/lib/adminStore');
    const product = products.find(p => p.id === id);
    if (!product) return;
    updateProduct(id, { available: !product.available });
    setProducts(getAdminProducts());
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-display font-bold mb-1">All Products</h1>
          <p className="text-gray-500 text-sm font-body">{products.length} products total</p>
        </div>
        <Link href="/admin/products/new" className="bg-[#C9A84C] hover:bg-[#E8C96D] text-black px-6 py-3 text-xs tracking-widest uppercase font-medium font-body transition-colors">
          + Add Product
        </Link>
      </div>

      <div className="space-y-3">
        {products.map(p => (
          <div
            key={p.id}
            className={`flex items-center gap-5 bg-[#111] border border-[#1E1E1E] hover:border-[#C9A84C]/20 p-4 transition-all ${deleting === p.id ? 'opacity-0 scale-95' : 'opacity-100'}`}
          >
            {/* Thumb */}
            <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-[#0D0D0D]">
              <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="64px" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-body truncate">{p.name}</div>
              <div className="text-xs text-gray-600 mt-0.5">{p.category}</div>
              <div className="text-[#C9A84C] text-sm font-display mt-1">₹{p.price.toLocaleString('en-IN')}</div>
            </div>

            {/* Status toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggleAvailable(p.id)}
                className={`text-[10px] tracking-widest uppercase px-3 py-1.5 border transition-all font-body ${
                  p.available
                    ? 'border-green-700 text-green-400 hover:bg-red-900/20 hover:text-red-400 hover:border-red-700'
                    : 'border-red-800 text-red-400 hover:bg-green-900/20 hover:text-green-400 hover:border-green-700'
                }`}
                title="Toggle availability"
              >
                {p.available ? 'In Stock' : 'Out of Stock'}
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <Link href={`/product/${p.slug}`} target="_blank" className="text-xs text-gray-600 hover:text-white font-body transition-colors">View</Link>
              <Link href={`/admin/products/${p.id}/edit`} className="text-xs text-[#C9A84C] hover:text-white font-body transition-colors">Edit</Link>
              <button
                onClick={() => handleDelete(p.id, p.name)}
                className="text-xs text-red-800 hover:text-red-400 font-body transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-600 font-body mb-4">No products yet</p>
          <Link href="/admin/products/new" className="text-[#C9A84C] text-sm hover:underline">Add your first product →</Link>
        </div>
      )}
    </div>
  );
}
