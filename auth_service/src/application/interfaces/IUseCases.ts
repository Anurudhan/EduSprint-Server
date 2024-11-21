import { 
    ICheckExistingUsername,
    IFindUserByEmailUseCase,
    ICreateUser,
    IVerifyOtp,
    ICreateOtp,
    IResendOtp,
    ILoginUser,
    IUpdateUser,
    IUpdatePasswordUseCase
 } from "../../domain/IUseCases";


export interface IUseCases {
    checkExistingUsernameUseCase:(dependencies:any) => ICheckExistingUsername; 
    findUserByEmailUseCase: (dependencies: any) => IFindUserByEmailUseCase;
    createUserUseCase : (dependencies: any) => ICreateUser;
    createOtpUseCase:(dependencies:any) => ICreateOtp;
    verifyOtpUseCase : (dependencies:any) => IVerifyOtp;
    resendOtpUseCase:(dependencies:any) => IResendOtp;
    loginUserUseCase:(dependencies:any) => ILoginUser;
    updateUserUseCase:(dependencies:any) => IUpdateUser;
    updatePasswordUseCase:(dependencies:any)=> IUpdatePasswordUseCase;
}