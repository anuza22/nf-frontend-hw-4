'use client';
import { QueryClient, QueryClientProvider } from 'react-query';
import  Products  from "./components/Products";
const queryClient = new QueryClient();
import ProductsCategories from "./components/ProductsCategories";

export default function Home() {
  return (
    <div>
       <ProductsCategories />
       <Products />
       </div>
  );
}
