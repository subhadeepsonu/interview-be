import z from "zod"

export const createJobApplication = z.object({
    jobPostId: z.string(),
    resumeText: z.string(),
})