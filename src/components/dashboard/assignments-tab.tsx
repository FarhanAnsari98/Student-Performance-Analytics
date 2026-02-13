"use client";

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { useData } from '@/context/data-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel, FormDescription } from '@/components/ui/form';
import { BookCopy, CalendarIcon, Paperclip, PlusCircle } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import type { Assignment } from '@/lib/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const assignmentSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z.string().optional(),
  classId: z.string({ required_error: 'Please select a class.' }),
  dueDate: z.date({ required_error: 'A due date is required.'}),
  fileName: z.string().optional(),
});

type AssignmentFormValues = z.infer<typeof assignmentSchema>;

export function AssignmentsTab() {
  const { user, role } = useAuth();
  const { classes, teachers, addAssignment, assignments } = useData();

  const teacher = teachers.find(t => t.id === user?.id.replace('user-', ''));
  const assignedClasses = classes.filter(c => c.teacherId === teacher?.id);
  const teacherAssignments = assignments.filter(a => assignedClasses.some(c => c.id === a.classId)).sort((a,b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

  const form = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      title: "",
      description: "",
      fileName: "",
    },
  });

  function onSubmit(data: AssignmentFormValues) {
    if (!user) return;
    
    addAssignment({
        ...data,
        dueDate: data.dueDate.toISOString(),
    });
    form.reset();
  }

  if (role !== 'TEACHER') {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <BookCopy />
                    Assignments
                </CardTitle>
                <CardDescription>
                This is where teachers create and manage assignments. As a {role?.toLowerCase()}, you can view assigned tasks on your dashboard or on the dedicated assignments page.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[200px]">
                <p className="text-muted-foreground">This view is for teachers only.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className='space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>Create New Assignment</CardTitle>
          <CardDescription>
            Post a new assignment for one of your classes.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl><Input placeholder="e.g. History Chapter 5 Reading" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl><Textarea placeholder="Provide details about the assignment..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="classId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a class" /></SelectTrigger></FormControl>
                        <SelectContent>{assignedClasses.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Due Date</FormLabel>
                       <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
                <FormField
                  control={form.control}
                  name="fileName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2'>
                        <Paperclip className='h-4 w-4'/>
                        Attachment (File Name)
                      </FormLabel>
                      <FormControl><Input placeholder="e.g., worksheet.pdf (optional)" {...field} /></FormControl>
                      <FormDescription>Simulated file upload. Just enter a file name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </CardContent>
            <CardFooter>
              <Button type="submit">
                <PlusCircle className='mr-2 h-4 w-4'/>
                Create Assignment
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Posted Assignments</CardTitle>
          <CardDescription>A log of all assignments you have created.</CardDescription>
        </CardHeader>
        <CardContent>
          {teacherAssignments.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {teacherAssignments.map((assignment) => (
                <AccordionItem value={assignment.id} key={assignment.id}>
                  <AccordionTrigger>
                    <div className='flex flex-col text-left'>
                        <span>{assignment.title}</span>
                        <span className='text-xs text-muted-foreground'>{classes.find(c => c.id === assignment.classId)?.name} - Due {format(new Date(assignment.dueDate), "PPP")}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className='space-y-4 p-2 bg-muted/50 rounded-md'>
                      {assignment.description && <p className='text-sm'>{assignment.description}</p>}
                      {assignment.fileName && (
                        <p className="text-sm font-medium flex items-center gap-2"><Paperclip className='h-4 w-4'/> {assignment.fileName}</p>
                      )}
                       {!assignment.description && !assignment.fileName && (
                         <p className="text-sm text-muted-foreground">No description or attachment for this assignment.</p>
                       )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-sm text-muted-foreground">You have not created any assignments yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
