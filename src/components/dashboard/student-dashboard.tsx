"use client";
import React from 'react';
import { useAuth } from "@/context/auth-context";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookCopy, Clock, TrendingUp, Users, MessageSquare } from "lucide-react";
import { format, formatDistanceToNow } from 'date-fns';
import { useData } from '@/context/data-context';
import { SubjectPerformanceChart } from './subject-performance-chart';

const riskVariantMap: { [key: string]: "default" | "secondary" | "destructive" } = {
  LOW: "default",
  MEDIUM: "secondary",
  HIGH: "destructive",
};

export function StudentDashboard() {
  const { user } = useAuth();
  const { students, getPendingAssignmentsForStudent } = useData();
  const student = students.find(s => s.id === user?.id.replace('user-', ''));

  if (!student) {
    return <div>Student data not found.</div>;
  }
  
  const pendingAssignments = getPendingAssignmentsForStudent(student.id);
  const { remarks } = student;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome, {student.name}!</h1>
        <p className="text-muted-foreground">Your academic performance at a glance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{student.attendancePercentage}%</div>
            <p className="text-xs text-muted-foreground">Overall attendance rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{student.averageScore}%</div>
            <p className="text-xs text-muted-foreground">Across all subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Academic Risk</CardTitle>
            <Badge variant={riskVariantMap[student.riskLevel]}>{student.riskLevel}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{student.riskLevel}</div>
             <p className="text-xs text-muted-foreground">Based on current performance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Pending Assignments</CardTitle>
            <CardDescription>Here are your upcoming tasks. Keep it up!</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingAssignments.length > 0 ? (
              <ul className="space-y-4">
                {pendingAssignments.map(assignment => (
                  <li key={assignment.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary">
                    <BookCopy className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Due {format(new Date(assignment.dueDate), "PPP")}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pending assignments. Great job!</p>
            )}
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Subject-wise Performance</CardTitle>
                <CardDescription>Your scores across different subjects.</CardDescription>
            </CardHeader>
            <CardContent>
                <SubjectPerformanceChart scores={student.scores} />
            </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <MessageSquare className="h-6 w-6" />
                Teacher Remarks
            </CardTitle>
            <CardDescription>Feedback from your teachers.</CardDescription>
        </CardHeader>
        <CardContent>
            {remarks && remarks.length > 0 ? (
                <ul className="space-y-4">
                {remarks.map((remark, index) => (
                    <li key={index} className="flex flex-col gap-1 rounded-lg border p-4">
                        <p className="text-sm text-foreground/90">{remark.content}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>- {remark.teacherName}</span>
                            <span>{formatDistanceToNow(new Date(remark.date), { addSuffix: true })}</span>
                        </div>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-muted-foreground">No remarks from teachers yet.</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
