
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { HttpStatusCode } from "../../_lib/common/HttpStatusCode";

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
			res.status(HttpStatusCode.NO_CONTENT).json({});
		} catch (error: any) {
			next(error);
		}
	};
};