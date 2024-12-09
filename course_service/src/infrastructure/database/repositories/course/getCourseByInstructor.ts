import { Course } from "../../models/courseModel";

export const getCourseByInstructor = async(id:string)=>{
    try {
        const value =  await Course.find({instructorRef:id});
        return value;
    } catch (error:unknown) {
        if(error instanceof Error){
            throw new Error(error.message);
        }
        else throw new Error("An unknown error")
    }
}