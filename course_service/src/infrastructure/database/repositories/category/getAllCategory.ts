import { Model } from "mongoose";
import { CategoryEntity, pageEntity, PaginationMeta } from "../../../../domain/entities";
import { Category } from "../../models/categoryModel";

export const getAllCategory = async (data: pageEntity) => {
  try {
    const page = parseInt(data.page as string) || 1;
    const limit = parseInt(data.limit as string) || 6;
    const skip = (page - 1) * limit;
    const categories = await Category.find()
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    if (!categories) {
      throw new Error("get all category from the server failed.");
    }
    const totalItems = await Category.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);
    const meta: PaginationMeta = {
        currentPage: page,
        totalPages,
        totalItems,
        perPage: limit,
      };

    return {categories,meta};
  } catch (error: any) {
    throw new Error(error.message || "Unexpected error in getAllCategory.");
  }
};
