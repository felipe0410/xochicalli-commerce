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
      price: 0,
      description: "",
      image: "",
      category: "",
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
      const data = await getProducts();
      setProducts(data as Product[]);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return {
    handleNextProd,
    handlePrevProd,
    loading,
    more,
    products,
  };
};
