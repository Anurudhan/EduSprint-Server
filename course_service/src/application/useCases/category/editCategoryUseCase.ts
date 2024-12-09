import { CategoryEntity } from "../../../domain/entities/categoryEntity";
import { IDependencies } from "../../interfaces/IDepndencies";

export const editCategoryUseCase  = (dependencie:IDependencies) => {
    const {repositories:{editCategory}}=dependencie;
    return{
        execute : async(data:CategoryEntity) => {
            try{
                return await editCategory(data)
            }
            catch(error){
                throw new Error(String(error));
            }
        }
    }
}