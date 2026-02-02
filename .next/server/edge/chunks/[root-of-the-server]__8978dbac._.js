(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__8978dbac._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
// Routes publiques accessibles sans authentification
const publicRoutes = [
    "/",
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/session",
    "/api/auth/signin",
    "/api/auth/callback"
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
    "/admin"
];
function middleware(request) {
    const { pathname } = request.nextUrl;
    // Vérifier si c'est une route publique
    const isPublicRoute = publicRoutes.some((route)=>pathname === route || pathname.startsWith(route));
    // Vérifier si c'est une route protégée
    const isProtectedRoute = protectedRoutes.some((route)=>pathname.startsWith(route));
    // Vérifier si l'utilisateur a une session
    const sessionCookie = request.cookies.get("medicare_session");
    const hasSession = !!sessionCookie?.value;
    // Si c'est une route protégée et pas de session, rediriger vers l'accueil
    if (isProtectedRoute && !hasSession) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        url.searchParams.set("redirect", pathname);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */ "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__8978dbac._.js.map