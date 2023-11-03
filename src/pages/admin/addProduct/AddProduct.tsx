import React, { FC, useState } from "react";

import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FirstStep from "@/components/FirstStep";
import SecondStep from "@/components/SecondStep";
import ThirdStep from "@/components/ThirdStep";
import { addProductData } from "@/utils";
import { useToast } from "@chakra-ui/react";
import { AllProperties, ProductData, Value } from "./interface";

const AddProduct: FC = (): JSX.Element => {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const toast = useToast();
  const [validar, setValidar] = useState(false);
  const [value, setValue] = useState<Value>({
    title: "",
    marca: "",
    price: 0,
    description: "",
    // step-2
    category: "FLORES",
    subCategory: "SubCategory",
    tags: "",
    // step-3
    stock: 0,
    image: "",
    instrucciones: [],
  });
  console.log("vlaue-2:::>", value);
  const navigate = useNavigate();
  const handleGoProducts = () => navigate("/admin/products");

  // const onSubmit = async (values) => {
  //   console.log("values::>", values);
  //   await addProduct(values, imageUrl)
  //     .then(() => {
  //       toast({
  //         title: "Producto subido correctamente",
  //         duration: 2000,
  //         status: "success",
  //         position: "top-right",
  //       });
  //       reset();
  //     })
  //     .catch(() => {
  //       toast({
  //         title: "¡Algo salió mal!",
  //         duration: 2000,
  //         status: "error",
  //         position: "top-right",
  //       });
  //     });
  // };

  const handleSubmit = async () => {
    try {
      const allProperties: AllProperties = Object.keys(value).map((key) => ({
        property: key,
        value: value[key],
      }));

      const productData: ProductData = { ...value };

      allProperties.forEach((property) => {
        productData[property.property] = property.value;
      });

      console.log("productData::>", productData);

      await addProductData(productData)
        .then(() => {
          toast({
            title: "Producto subido correctamente",
            duration: 2000,
            status: "success",
            position: "top-right",
          });
          // setValue({
          //   title: "",
          //   marca: "",
          //   price: 0,
          //   description: "",
          //   category: "FLORES",
          //   subCategory: "SubCategory",
          //   tags: "",
          //   stock: 0,
          //   image: "",
          //   instrucciones: [],
          // });
        })
        .catch(() => {
          toast({
            title: "¡Algo salió mal!",
            duration: 2000,
            status: "error",
            position: "top-right",
          });
        });
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  return (
    <VStack h='auto' paddingBottom={"2%"} bgColor='gray.200' gap={4}>
      <Helmet>
        <title>Agregar producto</title>
      </Helmet>
      <Heading my={4}>Añadir un producto</Heading>
      <form>
        <Box
          w={[350, 450, 550, 650]}
          bgColor='white'
          p={5}
          borderRadius='xl'
          boxShadow='xs'
        >
          {step1 === false ? (
            <>
              <SecondStep setValue={setValue} setStep1={setStep1} />
            </>
          ) : step2 === false ? (
            <>
              <FirstStep setValue={setValue} />
              <Button onClick={() => setStep1(false)}>{"Atrás"}</Button>
              <Button onClick={() => setStep2(true)}>{"Siguiente"}</Button>
            </>
          ) : (
            <>
              <ThirdStep
                values={value}
                setValue={setValue}
                setValidar={setValidar}
              />
              <Button
                loadingText='Agregando producto...'
                colorScheme='blue'
                width='100%'
                isDisabled={validar ? false : true}
                type='submit'
                mb={2}
                onClick={handleSubmit}
              >
                Agregar producto
              </Button>
              <Button
                colorScheme='linkedin'
                width='100%'
                onClick={handleGoProducts}
              >
                Ver productos
              </Button>
            </>
          )}
        </Box>
      </form>
    </VStack>
  );
};

export default AddProduct;
