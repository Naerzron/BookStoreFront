import { NextRequest, NextResponse } from "next/server";
import { HOME_PAGE, LOGIN_PAGE } from "@/lib/constants";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL(HOME_PAGE, request.url));
    }

    const userLogged = request.cookies.get("userLogged");

    const restrictedRoutes = ["/account"];
    const isRestrictedRoute = restrictedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isRestrictedRoute && !userLogged) {
        const url = request.nextUrl.clone();
        url.pathname = LOGIN_PAGE;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
