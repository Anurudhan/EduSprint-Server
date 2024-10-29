import { User } from "../models/userModel";
import { UserEntity } from "../../../domain/entities";

export const findUserByEmail = async (
    email: string
): Promise<UserEntity | null> => {
    try {
        const existingUser = await User.findOne({ email });
        return existingUser ;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};
