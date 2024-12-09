import { CategoryEntity } from "../../../domain/entities/categoryEntity";
import { IDependencies } from "../../interfaces/IDepndencies";

export const createCategoryUseCase = (dependencie: IDependencies) => {
  const { repositories } = dependencie;
  const { createCategory } = repositories;

  return {
    execute: async (data: CategoryEntity) => {
      try {
        return await createCategory(data);
      } catch (error) {
        throw new Error(String(error));
      }
    },
  };
};
