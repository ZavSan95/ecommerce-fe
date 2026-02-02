import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  roles: string[];
}

export function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get('access_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);

      if (!decoded.roles?.includes('admin')) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
