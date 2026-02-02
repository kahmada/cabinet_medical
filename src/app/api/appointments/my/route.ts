import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await requireAuth();

    const appointments = await prisma.appointment.findMany({
      where: {
        patientId: user.id,
      },
      include: {
        doctor: {
          select: {
            firstName: true,
            lastName: true,
            specialties: {
              select: {
                name: true,
              },
            },
          },
        },
        slot: {
          select: {
            start: true,
            end: true,
          },
        },
      },
      orderBy: {
        scheduledAt: "desc",
      },
    });

    return NextResponse.json({ appointments });
  } catch (error: any) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: error.message === "Non authentifié" ? 401 : 500 }
    );
  }
}
