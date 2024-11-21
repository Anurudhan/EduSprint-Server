import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { generateAccessToken, generateRefreshToken } from "../../_lib/http/jwt";
import { HttpStatusCode } from "../../_lib/common/HttpStatusCode";

export const loginController = (dependencies:IDependencies) =>{
    const{useCases} = dependencies;
    const {loginUserUseCase} = useCases;
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {email,password,role} = req.body;
            const result = await loginUserUseCase(dependencies).execute(email,password,role);

            if (typeof result == "string" ) {
				res
					.status(HttpStatusCode.BAD_REQUEST)
					.json({
						success: false,
						message: result,
					});
                return 
			}

			if (result?.isBlocked) {
                res
					.status(HttpStatusCode.BAD_REQUEST)
					.json({
						success: false,
						message: "EduSprint team blocked your account",
					});
                return 
			}
            if(!result?.isVerified && result?.isRequested){
                res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    data: result,
                    message: "Account not verified. Please wait for EduSprint team to verify it",
                });
                return ;
            }

			const accessToken = generateAccessToken({
				_id: String(result?._id),
				email: result?.email!,
				role: result?.role!,
			});

			const refreshToken = generateRefreshToken({
				_id: String(result?._id),
				email: result?.email!,
				role: result?.role!,
			});

			console.log("user reachedd");
			

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
				data: result,
				message: "User logged in successfully",
			});
            return ;
        }
        catch(error:any){
            console.log("Login controller error: ", error);
			next(error);
        }
    }
}