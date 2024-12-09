import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";
import { httpStatusCode } from "../../../_lib/http";

export const updateCourseController = (dependencie:IDependencies) => {
    const {useCases:{updateCourseUseCase}} = dependencie;
    return async (req:Request,res:Response,next:NextFunction) =>{
        try {
            console.log(req.body,"\n Here the data for the update course");
            const result = await updateCourseUseCase(dependencie).execute(req.body);
            if(!result){
                res.status(httpStatusCode.BAD_REQUEST).json({success:false,message:"course updating time occure an error!"})
            }
            res.status(httpStatusCode.OK).json({success:true,message:"Course updated succesfully!",data:result})
        } catch (error:unknown) {
            if (error instanceof Error) {
                res.status(httpStatusCode.INTERNAL_SERVER_ERROR).
                json({success: false,message: error.message,data: ""});
            } else {
                res.status(httpStatusCode.INTERNAL_SERVER_ERROR)
                .json({success: false,message: "An unknown error occurred.",data: ""});
            }
        }
    }
}