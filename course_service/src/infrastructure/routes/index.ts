import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDepndencies";
import { controller } from "../../presentation/controllers";

export const routes = (dependencie:IDependencies)=>{
    const router=Router();
    const {createCategory,editCategory,getAllCategory,addCourse,getCourseByInstructor,getCourseById,updateCourse} = controller(dependencie)

    router.route("/create-category").post(createCategory);
    router.route("/update-category").post(editCategory);
    router.route("/getallcategory").get(getAllCategory);

    router.route("/").post(addCourse);
    router.route("/getcourse/:id").get(getCourseById)
    router.route("/instructor-courses/:id").get(getCourseByInstructor);
    router.route("/updatecourse").post(updateCourse)

    return router
}