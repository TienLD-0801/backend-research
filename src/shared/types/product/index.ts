import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

export type ProductResponse = {
  productName?: string;
  categoriesName?: string;
  descriptions?: string;
  url?: string;
  price?: number;
  created_at: Date;
  updated_at: Date;
};

export type PaginatedProductResponse = {
  result: Pagination<ProductResponse, IPaginationMeta>;
};
