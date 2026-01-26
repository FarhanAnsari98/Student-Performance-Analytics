import { StudentsDataTable } from "@/components/dashboard/students-data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStudents } from "@/lib/mock-data";

export default function StudentsPage() {
    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold font-headline">Student Directory</h1>
                <p className="text-muted-foreground">
                    Browse and manage all students in the system.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Students</CardTitle>
                    <CardDescription>A complete list of students currently enrolled.</CardDescription>
                </CardHeader>
                <CardContent>
                    <StudentsDataTable students={mockStudents} />
                </CardContent>
            </Card>
        </div>
    )
}
