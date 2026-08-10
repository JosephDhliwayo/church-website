import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Toggle back to true (and push) to take the site offline again.
const MAINTENANCE_MODE = false;

export function proxy(request: NextRequest) {
  if (!MAINTENANCE_MODE) return NextResponse.next();

  const response = NextResponse.rewrite(new URL("/maintenance", request.url));
  response.headers.set("X-Robots-Tag", "noindex");
  return response;
}

export const config = {
  matcher: [
    "/((?!api|give|maintenance|_next/static|_next/image|favicon.ico|apple-icon.jpg|icon.jpg|robots.txt|sitemap.xml).*)",
  ],
};
