import { CourseEntity } from "../../../domain/entities/courseEntity";
import { IDependencies } from "../../interfaces/IDepndencies";

export const createCourseUseCase = (dependencie:IDependencies) => {
    const {repositories:{addCourse}} = dependencie;
    return {
        execute:async(data:CourseEntity) => {
            try{
                return await addCourse(data)
            }
            catch(error:unknown){
                if (error instanceof Error) {
                    throw error; 
                }
                throw new Error("An unexpected error occurred in addCourse.");
            }
        }
    }
}