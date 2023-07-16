import {NextResponse} from "next/server";
import {NextRequest} from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookies = request.cookies;
  const session = cookies.get("auth-service");

  if (path.startsWith("/user") && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path.startsWith("/auth") && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path.startsWith("/admin") && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",
    "/auth",
    "/about/:path*",
    "/user/:path*",
    "/admin",
  ],
};
