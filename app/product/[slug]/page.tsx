'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAdminProducts } from '@/lib/adminStore';
import { PRODUCTS } from '@/lib/products';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/products';
import { imageUnoptimized, isDataUrl } from '@/lib/imageUtils';

/** Next.js 14: `params` is a plain object (not a Promise). */
export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const products = await getAdminProducts();
      const found = products.find(p => p.slug === slug) || PRODUCTS.find(p => p.slug === slug);
      if (!alive) return;
      if (found) {
        setProduct(found);
        setRelated(products.filter(p => p.category === found.category && p.id !== found.id).slice(0, 4));
      }
      setLoaded(true);
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!product) return;

    let alive = true;
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!alive) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo('.detail-image', { opacity: 0, x: -64, filter: 'blur(8px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.05, delay: 0.12 })
          .fromTo('.detail-eyebrow', { opacity: 0, y: 28, letterSpacing: '0.65em' }, { opacity: 1, y: 0, letterSpacing: '0.5em', duration: 0.7 }, '-=0.58')
          .fromTo('.detail-title', { opacity: 0, y: 56 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.48')
          .fromTo('.detail-price', { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.58, ease: 'back.out(1.5)' }, '-=0.48')
          .fromTo('.detail-desc', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06 }, '-=0.38')
          .fromTo('.detail-spec', { opacity: 0, x: 32 }, { opacity: 1, x: 0, duration: 0.48, stagger: 0.08 }, '-=0.38')
          .fromTo('.detail-cta', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.58 }, '-=0.28');

        gsap.fromTo(
          '.related-card',
          { opacity: 0, y: 64 },
          {
            opacity: 1,
            y: 0,
            duration: 0.82,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.related-section', start: 'top 88%' },
          }
        );
      });
    };
    init();

    return () => {
      alive = false;
      ctx?.revert();
    };
  }, [product]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border border-gold border-t-transparent rounded-full animate-spin" />
          <span className="text-xs tracking-widest uppercase text-stone-500 dark:text-gray-600 font-body">Loading</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 flex-col gap-6">
        <h2 className="text-3xl font-display text-stone-900 dark:text-white">Product Not Found</h2>
        <Link href="/products" className="text-gold text-sm tracking-widest uppercase font-body hover:underline">← Back to Products</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <nav className="flex items-center gap-3 text-xs text-stone-600 dark:text-gray-600 font-body tracking-wider">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gold transition-colors">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-gold transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-stone-400 dark:text-gray-400 truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Main Detail */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Image Gallery */}
          <div className="detail-image opacity-0">
            {/* Main image */}
            <div className="relative aspect-[4/3] bg-stone-200 dark:bg-[#0D0D0D] border border-stone-300 dark:border-[#1E1E1E] overflow-hidden mb-4">
              {isDataUrl(product.images[activeImage]) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
                />
              ) : (
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  unoptimized={imageUnoptimized(product.images[activeImage])}
                />
              )}
              {!product.available && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="border border-red-400 text-red-400 text-sm tracking-widest uppercase px-6 py-2 font-body">Out of Stock</span>
                </div>
              )}
              {discount && (
                <div className="absolute top-4 right-4 bg-[#C9A84C] text-black text-xs tracking-widest uppercase px-3 py-1.5 font-medium font-body">
                  {discount}% Off
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 aspect-square border-2 overflow-hidden transition-all duration-300 ${
                      activeImage === i ? 'border-gold' : 'border-stone-300 dark:border-[#1E1E1E] hover:border-gold/50'
                    }`}
                  >
                    {isDataUrl(img) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img} alt={`${product.name} ${i + 1}`} className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <Image
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                        unoptimized={imageUnoptimized(img)}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <div className="detail-eyebrow opacity-0 text-[10px] tracking-[0.5em] uppercase text-[#C9A84C] mb-3 font-body">
              {product.category}
            </div>

            <h1 className="detail-title opacity-0 text-3xl md:text-4xl font-display font-bold mb-6 leading-tight text-stone-900 dark:text-white">
              {product.name}
            </h1>

            {/* Price */}
            <div className="detail-price opacity-0 flex items-baseline gap-4 mb-6 pb-6 border-b border-stone-200 dark:border-[#1E1E1E]">
              <span className="text-4xl font-display font-bold gold-text">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-stone-500 dark:text-gray-600 text-xl line-through font-body">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discount && (
                <span className="text-sm text-green-400 font-body">You save {discount}%</span>
              )}
            </div>

            {/* Availability */}
            <div className="detail-desc opacity-0 flex items-center gap-2 mb-5">
              <div className={`w-2 h-2 rounded-full ${product.available ? 'bg-green-400' : 'bg-red-500'}`} />
              <span className={`text-xs tracking-widest uppercase font-body ${product.available ? 'text-green-400' : 'text-red-400'}`}>
                {product.available ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Description */}
            <p className="detail-desc opacity-0 text-stone-600 dark:text-gray-400 text-sm leading-relaxed font-body mb-8">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="mb-8">
              <h3 className="detail-spec opacity-0 text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-4 font-body">Specifications</h3>
              <div className="space-y-0">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="detail-spec opacity-0 flex items-center justify-between py-3 border-b border-stone-200 dark:border-[#1A1A1A]">
                    <span className="text-xs tracking-wider uppercase text-stone-500 dark:text-gray-600 font-body">{key}</span>
                    <span className="text-sm text-stone-900 dark:text-white font-body text-right max-w-[60%]">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            {product.available && (
              <div className="detail-cta opacity-0 flex flex-col sm:flex-row gap-3">
                <WhatsAppButton productName={product.name} price={product.price} className="flex-1" />
                <a
                  href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi, I'd like a bulk quote for ${product.name} (₹${product.price.toLocaleString('en-IN')})`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 border border-gold/50 hover:border-gold text-gold px-6 py-4 text-sm tracking-widest uppercase font-body text-center transition-all duration-300 hover:bg-gold/10 dark:hover:bg-gold/5"
                >
                  Bulk Enquiry
                </a>
              </div>
            )}

            {!product.available && (
              <div className="detail-cta opacity-0">
                <a
                  href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi, I'm interested in ${product.name} but it shows out of stock. Please notify me when available.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 border border-gold/40 text-gold px-8 py-4 text-sm tracking-widest uppercase font-body transition-all hover:border-gold"
                >
                  Notify When Available
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="related-section max-w-7xl mx-auto px-6 py-20 border-t border-stone-200 dark:border-[#1E1E1E]">
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-3 font-body">From the same category</div>
          <h2 className="text-3xl font-display font-bold mb-10 text-stone-900 dark:text-white">Related <span className="gold-text">Products</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p, i) => (
              <div key={p.id} className="related-card opacity-0">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
