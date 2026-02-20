import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || "ion-green-secret-key-change-this-in-env";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is an admin path
  if (pathname.startsWith('/admin')) {
    // Exclude the login page itself to avoid infinite redirect
    if (pathname === '/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // Redirect to login if no token
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }

    try {
      // Verify the token
      await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET)
      );
      return NextResponse.next();
    } catch (error) {
      // Invalid token, redirect to login
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};