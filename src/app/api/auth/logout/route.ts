import { deleteSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await deleteSession();
    return NextResponse.json({ 
      success: true, 
      message: "Déconnexion réussie" 
    });
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return NextResponse.json({ 
      error: "Erreur serveur" 
    }, { status: 500 });
  }
}
