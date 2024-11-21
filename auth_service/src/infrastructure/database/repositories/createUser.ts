import { constant } from "../../../_lib/common/constant";
import { UserEntity } from "../../../domain/entities";
import { User } from "../models/userModel";

export const createUser = async(data:UserEntity) : Promise <UserEntity |null> => {
    try{
        
        console.log(data ,"created student");
        const newUser = await User.create(data);

        if(!newUser){
            throw new Error("User creation is failed !");
            
        }
        return newUser
    }
    catch(error:constant){
        throw new Error(error?.message);   
    }
}