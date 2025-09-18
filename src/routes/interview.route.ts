import { Router } from "express";
import { recruiterMiddleware } from "../middleware/recruiter.middleware";
import { createInterview, getInterviewById, getMyInterviews, updateInterview } from "../controllers/interview.controller";
import { userMiddleware } from "../middleware/user.middleware";

export const interviewRouter = Router()

interviewRouter.get("/:id", recruiterMiddleware, getInterviewById)
interviewRouter.get("/me", userMiddleware, getMyInterviews)
interviewRouter.post("/", createInterview)
interviewRouter.put("/:id", updateInterview)
