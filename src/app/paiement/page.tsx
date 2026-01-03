"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type PaymentMethod = "card" | "paypal" | "bank" | "apple";

export default function PaiementPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    email: "",
    amount: "65.00"
  });

  const [invoice] = useState({
    id: "INV-2025-001",
    date: "27 septembre 2025",
    doctor: "Dr. Alice Martin",
    specialty: "Cardiologie",
    service: "Consultation de contrôle",
    amount: 65.00,
    patient: "Demo Patient"
  });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation de paiement
    setTimeout(() => {
      alert("Paiement effectué avec succès !");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <Link
            href="/espace-patient"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 inline-block"
          >
            ← Retour à l'espace patient
          </Link>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
            Paiement en ligne
          </h1>
          <p className="text-slate-600">
            Réglez vos consultations médicales de manière sécurisée
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Formulaire de paiement */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                Informations de paiement
              </h2>

              {/* Sélection du moyen de paiement */}
              <div className="mb-6">
                <h3 className="font-medium text-slate-900 mb-4">
                  Choisissez votre moyen de paiement
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border rounded-lg text-left transition ${
                      paymentMethod === "card"
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Image src="/visa.png" alt="Visa" width={32} height={32} className="object-contain" />
                      <div>
                        <div className="font-medium">Carte bancaire</div>
                        <div className="text-sm text-slate-600">Visa, Mastercard</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={`p-4 border rounded-lg text-left transition ${
                      paymentMethod === "paypal"
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Image src="/pypal.png" alt="PayPal" width={32} height={32} className="object-contain" />
                      <div>
                        <div className="font-medium">PayPal</div>
                        <div className="text-sm text-slate-600">Compte PayPal</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("apple")}
                    className={`p-4 border rounded-lg text-left transition ${
                      paymentMethod === "apple"
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Image src="/app.png" alt="Apple Pay" width={32} height={32} className="object-contain" />
                      <div>
                        <div className="font-medium">Apple Pay</div>
                        <div className="text-sm text-slate-600">Touch ID, Face ID</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-4 border rounded-lg text-left transition ${
                      paymentMethod === "bank"
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Image src="/vi.png" alt="Virement bancaire" width={32} height={32} className="object-contain" />
                      <div>
                        <div className="font-medium">Virement bancaire</div>
                        <div className="text-sm text-slate-600">IBAN requis</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Formulaire de carte bancaire */}
              {paymentMethod === "card" && (
                <form onSubmit={handlePayment}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Numéro de carte
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Date d'expiration
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM/AA"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Code CVV
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Nom sur la carte
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jean Dupont"
                        value={formData.cardName}
                        onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email de confirmation
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 py-3 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Traitement en cours..." : `Payer ${formData.amount} €`}
                  </button>
                </form>
              )}

              {/* PayPal */}
              {paymentMethod === "paypal" && (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <Image src="/pypal.png" alt="PayPal" width={64} height={64} className="mx-auto object-contain" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Paiement PayPal
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Vous allez être redirigé vers PayPal pour finaliser le paiement
                  </p>
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? "Redirection..." : "Continuer avec PayPal"}
                  </button>
                </div>
              )}

              {/* Apple Pay */}
              {paymentMethod === "apple" && (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <Image src="/app.png" alt="Apple Pay" width={64} height={64} className="mx-auto object-contain" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Apple Pay
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Utilisez Touch ID ou Face ID pour payer en toute sécurité
                  </p>
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="px-8 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition disabled:opacity-50"
                  >
                    {loading ? "Authentification..." : "Payer avec Apple Pay"}
                  </button>
                </div>
              )}

              {/* Virement bancaire */}
              {paymentMethod === "bank" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="mb-2">
                      <Image src="/vi.png" alt="Virement bancaire" width={48} height={48} className="mx-auto object-contain" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">
                      Paiement par virement
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>Bénéficiaire :</strong> Cabinet Médical Medicare
                    </div>
                    <div>
                      <strong>IBAN :</strong> FR76 1234 5678 9012 3456 7890 123
                    </div>
                    <div>
                      <strong>BIC :</strong> AGRIFRPP
                    </div>
                    <div>
                      <strong>Référence :</strong> {invoice.id}
                    </div>
                    <div>
                      <strong>Montant :</strong> {invoice.amount.toFixed(2)} €
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800 flex items-start gap-2">
                    <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>N'oubliez pas d'indiquer la référence {invoice.id} dans le libellé de votre virement</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Récapitulatif */}
          <div className="space-y-6">
            {/* Facture */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Récapitulatif</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Facture</span>
                  <span className="font-medium">{invoice.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Date</span>
                  <span className="font-medium">{invoice.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Patient</span>
                  <span className="font-medium">{invoice.patient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Médecin</span>
                  <span className="font-medium">{invoice.doctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Spécialité</span>
                  <span className="font-medium">{invoice.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Service</span>
                  <span className="font-medium">{invoice.service}</span>
                </div>
              </div>

              <div className="border-t border-slate-200 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">Total à payer</span>
                  <span className="text-xl font-bold text-blue-600">
                    {invoice.amount.toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Paiement sécurisé
              </h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Chiffrement SSL 256 bits
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Conforme PCI DSS
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Données protégées
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Transaction sécurisée
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4">
                Besoin d'aide ?
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Service client</strong><br />
                  <div className="flex items-center gap-1 mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    +33 1 23 45 67 89
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    support@medicare.fr
                  </div>
                </div>
                <div className="text-slate-600">
                  Du lundi au vendredi<br />
                  9h00 - 18h00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
