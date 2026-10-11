import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export const proxy = (request: NextRequest) => {
  const session = getSessionCookie(request);
  const path = request.nextUrl.pathname;

  const needLogin = path.startsWith("/product") || path.startsWith("/profile");

  if (needLogin && !session) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("from", "protected");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};