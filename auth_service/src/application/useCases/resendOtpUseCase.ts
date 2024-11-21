import { constant } from "../../_lib/common/constant";
import { IDependencies } from "../interfaces/IDependencies";

export const resendOtpUseCase = (dependencies:IDependencies) => {
    const { repositories : {createOtp}} = dependencies;

    return{
        execute: async (email: string,otp:string|number) => {
            try {
                const result = await createOtp(email,otp)
                return result
            } catch (error: constant) {
                console.log("verify otp usecase Error",error);
                throw new error(error?.message||"user failed verify otp")
            }
        }
    }
}