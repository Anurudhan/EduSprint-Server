import { hashPassword } from "../../_lib/utility/bcrypt";
import { generateOTP, sendOTP } from "../../_lib/utility/otp";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const signupController = (dependencies: IDependencies) => {
  const { useCases } = dependencies;
  const {createUserUseCase , createOtpUseCase,
    findUserByEmailUseCase,checkExistingUsernameUseCase}= useCases;

  return async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
      req.body.password = await hashPassword(req.body.password);
      console.log("hashpassword oke")
      const {email,userName} = req.body;
      
      const emailResult = await findUserByEmailUseCase(dependencies).execute(email);
      console.log("email oke",emailResult)
      
      if(emailResult != null){
        res.status(409).json({success:false,message:"email"});
        return;
      }
      const usernameResult = await checkExistingUsernameUseCase(dependencies).execute(userName);
      console.log("user oke",usernameResult)
      
      if(!usernameResult){
        res.status(409).json({success:false,message:"Username"});
        return;
      }
      const otp = await generateOTP();
      console.log("Your otp is =>" + otp);
      console.log("hashPassword =>"  + req.body.password);
      
      
      await sendOTP(email, otp);
      console.log("sendOtp oke")
      const otpCreate = await createOtpUseCase(dependencies).execute(email,otp)
      if(!otpCreate){
        res
        .status(500)
        .json({ success: false, message: "Otp creation failed!" });
        return
      }
      const created = await createUserUseCase(dependencies).execute(req.body);
      if (!created){
        res
        .status(500)
        .json({ success: false, message: "User creation failed!" });
        return
      }
      
      console.log("created data \n ------------- \n " +created);
      
      res.status(200).json({success:true,message:"user created",data:created});
      return ;
    } catch (error: any) {
      next(error);
    }
  };
};
