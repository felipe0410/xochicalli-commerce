import { getCategorias } from "@/utils";
import { useEffect, useState } from "react";

const useAddProduct = () => {
  const [dataCategorias, setDataCategorias] = useState<any>({});

  useEffect(() => {
    const getDataCategorias = async () => {
      const data = await getCategorias();
      console.log(data);

      setDataCategorias(data);
    };

    getDataCategorias();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("FUERAA", dataCategorias);

  return { dataCategorias };
};

export default useAddProduct;
