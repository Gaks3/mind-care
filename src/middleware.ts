import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin") && session.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/bookings") && session.user.role === "PSYCHOLOGY") {
    return NextResponse.redirect(new URL("/dashboard-psychology", request.url));
  }

  if (
    pathname.startsWith("/articles") &&
    session.user.role !== "PSYCHOLOGY" &&
    pathname.endsWith("/edit")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/bookings/:path*",
    "/dashboard-psychology",
    "/articles/:path*",
  ],
};
