import { FC, lazy, LazyExoticComponent } from "react";

export const AddProduct: LazyExoticComponent<FC> = lazy(() => import("./AddProduct"));
