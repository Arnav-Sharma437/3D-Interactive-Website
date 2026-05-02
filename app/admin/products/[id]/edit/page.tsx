'use client';

import { useEffect, useState, use } from 'react';
import { getAdminProducts } from '@/lib/adminStore';
import ProductForm from '@/components/ProductForm';
import Link from 'next/link';
import type { Product } from '@/lib/products';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const products = getAdminProducts();
    const found = products.find(p => p.id === id);
    setProduct(found || null);
  }, [id]);

  if (!product) {
    return (
      <div className="p-8">
        <div className="text-gray-500 font-body">Product not found</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/products" className="text-xs text-gray-600 hover:text-[#C9A84C] tracking-widest uppercase font-body transition-colors">
          ← Back to Products
        </Link>
        <h1 className="text-3xl font-display font-bold mt-4 mb-1">Edit Product</h1>
        <p className="text-gray-500 text-sm font-body truncate">{product.name}</p>
      </div>
      <ProductForm initialData={product} productId={product.id} />
    </div>
  );
}
