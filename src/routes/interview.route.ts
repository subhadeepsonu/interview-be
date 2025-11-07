import { Router } from "express";
import { recruiterMiddleware } from "../middleware/recruiter.middleware";
import { createInterview, getInterviewById, getMyInterviews, updateInterview } from "../controllers/interview.controller";
import { userMiddleware } from "../middleware/user.middleware";

export const interviewRouter = Router()

interviewRouter.get("/recruiter/:id", recruiterMiddleware, getInterviewById)
interviewRouter.get("/user/:id", userMiddleware, getMyInterviews)
interviewRouter.post("/", createInterview)
interviewRouter.put("/:id", updateInterview)
