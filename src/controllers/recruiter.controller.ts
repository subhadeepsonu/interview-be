import { Response, Request } from "express";
export async function RegisterRecruiter(req: Request, res: Response) {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }

}
export async function LoginRecruiter(req: Request, res: Response) {
    try {
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function GetMeRecruiter(req: Request, res: Response) {
    try {
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}
