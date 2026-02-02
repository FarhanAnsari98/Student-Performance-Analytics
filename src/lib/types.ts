import type { LucideIcon } from "lucide-react";

export type Role = "ADMIN" | "TEACHER" | "STUDENT" | "PARENT";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl: string;
};

export type SubjectScore = {
  subject: string;
  score: number;
};

export type Student = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  classId: string;
  attendancePercentage: number;
  scores: SubjectScore[];
  averageScore: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  parentId: string;
};

export type Parent = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  childIds: string[];
};

export type Teacher = {
  id:string;
  name: string;
  email: string;
  avatarUrl: string;
  subject: string;
};

export type Class = {
  id: string;
  name: string;
  teacherId: string;
  studentIds: string[];
};

export type Subject = {
  id: string;
  name: string;
};

export type Assignment = {
  id: string;
  classId: string;
  title: string;
  dueDate: string;
  status: "PENDING" | "SUBMITTED" | "GRADED";
};

export type StudentAssignment = Assignment & {
  studentId: string;
};

export type NavItem = {
  href: string;
  title: string;
  icon: LucideIcon;
  roles: Role[];
};

export type AttendanceStatus = "PRESENT" | "ABSENT";

export type AttendanceRecord = {
  studentId: string;
  classId: string;
  date: string; // "yyyy-MM-dd" format
  status: AttendanceStatus;
};

export type Announcement = {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: Role;
  content: string;
  date: string; // ISO string
  scope: 'public' | 'internal';
};

export type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  category: string;
};
