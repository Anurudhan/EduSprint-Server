import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { generateAccessToken, generateRefreshToken } from "../../_lib/http/jwt";

export const loginController = (dependencies:IDependencies) =>{
    const{useCases} = dependencies;
    const {loginUserUseCase} = useCases;
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {email,password,role} = req.body;
            const result = await loginUserUseCase(dependencies).execute(email,password,role);

            if (!result) {
				res
					.status(400)
					.json({
						success: false,
						message: "User doesn't exist or incorrect password",
					});
                return 
			}

			if (result?.isBlocked) {
                res
					.status(400)
					.json({
						success: false,
						message: "EduSprint team blocked your account",
					});
                return 
			}
            if(!result?.isVerified){
                res.status(200).json({
                    success: true,
                    data: result,
                    message: "User logged in successfully but not registered",
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

			res.status(200).json({
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