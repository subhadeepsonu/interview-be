import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware";
import { createJobPost, deleteJobPost, getAllJobPosts, getJobPostById, getMyJobPosts, updateJobPost } from "../controllers/job-posts.controller";
import { recruiterMiddleware } from "../middleware/recruiter.middleware";

export const jobPostsRouter = Router()

jobPostsRouter.get("/", userMiddleware, getAllJobPosts)
jobPostsRouter.get("/me", recruiterMiddleware, getMyJobPosts)
jobPostsRouter.get("/:id", userMiddleware, getJobPostById)
jobPostsRouter.post("/", recruiterMiddleware, createJobPost)
jobPostsRouter.put("/:id", recruiterMiddleware, updateJobPost)
jobPostsRouter.delete("/:id", recruiterMiddleware, deleteJobPost)