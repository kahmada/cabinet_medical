"use client";
import { useState } from "react";
import Link from "next/link";

type Service = {
  id: string;
  name: string;
  specialty: string;
  description: string;
  price: string;
  duration: string;
  icon: string;
  procedures: string[];
  conditions: string[];
};

const services: Service[] = [
  {
    id: "cardiologie",
    name: "Cardiologie",
    specialty: "Spécialité cardiovasculaire",
    description: "Prise en charge complète des pathologies cardiovasculaires : prévention, diagnostic et traitement des maladies du cœur et des vaisseaux.",
    price: "80-120€",
    duration: "30-45 min",
    icon: "❤️",
    procedures: [
      "Électrocardiogramme (ECG)",
      "Échocardiographie",
      "Test d'effort",
      "Holter ECG 24h",
      "Consultation post-infarctus",
      "Bilan cardiovasculaire complet"
    ],
    conditions: [
      "Hypertension artérielle",
      "Insuffisance cardiaque",
      "Troubles du rythme",
      "Maladie coronarienne",
      "Prévention cardiovasculaire",
      "Suivi post-opératoire"
    ]
  },
  {
    id: "dermatologie",
    name: "Dermatologie",
    specialty: "Spécialité de la peau",
    description: "Diagnostic et traitement des maladies de la peau, des cheveux et des ongles. Dermatologie médicale et esthétique.",
    price: "70-100€",
    duration: "20-30 min",
    icon: "🔬",
    procedures: [
      "Consultation dermatologique",
      "Dépistage cancer de la peau",
      "Dermoscopie",
      "Biopsie cutanée",
      "Cryothérapie",
      "Traitement laser"
    ],
    conditions: [
      "Acné et rosacée",
      "Eczéma et psoriasis",
      "Mélanome et cancers cutanés",
      "Infections cutanées",
      "Allergies de contact",
      "Vieillissement cutané"
    ]
  },
  {
    id: "pediatrie",
    name: "Pédiatrie",
    specialty: "Médecine de l'enfant",
    description: "Suivi médical complet des enfants de la naissance à l'adolescence. Prévention, vaccination et traitement des pathologies pédiatriques.",
    price: "60-80€",
    duration: "20-40 min",
    icon: "👶",
    procedures: [
      "Consultation pédiatrique",
      "Suivi de croissance",
      "Vaccinations obligatoires",
      "Bilans de santé",
      "Certificats médicaux",
      "Consultation urgente"
    ],
    conditions: [
      "Infections ORL récurrentes",
      "Troubles digestifs",
      "Allergies alimentaires",
      "Retard de croissance",
      "Troubles du sommeil",
      "Développement psychomoteur"
    ]
  },
  {
    id: "medecine-generale",
    name: "Médecine Générale",
    specialty: "Soins de premier recours",
    description: "Prise en charge globale du patient et de sa famille. Prévention, diagnostic et traitement des pathologies courantes.",
    price: "25-50€",
    duration: "15-30 min",
    icon: "🩺",
    procedures: [
      "Consultation générale",
      "Renouvellement d'ordonnances",
      "Certificats médicaux",
      "Vaccinations adultes",
      "Suivi des maladies chroniques",
      "Médecine préventive"
    ],
    conditions: [
      "Diabète et hypertension",
      "Infections respiratoires",
      "Troubles digestifs",
      "Douleurs articulaires",
      "Fatigue chronique",
      "Anxiété et stress"
    ]
  }
];

const additionalServices = [
  {
    name: "Téléconsultation",
    description: "Consultation à distance via vidéo sécurisée",
    price: "20-40€",
    duration: "15-20 min",
    icon: "💻"
  },
  {
    name: "Urgences",
    description: "Prise en charge des urgences médicales",
    price: "Variable",
    duration: "Variable",
    icon: "🚨"
  },
  {
    name: "Médecine du travail",
    description: "Visites médicales d'aptitude professionnelle",
    price: "50-80€",
    duration: "30 min",
    icon: "👔"
  },
  {
    name: "Certificats médicaux",
    description: "Certificats sport, permis, aptitude",
    price: "15-25€",
    duration: "10-15 min",
    icon: "📋"
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="container py-12">
      {/* En-tête */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
          Nos Services & Spécialités
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Découvrez l&apos;ensemble de nos spécialités médicales et services proposés dans nos centres. 
          Nos praticiens qualifiés vous accompagnent dans tous vos besoins de santé.
        </p>
      </div>

      {/* Spécialités principales */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">Spécialités Médicales</h2>
        
        <div className="grid gap-8 lg:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* En-tête de la carte */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{service.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{service.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{service.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-semibold text-slate-900">{service.price}</div>
                    <div className="text-slate-500">{service.duration}</div>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">{service.description}</p>
              </div>

              {/* Détails repliables */}
              <div className="p-6">
                <button
                  onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                  className="w-full text-left flex items-center justify-between text-blue-600 hover:text-blue-700 font-medium mb-4"
                >
                  <span>Voir les détails</span>
                  <span className={`transition-transform ${selectedService === service.id ? 'rotate-180' : ''}`}>
                    ↓
                  </span>
                </button>

                {selectedService === service.id && (
                  <div className="space-y-6 animate-in slide-in-from-top-2">
                    {/* Procédures */}
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Examens & Procédures</h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {service.procedures.map((procedure, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-slate-700">
                            <span className="text-green-500">✓</span>
                            {procedure}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pathologies traitées */}
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Pathologies Traitées</h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {service.conditions.map((condition, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-slate-700">
                            <span className="text-blue-500">•</span>
                            {condition}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bouton d'action */}
                    <div className="pt-4 border-t border-slate-100">
                      <Link
                        href={`/rendez-vous?specialty=${service.name}`}
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                      >
                        Prendre rendez-vous en {service.name}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services additionnels */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">Services Additionnels</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {additionalServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-slate-200 p-6 text-center hover:shadow-md transition"
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{service.name}</h3>
              <p className="text-sm text-slate-600 mb-3">{service.description}</p>
              <div className="text-xs text-slate-500">
                <div className="font-medium">{service.price}</div>
                <div>{service.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Informations pratiques */}
      <section className="bg-slate-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Informations Pratiques</h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Paiement */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              💳 Modes de Paiement
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Carte bancaire</li>
              <li>• Espèces</li>
              <li>• Chèque</li>
              <li>• Tiers payant (selon mutuelle)</li>
            </ul>
          </div>

          {/* Remboursement */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              🏥 Remboursement
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Secteur 1 : 100% tarif Sécu</li>
              <li>• Secteur 2 : dépassement possible</li>
              <li>• Carte Vitale acceptée</li>
              <li>• Feuille de soins électronique</li>
            </ul>
          </div>

          {/* Urgences */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              🚨 En Cas d&apos;Urgence
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• SAMU : 15</li>
              <li>• Pompiers : 18</li>
              <li>• Urgences européennes : 112</li>
              <li>• SOS Médecins : 3624</li>
            </ul>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-8 text-center">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Besoin d&apos;une consultation ?
            </h3>
            <p className="text-slate-600">
              Prenez rendez-vous en ligne ou contactez directement nos équipes.
            </p>
          </div>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/rendez-vous"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Prendre rendez-vous
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
            >
              Nous contacter
            </Link>
            
            <Link
              href="/chatbot"
              className="inline-flex items-center px-6 py-3 border border-blue-200 text-blue-700 bg-blue-50 rounded-lg font-medium hover:bg-blue-100 transition"
            >
              Assistant IA
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
