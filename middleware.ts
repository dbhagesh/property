import { NextRequest, NextResponse } from "next/server";

// Add security headers to response
function addSecurityHeaders(response: NextResponse) {
  // Prevent clickjacking attacks
  response.headers.set('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Enable XSS protection (legacy browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://www.google-analytics.com https://formspree.io; " +
    "frame-ancestors 'none';"
  );

  // Permissions Policy (formerly Feature Policy)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}

export function middleware(req: NextRequest) {
  return addSecurityHeaders(NextResponse.next());
}

// Apply to all routes
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};