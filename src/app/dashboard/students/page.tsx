"use client";
import { StudentsDataTable } from "@/components/dashboard/students-data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/context/data-context";
import { useAuth } from "@/context/auth-context";
import { AddStudentDialog } from "@/components/dashboard/add-student-dialog";

export default function StudentsPage() {
    const { students } = useData();
    const { role } = useAuth();
    const activeStudents = students.filter(s => s.status === 'ACTIVE');
    return (
        <div className="space-y-8">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Student Directory</h1>
                    <p className="text-muted-foreground">
                        Browse and manage all active students in the system.
                    </p>
                </div>
                {role === 'ADMIN' && <AddStudentDialog />}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Active Students</CardTitle>
                    <CardDescription>A complete list of students currently enrolled.</CardDescription>
                </CardHeader>
                <CardContent>
                    <StudentsDataTable students={activeStudents} />
                </CardContent>
            </Card>
        </div>
    )
}
