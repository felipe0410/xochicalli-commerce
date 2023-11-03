import React, { FC, useState } from "react";

import {
  Box,
  Button,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FirstStep from "@/components/FirstStep";
import SecondStep from "@/components/SecondStep";
import ThirdStep from "@/components/ThirdStep";

const AddProduct: FC = (): JSX.Element => {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [value, setValue] = useState({
    title: "",
    marca: "",
    price: 0,
    description: "",
    // step-2
    category: "",
    subCategory: "",
    tags: "",
    // step-3
    stock: 0,
    image: '',
    Presentación: "",
    Contenido: "",
    unidad: "",
    Material: "",
    Graduacion: "",
    instrucciones: []
  })
  console.log('vlaue-2:::>', value)
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

  return (
    <VStack h='auto' paddingBottom={"2%"} bgColor='gray.200' gap={4}>
      <Helmet>
        <title>Agregar producto</title>
      </Helmet>
      <Heading my={4}>Añadir un producto</Heading>
      <form >
        <Box
          w={[350, 450, 550, 650]}
          bgColor='white'
          p={5}
          borderRadius='xl'
          boxShadow='xs'
        >
          {step1 === false ? (
            <>
              <SecondStep setValue={setValue} />
              <Button onClick={() => setStep1(true)}>Siguiente</Button>
            </>
          ) : step2 === false ? (
            <>
              <FirstStep setValue={setValue} />
              <Button onClick={() => setStep1(false)}>{'Atrás'}</Button>
              <Button onClick={() => setStep2(true)}>{'Siguiente'}</Button>
            </>
          ) : (
            <>
              <ThirdStep values={value} setValue={setValue} />
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
