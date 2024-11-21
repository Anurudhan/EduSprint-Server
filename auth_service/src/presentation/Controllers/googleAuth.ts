
import { generateAccessToken, generateRefreshToken } from "../../_lib/http/jwt";
import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { generateRandomString } from "../../_lib/utility/bcrypt/generateRandomString";
import { env_variables } from "../../_boot/config";
import userCreatedProducer from "../../infrastructure/kafka/producers/userCreatedProducer";
import { HttpStatusCode } from "../../_lib/common/HttpStatusCode";



const client = new OAuth2Client(env_variables.GOOGLE_CLIENT_ID);

export const googleAuthController = (dependancies: IDependencies) => {
    const { useCases } = dependancies;
    const {findUserByEmailUseCase,
        createUserUseCase
     }= useCases

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { credential, userType } = req.body;
            console.log(env_variables.GOOGLE_CLIENT_ID);
            console.log('Received credential:', credential?.substring(0, 20) + '...');
     
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: env_variables.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            console.log("Payload Audience (aud):", payload?.aud);

            if (!payload || !payload.email) {
                res.status(400).json({
                    success: false,
                    message: "Google token is invalid or does not contain an email address.",
                });
                return; // Ensures the function returns void
            }

            const { email } = payload;

            let existingUser = await findUserByEmailUseCase(dependancies).execute(email);
            if(!existingUser){
                let signUpData = {
                    email: email,
                    password: `${generateRandomString()}`,
                    isGAuth:true,
                    isOtpVerified:true,
                    role:userType,
                    userName:""+ email.split("@")[0].toLowerCase()
                };
                existingUser = await createUserUseCase(dependancies).execute(signUpData);
                if(existingUser) await userCreatedProducer(existingUser);
            }

            if (existingUser && !existingUser.isGAuth) {
                res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    existingUser: true,
                    data: existingUser,
                    message: "Google login is not allowed for this account",
                });
                return;
            }
            else if(existingUser&&existingUser?.role != userType ){
                res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    existingUser: true,
                    data: existingUser,
                    message: `Login not allowed with this account role. Please use the correct account!`,
                });
                return;
            }
            else if(existingUser&&!existingUser.isVerified && existingUser.isRequested){
                res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    existingUser: true,
                    data: existingUser,
                    message: `Account not verified. Please wait for EduSprint team to verify it.!`,
                });
                return;
            }
            else if(existingUser&&!existingUser.isVerified && !existingUser.isRequested){
                res.status(HttpStatusCode.OK).json({
                    success: true,
                    data: existingUser,
                    message: `Account not verified. Please wait for EduSprint team to verify it.!`,
                });
                return;
            }
             else if (existingUser && !existingUser.isBlocked) {
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

                res.status(HttpStatusCode.OK).json({
                    success: true,
                    existingUser: true,
                    data: existingUser,
                    message: "User Google login!",
                });
                return;
            } else if (existingUser && existingUser.isBlocked) {
                res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    existingUser: true,
                    data: existingUser,
                    message: "User has been blocked by the eduverse team..!",
                });
                return;
            } else {
                
                res.status(HttpStatusCode.OK).json({
                    success: true,
                    data: existingUser,
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
