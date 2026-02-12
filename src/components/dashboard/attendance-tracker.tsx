"use client";

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { useData } from '@/context/data-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, startOfDay } from 'date-fns';
import type { AttendanceStatus } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
};

type StudentAttendanceState = {
    [studentId: string]: AttendanceStatus;
}

export function AttendanceTracker() {
    const { user } = useAuth();
    const { teachers, classes, students, attendance, saveAttendanceForClass } = useData();
    const { toast } = useToast();

    const teacher = teachers.find(t => t.id === user?.id.replace('user-', ''));
    const assignedClasses = classes.filter(c => c.teacherId === teacher?.id);

    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
    const [selectedClassId, setSelectedClassId] = React.useState<string>('');
    const [studentAttendance, setStudentAttendance] = React.useState<StudentAttendanceState>({});

    const studentsInClass = React.useMemo(() => {
        return students.filter(s => s.classId === selectedClassId);
    }, [selectedClassId, students]);

    React.useEffect(() => {
        if (selectedClassId && selectedDate) {
            const dateStr = format(startOfDay(selectedDate), 'yyyy-MM-dd');
            const attendanceForDay = attendance.filter(a => a.classId === selectedClassId && a.date === dateStr);
            
            const newAttendanceState: StudentAttendanceState = {};
            studentsInClass.forEach(student => {
                const record = attendanceForDay.find(a => a.studentId === student.id);
                // Default to PRESENT if no record exists for a student on that day
                newAttendanceState[student.id] = record ? record.status : 'PRESENT';
            });
            setStudentAttendance(newAttendanceState);
        }
    }, [selectedClassId, selectedDate, attendance, studentsInClass]);

    const handleAttendanceChange = (studentId: string, status: AttendanceStatus) => {
        setStudentAttendance(prev => ({ ...prev, [studentId]: status }));
    };
    
    const handleSave = () => {
        if (!selectedClassId || !selectedDate) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Please select a class and a date.',
            });
            return;
        }

        const dateStr = format(startOfDay(selectedDate), 'yyyy-MM-dd');
        const recordsToSave = Object.entries(studentAttendance).map(([studentId, status]) => ({ studentId, status }));
        
        saveAttendanceForClass(recordsToSave, selectedClassId, dateStr);

        toast({
            title: 'Attendance Saved',
            description: `Attendance for ${classes.find(c => c.id === selectedClassId)?.name} on ${format(selectedDate, 'PPP')} has been updated.`,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mark Attendance</CardTitle>
                <CardDescription>Select a class and a date to mark attendance.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                <div className="flex justify-center">
                   <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                    />
                </div>
                <div className="space-y-4 flex-1">
                    <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a class..." />
                        </SelectTrigger>
                        <SelectContent>
                            {assignedClasses.map(c => (
                                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    
                    {selectedClassId ? (
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                           {studentsInClass.map(student => (
                               <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                                   <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={student.avatarUrl} alt={student.name} />
                                            <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                                        </Avatar>
                                        <span className='font-medium'>{student.name}</span>
                                   </div>
                                    <RadioGroup
                                        value={studentAttendance[student.id] || 'PRESENT'}
                                        onValueChange={(value: AttendanceStatus) => handleAttendanceChange(student.id, value)}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="PRESENT" id={`${student.id}-present`} />
                                            <Label htmlFor={`${student.id}-present`}>Present</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="ABSENT" id={`${student.id}-absent`} />
                                            <Label htmlFor={`${student.id}-absent`}>Absent</Label>
                                        </div>
                                    </RadioGroup>
                               </div>
                           ))}
                        </div>
                    ) : (
                        <div className='flex items-center justify-center h-40 text-muted-foreground'>
                            <p>Please select a class to see students.</p>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                 <Button onClick={handleSave} disabled={!selectedClassId || !selectedDate}>
                    <Save className="mr-2 h-4 w-4"/>
                    Save Attendance
                </Button>
            </CardFooter>
        </Card>
    );
}
