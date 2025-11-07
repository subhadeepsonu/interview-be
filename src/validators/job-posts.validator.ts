import z from "zod"

export const createJobApplicationSchema = z.object({
    title: z.string(),
    jobDescription: z.string(),
    skills: z.array(z.string()),
    experience: z.number().positive(),
    minScore: z.string()
})

export const updateJobApplicationSchema = z.object({
    title: z.string(),
    jobDescription: z.string(),
    skills: z.array(z.string()),
    experience: z.number().positive(),
    minScore: z.string(),
    open: z.boolean()
})