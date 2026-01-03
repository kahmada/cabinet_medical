"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    description:
      "Prise en charge complète des pathologies cardiovasculaires : prévention, diagnostic et traitement des maladies du cœur et des vaisseaux.",
    price: "80-120€",
    duration: "30-45 min",
    icon: "❤️",
    procedures: [
      "Électrocardiogramme (ECG)",
      "Échocardiographie",
      "Test d'effort",
      "Holter ECG 24h",
      "Consultation post-infarctus",
      "Bilan cardiovasculaire complet",
    ],
    conditions: [
      "Hypertension artérielle",
      "Insuffisance cardiaque",
      "Troubles du rythme",
      "Maladie coronarienne",
      "Prévention cardiovasculaire",
      "Suivi post-opératoire",
    ],
  },
  {
    id: "dermatologie",
    name: "Dermatologie",
    specialty: "Spécialité de la peau",
    description:
      "Diagnostic et traitement des maladies de la peau, des cheveux et des ongles. Dermatologie médicale et esthétique.",
    price: "70-100€",
    duration: "20-30 min",
    icon: "🔬",
    procedures: [
      "Consultation dermatologique",
      "Dépistage cancer de la peau",
      "Dermoscopie",
      "Biopsie cutanée",
      "Cryothérapie",
      "Traitement laser",
    ],
    conditions: [
      "Acné et rosacée",
      "Eczéma et psoriasis",
      "Mélanome et cancers cutanés",
      "Infections cutanées",
      "Allergies de contact",
      "Vieillissement cutané",
    ],
  },
  {
    id: "pediatrie",
    name: "Pédiatrie",
    specialty: "Médecine de l'enfant",
    description:
      "Suivi médical complet des enfants de la naissance à l'adolescence. Prévention, vaccination et traitement des pathologies pédiatriques.",
    price: "60-80€",
    duration: "20-40 min",
    icon: "/pd.png",
    procedures: [
      "Consultation pédiatrique",
      "Suivi de croissance",
      "Vaccinations obligatoires",
      "Bilans de santé",
      "Certificats médicaux",
      "Consultation urgente",
    ],
    conditions: [
      "Infections ORL récurrentes",
      "Troubles digestifs",
      "Allergies alimentaires",
      "Retard de croissance",
      "Troubles du sommeil",
      "Développement psychomoteur",
    ],
  },
  {
    id: "medecine-generale",
    name: "Médecine Générale",
    specialty: "Soins de premier recours",
    description:
      "Prise en charge globale du patient et de sa famille. Prévention, diagnostic et traitement des pathologies courantes.",
    price: "25-50€",
    duration: "15-30 min",
    icon: "🩺",
    procedures: [
      "Consultation générale",
      "Renouvellement d'ordonnances",
      "Certificats médicaux",
      "Vaccinations adultes",
      "Suivi des maladies chroniques",
      "Médecine préventive",
    ],
    conditions: [
      "Diabète et hypertension",
      "Infections respiratoires",
      "Troubles digestifs",
      "Douleurs articulaires",
      "Fatigue chronique",
      "Anxiété et stress",
    ],
  },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="container py-12">
      <section className="grid gap-8 lg:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition"
          >
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  {/* ICON */}
                  <div className="w-12 h-12 flex items-center justify-center">
                    {service.icon.startsWith("/") ? (
                      <Image
                        src={service.icon}
                        alt={service.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-3xl">{service.icon}</span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {service.name}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">
                      {service.specialty}
                    </p>
                  </div>
                </div>

                <div className="text-right text-sm">
                  <div className="font-semibold text-slate-900">
                    {service.price}
                  </div>
                  <div className="text-slate-500">{service.duration}</div>
                </div>
              </div>

              <p className="text-slate-700">{service.description}</p>
            </div>

            <div className="p-6">
              <button
                onClick={() =>
                  setSelectedService(
                    selectedService === service.id ? null : service.id
                  )
                }
                className="w-full text-left text-blue-600 font-medium"
              >
                Voir les détails
              </button>

              {selectedService === service.id && (
                <div className="mt-4">
                  <Link
                    href={`/rendez-vous?specialty=${service.name}`}
                    className="inline-flex px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Prendre rendez-vous
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
