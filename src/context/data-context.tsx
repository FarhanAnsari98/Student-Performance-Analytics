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
  setStudentSubjectScore: (studentId: string, subjectName: string, score: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'atendalearn-data-v16';

const getInitialData = (): AppData => ({
    students: mockStudents,
    parents: mockParents,
    teachers: mockTeachers,
    subjects: mockSubjects,
    classes: mockClasses,
    attendance: mockAttendance,
    announcements: mockAnnouncements,
    queries: mockQueries,
    manualQuizzes: [],
    assignments: mockAssignments,
});

const mapStudentData = (s: any): Student => ({
  ...s,
  remarks: s.remarks || [],
  status: s.status || 'ACTIVE',
  admissionDate: s.admissionDate || new Date().toISOString(),
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData | undefined>(undefined);

  useEffect(() => {
    let loadedData: AppData;
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        loadedData = {
          students: (parsedData.students ?? []).map(mapStudentData),
          parents: parsedData.parents ?? [],
          teachers: parsedData.teachers ?? [],
          subjects: parsedData.subjects ?? [],
          classes: parsedData.classes ?? [],
          attendance: parsedData.attendance ?? [],
          announcements: parsedData.announcements ?? [],
          queries: parsedData.queries ?? [],
          manualQuizzes: parsedData.manualQuizzes ?? [],
          assignments: parsedData.assignments ?? [],
        };
      } else {
        loadedData = getInitialData();
      }
    } catch (error) {
      console.error("Error loading data from localStorage, falling back to mock data.", error);
      loadedData = getInitialData();
    }
    setData(loadedData);
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error("Failed to save data to localStorage", error);
      }
    }
  }, [data]);

  const addStudent = useCallback((studentData: Omit<Student, 'id' | 'avatarUrl' | 'riskLevel' | 'parentId' | 'scores' | 'averageScore' | 'remarks' | 'status' | 'admissionDate' | 'admissionGrade' | 'graduationYear' | 'terminationDate'>) => {
    setData(prevData => {
        if (!prevData) return undefined;
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
    setData(prev => {
        if (!prev) return undefined;
        const newTeacherId = `teacher-gen-${Date.now()}`;
        const newTeacher: Teacher = {
            ...teacherData,
            id: newTeacherId,
            avatarUrl: `https://picsum.photos/seed/${newTeacherId}/200/200`,
        };
        return { ...prev, teachers: [...prev.teachers, newTeacher]};
    });
  }, []);

  const addSubject = useCallback((subjectData: Omit<Subject, 'id'>) => {
    setData(prev => {
        if (!prev) return undefined;
        const newSubjectId = `subject-gen-${Date.now()}`;
        const newSubject: Subject = {
            ...subjectData,
            id: newSubjectId,
        };
        return { ...prev, subjects: [...prev.subjects, newSubject]};
    });
  }, []);

  const getStudentById = useCallback((studentId: string) => {
    return data?.students.find(s => s.id === studentId);
  }, [data?.students]);

  const getPendingAssignmentsForStudent = useCallback((studentId: string) => {
    if (!data) return [];
    const student = data.students.find(s => s.id === studentId);
    if (!student) return [];
    return data.assignments
      .filter(a => a.classId === student.classId)
      .map(a => ({ ...a, studentId, status: 'PENDING' as const }));
  }, [data]);

  const updateStudent = useCallback((studentId: string, studentData: { name: string }) => {
    setData(prev => prev ? ({ ...prev, students: prev.students.map(s => s.id === studentId ? { ...s, ...studentData } : s) }) : undefined);
  }, []);

  const updateTeacher = useCallback((teacherId: string, teacherData: { name: string }) => {
    setData(prev => prev ? ({ ...prev, teachers: prev.teachers.map(t => t.id === teacherId ? { ...t, ...teacherData } : t) }) : undefined);
  }, []);

  const updateParent = useCallback((parentId: string, parentData: { name: string }) => {
    setData(prev => prev ? ({ ...prev, parents: prev.parents.map(p => p.id === parentId ? { ...p, ...parentData } : p) }) : undefined);
  }, []);

  const saveAttendanceForClass = useCallback((records: { studentId: string; status: AttendanceStatus }[], classId: string, date: string) => {
    setData(prev => {
        if (!prev) return undefined;
        const otherDayRecords = prev.attendance.filter(r => r.date !== date || r.classId !== classId);
        const newRecordsForDay: AttendanceRecord[] = records.map(r => ({ ...r, classId, date }));
        const next = { ...prev, attendance: [...otherDayRecords, ...newRecordsForDay] };
        fetch('/api/attendance/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ classId, date, records }),
        }).catch(() => {});
        return next;
    });
  }, []);
  
  const addAnnouncement = useCallback((content: string, author: { id: string; name: string; role: Role }, scope: 'public' | 'internal') => {
    setData(prev => {
        if (!prev) return undefined;
        const newAnnouncement: Announcement = {
            id: `ann-${Date.now()}`,
            authorId: author.id,
            authorName: author.name,
            authorRole: author.role,
            content: content,
            date: new Date().toISOString(),
            scope: scope,
        };
        return { ...prev, announcements: [newAnnouncement, ...prev.announcements] };
    });
  }, []);

  const addRemarkToStudent = useCallback((studentId: string, remarkContent: string, teacherName: string) => {
    setData(prev => {
        if (!prev) return undefined;
        return {
            ...prev,
            students: prev.students.map(s => {
                if (s.id === studentId) {
                    const newRemark: Remark = { content: remarkContent, teacherName: teacherName, date: new Date().toISOString() };
                    return { ...s, remarks: [newRemark, ...(s.remarks || [])] };
                }
                return s;
            })
        }
    });
  }, []);

  const addQuery = useCallback((question: string, studentId: string, teacherId: string, author: { id: string; name: string; }) => {
    setData(prev => {
      if (!prev) return undefined;
      const teacher = prev.teachers.find(t => t.id === teacherId);
      if (!teacher) return prev;

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
      return { ...prev, queries: [newQuery, ...prev.queries] };
    });
  }, []);

  const answerQuery = useCallback((queryId: string, answer: string) => {
    setData(prev => {
        if (!prev) return undefined;
        return {
            ...prev,
            queries: prev.queries.map(q => q.id === queryId ? { ...q, answer: answer, answerDate: new Date().toISOString() } : q)
        }
    });
  }, []);

  const addManualQuiz = useCallback((quiz: Omit<ManualQuiz, 'id'>) => {
    setData(prev => {
        if (!prev) return undefined;
        const newQuiz: ManualQuiz = { ...quiz, id: `quiz-${Date.now()}` };
        return { ...prev, manualQuizzes: [newQuiz, ...prev.manualQuizzes] };
    });
  }, []);

  const addAssignment = useCallback((assignmentData: Omit<Assignment, 'id' | 'status'>) => {
    setData(prev => {
        if (!prev) return undefined;
        const newAssignment: Assignment = {
          ...assignmentData,
          id: `assign-gen-${Date.now()}`,
          status: 'PENDING',
        };
        return { ...prev, assignments: [newAssignment, ...prev.assignments] };
    });
  }, []);

  const setStudentSubjectScore = useCallback((studentId: string, subjectName: string, score: number) => {
    setData(prev => {
      if (!prev) return undefined;
      const students = prev.students.map(s => {
        if (s.id !== studentId) return s;
        const existing = s.scores.find(sc => sc.subject === subjectName);
        const newScores = existing
          ? s.scores.map(sc => sc.subject === subjectName ? { subject: subjectName, score } : sc)
          : [...s.scores, { subject: subjectName, score }];
        const total = newScores.reduce((acc, cur) => acc + cur.score, 0);
        const averageScore = newScores.length > 0 ? Math.round(total / newScores.length) : 0;
        const updated = { ...s, scores: newScores, averageScore };
        fetch('/api/marks/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId, subject: subjectName, score }),
        }).catch(() => {});
        return updated;
      });
      return { ...prev, students };
    });
  }, []);


  if (data === undefined) {
    return null; // Render nothing until data is loaded to prevent hydration errors.
  }
  
  const value: DataContextType = { 
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
    setStudentSubjectScore,
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
