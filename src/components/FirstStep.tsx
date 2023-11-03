import useAddProduct from "@/hooks/useAddProduct";
import ModalCategory from "@/pages/admin/addProduct/modalCategory";
import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const FirstStep = ({ setValue }: { setValue: any }) => {
  const { dataCategorias } = useAddProduct();
  const [category, setCategory] = useState("");
  const [arrayTags, setArrayTags] = useState([]);
  const [subCategoryForm, setSubCategoryForm] = useState("");
  const [etiqueta, setEtiqueta] = useState("");

  const handle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setValue((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
    switch (name) {
      case "category":
        setCategory(value);
        break;
      case "subCategory":
        setSubCategoryForm(value);
        break;
      case "tags":
        setEtiqueta(value);
        break;
      default:
        break;
    }
  };

  const tags = (subCategoryForm: string) => {
    for (const tags in dataCategorias[category]?.subCategorys) {
      if (
        dataCategorias[category]?.subCategorys[tags].nameCategory ===
        subCategoryForm
      ) {
        setArrayTags(
          dataCategorias[category]?.subCategorys[tags]?.subCategorys[0]
            ?.value ?? []
        );
        break;
      }
    }
  };

  useEffect(() => {
    const subCaregoryy =
      dataCategorias[Object.keys(dataCategorias)[0]]?.subCategorys
        ?.subcateogory0?.nameCategory ?? "";
    const etiquetas =
      dataCategorias[Object.keys(dataCategorias)[0]]?.subCategorys
        ?.subcateogory0?.subCategorys[0]?.value ?? [];
    setCategory(Object.keys(dataCategorias)[0]);
    tags(subCategoryForm);
    setSubCategoryForm(subCaregoryy);
    setArrayTags(etiquetas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCategorias]);

  return (
    <>
      <Box sx={{ textAlign: "-webkit-center" }}>
        <div style={{ textAlign: "center", width: "150px" }}>
          <strong>Categoria</strong>
        </div>
      </Box>
      <FormControl mb={4}>
        <FormLabel htmlFor='category'>Categoría</FormLabel>
        <Box style={{ display: "flex" }}>
          <Select name='category' onChange={handle} value={category}>
            {dataCategorias?.categorias?.map((categoria: string) => (
              <option key={crypto.randomUUID()} value={categoria}>
                {categoria}
              </option>
            ))}
          </Select>
          <ModalCategory propCategory={dataCategorias[category]} />
        </Box>
        {/* _____________________________________________ */}
        <FormLabel htmlFor='subcategory' style={{ marginTop: "7px" }}>
          Subcategoría
        </FormLabel>
        <Select value={subCategoryForm} onChange={handle} name='subCategory'>
          {Object.keys(dataCategorias[category]?.subCategorys ?? "").map(
            (sybcategory: string) => {
              const nameSubCategory =
                dataCategorias[category]?.subCategorys[sybcategory]
                  ?.nameCategory ?? "";
              return (
                <option key={nameSubCategory} value={nameSubCategory}>
                  {nameSubCategory}
                </option>
              );
            }
          )}
        </Select>
        {
          <Box display={arrayTags.length > 0 ? "block" : "none"}>
            <FormLabel htmlFor='tags' style={{ marginTop: "7px" }}>
              Subsubcategoría
            </FormLabel>
            <Select value={etiqueta} onChange={handle} name='tags'>
              {arrayTags?.map((sybcategory: string) => (
                <option key={sybcategory} value={sybcategory}>
                  {sybcategory}
                </option>
              ))}
            </Select>
          </Box>
        }
      </FormControl>
    </>
  );
};

export default FirstStep;
