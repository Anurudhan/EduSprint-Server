import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";
import { httpStatusCode } from "../../../_lib/http";


export const editCategoryController = (dependencie:IDependencies) => {
    const {useCases:{editCategoryUseCase}} = dependencie;
    return async(req:Request,res:Response,next:NextFunction) => {
        try{

            console.log(req.body,"this our category edit data ")
            const result = await editCategoryUseCase(dependencie).execute(req.body);
            if(!result){
                res.status(httpStatusCode.NOT_MODIFIED).json({
                    success: false,
                    data: result,
                    message: "Category updated failed!",
                });
            }
            res.status(httpStatusCode.OK).json({
				success: true,
				data: result,
				message: "Category updated succesfully!",
			});
        }
        catch(error){
            next(error)
        }
    }
}