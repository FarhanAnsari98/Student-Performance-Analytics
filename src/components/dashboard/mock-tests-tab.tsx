"use client";

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { useData } from '@/context/data-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { ClipboardCheck, PlusCircle, Trash2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import type { ManualQuiz } from '@/lib/types';

const questionSchema = z.object({
  questionText: z.string().min(10, { message: 'Question must be at least 10 characters.'}),
  options: z.tuple([
    z.string().min(1, { message: 'Option is required.' }),
    z.string().min(1, { message: 'Option is required.' }),
    z.string().min(1, { message: 'Option is required.' }),
    z.string().min(1, { message: 'Option is required.' }),
  ]),
  correctAnswerIndex: z.coerce.number().min(0).max(3),
});

const manualQuizSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  subject: z.string({ required_error: 'Please select a subject.' }),
  questions: z.array(questionSchema).min(1, { message: 'You must add at least one question.' }),
});

type ManualQuizFormValues = z.infer<typeof manualQuizSchema>;

export function MockTestsTab() {
  const { user, role } = useAuth();
  const { subjects, manualQuizzes, addManualQuiz } = useData();
  
  const form = useForm<ManualQuizFormValues>({
    resolver: zodResolver(manualQuizSchema),
    defaultValues: {
      title: "",
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions"
  });

  function onSubmit(data: ManualQuizFormValues) {
    if (!user) return;
    
    const newQuiz: Omit<ManualQuiz, 'id'> = {
      title: data.title,
      subject: data.subject,
      createdBy: user.id,
      questions: data.questions.map(q => ({
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.options[q.correctAnswerIndex],
      })),
    };
    addManualQuiz(newQuiz);
    form.reset();
  }

  const renderTeacherView = () => (
    <div className='space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>Create a New Mock Test</CardTitle>
          <CardDescription>
            Build a custom quiz for your students. Add questions, options, and select the correct answer.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quiz Title</FormLabel>
                      <FormControl><Input placeholder="e.g. Chapter 5: Cell Division" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger></FormControl>
                        <SelectContent>{subjects.map(s => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='space-y-4'>
                <FormLabel>Questions</FormLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="border p-4 rounded-lg space-y-4 relative">
                    <FormLabel className="text-base">Question {index + 1}</FormLabel>
                     <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4 text-destructive"/>
                        <span className="sr-only">Remove Question</span>
                    </Button>
                    <FormField
                      control={form.control}
                      name={`questions.${index}.questionText`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl><Textarea placeholder="Enter the question text" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='space-y-2'>
                      <FormLabel>Options & Correct Answer</FormLabel>
                      <FormField
                          control={form.control}
                          name={`questions.${index}.correctAnswerIndex`}
                          render={({ field }) => (
                            <FormItem>
                            <FormControl>
                              <RadioGroup onValueChange={field.onChange} defaultValue={String(field.value)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {[0, 1, 2, 3].map(optionIndex => (
                                    <div key={optionIndex} className="flex items-center gap-2">
                                      <FormControl>
                                          <RadioGroupItem value={String(optionIndex)} />
                                      </FormControl>
                                      <FormField
                                        control={form.control}
                                        name={`questions.${index}.options.${optionIndex}`}
                                        render={({ field: optionField }) => (
                                          <FormItem className='flex-1'>
                                            <FormControl>
                                                <Input placeholder={`Option ${optionIndex + 1}`} {...optionField}/>
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                  </div>
                ))}
                 <Button type="button" variant="outline" size="sm" onClick={() => append({ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                </Button>
                <FormField
                    control={form.control}
                    name="questions"
                    render={() => <FormMessage />}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Quiz</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Mock Tests</CardTitle>
          <CardDescription>Review the quizzes you have created.</CardDescription>
        </CardHeader>
        <CardContent>
          {manualQuizzes.filter(q => q.createdBy === user?.id).length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {manualQuizzes.filter(q => q.createdBy === user?.id).map((quiz) => (
                <AccordionItem value={quiz.id} key={quiz.id}>
                  <AccordionTrigger>{quiz.title} ({quiz.subject})</AccordionTrigger>
                  <AccordionContent>
                    <div className='space-y-6'>
                      {quiz.questions.map((q, index) => (
                          <div key={index} className='p-4 border rounded-lg space-y-2 bg-muted/50'>
                              <p className='font-semibold'>{index + 1}. {q.questionText}</p>
                              <ul className='pl-5 space-y-1 text-sm'>
                                  {q.options.map((opt, i) => (
                                      <li key={i} className={cn(
                                          {'text-green-600 font-bold': opt === q.correctAnswer}
                                      )}>
                                          {String.fromCharCode(97 + i)}. {opt}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-sm text-muted-foreground">You have not created any quizzes yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
  
  const renderComingSoon = () => (
     <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
            <ClipboardCheck />
            Mock Tests Platform
        </CardTitle>
        <CardDescription>
          This feature is currently in development. Teachers can now create quizzes manually. Soon, students will be able to take assigned mock tests here.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center min-h-[200px]">
          <p className="text-muted-foreground">Stay tuned!</p>
      </CardContent>
    </Card>
  )

  if (role === 'TEACHER') {
    return renderTeacherView();
  }

  return renderComingSoon();
}
