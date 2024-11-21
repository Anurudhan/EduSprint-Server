import { UserEntity } from "../../../domain/entities/UserEntity";
import { User } from "../models/userModel";


export const createUser = async ( data: UserEntity ) : Promise < UserEntity | null > => {
    try {
        let user = await User.findOne({ email: data.email });
        
        if (user) {
            user = await User.findOneAndUpdate(
                { email: data.email },
                { $set: data },
                { new: true } 
            );
        } else {
            user = await User.create(data);
        }

        if (!user) {
            throw new Error("User creation or update failed!");
        }
        
        return user; 
    } catch (error: any) {
        throw new Error(error?.message);
    }
}