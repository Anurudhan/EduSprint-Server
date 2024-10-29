import { UserEntity } from "../../../domain/entities";
import { User } from "../models/userModel";

export const updateUser = async(data:UserEntity) : Promise <UserEntity |null> => {
    try{
        if(data.role==="student"){
          data = {...data,isVerified:true}
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
    catch(error:any){
        throw new Error(error?.message);   
    }
}