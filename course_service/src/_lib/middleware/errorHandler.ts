import { Request, Response, NextFunction } from "express";
import { httpStatusCode } from "../http";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Log the error for debugging purposes

  // Default error status and message
  const statusCode = err.statusCode || httpStatusCode.BAD_REQUEST;
  const message = err.message || "BAD Request Error";

  // Send the error response
  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
