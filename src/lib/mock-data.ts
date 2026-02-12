import type { Student, Teacher, Parent, Class, Assignment, User, Role, Subject, AttendanceRecord, Announcement, SubjectScore, Query, StudentStatus } from '@/lib/types';
import { subYears, formatISO } from 'date-fns';


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

const grades = Array.from({ length: 12 }, (_, i) => i + 1);
const sections = ['A', 'B'];

const generatedClasses: Class[] = [];
const generatedTeachers: Teacher[] = [];
let generatedStudents: Student[] = [];
const generatedParents: Parent[] = [];

let classIdCounter = 1;
let teacherIdCounter = 1;
let studentIdCounter = 1;
let parentIdCounter = 1;

const teacherNames = [
    'Mr. David Chen', 'Ms. Sarah Lee', 'Dr. Alan Turing', 'Ms. Jane Austen', 'Mr. Herodotus', 'Dr. Marie Curie',
    'Mr. Lavoisier', 'Ms. Frida Kahlo', 'Mr. Mozart', 'Mr. Jesse Owens', 'Ms. Amelia Earhart', 'Mr. Isaac Newton',
    'Ms. Ada Lovelace', 'Mr. Nikola Tesla', 'Ms. Rosalind Franklin', 'Mr. Galileo Galilei', 'Ms. Rachel Carson', 'Mr. Leonardo da Vinci',
    'Ms. Maya Angelou', 'Mr. Albert Einstein', 'Ms. Grace Hopper', 'Mr. Carl Sagan', 'Ms. Dorothy Vaughan', 'Mr. Euclid'
];

const studentNamePool = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Lewis', 'Robinson', 'Walker',
    'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
    'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez'
];
const studentFirstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth',
    'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'
]


grades.forEach(grade => {
    sections.forEach(section => {
        const classId = `class-${classIdCounter++}`;
        const className = `Grade ${grade} - Section ${section}`;
        
        const teacherId = `teacher-${teacherIdCounter}`;
        const teacherName = teacherNames[teacherIdCounter - 1];
        const teacherEmail = `${teacherName.split(' ').join('.').toLowerCase()}@atendalearn.edu`;
        generatedTeachers.push({
            id: teacherId,
            name: teacherName,
            email: teacherEmail,
            avatarUrl: `https://picsum.photos/seed/${teacherId}/200`,
            subject: mockSubjects[(teacherIdCounter - 1) % mockSubjects.length].name,
        });
        teacherIdCounter++;

        const studentIds: string[] = [];
        for (let i = 0; i < 10; i++) {
            const studentId = `student-${studentIdCounter++}`;
            const parentId = `parent-${parentIdCounter++}`;
            studentIds.push(studentId);

            const studentFirstName = studentFirstNames[Math.floor(Math.random() * studentFirstNames.length)];
            const studentLastName = studentNamePool[Math.floor(Math.random() * studentNamePool.length)];
            const studentName = `${studentFirstName} ${studentLastName}`;
            const studentEmail = `${studentFirstName.charAt(0).toLowerCase()}.${studentLastName.toLowerCase()}@atendalearn.edu`;

            const riskLevels: ("LOW" | "MEDIUM" | "HIGH")[] = ['LOW', 'MEDIUM', 'HIGH'];

            const assignedSubjects: Subject[] = [];
            const numSubjects = Math.floor(Math.random() * 3) + 4; // 4 to 6 subjects
            const shuffledSubjects = [...mockSubjects].sort(() => 0.5 - Math.random());
            for (let j = 0; j < numSubjects; j++) {
                assignedSubjects.push(shuffledSubjects[j]);
            }
            
            let totalScore = 0;
            const scores: SubjectScore[] = assignedSubjects.map(subject => {
                const score = 60 + Math.floor(Math.random() * 41); // score between 60 and 100
                totalScore += score;
                return { subject: subject.name, score };
            });
    
            const averageScore = scores.length > 0 ? Math.round(totalScore / scores.length) : 0;
            
            generatedStudents.push({
                id: studentId,
                name: studentName,
                email: studentEmail,
                avatarUrl: `https://picsum.photos/seed/${studentId}/200`,
                classId: classId,
                attendancePercentage: 70 + Math.floor(Math.random() * 30),
                scores: scores,
                averageScore: averageScore,
                riskLevel: riskLevels[Math.floor(Math.random() * 3)],
                parentId: parentId,
                status: 'ACTIVE',
                admissionDate: subYears(new Date(), Math.min(grade -1, 5)).toISOString(), // Admitted in the past based on grade
            });

            generatedParents.push({
                id: parentId,
                name: `${studentFirstName}'s Parent`,
                email: `parent.${studentLastName.toLowerCase()}@email.com`,
                avatarUrl: `https://picsum.photos/seed/${parentId}/200`,
                childIds: [studentId],
            });
        }
        
        generatedClasses.push({
            id: classId,
            name: className,
            teacherId: teacherId,
            studentIds: studentIds,
        });
    });
});

