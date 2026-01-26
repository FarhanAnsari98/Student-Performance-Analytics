"use client";
import React from 'react';
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { StudentsDataTable } from "./students-data-table";
import { BookCopy, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { Separator } from "../ui/separator";
import { useData } from '@/context/data-context';

export function TeacherDashboard() {
  const { user } = useAuth();
  const { students, teachers, classes, getPendingAssignmentsForStudent } = useData();
  const teacher = teachers.find(t => t.id === user?.id.replace('user-', ''));
  
  if (!teacher) {
    return <div>Teacher data not found.</div>;
  }

  const assignedClasses = classes.filter(c => c.teacherId === teacher.id);
  const assignedStudentIds = assignedClasses.flatMap(c => c.studentIds);
  const assignedStudents = students.filter(s => assignedStudentIds.includes(s.id));
  const pendingAssignments = assignedStudents.flatMap(s => getPendingAssignmentsForStudent(s.id));
  
  const upcomingAssignments = pendingAssignments.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome, {teacher.name}</h1>
        <p className="text-muted-foreground">Here's what's happening in your classes today. You are teaching {teacher.subject}.</p>
      </div>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Your Students</CardTitle>
            <CardDescription>An overview of all students in your classes.</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentsDataTable students={assignedStudents} />
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Upcoming Deadlines</CardTitle>
            <CardDescription>Assignments due soon for your students.</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAssignments.length > 0 ? (
              <ul className="space-y-4">
                {upcomingAssignments.map((assignment, index) => (
                  <li key={`${assignment.id}-${index}`} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <BookCopy className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">
                        For: {students.find(s=>s.id === assignment.studentId)?.name}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Due {format(new Date(assignment.dueDate), "PPP")}
                      </p>
                    </div>
                    {index < upcomingAssignments.length - 1 && <Separator orientation="vertical" className="h-auto" />}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                <p className="font-semibold">All Clear!</p>
                <p className="text-sm text-muted-foreground">No upcoming deadlines for your students.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
