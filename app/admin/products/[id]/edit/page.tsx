'use client';

import { useEffect, useState } from 'react';
import { getProductById } from '@/lib/adminStore';
import { adminUrl } from '@/lib/adminRoutes';
import ProductForm from '@/components/ProductForm';
import Link from 'next/link';
import type { Product } from '@/lib/products';

/** Next.js 14: `params` is a plain object, not a Promise. */
export default function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    (async () => {
      const found = await getProductById(id);
      if (alive) setProduct(found ?? null);
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  if (product === undefined) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border border-gold border-t-transparent" />
          <span className="text-xs uppercase tracking-widest text-stone-500 dark:text-gray-500 font-body">Loading product…</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 md:p-8">
        <p className="text-stone-600 dark:text-gray-500 font-body">Product not found. It may have been removed or the link is invalid.</p>
        <Link href={adminUrl('products')} className="mt-4 inline-block text-xs tracking-widest text-gold hover:underline font-body">
          ← Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <Link
          href={adminUrl('products')}
          className="text-xs text-stone-600 hover:text-gold dark:text-gray-600 tracking-widest uppercase font-body transition-colors"
        >
          ← Back to Products
        </Link>
        <h1 className="mt-4 text-2xl md:text-3xl font-display font-bold text-stone-900 dark:text-white mb-1">Edit Product</h1>
        <p className="text-sm text-stone-600 dark:text-gray-500 font-body truncate">{product.name}</p>
      </div>
      <ProductForm key={product.id} initialData={product} productId={product.id} />
    </div>
  );
}
