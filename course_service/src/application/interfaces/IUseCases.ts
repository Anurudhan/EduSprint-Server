import {
  IAddCategoryUseCase,
  IAddCourseUseCase,
  IEditCategoryUseCase,
  IEditCourseUseCase,
  IGetAllCategoryUseCase,
  IGetCourseById,
  IGetCourseInstructorUseCase,
} from "../../domain/IUseCases";

import { IDependencies } from "./IDepndencies";

export interface IUseCases {
  // category
  createCategoryUseCase: (dependencies: IDependencies) => IAddCategoryUseCase;
  editCategoryUseCase: (dependencies: IDependencies) => IEditCategoryUseCase;
  getAllCategoryUseCase: (dependencies: IDependencies) => IGetAllCategoryUseCase;

  // Course
  createCourseUseCase : (dependencies:IDependencies) => IAddCourseUseCase;
  updateCourseUseCase : (dependencies:IDependencies) => IEditCourseUseCase;
  getCourseByInstructorUseCase:(dependencies:IDependencies) => IGetCourseInstructorUseCase;
  getCourseByIdUseCase:(dependencie:IDependencies)=>IGetCourseById;
}
