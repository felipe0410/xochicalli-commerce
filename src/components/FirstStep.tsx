import useAddProduct from "@/hooks/useAddProduct";
import ModalCategory from "@/pages/admin/addProduct/modalCategory";
import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const FirstStep = ({ setValue, values }: { setValue: any, values: any }) => {
  const { dataCategorias } = useAddProduct();
  const [category, setCategory] = useState("");
  const [arrayTags, setArrayTags] = useState([]);
  const [subCategoryForm, setSubCategoryForm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [etiqueta, setEtiqueta] = useState("");
  console.log(dataCategorias)
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
        setCategory(value);
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

  const tags = (subCategoryForm: string, categoryy = category) => {
    for (const tags in dataCategorias[categoryy]?.subCategorys) {
      // console.log('category::>', category)
      console.log('%csubCategoryForm::>', 'color:red', subCategoryForm)
      console.log('%ccategory::>', 'color:orange', categoryy)
      if (dataCategorias[categoryy]?.subCategorys[tags].nameCategory === subCategoryForm) {
        const data = dataCategorias[categoryy]?.subCategorys[tags]?.subCategorys[0]?.value ?? []
        console.log('%cdata:::>', 'color:green', data)
        // FLORES.subCategorys.subcateogory0.subCategorys[0].value
        setArrayTags(dataCategorias[categoryy]?.subCategorys[tags]?.subCategorys[0]?.value ?? []);
        return data
      }
    }
  };


  const setData = (caregory: any = null) => {
    //  let num = 0
    const subCaregoryy = dataCategorias[Object.keys(dataCategorias)[0]]?.subCategorys?.subcateogory0?.nameCategory ?? "";
    const etiquetas = dataCategorias[Object.keys(dataCategorias)[0]]?.subCategorys?.subcateogory0?.subCategorys[0]?.value ?? [];
    setCategory(Object.keys(dataCategorias)[0]);
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
      // console.log('tagss:::>', tagss)
      setValue((prevState: any) => ({
        ...prevState,
        'subCategory': subCategoryForm,
        'tags': tagss[0]
      }));
    }

  }

  useEffect(() => {
    setData()
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
              <option
                key={crypto.randomUUID()}
                value={categoria}
              >
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
        <Select value={values.subCategory} onChange={handle} name='subCategory'>
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
