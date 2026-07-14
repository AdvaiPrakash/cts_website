import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, readSession } from "./lib/admin-auth";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Only guard /admin routes (except login itself)
  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const uid = await readSession(token);
    
    if (!uid) {
      url.pathname = "/admin/login";
      // Save original URL to redirect back after login
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
