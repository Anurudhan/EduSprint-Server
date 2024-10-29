import { IDependencies } from "../interfaces/IDependencies";

export const findUserByEmailUseCase = (dependencies:IDependencies) =>{
    const {repositories: {findUserByEmail} } = dependencies;

    return{
        execute : async(email:string) => {
            return await findUserByEmail(email) 
        } 
    }
};