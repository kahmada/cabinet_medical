import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes publiques accessibles sans authentification
const publicRoutes = [
  "/",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/session",
  "/api/auth/signin",
  "/api/auth/callback",
];

// Routes qui nécessitent une authentification
const protectedRoutes = [
  "/espace-patient",
  "/rendez-vous",
  "/medecins",
  "/services",
  "/chatbot",
  "/paiement",
  "/contact",
  "/urgences",
  "/admin",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si c'est une route publique
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  );

  // Vérifier si c'est une route protégée
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Vérifier si l'utilisateur a une session
  const sessionCookie = request.cookies.get("medicare_session");
  const hasSession = !!sessionCookie?.value;

  // Si c'est une route protégée et pas de session, rediriger vers l'accueil
  if (isProtectedRoute && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
