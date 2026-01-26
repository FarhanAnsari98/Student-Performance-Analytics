"use client";
import { TeachersDataTable } from "@/components/dashboard/teachers-data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/context/data-context";
import { useAuth } from "@/context/auth-context";
import { AddTeacherDialog } from "@/components/dashboard/add-teacher-dialog";

export default function FacultiesPage() {
    const { teachers } = useData();
    const { role } = useAuth();

    return (
        <div className="space-y-8">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Faculty Directory</h1>
                    <p className="text-muted-foreground">
                        Browse and manage all faculties in the system.
                    </p>
                </div>
                {role === 'ADMIN' && <AddTeacherDialog />}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Faculties</CardTitle>
                    <CardDescription>A complete list of teachers currently employed.</CardDescription>
                </CardHeader>
                <CardContent>
                    <TeachersDataTable teachers={teachers} />
                </CardContent>
            </Card>
        </div>
    )
}
