
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const logoutController = (dependancies: IDependencies) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {

			const cookieOptions : any = {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 0
            };

			res.cookie("access_token", "", cookieOptions);
			res.cookie("refresh_token", "", cookieOptions);
			res.status(204).json({});
		} catch (error: any) {
			next(error);
		}
	};
};