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
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generateQuiz, GenerateQuizOutput } from '@/ai/flows/generate-quiz-flow';
import { BrainCircuit, ClipboardCheck, Loader2, AlertCircle } from 'lucide-react';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';

const generateQuizSchema = z.object({
  subject: z.string({ required_error: "Please select a subject." }),
  topic: z.string().min(3, { message: "Topic must be at least 3 characters." }),
  numQuestions: z.coerce.number().min(1, "Must be at least 1.").max(10, "Cannot be more than 10."),
});


export function MockTestsTab() {
  const { role } = useAuth();
  const { subjects } = useData();
  const [isLoading, setIsLoading] = React.useState(false);
  const [generatedQuiz, setGeneratedQuiz] = React.useState<GenerateQuizOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof generateQuizSchema>>({
    resolver: zodResolver(generateQuizSchema),
    defaultValues: {
      topic: "",
      numQuestions: 5,
    },
  });

  async function onGenerateQuiz(values: z.infer<typeof generateQuizSchema>) {
    setIsLoading(true);
    setError(null);
    setGeneratedQuiz(null);
    try {
      const result = await generateQuiz(values);
      setGeneratedQuiz(result);
    } catch (e) {
      console.error(e);
      setError("Failed to generate quiz. The AI model might be unavailable. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const renderTeacherView = () => (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <BrainCircuit />
          AI Quiz Generator
        </CardTitle>
        <CardDescription>
          Create a mock test for your students by providing a subject and a topic. The AI will generate multiple-choice questions for you.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onGenerateQuiz)}>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects.map(s => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Photosynthesis" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numQuestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className='flex-col items-start gap-4'>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Quiz...
                </>
              ) : (
                "Generate Quiz"
              )}
            </Button>
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
          </CardFooter>
        </form>
      </Form>
      {generatedQuiz && (
        <>
        <Separator className='my-6'/>
        <CardContent>
            <CardTitle className='mb-4'>Generated Quiz: {form.getValues('topic')}</CardTitle>
            <div className='space-y-6'>
                {generatedQuiz.questions.map((q, index) => (
                    <div key={index} className='p-4 border rounded-lg space-y-2'>
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
                         <p className='text-xs text-primary pt-2'>Correct Answer: {q.correctAnswer}</p>
                    </div>
                ))}
            </div>
        </CardContent>
        </>
      )}
    </Card>
  );
  
  const renderComingSoon = () => (
     <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
            <ClipboardCheck />
            Mock Tests Platform
        </CardTitle>
        <CardDescription>
          This feature is currently in development. Teachers can now generate quizzes using AI. Soon, students will be able to take assigned mock tests here.
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
