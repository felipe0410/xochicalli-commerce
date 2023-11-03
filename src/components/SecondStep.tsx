import { Inputs } from "@/interfaces";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const SecondStep = () => {
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>();
  return (
    <>
      <Box sx={{ textAlign: "-webkit-center" }}>
        <div style={{ textAlign: "center", width: "150px" }}>
          <strong>Caracteristicas Principales</strong>
        </div>
      </Box>
      <FormControl isInvalid={!!errors.title} mb={4}>
        <FormLabel htmlFor='marca'>Marca</FormLabel>
        <Input
          type='text'
          id='marca'
          borderColor='gray.200'
          placeholder='Xochicalli'
          // {...register("title", {
          //   required: true,
          //   minLength: 4,
          // })}
        />
        {/* {errors.marca && (
      <FormErrorMessage>La marca es requerida</FormErrorMessage>
    )} */}
      </FormControl>

      <FormControl isInvalid={!!errors.title} mb={4}>
        <FormLabel htmlFor='title'>Nombre de producto</FormLabel>
        <Input
          type='text'
          id='title'
          borderColor='gray.200'
          placeholder='Planta medicinal'
          {...register("title", {
            required: true,
            minLength: 4,
          })}
        />
        {errors.title && (
          <FormErrorMessage>El título es requerido</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.price} mb={4}>
        <FormLabel htmlFor='price'>Precio</FormLabel>
        <InputGroup>
          <InputLeftAddon children='$' />
          <Input
            id='price'
            type='number'
            borderColor='gray.200'
            placeholder='12345'
            {...register("price", {
              required: true,
              min: 20,
            })}
          />
          <InputRightAddon children='MXN' />
        </InputGroup>
        {errors.price && (
          <FormErrorMessage>El precio es requerido</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.description} mb={4}>
        <FormLabel htmlFor='description'>Descripción del producto</FormLabel>
        <Textarea
          id='description'
          borderColor='gray.200'
          placeholder='Planta con aroma agradable para curar enfermedades'
          {...register("description", {
            required: true,
            minLength: 10,
          })}
        />
        {errors.description && (
          <FormErrorMessage>La descripción es requerida</FormErrorMessage>
        )}
      </FormControl>
    </>
  );
};

export default SecondStep;
