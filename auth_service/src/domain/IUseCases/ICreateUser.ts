import { UserEntity } from "../entities/UserEntity";

export interface ICreateUser {
    execute(data: UserEntity): Promise < UserEntity | null >
}