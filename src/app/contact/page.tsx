"use client";
import { useState } from "react";

export default function ContactPage() {
  const [selectedLocation, setSelectedLocation] = useState("paris");

  const locations = {
    paris: {
      name: "Cabinet Principal - Paris",
      address: "12 rue de la Santé, 75013 Paris",
      phone: "+33 1 23 45 67 89",
      email: "paris@medicare.fr",
      hours: {
        "Lundi - Vendredi": "8h00 - 19h00",
        "Samedi": "9h00 - 17h00",
        "Dimanche": "Fermé"
      },
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.8958193348894!2d2.344207215674!3d48.839285979286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671c7f1b5e91d%3A0x6c1d4b8c8c8c8c8c!2s12%20Rue%20de%20la%20Sant%C3%A9%2C%2075013%20Paris!5e0!3m2!1sfr!2sfr!4v1695830000000!5m2!1sfr!2sfr",
      googleMapsLink: "https://maps.google.com/?q=12+rue+de+la+Santé,+75013+Paris"
    },
    lyon: {
      name: "Centre Médical - Lyon",
      address: "45 cours Gambetta, 69003 Lyon",
      phone: "+33 4 78 90 12 34",
      email: "lyon@medicare.fr",
      hours: {
        "Lundi - Vendredi": "8h30 - 18h30",
        "Samedi": "9h00 - 16h00",
        "Dimanche": "Fermé"
      },
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.8958193348894!2d4.844207215674!3d45.759285979286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea516c7f1b5e%3A0x6c1d4b8c8c8c8c8c!2s45%20Cours%20Gambetta%2C%2069003%20Lyon!5e0!3m2!1sfr!2sfr!4v1695830000000!5m2!1sfr!2sfr",
      googleMapsLink: "https://maps.google.com/?q=45+cours+Gambetta,+69003+Lyon"
    },
    marseille: {
      name: "Polyclinique - Marseille",
      address: "78 avenue du Prado, 13008 Marseille",
      phone: "+33 4 91 56 78 90",
      email: "marseille@medicare.fr",
      hours: {
        "Lundi - Vendredi": "8h00 - 18h00",
        "Samedi": "9h00 - 15h00",
        "Dimanche": "Fermé"
      },
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.8958193348894!2d5.374207215674!3d43.269285979286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c6516c7f1b5e%3A0x6c1d4b8c8c8c8c8c!2s78%20Avenue%20du%20Prado%2C%2013008%20Marseille!5e0!3m2!1sfr!2sfr!4v1695830000000!5m2!1sfr!2sfr",
      googleMapsLink: "https://maps.google.com/?q=78+avenue+du+Prado,+13008+Marseille"
    }
  };

  const currentLocation = locations[selectedLocation as keyof typeof locations];

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
            Nos Cabinets Médicaux
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Retrouvez-nous dans nos trois centres médicaux modernes et accessibles, 
            équipés des dernières technologies pour votre prise en charge.
          </p>
        </div>

        {/* Sélecteur de localisation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-slate-100 rounded-lg p-1">
            {Object.entries(locations).map(([key, location]) => (
              <button
                key={key}
                onClick={() => setSelectedLocation(key)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition ${
                  selectedLocation === key
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {location.name.split(" - ")[1] || location.name.split(" - ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Informations du cabinet */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coordonnées */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                {currentLocation.name}
              </h2>
              
              <div className="space-y-4">
                {/* Adresse */}
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Adresse</div>
                    <div className="text-slate-600">{currentLocation.address}</div>
                    <a
                      href={currentLocation.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1 inline-block"
                    >
                      Voir sur Google Maps →
                    </a>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Téléphone</div>
                    <a
                      href={`tel:${currentLocation.phone}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {currentLocation.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Email</div>
                    <a
                      href={`mailto:${currentLocation.email}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {currentLocation.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Horaires d&apos;ouverture
              </h3>
              <div className="space-y-2">
                {Object.entries(currentLocation.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-slate-600">{day}</span>
                    <span className={`font-medium ${
                      hours === "Fermé" ? "text-red-600" : "text-slate-900"
                    }`}>
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <a
                  href="/rendez-vous"
                  className="flex items-center gap-3 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Prendre rendez-vous</span>
                </a>
                
                <a
                  href={`tel:${currentLocation.phone}`}
                  className="flex items-center gap-3 w-full p-3 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="font-medium">Appeler maintenant</span>
                </a>

                <a
                  href={currentLocation.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-3 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Itinéraire GPS</span>
                </a>
              </div>
            </div>
          </div>

          {/* Carte */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Localisation - {currentLocation.name}
                </h3>
              </div>
              
              <div className="relative">
                <iframe
                  src={currentLocation.mapUrl}
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title={`Carte de ${currentLocation.name}`}
                />
                
                {/* Overlay pour les informations */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
                  <div className="font-medium text-slate-900 mb-1">
                    {currentLocation.name}
                  </div>
                  <div className="text-sm text-slate-600 mb-3">
                    {currentLocation.address}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={currentLocation.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition"
                    >
                      Itinéraire
                    </a>
                    <a
                      href={`tel:${currentLocation.phone}`}
                      className="px-3 py-1 border border-slate-300 text-slate-700 text-xs rounded-md hover:bg-slate-50 transition"
                    >
                      Appeler
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations de transport */}
        <div className="mt-12 bg-slate-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center flex items-center justify-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
            Comment nous rejoindre
          </h3>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Transports en commun */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
              </div>
              <h4 className="font-medium text-slate-900 mb-2">Transports publics</h4>
              <div className="text-sm text-slate-600">
                {selectedLocation === "paris" && "Métro ligne 6 - Saint-Jacques"}
                {selectedLocation === "lyon" && "Métro ligne B - Gare Part-Dieu"}
                {selectedLocation === "marseille" && "Métro ligne 2 - Rond-Point du Prado"}
              </div>
            </div>

            {/* Voiture */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
              </div>
              <h4 className="font-medium text-slate-900 mb-2">En voiture</h4>
              <div className="text-sm text-slate-600">
                Parking gratuit disponible<br />
                Places handicapés réservées
              </div>
            </div>

            {/* Accessibilité */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              </div>
              <h4 className="font-medium text-slate-900 mb-2">Accessibilité</h4>
              <div className="text-sm text-slate-600">
                Accès PMR<br />
                Ascenseur disponible
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
