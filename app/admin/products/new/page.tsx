import ProductForm from '@/components/ProductForm';
import Link from 'next/link';
import { adminUrl } from '@/lib/adminRoutes';

export default function NewProductPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <Link
          href={adminUrl('products')}
          className="font-body text-xs uppercase tracking-widest text-stone-600 transition hover:text-gold dark:text-gray-600"
        >
          ← Back to Products
        </Link>
        <h1 className="mt-4 font-display text-2xl font-bold text-stone-900 dark:text-white md:text-3xl">Add New Product</h1>
        <p className="mt-1 font-body text-sm text-stone-600 dark:text-gray-500">Fill in the details below to add a new hardware product</p>
      </div>
      <ProductForm />
    </div>
  );
}
