import { IDependencies } from "../../application/interfaces/IDepndencies";
import { createCategoryController, editCategoryController, getAllCategoryController } from "./category";
import { addCourseController, getCourseByIdController, getCourseByInstructorController, updateCourseController } from "./course";

export const controller = (dependencie:IDependencies) => {
    return {
        createCategory: createCategoryController(dependencie),
        editCategory: editCategoryController(dependencie),
        getAllCategory: getAllCategoryController(dependencie),

        addCourse:addCourseController(dependencie),
        updateCourse:updateCourseController(dependencie),
        getCourseByInstructor:getCourseByInstructorController(dependencie),
        getCourseById:getCourseByIdController(dependencie)
    }
}