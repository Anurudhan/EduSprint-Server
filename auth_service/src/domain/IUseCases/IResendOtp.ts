export interface IResendOtp {
    execute(email:string,otp:number|string): Promise < boolean | null >
}