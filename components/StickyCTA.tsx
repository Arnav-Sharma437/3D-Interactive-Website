'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const WA = 'https://wa.me/919999999999?text=' + encodeURIComponent("Hi, I'd like to know more about Hakimi hardware.");

export default function StickyCTA() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 280, damping: 28 }}
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="pointer-events-auto mx-auto flex max-w-lg gap-2 rounded-2xl border border-stone-200/90 bg-stone-100/95 p-2 shadow-2xl shadow-stone-900/10 backdrop-blur-md dark:border-[#1E1E1E] dark:bg-[#0A0A0A]/95 dark:shadow-black/40">
        <Link
          href="/products"
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-xs font-medium uppercase tracking-widest text-stone-900 transition hover:bg-gold/20 dark:text-white"
        >
          Products
        </Link>
        <a
          href={WA}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-xl bg-[#25D366] text-xs font-medium uppercase tracking-widest text-white transition hover:bg-[#1ebe5d]"
        >
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
