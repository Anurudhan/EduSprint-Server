

export interface IVerifyOtp {
    execute(email:string,otp:number|string): Promise < boolean | null >
}