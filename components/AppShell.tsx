'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/WhatsAppButton';
import StickyCTA from '@/components/StickyCTA';
import { getAdminBase } from '@/lib/adminRoutes';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const adminBase = `/${getAdminBase()}`;

  // Hide site chrome on admin routes (secret path is public URL; /admin is internal rewrite)
  const isAdmin =
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === adminBase ||
    pathname.startsWith(`${adminBase}/`);

  if (isAdmin) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <StickyCTA />
    </>
  );
}

