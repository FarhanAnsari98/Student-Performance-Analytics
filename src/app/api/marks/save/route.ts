import { NextResponse } from "next/server";
import { saveSubjectScore } from "@/lib/persistence";

export async function POST(req: Request) {
  const body = await req.json();
  const { studentId, subject, score } = body as {
    studentId: string;
    subject: string;
    score: number;
  };
  if (!studentId || !subject || typeof score !== "number") {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  await saveSubjectScore(studentId, subject, score);
  return NextResponse.json({ ok: true });
}
