import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const specialtyId = searchParams.get("specialtyId");
  const locationId = searchParams.get("locationId");

  const where: any = {};
  
  if (specialtyId) {
    where.specialties = { some: { id: Number(specialtyId) } };
  }
  
  if (locationId) {
    where.locationId = Number(locationId);
  }

  const doctors = await prisma.doctor.findMany({
    where: Object.keys(where).length > 0 ? where : undefined,
    include: { 
      specialties: true, 
      location: {
        include: {
          _count: {
            select: { doctors: true }
          }
        }
      }
    },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });
  return NextResponse.json(doctors);
}
