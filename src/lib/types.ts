import type { LucideIcon } from "lucide-react";

export type Role = "ADMIN" | "TEACHER" | "STUDENT" | "PARENT";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl: string;
};

export type Student = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  classId: string;
  attendancePercentage: number;
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
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  classIds: string[];
  subject: string;
};

export type Class = {
  id: string;
  name: string;
  teacherId: string;
  studentIds: string[];
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
