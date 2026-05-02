'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, CATEGORIES } from '@/lib/products';

const HERO_STATS = [
  { value: '500+', label: 'Products' },
  { value: '15+', label: 'Years Experience' },
  { value: '10K+', label: 'Happy Clients' },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const featured = getFeaturedProducts();

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Hero Timeline
        const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        heroTl
          .fromTo('.hero-eyebrow', { opacity: 0, y: 28, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.85, delay: 0.25 })
          .fromTo('.hero-title-line', { opacity: 0, y: 110, skewY: 5, rotateX: 8 }, { opacity: 1, y: 0, skewY: 0, rotateX: 0, duration: 1.35, stagger: 0.2 }, '-=0.45')
          .fromTo('.hero-subtitle', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.95 }, '-=0.75')
          .fromTo('.hero-cta', { opacity: 0, y: 28, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.14 }, '-=0.55')
          .fromTo('.hero-divider', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, '-=1.25')
          .fromTo('.hero-stat', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12 }, '-=0.45');

        gsap.to('.hero-float', {
          y: 18,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // Hero image parallax
        if (heroRef.current) {
          gsap.to('.hero-bg-img', {
            y: '-15%',
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            }
          });
        }

        // Featured section reveal
        gsap.fromTo('.featured-card',
          { opacity: 0, y: 88, rotateX: 4 },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 0.95, stagger: 0.16, ease: 'power3.out',
            scrollTrigger: { trigger: featuredRef.current, start: 'top 80%' }
          }
        );

        gsap.fromTo('.section-heading',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: featuredRef.current, start: 'top 85%' }
          }
        );

        // Stats counter animation
        if (statsRef.current) {
          gsap.fromTo('.stat-item',
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.7)',
              scrollTrigger: { trigger: statsRef.current, start: 'top 80%' }
            }
          );
        }

        // Categories
        if (categoriesRef.current) {
          gsap.fromTo('.cat-item',
            { opacity: 0, x: -30 },
            {
              opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
              scrollTrigger: { trigger: categoriesRef.current, start: 'top 85%' }
            }
          );
        }

        // Horizontal scroll marquee for categories
        gsap.to('.marquee-inner', {
          xPercent: -50,
          repeat: -1,
          duration: 25,
          ease: 'none',
        });

      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="hero-bg-img absolute inset-0 scale-110">
            <Image
              src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1920&q=80"
              alt="Premium Hardware"
              fill
              className="object-cover opacity-20 dark:opacity-25"
              priority
            />
          </div>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-100 via-stone-100/90 dark:from-[#0A0A0A] dark:via-[#0A0A0A]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-100 dark:from-[#0A0A0A] via-transparent to-transparent" />
        </div>

        {/* Gold geometric decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" />
        <div className="absolute right-[20%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent hidden lg:block" />
        <div className="hero-float pointer-events-none absolute right-[10%] top-[18%] h-28 w-28 rounded-full border border-gold/25 opacity-50 hidden lg:block" style={{ transformStyle: 'preserve-3d' }} />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="max-w-3xl">
            <div className="hero-eyebrow flex items-center gap-4 mb-8 opacity-0">
              <div className="h-px w-12 bg-gold" />
              <span className="text-xs tracking-[0.5em] uppercase text-gold font-body">Premium Hardware Collection</span>
            </div>

            <h1 className="font-display font-bold leading-[0.9] mb-8 overflow-hidden [perspective:1000px]">
              <div className="hero-title-line opacity-0 block text-5xl md:text-7xl xl:text-8xl text-stone-900 dark:text-white">Crafted</div>
              <div className="hero-title-line opacity-0 block text-5xl md:text-7xl xl:text-8xl gold-text">For</div>
              <div className="hero-title-line opacity-0 block text-5xl md:text-7xl xl:text-8xl text-stone-900 dark:text-white">Perfection.</div>
            </h1>

            <p className="hero-subtitle opacity-0 text-stone-600 dark:text-gray-400 text-lg max-w-xl leading-relaxed font-body mb-10">
              Architectural hardware engineered to endure. Explore our collection of locks, handles, hinges, and glass fittings — built for modern spaces that demand precision.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="hero-cta opacity-0 magnetic-btn group relative overflow-hidden bg-gold hover:bg-gold-light text-black px-8 py-4 text-sm tracking-widest uppercase font-medium font-body transition-colors duration-300">
                Browse Products
              </Link>
              <a
                href={`https://wa.me/919999999999?text=${encodeURIComponent("Hi, I'd like to know more about your hardware products.")}`}
                target="_blank"
                rel="noreferrer"
                className="hero-cta opacity-0 magnetic-btn group border border-stone-300/80 dark:border-white/20 hover:border-gold text-stone-800 dark:text-white hover:text-gold px-8 py-4 text-sm tracking-widest uppercase font-medium font-body transition-all duration-300"
              >
                WhatsApp Us
              </a>
            </div>

            {/* Divider */}
            <div className="hero-divider mt-16 h-px bg-gradient-to-r from-gold/50 via-gold/20 to-transparent" />

            {/* Stats */}
            <div className="mt-10 flex gap-12">
              {HERO_STATS.map(stat => (
                <div key={stat.value} className="hero-stat opacity-0">
                  <div className="text-2xl font-display font-bold gold-text">{stat.value}</div>
                  <div className="text-[11px] tracking-widest uppercase text-stone-500 dark:text-gray-500 mt-1 font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.4em] uppercase text-stone-500 dark:text-gray-600">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── MARQUEE TICKER ── */}
      <div className="border-y border-stone-200 dark:border-[#1E1E1E] bg-stone-50 dark:bg-[#080808] py-4 overflow-hidden transition-colors">
        <div className="marquee-inner flex whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 shrink-0">
              {['Architectural Hardware', '✦', 'Premium Locks', '✦', 'Door Handles', '✦', 'Glass Fittings', '✦', 'Hinges', '✦', 'Floor Springs', '✦', 'Drawer Slides', '✦'].map((t, j) => (
                <span key={j} className={`text-xs tracking-[0.4em] uppercase font-body ${t === '✦' ? 'text-gold' : 'text-stone-500 dark:text-gray-600'}`}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURED PRODUCTS ── */}
      <section ref={featuredRef} className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="section-heading opacity-0 text-[10px] tracking-[0.5em] uppercase text-gold mb-3 font-body">Curated Selection</div>
            <h2 className="section-heading opacity-0 text-4xl md:text-5xl font-display font-bold leading-tight text-stone-900 dark:text-white">
              Featured<br /><span className="gold-text">Products</span>
            </h2>
          </div>
          <Link href="/products" className="section-heading opacity-0 text-xs tracking-widest uppercase text-stone-500 dark:text-gray-500 hover:text-gold transition-colors border-b border-stone-300 dark:border-gray-700 hover:border-gold pb-1 font-body">
            View All Products →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featured.slice(0, 4).map((product, i) => (
            <div key={product.id} className="featured-card opacity-0">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section ref={statsRef} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-100 via-stone-50 dark:from-[#080808] dark:via-[#0D0D0D] dark:to-[#080808]" />
        <div className="absolute inset-0 opacity-[0.07] dark:opacity-5" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #C9A84C 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-200 dark:bg-[#1E1E1E]">
            {[
              { n: '500+', l: 'Products in Catalog' },
              { n: '15+', l: 'Years of Excellence' },
              { n: '10,000+', l: 'Projects Completed' },
              { n: '24hr', l: 'WhatsApp Response' },
            ].map(s => (
              <div key={s.n} className="stat-item opacity-0 bg-white dark:bg-[#0A0A0A] p-10 text-center group hover:bg-stone-50 dark:hover:bg-[#111] transition-colors">
                <div className="text-3xl md:text-4xl font-display font-bold gold-text mb-2 group-hover:gold-shimmer">{s.n}</div>
                <div className="text-[11px] tracking-widest uppercase text-stone-500 dark:text-gray-500 font-body">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section ref={categoriesRef} className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-14">
          <div className="cat-item opacity-0 text-[10px] tracking-[0.5em] uppercase text-gold mb-3 font-body">Shop By Category</div>
          <h2 className="cat-item opacity-0 text-4xl md:text-5xl font-display font-bold text-stone-900 dark:text-white">Browse <span className="gold-text">Categories</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className="cat-item opacity-0 group p-5 border border-stone-200 dark:border-[#1E1E1E] hover:border-gold/40 text-center transition-all duration-300 hover:bg-stone-50 dark:hover:bg-[#111]"
            >
              <div className="text-2xl mb-3">
                {cat === 'Locks & Security' ? '🔒' : cat === 'Door Hardware' ? '🚪' : cat === 'Hinges' ? '⚙️' : cat === 'Drawer Systems' ? '🗄️' : cat === 'Glass Fittings' ? '🔮' : cat === 'Bolts & Latches' ? '🔩' : '🔧'}
              </div>
              <div className="text-xs text-stone-600 dark:text-gray-400 group-hover:text-gold transition-colors tracking-wider font-body leading-snug">{cat}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="relative py-24 overflow-hidden mx-6 mb-24">
        <div className="absolute inset-0 border border-gold/20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="relative text-center px-6">
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-4 font-body">Get In Touch</div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-stone-900 dark:text-white">
            Need a Custom <span className="gold-text">Quote?</span>
          </h2>
          <p className="text-stone-600 dark:text-gray-400 mb-10 max-w-xl mx-auto font-body">
            Chat with us on WhatsApp for bulk orders, custom specifications, or product enquiries. We respond within 24 hours.
          </p>
          <a
            href={`https://wa.me/919999999999?text=${encodeURIComponent("Hi, I need a custom quote for hardware products.")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-10 py-4 text-sm tracking-widest uppercase font-medium font-body transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Start WhatsApp Chat
          </a>
        </div>
      </section>
    </>
  );
}
