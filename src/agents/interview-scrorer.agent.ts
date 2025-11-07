import { Agent } from '@openai/agents';
import z from 'zod';
const checkScore = "you are an expert interview scorer. You will be given an interview transcript and a job description. Score the interview on a scale of 1 to 100 based on how well it matches the job description.and provide a brief review of max 500 characters highlighting the strengths and weaknesses of the candidate based on the transcript."
export const InterviewAgent = new Agent({
    name: 'Interview Scorer',
    instructions: checkScore,
    outputType: z.object({
        score: z.number().min(1).max(100),
        review: z.string().max(500)
    })
});