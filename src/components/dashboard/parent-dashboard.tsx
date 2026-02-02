"use client";
import React from 'react';
import { useAuth } from "@/context/auth-context";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BookCopy, Clock, TrendingUp, Users } from "lucide-react";
import { format } from 'date-fns';
import { useData } from '@/context/data-context';
import { SubjectPerformanceChart } from './subject-performance-chart';

const riskVariantMap: { [key: string]: "default" | "secondary" | "destructive" } = {
  LOW: "default",
  MEDIUM: "secondary",
  HIGH: "destructive",
};

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
};

export function ParentDashboard() {
  const { user } = useAuth();
  const { parents, students, getPendingAssignmentsForStudent } = useData();
  const parent = parents.find(p => p.id === user?.id.replace('user-', ''));
  const children = students.filter(s => parent?.childIds.includes(s.id));
  const [selectedChildId, setSelectedChildId] = React.useState(children[0]?.id || '');

  React.useEffect(() => {
    if (children.length > 0 && !selectedChildId) {
      setSelectedChildId(children[0].id);
    }
  }, [children, selectedChildId]);

  const selectedChild = children.find(c => c.id === selectedChildId);
  const pendingAssignments = selectedChild ? getPendingAssignmentsForStudent(selectedChild.id) : [];

  if (!parent) {
    return <div>Parent data not found.</div>;
  }
  
  if (children.length === 0) {
    return (
       <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Welcome, {parent.name}!</h1>
            <p className="text-muted-foreground">Your child's academic performance at a glance.</p>
        </div>
        <p>No child data found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold font-headline">Welcome, {parent.name}!</h1>
            <p className="text-muted-foreground">Your child's academic performance at a glance.</p>
        </div>
        {children.length > 1 && (
          <Select value={selectedChildId} onValueChange={setSelectedChildId}>
            <SelectTrigger className="w-full md:w-[280px]">
              <SelectValue placeholder="Select a child" />
            </SelectTrigger>
            <SelectContent>
              {children.map(child => (
                <SelectItem key={child.id} value={child.id}>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={child.avatarUrl} />
                            <AvatarFallback>{getInitials(child.name)}</AvatarFallback>
                        </Avatar>
                        <span>{child.name}</span>
                    </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {selectedChild && (
        <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{selectedChild.name}'s Attendance</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{selectedChild.attendancePercentage}%</div>
                <p className="text-xs text-muted-foreground">Overall attendance rate</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{selectedChild.averageScore}%</div>
                <p className="text-xs text-muted-foreground">Across all subjects</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Academic Risk</CardTitle>
                <Badge variant={riskVariantMap[selectedChild.riskLevel]}>{selectedChild.riskLevel}</Badge>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{selectedChild.riskLevel}</div>
                <p className="text-xs text-muted-foreground">Based on current performance</p>
            </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                <CardTitle className="font-headline">{selectedChild.name}'s Pending Assignments</CardTitle>
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
                    <p>No pending assignments for {selectedChild.name}. Great job!</p>
                )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Subject-wise Performance</CardTitle>
                    <CardDescription>Scores for {selectedChild.name} across different subjects.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SubjectPerformanceChart scores={selectedChild.scores} />
                </CardContent>
            </Card>
        </div>
        </>
      )}
    </div>
  );
}
