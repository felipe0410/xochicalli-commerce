import { useState, useEffect } from "react";

import { getProducts } from "@/utils";
import { Product } from "@/interfaces";

export const useProducts = () => {
  const [more, setMore] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);
  const [count, setCount] = useState(0)
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
      // const data: any = [];
      console.log('data::>', data)
      console.log('data::>', data.length)
      if (data.length === 0) {
        const storedProducts = localStorage.getItem('products');
        console.log('storedProducts::>', storedProducts)
        if (storedProducts) {
          console.log('ingrese a true')
          setProducts(JSON.parse(storedProducts));
          setLoading(false);
        }
      } else {
        setCount((e) => e + 1)
        console.log('ingrese a false')
        setProducts(data as Product[]);
        localStorage.setItem('products', JSON.stringify(products));
        setLoading(false);

      }
      setLoading(false);
    };

    count < 3 && fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return {
    handleNextProd,
    handlePrevProd,
    loading,
    more,
    products,
    setProducts,
  };
};
