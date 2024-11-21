import { User } from "../models/userModel";
import { UserEntity } from "../../../domain/entities";
import { constant } from "../../../_lib/common/constant";

export const findUserByEmail = async (
    email: string
): Promise<UserEntity | null> => {
    try {
        const existingUser = await User.findOne({ email });
        return existingUser ;
    } catch (error: constant) {
        throw new Error(error?.message);
    }
};
