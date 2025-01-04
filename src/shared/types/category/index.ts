import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

export type CategoryResponse = {
  categoryName: string;
  created_at: Date;
  updated_at: Date;
};

export type PaginatedCategoryResponse = {
  result: Pagination<CategoryResponse, IPaginationMeta>;
};
