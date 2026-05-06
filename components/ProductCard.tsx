'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/lib/products';
import { imageUnoptimized, isDataUrl } from '@/lib/imageUtils';
import { openWhatsApp } from '@/lib/whatsapp';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const src = product.images[0] || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.36), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="product-card group relative overflow-hidden bg-white dark:bg-[#111111] border border-stone-200 dark:border-[#1E1E1E] hover:border-gold/40 shadow-sm dark:shadow-none"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-[#0D0D0D]">
        {isDataUrl(src) ? (
          // Next/Image can be flaky with big data: URLs — use plain img.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover product-card-img transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <Image
            src={src || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'}
            alt={product.name}
            fill
            className="object-cover product-card-img transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={imageUnoptimized(src)}
          />
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/45">
          <button
            onClick={e => {
              e.preventDefault();
              openWhatsApp(product.name, product.price);
            }}
            className="translate-y-4 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 bg-gold px-5 py-2.5 text-xs font-medium font-body uppercase tracking-widest text-black"
          >
            Enquire Now
          </button>
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {!product.available && (
            <span className="bg-red-900/80 px-2 py-1 text-[10px] uppercase tracking-widest text-red-200">Out of Stock</span>
          )}
          {discount && (
            <span className="bg-gold px-2 py-1 text-[10px] font-medium uppercase tracking-widest text-black">{discount}% Off</span>
          )}
          {product.featured && (
            <span className="border border-gold/50 bg-black/80 px-2 py-1 text-[10px] uppercase tracking-widest text-gold">Featured</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2 font-body text-[9px] uppercase tracking-[0.35em] text-stone-500 dark:text-gray-600">{product.category}</div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mb-3 line-clamp-2 font-body text-sm font-medium leading-snug text-stone-900 transition-colors group-hover:text-gold dark:text-white dark:group-hover:text-gold">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-semibold text-gold">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="font-body text-xs text-stone-400 line-through dark:text-gray-600">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <Link
            href={`/product/${product.slug}`}
            className="font-body text-[10px] uppercase tracking-widest text-stone-500 transition-colors hover:text-gold dark:text-gray-600"
          >
            Details →
          </Link>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}
