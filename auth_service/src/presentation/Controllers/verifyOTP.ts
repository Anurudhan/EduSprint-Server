import { NextFunction,Request,Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

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
                .status(401)
                .json({ success: false, data: {}, message: "OTP doesnt match" });
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