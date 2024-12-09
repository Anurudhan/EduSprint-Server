import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";
import { httpStatusCode } from "../../../_lib/http";

export const getCourseByInstructorController = (dependencie:IDependencies) =>{
    const {useCases:{getCourseByInstructorUseCase}}=dependencie;
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            console.log(req.params)
            const {id}=req.params
            if (!id) {
                res.status(httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Instructor ID is required",
                });

            }
            const result = await getCourseByInstructorUseCase(dependencie).execute(id as string)
           res.status(httpStatusCode.OK).json({success:true,message:"Course get",data:result})
          
            
        } catch (error:unknown) {
            if(error instanceof Error){
                next(error.message)
            }
            else next()     
        }
    }
}