import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "app.db");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

export const db = new Database(dbPath);

db.exec(`
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS attendance_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL,
    class_id TEXT NOT NULL,
    date TEXT NOT NULL,
    status TEXT NOT NULL,
    UNIQUE(student_id, class_id, date)
  );

  CREATE TABLE IF NOT EXISTS subject_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL,
    subject TEXT NOT NULL,
    score INTEGER NOT NULL,
    updated_at TEXT NOT NULL,
    UNIQUE(student_id, subject)
  );
`);
