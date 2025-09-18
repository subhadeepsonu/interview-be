import { Response, Request, NextFunction } from "express";

export async function userMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        // Middleware logic here (e.g., authentication, logging, etc.)
        console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
        next(); // Call the next middleware or route handler
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}