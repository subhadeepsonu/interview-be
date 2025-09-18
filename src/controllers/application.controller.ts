import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

export async function createApplication(req: Request, res: Response) {
    try {

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }

}
export async function getApplicationById(req: Request, res: Response) {
    try {

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }
}
export async function getMyApplications(req: Request, res: Response) {
    try {
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }
}
export async function deleteApplication(req: Request, res: Response) {
    try {
        
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }
}   