import { FC, RefObject, useEffect, useRef, useState } from "react";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { v4 } from "uuid";

import { Inputs } from "@/interfaces";
import { addProduct, getCategorias } from "@/utils";
import { storage } from "@/firebase";
import React from "react";
import ModalCategory from "./modalCategory";

const AddProduct: FC = (): JSX.Element => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [dataCategorias, setDataCategorias] = useState<any>({});

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>();

  const toast = useToast();

  const navigate = useNavigate();
  const handleGoProducts = () => navigate("/admin/products");

  const uploadImage = async (fileRef: RefObject<HTMLInputElement>) => {
    try {
      const file = fileRef.current?.files?.[0] ?? new Blob();
      const fileName = file?.name;
      const imgRef = ref(storage, `products/${v4() + fileName}`);
      const imgUpload = uploadBytesResumable(imgRef, file);

      if (!file) {
        console.error("No file selected");
        return;
      }

      imgUpload.on(
        "state_changed",
        ({ state }) => {
          switch (state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (err) => {
          console.error(err);
        },
        async () => {
          const url = await getDownloadURL(imgUpload.snapshot.ref);
          setImageUrl(url);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    await addProduct(values, imageUrl)
      .then(() => {
        toast({
          title: "Producto subido correctamente",
          duration: 2000,
          status: "success",
          position: "top-right",
        });
        reset();
      })
      .catch(() => {
        toast({
          title: "¡Algo salió mal!",
          duration: 2000,
          status: "error",
          position: "top-right",
        });
      });
  };
  useEffect(() => {
    const getDataCategorias = async () => {
      const dataCategorias = await getCategorias();
      setDataCategorias(dataCategorias);
    };
    getDataCategorias();
  }, []);

  return (
    <VStack h="calc(100vh - 64px)" bgColor="gray.200" gap={4}>
      <Helmet>
        <title>Agregar producto</title>
      </Helmet>
      <Heading my={4}>Añadir un producto</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          w={[350, 450, 550, 650]}
          bgColor="white"
          p={5}
          borderRadius="xl"
          boxShadow="xs"
        >
          <FormControl isInvalid={!!errors.title} mb={4}>
            <FormLabel htmlFor="title">Nombre de producto</FormLabel>
            <Input
              type="text"
              id="title"
              borderColor="gray.200"
              placeholder="Planta medicinal"
              {...register("title", {
                required: true,
                minLength: 4,
              })}
            />
            {errors.title && (
              <FormErrorMessage>El título es requerido</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.description} mb={4}>
            <FormLabel htmlFor="description">
              Descripción del producto
            </FormLabel>
            <Textarea
              id="description"
              borderColor="gray.200"
              placeholder="Planta con aroma agradable para curar enfermedades"
              {...register("description", {
                required: true,
                minLength: 10,
              })}
            />
            {errors.description && (
              <FormErrorMessage>La descripción es requerida</FormErrorMessage>
            )}
          </FormControl>
          <Box>
            <FormControl isInvalid={!!errors.category} mb={4}>
              <FormLabel htmlFor="category">Categoría</FormLabel>
              <Box style={{ display: "flex" }}>
                <Select
                  defaultValue="Plantas"
                  {...register("category", {
                    required: true,
                  })}
                >
                  {dataCategorias?.categorias?.map((categoria: string) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </Select>
                <ModalCategory />
              </Box>
              {errors.category && (
                <FormErrorMessage>La categoría es requerida</FormErrorMessage>
              )}
            </FormControl>
          </Box>

          <FormControl isInvalid={!!errors.stock} mb={4}>
            <FormLabel htmlFor="stock">Stock</FormLabel>
            <Input
              id="stock"
              type="number"
              borderColor="gray.200"
              placeholder="5"
              {...register("stock", {
                required: true,
                min: 5,
              })}
            />
            {errors.stock && (
              <FormErrorMessage>
                El stock de producto es requerido
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.price} mb={4}>
            <FormLabel htmlFor="price">Precio</FormLabel>
            <InputGroup>
              <InputLeftAddon children="$" />
              <Input
                id="price"
                type="number"
                borderColor="gray.200"
                placeholder="12345"
                {...register("price", {
                  required: true,
                  min: 20,
                })}
              />
              <InputRightAddon children="MXN" />
            </InputGroup>
            {errors.price && (
              <FormErrorMessage>El precio es requerido</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.image} mb={4}>
            <FormLabel htmlFor="image">Imagen</FormLabel>
            <input
              type="file"
              id="image"
              ref={fileRef}
              onChange={() => uploadImage(fileRef)}
            />
            {errors.price && (
              <FormErrorMessage>La imagen es requerida</FormErrorMessage>
            )}
          </FormControl>

          <Button
            isLoading={isSubmitting}
            loadingText="Agregando producto..."
            colorScheme="blue"
            width="100%"
            isDisabled={imageUrl ? false : true}
            type="submit"
            mb={2}
          >
            Agregar producto
          </Button>
          <Button
            colorScheme="linkedin"
            width="100%"
            onClick={handleGoProducts}
          >
            Ver productos
          </Button>
        </Box>
      </form>
    </VStack>
  );
};

export default AddProduct;
