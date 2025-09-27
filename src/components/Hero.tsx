import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with Ken Burns animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center kenburns scale-105" />
        <div className="absolute inset-0 bg-white/50" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 grid gap-12 md:grid-cols-2 items-center">
        <div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-[#02F3EB]/80" />
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gra fade-up">
            Votre santé, notre priorité
          </h1>
          <p className="mt-4 text-gray-400 text-base md:text-lg max-w-prose fade-up" style={{animationDelay:'120ms'}}>
            Prenez rendez-vous en quelques clics avec le médecin le plus adapté.
            Notre assistant IA vous guide selon vos symptômes et l&apos;urgence.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 fade-up" style={{animationDelay:'220ms'}}>
            <Link
              href="/rendez-vous"
              className="inline-flex items-center rounded-md bg-blue-600 text-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Prendre rendez-vous
            </Link>
            <Link
              href="/chatbot"
              className="inline-flex items-center rounded-md border border-blue-200 text-blue-700 bg-white px-5 py-3 text-sm font-medium hover:bg-blue-50"
            >
              Discuter avec l&apos;assistant IA
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-600 fade-up" style={{animationDelay:'320ms'}}>
            L&apos;assistant IA est un outil d&apos;aide et ne remplace pas un avis médical.
          </p>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/3] w-full max-w-xl mx-auto rounded-xl shadow-lg ring-1 ring-slate-200 overflow-hidden fade-up" style={{animationDelay:'180ms'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-[#02F3EB]/80" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-white text-center">
                <div className="text-5xl font-semibold">+24</div>
                <div className="mt-1 text-white/90">Spécialités médicales</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
