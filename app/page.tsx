'use client';
import Image from "next/image";
import { QueryClient, QueryClientProvider } from 'react-query';
import  Products  from "./components/Products";
const queryClient = new QueryClient();
import { Product } from "./components/common/types";
import ProductsCategories from "./components/ProductsCategories";

type Props = {
  products: Product[];
  categories: string[];
};

export default function Home({ products, categories }: Props) {
  return (
    <div>
       <ProductsCategories />
       <Products />
       </div>
  );
}
