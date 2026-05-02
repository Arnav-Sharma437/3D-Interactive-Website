'use client';

import { useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '@/lib/products';
import { getAdminProducts } from '@/lib/adminStore';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import type { Product } from '@/lib/products';

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    setProducts(getAdminProducts());
  }, []);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      gsap.fromTo('.page-header-line',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      );
    };
    init();
  }, []);

  // Card enter animation is handled by framer-motion in ProductCard

  const filtered = products.filter((p: Product) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchAvail = !showAvailableOnly || p.available;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchAvail && matchSearch;
  });

  return (
    <div className="min-h-screen pt-24">
      <div className="relative border-b border-[#1E1E1E] py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 30% 50%, #C9A84C 1px, transparent 1px)', backgroundSize: '30px 30px'}} />
        <div className="max-w-7xl mx-auto">
          <div className="page-header-line opacity-0 text-[10px] tracking-[0.5em] uppercase text-[#C9A84C] mb-3 font-body">Our Collection</div>
          <h1 className="page-header-line opacity-0 text-5xl md:text-6xl font-display font-bold mb-4">
            All <span className="gold-text">Products</span>
          </h1>
          <p className="page-header-line opacity-0 text-gray-500 font-body max-w-lg">
            Premium architectural hardware for doors, cabinets, and glass. Engineered with precision.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-5 mb-10">
          <div className="relative max-w-sm">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="admin-input pl-10 text-sm"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs tracking-widest uppercase font-body transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-[#C9A84C] text-black border-[#C9A84C]'
                    : 'border-[#1E1E1E] text-gray-500 hover:border-[#C9A84C]/50 hover:text-[#C9A84C]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <div
              className={`relative w-10 h-5 rounded-full transition-colors ${showAvailableOnly ? 'bg-[#C9A84C]' : 'bg-[#1E1E1E]'}`}
              onClick={() => setShowAvailableOnly(!showAvailableOnly)}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${showAvailableOnly ? 'left-5' : 'left-0.5'}`} />
            </div>
            <span className="text-xs tracking-widest uppercase text-gray-500 font-body">Available Only</span>
          </label>

          <div className="text-xs text-gray-600 font-body">
            Showing <span className="text-[#C9A84C]">{filtered.length}</span> products
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product: Product, i: number) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔩</div>
            <h3 className="text-xl font-display text-gray-400 mb-2">No products found</h3>
            <p className="text-gray-600 font-body text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
