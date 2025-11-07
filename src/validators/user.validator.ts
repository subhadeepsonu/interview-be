import z from "zod"
export const userLoginSchema = z.object({
    email: z.email(),
    password: z.string().min(4)
})

export const userRegisterSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(4)
})