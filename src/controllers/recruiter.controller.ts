import { Response, Request } from "express";
import { recruiterLoginSchema, recruiterRegisterSchema } from "../validators/recruiter.validator";
import { prisma } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
export async function RegisterRecruiter(req: Request, res: Response) {
    try {
        const body = req.body;
        const check = recruiterRegisterSchema.safeParse(body);
        if (!check.success) {
            res.status(400).json({ message: "Invalid request data", errors: check.error.message })
            return;
        }
        const recruiter = await prisma.recruiter.findUnique({
            where: {
                email: body.email
            }
        });
        if (recruiter) {
            res.status(409).json({ message: "Recruiter already exists" })
            return;
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const newRecruiter = await prisma.recruiter.create({
            data: {
                name: check.data.name,
                email: check.data.email,
                password: hashedPassword
            }
        });
        res.status(201).json({
            message: "Recruiter registered successfully",
            recruiter: {
                id: newRecruiter.id,
                name: newRecruiter.name,
                email: newRecruiter.email
            }
        });
        return;
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }

}
export async function LoginRecruiter(req: Request, res: Response) {
    try {
        const body = req.body;
        const check = recruiterLoginSchema.safeParse(body);
        if (!check.success) {
            res.status(400).json({ message: "Invalid request data", errors: check.error.message })
            return;
        }
        const recruiter = await prisma.recruiter.findUnique({
            where: {
                email: body.email
            }
        });
        if (!recruiter) {
            res.status(404).json({ message: "Recruiter not found" })
            return;
        }
        const isPasswordValid = await bcrypt.compare(body.password, recruiter.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" })
            return;
        }
        const token = await jwt.sign({ recruiterId: recruiter.id }, process.env.JWT_SECRET as string);
        res.status(200).json({ message: "Recruiter logged in successfully", token })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function GetMeRecruiter(req: Request, res: Response) {
    try {
        const recruiterId = req.body.recruiterId;
        const recruiter = await prisma.recruiter.findUnique({
            where: {
                id: recruiterId
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
        if (!recruiter) {
            res.status(404).json({ message: "Recruiter not found" })
            return;
        }
        res.status(200).json({ data: recruiter })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}
