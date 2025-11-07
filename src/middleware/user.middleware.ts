import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken"

export async function userMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const token = authHeader.split(" ")[1];
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        if (!verifiedToken) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        req.body.userId = verifiedToken.userId;
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}