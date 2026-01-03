"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type LoginMode = "login" | "register" | "forgot";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMode, setLoginMode] = useState<LoginMode>("login");
  const [patient, setPatient] = useState<Patient | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Formulaire de connexion
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    confirmPassword: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPatient(data.patient);
        setIsLoggedIn(true);
        
        // TODO: Charger les vrais rendez-vous du patient
        // Pour l'instant, on garde les données de démonstration
        const mockAppointments: Appointment[] = [
          {
            id: 1,
            scheduledAt: "2025-09-30T10:00:00",
            reason: "Consultation de contrôle",
            urgency: "routine",
            status: "confirmé",
            doctor: {
              firstName: "Alice",
              lastName: "Martin",
              specialties: [{ name: "Cardiologie" }]
            },
            slot: {
              start: "2025-09-30T10:00:00",
              end: "2025-09-30T10:30:00"
            }
          }
        ];
        setAppointments(mockAppointments);
      } else {
        setError(data.error || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setError("Inscription réalisée avec succès ! Vous pouvez maintenant vous connecter.");
        setLoginMode("login");
        // Réinitialiser le formulaire
        setFormData({
          email: formData.email, // Garder l'email pour faciliter la connexion
          password: "",
          firstName: "",
          lastName: "",
          phone: "",
          confirmPassword: ""
        });
      } else {
        setError(data.error || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPatient(null);
    setAppointments([]);
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      confirmPassword: ""
    });
  };

  // Interface de connexion
  if (!isLoggedIn) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto">
          {/* En-tête */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
              Espace Patient
            </h1>
            <p className="text-slate-600">
              Connectez-vous pour accéder à vos rendez-vous et services
            </p>
          </div>

          {/* Mode de connexion */}
          <div className="flex mb-6 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setLoginMode("login")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                loginMode === "login" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setLoginMode("register")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                loginMode === "register" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Formulaire */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <form onSubmit={loginMode === "login" ? handleLogin : handleRegister}>
              {/* Champs d'inscription supplémentaires */}
              {loginMode === "register" && (
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Téléphone (inscription) */}
              {loginMode === "register" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Téléphone (optionnel)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
              )}

              {/* Mot de passe */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Confirmation mot de passe (inscription) */}
              {loginMode === "register" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}

              {/* Messages d'erreur */}
              {error && (
                <div className={`mb-4 p-3 rounded-md text-sm ${
                  error.includes("succès") 
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {error}
                </div>
              )}

              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Chargement..." : (loginMode === "login" ? "Se connecter" : "S'inscrire")}
              </button>
            </form>

            {/* Liens utiles */}
            <div className="mt-6 text-center text-sm">
              {loginMode === "login" && (
                <button
                  onClick={() => setLoginMode("forgot")}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Mot de passe oublié ?
                </button>
              )}
            </div>
          </div>

          {/* Compte de démonstration */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-800">
              <strong>Compte de démonstration :</strong><br />
              Email: demo.patient@medicare.fr<br />
              Mot de passe: demo123
            </div>
          </div>

          {/* Liens vers autres services */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 text-sm mb-4">
              Vous n&apos;avez pas encore de compte ?
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/rendez-vous"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Prendre rendez-vous
              </Link>
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Interface patient connecté
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

            <div className="space-y-4">
              {/* Facture en attente */}
              <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-medium text-slate-900">Consultation Dr. Martin</div>
                    <div className="text-sm text-slate-600">27 septembre 2025 - Cardiologie</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-orange-700">65,00 €</div>
                    <div className="text-xs text-orange-600">En attente</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/paiement"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition inline-block"
                  >
                    Payer maintenant
                  </Link>
                  <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md text-sm hover:bg-slate-50 transition">
                    Voir facture
                  </button>
                </div>
              </div>

              {/* Historique des paiements */}
              <div className="space-y-3">
                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Consultation Dr. Bernard</div>
                      <div className="text-sm text-slate-600">15 septembre 2025 - Dermatologie</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-700">70,00 €</div>
                      <div className="text-xs text-green-600 flex items-center gap-1 justify-end">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Payé
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Consultation Dr. Dubois</div>
                      <div className="text-sm text-slate-600">08 septembre 2025 - Médecine générale</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-700">55,00 €</div>
                      <div className="text-xs text-green-600 flex items-center gap-1 justify-end">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Payé
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Moyens de paiement */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-medium text-slate-900 mb-3">Moyens de paiement acceptés</h3>
              <div className="flex gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Carte bancaire
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  Virement
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  PayPal
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Apple Pay
                </div>
              </div>
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

              <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg opacity-50">
                <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-sm text-slate-400">Certificats</div>
                  <div className="text-xs text-slate-400">Bientôt disponible</div>
                </div>
              </div>

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

              <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg opacity-50">
                <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-sm text-slate-400">Téléconsultation</div>
                  <div className="text-xs text-slate-400">Bientôt disponible</div>
                </div>
              </div>
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
