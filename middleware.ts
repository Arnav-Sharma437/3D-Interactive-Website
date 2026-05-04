import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Hides admin behind a non-obvious URL. Set the same value in:
 *   ADMIN_SECRET_PATH=your-secret-segment
 *   NEXT_PUBLIC_ADMIN_PATH=your-secret-segment
 * If both unset, defaults to `admin` (local dev).
 */
function getSecret(): string {
  const s = process.env.ADMIN_SECRET_PATH || process.env.NEXT_PUBLIC_ADMIN_PATH || 'admin';
  return s.replace(/^\/+|\/+$/g, '') || 'admin';
}

export function middleware(request: NextRequest) {
  const secret = getSecret();
  const { pathname } = request.nextUrl;

  if (secret === 'admin') {
    return NextResponse.next();
  }

  // Block direct /admin when using a custom secret
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Rewrite /secret and /secret/* → /admin internally
  if (pathname === `/${secret}` || pathname.startsWith(`/${secret}/`)) {
    const escaped = secret.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const internal = pathname.replace(new RegExp(`^/${escaped}`), '/admin') || '/admin';
    return NextResponse.rewrite(new URL(internal, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
