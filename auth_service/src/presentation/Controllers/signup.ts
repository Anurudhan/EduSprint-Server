import { hashPassword } from "../../_lib/utility/bcrypt";
import { generateOTP, sendOTP } from "../../_lib/utility/otp";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";
import userCreatedProducer from "../../infrastructure/kafka/producers/userCreatedProducer";
import { HttpStatusCode } from "../../_lib/common/HttpStatusCode";


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
      
      if(emailResult != null && emailResult?.isOtpVerified){
        res.status(HttpStatusCode.CONFLICT).json({success:false,message:"email"});
        return;
      }
      const usernameResult = await checkExistingUsernameUseCase(dependencies).execute(userName);
      console.log("user oke",usernameResult)
      
      if(!usernameResult && emailResult?.isOtpVerified){
        res.status(HttpStatusCode.CONFLICT).json({success:false,message:"Username"});
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
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Otp creation failed!" });
        return
      }
      if(emailResult == null && usernameResult){
      const created = await createUserUseCase(dependencies).execute(req.body);
      if (!created){
        res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "User creation failed!" });
        return
      }
      await userCreatedProducer(created);
      console.log("created data \n ------------- \n " +created);
      
      res.status(HttpStatusCode.OK).json({success:true,message:"user created",data:created});
    }
    res.status(HttpStatusCode.OK).json({success:true,message:"user created",data:emailResult})
      return ;
    } catch (error: any) {
      next(error);
    }
  };
};
