import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";
import { httpStatusCode } from "../../../_lib/http";

export const getAllCategoryController = (dependencie:IDependencies) => {
    const {useCases:{getAllCategoryUseCase}} = dependencie;
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 10;

            const paginationData = { page, limit };
            const result = await getAllCategoryUseCase(dependencie).execute(paginationData);
            console.log(result,"this is all category")
            if(!result){
                res.status(httpStatusCode.INTERNAL_SERVER_ERROR)
                .json({
                    success:false,
                    data:result,
                    message:"get all category time server error"
                })
            }
            res.status(httpStatusCode.OK).json({
				success: true,
				data: result,
				message: "get all category succesfully!",
			});
        }
        catch(error){
            next(error)
        }
    }
}