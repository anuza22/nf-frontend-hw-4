import {axiosInstance} from './api';
// src/api/index.ts
import { Product } from '../components/common/types';

const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get('/products');
  return response.data;
};

const getCategories = async (): Promise<string[]> => {
  const response = await axiosInstance.get('/products/categories');
  return response.data;
};

const getCategoryProducts = async (categoryName: string): Promise<Product[]> => {
  const response = await axiosInstance.get(`/products/category/${categoryName}`);
  return response.data;
};

const getProduct = async (id: number | string): Promise<Product> => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export {
  getProducts,
  getCategories,
  getCategoryProducts,
  getProduct,
};
