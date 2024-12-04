import { NextRequest, NextResponse } from "next/server";
import { HOME_PAGE, LOGIN_PAGE } from "@/lib/constants";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (pathname === "/") {
        return NextResponse.redirect(new URL(HOME_PAGE, request.url));
    }

    const userLogged = request.cookies.get("jwt");
    const token = userLogged?.value;

    let userRole: UserRole = "Default";

    if (token) {
        const decoded: UserToken = jwtDecode(token);

        userRole = decoded.role ?? userRole;
    }

    const userRestrictedRoutes = ["/account"];
    const adminRestrictedRoutes = ["/admin"];

    const isUserRestrictedRoute = userRestrictedRoutes.some((route) =>
        pathname.startsWith(route)
    );
    const isAdminRestrictedRoute = adminRestrictedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if ((isUserRestrictedRoute || isAdminRestrictedRoute) && !token) {
        const url = request.nextUrl.clone();
        url.pathname = LOGIN_PAGE;
        return NextResponse.redirect(url);
    }

    if (isAdminRestrictedRoute && userRole !== "Administrador") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/books") && userRole === "Administrador") {
        return NextResponse.redirect(new URL("/admin/books", request.url));
    }

    if (isUserRestrictedRoute && userRole !== "Usuario") {
        return NextResponse.redirect(new URL("/", request.url));
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
