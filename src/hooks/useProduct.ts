import { useState, useEffect } from 'react';

import { getProduct } from '@/utils';
import { Product } from '@/interfaces';
import { object } from 'yup';

export const useProduct = (id: string) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [product, setProductData] = useState<Product>()

    const getProductById = (products: any[], id: any) => {
        console.log('entro aqui:::>')
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
                console.log('%cdata::>', 'color:red', data)
                console.log('%cdata::>', 'color:red', Object.keys("FirebaseError: Failed to get document because the client is offline.")?.length)
                if (Object.keys(data)?.length === 0) {
                    const getData = getProductById(localData, id)
                    setProductData(getData as Product)
                    setLoading(false)

                } else {
                    setProductData(data as Product)
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
