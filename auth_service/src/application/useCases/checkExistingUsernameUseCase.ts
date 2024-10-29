import { NextFunction,Request,response } from "express";
import { IDependencies } from "../interfaces/IDependencies";

export const checkExistingUsernameUseCase = (dependencies:IDependencies) => {
    const {repositories : {isExistingUsername}} = dependencies

    return{
        execute : async(userName : string) => {
            try{
                return await isExistingUsername(userName)
            }
            catch(err:any){
                throw new Error(err?.message);
            }
        }
    }
}