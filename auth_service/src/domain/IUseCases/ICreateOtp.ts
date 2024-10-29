import { otpEntity } from "../entities";

export interface ICreateOtp {
    execute(email:string,otp:number|string): Promise < boolean | null >
}