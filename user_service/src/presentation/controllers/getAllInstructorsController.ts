
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";

export const getAllInstructorsController = (dependencies: IDependencies) => {
    const {
        useCases: { getAllInstructorsUseCase }
    } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
            const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

            console.log(page,limit,"hee heee I am the Decider");
            

            if (page !== undefined && isNaN(page)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid page number"
                });
                return;
            }

            if (limit !== undefined && isNaN(limit)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid limit number"
                });
                return;
            }

            const result = await getAllInstructorsUseCase(dependencies).execute(page, limit);
            console.log(result)

            res.status(200).json({
                success: true,
                data: result,
                message: "All instructors fetched"
            });
        } catch (error) {
            next(error);
        }
    }
}