import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VisuallyHiddenInput,
  useToast,
  IconButton,
} from "@chakra-ui/react";

import { FaCloudUploadAlt } from "react-icons/fa";
import { useRef, useState, RefObject, useEffect } from "react";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase";
import { dataInputs } from "@/pages/admin/addProduct/data";
import { InputData } from "@/pages/admin/addProduct/interface";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ComponentInput, ComponentPinInput, ComponentSelect, Duplex, Tags } from "@/pages/admin/addProduct/Component";
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


  const returnComponent = (input: any) => {
    const { component, name, type, option } = input;
    switch (component) {
      case "select":
        return ComponentSelect(name, option, handle, values);
      case "duplex":
        return Duplex(name, option, type, handle,values);
      case "input":
        return ComponentInput(name, type, handle);
      case "tags":
        return Tags(name, handle,values,setValue);
      case "pin":
        return ComponentPinInput(name, setValue);
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
