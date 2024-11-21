import { ObjectId } from "mongodb";
import { UserEntity } from "../../../domain/entities/UserEntity";
import { User } from "../models/userModel";

export const updateUser = async(value: UserEntity): Promise<UserEntity | null> => {
    try {
        const { _id, ...fieldsToUpdate } = value;
        const objectId = new ObjectId(_id);

        const updateUser = await User.findOneAndUpdate(
            { _id: objectId }, 
            { $set: fieldsToUpdate },         
            { new: true, upsert: true } 
        );
      
        if (!updateUser) {
            throw new Error("User update failed!");
        }
      
        // console.log(updateUser, "Updated user successfully");
      
        return updateUser as UserEntity;
    }
    catch(error: any) {
        throw new Error(error?.message);   
    }
}