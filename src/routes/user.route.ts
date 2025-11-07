import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware";
import { getUserProfile, loginUser, registerUser } from "../controllers/user.controller";

export const userRouter = Router()

userRouter.get("/me", userMiddleware, getUserProfile)
userRouter.post("/login", loginUser)
userRouter.post("/register", registerUser)