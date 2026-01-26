"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, ShieldAlert, Library, GraduationCap, School, Contact } from "lucide-react";
import { StudentRiskChart } from "./student-risk-chart";
import { StudentsDataTable } from "./students-data-table";
import { useData } from '@/context/data-context';
import { AddStudentDialog } from './add-student-dialog';

export function AdminDashboard() {
  const { students, teachers, subjects, classes, parents } = useData();
  const totalStudents = students.length;
  const totalParents = parents.length;
  const totalTeachers = teachers.length;
  const totalSubjects = subjects.length;
  const totalClasses = classes.length;
  const highRiskStudents = students.filter(s => s.riskLevel === 'HIGH').length;

  const averageAttendance = totalStudents > 0 ? (
    students.reduce((acc, s) => acc + s.attendancePercentage, 0) / totalStudents
  ).toFixed(1) : "0.0";

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overall school performance at a glance.</p>
        </div>
        <AddStudentDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Parents</CardTitle>
            <Contact className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalParents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeachers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageAttendance}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Risk Students</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highRiskStudents}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">All Students</CardTitle>
          </CardHeader>
          <CardContent>
             <StudentsDataTable students={students} />
          </CardContent>
        </Card>
        <div className="col-span-4 lg:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Student Risk Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <StudentRiskChart students={students} />
              </CardContent>
            </Card>
             <div className="grid grid-cols-2 gap-4">
                <Link href="/dashboard/subjects">
                    <Card className="hover:bg-muted">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
                            <Library className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalSubjects}</div>
                        </CardContent>
                    </Card>
                </Link>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                        <School className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalClasses}</div>
                    </CardContent>
                </Card>
             </div>
        </div>
      </div>
    </div>
  );
}
