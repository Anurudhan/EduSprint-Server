
import { IDependencies } from '../application/Interfaces/IDependencies'
import * as useCases from '../application/useCases'
import * as repositories from "../infrastructure/database/repositories"

export const dependencies : IDependencies = {
    repositories,
    useCases
}