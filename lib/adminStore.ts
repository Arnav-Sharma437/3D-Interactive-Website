import { Product, PRODUCTS } from './products';

const STORAGE_KEY = 'hakimi_products';

export function getAdminProducts(): Product[] {
  if (typeof window === 'undefined') return PRODUCTS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(PRODUCTS));
    return PRODUCTS;
  } catch {
    return PRODUCTS;
  }
}

export function saveAdminProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getAdminProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  saveAdminProducts([...products, newProduct]);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getAdminProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...updates };
  saveAdminProducts(products);
  return products[idx];
}

export function deleteProduct(id: string): boolean {
  const products = getAdminProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length === products.length) return false;
  saveAdminProducts(filtered);
  return true;
}

export function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
