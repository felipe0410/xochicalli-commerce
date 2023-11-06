import useAddProduct from "@/hooks/useAddProduct";
import ModalCategory from "@/pages/admin/addProduct/modalCategory";
import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const FirstStep = ({ setValue, values }: { setValue: any, values: any }) => {
  const { dataCategorias } = useAddProduct();
  const [arrayTags, setArrayTags] = useState([]);
  const [subCategoryForm, setSubCategoryForm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        const dataSubCategory = dataCategorias[value].subCategorys.subcateogory0.nameCategory
        const array = tags(dataSubCategory, value)
        setValue((prevState: any) => ({
          ...prevState,
          'tags': array[0],
          'subCategory': dataSubCategory
        }));
        break;
      case "subCategory":
        tags(value)
        setSubCategoryForm(value);
        break;
      case "tags":
        setEtiqueta(value);
        break;
      default:
        break;
    }
  };

  const tags = (subCategoryForm: string, categoryy = values.category) => {
    for (const tags in dataCategorias[categoryy]?.subCategorys) {
      if (dataCategorias[categoryy]?.subCategorys[tags].nameCategory === subCategoryForm) {
        const data = dataCategorias[categoryy]?.subCategorys[tags]?.subCategorys[0]?.value ?? []
        setArrayTags(dataCategorias[categoryy]?.subCategorys[tags]?.subCategorys[0]?.value ?? []);
        return data
      }
    }
  };


  const setData = (caregory: any = null) => {
    const subCaregoryy = dataCategorias[Object.keys(dataCategorias)[0]]?.subCategorys?.subcateogory0?.nameCategory ?? "";
    const etiquetas = dataCategorias[Object.keys(dataCategorias)[0]]?.subCategorys?.subcateogory0?.subCategorys[0]?.value ?? [];
    setSubCategoryForm(subCaregoryy);
    setArrayTags(etiquetas);
    if (caregory === null) {
      setValue((prevState: any) => ({
        ...prevState,
        'subCategory': subCaregoryy,
        'tags': etiquetas[0]
      }));
    } else {
      const tagss = tags(subCategoryForm)
      setValue((prevState: any) => ({
        ...prevState,
        'subCategory': subCategoryForm,
        'tags': tagss[0]
      }));
    }

  }

  useEffect(() => {
    if (values?.subCategory?.length === 0) {
      setData()
    }

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
          <Select name='category' onChange={handle} value={values.category}>
            {dataCategorias?.categorias?.map((categoria: string) => (
              <option
                key={crypto.randomUUID()}
                value={categoria}
              >
                {categoria}
              </option>
            ))}
          </Select>
          <ModalCategory propCategory={dataCategorias[values.category]} />
        </Box>
        {/* _____________________________________________ */}
        <FormLabel htmlFor='subcategory' style={{ marginTop: "7px" }}>
          Sub-Categoría
        </FormLabel>
        <Select value={values.subCategory} onChange={handle} name='subCategory'>
          {Object.keys(dataCategorias[values.category]?.subCategorys ?? "").map(
            (sybcategory: string) => {
              const nameSubCategory =
                dataCategorias[values.category]?.subCategorys[sybcategory]
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
              Etiquetas
            </FormLabel>
            <Select value={values.tags} onChange={handle} name='tags'>
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
