import z from "zod"

export const createJobApplicationSchema = z.object({
    jobPostId: z.string(),
    resumeText: z.string(),
})