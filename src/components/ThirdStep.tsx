import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Select,
  VisuallyHiddenInput,
  useToast,
  Text,
  IconButton,
} from "@chakra-ui/react";

import { FaCloudUploadAlt } from "react-icons/fa";
import { useRef, useState, RefObject, useEffect } from "react";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase";
import { dataInputs } from "@/pages/admin/addProduct/data";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { InputData } from "@/pages/admin/addProduct/interface";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { ArrowBackIcon } from "@chakra-ui/icons";
const ThirdStep = ({
  values,
  setValue,
  setStep2,
}: {
  values: any;
  setValue: any;
  setStep2: any;
}) => {
  const [loading, setLoading] = useState(false)
  const [upload, setUpload] = useState(false);
  const [imageBase64, setImageBase64] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const data = dataInputs;
  const categories = values?.category;
  const subcategories = values?.subCategory;
  const blockInputs: any = data[categories][subcategories] === undefined ?
    [{
      name: "datos adicionales",
      type: "text",
      component: "input",
    }]
    : data[categories][subcategories]
  const handle = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setValue((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const uploadImage = (fileRef: RefObject<HTMLInputElement>) => {
    if (fileRef.current?.files?.length) {
      const file = fileRef.current.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String: any = event?.target?.result;
        if (base64String) setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No file selected");
    }
  };

  const handleAcceptImage = (fileRef: any) => {
    console.log('entro aqui:>')
    setLoading(true)
    if (fileRef.current?.files?.length) {
      const file = fileRef.current.files[0];
      const fileName = file.name;
      const imgRef = ref(storage, `products/${v4() + fileName}`);
      uploadImageToFirebase(imgRef, file);
      setLoading(false)
    } else {
      toast({
        title: "No se ha seleccionado ninguna imagen",
        duration: 2000,
        status: "error",
        position: "top-right",
      });
      setLoading(false)
    }
  };

  // const showToast = (title: string, description: string, status: "success") => {
  //   toast({
  //     title,
  //     description,
  //     status,
  //     duration: 3000,
  //     isClosable: true,
  //   });
  // };


  const handleCancel = () => {
    setImageBase64("");
    setUpload(false);
    setValue((prevState: any) => ({
      ...prevState,
      image: "",
    }));
  };

  const uploadImageToFirebase = (imgRef: any, file: any) => {
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
        setValue((prevState: any) => ({
          ...prevState,
          image: url,
        }));
      }
    );
  };

  const duplex = (name: string, data: [], type: string) => {
    return (
      <Box>
        <FormLabel htmlFor='content'>{name}</FormLabel>
        <Box display={"flex"}>
          <Input
            onChange={handle}
            name={name}
            type={type}
            borderColor='gray.200'
            placeholder='350'
            width={"350px"}
          />
          <Select
            name='unidad'
            width={"150px"}
            onChange={handle}
            value={values.unidad}
          >
            {data?.map((content: string) => (
              <option key={crypto.randomUUID()} value={content}>
                {content}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
    );
  };

  const componentSelect = (name: string, data: []) => {
    return (
      <Box>
        <Box mb={4}>
          <FormLabel>{name}</FormLabel>
          <Select name={name} onChange={handle} value={values[name]}>
            {data?.map((delivery: string) => (
              <option key={crypto.randomUUID()} value={delivery}>
                {delivery}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
    );
  };

  const componentInput = (name: string, type: string) => {
    return (
      <Box>
        <FormLabel>{name}</FormLabel>
        <Input
          name={name}
          onChange={handle}
          type={type}
          borderColor='gray.200'
        />
      </Box>
    );
  };

  const pinInput = (name: string) => {
    return (
      <>
        <Text>{name}</Text>
        <HStack>
          <PinInput
            onChange={(e) => {
              setValue((prevState: any) => ({
                ...prevState,
                Graduacion: e,
              }));
            }}
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
      </>
    );
  };

  const tags = (name: string) => {
    return (
      <>
        <Text>{name}</Text>
        <TagsInput
          value={values?.instrucciones ?? []}
          onChange={(event: any) => {
            setValue((prevState: any) => ({
              ...prevState,
              instrucciones: event,
            }));
          }}
        />
      </>
    );
  };

  const returnComponent = (input: any) => {
    const { component, name, type, option } = input;
    switch (component) {
      case "select":
        return componentSelect(name, option);
      case "duplex":
        return duplex(name, option, type);
      case "input":
        return componentInput(name, type);
      case "tags":
        return tags(name);
      case "pin":
        return pinInput(name);
      default:
        break
    }
  };

  useEffect(() => {
    if (values.image.length > 0) {
      enqueueSnackbar('todo fue un exito', {
        variant: 'success', anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      })
    }
  }, [values.image.length])


  return (
    <>
      <SnackbarProvider />
      <IconButton
        aria-label="back"
        icon={<ArrowBackIcon />}
        onClick={() => { setStep2(false) }}
        w="max-content"
      />
      <Box sx={{ textAlign: "-webkit-center" }}>
        <div style={{ textAlign: "center", width: "150px" }}>
          <strong>Caracteristicas Secundarias</strong>
        </div>
      </Box>
      <FormControl mb={4}>
        <FormLabel htmlFor='stock'>Stock</FormLabel>
        <Input
          name='stock'
          type='number'
          borderColor='gray.200'
          placeholder='5'
          onChange={handle}
        />
      </FormControl>
      {blockInputs.map((input: InputData, index: any) => {
        return (
          <Box key={index}>
            {returnComponent(input)}
          </Box>
        );
      })}
      <FormControl mb={4}>
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
                justifyContent: "space-evenly",
                marginY: "10px",
              }}
              display={values.image.length > 0 ? 'none' : 'flex'}
            >
              <Button
                isLoading={loading}
                loadingText='Cargando img'
                colorScheme='blue'
                onClick={() => handleAcceptImage(fileRef)}
              >
                Cargar imagen
              </Button>
              <Button colorScheme='red' onClick={() => handleCancel()}>
                Cancelar
              </Button>
            </Box>
          </Box>
        )}
      </FormControl>
    </>
  );
};

export default ThirdStep;
