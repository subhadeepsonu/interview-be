import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware";
import { createApplication, getApplicationById, getMyApplications } from "../controllers/application.controller";
import { recruiterMiddleware } from "../middleware/recruiter.middleware";

export const applicationRouter = Router()

applicationRouter.get("/:id", recruiterMiddleware, getApplicationById)
applicationRouter.get("me", userMiddleware, getMyApplications)
applicationRouter.post("/", userMiddleware, createApplication)