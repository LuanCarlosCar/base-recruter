// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const objectCookie = req.cookies.get("token");

  let data = {};

  if (objectCookie?.value) {
    const host = process.env.NEXT_PUBLIC_API_HOST;

    const response = await fetch(`${host}/authenticate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: objectCookie?.value,
      }),
    });

    data = await response.json();

    console.log("data", data);
  }

  if (!data?.idUsuario) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home"], // Adicione aqui suas rotas privadas
};
