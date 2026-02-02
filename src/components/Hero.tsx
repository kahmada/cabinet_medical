"use client";
import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Hero() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden">
        {/* Background image with Ken Burns animation */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center kenburns scale-105" />
          <div className="absolute inset-0 bg-white/50" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-[#02C4C4]/80" />
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gra fade-up">
              Votre santé, notre priorité
            </h1>
            <p className="mt-4 text-gray-400 text-base md:text-lg max-w-prose fade-up" style={{animationDelay:'120ms'}}>
              Connectez-vous pour accéder à votre espace patient, prendre rendez-vous avec nos médecins spécialisés et bénéficier de notre assistant IA pour l&apos;analyse de vos symptômes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 fade-up" style={{animationDelay:'220ms'}}>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center rounded-md bg-blue-600 text-white px-6 py-3 text-base font-medium shadow-lg hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-all"
              >
                Se connecter
              </button>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center rounded-md border-2 border-blue-600 text-blue-700 bg-white px-6 py-3 text-base font-medium hover:bg-blue-50 transition-all"
              >
                Créer un compte
              </button>
            </div>
            <p className="mt-6 text-sm text-slate-600 fade-up" style={{animationDelay:'320ms'}}>
              ✓ Prise de rendez-vous en ligne<br />
              ✓ Assistant IA pour l&apos;analyse des symptômes<br />
              ✓ Accès à votre dossier médical<br />
              ✓ Paiement sécurisé en ligne
            </p>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] w-full max-w-xl mx-auto rounded-xl shadow-lg ring-1 ring-slate-200 overflow-hidden fade-up" style={{animationDelay:'180ms'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-[#02C4C4]/80" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-white text-center">
                  <div className="text-7xl md:text-8xl font-bold">+24</div>
                  <div className="mt-4 text-xl md:text-2xl font-medium text-white/95">Spécialités médicales</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-900">Pourquoi choisir MediCare ?</h2>
            <p className="mt-2 text-slate-600">Des services médicaux modernes et accessibles</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Rendez-vous en ligne</h3>
              <p className="text-slate-600 text-sm">
                Prenez rendez-vous 24h/24 avec le médecin de votre choix. Consultation en cabinet ou téléconsultation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Assistant IA médical</h3>
              <p className="text-slate-600 text-sm">
                Notre chatbot IA analyse vos symptômes et vous oriente vers la spécialité appropriée.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Dossier médical sécurisé</h3>
              <p className="text-slate-600 text-sm">
                Accédez à votre historique médical, ordonnances et résultats d&apos;examens en toute sécurité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Prêt à prendre soin de votre santé ?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Créez votre compte gratuitement et accédez à tous nos services médicaux en ligne.
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="inline-flex items-center rounded-md bg-white text-blue-600 px-8 py-4 text-lg font-medium shadow-lg hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all"
          >
            Créer mon compte gratuitement
          </button>
        </div>
      </section>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
