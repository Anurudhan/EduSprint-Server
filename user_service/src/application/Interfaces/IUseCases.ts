import { IGetAllInstructorsUseCase } from "../../domain/IUseCases/IGetAllInstructorsUseCase";
import {  IGetAllStudentsUsecase } from "../../domain/IUseCases/IGetAllStudentsUsecase";
import { IUpdateUserProfileUseCase } from "../../domain/IUseCases/IUpdateUserUseCase";
import { IDependencies } from "./IDependencies";

export interface IUseCases{
    getAllInstructorsUseCase: (dependencies: IDependencies) => IGetAllInstructorsUseCase
    getAllStudentsUsecase: (dependencies: IDependencies) => IGetAllStudentsUsecase;
    updateUserProfileUseCase:(dependencies: IDependencies) => IUpdateUserProfileUseCase;
}