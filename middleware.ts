import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from '@/utils/jwt';

// Paths that don't require authentication
const publicPaths = ['/', '/login', '/signup'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow access to public paths without authentication
  if (publicPaths.some(publicPath => path === publicPath || path.startsWith('/api/auth/')) || path.startsWith('/api/items')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  // For API routes that require authentication
  if (path.startsWith('/api') && !path.startsWith('/api/auth/') && !path.startsWith('/api/items')) {
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    try {
      const payload = verifyJwt(token);
      if (!payload) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  }

  // For protected pages
  if (!publicPaths.some(publicPath => path === publicPath) && !path.startsWith('/api/')) {
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    
    try {
      const payload = verifyJwt(token);
      if (!payload) {
        const url = new URL('/login', request.url);
        return NextResponse.redirect(url);
      }
    } catch (error) {
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configure which paths should trigger the middleware
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};
