import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

export async function getInterviewById(req: Request, res: Response) {
    try {

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }

}
export async function getMyInterviews(req: Request, res: Response) {
    try {

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }
}

export async function createInterview(req: Request, res: Response) {
    try {

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }

}
export async function updateInterview(req: Request, res: Response) {
    try {

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }
}
