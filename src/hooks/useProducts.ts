import { useState, useEffect } from "react";

import { getProducts } from "@/utils";
import { Product } from "@/interfaces";

export const useProducts = () => {
  const [more, setMore] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([
    {
      id: "",
      title: "",
      subcategory: "",
      tags: "",
      price: 0,
      description: "",
      image: "",
      category: "",
      subCategory: ''
    },
  ]);

  const handleNextProd = () => {
    if (products)
      if (more === products.length || more <= products.length)
        setMore(more + 3);
      else return;
  };

  const handlePrevProd = () => {
    if (more !== 3) setMore(more - 3);
    else return;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data: any = await getProducts();
      console.log('data::>', data)
      if (data.length === 0) {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
          console.log('ingrese a true')
          setProducts(JSON.parse(storedProducts));
        }
      } else {
        console.log('ingrese a false')
        setProducts(data as Product[]);
        localStorage.setItem('products', JSON.stringify(products));
      }
      setLoading(false);
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleNextProd,
    handlePrevProd,
    loading,
    more,
    products,
    setProducts,
  };
};
