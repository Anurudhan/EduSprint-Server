
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { HttpStatusCode } from "../../_lib/common/HttpStatusCode";

export const getUserController = (dependancies: IDependencies) => {
	const {useCases} = dependancies;
    const findUserByEmailUseCase = useCases.findUserByEmailUseCase

	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log("hlo I am here look at me")
			if (!req.user) {
				throw new Error("Authentication required: No user provided.");
			}

			const response = await findUserByEmailUseCase(dependancies).execute(
				req.user.email
			);
			console.log(response,"Hlo I am here")
			if (!response) {
				throw new Error("user not found!!");
			}

			res.status(HttpStatusCode.OK).json({
				success: true,
				data: response,
				message: "User exist!",
			});
		} catch (error: any) {
			next(error);
		}
	};
};