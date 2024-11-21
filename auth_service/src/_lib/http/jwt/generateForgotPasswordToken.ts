import jwt from "jsonwebtoken";
import { env_variables } from "../../../_boot/config";

export const generateForgotPasswordToken = (payload: {
	email: string;
}): string => {
	const secret = env_variables.FORGOT_PASSWORD_SECRET;

	if (!secret) {
		throw new Error("FORGOT_PASSWORD_SECRET environment variable is not set");
	}

	try {
		return jwt.sign(payload, secret, {
			expiresIn: "15m",
		});
        
	} catch (error) {
		console.error("Error generating forgot password token:", error);
		throw new Error("Failed to generate forgot password token");
	}
};