import { NextFunction,Request,response } from "express";
import { IDependencies } from "../interfaces/IDependencies";
import { constant } from "../../_lib/common/constant";

export const checkExistingUsernameUseCase = (dependencies:IDependencies) => {
    const {repositories : {isExistingUsername}} = dependencies

    return{
        execute : async(userName : string) => {
            try{
                return await isExistingUsername(userName)
            }
            catch(err:constant){
                throw new Error(err?.message);
            }
        }
    }
}