"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import type { Student, Parent, Teacher, StudentAssignment, Subject, Class, AttendanceRecord, AttendanceStatus, Announcement, Role, SubjectScore, Remark, Query, ManualQuiz, Assignment } from '@/lib/types';
import { mockStudents, mockParents, mockAssignments, mockTeachers, mockSubjects, mockClasses, mockAttendance, mockAnnouncements, mockQueries } from '@/lib/mock-data';

// Centralized state interface
interface AppData {
  students: Student[];
  parents: Parent[];
  teachers: Teacher[];
  subjects: Subject[];
  classes: Class[];
  attendance: AttendanceRecord[];
  announcements: Announcement[];
  queries: Query[];
  manualQuizzes: ManualQuiz[];
  assignments: Assignment[];
}

interface DataContextType extends AppData {
  addStudent: (student: Omit<Student, 'id' | 'avatarUrl' | 'riskLevel' | 'parentId' | 'scores' | 'averageScore' | 'remarks' | 'status' | 'admissionDate' | 'admissionGrade' | 'graduationYear' | 'terminationDate'>) => void;
  addTeacher: (teacher: Omit<Teacher, 'id' | 'avatarUrl'>) => void;
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  getStudentById: (studentId: string) => Student | undefined;
  getPendingAssignmentsForStudent: (studentId: string) => StudentAssignment[];
  updateStudent: (studentId: string, studentData: { name: string }) => void;
  updateTeacher: (teacherId: string, teacherData: { name: string }) => void;
  updateParent: (parentId: string, parentData: { name: string }) => void;
  saveAttendanceForClass: (records: { studentId: string; status: AttendanceStatus }[], classId: string, date: string) => void;
  addAnnouncement: (content: string, author: { id: string; name: string; role: Role }, scope: 'public' | 'internal') => void;
  addRemarkToStudent: (studentId: string, remarkContent: string, teacherName: string) => void;
  addQuery: (question: string, studentId: string, teacherId: string, author: { id: string; name: string; }) => void;
  answerQuery: (queryId: string, answer: string) => void;
  addManualQuiz: (quiz: Omit<ManualQuiz, 'id'>) => void;
  addAssignment: (assignment: Omit<Assignment, 'id' | 'status'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'atendalearn-data-v13'; // Increment version to avoid conflicts

// Helper to ensure all fields from Student are present after loading from localStorage
const mapStudentData = (s: Student): Student => ({
  ...s,
  remarks: s.remarks || [],
  status: s.status || 'ACTIVE',
  admissionDate: s.admissionDate || new Date().toISOString(),
});

// Initializer function to load data from localStorage or use mock data
const loadInitialData = (): AppData => {
  // This code runs only on the client, so we can safely check for `window`
  if (typeof window === 'undefined') {
    // Return a default empty state for server-side rendering
    return {
      students: [], parents: [], teachers: [], subjects: [], classes: [],
      attendance: [], announcements: [], queries: [], manualQuizzes: [], assignments: []
    };
  }
  try {
    // Clean up older versions if they exist
    localStorage.removeItem('atendalearn-data-v10');
    localStorage.removeItem('atendalearn-data-v11');
    localStorage.removeItem('atendalearn-data-v12');

    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Ensure data integrity on load
      return {
        students: (parsedData.students || mockStudents).map(mapStudentData),
        parents: parsedData.parents || mockParents,
        teachers: parsedData.teachers || mockTeachers,
        subjects: parsedData.subjects || mockSubjects,
        classes: parsedData.classes || mockClasses,
        attendance: parsedData.attendance || mockAttendance,
        announcements: parsedData.announcements || mockAnnouncements,
        queries: parsedData.queries || mockQueries,
        manualQuizzes: parsedData.manualQuizzes || [],
        assignments: parsedData.assignments || mockAssignments,
      };
    }
  } catch (error) {
    console.error("Failed to parse data from localStorage, using mock data.", error);
  }
  // Return fresh mock data if nothing in storage or if parsing fails
  return {
    students: mockStudents.map(mapStudentData),
    parents: mockParents,
    teachers: mockTeachers,
    subjects: mockSubjects,
    classes: mockClasses,
    attendance: mockAttendance,
    announcements: mockAnnouncements,
    queries: mockQueries,
    manualQuizzes: [],
    assignments: mockAssignments,
  };
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(loadInitialData);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we only interact with localStorage on the client after mount
  useEffect(() => {
    setIsMounted(true);
    setData(loadInitialData());
  }, []);

  // Effect to save the entire state to localStorage whenever it changes
  useEffect(() => {
    if (isMounted) {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error("Failed to save data to localStorage", error);
        }
    }
  }, [data, isMounted]);

