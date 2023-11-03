import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Inputs } from "@/interfaces";
import { FaCloudUploadAlt } from "react-icons/fa";

const ThirdStep = ({
  upload,
  fileRef,
  setUpload,
  uploadImage,
  imageBase64,
  handleAcceptImage,
  handleCancel,
}: {
  upload: boolean;
  fileRef: any;
  setUpload: any;
  uploadImage: any;
  imageBase64: string;
  handleAcceptImage: any;
  handleCancel: any;
}) => {
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const deliverySelect = ["Bolsa", "Caja"];
  const contentSelect = ["Gramos", "kilos", "Oz"];
  return (
    <>
      <Box sx={{ textAlign: "-webkit-center" }}>
        <div style={{ textAlign: "center", width: "150px" }}>
          <strong>Caracteristicas Secundarias</strong>
        </div>
      </Box>
      <FormControl isInvalid={!!errors.stock} mb={4}>
        <FormLabel htmlFor='stock'>Stock</FormLabel>
        <Input
          id='stock'
          type='number'
          borderColor='gray.200'
          placeholder='5'
          {...register("stock", {
            required: true,
            min: 5,
          })}
        />
        {errors.stock && (
          <FormErrorMessage>El stock de producto es requerido</FormErrorMessage>
        )}
      </FormControl>

      <Box mb={4}>
        <FormLabel htmlFor='delivery'>Presentación</FormLabel>
        <Select
        // {...register("tags", {
        //   required: true,
        // })}
        // onChange={(e) => handleSelectChangeTags(e)}
        >
          {deliverySelect?.map((delivery: string) => (
            <option key={crypto.randomUUID()} value={delivery}>
              {delivery}
            </option>
          ))}
        </Select>
      </Box>
      <FormControl mb={4}>
        <FormLabel htmlFor='content'>Contenido</FormLabel>
        <Box display={"flex"}>
          <Input
            type='text'
            id='content'
            borderColor='gray.200'
            placeholder='350'
            width={"350px"}
            // {...register("title", {
            //   required: true,
            //   minLength: 4,
            // })}
          />
          {/* {errors.title && (
              <FormErrorMessage>El título es requerido</FormErrorMessage>
            )} */}
          <Select
            width={"150px"}
            // {...register("tags", {
            //   required: true,
            // })}
            // value={etiqueta}
            // onChange={(e) => handleSelectChangeTags(e)}
          >
            {contentSelect?.map((content: string) => (
              <option key={crypto.randomUUID()} value={content}>
                {content}
              </option>
            ))}
          </Select>
        </Box>
      </FormControl>

      <FormControl isInvalid={!!errors.image} mb={4}>
        <FormLabel htmlFor='image'>Imagen</FormLabel>
        <Box
          style={{
            padding: "20%",
            textAlign: "center",
            border: "#00000040 dashed",
            display: upload ? "none" : "block",
          }}
        >
          <Button
            as='label'
            background={"blue.100"}
            rightIcon={<FaCloudUploadAlt />}
          >
            Upload IMG
            <VisuallyHiddenInput
              accept='image/*'
              ref={fileRef}
              onChange={() => {
                setUpload(true);
                uploadImage(fileRef);
              }}
              type='file'
            />
          </Button>
        </Box>
        {imageBase64 && (
          <Box
            id='contianer_img'
            sx={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img style={{ width: "90%" }} src={imageBase64} alt='Preview' />
            <Box
              sx={{
                width: "90%",
                display: "flex",
                justifyContent: "space-evenly",
                marginY: "10px",
              }}
            >
              <Button
                colorScheme='blue'
                onClick={() => handleAcceptImage(fileRef)}
              >
                Aceptar imagen
              </Button>
              <Button colorScheme='red' onClick={() => handleCancel()}>
                Cancelar
              </Button>
            </Box>
          </Box>
        )}
        {errors.image && (
          <FormErrorMessage>La imagen es requerida</FormErrorMessage>
        )}
      </FormControl>
    </>
  );
};

export default ThirdStep;
