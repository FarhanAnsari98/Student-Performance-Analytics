"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import type { Student, Parent, Teacher, StudentAssignment, Subject, Class, AttendanceRecord, AttendanceStatus, Announcement, Role, SubjectScore, Remark } from '@/lib/types';
import { mockStudents, mockParents, mockAssignments, mockTeachers, mockSubjects, mockClasses, mockAttendance, mockAnnouncements } from '@/lib/mock-data';

interface DataContextType {
  students: Student[];
  parents: Parent[];
  teachers: Teacher[];
  subjects: Subject[];
  classes: Class[];
  attendance: AttendanceRecord[];
  announcements: Announcement[];
  addStudent: (student: Omit<Student, 'id' | 'avatarUrl' | 'riskLevel' | 'parentId' | 'scores' | 'averageScore' | 'remarks'>) => void;
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
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'atendalearn-data';


export function DataProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      const mapWithRemarks = (s: Student) => ({...s, remarks: s.remarks || []});

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setStudents((parsedData.students || []).map(mapWithRemarks));
        setParents(parsedData.parents || []);
        setTeachers(parsedData.teachers || []);
        setSubjects(parsedData.subjects || []);
        setClasses(parsedData.classes || []);
        setAttendance(parsedData.attendance || []);
        setAnnouncements(parsedData.announcements || []);
      } else {
        // If no data, use mock and store it
        setStudents(mockStudents.map(mapWithRemarks));
        setParents(mockParents);
        setTeachers(mockTeachers);
        setSubjects(mockSubjects);
        setClasses(mockClasses);
        setAttendance(mockAttendance);
        setAnnouncements(mockAnnouncements);
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      const mapWithRemarks = (s: Student) => ({...s, remarks: s.remarks || []});
      // Fallback to mock data if localStorage is corrupt
      setStudents(mockStudents.map(mapWithRemarks));
      setParents(mockParents);
      setTeachers(mockTeachers);
      setSubjects(mockSubjects);
      setClasses(mockClasses);
      setAttendance(mockAttendance);
      setAnnouncements(mockAnnouncements);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      try {
        const dataToStore = JSON.stringify({ students, parents, teachers, subjects, classes, attendance, announcements });
        localStorage.setItem(LOCAL_STORAGE_KEY, dataToStore);
      } catch (error) {
        console.error("Failed to save data to localStorage", error);
      }
    }
  }, [students, parents, teachers, subjects, classes, attendance, announcements, loading]);

  const addStudent = useCallback((studentData: Omit<Student, 'id' | 'avatarUrl' | 'riskLevel' | 'parentId' | 'scores' | 'averageScore' | 'remarks'>) => {
    const newStudentId = `student-gen-${Date.now()}`;
    const newParentId = `parent-gen-${Date.now()}`;
    
    const assignedSubjects: Subject[] = [];
    const numSubjects = 5;
    const shuffledSubjects = [...subjects].sort(() => 0.5 - Math.random());
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
    };

    const newParent: Parent = {
        id: newParentId,
        name: `${studentData.name.split(' ')[0]}'s Parent`,
        email: `parent.${studentData.email}`,
        avatarUrl: `https://picsum.photos/seed/${newParentId}/200/200`,
        childIds: [newStudentId],
    }

    setStudents(prev => [...prev, newStudent]);
    setParents(prev => [...prev, newParent]);
  }, [subjects]);

  const addTeacher = useCallback((teacherData: Omit<Teacher, 'id' | 'avatarUrl'>) => {
    const newTeacherId = `teacher-gen-${Date.now()}`;
    const newTeacher: Teacher = {
        ...teacherData,
        id: newTeacherId,
        avatarUrl: `https://picsum.photos/seed/${newTeacherId}/200/200`,
    };
    setTeachers(prev => [...prev, newTeacher]);
  }, []);

  const addSubject = useCallback((subjectData: Omit<Subject, 'id'>) => {
    const newSubjectId = `subject-gen-${Date.now()}`;
    const newSubject: Subject = {
        ...subjectData,
        id: newSubjectId,
    };
    setSubjects(prev => [...prev, newSubject]);
  }, []);

  const getStudentById = useCallback((studentId: string) => {
    return students.find(s => s.id === studentId);
  }, [students]);

  const getPendingAssignmentsForStudent = useCallback((studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return [];
    return mockAssignments
      .filter(a => a.classId === student.classId)
      .map(a => ({ ...a, studentId, status: 'PENDING' as const }));
  }, [students]);

  const updateStudent = useCallback((studentId: string, studentData: { name: string }) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, ...studentData } : s));
  }, []);

  const updateTeacher = useCallback((teacherId: string, teacherData: { name: string }) => {
    setTeachers(prev => prev.map(t => t.id === teacherId ? { ...t, ...teacherData } : t));
  }, []);

  const updateParent = useCallback((parentId: string, parentData: { name: string }) => {
    setParents(prev => prev.map(p => p.id === parentId ? { ...p, ...parentData } : p));
  }, []);

  const saveAttendanceForClass = useCallback((records: { studentId: string; status: AttendanceStatus }[], classId: string, date: string) => {
    setAttendance(prevAttendance => {
        const otherDayRecords = prevAttendance.filter(r => r.date !== date || r.classId !== classId);
        const newRecordsForDay: AttendanceRecord[] = records.map(r => ({ ...r, classId, date }));
        return [...otherDayRecords, ...newRecordsForDay];
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
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  }, []);

  const addRemarkToStudent = useCallback((studentId: string, remarkContent: string, teacherName: string) => {
    setStudents(prev => prev.map(s => {
        if (s.id === studentId) {
            const newRemark: Remark = {
                content: remarkContent,
                teacherName: teacherName,
                date: new Date().toISOString()
            };
            const existingRemarks = s.remarks || [];
            return { ...s, remarks: [newRemark, ...existingRemarks] };
        }
        return s;
    }));
}, []);


  const value = { 
    students, 
    parents, 
    teachers, 
    subjects, 
    classes, 
    attendance,
    announcements,
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
  };
  
  if (loading) {
    return null;
  }

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
