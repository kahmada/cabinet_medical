"use client";

import { useEffect, useState } from "react";
import { SessionUser } from "@/lib/session";
import Link from "next/link";

type Patient = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  _count: {
    appointments: number;
  };
};

type Stats = {
  totalPatients: number;
  totalAppointments: number;
  totalDoctors: number;
  activePatients: number;
};

export default function AdminDashboard({ user }: { user: SessionUser }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "patients" | "appointments">("overview");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [patientsRes, statsRes] = await Promise.all([
        fetch("/api/admin/patients"),
        fetch("/api/admin/stats"),
      ]);

      if (patientsRes.ok) {
        const data = await patientsRes.json();
        setPatients(data.patients);
      }

      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePatientStatus = async (patientId: number, isActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/patients/${patientId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (res.ok) {
        loadData();
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/espace-patient";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Dashboard Admin</h1>
              <p className="text-sm text-slate-600">
                Bienvenue, {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="px-4 py-2 text-slate-600 hover:text-slate-900"
              >
                Retour au site
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="mb-8 border-b border-slate-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-4 px-2 font-medium transition ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab("patients")}
              className={`pb-4 px-2 font-medium transition ${
                activeTab === "patients"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Patients ({patients.length})
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`pb-4 px-2 font-medium transition ${
                activeTab === "appointments"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Rendez-vous
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && stats && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="text-sm text-slate-600 mb-2">Total Patients</div>
              <div className="text-3xl font-bold text-slate-900">{stats.totalPatients}</div>
              <div className="text-xs text-green-600 mt-2">
                {stats.activePatients} actifs
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="text-sm text-slate-600 mb-2">Rendez-vous</div>
              <div className="text-3xl font-bold text-slate-900">{stats.totalAppointments}</div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="text-sm text-slate-600 mb-2">Médecins</div>
              <div className="text-3xl font-bold text-slate-900">{stats.totalDoctors}</div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="text-sm text-slate-600 mb-2">Taux d'activité</div>
              <div className="text-3xl font-bold text-slate-900">
                {stats.totalPatients > 0
                  ? Math.round((stats.activePatients / stats.totalPatients) * 100)
                  : 0}
                %
              </div>
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === "patients" && (
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Téléphone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      RDV
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Rôle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {patients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-slate-900">
                          {patient.firstName} {patient.lastName}
                        </div>
                        <div className="text-xs text-slate-500">
                          ID: {patient.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {patient.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {patient.phone || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {patient._count.appointments}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            patient.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {patient.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            patient.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {patient.isActive ? "Actif" : "Inactif"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => togglePatientStatus(patient.id, patient.isActive)}
                          className={`px-3 py-1 rounded-md text-xs font-medium ${
                            patient.isActive
                              ? "bg-red-100 text-red-700 hover:bg-red-200"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                          }`}
                        >
                          {patient.isActive ? "Désactiver" : "Activer"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-slate-600">Gestion des rendez-vous à venir...</p>
          </div>
        )}
      </div>
    </div>
  );
}
