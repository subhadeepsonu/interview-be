import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware";
import { createApplication, getApplicationById, getMyApplications } from "../controllers/application.controller";
import { recruiterMiddleware } from "../middleware/recruiter.middleware";

export const applicationRouter = Router()

/**
 * @openapi
 * /application:
 *   post:
 *     summary: Create a new job application
 *     tags:
 *       - application
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobPostId:
 *                 type: string
 *                 example: "job_12345"
 *               resumeText:
 *                 type: string
 *                 example: "Experienced MERN developer skilled in building scalable systems."
 *     responses:
 *       201:
 *         description: Job application created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *
 * /application/me:
 *   get:
 *     summary: Get all job applications of the logged-in user
 *     tags:
 *       - application
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user’s job applications
 *       401:
 *         description: Unauthorized
 *
 * /application/{id}:
 *   get:
 *     summary: Get a specific job application by ID (Recruiter only)
 *     tags:
 *       - application
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job application to fetch
 *     responses:
 *       200:
 *         description: Job application details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
applicationRouter.get("/me", userMiddleware, getMyApplications)
applicationRouter.get("/:id", recruiterMiddleware, getApplicationById)
applicationRouter.post("/", userMiddleware, createApplication)