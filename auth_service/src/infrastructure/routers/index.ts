import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import {controllers} from "../../presentation/Controllers"
import { jwtMiddleware } from "../../_lib/common/middleware/jwtMiddleware";
import { validateConfirmPasswordMiddleware, validateEmailMiddleware, validatePasswordMiddleware, validateUserNameMiddleware } from "../../_lib/utility/middleware";



export const routes = (dependancies: IDependencies) => {
    const {
        signup,verifyotp,resendotp,getUser,logout,login,googleAuth,registerForm,
        forgotPassword,updatePassword,changePassword

    } = controllers(dependancies)

	const router = Router();

	router.route("/signup").post(validateUserNameMiddleware,validateEmailMiddleware,
                                validatePasswordMiddleware,validateConfirmPasswordMiddleware,signup);
    router.route("/login").post(validateEmailMiddleware,validatePasswordMiddleware,login);
    router.route("/google-auth").post(googleAuth)
    router.route("/verify-otp").post(verifyotp);
    router.route("/resend-otp").post(resendotp);
    router.route("/forgot-password-mail").post(forgotPassword);
    router.route("/update-password").post(updatePassword);
    router.route("/change-password").post(changePassword);
    router.route("/register-form").post(registerForm)
    router.route("/getuser").get(jwtMiddleware,getUser);
    router.route("/logout").delete(logout)
    return router;
};