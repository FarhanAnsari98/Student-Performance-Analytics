import type { Student, Teacher, Parent, Class, Assignment, User, Role, Subject } from '@/lib/types';

export const mockSubjects: Subject[] = [
    { id: 'subject-1', name: 'Mathematics' },
    { id: 'subject-2', name: 'Physics' },
    { id: 'subject-3', name: 'Computer Science' },
    { id: 'subject-4', name: 'History' },
    { id: 'subject-5', name: 'Biology' },
    { id: 'subject-6', name: 'English' },
    { id: 'subject-7', name: 'Chemistry' },
    { id: 'subject-8', name: 'Art' },
    { id: 'subject-9', name: 'Music' },
    { id: 'subject-10', name: 'Physical Education' },
    { id: 'subject-11', name: 'Geography' },
    { id: 'subject-12', name: 'General Science' },
];

export const mockTeachers: Teacher[] = [
  { id: 'teacher-1', name: 'Mr. David Chen', email: 'd.chen@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/t1/200', classIds: ['class-10'], subject: 'Mathematics' },
  { id: 'teacher-2', name: 'Ms. Sarah Lee', email: 's.lee@atendalearn.edu', avatarUrl: "https://picsum.photos/seed/t2/200", classIds: ['class-11'], subject: 'Physics' },
  { id: 'teacher-3', name: 'Dr. Alan Turing', email: 'a.turing@atendalearn.edu', avatarUrl: "https://picsum.photos/seed/t3/200", classIds: ['class-12'], subject: 'Computer Science' },
  { id: 'teacher-4', name: 'Ms. Jane Austen', email: 'j.austen@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/t4/200', classIds: ['class-8'], subject: 'English' },
  { id: 'teacher-5', name: 'Mr. Herodotus', email: 'm.herodotus@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/t5/200', classIds: ['class-9'], subject: 'History' },
  { id: 'teacher-6', name: 'Dr. Marie Curie', email: 'm.curie@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/t6/200', classIds: ['class-7'], subject: 'Biology' },
  { id: 'teacher-7', name: 'Mr. Lavoisier', email: 'a.lavoisier@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/t7/200', classIds: ['class-6'], subject: 'Chemistry' },
  { id: 'teacher-8', name: 'Ms. Frida Kahlo', email: 'f.kahlo@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/t8/200', classIds: ['class-5'], subject: 'Art' },
  { id: 'teacher-9', name: 'Mr. Mozart', email: 'w.mozart@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/t9/200', classIds: ['class-4'], subject: 'Music' },
  { id: 'teacher-10', name: 'Mr. Jesse Owens', email: 'j.owens@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/t10/200', classIds: ['class-3'], subject: 'Physical Education' },
  { id: 'teacher-11', name: 'Ms. Amelia Earhart', email: 'a.earhart@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/t11/200', classIds: ['class-2'], subject: 'Geography' },
  { id: 'teacher-12', name: 'Mr. Isaac Newton', email: 'i.newton@atendalearn.edu', avatarUrl: 'https://picsum.photos/seed/t12/200', classIds: ['class-1'], subject: 'General Science' },
];

