import { Router } from "express";
import { createInterview, updateInterview } from "../controllers/interview.controller";
import { userMiddleware } from "../middleware/user.middleware";

export const interviewRouter = Router()

interviewRouter.post("/", userMiddleware, createInterview)
interviewRouter.put("/:id", userMiddleware, updateInterview)
