"use client";
import { useEffect, useMemo, useState } from "react";

type Specialty = { id: number; name: string };
type Doctor = {
  id: number;
  firstName: string;
  lastName: string;
  specialties: Specialty[];
};
type Slot = { id: number; start: string; end: string; doctorId: number; booked: boolean };

export default function RendezVousPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);

  const [specialtyId, setSpecialtyId] = useState<string>("");
  const [doctorId, setDoctorId] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [slotId, setSlotId] = useState<string>("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [urgency, setUrgency] = useState("routine");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/specialties");
      const data = await res.json();
      setSpecialties(data);
    })();
  }, []);

  useEffect(() => {
    if (!specialtyId) {
      setDoctors([]);
      setDoctorId("");
      return;
    }
    (async () => {
      const url = new URL(location.origin + "/api/doctors");
      url.searchParams.set("specialtyId", String(specialtyId));
      const res = await fetch(url);
      const data = await res.json();
      setDoctors(data);
    })();
  }, [specialtyId]);

  useEffect(() => {
    setSlots([]);
    setSlotId("");
    if (!doctorId || !day) return;
    (async () => {
      const url = new URL(location.origin + "/api/slots");
      url.searchParams.set("doctorId", String(doctorId));
      url.searchParams.set("day", day);
      const res = await fetch(url);
      const data = await res.json();
      setSlots(data);
    })();
  }, [doctorId, day]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!doctorId || !slotId || !firstName || !lastName || !email || !reason) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient: { firstName, lastName, email, phone },
          doctorId: Number(doctorId),
          slotId: Number(slotId),
          reason,
          urgency,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Erreur lors de la réservation");
      setSuccess("Rendez-vous confirmé ! Un email de confirmation vous sera envoyé.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  return (
    <div className="container py-12">
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Prendre Rendez-vous</h1>
      <p className="mt-2 text-slate-600 max-w-prose">
        Sélectionnez votre motif, nous proposerons le médecin adéquat et les créneaux disponibles.
      </p>

      <form onSubmit={submit} className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Spécialité</label>
            <select className="mt-1 w-full rounded border-slate-300" value={specialtyId} onChange={(e) => setSpecialtyId(e.target.value)}>
              <option value="">Sélectionner…</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Médecin</label>
            <select className="mt-1 w-full rounded border-slate-300" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} disabled={!specialtyId}>
              <option value="">Sélectionner…</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>{d.lastName.toUpperCase()} {d.firstName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Jour</label>
            <input type="date" className="mt-1 w-full rounded border-slate-300" value={day} onChange={(e) => setDay(e.target.value)} min={todayStr} disabled={!doctorId} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Créneau disponible</label>
            <select className="mt-1 w-full rounded border-slate-300" value={slotId} onChange={(e) => setSlotId(e.target.value)} disabled={!day || slots.length === 0}>
              <option value="">Sélectionner…</option>
              {slots.map((s) => {
                const start = new Date(s.start);
                const end = new Date(s.end);
                const label = start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " - " + end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                return <option key={s.id} value={s.id}>{label}</option>;
              })}
            </select>
            <p className="mt-1 text-xs text-slate-500">Les créneaux affichés sont en temps réel.</p>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Prénom</label>
              <input className="mt-1 w-full rounded border-slate-300" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Nom</label>
              <input className="mt-1 w-full rounded border-slate-300" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input type="email" className="mt-1 w-full rounded border-slate-300" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Téléphone</label>
              <input className="mt-1 w-full rounded border-slate-300" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Motif de consultation</label>
            <textarea className="mt-1 w-full rounded border-slate-300" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Urgence</label>
            <select className="mt-1 w-full rounded border-slate-300" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
              <option value="routine">Programmée</option>
              <option value="prioritaire">Prioritaire</option>
              <option value="urgence">Urgente</option>
            </select>
            <p className="mt-1 text-xs text-slate-500">En cas de symptômes graves, veuillez contacter le 112 immédiatement.</p>
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          {success && <div className="text-sm text-green-700">{success}</div>}
          <button disabled={loading} className="inline-flex items-center rounded-md bg-blue-600 text-white px-5 py-2 text-sm font-medium shadow-sm hover:bg-blue-700 disabled:opacity-60">
            {loading ? "Réservation…" : "Confirmer le rendez-vous"}
          </button>
        </div>
      </form>
    </div>
  );
}
