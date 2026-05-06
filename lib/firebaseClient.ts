import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;

function getFirebaseConfig() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

  if (!apiKey || !authDomain || !projectId || !appId) {
    throw new Error(
      'Firebase env vars missing. Set NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_APP_ID.'
    );
  }
  return { apiKey, authDomain, projectId, appId };
}

/**
 * Lazy client-only init.
 * This prevents Vercel builds from failing if a module is imported during build steps.
 */
export async function getFirebaseApp(): Promise<FirebaseApp> {
  if (typeof window === 'undefined') {
    throw new Error('Firebase client cannot be initialized on the server.');
  }
  if (_app) return _app;
  const { initializeApp, getApps } = await import('firebase/app');
  const cfg = getFirebaseConfig();
  _app = getApps().length ? getApps()[0]! : initializeApp(cfg);
  return _app;
}

export async function getFirebaseAuth(): Promise<Auth> {
  if (_auth) return _auth;
  const { getAuth } = await import('firebase/auth');
  const app = await getFirebaseApp();
  _auth = getAuth(app);
  return _auth;
}

export async function getFirestoreDb(): Promise<Firestore> {
  if (_db) return _db;
  const { getFirestore } = await import('firebase/firestore');
  const app = await getFirebaseApp();
  _db = getFirestore(app);
  return _db;
}

