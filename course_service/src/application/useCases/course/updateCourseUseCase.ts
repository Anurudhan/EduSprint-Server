import { CourseEntity } from "../../../domain/entities";
import { IDependencies } from "../../interfaces/IDepndencies";

export const updateCourseUseCase = (dependencie:IDependencies) =>{
    const {repositories:{editCourse}}= dependencie;
    return {
        execute:async(data:{data:CourseEntity,studentId:string|null}) => {
            try{
                if(data.studentId){
                    data.data.studentsEnrolled?data.data.studentsEnrolled++:1;
                    data.data.students?.push(data.studentId)
                }
                console.log(data.data,"this is my data")
                return await editCourse(data.data)
            }
            catch(error:unknown){
                if (error instanceof Error) {
                    throw error; 
                }
                throw new Error("An unexpected error occurred in updateCourse.");
            }
        }
    }
}