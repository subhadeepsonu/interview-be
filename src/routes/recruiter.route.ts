import { Router } from "express";
import { recruiterMiddleware } from "../middleware/recruiter.middleware";
import { DeleteAccountRecruiter, ForgotPasswordRecruiter, GetMeRecruiter, LoginRecruiter, RegisterRecruiter, ResetPasswordRecruiter, VerifyRecruiter } from "../controllers/recruiter.controller";

export const recruiterRouter = Router()

recruiterRouter.get("/me", recruiterMiddleware, GetMeRecruiter)
recruiterRouter.post("/login", LoginRecruiter)
recruiterRouter.post("/register", RegisterRecruiter)
recruiterRouter.post("/verify", VerifyRecruiter)
recruiterRouter.post("/forgot-password", ForgotPasswordRecruiter)
recruiterRouter.post("/reset-password", ResetPasswordRecruiter)
recruiterRouter.delete("/delete-account",recruiterMiddleware, DeleteAccountRecruiter)