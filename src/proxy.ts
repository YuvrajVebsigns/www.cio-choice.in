import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define paths that do not require authentication
const publicPaths = ['/', '/register', '/forgot-password'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Example: Check for an auth cookie.
  // Replace 'auth_token' with your actual cookie name set by NestJS
  const hasToken = request.cookies.has('auth_token') || request.cookies.has('access_token');

  // Skip middleware for public assets and api routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.match(/\.(.*)$/)) {
    return NextResponse.next();
  }

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path)) || pathname === '/';

  if (!hasToken && !isPublicPath) {
    // Redirect unauthenticated users to the login page
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (hasToken && isPublicPath) {
    // Redirect authenticated users away from public pages (like login) to the dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except API, _next static files, and images
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
