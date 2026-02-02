"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Patient = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

type Appointment = {
  id: number;
  scheduledAt: string;
  reason: string;
  urgency: string;
  status: string;
  doctor: {
    firstName: string;
    lastName: string;
    specialties: { name: string }[];
  };
  slot: {
    start: string;
    end: string;
  };
};

export default function EspacePatientPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatientData();
    loadAppointments();
  }, []);

  const loadPatientData = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setPatient(data.user);
      }
    } catch (error) {
      console.error("Erreur chargement patient:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAppointments = async () => {
    try {
      const response = await fetch("/api/appointments/my");
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      console.error("Erreur chargement RDV:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur déconnexion:", error);
    }
  };

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Bonjour {patient?.firstName} !
          </h1>
          <p className="text-slate-600">
            Bienvenue dans votre espace patient personnel
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition"
        >
          Se déconnecter
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-8">
          {/* Mes rendez-vous */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Mes Rendez-vous</h2>
              <Link
                href="/rendez-vous"
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
              >
                Nouveau RDV
              </Link>
            </div>

            {appointments.length === 0 ? (
              <div className="text-center py-12 bg-white border border-slate-200 rounded-lg">
                <div className="text-slate-500 mb-4">Aucun rendez-vous programmé</div>
                <Link
                  href="/rendez-vous"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Prendre votre premier rendez-vous
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => {
                  const appointmentDate = new Date(appointment.scheduledAt);
                  const isUpcoming = appointmentDate > new Date();
                  
                  return (
                    <div
                      key={appointment.id}
                      className={`p-6 border rounded-lg ${
                        isUpcoming 
                          ? "bg-white border-slate-200" 
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="font-semibold text-slate-900 mb-1">
                            Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
                          </div>
                          <div className="text-sm text-blue-600 mb-2">
                            {appointment.doctor.specialties.map(s => s.name).join(", ")}
                          </div>
                          <div className="text-sm text-slate-600">
                            {appointment.reason}
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === "confirmé" 
                            ? "bg-green-100 text-green-700"
                            : appointment.status === "annulé"
                            ? "bg-red-100 text-red-700"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {appointment.status}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600">
                          <div className="flex items-center gap-1 mb-1">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {appointmentDate.toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {appointmentDate.toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })} - {new Date(appointment.slot.end).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>

                        {isUpcoming && (
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-blue-600 border border-blue-200 rounded-md text-sm hover:bg-blue-50 transition">
                              Modifier
                            </button>
                            <button className="px-3 py-1 text-red-600 border border-red-200 rounded-md text-sm hover:bg-red-50 transition">
                              Annuler
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Paiements et factures */}
          <section className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Paiements & Factures</h2>
              <Link
                href="/paiement"
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition inline-block flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                Nouveau paiement
              </Link>
            </div>

            <div className="text-center py-8 text-slate-500">
              <div className="mb-2 flex justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>Aucune facture en attente</div>
            </div>
          </section>

          {/* Historique médical */}
          <section className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Historique Médical</h2>
            <div className="text-center py-8 text-slate-500">
              <div className="mb-2 flex justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>Aucun document disponible</div>
              <div className="text-sm mt-2">
                Vos comptes-rendus de consultation apparaîtront ici
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profil */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Mon Profil</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-slate-500">Nom complet</div>
                <div className="font-medium">{patient?.firstName} {patient?.lastName}</div>
              </div>
              <div>
                <div className="text-slate-500">Email</div>
                <div className="font-medium">{patient?.email}</div>
              </div>
              {patient?.phone && (
                <div>
                  <div className="text-slate-500">Téléphone</div>
                  <div className="font-medium">{patient.phone}</div>
                </div>
              )}
            </div>
            <button className="w-full mt-4 px-4 py-2 border border-slate-300 text-slate-700 rounded-md text-sm hover:bg-slate-50 transition">
              Modifier mes informations
            </button>
          </div>

          {/* Services rapides */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Services Rapides</h3>
            <div className="space-y-3">
              <Link
                href="/rendez-vous"
                className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
              >
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-sm">Prendre RDV</div>
                  <div className="text-xs text-slate-500">Réserver un créneau</div>
                </div>
              </Link>
              
              <Link
                href="/chatbot"
                className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
              >
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-sm">Assistant IA</div>
                  <div className="text-xs text-slate-500">Aide aux symptômes</div>
                </div>
              </Link>

              <Link
                href="/medecins"
                className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
              >
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <div>
                  <div className="font-medium text-sm">Nos Médecins</div>
                  <div className="text-xs text-slate-500">Voir les praticiens</div>
                </div>
              </Link>

              <Link
                href="/paiement"
                className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
              >
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-sm">Paiement en ligne</div>
                  <div className="text-xs text-slate-500">Régler vos consultations</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Aide */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Besoin d&apos;aide ?</h3>
            <div className="space-y-3 text-sm">
              <Link href="/contact" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Contacter le cabinet
              </Link>
              <Link href="/urgences" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Guide des urgences
              </Link>
              <div className="flex items-center gap-2 text-slate-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                support@medicare.fr
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
