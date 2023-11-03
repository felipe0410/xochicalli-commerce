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
} from "@chakra-ui/react";

const SecondStep = ({ setValue }: { setValue: any }) => {

  const handle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setValue((prevState: Inputs) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <Box sx={{ textAlign: "-webkit-center" }}>
        <div style={{ textAlign: "center", width: "150px" }}>
          <strong>Caracteristicas Principales</strong>
        </div>
      </Box>
      <FormControl mb={4}>
        <FormLabel htmlFor='title'>Nombre de producto</FormLabel>
        <Input
          name="tile"
          type='text'
          id='title'
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
    </>
  );
};

export default SecondStep;
