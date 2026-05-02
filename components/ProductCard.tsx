'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { openWhatsApp } from '@/lib/whatsapp';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="product-card group relative overflow-hidden bg-white dark:bg-[#111111] border border-stone-200 dark:border-[#1E1E1E] hover:border-gold/40 transition-all duration-500 shadow-sm dark:shadow-none">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-[#0D0D0D]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover product-card-img"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              openWhatsApp(product.name, product.price);
            }}
            className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400 bg-gold text-black px-5 py-2.5 text-xs tracking-widest uppercase font-medium font-body"
          >
            Enquire Now
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {!product.available && (
            <span className="bg-red-900/80 text-red-200 text-[10px] tracking-widest uppercase px-2 py-1">Out of Stock</span>
          )}
          {discount && (
            <span className="bg-gold text-black text-[10px] tracking-widest uppercase px-2 py-1 font-medium">{discount}% Off</span>
          )}
          {product.featured && (
            <span className="bg-black/80 border border-gold/50 text-gold text-[10px] tracking-widest uppercase px-2 py-1">Featured</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="text-[9px] tracking-[0.35em] text-stone-500 dark:text-gray-600 uppercase mb-2 font-body">{product.category}</div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-stone-900 dark:text-white hover:text-gold transition-colors leading-snug font-body mb-3 line-clamp-2 group-hover:text-gold">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-gold font-display text-lg font-semibold">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-stone-400 dark:text-gray-600 text-xs line-through font-body">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <Link
            href={`/product/${product.slug}`}
            className="text-[10px] tracking-widest uppercase text-stone-500 dark:text-gray-600 hover:text-gold transition-colors font-body"
          >
            Details →
          </Link>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-[#C9A84C] to-transparent transition-all duration-500" />
    </div>
  );
}
