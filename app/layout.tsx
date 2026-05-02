import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: {
    default: 'Hakimi Hardware – Premium Architectural Hardware',
    template: '%s | Hakimi Hardware',
  },
  description: 'Browse premium architectural hardware — locks, hinges, handles, glass fittings and more. Enquire instantly on WhatsApp.',
  keywords: ['hardware', 'door handles', 'locks', 'hinges', 'glass fittings', 'architectural hardware', 'premium'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://hakimihardware.com',
    siteName: 'Hakimi Hardware',
    title: 'Hakimi Hardware – Premium Architectural Hardware',
    description: 'Premium architectural hardware for modern spaces.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0A0A0A] text-white font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
