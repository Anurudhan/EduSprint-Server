import { constant } from "../../../_lib/common/constant";
import { User } from "../models/userModel";
export const isExistingUsername = async (
	userName: string
): Promise<boolean | null> => {
	try {
		
		const existingUsername = await User.findOne({ userName });
		if (!existingUsername) {
			return true;
		}
        return false
	} catch (error: constant) {
		throw new Error(error?.message);
	}
};