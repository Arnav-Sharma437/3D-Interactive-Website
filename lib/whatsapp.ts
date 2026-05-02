export const WHATSAPP_NUMBER = '919999999999';

export function buildWhatsAppURL(productName: string, price: number, url?: string): string {
  const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const message = `Hi, I'm interested in *${productName}* — Price: ₹${price.toLocaleString('en-IN')} — Link: ${pageUrl}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(productName: string, price: number, url?: string): void {
  window.open(buildWhatsAppURL(productName, price, url), '_blank');
}
