import { UserEntity } from "../entities/UserEntity";

export interface ILoginUser {
    execute(email:string,password:string,role:string): Promise < UserEntity | string | null >
}