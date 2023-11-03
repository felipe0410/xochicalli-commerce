import { Inputs } from "@/interfaces";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import ButtonComponent from "./ButtonComponent";

const SecondStep = ({
  setValue,
  setStep1,
}: {
  setValue: any;
  setStep1: any;
}) => {
  const toast = useToast();

  const handle = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setValue((prevState: Inputs) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showToast = (
    title: string,
    description: string,
    status: "info" | "warning" | "success" | "error"
  ) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  const handleNextClick = () => {
    const titleValue = getValue("title");
    const marcaValue = getValue("marca");
    const priceValue = getValue("price");
    const descriptionValue = getValue("description");

    if (!titleValue || !marcaValue || !priceValue || !descriptionValue) {
      showToast(
        "Error",
        "Por favor, completa todos los campos antes de continuar",
        "error"
      );
      return;
    }
    setStep1(true);
  };

  const getValue = (name: string) => {
    const element = document.querySelector(
      `[name=${name}]`
    ) as HTMLInputElement;
    return element.value.trim();
  };

  return (
    <>
      <Box sx={{ textAlign: "-webkit-center" }}>
        <div style={{ textAlign: "center", width: "150px" }}>
          <strong>Caracteristicas Principales</strong>
        </div>
      </Box>
      <FormControl mb={4}>
        <FormLabel>Nombre de producto</FormLabel>
        <Input
          name='title'
          type='text'
          borderColor='gray.200'
          placeholder='Planta medicinal'
          onChange={handle}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor='marca'>Marca</FormLabel>
        <Input
          type='text'
          name='marca'
          borderColor='gray.200'
          placeholder='Xochicalli'
          onChange={handle}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor='price'>Precio</FormLabel>
        <InputGroup>
          <InputLeftAddon children='$' />
          <Input
            name='price'
            type='number'
            borderColor='gray.200'
            placeholder='12345'
            onChange={handle}
          />
          <InputRightAddon children='MXN' />
        </InputGroup>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor='description'>Descripción del producto</FormLabel>
        <Textarea
          name='description'
          borderColor='gray.200'
          placeholder='Planta con aroma agradable para curar enfermedades'
          onChange={handle}
        />
      </FormControl>
      <ButtonComponent name='Siguiente' fn={handleNextClick} />
    </>
  );
};

export default SecondStep;
