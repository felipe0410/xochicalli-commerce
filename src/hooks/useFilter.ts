import { Product } from "@/interfaces";
import { ChangeEvent, useRef, useState } from "react";
import { useProducts } from "./useProducts";

export const useFilter = () => {
    const [query, setQuery] = useState<string>('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [sortOption, setSortOption] = useState<string>('');

    const searchInput = useRef<HTMLInputElement>(null)

    const { products } = useProducts();

    const filteredProducts = products.filter(({ title, category }: Product) => {
        const matchesQuery = title?.toLowerCase().includes(query.toLowerCase());
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(category);

        return matchesQuery && matchesCategory;
    });

    const handleSortChange = ({ target }: ChangeEvent<HTMLSelectElement>) => setSortOption(target.value);

    let sortedProducts = filteredProducts;

    switch (sortOption) {
        case 'asc':
            sortedProducts = filteredProducts.sort((a: any, b: any) => a.price - b.price);

            break;

        case 'desc':
            sortedProducts = filteredProducts.sort((a: any, b: any) => b.price - a.price);

            break;

        case 'title':
            sortedProducts = filteredProducts.sort((a: any, b: any) =>
                a.title.localeCompare(b.title)
            );

            break;

        case 'category':
            sortedProducts = filteredProducts.sort((a: any, b: any) =>
                a.category.localeCompare(b.category)
            );

            break;

        default:
            break;
    }

    const handleCategoryChange = (categories: string[]) => setSelectedCategories(categories)

    const onSearchInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { value } = target
        setQuery(value);
    };

    const onClearInput = () => {
        if (searchInput.current) {
            searchInput.current.value = ''
            setQuery('')
        }
    }

    return {
        searchInput,
        sortedProducts,
        handleSortChange,
        handleCategoryChange,
        onClearInput,
        onSearchInputChange,
    }
}