import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../../application/interfaces/IDepndencies"
import { httpStatusCode } from "../../../_lib/http";

export const addCourseController = (dependencie:IDependencies) =>{
    const {useCases:{createCourseUseCase}} = dependencie;
    return async(req:Request,res:Response,next:NextFunction) => {
        try {
            console.log(req.body)
            const course = await createCourseUseCase(dependencie).execute(req.body);
            if(!course){
                res.status(httpStatusCode.BAD_REQUEST).json({success:false,message:"course creating time facing server error!",data:req.body});
            }
            res.status(httpStatusCode.OK).json({success:true,message:"course created successfully",data:req.body});
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