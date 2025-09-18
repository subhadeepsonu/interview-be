import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware";
import { deleteUserProfile, forgotPassword, getUserProfile, loginUser, registerUser, resetPassword, updateUserProfile, verifyUser } from "../controllers/user.controller";

export const userRouter = Router()

userRouter.get("/me", userMiddleware, getUserProfile)
userRouter.post("/login", loginUser)
userRouter.post("/register", registerUser)
userRouter.post("/verify", verifyUser)
userRouter.post("/forgot-password", forgotPassword)
userRouter.post("/reset-password", resetPassword)
userRouter.put("/update-profile", userMiddleware, updateUserProfile)
userRouter.delete("/delete-account", userMiddleware, deleteUserProfile)