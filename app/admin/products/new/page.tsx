import ProductForm from '@/components/ProductForm';
import Link from 'next/link';

export default function NewProductPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/products" className="text-xs text-gray-600 hover:text-[#C9A84C] tracking-widest uppercase font-body transition-colors">
          ← Back to Products
        </Link>
        <h1 className="text-3xl font-display font-bold mt-4 mb-1">Add New Product</h1>
        <p className="text-gray-500 text-sm font-body">Fill in the details below to add a new hardware product</p>
      </div>
      <ProductForm />
    </div>
  );
}
