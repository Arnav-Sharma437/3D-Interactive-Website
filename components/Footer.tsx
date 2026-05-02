import Link from 'next/link';
import SectionLink from '@/components/SectionLink';

export default function Footer() {
  return (
    <footer className="bg-stone-100 dark:bg-[#080808] border-t border-stone-200 dark:border-[#1E1E1E] relative overflow-hidden transition-colors">
      {/* Decorative line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="mb-5">
            <span className="text-3xl font-display font-bold gold-text tracking-widest">HAKIMI</span>
            <div className="text-[10px] tracking-[0.4em] text-stone-500 dark:text-gray-500 uppercase mt-1">Premium Hardware</div>
          </div>
          <p className="text-stone-600 dark:text-gray-500 text-sm leading-relaxed max-w-xs font-body">
            Crafting excellence in architectural hardware since decades. Every fitting, every finish — engineered to endure.
          </p>
          <div className="mt-6 flex gap-4">
            {['WhatsApp', 'Instagram', 'Facebook'].map(s => (
              <a key={s} href="#" className="text-xs text-stone-500 dark:text-gray-600 hover:text-gold transition-colors tracking-widest uppercase">{s}</a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-5 font-body">Navigation</h4>
          <ul className="space-y-3">
            {(
              [
                ['Home', '/'],
                ['Products', '/products'],
                ['About Us', '/#about'],
                ['Contact', '/#contact'],
                ['Admin', '/admin'],
              ] as const
            ).map(([l, h]) => (
              <li key={l}>
                {h.startsWith('/#') ? (
                  <SectionLink
                    href={h}
                    className="font-body text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-gray-500 dark:hover:text-white"
                  >
                    {l}
                  </SectionLink>
                ) : (
                  <Link
                    href={h}
                    className="font-body text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-gray-500 dark:hover:text-white"
                  >
                    {l}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-5 font-body">Contact</h4>
          <ul className="space-y-3 text-sm text-stone-600 dark:text-gray-500 font-body">
            <li>+91 99999 99999</li>
            <li>info@hakimihardware.com</li>
            <li className="leading-relaxed">123, Hardware Market,<br />New Delhi, India 110001</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1E1E1E] px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-stone-500 dark:text-gray-700 tracking-widest">© 2024 HAKIMI HARDWARE. ALL RIGHTS RESERVED.</p>
        <p className="text-xs text-stone-500 dark:text-gray-700 tracking-widest">DESIGNED WITH PRECISION</p>
      </div>
    </footer>
  );
}
