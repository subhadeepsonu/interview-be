import { Router } from "express";
import { createInterview, updateInterview } from "../controllers/interview.controller";
import { userMiddleware } from "../middleware/user.middleware";

export const interviewRouter = Router()

/**
 * @openapi
 * /interview:
 *   post:
 *     summary: Create a new interview
 *     tags:
 *       - interview
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationId:
 *                 type: string
 *                 example: "app_12345"
 *               jobPostId:
 *                 type: string
 *                 example: "job_67890"
 *     responses:
 *       201:
 *         description: Interview created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *
 * /interview/{id}:
 *   put:
 *     summary: Update interview transcript
 *     tags:
 *       - interview
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Interview ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transcript:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Tell me about yourself."
 *     responses:
 *       200:
 *         description: Interview updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Interview not found
 */

interviewRouter.post("/", userMiddleware, createInterview)
interviewRouter.put("/:id", userMiddleware, updateInterview)
