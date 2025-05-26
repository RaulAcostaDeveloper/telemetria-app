// Autenticación del lado del servidor
import { NextRequest, NextResponse } from "next/server";

// Define las rutas que no requieren autenticación
const publicPaths = ["/login"];

const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (publicPaths.includes(pathname)) {
    // No requiere autenticación
    return NextResponse.next();
  }

  // Si la ruta requiere autenticación, comprueba el estado de autenticación
  const authToken = request.cookies.get("authToken")?.value || "";
  if (!authToken) {
    // Re dirigir
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export default middleware;

// Recursos
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|manifest.json|images|fonts|uploads|svg|api).*)",
  ],
};
