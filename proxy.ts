import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "bilik_site_access";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const allowedPaths =
    pathname.startsWith("/access") ||
    pathname.startsWith("/api/access") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/bilik-logo.svg") ||
    pathname.startsWith("/file.svg") ||
    pathname.startsWith("/globe.svg") ||
    pathname.startsWith("/next.svg") ||
    pathname.startsWith("/vercel.svg") ||
    pathname.startsWith("/window.svg");

  if (allowedPaths) {
    return NextResponse.next();
  }

  const hasAccess = request.cookies.get(COOKIE_NAME)?.value === "granted";

  if (!hasAccess) {
    const accessUrl = request.nextUrl.clone();
    accessUrl.pathname = "/access";
    accessUrl.searchParams.set("from", pathname);

    return NextResponse.redirect(accessUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*).*)", "/"],
};
