"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { st } from "@/utils/styling";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/medecins", label: "Médecins" },
  { href: "/services", label: "Services" },
  { href: "/rendez-vous", label: "Rendez-vous" },
  { href: "/contact", label: "Contact" },
  { href: "/urgences", label: "Urgences" },
  { href: "/espace-patient", label: "Espace Patient" },
  { href: "/paiement", label: "Paiement" },
  { href: "/chatbot", label: "Chatbot IA" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl text-slate-800">
          <span className="text-blue-600">Medi</span>Care
        </Link>
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
        <Link
          href="/rendez-vous"
          className="inline-flex items-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          Prendre rendez-vous
        </Link>
      </div>
    </header>
  );
}
