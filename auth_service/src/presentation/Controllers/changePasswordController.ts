import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { hashPassword } from "../../_lib/utility/bcrypt";
import { PasswordValidation } from "../../_lib/utility/Validate/passwordValidation";
import { HttpStatusCode } from "../../_lib/common/HttpStatusCode";


export const changePasswordController = (dependencies: IDependencies) => {
    const {
        useCases: { updatePasswordUseCase,loginUserUseCase }
    } = dependencies;

    return async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {

            const {currentPassword,newPassword,email,role,confirmPassword} = req.body.data

            console.log(currentPassword,newPassword,email,role,"hee heee I am the Decider");
            const password=currentPassword;
            const checkPassword = await loginUserUseCase(dependencies).execute(email,password,role);
            const validationErrors = await PasswordValidation(newPassword,confirmPassword);
            if (validationErrors) {
                res.status(HttpStatusCode.BAD_REQUEST).json({
                  success: false,
                  message: validationErrors[0] || "Password validation failed"
                });
                return;
              }

            if(!checkPassword){
                 res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Current password does not match the records. Please try again"
                });
                return;
            }
            const hash = await hashPassword(newPassword);

			const result = await updatePasswordUseCase(dependencies).execute(
				email,
				hash
			);

             res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Password Update succesfully"
            });
            return;
        } catch (error) {
            next(error);
        }
    }
}