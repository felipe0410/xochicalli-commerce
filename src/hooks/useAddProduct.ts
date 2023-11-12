import { getCategorias } from "@/utils";
import { useEffect, useState } from "react";

const useAddProduct = () => {
  const [dataCategorias, setDataCategorias] = useState<any>({});
  useEffect(() => {
    const getDataCategorias = async () => {
      const data = await getCategorias();
      setDataCategorias(data);
    };
    getDataCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { dataCategorias };
};

export default useAddProduct;
