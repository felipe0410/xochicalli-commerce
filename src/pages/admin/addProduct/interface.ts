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