  const addStudent = useCallback((studentData: Omit<Student, 'id' | 'avatarUrl' | 'riskLevel' | 'parentId' | 'scores' | 'averageScore' | 'remarks' | 'status' | 'admissionDate' | 'admissionGrade' | 'graduationYear' | 'terminationDate'>) => {
    setData(prevData => {
        const newStudentId = `student-gen-${Date.now()}`;
        const newParentId = `parent-gen-${Date.now()}`;
        
        const assignedSubjects: Subject[] = [];
        const numSubjects = 5;
        const shuffledSubjects = [...prevData.subjects].sort(() => 0.5 - Math.random());
        for (let j = 0; j < numSubjects && j < shuffledSubjects.length; j++) {
            assignedSubjects.push(shuffledSubjects[j]);
        }
        
        let totalScore = 0;
        const scores: SubjectScore[] = assignedSubjects.map(subject => {
            const score = 60 + Math.floor(Math.random() * 41);
            totalScore += score;
            return { subject: subject.name, score };
        });

        const averageScore = scores.length > 0 ? Math.round(totalScore / scores.length) : 0;

        const newStudent: Student = {
          ...studentData,
          id: newStudentId,
          parentId: newParentId,
          avatarUrl: `https://picsum.photos/seed/${newStudentId}/200/200`,
          riskLevel: 'LOW',
          scores,
          averageScore,
          remarks: [],
          status: 'ACTIVE',
          admissionDate: new Date().toISOString(),
          admissionGrade: 1,
        };

        const newParent: Parent = {
            id: newParentId,
            name: `${studentData.name.split(' ')[0]}'s Parent`,
            email: `parent.${studentData.email.split('@')[0]}@gmail.com`,
            avatarUrl: `https://picsum.photos/seed/${newParentId}/200/200`,
            childIds: [newStudentId],
        }

        return {
            ...prevData,
            students: [...prevData.students, newStudent],
            parents: [...prevData.parents, newParent]
        };
    });
  }, []);

  const addTeacher = useCallback((teacherData: Omit<Teacher, 'id' | 'avatarUrl'>) => {
    const newTeacherId = `teacher-gen-${Date.now()}`;
    const newTeacher: Teacher = {
        ...teacherData,
        id: newTeacherId,
        avatarUrl: `https://picsum.photos/seed/${newTeacherId}/200/200`,
    };
    setData(prev => ({ ...prev, teachers: [...prev.teachers, newTeacher]}));
  }, []);

  const addSubject = useCallback((subjectData: Omit<Subject, 'id'>) => {
    const newSubjectId = `subject-gen-${Date.now()}`;
    const newSubject: Subject = {
        ...subjectData,
        id: newSubjectId,
    };
    setData(prev => ({ ...prev, subjects: [...prev.subjects, newSubject]}));
  }, []);

  const getStudentById = useCallback((studentId: string) => {
    return data.students.find(s => s.id === studentId);
  }, [data.students]);

  const getPendingAssignmentsForStudent = useCallback((studentId: string) => {
    const student = data.students.find(s => s.id === studentId);
    if (!student) return [];
    return data.assignments
      .filter(a => a.classId === student.classId)
      .map(a => ({ ...a, studentId, status: 'PENDING' as const }));
  }, [data.students, data.assignments]);

