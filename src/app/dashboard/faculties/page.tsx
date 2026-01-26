"use client";
import { TeachersDataTable } from "@/components/dashboard/teachers-data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTeachers } from "@/lib/mock-data";

export default function FacultiesPage() {
    return (
        <div className="space-y-8">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Faculty Directory</h1>
                    <p className="text-muted-foreground">
                        Browse and manage all faculties in the system.
                    </p>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Faculties</CardTitle>
                    <CardDescription>A complete list of teachers currently employed.</CardDescription>
                </CardHeader>
                <CardContent>
                    <TeachersDataTable teachers={mockTeachers} />
                </CardContent>
            </Card>
        </div>
    )
}
