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