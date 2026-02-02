'use server';
/**
 * @fileOverview Generates a multiple-choice quiz using an LLM based on a given subject and topic.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  subject: z.string().describe('The subject of the quiz.'),
  topic: z.string().describe('The specific topic for the quiz.'),
  numQuestions: z
    .number()
    .min(1)
    .max(10)
    .describe('The number of questions to generate.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const QuizQuestionSchema = z.object({
    questionText: z.string().describe('The text of the question.'),
    options: z.array(z.string()).length(4).describe('An array of 4 possible answers.'),
    correctAnswer: z.string().describe('The correct answer from the options array.'),
});

const GenerateQuizOutputSchema = z.object({
  questions: z
    .array(QuizQuestionSchema)
    .describe('An array of generated quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an AI assistant for creating educational content. Generate a multiple-choice quiz based on the following criteria.
For each question, provide exactly 4 options. Ensure one of the options is the correct answer.

Subject: {{subject}}
Topic: {{topic}}
Number of Questions: {{numQuestions}}

Generate the quiz now.`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
