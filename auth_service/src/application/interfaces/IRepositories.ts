import { UserEntity } from "../../domain/entities";

export interface IRepositories{
    isExistingUsername : (userName : string) => Promise <boolean | null>;
    findUserByEmail: (email: string) => Promise<UserEntity | null>;
    createUser: (data:UserEntity) => Promise < UserEntity | null>;
    verifyOtp:(email:string,otp:string|number) => Promise <boolean|null>;
    createOtp:(email:string,otp:string|number) => Promise <boolean | null>;
    updateUser:(data:UserEntity) => Promise < UserEntity | null>;
    updatePassword:(email: string,password: string)=> Promise<UserEntity | null>;
}