import { CategoryEntity } from "../../entities/categoryEntity";


export interface IAddCategoryUseCase {
	execute(data: CategoryEntity): Promise<CategoryEntity | null>;
}