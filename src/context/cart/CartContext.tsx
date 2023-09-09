import { createContext } from 'react';

import { CartContextType } from '@/types';
import { Product } from '@/interfaces';

export const CartContext = createContext<CartContextType>({
  cart: [] as Product[],
  total: 0,
  getProductAmount: () => 0,
  addToCart: () => { },
  removeFromCart: () => { },
  addOneToCart: () => { },
  removeOneFromCart: () => { },
  clearCart: () => { },
});