import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
export async function getUserProfile(req: Request, res: Response) {
    try {

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
}

export async function registerUser(req: Request, res: Response) {
    try {

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
}
export async function loginUser(req: Request, res: Response) {
    try {

    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
}