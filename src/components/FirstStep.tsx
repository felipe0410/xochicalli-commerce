import useAddProduct from "@/hooks/useAddProduct";
import { Inputs } from "@/interfaces";
import ModalCategory from "@/pages/admin/addProduct/modalCategory";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const FirstStep = () => {
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const { dataCategorias } = useAddProduct();
  const [category, setCategory] = useState("");
  const [arrayTags, setArrayTags] = useState([]);
  const [subCategoryForm, setSubCategoryForm] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const inputValues = localStorage.getItem("dataValues");

  console.log(dataCategorias);

  const handleSelectChange = (event: any) => {
    const category = event.target.value;
    setCategory(category);
  };

  const handleSelectChangeSubCategory = (event: any) => {
    const subCategoryForm = event.target.value;
    setSubCategoryForm(subCategoryForm);
    tags(subCategoryForm);
  };

  const handleSelectChangeTags = (event: any) => {
    const etiqueta = event.target.value;
    setEtiqueta(etiqueta);
  };

  useEffect(() => {
    const subCaregoryy =
      dataCategorias[Object.keys(dataCategorias)[0]].subCategorys.subcateogory0
        .nameCategory;
    const etiquetas =
      dataCategorias[Object.keys(dataCategorias)[0]].subCategorys.subcateogory0
        .subCategorys[0].value;
    setCategory(Object.keys(dataCategorias)[0]);
    tags(subCategoryForm);
    setSubCategoryForm(subCaregoryy);
    setArrayTags(etiquetas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (inputValues !== null) {
    const dataValues = JSON.parse(inputValues);
    dataValues.category = category;
    dataValues.subcategory = subCategoryForm;
    dataValues.tags = etiqueta;
  } else {
    localStorage.setItem("dataValues", JSON.stringify({}));
  }

  return (
    <>
      <Box sx={{ textAlign: "-webkit-center" }}>
        <div style={{ textAlign: "center", width: "150px" }}>
          <strong>Categoria</strong>
        </div>
      </Box>
      <FormControl isInvalid={!!errors.category} mb={4}>
        <FormLabel htmlFor='category'>Categoría</FormLabel>
        <Box style={{ display: "flex" }}>
          <Select
            {...register("category", {
              required: true,
            })}
            onChange={(e) => handleSelectChange(e)}
          >
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
        <Select
          {...register("subcategory", {
            required: true,
          })}
          value={subCategoryForm}
          onChange={(e) => handleSelectChangeSubCategory(e)}
        >
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
            <Select
              {...register("tags", {
                required: true,
              })}
              value={etiqueta}
              onChange={(e) => handleSelectChangeTags(e)}
            >
              {arrayTags?.map((sybcategory: string) => (
                <option key={sybcategory} value={sybcategory}>
                  {sybcategory}
                </option>
              ))}
            </Select>
          </Box>
        }
        {/* _____________________________________________ */}
        {errors.tags && (
          <FormErrorMessage>La subsubcategoria es requerida</FormErrorMessage>
        )}
      </FormControl>
    </>
  );
};

export default FirstStep;
