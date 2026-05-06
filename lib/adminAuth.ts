import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebaseClient';

function allowedEmails(): string[] {
  const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS || '';
  return raw
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdminEmail(email?: string | null): boolean {
  const allow = allowedEmails();
  if (!allow.length) return true; // if not configured, don't block (dev)
  return !!email && allow.includes(email.toLowerCase());
}

export async function adminEmailLogin(email: string, password: string): Promise<void> {
  const auth = await getFirebaseAuth();
  const res = await signInWithEmailAndPassword(auth, email, password);
  const userEmail = res.user.email;
  if (!isAllowedAdminEmail(userEmail)) {
    await signOut(auth);
    throw new Error('This account is not allowed to access admin.');
  }
}

export async function adminLogout(): Promise<void> {
  const auth = await getFirebaseAuth();
  await signOut(auth);
}