export const mockClasses: Class[] = [
  { id: 'class-1', name: 'Grade 1', teacherId: 'teacher-12', studentIds: ['student-1', 'student-2'] },
  { id: 'class-2', name: 'Grade 2', teacherId: 'teacher-11', studentIds: ['student-3', 'student-4'] },
  { id: 'class-3', name: 'Grade 3', teacherId: 'teacher-10', studentIds: ['student-5', 'student-6'] },
  { id: 'class-4', name: 'Grade 4', teacherId: 'teacher-9', studentIds: ['student-7', 'student-8'] },
  { id: 'class-5', name: 'Grade 5', teacherId: 'teacher-8', studentIds: ['student-9', 'student-10'] },
  { id: 'class-6', name: 'Grade 6', teacherId: 'teacher-7', studentIds: ['student-11', 'student-12'] },
  { id: 'class-7', name: 'Grade 7', teacherId: 'teacher-6', studentIds: ['student-13', 'student-14'] },
  { id: 'class-8', name: 'Grade 8', teacherId: 'teacher-4', studentIds: ['student-15', 'student-16'] },
  { id: 'class-9', name: 'Grade 9', teacherId: 'teacher-5', studentIds: ['student-17', 'student-18'] },
  { id: 'class-10', name: 'Grade 10', teacherId: 'teacher-1', studentIds: ['student-19', 'student-20'] },
  { id: 'class-11', name: 'Grade 11', teacherId: 'teacher-2', studentIds: ['student-21', 'student-22'] },
  { id: 'class-12', name: 'Grade 12', teacherId: 'teacher-3', studentIds: ['student-23', 'student-24'] },
];

