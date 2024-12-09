import { CategoryEntity } from "../../entities/categoryEntity";


export interface IEditCategoryUseCase {
	execute(data: CategoryEntity): Promise<CategoryEntity | null>;
}