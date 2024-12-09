import { CategoryEntity } from "../../../../domain/entities/categoryEntity";
import { Category } from "../../models/categoryModel";

export const editCategory = async (data: CategoryEntity) => {
  try {

    data.name = data.name.trim().toLowerCase();

    const duplicateName = await Category.findOne({
      name: data.name,
      _id: { $ne: data._id },
    });

    if (duplicateName) {
      throw new Error("A category with the same name already exists.");
    }

   
    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: data._id },
      { ...data }, 
      { new: true } )

    if (!updatedCategory) {
      throw new Error("Category not found or update failed.");
    }

    return updatedCategory;
  } catch (error: any) {
    console.error("Error in editCategory:", error.message);
    throw new Error(error.message || "Unexpected error in editCategory.");
  }
};
