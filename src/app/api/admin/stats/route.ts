import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await requireAdmin();

    const [totalPatients, activePatients, totalAppointments, totalDoctors] =
      await Promise.all([
        prisma.patient.count(),
        prisma.patient.count({ where: { isActive: true } }),
        prisma.appointment.count(),
        prisma.doctor.count(),
      ]);

    return NextResponse.json({
      totalPatients,
      activePatients,
      totalAppointments,
      totalDoctors,
    });
  } catch (error: any) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
