import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import { constant } from "../../common/constant";

// Email validation schema
const emailSchema = yup.object({
  email: yup.string()
  .email('Invalid email format') // Strict email format check
  .required('Email is required')
  .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Invalid email address format'),
});

// Password validation schema
const passwordSchema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(40, "Password cannot exceed 40 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
    .required("Password is required")
});

// Username validation schema
const usernameSchema = yup.object({
  userName: yup
  .string()
  .trim() 
  .min(3, 'Username must be at least 3 characters') // Min length check for username
  .max(20, 'Username must not exceed 20 characters') // Max length check for username
  .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain alphanumeric characters and underscores') // Only alphanumeric and underscores
  .required('Username is required'),
});

// Confirm password validation schema
const confirmPasswordSchema = yup.object({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords do not match")
    .required("Confirm password is required"),
});

const validate =
  (schema: yup.ObjectSchema<constant>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.status(400).json({ success: false, message: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Unexpected error occurred" });
      }
    }
  };


export const validateEmailMiddleware = validate(emailSchema);
export const validatePasswordMiddleware = validate(passwordSchema);
export const validateUserNameMiddleware = validate(usernameSchema);
export const validateConfirmPasswordMiddleware = validate(confirmPasswordSchema);
