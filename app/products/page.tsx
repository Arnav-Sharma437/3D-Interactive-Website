import { Suspense } from 'react';
import ProductsContent from './ProductsContent';

export const metadata = {
  title: 'All Products',
  description: 'Browse our full collection of premium architectural hardware.',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
