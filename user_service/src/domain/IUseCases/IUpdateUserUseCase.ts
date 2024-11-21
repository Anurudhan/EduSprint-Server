import { UserEntity } from "../entities/UserEntity";

export interface IUpdateUserProfileUseCase {
    execute(data: UserEntity): Promise < UserEntity | null >
}