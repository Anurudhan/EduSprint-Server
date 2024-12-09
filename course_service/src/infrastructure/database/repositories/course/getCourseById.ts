import { Course } from "../../models/courseModel";

export const getCourseById = async(id:string) =>{
    try {
        const course = await Course.findById(id);
        return course??null;
        
    } catch (error:unknown) {
        if(error instanceof Error) throw new Error(error.message);
        else throw new Error("An unknown error");
    }
}