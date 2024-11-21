import forgotPasswordProducer from "../../infrastructure/kafka/producers/forgotPasswordProducer";
import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { generateForgotPasswordToken } from "../../_lib/http/jwt";
import { HttpStatusCode } from "../../_lib/common/HttpStatusCode";


export const forgotPasswordMailController = (dependancies: IDependencies) => {

    const { useCases: {findUserByEmailUseCase} } = dependancies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body,"forgot password");

            const { email } = req.body

            const result = await findUserByEmailUseCase(dependancies).execute(email)
            console.log(result,"hey this is our forgotten person")

            if (result?.isBlocked) {
                void  res.status(HttpStatusCode.OK).json({
                    success: true,
                    data: result,
                    isBlocked: true,
                    message: "User is blocked ..!"
                });
                return
            }
            if (result?.isGAuth) {
                void  res.status(HttpStatusCode.OK).json({
                    success: true,
                    data: result,
                    isGAuth: true,
                    message: "This is google logined user..!"
                });
                return                             
            }

            const token =  generateForgotPasswordToken({email})           
            
            // produce this token and email to notification
            await forgotPasswordProducer({email,token})

            void  res.status(HttpStatusCode.OK).json({
                success: true,
                data: {},
                message: "Mail produced!"
            });
            

        } catch (error: any) {
            next(error);
        }
    }
}