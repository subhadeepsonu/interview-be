import { Agent } from '@openai/agents';
import z from 'zod';
const checkScore = "you are an expert resume scorer. You will be given a resume and a job description. Score the resume on a scale of 1 to 100 based on how well it matches the job description.and provide constructive feedback on how to improve it..";
export const ResumeAgent = new Agent({
    name: 'Resume Scorer',
    instructions: checkScore,
    outputType: z.object({
        score: z.number().min(1).max(100),
        feedback: z.string().max(500)
    })
});