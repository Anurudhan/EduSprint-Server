import { CourseEntity } from "../../entities";

export interface IEditCourseUseCase {
    execute(data:{data:CourseEntity,studentId:string|null}): Promise<CourseEntity >;
}