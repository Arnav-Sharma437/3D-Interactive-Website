import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';

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

export async function adminGoogleLogin(): Promise<void> {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const email = result.user.email;
  if (!isAllowedAdminEmail(email)) {
    await signOut(auth);
    throw new Error('This account is not allowed to access admin.');
  }
}

export async function adminLogout(): Promise<void> {
  await signOut(auth);
}

