
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const getUserController = (dependancies: IDependencies) => {
	const {useCases} = dependancies;
    const findUserByEmailUseCase = useCases.findUserByEmailUseCase

	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			
			if (!req.user) {
				throw new Error("Authentication required: No user provided.");
			}

			const response = await findUserByEmailUseCase(dependancies).execute(
				req.user.email
			);
			if (!response) {
				throw new Error("user not found!!");
			}

			res.status(200).json({
				success: true,
				data: response,
				message: "User exist!",
			});
		} catch (error: any) {
			next(error);
		}
	};
};