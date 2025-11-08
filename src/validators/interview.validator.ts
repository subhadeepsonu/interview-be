import z from "zod"
export const createInterviewSchema = z.object({
    applicationId: z.string(),
})

export const updateInterviewSchema = z.object({
    transcript: z.array(z.any())
})