'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

/** Hash links to home sections work from any page (App Router + client nav). */
export default function SectionLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (!href.startsWith('/#')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      scroll={false}
      className={className}
      onClick={e => {
        e.preventDefault();
        const raw = href.slice(1);
        const id = raw.replace(/^#/, '');
        if (pathname === '/') {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.replaceState(null, '', href);
        } else {
          router.push(href);
        }
      }}
    >
      {children}
    </Link>
  );
}
