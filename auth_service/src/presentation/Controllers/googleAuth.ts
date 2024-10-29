
import { generateAccessToken, generateRefreshToken } from "../../_lib/http/jwt";
import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { generateRandomString } from "../../_lib/utility/bcrypt/generateRandomString";
import { env_variables } from "../../_boot/config";



const client = new OAuth2Client(env_variables.GOOGLE_CLIENT_ID);

export const googleAuthController = (dependancies: IDependencies) => {
    const { useCases } = dependancies;
    const findUserByEmailUseCase = useCases.findUserByEmailUseCase;

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { credential } = req.body;

            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();

            if (!payload || !payload.email) {
                res.status(400).json({
                    success: false,
                    message: "Google token is invalid or does not contain an email address.",
                });
                return; // Ensures the function returns void
            }

            const { email } = payload;

            const existingUser = await findUserByEmailUseCase(dependancies).execute(email);

            if (existingUser && !existingUser.isGAuth) {
                res.status(400).json({
                    success: false,
                    existingUser: true,
                    data: existingUser,
                    message: "Account created using email and password can't login using Google !!",
                });
                return;
            } else if (existingUser && !existingUser.isBlocked) {
                const accessToken = generateAccessToken({
                    _id: String(existingUser?._id),
                    email: String(existingUser?.email),
                    role: existingUser?.role,
                });

                const refreshToken = generateRefreshToken({
                    _id: String(existingUser?._id),
                    email: String(existingUser?.email),
                    role: existingUser?.role,
                });

                res.cookie("access_token", accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });

                res.cookie("refresh_token", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });

                res.status(200).json({
                    success: true,
                    existingUser: true,
                    data: existingUser,
                    message: "User Google login!",
                });
                return;
            } else if (existingUser && existingUser.isBlocked) {
                res.status(400).json({
                    success: false,
                    existingUser: true,
                    data: existingUser,
                    message: "User has been blocked by the eduverse team..!",
                });
                return;
            } else {
                let signUpData = {
                    email: email,
                    password: `${generateRandomString()}`,
                };

                res.status(200).json({
                    success: true,
                    existingUser: false,
                    data: signUpData,
                    message: "User Google login!",
                });
                return;
            }
        } catch (error: any) {
            console.log("google auth controller error: ", error);
            next(error);
        }
    };
};
