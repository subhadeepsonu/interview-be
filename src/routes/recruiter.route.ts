import { Router } from "express";
import { recruiterMiddleware } from "../middleware/recruiter.middleware";
import { GetMeRecruiter, LoginRecruiter, RegisterRecruiter } from "../controllers/recruiter.controller";

export const recruiterRouter = Router()
/**
 * @openapi
 * /recruiter/login:
 *   post:
 *     summary: Login as a recruiter
 *     tags:
 *       - recruiter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: recruiter@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Invalid credentials
 *
 * /recruiter/register:
 *   post:
 *     summary: Register a new recruiter
 *     tags:
 *       - recruiter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Recruiter
 *               email:
 *                 type: string
 *                 format: email
 *                 example: recruiter@company.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *     responses:
 *       201:
 *         description: Recruiter registered successfully
 *       400:
 *         description: Validation failed
 *
 * /recruiter/me:
 *   get:
 *     summary: Get logged-in recruiter profile
 *     tags:
 *       - recruiter
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recruiter profile fetched successfully
 *       401:
 *         description: Unauthorized
 */

recruiterRouter.get("/me", recruiterMiddleware, GetMeRecruiter)
recruiterRouter.get("/dashboard", recruiterMiddleware, GetMeRecruiter)
recruiterRouter.post("/login", LoginRecruiter)
recruiterRouter.post("/register", RegisterRecruiter)
