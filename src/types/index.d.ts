import { ReactNode } from 'react';

import { Product } from '@/interfaces';

export type ContextProps = {
    children: ReactNode;
}

export type CartContextType = {
    cart: CartItem[];
    getProductAmount: (product: Product) => number;
    total: number;
    addToCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
    addOneToCart: (product: Product) => void;
    removeOneFromCart: (product: Product) => void;
    clearCart: () => void;
}

export type PrivateRouteProps = {
    children: ReactNode;
    allowedRoles: "user" | "admin" | "moderator";
}

export type Providers = {
    providers: 'Google' | 'Facebook' | 'Twitter';
}

export type CartReducerAction = {
    type: 'GET_ITEM_QUANTITY' | 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'INCREASE_ITEM_QUANTITY' | 'DECREASE_ITEM_QUANTITY' | 'CLEAR_CART',
    payload?: Product;
}