import type { Product } from './products';
import { PRODUCTS } from './products';
import { getFirestoreDb } from '@/lib/firebaseClient';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

const COLLECTION = 'products';

function stripUndefined<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(stripUndefined) as T;
  if (typeof obj !== 'object') return obj;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (v === undefined) continue;
    out[k] = stripUndefined(v);
  }
  return out as T;
}

export function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function getAdminProducts(): Promise<Product[]> {
  try {
    const db = await getFirestoreDb();
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    const items = snap.docs.map(d => d.data() as Product);
    return items.length ? items : PRODUCTS;
  } catch {
    // If Firestore is not configured yet, fall back to seed.
    return PRODUCTS;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const db = await getFirestoreDb();
    const ref = doc(db, COLLECTION, id);
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as Product) : null;
  } catch {
    return null;
  }
}

export async function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
  const db = await getFirestoreDb();
  const id = Date.now().toString();
  const newProduct: Product = { ...product, id, createdAt: new Date().toISOString() };
  await setDoc(doc(db, COLLECTION, id), stripUndefined(newProduct));
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  try {
    const db = await getFirestoreDb();
    await updateDoc(doc(db, COLLECTION, id), stripUndefined(updates) as Record<string, unknown>);
    const updated = await getProductById(id);
    return updated;
  } catch {
    return null;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const db = await getFirestoreDb();
    await deleteDoc(doc(db, COLLECTION, id));
    return true;
  } catch {
    return false;
  }
}
