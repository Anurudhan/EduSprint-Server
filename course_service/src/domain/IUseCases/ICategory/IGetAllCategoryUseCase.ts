import { pageEntity, PaginationMeta } from "../../entities";
import { CategoryEntity } from "../../entities/categoryEntity";


export interface IGetAllCategoryUseCase {
    execute(data:pageEntity): Promise<{ categories: CategoryEntity[]; meta: PaginationMeta }>
}