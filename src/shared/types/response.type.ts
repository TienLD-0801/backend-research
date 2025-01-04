import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

export type LoginResponse = {
  userInfo: {
    name: string;
    email: string;
    role: number;
  };
  token: string;
  refreshToken: string;
};

export type CreateUserResponse = {
  userInfo: {
    name: string;
    email: string;
    date_of_birth: Date;
    card_id: string;
    phone: string;
    role: number;
  };
  message: string;
};

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  date_of_birth: Date;
  card_id: string;
  phone: string;
  role: number;
  create_ad: Date;
  updated_at: Date;
};

export type PaginatedUserResponse = {
  result: Pagination<UserResponse, IPaginationMeta>;
};

export type LogoutResponse = {
  message: string;
};

export type UpdateUser = {
  result: {
    name: string;
    email: string;
    date_of_birth: Date;
    card_id: string;
    phone: string;
    role: number;
  };
  message: string;
};

export type DeleteUser = LogoutResponse;

export type ProductResponse = {
  result: {
    productName?: string;
    categoriesName?: string;
    descriptions?: string;
    url?: string;
    price?: number;
    created_at: Date;
    updated_at: Date;
  }[];
};

export type CreateProductResponse = {
  message: string;
};

export type CreateCategoryResponse = CreateProductResponse;
export type UpdateCategoryResponse = CreateCategoryResponse;

export type DeleteCategory = {
  message: string;
};

export type DeleteProduct = DeleteCategory;
