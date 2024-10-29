// src/middleware/validators.ts

import { Request, Response, NextFunction } from "express";

// Email validation middleware
export const validateEmailMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    res.status(400).json({ success: false, message: "Invalid email format" });
    return 
  }

  next();
};

// Password validation middleware
export const validatePasswordMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (password.length < 6 || password.length > 40) {
    res.status(400).json({ success: false, message: "Password must be between 6 and 40 characters long" });
    return 
  }
  if (!/[a-z]/.test(password)) {
    res.status(400).json({ success: false, message: "Password must contain at least one lowercase letter" });
    return 
  }
  if (!/[A-Z]/.test(password)) {
    res.status(400).json({ success: false, message: "Password must contain at least one uppercase letter" });
    return 
  }
  if (!/\d/.test(password)) {
    res.status(400).json({ success: false, message: "Password must contain at least one number" });
    return 
  }
  if (!/[@$!%*?&#]/.test(password)) {
    res.status(400).json({ success: false, message: "Password must contain at least one special character" });
    return 
  }

  next();
};

// Username validation middleware
export const validateUserNameMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { userName } = req.body;

  if (!userName || userName.trim().length < 2) {
    res.status(400).json({ success: false, message: "Username must be at least 2 characters long" });
    return 
  }

  next();
};

// Confirm password validation middleware
export const validateConfirmPasswordMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ success: false, message: "Passwords do not match" });
    return 
  }

  next();
};
