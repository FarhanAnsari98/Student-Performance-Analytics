import type { Student, Teacher, Parent, Class, Assignment, User, Role, Subject } from '@/lib/types';
import placeholderImages from '@/lib/placeholder-images.json';

const avatars = placeholderImages.placeholderImages.filter(p => p.id.startsWith('avatar-'));

export const mockStudents: Student[] = [
  { id: 'student-1', name: 'Alice Johnson', email: 'a.johnson@atendalearn.edu', avatarUrl: avatars.find(a => a.id === 'avatar-1')?.imageUrl || '', classId: 'class-10a', attendancePercentage: 95, averageScore: 88, riskLevel: 'LOW', parentId: 'parent-1' },
  { id: 'student-2', name: 'Bob Williams', email: 'b.williams@atendalearn.edu', avatarUrl: avatars.find(a => a.id === 'avatar-2')?.imageUrl || '', classId: 'class-10a', attendancePercentage: 82, averageScore: 76, riskLevel: 'MEDIUM', parentId: 'parent-2' },
  { id: 'student-3', name: 'Charlie Brown', email: 'c.brown@atendalearn.edu', avatarUrl: avatars.find(a => a.id === 'avatar-7')?.imageUrl || '', classId: 'class-10b', attendancePercentage: 98, averageScore: 92, riskLevel: 'LOW', parentId: 'parent-3' },
  { id: 'student-4', name: 'Diana Miller', email: 'd.miller@atendalearn.edu', avatarUrl: avatars.find(a => a.id === 'avatar-6')?.imageUrl || '', classId: 'class-10b', attendancePercentage: 75, averageScore: 68, riskLevel: 'HIGH', parentId: 'parent-4' },
  { id: 'student-5', name: 'Ethan Davis', email: 'e.davis@atendalearn.edu', avatarUrl: avatars.find(a => a.id === 'avatar-8')?.imageUrl || '', classId: 'class-10a', attendancePercentage: 91, averageScore: 85, riskLevel: 'LOW', parentId: 'parent-5' },
  // Adding more students
  { id: 'student-6', name: 'Fiona Green', email: 'f.green@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/115/200/200', classId: 'class-9a', attendancePercentage: 99, averageScore: 94, riskLevel: 'LOW', parentId: 'parent-6' },
  { id: 'student-7', name: 'George King', email: 'g.king@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/116/200/200', classId: 'class-9a', attendancePercentage: 88, averageScore: 81, riskLevel: 'MEDIUM', parentId: 'parent-7' },
  { id: 'student-8', name: 'Hannah White', email: 'h.white@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/117/200/200', classId: 'class-9b', attendancePercentage: 78, averageScore: 72, riskLevel: 'HIGH', parentId: 'parent-8' },
  { id: 'student-9', name: 'Ian Clark', email: 'i.clark@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/118/200/200', classId: 'class-9b', attendancePercentage: 92, averageScore: 89, riskLevel: 'LOW', parentId: 'parent-9' },
  { id: 'student-10', name: 'Julia Lewis', email: 'j.lewis@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/119/200/200', classId: 'class-11a', attendancePercentage: 96, averageScore: 91, riskLevel: 'LOW', parentId: 'parent-10' },
  { id: 'student-11', name: 'Kevin Walker', email: 'k.walker@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/120/200/200', classId: 'class-11a', attendancePercentage: 85, averageScore: 78, riskLevel: 'MEDIUM', parentId: 'parent-11' },
  { id: 'student-12', name: 'Laura Hall', email: 'l.hall@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/121/200/200', classId: 'class-11b', attendancePercentage: 93, averageScore: 88, riskLevel: 'LOW', parentId: 'parent-12' },
  { id: 'student-13', name: 'Mason Scott', email: 'm.scott@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/122/200/200', classId: 'class-11b', attendancePercentage: 68, averageScore: 62, riskLevel: 'HIGH', parentId: 'parent-13' },
  { id: 'student-14', name: 'Nora Adams', email: 'n.adams@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/123/200/200', classId: 'class-12a', attendancePercentage: 97, averageScore: 95, riskLevel: 'LOW', parentId: 'parent-14' },
  { id: 'student-15', name: 'Oscar Baker', email: 'o.baker@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/124/200/200', classId: 'class-12a', attendancePercentage: 90, averageScore: 84, riskLevel: 'LOW', parentId: 'parent-15' },
];

export const mockTeachers: Teacher[] = [
  { id: 'teacher-1', name: 'Mr. David Chen', email: 'd.chen@atendalearn.edu', avatarUrl: avatars.find(a => a.id === 'avatar-3')?.imageUrl || '', classIds: ['class-10a'], subject: 'Mathematics' },
  { id: 'teacher-2', name: 'Ms. Sarah Lee', email: 's.lee@atendalearn.edu', avatarUrl: "https://picsum.photos/seed/109/200/200", classIds: ['class-10b'], subject: 'Physics' },
  { id: 'teacher-3', name: 'Dr. Alan Turing', email: 'a.turing@atendalearn.edu', avatarUrl: "https://picsum.photos/seed/114/200/200", classIds: ['class-11a'], subject: 'Computer Science' },
  { id: 'teacher-4', name: 'Ms. Jane Austen', email: 'j.austen@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/125/200/200', classIds: ['class-11b'], subject: 'English' },
  { id: 'teacher-5', name: 'Mr. Herodotus', email: 'm.herodotus@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/126/200/200', classIds: ['class-9a', 'class-9b'], subject: 'History' },
  { id: 'teacher-6', name: 'Dr. Marie Curie', email: 'm.curie@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/127/200/200', classIds: ['class-12a'], subject: 'Biology' },
];

