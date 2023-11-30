import { useState, useEffect } from 'react';

import { getProduct } from '@/utils';
import { Product } from '@/interfaces';

export const useProduct = (id: string) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [product, setProductData] = useState<Product>()

    const getProductById = (products: any[], id: any) => {
        const tt = products.find(product => product.id === id);
        return tt
    }

    useEffect(() => {
        const fetchProduct = async () => {
            const localDataJson: any = localStorage.getItem('products')
            const localData: any = localDataJson ? JSON.parse(localDataJson) : [{}]

            setLoading(true)
            try {
                const data = await getProduct('products', id)
                if (Object.keys(data)?.length === 0 ) {
                    const getData = getProductById(localData, id)
                    setProductData(getData as Product)
                    setLoading(false)

                } else {
                    const getData = getProductById(localData, id)
                    setProductData(getData as Product)
                    setLoading(false)
                }
            } catch (error) {
                const getData = getProductById(localData, id)
                setProductData(getData as Product)
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    return {
        loading,
        product,
    }
}
