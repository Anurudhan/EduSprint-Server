import { UserEntity } from "../../../domain/entities/UserEntity";
import { User } from "../models/userModel";

export const getAllStudents = async (
	page?: number,
	limit?: number
): Promise<UserEntity[] | null> => {
	try {
		if (!page || !limit) {
			const allData = await User.find({ role: "instructor" }).sort({
				updatedAt: "descending",
			});
			return allData;
		}

		const skipNo = (page - 1) * limit;

		const data = await User.find({ role: "student" })
			.sort({ updatedAt: "descending" })
			.skip(skipNo)
			.limit(limit);

		return data;
	} catch (error: any) {
		throw new Error(error?.message);
	}
};