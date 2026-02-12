"use client";

import { RecordsDataTable } from "@/components/dashboard/records-data-table";
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/context/data-context";

export default function RecordsPage() {
    const { students } = useData();

    const activeStudents = students.filter(s => s.status === 'ACTIVE');
    const alumni = students.filter(s => s.status === 'GRADUATED');
    const formerStudents = students.filter(s => s.status === 'TERMINATED');

    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold font-headline">Student Records</h1>
                <p className="text-muted-foreground">
                    Historical and current records of all students.
                </p>
            </div>
            <Tabs defaultValue="current" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="current">Current Students ({activeStudents.length})</TabsTrigger>
                    <TabsTrigger value="alumni">Alumni ({alumni.length})</TabsTrigger>
                    <TabsTrigger value="former">Former Students ({formerStudents.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="current">
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Current Students</CardTitle>
                            <CardDescription>All students currently enrolled in the school.</CardDescription>
                        </CardHeader>
                        <RecordsDataTable students={activeStudents} />
                    </Card>
                </TabsContent>
                <TabsContent value="alumni">
                     <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Alumni</CardTitle>
                            <CardDescription>Students who have successfully graduated.</CardDescription>
                        </CardHeader>
                        <RecordsDataTable students={alumni} />
                    </Card>
                </TabsContent>
                <TabsContent value="former">
                     <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Former Students</CardTitle>
                            <CardDescription>Students whose enrollment was terminated before graduation.</CardDescription>
                        </CardHeader>
                        <RecordsDataTable students={formerStudents} />
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
