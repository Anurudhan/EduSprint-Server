import * as Yup from "yup";

export const PasswordValidation = async (password:string, confirmPassword:string) => {
  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password cannot be longer than 40 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[@$!%*?&#]/, "Password must contain at least one special character"),
      
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
  });

  try {
    await validationSchema.validate({ password, confirmPassword });
    return ""; // Validation passed
  } catch (error:any) {
    return error.errors; // Return validation error messages
  }
};
