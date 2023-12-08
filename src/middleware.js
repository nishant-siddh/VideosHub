import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req) {
    const path = req.nextUrl.pathname;
    const isAuthPath = path === '/login' || path === '/signup' || path === '/verifyEmail';
    const isProtectedPath = path.startsWith('/channel') || path.startsWith('/dashboard');
    // const isPublicPath = path === '/' || path.startsWith('/watch');

    const token = req.cookies.get('token')?.value || "";

    if (isAuthPath && token) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    if (isProtectedPath && !token) {
        console.log('redirecting to login from middleware');
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // if (isPublicPath) {
    //     return NextResponse.next();
    // }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // '/',
        // '/watch/:path*',
        '/channel/:path*',
        '/dashboard/:path*',
        '/login',
        '/signup',
        '/verifyEmail'
    ],
}