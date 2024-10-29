import { UserEntity } from "../entities/UserEntity";

export interface IUpdateUser {
    execute(data: UserEntity): Promise < UserEntity | null >
}