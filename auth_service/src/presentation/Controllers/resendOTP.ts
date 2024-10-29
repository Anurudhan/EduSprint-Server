import { NextFunction,Request,Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { generateOTP, sendOTP } from "../../_lib/utility/otp";

export const    resendOTPController = (dependencies:IDependencies) => {
   const {useCases} = dependencies;

   const resendOtpUseCase = useCases.resendOtpUseCase;

   return async(req:Request,res:Response,next:NextFunction) => {
    try{
        const {email} = req.body;

        const otp = await generateOTP();
        console.log("Your otp is =>" + otp);
        await sendOTP(email, otp);    

        const result = await resendOtpUseCase(dependencies).execute(email,otp);

        if (!result) {
             res
                .status(500)
                .json({ success: false, data: {}, message: "OTP Creation is failed!" });
        } else {
             res
                .status(200)
                .json({
                    success: true,
                    data: {},
                    message: "OTP verified successfully",
                });
        }
        
    }
    catch(error:any){
        next(error)
    }
   }
}