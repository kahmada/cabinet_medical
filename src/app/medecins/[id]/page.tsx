"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Specialty = { id: number; name: string };
type Location = { 
  id: number; 
  name: string; 
  address: string; 
  city: string; 
  country: string;
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

type Slot = {
  id: number;
  start: string;
  end: string;
  booked: boolean;
};

export default function DoctorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.id as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!doctorId) return;

    // Charger les informations du médecin
    fetch(`/api/doctors`)
      .then(res => res.json())
      .then((doctors: Doctor[]) => {
        const foundDoctor = doctors.find(d => d.id === Number(doctorId));
        if (foundDoctor) {
          setDoctor(foundDoctor);
          
          // Charger les créneaux disponibles pour demain
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          const dateStr = tomorrow.toISOString().split('T')[0];
          
          return fetch(`/api/slots?doctorId=${doctorId}&day=${dateStr}`);
        } else {
          throw new Error("Médecin non trouvé");
        }
      })
      .then(res => res?.json())
      .then(slots => {
        if (slots) setAvailableSlots(slots.slice(0, 6)); // Afficher seulement 6 créneaux
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [doctorId]);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">Chargement du profil...</div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <div className="text-red-600 mb-4">Médecin non trouvé</div>
          <Link 
            href="/medecins"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Retour à la liste des médecins
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      {/* Navigation */}
      <div className="mb-6">
        <Link 
          href="/medecins"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          ← Retour à la liste des médecins
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profil principal */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            {/* En-tête */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-start gap-6">
                {/* Photo */}
                <div className="flex-shrink-0">
                  {doctor.photoUrl ? (
                    <img
                      src={doctor.photoUrl}
                      alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                      {doctor.firstName[0]}{doctor.lastName[0]}
                    </div>
                  )}
                </div>

                {/* Informations de base */}
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h1>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {doctor.specialties.map((specialty) => (
                      <span
                        key={specialty.id}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                      >
                        {specialty.name}
                      </span>
                    ))}
                  </div>

                  {doctor.degrees && (
                    <p className="text-slate-600 mb-2">{doctor.degrees}</p>
                  )}

                  <div className="text-slate-500 text-sm">
                    {doctor.experienceYrs} ans d&apos;expérience
                  </div>
                </div>
              </div>
            </div>

            {/* Biographie */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">À propos</h2>
              <p className="text-slate-700 leading-relaxed">
                {doctor.bio || "Médecin qualifié et expérimenté, dévoué aux soins de ses patients."}
              </p>
            </div>

            {/* Localisation */}
            {doctor.location && (
              <div className="p-6 border-t border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Localisation</h2>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="font-medium text-slate-900 mb-1">
                    {doctor.location.name}
                  </div>
                  <div className="text-slate-700 text-sm">
                    {doctor.location.address}<br />
                    {doctor.location.city}, {doctor.location.country}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Rendez-vous */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Prendre rendez-vous
            </h2>

            {/* Créneaux disponibles */}
            {availableSlots.length > 0 ? (
              <div className="space-y-3 mb-6">
                <div className="text-sm text-slate-600 mb-3">
                  Créneaux disponibles demain :
                </div>
                {availableSlots.slice(0, 3).map((slot) => {
                  const startTime = new Date(slot.start).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  const endTime = new Date(slot.end).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  
                  return (
                    <div 
                      key={slot.id} 
                      className="flex items-center justify-between p-3 border border-slate-200 rounded-md"
                    >
                      <span className="text-sm text-slate-700">
                        {startTime} - {endTime}
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        Disponible
                      </span>
                    </div>
                  );
                })}
                
                {availableSlots.length > 3 && (
                  <div className="text-xs text-slate-500 text-center">
                    +{availableSlots.length - 3} autres créneaux
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-slate-500 mb-6">
                Aucun créneau disponible demain
              </div>
            )}

            {/* Boutons d'action */}
            <div className="space-y-3">
              <Link
                href={`/rendez-vous?doctorId=${doctor.id}`}
                className="w-full inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition text-center"
              >
                Réserver un créneau
              </Link>
              
              <button
                onClick={() => router.push('/contact')}
                className="w-full inline-flex items-center justify-center px-4 py-3 border border-slate-300 text-slate-700 rounded-md font-medium hover:bg-slate-50 transition"
              >
                Contacter le cabinet
              </button>
            </div>

            {/* Informations pratiques */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="text-xs text-slate-500 space-y-2">
                <div>• Consultation : 30 minutes</div>
                <div>• Paiement CB accepté</div>
                <div>• Tiers payant disponible</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
