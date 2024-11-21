import { Router } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";

export const userRoutes = (dependencies:IDependencies) => {
    const router = Router();
    const {getAllInstructors,getAllStudents,updateProfile} = controllers(dependencies);

    router.route("/get-all-instructors").get(getAllInstructors);
    router.route("/get-all-students").get(getAllStudents);
    router.route("/update-profile").post(updateProfile);
    router.route("/unblock-block").post(updateProfile);
    router.route("/verify-instructor").post(updateProfile);

    return router;
}