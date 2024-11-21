import { constant } from "../../../_lib/common/constant";
import { User } from "../models";

export const updatePassword = async (
	email: string,
	password: string
) => {
	try {

		const updatePassword = await User.findOneAndUpdate(
			{ email },
			{ password },
			{ new: true }
		);

		if (!updatePassword) {
			throw new Error("User password updation failed!");
		}

        return updatePassword

	} catch (error: constant) {
		throw new Error(error?.message);
	}
};