import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateAppointmentSchema = z.object({
  patient: z.object({
    email: z.string().email(),
    phone: z.string().min(6).optional(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  }),
  doctorId: z.number().int(),
  slotId: z.number().int(),
  reason: z.string().min(1),
  urgency: z.enum(["routine", "prioritaire", "urgence"]).default("routine"),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = CreateAppointmentSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const { patient, doctorId, slotId, reason, urgency } = parsed.data;

    // Ensure slot exists and is free and belongs to doctor
    const slot = await prisma.slot.findUnique({ where: { id: slotId } });
    if (!slot || slot.doctorId !== doctorId || slot.booked) {
      return NextResponse.json({ error: "Créneau indisponible" }, { status: 400 });
    }

    // Upsert patient by email
    const dbPatient = await prisma.patient.upsert({
      where: { email: patient.email },
      update: { phone: patient.phone, firstName: patient.firstName, lastName: patient.lastName },
      create: {
        email: patient.email,
        phone: patient.phone,
        firstName: patient.firstName,
        lastName: patient.lastName,
      },
    });

    // Create appointment and mark slot booked in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const appt = await tx.appointment.create({
        data: {
          patientId: dbPatient.id,
          doctorId,
          slotId,
          reason,
          urgency,
          scheduledAt: slot.start,
        },
        include: { patient: true, doctor: true, slot: true },
      });

      await tx.slot.update({ where: { id: slotId }, data: { booked: true } });
      return appt;
    });

    // TODO: Send email/SMS notification here

    return NextResponse.json({ success: true, appointment: result });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
