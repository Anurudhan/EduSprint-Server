import { UserEntity } from "../entities/UserEntity";

export interface IGetAllStudentsUsecase{
    execute(page?: number, limit?: number): Promise <UserEntity[] | null>
}