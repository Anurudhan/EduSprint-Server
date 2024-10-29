
import { IDependencies } from "../../application/interfaces/IDependencies";
import { getUserController } from "./getUser";
import { googleAuthController } from "./googleAuth";
import { loginController } from "./login";
import { logoutController } from "./logout";
import { registerUserController } from "./registerUser";
import { resendOTPController } from "./resendOTP";

import { signupController } from "./signup";
import { verifyOTPController } from "./verifyOTP";


export const controllers = (dependencies:IDependencies)=> {
    return{
        signup:signupController(dependencies),
        verifyotp:verifyOTPController(dependencies),
        login:loginController(dependencies),
        resendotp:resendOTPController(dependencies),
        getUser:getUserController(dependencies),
        logout:logoutController(dependencies),
        googleAuth:googleAuthController(dependencies),
        registerForm : registerUserController(dependencies),
    }
};