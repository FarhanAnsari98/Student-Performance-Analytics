import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const attendanceFile = path.join(dataDir, "attendance.json");
const marksFile = path.join(dataDir, "marks.json");

function readJson(file: string): any[] {
  try {
    const s = fs.readFileSync(file, "utf-8");
    return JSON.parse(s);
  } catch {
    return [];
  }
}

function writeJson(file: string, data: any[]) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export async function saveAttendanceRecords(classId: string, date: string, records: { studentId: string; status: "PRESENT" | "ABSENT" }[]) {
  const existing = readJson(attendanceFile);
  const filtered = existing.filter((r: any) => !(r.classId === classId && r.date === date));
  const toWrite = [
    ...filtered,
    ...records.map(r => ({ classId, date, studentId: r.studentId, status: r.status })),
  ];
  writeJson(attendanceFile, toWrite);
}

export async function saveSubjectScore(studentId: string, subject: string, score: number) {
  const existing = readJson(marksFile);
  const others = existing.filter((r: any) => !(r.studentId === studentId && r.subject === subject));
  const toWrite = [
    ...others,
    { studentId, subject, score: Math.round(score), updatedAt: new Date().toISOString() },
  ];
  writeJson(marksFile, toWrite);
}
