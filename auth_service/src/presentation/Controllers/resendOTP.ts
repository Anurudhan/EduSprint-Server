import { NextFunction,Request,Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { generateOTP, sendOTP } from "../../_lib/utility/otp";
import { HttpStatusCode } from "../../_lib/common/HttpStatusCode";

export const    resendOTPController = (dependencies:IDependencies) => {
   const {useCases} = dependencies;

   const resendOtpUseCase = useCases.resendOtpUseCase;

   return async(req:Request,res:Response,next:NextFunction) => {
    try{
        const {email} = req.body;

        const otp = await generateOTP();
        console.log("Your otp is =>" + otp);
        console.log("Your email  =>" + email);
        await sendOTP(email, otp);    

        const result = await resendOtpUseCase(dependencies).execute(email,otp);

        if (!result) {
             res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ success: false, data: {}, message: "OTP Creation is failed!" });
        } else {
             res
                .status(HttpStatusCode.OK)
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