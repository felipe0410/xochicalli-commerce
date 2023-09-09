import { useMemo } from 'react';

export const usePrice = (price: number) => {
    const newPrice: string = useMemo(() => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency', currency: 'MXN'
        }).format(price);
    }, [price]).replace('.00', '')

    return { newPrice }
}