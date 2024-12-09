import { IDependencies } from "../../interfaces/IDepndencies";

export const getCourseByInstructorUseCase = (dependencie:IDependencies) =>{
    const {repositories:{getCourseByInstructor}}=dependencie;
    return {
        execute:async(id:string)=>{
            try{
                return await getCourseByInstructor(id)
            }
            catch(error:unknown){
                if(error instanceof Error){
                    throw new Error(error.message)
                }
                else throw new Error("An unknown error facing when geting course using instructor Id")
            }
        }
    }
}