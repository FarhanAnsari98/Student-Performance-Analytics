'use client';

import { useParams } from 'next/navigation';
import { useData } from '@/context/data-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { SubjectPerformanceChart } from '@/components/dashboard/subject-performance-chart';
import { ArrowLeft, BookCopy, Clock, TrendingDown, TrendingUp, Users, MessageSquare, Calendar, GraduationCap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
};

const riskVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  LOW: 'default',
  MEDIUM: 'secondary',
  HIGH: 'destructive',
};

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
    ACTIVE: 'default',
    GRADUATED: 'secondary',
    TERMINATED: 'destructive',
};

export default function StudentProfilePage() {
  const params = useParams();
  const studentId = params.studentId as string;
  const { getStudentById, classes, parents, getPendingAssignmentsForStudent } = useData();

  const student = getStudentById(studentId);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <AlertTriangle className="h-12 w-12 mb-4" />
        <h2 className="text-2xl font-bold">Student Not Found</h2>
        <p>The student profile you are looking for does not exist.</p>
        <Button asChild variant="link" className="mt-4">
            <Link href="/dashboard/students"><ArrowLeft className="mr-2 h-4 w-4" />Back to Students</Link>
        </Button>
      </div>
    );
  }

  const studentClass = classes.find(c => c.id === student.classId);
  const parent = parents.find(p => p.id === student.parentId);
  const pendingAssignments = getPendingAssignmentsForStudent(student.id);

  const weakPoints = student.scores
    .sort((a, b) => a.score - b.score)
    .slice(0, 2)
    .map(s => s.subject);

  return (
    <div className="space-y-8">
       <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={student.avatarUrl} alt={student.name} />
                <AvatarFallback className="text-3xl">{getInitials(student.name)}</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-4xl font-bold font-headline">{student.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                   <span>
                    {student.status === 'ACTIVE' 
                        ? (studentClass?.name || 'No Class Assigned')
                        : (student.admissionGrade ? `Admitted in Grade ${student.admissionGrade}` : 'No Class Assigned')
                    }
                   </span>
                   <Badge variant={statusVariantMap[student.status]}>{student.status}</Badge>
                </div>
            </div>
       </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{student.attendancePercentage}%</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{student.averageScore}%</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Academic Risk</CardTitle>
                     <Badge variant={riskVariantMap[student.riskLevel]}>{student.riskLevel}</Badge>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{student.riskLevel}</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Weak Subjects</CardTitle>
                    <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-sm font-medium">{weakPoints.join(', ')}</div>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Subject-wise Performance</CardTitle>
                    <CardDescription>Scores across different subjects.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SubjectPerformanceChart scores={student.scores} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Academic & Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                        <div>
                            <strong>Admission Date:</strong> {format(new Date(student.admissionDate), "PPP")}
                            {student.admissionGrade && ` (in Grade ${student.admissionGrade})`}
                        </div>
                    </div>
                    {student.status === 'GRADUATED' && student.graduationYear && (
                        <div className="flex items-center">
                            <GraduationCap className="h-5 w-5 mr-3 text-muted-foreground" />
                            <div>
                                <strong>Graduated:</strong> {student.graduationYear}
                            </div>
                        </div>
                    )}
                    {student.status === 'TERMINATED' && student.terminationDate && (
                         <div className="flex items-center">
                            <AlertTriangle className="h-5 w-5 mr-3 text-muted-foreground" />
                            <div>
                                <strong>Terminated on:</strong> {format(new Date(student.terminationDate), "PPP")}
                            </div>
                        </div>
                    )}
                     <div className="flex items-center">
                        <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                        <div>
                            <strong>Parent:</strong> {parent?.name || 'N/A'}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <Card>
                <CardHeader>
                    <CardTitle>Pending Assignments</CardTitle>
                    <CardDescription>Keep track of upcoming tasks.</CardDescription>
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
                    <p className="text-muted-foreground text-center py-4">No pending assignments for {student.name}. Great job!</p>
                )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-6 w-6" />
                        Teacher Remarks
                    </CardTitle>
                    <CardDescription>Feedback from teachers.</CardDescription>
                </CardHeader>
                <CardContent>
                    {student.remarks && student.remarks.length > 0 ? (
                        <ul className="space-y-4">
                        {student.remarks.map((remark, index) => (
                            <li key={index} className="flex flex-col gap-1 rounded-lg border p-4">
                                <p className="text-sm text-foreground/90">{remark.content}</p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>- {remark.teacherName}</span>
                                    <span>{format(new Date(remark.date), "PPP")}</span>
                                </div>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground text-center py-4">No remarks for {student.name} yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
