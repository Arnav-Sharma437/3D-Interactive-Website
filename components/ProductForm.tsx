'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct, updateProduct, generateSlug } from '@/lib/adminStore';
import { CATEGORIES } from '@/lib/products';
import type { Product } from '@/lib/products';

interface ProductFormProps {
  initialData?: Partial<Product>;
  productId?: string;
}

export default function ProductForm({ initialData, productId }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!productId;

  const [form, setForm] = useState({
    name: initialData?.name || '',
    price: initialData?.price?.toString() || '',
    originalPrice: initialData?.originalPrice?.toString() || '',
    description: initialData?.description || '',
    shortDescription: initialData?.shortDescription || '',
    category: initialData?.category || CATEGORIES[0],
    images: initialData?.images?.join('\n') || '',
    available: initialData?.available ?? true,
    featured: initialData?.featured ?? false,
    slug: initialData?.slug || '',
    specKeys: Object.keys(initialData?.specifications || {}).join('\n') || '',
    specVals: Object.values(initialData?.specifications || {}).join('\n') || '',
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'name' && !isEdit ? { slug: generateSlug(value) } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const keys = form.specKeys.split('\n').map(s => s.trim()).filter(Boolean);
    const vals = form.specVals.split('\n').map(s => s.trim()).filter(Boolean);
    const specifications: Record<string, string> = {};
    keys.forEach((k, i) => { if (vals[i]) specifications[k] = vals[i]; });

    const productData = {
      name: form.name,
      price: parseInt(form.price),
      originalPrice: form.originalPrice ? parseInt(form.originalPrice) : undefined,
      description: form.description,
      shortDescription: form.shortDescription,
      category: form.category,
      images: form.images.split('\n').map(s => s.trim()).filter(Boolean),
      available: form.available,
      featured: form.featured,
      slug: form.slug || generateSlug(form.name),
      specifications,
    };

    await new Promise(r => setTimeout(r, 400));

    if (isEdit) {
      updateProduct(productId, productData);
    } else {
      addProduct(productData);
    }

    setSaving(false);
    setSuccess(true);
    setTimeout(() => {
      router.push('/admin/products');
    }, 800);
  };

  const inputClass = "admin-input text-sm";
  const labelClass = "block text-[10px] tracking-[0.3em] uppercase text-gray-600 mb-2 font-body";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-7">
      {success && (
        <div className="bg-green-900/20 border border-green-700 text-green-400 px-5 py-3 text-xs tracking-widest uppercase font-body">
          {isEdit ? 'Product updated!' : 'Product added!'} Redirecting...
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-[#111] border border-[#1E1E1E] p-6 space-y-5">
        <h2 className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] font-body border-b border-[#1E1E1E] pb-3 mb-5">Basic Information</h2>

        <div>
          <label className={labelClass}>Product Name *</label>
          <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="e.g. Heavy Duty Combination Lock" />
        </div>

        <div>
          <label className={labelClass}>Slug (URL)</label>
          <input name="slug" value={form.slug} onChange={handleChange} className={inputClass} placeholder="auto-generated from name" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Price (₹) *</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} required className={inputClass} placeholder="1299" />
          </div>
          <div>
            <label className={labelClass}>Original Price (₹)</label>
            <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} className={inputClass} placeholder="Optional (for discount)" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Category *</label>
          <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
            {[...CATEGORIES, 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Descriptions */}
      <div className="bg-[#111] border border-[#1E1E1E] p-6 space-y-5">
        <h2 className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] font-body border-b border-[#1E1E1E] pb-3 mb-5">Descriptions</h2>
        <div>
          <label className={labelClass}>Short Description *</label>
          <input name="shortDescription" value={form.shortDescription} onChange={handleChange} required className={inputClass} placeholder="1-2 line summary for product card" />
        </div>
        <div>
          <label className={labelClass}>Full Description *</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={5} className={inputClass} placeholder="Detailed product description..." />
        </div>
      </div>

      {/* Images */}
      <div className="bg-[#111] border border-[#1E1E1E] p-6">
        <h2 className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] font-body border-b border-[#1E1E1E] pb-3 mb-5">Images</h2>
        <label className={labelClass}>Image URLs (one per line) *</label>
        <textarea name="images" value={form.images} onChange={handleChange} required rows={4} className={inputClass} placeholder="https://images.unsplash.com/photo-xxx&#10;https://images.unsplash.com/photo-yyy" />
        <p className="text-[11px] text-gray-700 mt-2 font-body">Use Unsplash URLs or any public image URL. First image is shown as main.</p>
      </div>

      {/* Specifications */}
      <div className="bg-[#111] border border-[#1E1E1E] p-6">
        <h2 className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] font-body border-b border-[#1E1E1E] pb-3 mb-5">Specifications</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Keys (one per line)</label>
            <textarea name="specKeys" value={form.specKeys} onChange={handleChange} rows={6} className={inputClass} placeholder="Material&#10;Weight&#10;Dimensions" />
          </div>
          <div>
            <label className={labelClass}>Values (one per line)</label>
            <textarea name="specVals" value={form.specVals} onChange={handleChange} rows={6} className={inputClass} placeholder="Stainless Steel&#10;385g&#10;50mm x 30mm" />
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="bg-[#111] border border-[#1E1E1E] p-6 flex gap-10">
        {[
          { name: 'available', label: 'In Stock / Available' },
          { name: 'featured', label: 'Featured Product' },
        ].map(t => (
          <label key={t.name} className="flex items-center gap-3 cursor-pointer">
            <div
              className={`relative w-10 h-5 rounded-full transition-colors ${(form as Record<string, unknown>)[t.name] ? 'bg-[#C9A84C]' : 'bg-[#1E1E1E]'}`}
              onClick={() => setForm(prev => ({ ...prev, [t.name]: !(prev as Record<string, unknown>)[t.name] }))}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${(form as Record<string, unknown>)[t.name] ? 'left-5' : 'left-0.5'}`} />
            </div>
            <span className="text-xs tracking-widest uppercase text-gray-500 font-body">{t.label}</span>
          </label>
        ))}
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving || success}
          className="bg-[#C9A84C] hover:bg-[#E8C96D] disabled:opacity-60 text-black px-8 py-3.5 text-xs tracking-widest uppercase font-medium font-body transition-colors flex items-center gap-2"
        >
          {saving && <div className="w-3 h-3 border border-black border-t-transparent rounded-full animate-spin" />}
          {isEdit ? 'Update Product' : 'Add Product'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="border border-[#1E1E1E] hover:border-gray-600 text-gray-500 hover:text-white px-6 py-3.5 text-xs tracking-widest uppercase font-body transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
