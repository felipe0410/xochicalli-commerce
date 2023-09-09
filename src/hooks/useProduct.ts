import { useState, useEffect } from 'react';

import { getProduct } from '@/utils';
import { Product } from '@/interfaces';

export const useProduct = (id: string) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [product, setProductData] = useState<Product>()

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            const data = await getProduct('products', id)
            setProductData(data as Product)
            setLoading(false)
        }

        fetchProduct()
    }, [id])

    return {
        loading,
        product,
    }
}
