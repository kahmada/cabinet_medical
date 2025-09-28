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
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                    ⚠️ N'oubliez pas d'indiquer la référence {invoice.id} dans le libellé de votre virement
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
                🔒 Paiement sécurisé
              </h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  ✓ Chiffrement SSL 256 bits
                </div>
                <div className="flex items-center gap-2">
                  ✓ Conforme PCI DSS
                </div>
                <div className="flex items-center gap-2">
                  ✓ Données protégées
                </div>
                <div className="flex items-center gap-2">
                  ✓ Transaction sécurisée
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
                  📞 +33 1 23 45 67 89<br />
                  ✉️ support@medicare.fr
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
