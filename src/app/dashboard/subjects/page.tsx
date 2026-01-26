"use client";
import { SubjectsDataTable } from "@/components/dashboard/subjects-data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/context/data-context";
import { useAuth } from "@/context/auth-context";
import { AddSubjectDialog } from "@/components/dashboard/add-subject-dialog";

export default function SubjectsPage() {
    const { subjects } = useData();
    const { role } = useAuth();

    return (
        <div className="space-y-8">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Subjects</h1>
                    <p className="text-muted-foreground">
                        Manage all subjects offered in the system.
                    </p>
                </div>
                {role === 'ADMIN' && <AddSubjectDialog />}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Subjects</CardTitle>
                    <CardDescription>A complete list of available subjects.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SubjectsDataTable subjects={subjects} />
                </CardContent>
            </Card>
        </div>
    )
}
