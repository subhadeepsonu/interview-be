import { Router } from "express";
import { recruiterMiddleware } from "../middleware/recruiter.middleware";
import { GetMeRecruiter, LoginRecruiter, RegisterRecruiter } from "../controllers/recruiter.controller";

export const recruiterRouter = Router()

recruiterRouter.get("/me", recruiterMiddleware, GetMeRecruiter)
recruiterRouter.post("/login", LoginRecruiter)
recruiterRouter.post("/register", RegisterRecruiter)
