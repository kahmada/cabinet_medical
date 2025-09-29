import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const RegisterSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  phone: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = RegisterSchema.safeParse(json);
    
    if (!parsed.success) {
      return NextResponse.json({ 
        error: "Données invalides", 
        details: parsed.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const { email, password, firstName, lastName, phone } = parsed.data;

    // Vérifier si l'email existe déjà
    const existingPatient = await prisma.patient.findUnique({
      where: { email }
    });

    if (existingPatient) {
      return NextResponse.json({ 
        error: "Un compte avec cet email existe déjà" 
      }, { status: 400 });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le patient
    const patient = await prisma.patient.create({
      data: {
        email,
        firstName,
        lastName,
        phone,
        // Note: Ajoutons un champ password au modèle Patient
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        createdAt: true,
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Inscription réussie !",
      patient 
    });

  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json({ 
      error: "Erreur serveur lors de l'inscription" 
    }, { status: 500 });
  }
}
