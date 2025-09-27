import Hero from "@/components/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="container py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Link href="/medecins" className="group rounded-lg border border-slate-200 p-6 hover:border-blue-300 hover:shadow-sm transition">
            <div className="font-semibold text-slate-900 group-hover:text-blue-700">Nos Médecins</div>
            <p className="text-sm text-slate-600 mt-1">Découvrez nos praticiens et leurs spécialités.</p>
          </Link>
          <Link href="/rendez-vous" className="group rounded-lg border border-slate-200 p-6 hover:border-blue-300 hover:shadow-sm transition">
            <div className="font-semibold text-slate-900 group-hover:text-blue-700">Prendre Rendez-vous</div>
            <p className="text-sm text-slate-600 mt-1">Réservez un créneau en temps réel.</p>
          </Link>
          <Link href="/chatbot" className="group rounded-lg border border-slate-200 p-6 hover:border-blue-300 hover:shadow-sm transition">
            <div className="font-semibold text-slate-900 group-hover:text-blue-700">Assistant IA</div>
            <p className="text-sm text-slate-600 mt-1">Orientez-vous selon vos symptômes.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
