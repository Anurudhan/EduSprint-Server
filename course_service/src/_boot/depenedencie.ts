import { IDependencies } from "../application/interfaces/IDepndencies";
import * as repositories from "../infrastructure/database/repositories";
import * as useCases from "../application/useCases";

export const dependencie:IDependencies={
    repositories,
    useCases
}