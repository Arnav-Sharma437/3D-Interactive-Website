/**
 * Public admin base path — must match `ADMIN_SECRET_PATH` in `.env` / Vercel.
 * @example NEXT_PUBLIC_ADMIN_PATH=hq-panel-x7k9m2
 */
export function getAdminBase(): string {
  return (process.env.NEXT_PUBLIC_ADMIN_PATH || 'admin').replace(/^\/+|\/+$/g, '') || 'admin';
}

/** Build path under admin, e.g. adminUrl('products/new') */
export function adminUrl(subpath = ''): string {
  const base = getAdminBase();
  const clean = subpath.replace(/^\/+/, '');
  if (!clean) return `/${base}`;
  return `/${base}/${clean}`;
}
