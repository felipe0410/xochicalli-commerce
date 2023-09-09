import { FC, lazy, LazyExoticComponent } from "react";
import { Product } from "@/interfaces";

export * from './ProviderButtons';
export * from './Navbar';
export const ProductCard: LazyExoticComponent<FC<Product>> = lazy(() => import('./products/ProductCard'))