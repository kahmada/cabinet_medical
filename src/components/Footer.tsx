import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#02C4C4]">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 md:grid-cols-4 text-sm text-slate-600">
        <div className="col-span-2">
          <div className="font-semibold text-slate-900 text-lg mb-2">
            <span className="text-white">Medi</span>Care
          </div>
          <p className="max-w-md">
            Cabinet médical moderne proposant rendez-vous intelligents, téléconsultation
            et accompagnement via chatbot IA. Ce site ne remplace pas un avis médical.
          </p>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-2">Navigation</div>
          <ul className="space-y-2">
            <li><Link className="hover:text-slate-900" href="/">Accueil</Link></li>
            <li><Link className="hover:text-slate-900" href="/medecins">Médecins</Link></li>
            <li><Link className="hover:text-slate-900" href="/services">Services</Link></li>
            <li><Link className="hover:text-slate-900" href="/rendez-vous">Rendez-vous</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-2">Contact</div>
          <ul className="space-y-2">
            <li>contact@medicare.fr</li>
            <li>+33 1 23 45 67 89</li>
            <li>Lun-Ven 8h-19h</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MediCare. Tous droits réservés.</p>
          <div className="space-x-4">
            <Link href="/mentions-legales" className="hover:text-slate-700">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-slate-700">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
