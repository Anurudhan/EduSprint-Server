import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";
import { httpStatusCode } from "../../../_lib/http";


export const createCategoryController = (dependencie:IDependencies)=>{
    const {useCases:{createCategoryUseCase}} = dependencie;
    return async(req:Request,res:Response,next:NextFunction) => {
        try{
            console.log(req.body,"this is for the add category");
            const result = await createCategoryUseCase(dependencie).execute(req.body);
            if(!result){
                throw new Error("Category creation failed!")
            }
            res.status(httpStatusCode.OK).json({
				success: true,
				data: result,
				message: "Category created succesfully!",
			});
        }
        catch(error:any){
            next(String(error));
        }
    }
}