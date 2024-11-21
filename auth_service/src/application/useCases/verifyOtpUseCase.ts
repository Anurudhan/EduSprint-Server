import { constant } from "../../_lib/common/constant";
import { IDependencies } from "../interfaces/IDependencies";

export const verifyOtpUseCase = (dependencies:IDependencies) => {
    const { repositories : {verifyOtp}} = dependencies;

    return{
        execute: async (email: string, otp:number | string) => {
            try {
                const result = await verifyOtp(email,otp)
                return result
            } catch (error: constant) {
                console.log("verify otp usecase Error",error);
                throw new error(error?.message||"user failed verify otp")
            }
        }
    }
}