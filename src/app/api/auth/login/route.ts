import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const LoginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = LoginSchema.safeParse(json);
    
    if (!parsed.success) {
      return NextResponse.json({ 
        error: "Données invalides", 
        details: parsed.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const { email, password } = parsed.data;

    // Trouver le patient
    const patient = await prisma.patient.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        password: true,
        createdAt: true,
      }
    });

    if (!patient) {
      return NextResponse.json({ 
        error: "Email ou mot de passe incorrect" 
      }, { status: 401 });
    }

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, patient.password);
    
    if (!passwordMatch) {
      return NextResponse.json({ 
        error: "Email ou mot de passe incorrect" 
      }, { status: 401 });
    }

    // Retourner les données patient sans le mot de passe
    const { password: _, ...patientData } = patient;

    return NextResponse.json({ 
      success: true, 
      message: "Connexion réussie !",
      patient: patientData 
    });

  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return NextResponse.json({ 
      error: "Erreur serveur lors de la connexion" 
    }, { status: 500 });
  }
}