  const updateStudent = useCallback((studentId: string, studentData: { name: string }) => {
    setData(prev => ({ ...prev, students: prev.students.map(s => s.id === studentId ? { ...s, ...studentData } : s) }));
  }, []);

  const updateTeacher = useCallback((teacherId: string, teacherData: { name: string }) => {
    setData(prev => ({ ...prev, teachers: prev.teachers.map(t => t.id === teacherId ? { ...t, ...teacherData } : t) }));
  }, []);

  const updateParent = useCallback((parentId: string, parentData: { name: string }) => {
    setData(prev => ({ ...prev, parents: prev.parents.map(p => p.id === parentId ? { ...p, ...parentData } : p) }));
  }, []);

  const saveAttendanceForClass = useCallback((records: { studentId: string; status: AttendanceStatus }[], classId: string, date: string) => {
    setData(prev => {
        const otherDayRecords = prev.attendance.filter(r => r.date !== date || r.classId !== classId);
        const newRecordsForDay: AttendanceRecord[] = records.map(r => ({ ...r, classId, date }));
        return { ...prev, attendance: [...otherDayRecords, ...newRecordsForDay] };
    });
  }, []);
  
  const addAnnouncement = useCallback((content: string, author: { id: string; name: string; role: Role }, scope: 'public' | 'internal') => {
    const newAnnouncement: Announcement = {
        id: `ann-${Date.now()}`,
        authorId: author.id,
        authorName: author.name,
        authorRole: author.role,
        content: content,
        date: new Date().toISOString(),
        scope: scope,
    };
    setData(prev => ({ ...prev, announcements: [newAnnouncement, ...prev.announcements] }));
  }, []);

  const addRemarkToStudent = useCallback((studentId: string, remarkContent: string, teacherName: string) => {
    setData(prev => ({
        ...prev,
        students: prev.students.map(s => {
            if (s.id === studentId) {
                const newRemark: Remark = { content: remarkContent, teacherName: teacherName, date: new Date().toISOString() };
                return { ...s, remarks: [newRemark, ...(s.remarks || [])] };
            }
            return s;
        })
    }));
  }, []);

  const addQuery = useCallback((question: string, studentId: string, teacherId: string, author: { id: string; name: string; }) => {
    const teacher = data.teachers.find(t => t.id === teacherId);
    if (!teacher) return;

    const newQuery: Query = {
        id: `query-${Date.now()}`,
        studentId: studentId,
        authorId: author.id,
        authorName: author.name,
        teacherId: teacherId,
        teacherName: teacher.name,
        question: question,
        questionDate: new Date().toISOString(),
    };
    setData(prev => ({ ...prev, queries: [newQuery, ...prev.queries] }));
  }, [data.teachers]);

  const answerQuery = useCallback((queryId: string, answer: string) => {
    setData(prev => ({
        ...prev,
        queries: prev.queries.map(q => q.id === queryId ? { ...q, answer: answer, answerDate: new Date().toISOString() } : q)
    }));
  }, []);

  const addManualQuiz = useCallback((quiz: Omit<ManualQuiz, 'id'>) => {
    const newQuiz: ManualQuiz = { ...quiz, id: `quiz-${Date.now()}` };
    setData(prev => ({ ...prev, manualQuizzes: [newQuiz, ...prev.manualQuizzes] }));
  }, []);

  const addAssignment = useCallback((assignmentData: Omit<Assignment, 'id' | 'status'>) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: `assign-gen-${Date.now()}`,
      status: 'PENDING',
    };
    setData(prev => ({ ...prev, assignments: [newAssignment, ...prev.assignments] }));
  }, []);

  if (!isMounted) {
    return null; // or a loading spinner
  }
  
  const value = { 
    ...data,
    addStudent, 
    addTeacher, 
    addSubject, 
    getStudentById, 
    getPendingAssignmentsForStudent,
    updateStudent,
    updateTeacher,
    updateParent,
    saveAttendanceForClass,
    addAnnouncement,
    addRemarkToStudent,
    addQuery,
    answerQuery,
    addManualQuiz,
    addAssignment,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
