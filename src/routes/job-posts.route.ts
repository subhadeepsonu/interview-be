import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware";
import { createJobPost, getAllJobPosts, getJobPostById, getMyJobPosts, updateJobPost } from "../controllers/job-posts.controller";
import { recruiterMiddleware } from "../middleware/recruiter.middleware";

export const jobPostsRouter = Router()
/**
 * @openapi
 * /jobs:
 *   get:
 *     summary: Get all job posts
 *     tags:
 *       - jobs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all job posts
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new job post
 *     tags:
 *       - jobs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Full Stack Developer
 *               jobDescription:
 *                 type: string
 *                 example: Responsible for building scalable web apps.
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["React", "Node.js", "PostgreSQL"]
 *               experience:
 *                 type: number
 *                 example: 2
 *               minScore:
 *                 type: number
 *                 example: 70
 *     responses:
 *       201:
 *         description: Job post created successfully
 *       400:
 *         description: Validation failed
 *
 * /jobs/me:
 *   get:
 *     summary: Get all job posts created by the logged-in recruiter
 *     tags:
 *       - jobs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of recruiter’s job posts
 *       401:
 *         description: Unauthorized
 *
 * /jobs/{id}:
 *   get:
 *     summary: Get a specific job post by ID
 *     tags:
 *       - jobs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job post ID
 *     responses:
 *       200:
 *         description: Job post details
 *       404:
 *         description: Job post not found
 *   put:
 *     summary: Update a job post by ID
 *     tags:
 *       - jobs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Backend Engineer
 *               jobDescription:
 *                 type: string
 *                 example: Build scalable backend systems.
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Node.js", "Prisma", "Docker"]
 *               experience:
 *                 type: number
 *                 example: 3
 *               minScore:
 *                 type: number
 *                 example: 75
 *               open:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Job post updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Job post not found
 */


jobPostsRouter.get("/", userMiddleware, getAllJobPosts)
jobPostsRouter.get("/me", recruiterMiddleware, getMyJobPosts)
jobPostsRouter.get("/:id", userMiddleware, getJobPostById)
jobPostsRouter.post("/", recruiterMiddleware, createJobPost)
jobPostsRouter.put("/:id", recruiterMiddleware, updateJobPost)