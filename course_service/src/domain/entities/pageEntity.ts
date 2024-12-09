export interface pageEntity{
    page:number|string|null;
    limit:number|string;
}
export interface PaginationMeta{
    currentPage: number;
    totalPages: number;
    totalItems: number;
    perPage: number;
}