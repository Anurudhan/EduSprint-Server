import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";
import updateUserProducer from "../../infrastructure/kafka/Producer/updateUserProducer";



export const updateUserProfile = (dependencies: IDependencies) => {
	const {
		useCases: {updateUserProfileUseCase },
	} = dependencies;
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const value = req.body
			const result = await updateUserProfileUseCase(dependencies).execute(value.data);

			if (!result) {
				void res.status(400).json({
					success: false,
					data: result,
					message: "User Profile updating failed!",
				});
				return;
			}
			await updateUserProducer(result)
			void res.status(200).json({
				success: true,
				data: result,
				message: "User Profile updated.",
			});
			return;

		} catch (error: any) {
			next(error);
		}
	};
};