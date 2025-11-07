import { Request, Response } from "express";
import { prisma } from "../db";
import { createJobPostSchema, updateJobPostSchema } from "../validators/job-posts.validator";

export async function createJobPost(req: Request, res: Response) {
    try {
        const body = req.body;
        const check = createJobPostSchema.safeParse(body);
        if (!check.success) {
            res.status(400).json({ message: "Invalid request data", errors: check.error.message })
            return
        }
        const job = await prisma.jobPost.create({
            data: {
                experience: check.data.experience,
                title: check.data.title,
                jobDescription: check.data.jobDescription,
                skills: check.data.skills,
                minScore: check.data.minScore,
                recruiterId: req.body.recruiterId
            }
        })
        res.status(201).json({ message: "Job Post created successfully", data: job })
        return

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }

}
export async function getJobPostById(req: Request, res: Response) {
    try {
        const jobId = req.params.id
        const job = await prisma.jobPost.findUnique({
            where: {
                id: jobId,
                open: true
            },
            include: {
                applications: {
                    where: {
                        userId: req.body.userId
                    }
                }
            }
        })
        if (!job) {
            res.status(404).json({ message: "Job Post not found" })
            return
        }
        res.status(200).json({ data: job })
        return

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}
export async function getAllJobPosts(req: Request, res: Response) {
    try {
        const jobs = await prisma.jobPost.findMany()
        res.status(200).json({ data: jobs })
        return

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}
export async function updateJobPost(req: Request, res: Response) {
    try {
        const jobId = req.params.id
        const body = req.body
        const check = updateJobPostSchema.safeParse(body)
        if (!check.success) {
            res.status(400).json({ message: "Invalid request data", errors: check.error.message })
            return
        }
        const job = await prisma.jobPost.update({
            where: {
                id: jobId,
                recruiterId: req.body.recruiterId
            },
            data: {
                experience: check.data.experience,
                title: check.data.title,
                jobDescription: check.data.jobDescription,
                skills: check.data.skills,
                minScore: check.data.minScore,
                open: check.data.open
            }
        })

        res.status(200).json({ message: "Job Post updated successfully", data: job })
        return

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function getMyJobPosts(req: Request, res: Response) {
    try {
        const recruiterId = req.body.recruiterId
        const jobs = await prisma.jobPost.findMany({
            where: {
                recruiterId: recruiterId
            }
        })
        res.status(200).json({ data: jobs })
        return
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}