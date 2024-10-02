import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authenticate, DataAuthenticate } from "./services/user";

export async function middleware(req: NextRequest) {
  const objectCookie = req.cookies.get("token");

  let data = {} as DataAuthenticate;

  if (objectCookie?.value) {
    data = await authenticate({
      token: objectCookie?.value,
    });
  }

  if (!data?.idUsuario) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home"],
};
