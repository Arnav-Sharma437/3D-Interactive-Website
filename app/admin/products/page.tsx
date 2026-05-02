'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAdminProducts, deleteProduct, updateProduct } from '@/lib/adminStore';
import { imageUnoptimized } from '@/lib/imageUtils';
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
    const product = products.find(p => p.id === id);
    if (!product) return;
    updateProduct(id, { available: !product.available });
    setProducts(getAdminProducts());
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-900 dark:text-white md:text-3xl">All Products</h1>
          <p className="mt-1 font-body text-sm text-stone-600 dark:text-gray-500">{products.length} products total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex justify-center bg-gold px-6 py-3 font-body text-xs font-medium uppercase tracking-widest text-black transition-colors hover:bg-gold-light"
        >
          + Add Product
        </Link>
      </div>

      <div className="space-y-3">
        {products.map(p => (
          <div
            key={p.id}
            className={`flex flex-col gap-4 border border-stone-200 bg-white p-4 transition-all dark:border-[#1E1E1E] dark:bg-[#111] dark:hover:border-gold/20 sm:flex-row sm:items-center sm:gap-5 ${
              deleting === p.id ? 'scale-95 opacity-0' : 'opacity-100'
            }`}
          >
            <div className="flex flex-1 items-start gap-4 min-w-0">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-stone-100 dark:bg-[#0D0D0D]">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized={imageUnoptimized(p.images[0] || '')}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-body text-sm font-medium text-stone-900 dark:text-white">{p.name}</div>
                <div className="mt-0.5 text-xs text-stone-500 dark:text-gray-600">{p.category}</div>
                <div className="mt-1 font-display text-sm text-gold">₹{p.price.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-stone-100 pt-3 dark:border-[#1A1A1A] sm:border-0 sm:pt-0">
              <button
                type="button"
                onClick={() => handleToggleAvailable(p.id)}
                className={`text-[10px] font-body uppercase tracking-widest transition-colors ${
                  p.available
                    ? 'border border-green-700 px-3 py-1.5 text-green-700 hover:border-red-600 hover:text-red-600 dark:text-green-400'
                    : 'border border-red-700 px-3 py-1.5 text-red-600 hover:border-green-600 hover:text-green-600 dark:text-red-400'
                }`}
                title="Toggle availability"
              >
                {p.available ? 'In Stock' : 'Out of Stock'}
              </button>
              <Link href={`/product/${p.slug}`} target="_blank" className="text-xs font-body text-stone-600 transition hover:text-gold dark:text-gray-500">
                View
              </Link>
              <Link href={`/admin/products/${p.id}/edit`} className="text-xs font-body text-gold transition hover:underline">
                Edit
              </Link>
              <button type="button" onClick={() => handleDelete(p.id, p.name)} className="text-xs font-body text-red-700 transition hover:text-red-500 dark:text-red-800 dark:hover:text-red-400">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="py-20 text-center">
          <p className="mb-4 font-body text-stone-600 dark:text-gray-600">No products yet</p>
          <Link href="/admin/products/new" className="text-sm text-gold hover:underline">
            Add your first product →
          </Link>
        </div>
      )}
    </div>
  );
}
