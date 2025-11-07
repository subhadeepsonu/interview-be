import z from "zod"

export const createJobPostSchema = z.object({
    title: z.string(),
    jobDescription: z.string(),
    skills: z.array(z.string()),
    experience: z.number().positive(),
    minScore: z.number().positive()
})

export const updateJobPostSchema = z.object({
    title: z.string(),
    jobDescription: z.string(),
    skills: z.array(z.string()),
    experience: z.number().positive(),
    minScore: z.number().positive(),
    open: z.boolean()
})