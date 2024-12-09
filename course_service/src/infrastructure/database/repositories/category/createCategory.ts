import { IDependencies } from "../../../../application/interfaces/IDepndencies";
import { CategoryEntity } from "../../../../domain/entities/categoryEntity";
import { Category } from "../../models/categoryModel";

export const createCategory = async(data:CategoryEntity)=>{
    try{

        const catName = data.name.trim()
        const isExisting =await Category.findOne({name:catName})
        if(isExisting){
            throw new Error("Category already exists!")
        }
        const newData = {...data, name:catName}
        const created = await Category.create(newData);
        if (!created) {
			throw new Error("Category creation failed!");
		}
        return created;
    }
    catch(error:any){
        console.error("Error in createCategory:", error.message);
        throw new Error(error.message || "Unexpected error in createCategory.");
    }
}