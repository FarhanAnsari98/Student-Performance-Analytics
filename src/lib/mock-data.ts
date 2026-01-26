import type { Student, Teacher, Parent, Class, Assignment, User, Role, Subject } from '@/lib/types';
import placeholderImages from '@/lib/placeholder-images.json';

const avatars = placeholderImages.placeholderImages.filter(p => p.id.startsWith('avatar-'));

export const mockStudents: Student[] = [
  { id: 'student-1', name: 'Alice Johnson', email: 'a.johnson@atendalearn.edu', avatarUrl: avatars.find(a => a.id === 'avatar-1')?.imageUrl || '', classId: 'class-10a', attendancePercentage: 95, averageScore: 88, riskLevel: 'LOW', parentId: 'parent-1' },
  { id: 'student-2', name: 'Bob Williams', email: 'b.williams@atendalearn.edu', avatarUrl: avatars.find(a => a.id === 'avatar-2')?.imageUrl || '', classId: 'class-10a', attendancePercentage: 82, averageScore: 76, riskLevel: 'MEDIUM', parentId: 'parent-2' },
  { id: 'student-3', name: 'Charlie Brown', email: 'c.brown@atendalearn.edu', avatarUrl: avatars.find(a => a.id === 'avatar-7')?.imageUrl || '', classId: 'class-10b', attendancePercentage: 98, averageScore: 92, riskLevel: 'LOW', parentId: 'parent-3' },
  { id: 'student-4', name: 'Diana Miller', email: 'd.miller@atendalearn.edu', avatarUrl: avatars.find(a => a.id === 'avatar-6')?.imageUrl || '', classId: 'class-10b', attendancePercentage: 75, averageScore: 68, riskLevel: 'HIGH', parentId: 'parent-4' },
  { id: 'student-5', name: 'Ethan Davis', email: 'e.davis@atendalearn.edu', avatarUrl: avatars.find(a => a.id === 'avatar-8')?.imageUrl || '', classId: 'class-10a', attendancePercentage: 91, averageScore: 85, riskLevel: 'LOW', parentId: 'parent-5' },
];

export const mockTeachers: Teacher[] = [
  { id: 'teacher-1', name: 'Mr. David Chen', email: 'd.chen@atendalearn.edu', avatarUrl: avatars.find(a => a.id === 'avatar-3')?.imageUrl || '', classIds: ['class-10a'], subject: 'Mathematics' },
  { id: 'teacher-2', name: 'Ms. Sarah Lee', email: 's.lee@atendalearn.edu', avatarUrl: "https://picsum.photos/seed/109/200/200", classIds: ['class-10b'], subject: 'Physics' },
  { id: 'teacher-3', name: 'Dr. Alan Turing', email: 'a.turing@atendalearn.edu', avatarUrl: "https://picsum.photos/seed/114/200/200", classIds: ['class-11a'], subject: 'Computer Science' },
];

export const mockParents: Parent[] = [
  { id: 'parent-1', name: 'Maria Garcia', email: 'm.garcia@email.com', avatarUrl: avatars.find(a => a.id === 'avatar-5')?.imageUrl || '', childIds: ['student-1'] },
  { id: 'parent-2', name: 'John Smith', email: 'j.smith@email.com', avatarUrl: "https://picsum.photos/seed/110/200/200", childIds: ['student-2'] },
  { id: 'parent-3', name: 'Emily Brown', email: 'e.brown@email.com', avatarUrl: "https://picsum.photos/seed/111/200/200", childIds: ['student-3'] },
  { id: 'parent-4', name: 'David Miller', email: 'd.miller@email.com', avatarUrl: "https://picsum.photos/seed/112/200/200", childIds: ['student-4'] },
  { id: 'parent-5', name: 'Sophia Davis', email: 's.davis@email.com', avatarUrl: "https://picsum.photos/seed/113/200/200", childIds: ['student-5'] },
];

export const mockClasses: Class[] = [
  { id: 'class-10a', name: 'Grade 10 - Section A', teacherId: 'teacher-1', studentIds: ['student-1', 'student-2', 'student-5'] },
  { id: 'class-10b', name: 'Grade 10 - Section B', teacherId: 'teacher-2', studentIds: ['student-3', 'student-4'] },
  { id: 'class-11a', name: 'Grade 11 - Section A', teacherId: 'teacher-3', studentIds: [] },
];

export const mockSubjects: Subject[] = [
    { id: 'subject-1', name: 'Mathematics' },
    { id: 'subject-2', name: 'Physics' },
    { id: 'subject-3', name: 'Computer Science' },
    { id: 'subject-4', name: 'History' },
    { id: 'subject-5', name: 'Biology' },
    { id: 'subject-6', name: 'English' },
];

export const mockAssignments: Assignment[] = [
  { id: 'assign-1', classId: 'class-10a', title: 'Algebra Homework 5', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' },
  { id: 'assign-2', classId: 'class-10a', title: 'Geometry Quiz', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' },
  { id: 'assign-3', classId: 'class-10b', title: 'Lab Report: Kinematics', dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' },
  { id: 'assign-4', classId: 'class-10b', title: 'Wave Optics Assignment', dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' },
];

const adminUser: User = { id: 'user-admin', name: 'Dr. Evelyn Reed', email: 'e.reed@atendalearn.edu', role: 'ADMIN', avatarUrl: avatars.find(a => a.id === 'avatar-4')?.imageUrl || '' };

export const mockCredentials: User[] = [
  adminUser,
  ...mockStudents.map(s => ({ id: `user-${s.id}`, name: s.name, email: s.email, role: 'STUDENT' as Role, avatarUrl: s.avatarUrl })),
  ...mockTeachers.map(t => ({ id: `user-${t.id}`, name: t.name, email: t.email, role: 'TEACHER' as Role, avatarUrl: t.avatarUrl })),
  ...mockParents.map(p => ({ id: `user-${p.id}`, name: p.name, email: p.email, role: 'PARENT' as Role, avatarUrl: p.avatarUrl })),
];


// Function to get pending assignments for a student
export const getPendingAssignmentsForStudent = (studentId: string) => {
  const student = mockStudents.find(s => s.id === studentId);
  if (!student) return [];
  return mockAssignments
    .filter(a => a.classId === student.classId)
    .map(a => ({ ...a, studentId, status: 'PENDING' as const }));
};
