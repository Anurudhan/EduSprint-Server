import { CategoryEntity, CourseEntity, pageEntity, PaginationMeta } from "../../domain/entities"

export interface IRepositories{
    createCategory: (data: CategoryEntity) => Promise < CategoryEntity>;
    editCategory:(data: CategoryEntity) => Promise < CategoryEntity>;
    getAllCategory:(data:pageEntity)=>Promise<{ categories: CategoryEntity[]; meta: PaginationMeta }>;

    addCourse:(data:CourseEntity) => Promise <CourseEntity>;
    editCourse:(data:CourseEntity) => Promise <CourseEntity>;
    getCourseByInstructor:(id:string) => Promise <CourseEntity[]>;
    getCourseById:(id:string) => Promise <CourseEntity|null>;
} 