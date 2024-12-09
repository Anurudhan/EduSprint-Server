import { IDependencies } from "../../interfaces/IDepndencies";

export const getCourseByIdUseCase =(dependencie:IDependencies) =>{
    const {repositories:{getCourseById}} = dependencie;
    return{
        execute:async(id:string)=>{
            try {
                return await getCourseById(id)
            } catch (error:unknown) {
                if(error instanceof Error) throw new Error(error.message);
                else throw new Error("An unknownn error");
            }
        }
    }
}