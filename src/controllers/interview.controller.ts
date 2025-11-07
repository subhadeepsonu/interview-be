import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { createInterviewSchema, updateInterviewSchema } from "../validators/interview.validator";
import { prisma } from "../db";
import { run } from "@openai/agents";
import { InterviewAgent } from "../agents/interview-scrorer.agent";

export async function createInterview(req: Request, res: Response) {
    try {
        const body = req.body;
        const userId = body.userId;
        const check = await createInterviewSchema.safeParseAsync(body);
        if (!check.success) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid request data", errors: check.error.message })
            return;
        }

        const interview = await prisma.interview.create({
            data: {
                applicationId: check.data.applicationId,
                jobPostId: check.data.jobPostId,
                userId: userId,
                transcript: []
            }
        });
        res.status(StatusCodes.CREATED).json({ message: "Interview created successfully", interview: interview })

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
        const interview = await prisma.interview.update({
            where: {
                id: interviewId
            },
            data: {
                transcript: check.data.transcript
            }
        });
        const job = await prisma.jobPost.findUnique({
            where: {
                id: interview.jobPostId
            }
        });
        if (!job) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Job Post not found" });
            return;
        }
        const resp = await run(InterviewAgent, JSON.stringify({
            transcript: check.data.transcript,
            jobDescription: job.jobDescription
        }));
        await prisma.interview.update({
            where: {
                id: interviewId
            },
            data: {
                performanceScore: parseFloat(resp.finalOutput.score),
                performanceReview: resp.finalOutput.review
            }
        });
        res.status(StatusCodes.OK).json({ message: "Interview updated successfully", interview: interview })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }
}
