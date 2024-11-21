
import { UserEntity } from "../../domain/entities/UserEntity"



export interface IRepositories{
    getAllInstructors: (page?: number, limit?: number) => Promise <UserEntity[] | null >
    getAllStudents: (page?: number, limit?: number) => Promise <UserEntity[] | null >
    updateUser:(data:UserEntity)=>Promise<UserEntity|null>
}