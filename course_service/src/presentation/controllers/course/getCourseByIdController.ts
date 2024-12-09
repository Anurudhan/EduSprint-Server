import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";
import { httpStatusCode } from "../../../_lib/http";

export const getCourseByIdController = (dependencie:IDependencies) =>{
    const {useCases:{getCourseByIdUseCase}} = dependencie;
    return async(req:Request,res:Response,next:NextFunction) => {
        try {
            const {id} = req.params;
            const result = await getCourseByIdUseCase(dependencie).execute(id);
            res.status(httpStatusCode.OK).json({success:true,message:"course retrieve successfully !",data:result})
        } catch (error:unknown) {
            if(error instanceof Error) next(error.message)
            else next()
        }
    }
}