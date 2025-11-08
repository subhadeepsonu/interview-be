import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function userMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("No auth header or invalid format");
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];
        const verify = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

        if (!verify || !verify.userId) {
            console.log("Token verification failed");
            return res.status(401).json({ message: "Unauthorized" });
        }

        

        req.body = req.body || {};
        req.body.userId = verify.userId;

        next();
    } catch (error) {
        console.error("Error in recruiter middleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
