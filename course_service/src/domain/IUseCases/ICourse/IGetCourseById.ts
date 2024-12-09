import { CourseEntity } from "../../entities";

export interface IGetCourseById{
    execute(id:string):Promise<CourseEntity|null>
}