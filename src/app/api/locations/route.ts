import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const locations = await prisma.location.findMany({ 
    orderBy: { city: "asc" },
    include: {
      _count: {
        select: { doctors: true }
      }
    }
  });
  return NextResponse.json(locations);
}
