"use client";
import { useState } from "react";
import Link from "next/link";

type EmergencyLevel = "immediate" | "urgent" | "semi-urgent" | "non-urgent";

type EmergencyCase = {
  symptoms: string[];
  level: EmergencyLevel;
  action: string;
  timeframe: string;
};

const emergencyCases: Record<EmergencyLevel, EmergencyCase> = {
  immediate: {
    symptoms: [
      "Arrêt cardiaque ou respiratoire",
      "Perte de connaissance",
      "Douleur thoracique intense",
      "Difficultés respiratoires sévères",
      "Hémorragie importante",
      "Traumatisme crânien grave",
      "Signes d'AVC (paralysie, troubles de la parole)",
      "Convulsions",
      "Brûlures étendues"
    ],
    level: "immediate",
    action: "Appelez le 15 (SAMU) ou 112 IMMÉDIATEMENT",
    timeframe: "Intervention < 15 minutes"
  },
  urgent: {
    symptoms: [
      "Fièvre élevée (>39°C) persistante",
      "Douleurs abdominales intenses",
      "Fracture ouverte ou déplacée",
      "Plaie profonde nécessitant des points",
      "Réaction allergique sévère",
      "Vomissements répétés avec déshydratation",
      "Douleur intense non calmée",
      "Trouble de la conscience"
    ],
    level: "urgent",
    action: "Rendez-vous aux urgences ou appelez le 15",
    timeframe: "Prise en charge < 2 heures"
  },
  "semi-urgent": {
    symptoms: [
      "Fièvre modérée avec symptômes",
      "Douleurs articulaires importantes",
      "Infection urinaire avec fièvre",
      "Otite aiguë très douloureuse",
      "Migraine inhabituelle et sévère",
      "Éruption cutanée étendue",
      "Diarrhée avec signes de déshydratation"
    ],
    level: "semi-urgent",
    action: "Consultation médicale dans les 24h",
    timeframe: "Rendez-vous dans la journée"
  },
  "non-urgent": {
    symptoms: [
      "Rhume, toux légère",
      "Fièvre légère (<38.5°C)",
      "Douleurs musculaires mineures",
      "Fatigue générale",
      "Troubles digestifs légers",
      "Éruption cutanée localisée",
      "Certificat médical"
    ],
    level: "non-urgent",
    action: "Consultation programmée ou téléconsultation",
    timeframe: "Rendez-vous sous 48-72h"
  }
};

const emergencyNumbers = [
  {
    number: "15",
    name: "SAMU",
    description: "Urgences médicales",
    when: "Détresse vitale, malaise grave"
  },
  {
    number: "18",
    name: "Pompiers",
    description: "Secours et incendies",
    when: "Accident, incendie, personne en danger"
  },
  {
    number: "112",
    name: "Urgences Européennes",
    description: "Numéro d'urgence unique",
    when: "Toute situation d'urgence"
  },
  {
    number: "3624",
    name: "SOS Médecins",
    description: "Médecin à domicile",
    when: "Urgence médicale non vitale"
  },
  {
    number: "196",
    name: "Enfance Maltraitée",
    description: "Protection de l'enfance",
    when: "Signalement maltraitance"
  }
];

