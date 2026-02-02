"use client";

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { useData } from '@/context/data-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { formatDistanceToNow } from 'date-fns';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '../ui/separator';
import { Send, Check, MailQuestion } from 'lucide-react';
import type { Student, Query } from '@/lib/types';

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
};

const querySchema = z.object({
  question: z.string().min(10, { message: "Query must be at least 10 characters." }).max(500),
});

const answerSchema = z.object({
    answer: z.string().min(10, { message: "Answer must be at least 10 characters." }).max(1000),
});

function QueryItem({ query }: { query: Query }) {
    return (
        <div className="flex flex-col gap-2 rounded-lg border p-4">
            <div className='flex items-center justify-between'>
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage />
                        <AvatarFallback>{getInitials(query.authorName)}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-sm">{query.authorName}</span>
                </div>
                <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(query.questionDate), { addSuffix: true })}</span>
            </div>
            <p className="text-sm text-foreground/90 pl-10">{query.question}</p>
            
            {query.answer && query.answerDate && (
                <>
                    <Separator className='my-2' />
                    <div className="flex flex-col gap-2 pl-8">
                        <div className='flex items-center justify-between'>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage />
                                    <AvatarFallback>{getInitials(query.teacherName)}</AvatarFallback>
                                </Avatar>
                                <span className="font-semibold text-sm">{query.teacherName} (Teacher)</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(query.answerDate), { addSuffix: true })}</span>
                        </div>
                        <p className="text-sm text-foreground/90 pl-10">{query.answer}</p>
                    </div>
                </>
            )}
        </div>
    );
}


