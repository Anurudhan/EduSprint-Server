import { UserEntity } from "../entities/UserEntity";


export interface IGetAllInstructorsUseCase {
    execute(page?: number, limit?: number): Promise <UserEntity[] | null>
}