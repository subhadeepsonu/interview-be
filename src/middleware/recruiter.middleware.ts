import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export async function recruiterMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        const verify = jwt.verify(token, process.env.JWT_SECRET as string) as { recruiterId: string };
        if (!verify || !verify.recruiterId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.body.recruiterId = verify.recruiterId;
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}