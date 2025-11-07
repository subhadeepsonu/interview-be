import z from "zod"
export const createInterviewSchema = z.object({
    applicationId: z.string(),
    jobPostId: z.string(),
})

export const updateInterviewSchema = z.object({
    transcript: z.array(z.object({
        user: z.boolean(),
        message: z.string()
    }))
})