// Generate some historical data
const historicalStudents: Student[] = [];
const currentYear = new Date().getFullYear();
for (let i = 0; i < 20; i++) {
    const studentId = `student-hist-${i}`;
    const parentId = `parent-hist-${i}`;
    const admissionYear = currentYear - (Math.floor(Math.random() * 5) + 4); // Admitted 4-8 years ago
    
    let status: StudentStatus;
    let graduationYear: number | undefined;
    let terminationDate: string | undefined;

    const rand = Math.random();
    if (rand < 0.7) { // Graduated
        status = 'GRADUATED';
        graduationYear = admissionYear + 4; // Assuming a 4 year course for simplicity
    } else { // Terminated
        status = 'TERMINATED';
        const terminationYear = admissionYear + Math.floor(Math.random() * 3) + 1; // Terminated after 1-3 years
        terminationDate = formatISO(new Date(terminationYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1));
    }

    const studentFirstName = studentFirstNames[Math.floor(Math.random() * studentFirstNames.length)];
    const studentLastName = studentNamePool[Math.floor(Math.random() * studentNamePool.length)];
    const studentName = `${studentFirstName} ${studentLastName}`;

    historicalStudents.push({
        id: studentId,
        name: studentName,
        email: `${studentFirstName.toLowerCase()}.${studentLastName.toLowerCase()}.hist@atendalearn.edu`,
        avatarUrl: `https://picsum.photos/seed/${studentId}/200`,
        classId: 'class-null', // Not in a current class
        attendancePercentage: 80 + Math.floor(Math.random() * 20),
        scores: [], // No scores for historical students for simplicity
        averageScore: 80 + Math.floor(Math.random() * 20),
        riskLevel: 'LOW',
        parentId: parentId,
        status: status,
        admissionDate: formatISO(new Date(admissionYear, 8, 1)),
        graduationYear,
        terminationDate,
    });

    generatedParents.push({
        id: parentId,
        name: `${studentFirstName}'s Parent (Hist)`,
        email: `parent.hist.${studentLastName.toLowerCase()}@email.com`,
        avatarUrl: `https://picsum.photos/seed/${parentId}/200`,
        childIds: [studentId],
    });
}

generatedStudents = [...generatedStudents, ...historicalStudents];


export const mockClasses: Class[] = generatedClasses;
export const mockTeachers: Teacher[] = generatedTeachers;
export const mockStudents: Student[] = generatedStudents;
export const mockParents: Parent[] = generatedParents;


export const mockAssignments: Assignment[] = [
  ...mockClasses.flatMap(c => ([
    { id: `assign-${c.id}-1`, classId: c.id, title: `${mockSubjects.find(s => mockTeachers.find(t => t.id === c.teacherId)?.subject === s.name)?.name || 'General'} Homework for ${c.name}`, dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' as const },
    { id: `assign-${c.id}-2`, classId: c.id, title: `${mockSubjects.find(s => mockTeachers.find(t => t.id === c.teacherId)?.subject === s.name)?.name || 'General'} Quiz for ${c.name}`, dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), status: 'PENDING' as const },
  ]))
];

export const mockAttendance: AttendanceRecord[] = [];

export const mockAnnouncements: Announcement[] = [
    {
        id: 'ann-1',
        authorId: 'user-admin',
        authorName: 'Dr. Evelyn Reed',
        authorRole: 'ADMIN',
        content: 'Welcome to the new school year! Please make sure to check your schedules and report any issues to the front office.',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        scope: 'public',
    },
    {
        id: 'ann-2',
        authorId: 'user-teacher-1',
        authorName: 'Mr. David Chen',
        authorRole: 'TEACHER',
        content: 'Reminder: The mathematics midterm exam will be held next Friday. A study guide has been posted on the class portal.',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        scope: 'public',
    },
    {
        id: 'ann-3',
        authorId: 'user-admin',
        authorName: 'Dr. Evelyn Reed',
        authorRole: 'ADMIN',
        content: 'All faculty members are requested to attend the staff meeting this Wednesday at 3 PM in the conference room.',
        date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        scope: 'internal',
    }
];

export const mockQueries: Query[] = [
    {
        id: 'query-1',
        studentId: mockStudents[0].id,
        authorId: `user-${mockParents[0].id}`,
        authorName: mockParents[0].name,
        teacherId: mockClasses.find(c => c.id === mockStudents[0].classId)!.teacherId,
        teacherName: mockTeachers.find(t => t.id === mockClasses.find(c => c.id === mockStudents[0].classId)!.teacherId)!.name,
        question: `What can we do to improve ${mockStudents[0].name}'s performance in Mathematics?`,
        questionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        answer: `Hi, thanks for reaching out. ${mockStudents[0].name} can focus on the extra worksheets I've shared. We can also schedule a meeting to discuss this further.`,
        answerDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'query-2',
        studentId: mockStudents[1].id,
        authorId: `user-${mockStudents[1].id}`,
        authorName: mockStudents[1].name,
        teacherId: mockClasses.find(c => c.id === mockStudents[1].classId)!.teacherId,
        teacherName: mockTeachers.find(t => t.id === mockClasses.find(c => c.id === mockStudents[1].classId)!.teacherId)!.name,
        question: 'I am having trouble with the latest algebra homework. Can I get some help?',
        questionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    }
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
