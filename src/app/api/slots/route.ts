import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get("doctorId");
  const day = searchParams.get("day"); // YYYY-MM-DD

  if (!doctorId) {
    return NextResponse.json({ error: "doctorId requis" }, { status: 400 });
  }

  let dateFilter: { gte?: Date; lt?: Date } = {};
  if (day) {
    const start = new Date(day + "T00:00:00");
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    dateFilter = { gte: start, lt: end };
  }

  const slots = await prisma.slot.findMany({
    where: {
      doctorId: Number(doctorId),
      booked: false,
      ...(day ? { start: dateFilter } : {}),
    },
    orderBy: { start: "asc" },
  });

  return NextResponse.json(slots);
}
