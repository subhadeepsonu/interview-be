import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { createInterviewSchema, updateInterviewSchema } from "../validators/interview.validator";
import { prisma } from "../db";
import { run } from "@openai/agents";
import { InterviewAgent } from "../agents/interview-scrorer.agent";
import { Status } from "@prisma/client";

export async function createInterview(req: Request, res: Response) {
    try {
        const body = req.body;
        const userId = body.userId;
        const check = await createInterviewSchema.safeParseAsync(body);
        if (!check.success) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid request data", errors: check.error.message })
            return;
        }
        const application = await prisma.application.findUnique({
            where: {
                id: check.data.applicationId
            }
        });
        if (!application) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Application not found" });
            return;
        }
        if (application.userId !== userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized to create interview for this application" });
            return;
        }

        const interview = await prisma.interview.create({
            data: {
                applicationId: check.data.applicationId,
                jobPostId: application.jobPostId,
                userId: userId,
                transcript: []
            }
        });
        const interviewDetails = await prisma.interview.findUnique({
            where: {
                id: interview.id
            }
            , include: {
                jobPost: true,
                application: true
            }
        });
        res.status(StatusCodes.CREATED).json({ message: "Interview created successfully", interview: interviewDetails })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }

}

export async function updateInterview(req: Request, res: Response) {
    try {
        const body = req.body;
        const check = updateInterviewSchema.safeParse(body);
        if (!check.success) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid request data", errors: check.error.message })
            return;
        }
        const interviewId = req.params.id;
        console.log("Updating interview with ID:", interviewId);
        const interview = await prisma.interview.update({
            where: {
                id: interviewId
            },
            data: {
                transcript: check.data.transcript
            }
        });
        console.log("Interview updated:", interview);
        const job = await prisma.jobPost.findUnique({
            where: {
                id: interview.jobPostId
            }
        });
        if (!job) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Job Post not found" });
            return;
        }
        console.log("Fetched job post:", job);
        const resp = await run(InterviewAgent, JSON.stringify({
            transcript: check.data.transcript,
            jobDescription: job.jobDescription
        }));
        console.log("Interview Agent response:", resp);
        await prisma.interview.update({
            where: {
                id: interviewId
            },
            data: {
                performanceScore: parseFloat(resp.finalOutput.score),
                performanceReview: resp.finalOutput.review
            }
        });
        let status: Status;
        if (resp.finalOutput.score >= 75) {
            status = Status.shortlisted
        } else {
            status = Status.rejected
        }
        await prisma.application.update({
            where: {
                id: interview.applicationId
            },
            data: {
                status: status
            }
        });

        console.log("Interview performance score and review updated.", resp.finalOutput.score, resp.finalOutput.review);
        res.status(StatusCodes.OK).json({ message: "Interview updated successfully", interview: interview })
        return;
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }
}