export function QueriesTab() {
    const { user, role } = useAuth();
    const { queries, students, classes, addQuery, answerQuery } = useData();

    // State for Parent
    const childrenOfParent = React.useMemo(() => {
        if (role !== 'PARENT' || !user) return [];
        return students.filter(s => s.parentId === user.id.replace('user-', ''))
    }, [role, user, students]);

    const [selectedChildId, setSelectedChildId] = React.useState(childrenOfParent[0]?.id || '');
    
    React.useEffect(() => {
        if (childrenOfParent.length > 0 && !selectedChildId) {
            setSelectedChildId(childrenOfParent[0].id);
        }
    }, [childrenOfParent, selectedChildId]);

    const queryForm = useForm<z.infer<typeof querySchema>>({
        resolver: zodResolver(querySchema),
        defaultValues: { question: "" },
    });

    const answerForm = useForm<z.infer<typeof answerSchema>>({
        resolver: zodResolver(answerSchema),
        defaultValues: { answer: "" },
    });

    if (!user || !role) return null;

    const handleAskQuery = (values: z.infer<typeof querySchema>) => {
        let student: Student | undefined;
        if (role === 'STUDENT') {
            student = students.find(s => `user-${s.id}` === user.id);
        } else if (role === 'PARENT') {
            student = students.find(s => s.id === selectedChildId);
        }
        
        if (!student) return;
        const studentClass = classes.find(c => c.id === student?.classId);
        if (!studentClass) return;

        addQuery(values.question, student.id, studentClass.teacherId, { id: user.id, name: user.name });
        queryForm.reset();
    };

    const handleAnswerQuery = (queryId: string, values: z.infer<typeof answerSchema>) => {
        answerQuery(queryId, values.answer);
        answerForm.reset();
    }
    
    const renderStudentParentView = () => {
        const isParent = role === 'PARENT';
        
        let currentStudentId: string;
        if(isParent) {
            currentStudentId = selectedChildId;
        } else {
            const student = students.find(s => `user-${s.id}` === user.id);
            currentStudentId = student?.id || '';
        }

        const myQueries = queries.filter(q => q.studentId === currentStudentId && q.authorId === user.id).sort((a, b) => new Date(b.questionDate).getTime() - new Date(a.questionDate).getTime());

        return (
            <div className='space-y-6'>
                <Form {...queryForm}>
                    <form onSubmit={queryForm.handleSubmit(handleAskQuery)} className="space-y-4 border p-4 rounded-lg">
                        <CardTitle className="text-lg">Ask a New Query</CardTitle>
                        {isParent && childrenOfParent.length > 0 && (
                             <FormItem>
                                <FormLabel>Regarding Child</FormLabel>
                                <Select value={selectedChildId} onValueChange={setSelectedChildId}>
                                    <SelectTrigger className="w-full md:w-[280px]">
                                        <SelectValue placeholder="Select a child" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {childrenOfParent.map(child => <SelectItem key={child.id} value={child.id}>{child.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                        <FormField
                            control={queryForm.control}
                            name="question"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder="Type your question to the teacher here..." {...field} rows={3} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" disabled={queryForm.formState.isSubmitting || (isParent && !currentStudentId)}>
                                <Send className="mr-2 h-4 w-4" />
                                Send Query
                            </Button>
                        </div>
                    </form>
                </Form>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Your Query History</h3>
                    <div className="space-y-4">
                        {myQueries.length > 0 ? myQueries.map(q => <QueryItem key={q.id} query={q} />)
                        : <p className='text-muted-foreground text-sm'>You have not asked any queries yet.</p>}
                    </div>
                </div>
            </div>
        )
    };

    const renderTeacherView = () => {
        const teacherId = user.id.replace('user-', '');
        const teacherQueries = queries.filter(q => q.teacherId === teacherId).sort((a, b) => new Date(b.questionDate).getTime() - new Date(a.questionDate).getTime());
        const unansweredQueries = teacherQueries.filter(q => !q.answer);
        const answeredQueries = teacherQueries.filter(q => q.answer);

        return (
            <div className="w-full space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'><MailQuestion/>Unanswered Queries ({unansweredQueries.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                        {unansweredQueries.length > 0 ? unansweredQueries.map(query => (
                            <AccordionItem value={query.id} key={query.id}>
                                <AccordionTrigger>
                                    <div className="flex items-center gap-3 text-left">
                                        <Avatar className="h-8 w-8 flex-shrink-0">
                                            <AvatarImage />
                                            <AvatarFallback>{getInitials(query.authorName)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className='font-medium text-sm'>{query.authorName} <span className='text-muted-foreground font-normal'>(regarding {students.find(s=>s.id === query.studentId)?.name})</span></p>
                                            <p className='text-xs text-left text-muted-foreground'>{formatDistanceToNow(new Date(query.questionDate), { addSuffix: true })}</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-4 space-y-4 bg-muted/50 rounded-md">
                                    <p className="text-sm">{query.question}</p>
                                    <Form {...answerForm}>
                                        <form onSubmit={answerForm.handleSubmit((values) => handleAnswerQuery(query.id, values))} className="space-y-2">
                                        <FormField
                                            control={answerForm.control}
                                            name="answer"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea placeholder="Type your answer..." {...field} rows={3}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" size="sm">
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Answer
                                        </Button>
                                        </form>
                                    </Form>
                                </AccordionContent>
                            </AccordionItem>
                        )) : <p className='text-sm text-muted-foreground'>No unanswered queries.</p>}
                        </Accordion>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'><Check/>Answered Queries ({answeredQueries.length})</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        {answeredQueries.length > 0 ? answeredQueries.map(q => <QueryItem key={q.id} query={q} />)
                        : <p className='text-sm text-muted-foreground'>No answered queries yet.</p>}
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Private Queries</CardTitle>
                <CardDescription>
                    {role === 'TEACHER' 
                        ? "Respond to questions from students and parents."
                        : "Ask private questions directly to teachers."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                { (role === 'STUDENT' || role === 'PARENT') && renderStudentParentView() }
                { role === 'TEACHER' && renderTeacherView() }
                { role === 'ADMIN' && <p className='text-muted-foreground'>As an admin, you can view announcements. Private queries are between parents/students and teachers.</p>}
            </CardContent>
        </Card>
    );
}
