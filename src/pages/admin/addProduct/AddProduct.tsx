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
  VisuallyHiddenInput,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { v4 } from "uuid";

import { Inputs } from "@/interfaces";
import { addProduct, getCategorias } from "@/utils";
import { storage } from "@/firebase";
import ModalCategory from "./modalCategory";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct: FC = (): JSX.Element => {
  const [upload, setUpload] = useState(false);
  const [imageBase64, setImageBase64] = useState("");
  const [category, setCategory] = useState("");
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
      if (file && !upload) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String: any = event?.target?.result;
          if (base64String) setImageBase64(base64String);
        };
        reader.readAsDataURL(file);
      }
      if (!file) {
        console.error("No file selected");
        return;
      }
      if (upload) {
        const imgUpload = uploadBytesResumable(imgRef, file);
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    console.log("values::>", values);
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
  const handleSelectChange = (event: any) => {
    const category = event.target.value;
    setCategory(category);
  };
  useEffect(() => {
    const getDataCategorias = async () => {
      const dataCategorias = await getCategorias();
      setDataCategorias(dataCategorias);
      setCategory(Object.keys(dataCategorias)[0]);
    };
    getDataCategorias();
  }, []);

  return (
    <VStack h="auto" paddingBottom={"2%"} bgColor="gray.200" gap={4}>
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
                  onChange={(e) => handleSelectChange(e)}
                >
                  {dataCategorias?.categorias?.map((categoria: string) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </Select>
                <ModalCategory propCategory={dataCategorias[category]} />
              </Box>
              {/* _____________________________________________ */}
              <Select
              // defaultValue="Plantas"
              // {...register("category", {
              //   required: true,
              // })}
              // onChange={(e) => handleSelectChange(e)}
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
              {/* _____________________________________________ */}
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
            <Box
              style={{
                padding: "20%",
                textAlign: "center",
                border: "#00000040 dashed",
                display: upload ? "none" : "block",
              }}
            >
              <Button
                as="label"
                background={"blue.100"}
                rightIcon={<FaCloudUploadAlt />}
              >
                Upload IMG
                <VisuallyHiddenInput
                  accept="image/*"
                  ref={fileRef}
                  onChange={() => {
                    uploadImage(fileRef);
                    setUpload(true);
                  }}
                  type="file"
                />
              </Button>
            </Box>
            {imageBase64 && (
              <Box
                id="contianer_img"
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img style={{ width: "90%" }} src={imageBase64} alt="Preview" />
                <Box
                  sx={{
                    width: "90%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginY: "10px",
                  }}
                >
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      uploadImage(fileRef)
                    }}
                  >
                    Aceptar imagen
                  </Button>
                  <Button colorScheme="red" onClick={() => {}}>
                    Cancelar
                  </Button>
                </Box>
              </Box>
            )}
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
