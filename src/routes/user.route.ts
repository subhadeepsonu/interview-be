import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware";
import { getUserProfile, loginUser, registerUser } from "../controllers/user.controller";

export const userRouter = Router()

/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - user
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
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation failed
 *
 * /user/me:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized
 */

userRouter.get("/me", userMiddleware, getUserProfile)
userRouter.post("/login", loginUser)
userRouter.post("/register", registerUser)