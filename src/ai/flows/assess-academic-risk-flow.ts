// AssessAcademicRiskWithLLM
'use server';
/**
 * @fileOverview Assesses a student's academic risk level using an LLM, combining performance data with pending assignments.
 *
 * - assessAcademicRisk - A function that handles the academic risk assessment process.
 * - AssessAcademicRiskInput - The input type for the assessAcademicRisk function.
 * - AssessAcademicRiskOutput - The return type for the assessAcademicRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessAcademicRiskInputSchema = z.object({
  attendancePercentage: z
    .number()
    .describe('The student attendance percentage.'),
  averageScore: z.number().describe('The student average score.'),
  pendingAssignments: z
    .number()
    .describe('The number of pending assignments.'),
});
export type AssessAcademicRiskInput = z.infer<typeof AssessAcademicRiskInputSchema>;

const AssessAcademicRiskOutputSchema = z.object({
  riskLevel: z
    .enum(['LOW', 'MEDIUM', 'HIGH'])
    .describe('The risk level of the student (LOW/MEDIUM/HIGH).'),
  rationale: z.string().describe('The rationale behind the risk level assessment.'),
});
export type AssessAcademicRiskOutput = z.infer<typeof AssessAcademicRiskOutputSchema>;

export async function assessAcademicRisk(input: AssessAcademicRiskInput): Promise<AssessAcademicRiskOutput> {
  return assessAcademicRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessAcademicRiskPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: AssessAcademicRiskInputSchema},
  output: {schema: AssessAcademicRiskOutputSchema},
  prompt: `You are an AI assistant that assesses the academic risk level of students.

You will receive the student's attendance percentage, average score, and the number of pending assignments.
Based on this information, you will determine the student's risk level (LOW, MEDIUM, or HIGH) and provide a rationale for your assessment.

Consider these factors when determining the risk level:
- Attendance: Lower attendance percentage indicates higher risk.
- Average Score: Lower average score indicates higher risk.
- Pending Assignments: More pending assignments indicate higher risk.

Output the risk level and your rationale, justifying how the student's performance summaries relate to the final risk evaluation.

Attendance Percentage: {{attendancePercentage}}
Average Score: {{averageScore}}
Pending Assignments: {{pendingAssignments}}

Risk Level:`,
});

const assessAcademicRiskFlow = ai.defineFlow(
  {
    name: 'assessAcademicRiskFlow',
    inputSchema: AssessAcademicRiskInputSchema,
    outputSchema: AssessAcademicRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
