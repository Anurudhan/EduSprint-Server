
import { UserEntity } from "../../domain/entities/UserEntity";
import { IDependencies } from "../Interfaces/IDependencies";


export const updateUserProfileUseCase = (dependencies:IDependencies) => {
    const { repositories : {updateUser}} = dependencies

    return{
        execute : async (value : UserEntity) => {
            try{

                // console.log(value,"now I am here");
                
                return await updateUser(value);
            }
            catch(error:any){
                throw new Error(error?.message||"User Creation failed");
                
            }
        }
    }
}