export default function UrgencesPage() {
  const [selectedLevel, setSelectedLevel] = useState<EmergencyLevel | null>(null);

  const getLevelColor = (level: EmergencyLevel) => {
    switch (level) {
      case "immediate": return "bg-red-500 text-white";
      case "urgent": return "bg-orange-500 text-white";
      case "semi-urgent": return "bg-yellow-500 text-white";
      case "non-urgent": return "bg-green-500 text-white";
    }
  };

  const getLevelBorderColor = (level: EmergencyLevel) => {
    switch (level) {
      case "immediate": return "border-red-200 bg-red-50";
      case "urgent": return "border-orange-200 bg-orange-50";
      case "semi-urgent": return "border-yellow-200 bg-yellow-50";
      case "non-urgent": return "border-green-200 bg-green-50";
    }
  };

  return (
    <div className="container py-12">
      {/* Alerte urgence */}
      <div className="mb-8 p-6 bg-red-100 border-l-4 border-red-500 rounded-r-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl">🚨</span>
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-red-800">
              Urgence Vitale - Appelez Immédiatement
            </h2>
            <p className="text-red-700">
              En cas de détresse vitale : <strong>SAMU 15</strong> ou <strong>Urgences 112</strong>
            </p>
          </div>
        </div>
      </div>

      {/* En-tête */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
          Guide des Urgences Médicales
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          Ce guide vous aide à évaluer l&apos;urgence de votre situation et vous oriente vers la prise en charge appropriée. 
          En cas de doute, n&apos;hésitez pas à contacter les services d&apos;urgence.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mb-12 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start">
          <span className="text-amber-600 text-xl mr-3">⚠️</span>
          <div className="text-sm text-amber-800">
            <strong>Important :</strong> Ce guide est informatif et ne remplace pas un diagnostic médical professionnel. 
            En cas de doute, consultez toujours un médecin ou appelez les services d&apos;urgence.
          </div>
        </div>
      </div>

      {/* Guide de triage */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">
          Évaluez votre Situation
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(emergencyCases).map(([key, emergency]) => (
            <div
              key={key}
              className={`border-2 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer
                ${selectedLevel === key ? 'ring-2 ring-blue-500' : ''} 
                ${getLevelBorderColor(emergency.level)}
              `}
              onClick={() => setSelectedLevel(selectedLevel === key ? null : key as EmergencyLevel)}
            >
              {/* En-tête */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(emergency.level)}`}>
                    {key === 'immediate' && 'URGENCE VITALE'}
                    {key === 'urgent' && 'URGENT'}
                    {key === 'semi-urgent' && 'SEMI-URGENT'}
                    {key === 'non-urgent' && 'NON URGENT'}
                  </div>
                  <span className="text-slate-400">
                    {selectedLevel === key ? '−' : '+'}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="font-semibold text-slate-900 mb-1">{emergency.action}</div>
                  <div className="text-sm text-slate-600">{emergency.timeframe}</div>
                </div>

                {/* Symptômes (toujours visibles - les 3 premiers) */}
                <div className="space-y-1">
                  {emergency.symptoms.slice(0, 3).map((symptom, index) => (
                    <div key={index} className="flex items-center text-sm text-slate-700">
                      <span className="text-slate-400 mr-2">•</span>
                      {symptom}
                    </div>
                  ))}
                  {emergency.symptoms.length > 3 && (
                    <div className="text-sm text-slate-500 italic">
                      et {emergency.symptoms.length - 3} autres symptômes...
                    </div>
                  )}
                </div>
              </div>

              {/* Détails étendus */}
              {selectedLevel === key && (
                <div className="px-4 pb-4 border-t border-slate-200">
                  <div className="pt-4">
                    <h4 className="font-semibold text-slate-900 mb-3">Tous les symptômes :</h4>
                    <div className="space-y-2">
                      {emergency.symptoms.map((symptom, index) => (
                        <div key={index} className="flex items-center text-sm text-slate-700">
                          <span className="text-red-500 mr-2">•</span>
                          {symptom}
                        </div>
                      ))}
                    </div>

                    {/* Action selon le niveau */}
                    <div className="mt-4 p-3 bg-white rounded-lg border">
                      <div className="font-semibold text-slate-900 mb-2">Que faire ?</div>
                      <div className="text-sm text-slate-700 mb-3">{emergency.action}</div>
                      
                      {key === 'immediate' && (
                        <div className="flex gap-2 flex-wrap">
                          <a href="tel:15" className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                            📞 Appeler le 15
                          </a>
                          <a href="tel:112" className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                            📞 Appeler le 112
                          </a>
                        </div>
                      )}
                      
                      {key === 'urgent' && (
                        <div className="flex gap-2 flex-wrap">
                          <a href="tel:15" className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">
                            📞 Appeler le 15
                          </a>
                          <Link href="/rendez-vous" className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">
                            🏥 Urgences
                          </Link>
                        </div>
                      )}
                      
                      {(key === 'semi-urgent' || key === 'non-urgent') && (
                        <div className="flex gap-2 flex-wrap">
                          <Link href="/rendez-vous" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                            📅 Prendre RDV
                          </Link>
                          <Link href="/chatbot" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50">
                            🤖 Assistant IA
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Numéros d'urgence */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">
          Numéros d&apos;Urgence
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {emergencyNumbers.map((contact, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl font-bold text-red-600">{contact.number}</div>
                <a 
                  href={`tel:${contact.number}`}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
                >
                  Appeler
                </a>
              </div>
              <div className="font-semibold text-slate-900 mb-1">{contact.name}</div>
              <div className="text-sm text-slate-600 mb-2">{contact.description}</div>
              <div className="text-xs text-slate-500 italic">{contact.when}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Informations pratiques */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">
          Informations Pratiques
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Que préparer */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              🎒 Que Préparer pour les Urgences
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Carte d&apos;identité</li>
              <li>• Carte Vitale et mutuelle</li>
              <li>• Liste des médicaments en cours</li>
              <li>• Carnet de vaccination</li>
              <li>• Derniers examens médicaux</li>
              <li>• Coordonnées du médecin traitant</li>
              <li>• Allergies connues</li>
            </ul>
          </div>

          {/* Premiers secours */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="font-semibent text-slate-900 mb-4 flex items-center gap-2">
              🚑 Gestes de Premiers Secours
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Position latérale de sécurité</li>
              <li>• Massage cardiaque (30 compressions)</li>
              <li>• Bouche-à-bouche (2 insufflations)</li>
              <li>• Défibrillateur automatique</li>
              <li>• Compression d&apos;une hémorragie</li>
              <li>• Manœuvre de Heimlich (étouffement)</li>
            </ul>
            <div className="mt-4">
              <a 
                href="https://www.croix-rouge.fr/Je-me-forme/Particuliers/Les-6-gestes-de-base"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                → Formation aux gestes qui sauvent
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services d'urgence locaux */}
      <section className="bg-slate-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">
          Services d&apos;Urgence à Proximité
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">🏥 Hôpitaux avec Urgences</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-white rounded-lg border">
                <div className="font-medium">Hôpital Saint-Louis</div>
                <div className="text-slate-600">1 Av. Claude Vellefaux, 75010 Paris</div>
                <div className="text-slate-500">24h/24 - 7j/7</div>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <div className="font-medium">Hôpital Cochin</div>
                <div className="text-slate-600">27 Rue du Faubourg Saint-Jacques, 75014 Paris</div>
                <div className="text-slate-500">24h/24 - 7j/7</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-3">🚑 Autres Services</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-white rounded-lg border">
                <div className="font-medium">Pharmacies de Garde</div>
                <div className="text-slate-600">3237 (service téléphonique)</div>
                <div className="text-slate-500">Pharmacies ouvertes la nuit</div>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <div className="font-medium">Maisons Médicales de Garde</div>
                <div className="text-slate-600">Consultations urgentes week-end</div>
                <div className="text-slate-500">Sur rendez-vous via le 15</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Besoin d&apos;aide pour évaluer votre situation ?
            </h3>
            <p className="text-slate-600">
              Notre assistant IA peut vous aider à déterminer l&apos;urgence de votre cas.
            </p>
          </div>
          
          <Link
            href="/chatbot?mode=detection"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            🤖 Évaluer mes symptômes avec l&apos;IA
          </Link>
        </div>
      </section>
    </div>
  );
}
