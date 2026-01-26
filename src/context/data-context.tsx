"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { Student, Parent, Teacher, StudentAssignment, Subject, Class } from '@/lib/types';
import { mockStudents, mockParents, mockAssignments, mockTeachers, mockSubjects, mockClasses } from '@/lib/mock-data';

interface DataContextType {
  students: Student[];
  parents: Parent[];
  teachers: Teacher[];
  subjects: Subject[];
  classes: Class[];
  addStudent: (student: Omit<Student, 'id' | 'avatarUrl' | 'riskLevel' | 'parentId'>) => void;
  addTeacher: (teacher: Omit<Teacher, 'id' | 'avatarUrl'>) => void;
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  getStudentById: (studentId: string) => Student | undefined;
  getPendingAssignmentsForStudent: (studentId: string) => StudentAssignment[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [parents, setParents] = useState<Parent[]>(mockParents);
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [classes, setClasses] = useState<Class[]>(mockClasses);


  const addStudent = useCallback((studentData: Omit<Student, 'id' | 'avatarUrl' | 'riskLevel' | 'parentId'>) => {
    const newStudentId = `student-${students.length + 1}`;
    const newParentId = `parent-${parents.length + 1}`;

    const newStudent: Student = {
      ...studentData,
      id: newStudentId,
      parentId: newParentId,
      avatarUrl: `https://picsum.photos/seed/${newStudentId}/200/200`,
      riskLevel: 'LOW', // Default risk level
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
  }, [students, parents]);

  const addTeacher = useCallback((teacherData: Omit<Teacher, 'id' | 'avatarUrl'>) => {
    const newTeacherId = `teacher-${teachers.length + 1}`;
    const newTeacher: Teacher = {
        ...teacherData,
        id: newTeacherId,
        avatarUrl: `https://picsum.photos/seed/${newTeacherId}/200/200`,
    };
    setTeachers(prev => [...prev, newTeacher]);
  }, [teachers]);

  const addSubject = useCallback((subjectData: Omit<Subject, 'id'>) => {
    const newSubjectId = `subject-${subjects.length + 1}`;
    const newSubject: Subject = {
        ...subjectData,
        id: newSubjectId,
    };
    setSubjects(prev => [...prev, newSubject]);
  }, [subjects]);

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


  const value = { students, parents, teachers, subjects, classes, addStudent, addTeacher, addSubject, getStudentById, getPendingAssignmentsForStudent };

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
