import { IDependencies } from "../../application/Interfaces/IDependencies";
import { getAllInstructorsController } from "./getAllInstructorsController";
import { getAllStudentsController } from "./getAllStudentsControllers";
import { updateUserProfile } from "./updateUserProfile";


export const controllers = (dependencies:IDependencies) => {
    return{
        getAllInstructors: getAllInstructorsController(dependencies),
        getAllStudents:getAllStudentsController(dependencies),
        updateProfile:updateUserProfile(dependencies),
    }
}