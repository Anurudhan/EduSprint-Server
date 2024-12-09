import { CourseEntity } from "../../entities";

export interface IGetCourseInstructorUseCase{
    execute(id:string) : Promise<CourseEntity[]>;
}