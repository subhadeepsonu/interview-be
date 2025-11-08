import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { userLoginSchema, userRegisterSchema } from "../validators/user.validator";
import { prisma } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function getUserProfile(req: Request, res: Response) {
    try {
        const userId = req.body.userId;
        console.log("Fetching profile for userId:", userId);
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found"
            })
            return;
        }
        res.status(StatusCodes.OK).json({
            message: "User profile fetched successfully",
            data: user
        });
        return;

    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
}

export async function registerUser(req: Request, res: Response) {
    try {
        const body = req.body;
        const check = userRegisterSchema.safeParse(body);
        if (!check.success) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid request data",
                errors: check.error.message
            })
            return;
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (existingUser) {
            res.status(StatusCodes.CONFLICT).json({
                message: "User already exists"
            })
            return;
        }
        const hashedPassword = bcrypt.hashSync(body.password, 10);
        const newUser = await prisma.user.create({
            data: {
                name: check.data.name,
                email: check.data.email,
                password: hashedPassword
            }
        });
        res.status(StatusCodes.CREATED).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
        return;

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
}
export async function loginUser(req: Request, res: Response) {
    try {
        const body = req.body;
        const check = userLoginSchema.safeParse(body);
        if (!check.success) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid request data",
                errors: check.error.message
            })
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found",
                user: user
            })
            return
        }
        const isPasswordValid = bcrypt.compareSync(body.password, user.password);
        if (!isPasswordValid) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Invalid credentials"
            })
            return;
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string);
        res.status(StatusCodes.OK).json({
            message: "User logged in successfully",
            token: token
        });
        return;
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
}