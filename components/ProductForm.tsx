'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct, updateProduct, generateSlug } from '@/lib/adminStore';
import { CATEGORIES } from '@/lib/products';
import type { Product } from '@/lib/products';
import { fileToCompressedDataUrl } from '@/lib/resizeImage';

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

  const [uploadedDataUrls, setUploadedDataUrls] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!initialData?.id || !productId) return;
    setForm({
      name: initialData.name || '',
      price: initialData.price?.toString() || '',
      originalPrice: initialData.originalPrice?.toString() || '',
      description: initialData.description || '',
      shortDescription: initialData.shortDescription || '',
      category: initialData.category || CATEGORIES[0],
      images: initialData.images?.join('\n') || '',
      available: initialData.available ?? true,
      featured: initialData.featured ?? false,
      slug: initialData.slug || '',
      specKeys: Object.keys(initialData.specifications || {}).join('\n') || '',
      specVals: Object.values(initialData.specifications || {}).join('\n') || '',
    });
    setUploadedDataUrls([]);
  }, [initialData?.id, productId]);

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

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploadError('');
    setUploading(true);
    try {
      const next: string[] = [];
      for (const file of Array.from(files)) {
        const dataUrl = await fileToCompressedDataUrl(file);
        next.push(dataUrl);
      }
      setUploadedDataUrls(prev => [...prev, ...next]);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeUploadedAt = (index: number) => {
    setUploadedDataUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError('');

    const keys = form.specKeys.split('\n').map(s => s.trim()).filter(Boolean);
    const vals = form.specVals.split('\n').map(s => s.trim()).filter(Boolean);
    const specifications: Record<string, string> = {};
    keys.forEach((k, i) => {
      if (vals[i]) specifications[k] = vals[i];
    });

    const urlImages = form.images.split('\n').map(s => s.trim()).filter(Boolean);
    const images = [...urlImages, ...uploadedDataUrls];

    if (images.length === 0) {
      setUploadError('Add at least one image URL or upload a file.');
      return;
    }

    const priceNum = parseInt(form.price, 10);
    const originalNum = form.originalPrice ? parseInt(form.originalPrice, 10) : undefined;
    if (Number.isNaN(priceNum) || priceNum < 0) {
      setUploadError('Enter a valid price.');
      return;
    }

    setSaving(true);

    const productData = {
      name: form.name,
      price: priceNum,
      originalPrice: originalNum,
      description: form.description,
      shortDescription: form.shortDescription,
      category: form.category,
      images,
      available: form.available,
      featured: form.featured,
      slug: (form.slug || generateSlug(form.name)).trim(),
      specifications,
    };

    await new Promise(r => setTimeout(r, 300));

    if (isEdit && productId) {
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

  const inputClass =
    'admin-input text-sm bg-white dark:bg-[#111] border-stone-300 dark:border-[#1E1E1E] text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-gray-600';
  const labelClass =
    'block text-[10px] tracking-[0.3em] uppercase text-stone-600 dark:text-gray-600 mb-2 font-body';
  const cardClass =
    'bg-stone-50 dark:bg-[#111] border border-stone-200 dark:border-[#1E1E1E] p-6 space-y-5';
  const headingClass =
    'text-xs tracking-[0.4em] uppercase text-gold font-body border-b border-stone-200 dark:border-[#1E1E1E] pb-3 mb-5';

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-7 pb-16">
      {success && (
        <div className="bg-green-100 dark:bg-green-900/20 border border-green-700 text-green-800 dark:text-green-400 px-5 py-3 text-xs tracking-widest uppercase font-body">
          {isEdit ? 'Product updated!' : 'Product added!'} Redirecting...
        </div>
      )}
      {uploadError && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-600 text-red-800 dark:text-red-400 px-5 py-3 text-xs font-body">
          {uploadError}
        </div>
      )}

      {/* Basic Info */}
      <div className={`${cardClass}`}>
        <h2 className={headingClass}>Basic Information</h2>

        <div>
          <label className={labelClass}>Product Name *</label>
          <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="e.g. Heavy Duty Combination Lock" />
        </div>

        <div>
          <label className={labelClass}>Slug (URL)</label>
          <input name="slug" value={form.slug} onChange={handleChange} className={inputClass} placeholder="auto-generated from name" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            {[...CATEGORIES, 'Other'].map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Descriptions */}
      <div className={cardClass}>
        <h2 className={headingClass}>Descriptions</h2>
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
      <div className={`${cardClass.replace('space-y-5', 'space-y-4')}`}>
        <h2 className={headingClass}>Images</h2>

        <div>
          <label className={labelClass}>Upload from device</label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-stone-300 dark:border-[#2A2A2A] bg-white dark:bg-[#0D0D0D] px-4 py-8 transition hover:border-gold/50">
            <input type="file" accept="image/*" multiple className="sr-only" onChange={handleFiles} disabled={uploading || saving || success} />
            <span className="text-2xl mb-2">📷</span>
            <span className="text-xs text-stone-600 dark:text-gray-400 font-body text-center">
              {uploading ? 'Processing…' : 'Tap to choose images — auto-compressed for storage'}
            </span>
          </label>
        </div>

        {uploadedDataUrls.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {uploadedDataUrls.map((src, i) => (
              <div key={`up-${i}`} className="relative h-20 w-20 overflow-hidden rounded border border-stone-200 dark:border-[#1E1E1E]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeUploadedAt(i)}
                  className="absolute right-0 top-0 bg-red-600 text-white text-[10px] px-1.5 py-0.5 font-body"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div>
          <label className={labelClass}>Or paste image URLs (one per line)</label>
          <textarea
            name="images"
            value={form.images}
            onChange={handleChange}
            rows={4}
            className={inputClass}
            placeholder={'https://images.unsplash.com/photo-xxx…\n(combined with uploads above)'}
          />
          <p className="text-[11px] text-stone-500 dark:text-gray-600 mt-2 font-body">
            Uploads are saved with the product. URLs can be mixed with uploads — order: URLs first, then uploaded images appended.
          </p>
        </div>
      </div>

      {/* Specifications */}
      <div className={cardClass}>
        <h2 className={headingClass}>Specifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Keys (one per line)</label>
            <textarea name="specKeys" value={form.specKeys} onChange={handleChange} rows={6} className={inputClass} placeholder={'Material\nWeight\nDimensions'} />
          </div>
          <div>
            <label className={labelClass}>Values (one per line)</label>
            <textarea name="specVals" value={form.specVals} onChange={handleChange} rows={6} className={inputClass} placeholder={'Stainless Steel\n385g\n50mm x 30mm'} />
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className={`${cardClass} flex flex-wrap gap-8`}>
        {[
          { name: 'available', label: 'In Stock / Available' },
          { name: 'featured', label: 'Featured Product' },
        ].map(t => (
          <label key={t.name} className="flex items-center gap-3 cursor-pointer">
            <button
              type="button"
              className={`relative h-5 w-10 rounded-full transition-colors ${(form as Record<string, unknown>)[t.name] ? 'bg-gold' : 'bg-stone-300 dark:bg-[#1E1E1E]'}`}
              onClick={() => setForm(prev => ({ ...prev, [t.name]: !(prev as Record<string, unknown>)[t.name] }))}
              aria-pressed={!!(form as Record<string, unknown>)[t.name]}
            >
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${(form as Record<string, unknown>)[t.name] ? 'left-5' : 'left-0.5'}`} />
            </button>
            <span className="text-xs tracking-widest uppercase text-stone-600 dark:text-gray-500 font-body">{t.label}</span>
          </label>
        ))}
      </div>

      {/* Submit */}
      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          disabled={saving || success}
          className="bg-gold hover:bg-gold-light disabled:opacity-60 text-black px-8 py-3.5 text-xs tracking-widest uppercase font-medium font-body transition-colors flex items-center gap-2"
        >
          {saving && <span className="h-3 w-3 border border-black border-t-transparent rounded-full animate-spin" />}
          {isEdit ? 'Update Product' : 'Add Product'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="border border-stone-300 dark:border-[#1E1E1E] hover:border-gold/50 text-stone-600 dark:text-gray-500 hover:text-stone-900 dark:hover:text-white px-6 py-3.5 text-xs tracking-widest uppercase font-body transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
