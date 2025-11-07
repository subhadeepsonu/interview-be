import z from "zod"
export const recruiterLoginSchema = z.object({
    email: z.email(),
    password: z.string().min(4)
})

export const recruiterRegisterSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(4)
})