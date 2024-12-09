import { pageEntity } from "../../../domain/entities";
import { IDependencies } from "../../interfaces/IDepndencies";

export const getAllCategoryUseCase = (dependencie:IDependencies) => {
    const {repositories:{getAllCategory}} = dependencie;
    return {
        execute : async(data:pageEntity)=>{
            try{
                return await getAllCategory(data) 
            }
            catch(error){
                throw new Error(String(error))
            }
        }
    }
}