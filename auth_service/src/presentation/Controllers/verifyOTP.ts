import { NextFunction,Request,Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { HttpStatusCode } from "../../_lib/common/HttpStatusCode";

export const verifyOTPController = (dependencies:IDependencies) => {
   const {useCases} = dependencies;

   const verifyOtpUseCase = useCases.verifyOtpUseCase;

   return async(req:Request,res:Response,next:NextFunction) => {
    try{
        const {email,otp} = req.body;
        console.log(otp,email,"otp and email reached");

        const result = await verifyOtpUseCase(dependencies).execute(email,otp);

        if (!result) {
             res
                .status(HttpStatusCode.UNAUTHORIZED)
                .json({ success: false, data: {}, message: "OTP doesnt match" });
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