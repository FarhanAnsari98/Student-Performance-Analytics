import { NextResponse } from "next/server";
import { saveAttendanceRecords } from "@/lib/persistence";

export async function POST(req: Request) {
  const body = await req.json();
  const { classId, date, records } = body as {
    classId: string;
    date: string;
    records: { studentId: string; status: "PRESENT" | "ABSENT" }[];
  };
  if (!classId || !date || !Array.isArray(records)) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  await saveAttendanceRecords(classId, date, records);
  return NextResponse.json({ ok: true });
}
