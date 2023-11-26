import { FC } from 'react';

import { CartContext } from './';
import { Product } from '@/interfaces';
import { ContextProps } from '@/types';
import { useLocalStorage } from '@/hooks';

interface CartItem extends Product {
  quantity: number;
}

export const CartProvider: FC<ContextProps> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', [] as CartItem[]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === existingItem.id
            ? { ...existingItem, quantity: existingItem.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product: Product) => setCart(currentCart => currentCart.filter(item => item.id !== product.id));

  const addOneToCart = (product: Product) => setCart(currentCart => {
    if (currentCart.find(item => item.id === product.id) === null) {
      return [...currentCart, { ...product, quantity: 1 } as CartItem]
    } else {
      return currentCart.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item;
        }
      }
      )
    }
  })

  const removeOneFromCart = (product: Product) =>
    setCart(currentCart => {
      if (currentCart.find(item => item.id === product.id)?.quantity === 1) {
        return currentCart.filter(item => item.id !== product.id);
      } else {
        return currentCart.map(item => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item;
          }
        }
        )
      }
    })

  const getProductAmount = (product: Product) => {
    const quantity = cart.reduce((total, item) => {
      if (item.id === product.id) {
        return total + item.quantity;
      }
      return total;
    }, 0);

    return quantity;
  };

  const total = cart.reduce((total, item) => total + item.quantity * item.price, 0);

  const clearCart = () => setCart([] as CartItem[]);

  return (
    <CartContext.Provider
      value={{ cart, getProductAmount, total, addToCart, removeFromCart, addOneToCart, removeOneFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
