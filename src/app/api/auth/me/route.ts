import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getSession();
    
    if (!user) {
      return NextResponse.json({ 
        error: "Non authentifié" 
      }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Erreur lors de la récupération de la session:", error);
    return NextResponse.json({ 
      error: "Erreur serveur" 
    }, { status: 500 });
  }
}
