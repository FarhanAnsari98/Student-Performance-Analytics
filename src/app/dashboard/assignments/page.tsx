"use client";

import { useAuth } from "@/context/auth-context";
import { useData } from "@/context/data-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCopy, CheckCircle, Clock, Paperclip } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AssignmentsPage() {
    const { user } = useAuth();
    const { students, getPendingAssignmentsForStudent } = useData();
    const { toast } = useToast();
    
    // This page is for students and parents. A parent would see the selected child's data.
    // For simplicity, we'll assume the logged-in user is a student or we are viewing for the first child.
    const student = students.find(s => s.id === user?.id.replace('user-', '') || s.parentId === user?.id.replace('user-',''));

    if (!student) {
        return <div>No student data available.</div>
    }

    const pendingAssignments = getPendingAssignmentsForStudent(student.id);

    const handleAttachmentClick = (fileName: string) => {
        toast({
          title: "Simulated File Download",
          description: `"${fileName}" would begin downloading. This is a simulation.`,
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Your Assignments</h1>
                <p className="text-muted-foreground">
                    All your pending assignments and deadlines in one place.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Pending Tasks</CardTitle>
                    <CardDescription>Stay on top of your coursework.</CardDescription>
                </CardHeader>
                <CardContent>
                    {pendingAssignments.length > 0 ? (
                        <ul className="space-y-4">
                        {pendingAssignments.map(assignment => (
                            <li key={assignment.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-secondary transition-colors">
                            <BookCopy className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                            <div className="flex-grow">
                                <p className="font-semibold text-base">{assignment.title}</p>
                                {assignment.description && (
                                    <p className="text-sm text-muted-foreground mt-1">{assignment.description}</p>
                                )}
                                <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-2">
                                    <Clock className="h-4 w-4" /> Due on {format(new Date(assignment.dueDate), "eeee, MMMM do")}
                                </p>
                                {assignment.fileName && (
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="mt-2"
                                        onClick={() => handleAttachmentClick(assignment.fileName!)}
                                    >
                                        <Paperclip className="h-4 w-4 mr-2"/>
                                        {assignment.fileName}
                                    </Button>
                                )}
                            </div>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
                            <CheckCircle className="h-12 w-12 text-green-500 mb-4"/>
                            <p className="text-lg font-semibold">All caught up!</p>
                            <p className="text-muted-foreground">You have no pending assignments.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
