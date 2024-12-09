import { CourseEntity } from "../../../../domain/entities/courseEntity";
import { Category } from "../../models/categoryModel";
import { Course } from "../../models/courseModel";

export const addCourse = async (data: CourseEntity) => {
  try {
    const result = await Course.create(data);
    if (!result) {
      throw new Error("Server failed when creating a new course!");
    }
    const category = await Category.findById(data.categoryRef);
    if (!category) {
      throw new Error("Category not found!");
    }

    const updatedCount = (category.count || 0) + 1; 
    await Category.updateOne(
      { _id: data.categoryRef },
      { $set: { count: updatedCount } }
    );

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred in addCourse.");
  }
};