export const mockStudents: Student[] = [
    { id: 'student-1', name: 'Alex Young', email: 'a.young@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s1/200`, classId: 'class-1', attendancePercentage: 95, averageScore: 88, riskLevel: 'LOW', parentId: 'parent-1' },
    { id: 'student-2', name: 'Bella Kim', email: 'b.kim@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s2/200`, classId: 'class-1', attendancePercentage: 92, averageScore: 85, riskLevel: 'LOW', parentId: 'parent-2' },
    { id: 'student-3', name: 'Chris Lee', email: 'c.lee@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s3/200`, classId: 'class-2', attendancePercentage: 85, averageScore: 78, riskLevel: 'MEDIUM', parentId: 'parent-3' },
    { id: 'student-4', name: 'David Chen', email: 'd.chen@student.edu', avatarUrl: `https://picsum.photos/seed/s4/200`, classId: 'class-2', attendancePercentage: 98, averageScore: 91, riskLevel: 'LOW', parentId: 'parent-4' },
    { id: 'student-5', name: 'Eva Wong', email: 'e.wong@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s5/200`, classId: 'class-3', attendancePercentage: 70, averageScore: 65, riskLevel: 'HIGH', parentId: 'parent-5' },
    { id: 'student-6', name: 'Frank Liu', email: 'f.liu@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s6/200`, classId: 'class-3', attendancePercentage: 96, averageScore: 89, riskLevel: 'LOW', parentId: 'parent-6' },
    { id: 'student-7', name: 'Grace Tran', email: 'g.tran@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s7/200`, classId: 'class-4', attendancePercentage: 88, averageScore: 82, riskLevel: 'MEDIUM', parentId: 'parent-7' },
    { id: 'student-8', name: 'Henry Nguyen', email: 'h.nguyen@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s8/200`, classId: 'class-4', attendancePercentage: 94, averageScore: 87, riskLevel: 'LOW', parentId: 'parent-8' },
    { id: 'student-9', name: 'Ivy Phan', email: 'i.phan@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s9/200`, classId: 'class-5', attendancePercentage: 91, averageScore: 84, riskLevel: 'LOW', parentId: 'parent-9' },
    { id: 'student-10', name: 'Jack Ma', email: 'j.ma@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s10/200`, classId: 'class-5', attendancePercentage: 75, averageScore: 70, riskLevel: 'HIGH', parentId: 'parent-10' },
    { id: 'student-11', name: 'Kate Ho', email: 'k.ho@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s11/200`, classId: 'class-6', attendancePercentage: 99, averageScore: 92, riskLevel: 'LOW', parentId: 'parent-11' },
    { id: 'student-12', name: 'Leo Wu', email: 'l.wu@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s12/200`, classId: 'class-6', attendancePercentage: 82, averageScore: 76, riskLevel: 'MEDIUM', parentId: 'parent-12' },
    { id: 'student-13', name: 'Mia Lin', email: 'm.lin@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s13/200`, classId: 'class-7', attendancePercentage: 95, averageScore: 88, riskLevel: 'LOW', parentId: 'parent-13' },
    { id: 'student-14', name: 'Noah Gao', email: 'n.gao@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s14/200`, classId: 'class-7', attendancePercentage: 93, averageScore: 86, riskLevel: 'LOW', parentId: 'parent-14' },
    { id: 'student-15', name: 'Olivia Sun', email: 'o.sun@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s15/200`, classId: 'class-8', attendancePercentage: 80, averageScore: 74, riskLevel: 'MEDIUM', parentId: 'parent-15' },
    { id: 'student-16', name: 'Peter Wang', email: 'p.wang@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s16/200`, classId: 'class-8', attendancePercentage: 65, averageScore: 60, riskLevel: 'HIGH', parentId: 'parent-16' },
    { id: 'student-17', name: 'Quinn Tang', email: 'q.tang@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s17/200`, classId: 'class-9', attendancePercentage: 97, averageScore: 90, riskLevel: 'LOW', parentId: 'parent-17' },
    { id: 'student-18', name: 'Ryan Fan', email: 'r.fan@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s18/200`, classId: 'class-9', attendancePercentage: 90, averageScore: 83, riskLevel: 'LOW', parentId: 'parent-18' },
    { id: 'student-19', name: 'Sophia Zhang', email: 's.zhang@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s19/200`, classId: 'class-10', attendancePercentage: 88, averageScore: 81, riskLevel: 'MEDIUM', parentId: 'parent-19' },
    { id: 'student-20', name: 'Tom Huang', email: 't.huang@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s20/200`, classId: 'class-10', attendancePercentage: 92, averageScore: 85, riskLevel: 'LOW', parentId: 'parent-20' },
    { id: 'student-21', name: 'Ursula He', email: 'u.he@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s21/200`, classId: 'class-11', attendancePercentage: 78, averageScore: 72, riskLevel: 'HIGH', parentId: 'parent-21' },
    { id: 'student-22', name: 'Victor Guo', email: 'v.guo@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s22/200`, classId: 'class-11', attendancePercentage: 96, averageScore: 89, riskLevel: 'LOW', parentId: 'parent-22' },
    { id: 'student-23', name: 'Wendy Cai', email: 'w.cai@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s23/200`, classId: 'class-12', attendancePercentage: 99, averageScore: 94, riskLevel: 'LOW', parentId: 'parent-23' },
    { id: 'student-24', name: 'Xavier Jiang', email: 'x.jiang@atendalearn.edu', avatarUrl: `https://picsum.photos/seed/s24/200`, classId: 'class-12', attendancePercentage: 85, averageScore: 79, riskLevel: 'MEDIUM', parentId: 'parent-24' },
];

export const mockParents: Parent[] = [
    ...Array.from({ length: 24 }, (_, i) => {
        const student = mockStudents[i];
        const studentNameParts = student.name.split(' ');
        const parentLastName = studentNameParts[studentNameParts.length - 1];
        return {
            id: `parent-${i + 1}`,
            name: `${i % 2 === 0 ? 'Mrs.' : 'Mr.'} ${parentLastName}`,
            email: `parent.${student.email}`,
            avatarUrl: `https://picsum.photos/seed/p${i + 1}/200`,
            childIds: [`student-${i + 1}`],
        };
    }),
];

export const mockAssignments: Assignment[] = [
  ...mockClasses.flatMap(c => ([
    { id: `assign-${c.id}-1`, classId: c.id, title: `Homework for ${c.name}`, dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' as const },
    { id: `assign-${c.id}-2`, classId: c.id, title: `Quiz for ${c.name}`, dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' as const },
  ]))
];

const adminUser: User = { id: 'user-admin', name: 'Dr. Evelyn Reed', email: 'e.reed@atendalearn.edu', role: 'ADMIN', avatarUrl: 'https://picsum.photos/seed/admin/200' };

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
