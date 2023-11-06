import React, { FC, useState } from "react";

import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import FirstStep from "@/components/FirstStep";
import SecondStep from "@/components/SecondStep";
import ThirdStep from "@/components/ThirdStep";
import { addProduct } from "@/utils";
import { useToast } from "@chakra-ui/react";
import { Value } from "./interface";
import { v4 } from "uuid";

const AddProduct: FC = (): JSX.Element => {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const toast = useToast();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState<Value>({
    id: v4(),
    title: "",
    marca: "",
    price: 0,
    description: "",
    // step-2
    category: "FLORES",
    subCategory: "ROSAS",
    tags: "De temporada",
    // step-3
    stock: 0,
    image: "",
    instrucciones: [],
  });

  console.log("vlaue-2:::>", value);

  const onSubmit = async (values: Value) => {
    console.log("values::>", values);
    const nn = await addProduct(values);

    toast({
      title: "Producto subido correctamente",
      duration: 2000,
      status: "success",
      position: "top-right",
    });
    console.log(nn);
  };

  return (
    <VStack h='auto' paddingBottom={"2%"} bgColor='gray.200' gap={4}>
      <Helmet>
        <title>Agregar producto</title>
      </Helmet>
      <Heading my={4}>Añadir un producto</Heading>
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
            <FirstStep setValue={setValue} values={value} />
            <Button onClick={() => setStep1(false)}>{"Atrás"}</Button>
            <Button onClick={() => setStep2(true)}>{"Siguiente"}</Button>
          </>
        ) : (
          <>
            <ThirdStep values={value} setValue={setValue} setStep2={setStep2} />
            <Button
              loadingText='Agregando producto...'
              colorScheme='blue'
              width='100%'
              isDisabled={!(value.image.length > 0)}
              type='submit'
              mb={2}
              onClick={() => onSubmit(value)}
            >
              Agregar producto
            </Button>
          </>
        )}
      </Box>
    </VStack>
  );
};

export default AddProduct;