export const mockParents: Parent[] = [
  { id: 'parent-1', name: 'Maria Garcia', email: 'm.garcia@email.com', avatarUrl: avatars.find(a => a.id === 'avatar-5')?.imageUrl || '', childIds: ['student-1'] },
  { id: 'parent-2', name: 'John Smith', email: 'j.smith@email.com', avatarUrl: "https://picsum.photos/seed/110/200/200", childIds: ['student-2'] },
  { id: 'parent-3', name: 'Emily Brown', email: 'e.brown@email.com', avatarUrl: "https://picsum.photos/seed/111/200/200", childIds: ['student-3'] },
  { id: 'parent-4', name: 'David Miller', email: 'd.miller@email.com', avatarUrl: "https://picsum.photos/seed/112/200/200", childIds: ['student-4'] },
  { id: 'parent-5', name: 'Sophia Davis', email: 's.davis@email.com', avatarUrl: "https://picsum.photos/seed/113/200/200", childIds: ['student-5'] },
  // Adding more parents
  { id: 'parent-6', name: 'Olivia Green', email: 'o.green@email.com', avatarUrl: 'https://picsum.photos/seed/128/200/200', childIds: ['student-6'] },
  { id: 'parent-7', name: 'William King', email: 'w.king@email.com', avatarUrl: 'https://picsum.photos/seed/129/200/200', childIds: ['student-7'] },
  { id: 'parent-8', name: 'Ava White', email: 'a.white@email.com', avatarUrl: 'https://picsum.photos/seed/130/200/200', childIds: ['student-8'] },
  { id: 'parent-9', name: 'James Clark', email: 'j.clark@email.com', avatarUrl: 'https://picsum.photos/seed/131/200/200', childIds: ['student-9'] },
  { id: 'parent-10', name: 'Isabella Lewis', email: 'i.lewis@email.com', avatarUrl: 'https://picsum.photos/seed/132/200/200', childIds: ['student-10'] },
  { id: 'parent-11', name: 'Benjamin Walker', email: 'b.walker@email.com', avatarUrl: 'https://picsum.photos/seed/133/200/200', childIds: ['student-11'] },
  { id: 'parent-12', name: 'Mia Hall', email: 'm.hall@email.com', avatarUrl: 'https://picsum.photos/seed/134/200/200', childIds: ['student-12'] },
  { id: 'parent-13', name: 'Lucas Scott', email: 'l.scott@email.com', avatarUrl: 'https://picsum.photos/seed/135/200/200', childIds: ['student-13'] },
  { id: 'parent-14', name: 'Amelia Adams', email: 'a.adams@email.com', avatarUrl: 'https://picsum.photos/seed/136/200/200', childIds: ['student-14'] },
  { id: 'parent-15', name: 'Henry Baker', email: 'h.baker@email.com', avatarUrl: 'https://picsum.photos/seed/137/200/200', childIds: ['student-15'] },
];

export const mockClasses: Class[] = [
  { id: 'class-9a', name: 'Grade 9 - Section A', teacherId: 'teacher-5', studentIds: ['student-6', 'student-7'] },
  { id: 'class-9b', name: 'Grade 9 - Section B', teacherId: 'teacher-5', studentIds: ['student-8', 'student-9'] },
  { id: 'class-10a', name: 'Grade 10 - Section A', teacherId: 'teacher-1', studentIds: ['student-1', 'student-2', 'student-5'] },
  { id: 'class-10b', name: 'Grade 10 - Section B', teacherId: 'teacher-2', studentIds: ['student-3', 'student-4'] },
  { id: 'class-11a', name: 'Grade 11 - Section A', teacherId: 'teacher-3', studentIds: ['student-10', 'student-11'] },
  { id: 'class-11b', name: 'Grade 11 - Section B', teacherId: 'teacher-4', studentIds: ['student-12', 'student-13'] },
  { id: 'class-12a', name: 'Grade 12 - Section A', teacherId: 'teacher-6', studentIds: ['student-14', 'student-15'] },
];

export const mockSubjects: Subject[] = [
    { id: 'subject-1', name: 'Mathematics' },
    { id: 'subject-2', name: 'Physics' },
    { id: 'subject-3', name: 'Computer Science' },
    { id: 'subject-4', name: 'History' },
    { id: 'subject-5', name: 'Biology' },
    { id: 'subject-6', name: 'English' },
    { id: 'subject-7', name: 'Chemistry' },
];

export const mockAssignments: Assignment[] = [
  { id: 'assign-1', classId: 'class-10a', title: 'Algebra Homework 5', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' },
  { id: 'assign-2', classId: 'class-10a', title: 'Geometry Quiz', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' },
  { id: 'assign-3', classId: 'class-10b', title: 'Lab Report: Kinematics', dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' },
  { id: 'assign-4', classId: 'class-10b', title: 'Wave Optics Assignment', dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' },
  { id: 'assign-5', classId: 'class-9a', title: 'Ancient Civilizations Essay', dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' },
  { id: 'assign-6', classId: 'class-11a', title: 'Data Structures Project', dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' },
  { id: 'assign-7', classId: 'class-12a', title: 'Cellular Respiration Worksheet', dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' },
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
