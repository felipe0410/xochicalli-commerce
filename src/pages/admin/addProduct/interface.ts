export interface CreateCategoryState {
  categoria: string;
  finalCategory: boolean;
  numSubcategorys: number;
  subCategorys: {
    [key: string]: {
      nameCategory: string;
      subCategorys: {
        numItems: number;
        [key: number]: {
          name: string;
          value: string[];
          finalCategory: boolean;
        };
      };
    };
  };
}

export type InputData = {
  name: string;
  type: string;
  component: string;
  option?: string[];
};

export type CategoryData = {
  [key: string]: InputData[];
};

export type DynamicProperties = Record<string, any>;

export type AllProperties = {
  property: string;
  value: any;
}[];

export type ProductData = Record<string, any>;

export type Value = {
  title: string;
  marca: string;
  price: number;
  description: string;
  category: string;
  subCategory: string;
  tags: string;
  stock: number;
  image: string;
  instrucciones: never[];
  [key: string]: any;
};
