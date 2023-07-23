// import { NextResponse } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(req) {
//     const path = req.nextUrl.pathname;
//     const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyEmail';

//     const token = req.cookies.get('token')?.value || "";

//     if (isPublicPath && token) {
//         return NextResponse.redirect(new URL('/', req.nextUrl));
//     }
//     // if (!isPublicPath && !token) {
//     //     return NextResponse.redirect(new URL('/login', req.nextUrl));
//     // }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: [
//         '/',
//         '/channel/:path*',
//         '/login',
//         '/signup',
//         '/verifyEmail'
//     ],
// }