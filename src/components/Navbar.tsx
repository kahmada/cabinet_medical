"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { st } from "@/utils/styling";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ firstName: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setIsLoggedIn(true);
          setUser(data.user);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/";
  };

  // Navigation items for logged-in users
  const navItems = isLoggedIn
    ? [
        { href: "/espace-patient", label: "Mon Espace" },
        { href: "/rendez-vous", label: "Rendez-vous" },
        { href: "/medecins", label: "Médecins" },
        { href: "/chatbot", label: "Assistant IA" },
        { href: "/paiement", label: "Paiement" },
      ]
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold text-xl text-slate-800">
            <span className="text-blue-600">Medi</span>Care
          </Link>

          {isLoggedIn && (
            <nav className="hidden md:flex gap-6 text-sm">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={st(
                      "transition-colors",
                      active
                        ? "text-blue-600 font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-20 h-8 bg-slate-100 animate-pulse rounded"></div>
            ) : isLoggedIn ? (
              <>
                <span className="text-sm text-slate-600 hidden sm:inline">
                  Bonjour, {user?.firstName}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-slate-600 hover:text-slate-900 font-medium"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center rounded-md bg-blue-600 text-white px-5 py-2 text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                Se connecter
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
