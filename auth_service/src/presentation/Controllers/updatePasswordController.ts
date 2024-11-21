import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { verifyForgotPasswordToken } from "../../_lib/http/jwt/verifyForgotPassword";
import { hashPassword } from "../../_lib/utility/bcrypt";
import { HttpStatusCode } from "../../_lib/common/HttpStatusCode";

export const updatePasswordController = (dependencies: IDependencies) => {
	const {
		useCases: { updatePasswordUseCase },
	} = dependencies;
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { token, password } = req.body;

			const verified: any = await verifyForgotPasswordToken(token);
            
			if (!verified) {
				void res.status(HttpStatusCode.OK).json({
					success: false,
					data: {},
					message: "Token expired or use valid token..!",
				});
				return;
			}

			const hash = await hashPassword(password);

			const result = await updatePasswordUseCase(dependencies).execute(
				verified.email,
				hash
			);

			if (!result) {
				throw new Error("Password updation failed!");
			}

			void res.status(HttpStatusCode.OK).json({
				success: true,
				data: result,
				message: "Password updated!",
			});
			return;

		} catch (error: any) {
			next(error);
		}
	};
};