/** Browser session only — cleared when tab closes. */
export const ADMIN_SESSION_KEY = 'hakimi_admin_ok';

export function getAdminSession(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function setAdminSession(ok: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (ok) sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
    else sessionStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {
    /* private mode */
  }
}
