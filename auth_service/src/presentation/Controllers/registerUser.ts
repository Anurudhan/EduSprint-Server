
import { generateAccessToken, generateRefreshToken } from "../../_lib/http/jwt";
import { hashPassword } from "../../_lib/utility/bcrypt";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const registerUserController = (dependencies: IDependencies) => {
  const { useCases } = dependencies;
  const {updateUserUseCase}= useCases;

  return async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
      console.log(req.body);
	  req.body.password = await hashPassword(req.body.password);
	  
      const updated = await updateUserUseCase(dependencies).execute(req.body);
      console.log("updated data  \n",updated)
      
      if(updated == null){
        res.status(400).json({success:false,message:"user registered failed!"});
        return;
      }
      const accessToken = generateAccessToken({
				_id: String(updated?._id),
				email: updated?.email!,
				role: updated?.role!,
			});

			const refreshToken = generateRefreshToken({
				_id: String(updated?._id),
				email: updated?.email!,
				role: updated?.role!,
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

      res.status(200).json({success:true,message:"user Registered succesfully",data:updated});
      return ;
    } catch (error: any) {
      next(error);
    }
  };
};