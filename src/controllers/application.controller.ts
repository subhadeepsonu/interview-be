import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../db";
import { createJobApplicationSchema } from "../validators/application.validator";
import { ResumeAgent } from "../agents/resume-scrorer.agent";
import { run } from "@openai/agents";

export async function createApplication(req: Request, res: Response) {
    try {
        const body = req.body;
        const userId = req.body.userId;
        const check = createJobApplicationSchema.safeParse(body);
        if (!check.success) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid request data", errors: check.error.message });
            return;
        }
        console.log("Creating application for user:", userId, "for job post:", body.jobPostId);
        const jobPost = await prisma.jobPost.findUnique({
            where: {
                id: body.jobPostId
            }
        });
        if (!jobPost) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Job Post not found" });
            return;
        }
        console.log("Job Post found:", jobPost.title);

        const existingApplication = await prisma.application.findFirst({
            where: {
                userId: userId,
                jobPostId: body.jobPostId,
            }
        });
        console.log("Existing application check:", existingApplication);
        if (existingApplication) {
            res.status(StatusCodes.CONFLICT).json({ message: "You have already applied for this job" });
            return;
        }
        console.log("No existing application found, proceeding to create a new one.");
        const input = JSON.stringify({
            resumeText: check.data.resumeText,
            jobDescription: jobPost.jobDescription
        });
        const resp = await run(ResumeAgent, input);
        console.log("Resume screening completed with score:", resp.finalOutput);
        const application = await prisma.application.create({
            data: {
                userId: userId,
                jobPostId: check.data.jobPostId,
                resumeText: check.data.resumeText,
                screeningScore: parseFloat(resp.finalOutput.score),
                feedback: resp.finalOutput.feedback,
            }
        });
        console.log("Application created with ID:", application.id, "and screening score:", application.screeningScore);
        if (application.screeningScore < jobPost.minScore) {
            console.log("Screening score below minimum. Rejecting application:", application.id);
            await prisma.application.update({
                where: {
                    id: application.id
                },
                data: {
                    status: "rejected"
                }
            });
        }
        else {
            console.log("Screening score above minimum. Shortlisting application.");
            await prisma.application.update({
                where: {
                    id: application.id
                },
                data: {
                    status: "shortlisted_for_interview"
                }
            });
        }
        console.log("Application status updated based on screening score.");
        res.status(StatusCodes.CREATED).json({ message: "Application created successfully", application: application });
        return;
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }

}
export async function getApplicationById(req: Request, res: Response) {
    try {
        const jobId = req.params.id;
        const application = await prisma.jobPost.findUnique({
            where: {
                id: jobId
            },
            include: {
                applications: {
                    include: {
                        user: true
                    }
                }
            }
        });
        if (!application) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Application not found" });
            return;
        }
        res.status(StatusCodes.OK).json({ message: "Application fetched successfully", data: application.applications });
        return;

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }
}
export async function getMyApplications(req: Request, res: Response) {
    try {
        const userId = req.body.userId;
        const applications = await prisma.application.findMany({
            where: {
                userId: userId
            },
            include: {
                jobPost: true
            }
        });
        res.status(StatusCodes.OK).json({ message: "Applications fetched successfully", data: applications });
        return;
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }
}
