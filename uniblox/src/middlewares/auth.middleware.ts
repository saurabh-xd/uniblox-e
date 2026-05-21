import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export  function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {

        const token = req.cookies.token;

        if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

if (!process.env.JWT_SECRET) {                   
      throw new Error("JWT_SECRET not defined");
    }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()
        
    } catch (error) {
         return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
    }
}