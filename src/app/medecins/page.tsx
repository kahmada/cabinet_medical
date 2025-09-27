"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Specialty = { id: number; name: string };
type Location = { 
  id: number; 
  name: string; 
  address: string; 
  city: string; 
  country: string;
  _count: { doctors: number };
};
type Doctor = {
  id: number;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  experienceYrs: number;
  degrees?: string;
  bio?: string;
  specialties: Specialty[];
  location?: Location;
};

export default function MedecinsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Charger les spécialités
    fetch("/api/specialties")
      .then(res => res.json())
      .then(data => setSpecialties(data));

    // Charger les localisations
    fetch("/api/locations")
      .then(res => res.json())
      .then(data => setLocations(data));
  }, []);

  useEffect(() => {
    // Charger les médecins avec filtres
    const params = new URLSearchParams();
    if (selectedSpecialty) params.set("specialtyId", selectedSpecialty);
    if (selectedLocation) params.set("locationId", selectedLocation);

    fetch(`/api/doctors?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        let filteredDoctors = data;
        
        // Filtrer par terme de recherche
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filteredDoctors = data.filter((doctor: Doctor) =>
            doctor.firstName.toLowerCase().includes(term) ||
            doctor.lastName.toLowerCase().includes(term) ||
            doctor.specialties.some(s => s.name.toLowerCase().includes(term))
          );
        }
        
        setDoctors(filteredDoctors);
        setLoading(false);
      });
  }, [selectedSpecialty, selectedLocation, searchTerm]);

  const resetFilters = () => {
    setSelectedSpecialty("");
    setSelectedLocation("");
    setSearchTerm("");
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">Nos Médecins</h1>
        <p className="text-slate-600 max-w-prose">
          Découvrez nos praticiens qualifiés. Utilisez les filtres pour trouver le médecin qui correspond à vos besoins.
        </p>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
        <div className="grid gap-4 md:grid-cols-4">
          {/* Recherche */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Rechercher
            </label>
            <input
              type="text"
              placeholder="Nom ou spécialité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          {/* Spécialité */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Spécialité
            </label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Toutes les spécialités</option>
              {specialties.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </div>

          {/* Localisation */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Localisation
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Toutes les villes</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.city} ({location._count.doctors} médecins)
                </option>
              ))}
            </select>
          </div>

          {/* Reset */}
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Résultats */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-slate-500">Chargement des médecins...</div>
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-slate-500 mb-4">Aucun médecin trouvé avec ces critères.</div>
          <button
            onClick={resetFilters}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Voir tous les médecins
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Photo */}
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                {doctor.photoUrl ? (
                  <img
                    src={doctor.photoUrl}
                    alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                    {doctor.firstName[0]}{doctor.lastName[0]}
                  </div>
                )}
              </div>

              {/* Informations */}
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 text-lg mb-1">
                  Dr. {doctor.firstName} {doctor.lastName}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {doctor.specialties.map((specialty) => (
                    <span
                      key={specialty.id}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      {specialty.name}
                    </span>
                  ))}
                </div>

                {doctor.degrees && (
                  <p className="text-sm text-slate-600 mb-2">{doctor.degrees}</p>
                )}

                <p className="text-sm text-slate-600 mb-3 line-clamp-3">
                  {doctor.bio}
                </p>

                {doctor.location && (
                  <div className="text-xs text-slate-500 mb-3">
                    📍 {doctor.location.name}, {doctor.location.city}
                  </div>
                )}

                <div className="text-xs text-slate-500 mb-4">
                  {doctor.experienceYrs} ans d&apos;expérience
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/rendez-vous?doctorId=${doctor.id}`}
                    className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Prendre RDV
                  </Link>
                  <Link
                    href={`/medecins/${doctor.id}`}
                    className="px-3 py-2 border border-slate-300 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition"
                  >
                    Profil
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {!loading && doctors.length > 0 && (
        <div className="mt-8 text-center text-sm text-slate-500">
          {doctors.length} médecin{doctors.length > 1 ? 's' : ''} trouvé{doctors.length > 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
