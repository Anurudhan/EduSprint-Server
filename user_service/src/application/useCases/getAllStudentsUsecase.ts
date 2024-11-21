import { IDependencies } from "../Interfaces/IDependencies";


export const getAllStudentsUsecase = (dependencies: IDependencies) => {
	const {
		repositories: { getAllStudents },
	} = dependencies;
	return {
		execute: async (page?: number, limit?: number) => {
			return await getAllStudents(page, limit);
		},
	};
};