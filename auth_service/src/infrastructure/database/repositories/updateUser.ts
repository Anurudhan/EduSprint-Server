import { constant } from "../../../_lib/common/constant";
import { UserEntity } from "../../../domain/entities";
import { User } from "../models/userModel";

export const updateUser = async(data:UserEntity) : Promise <UserEntity |null> => {
    try{
        if(data.role==="student"){
          data = {...data,isVerified:true,isRequested:true}
        }
        else if(data.role==="instructor"){
          data = {...data,isRequested:true}
        }
        const updateUser = await User.findOneAndUpdate(
            { email: data.email },  
            { $set: data },         
            { new: true, upsert: true } 
          );
      
          if (!updateUser) {
            throw new Error("User update failed!");
          }
      
          console.log(updateUser, "Updated user successfully");
      
          return updateUser as UserEntity;
    }
    catch(error:constant){
        throw new Error(error?.message);   
    }
}