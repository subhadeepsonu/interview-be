import z from "zod"
export const createInterviewSchema = z.object({
    userId: z.string(),
    applicationId: z.string(),
    jobPostId: z.string(),
    performanceReview: z.string(),
    performanceScore: z.number().min(0).max(10),
})

export const updateInterview = z.object({
    transcript: z.array(z.object({
        user: z.boolean(),
        message: z.string()
    }))
})