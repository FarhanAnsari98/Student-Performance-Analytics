"use client";
import React from 'react';
import { assessAcademicRisk, AssessAcademicRiskOutput } from '@/ai/flows/assess-academic-risk-flow';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AlertCircle, BrainCircuit, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useData } from '@/context/data-context';

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
};

export function RiskAssessmentClient() {
  const [selectedStudentId, setSelectedStudentId] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [assessment, setAssessment] = React.useState<AssessAcademicRiskOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const { students, getPendingAssignmentsForStudent } = useData();

  const handleAssessment = async () => {
    const student = students.find(s => s.id === selectedStudentId);
    if (!student) {
        setError("Please select a student first.");
        return;
    }

    setIsLoading(true);
    setAssessment(null);
    setError(null);

    try {
      const pendingAssignments = getPendingAssignmentsForStudent(student.id).length;
      const result = await assessAcademicRisk({
        attendancePercentage: student.attendancePercentage,
        averageScore: student.averageScore,
        pendingAssignments,
      });
      setAssessment(result);
    } catch (e) {
      setError("Failed to generate assessment. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const student = students.find(s => s.id === selectedStudentId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Assessment Tool</CardTitle>
        <CardDescription>Select a student to generate an AI-powered risk analysis.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
          <SelectTrigger className="w-full md:w-[320px]">
            <SelectValue placeholder="Select a student..." />
          </SelectTrigger>
          <SelectContent>
            {students.map(student => (
              <SelectItem key={student.id} value={student.id}>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={student.avatarUrl} />
                    <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                  </Avatar>
                  <span>{student.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {student && (
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm'>
                <p><strong>Attendance:</strong> {student.attendancePercentage}%</p>
                <p><strong>Average Score:</strong> {student.averageScore}%</p>
                <p><strong>Pending Assignments:</strong> {getPendingAssignmentsForStudent(student.id).length}</p>
            </div>
        )}

      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Button onClick={handleAssessment} disabled={isLoading || !selectedStudentId}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Assessing...
            </>
          ) : (
            <>
              <BrainCircuit className="mr-2 h-4 w-4" />
              Assess Academic Risk
            </>
          )}
        </Button>
        {error && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {assessment && (
          <Card className="w-full bg-secondary">
            <CardHeader>
              <CardTitle className="text-xl font-headline flex items-center gap-2">
                Assessment for {student?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Risk Level: <span className="text-primary">{assessment.riskLevel}</span></h3>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Rationale:</h3>
                <p className="text-muted-foreground">{assessment.rationale}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardFooter>
    </Card>
  );
}
