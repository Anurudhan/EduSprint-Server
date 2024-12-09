import { CourseEntity } from "../../../../domain/entities";
import { Course } from "../../models/courseModel";

export const editCourse = async(data:CourseEntity) =>{
    try{
        console.log(data._id, "this is our ID for the user updating")
        if (!data._id) {
            throw new Error("Course ID is required for editing.");
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            data._id, 
            { $set: data }, 
            { new: true, runValidators: true } 
        );

        if (!updatedCourse) {
            throw new Error("Course not found or update failed.");
        }

        return updatedCourse; 
    }
    catch(error){
        if (error instanceof Error) {
            throw error; 
        }
        throw new Error("An unexpected error occurred in addCourse.");
    }
}