import { saveCategoriasToFirebase } from "@/utils";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { CreateCategoryState } from "./interface";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import PopoverDeleteCategory from "./DeleteCategory";

const ModalCategory = ({ propCategory }: { propCategory: any }) => {
  const [success, setSuccess] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createCategory, setCreateCategory] = useState<CreateCategoryState>({
    categoria: "",
    finalCategory: false,
    numSubcategorys: 0,
    subCategorys: {},
  });
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const subCategory = (subcategory: any, index: any) => {
    const validation =
      createCategory?.subCategorys[subcategory]?.subCategorys?.numItems > 0;
    return (
      <Box>
        <FormLabel>Subcategoria-{index + 1}</FormLabel>
        <Box display={"flex"}>
          <Input
            value={
              createCategory?.subCategorys[subcategory]?.nameCategory ?? ""
            }
            onChange={(event) => {
              setCreateCategory((prevCreateCategory) => {
                const updatedCategory = { ...prevCreateCategory };
                updatedCategory.subCategorys[subcategory].nameCategory =
                  event.target.value;
                return updatedCategory;
              });
            }}
            ref={initialRef}
            placeholder="Abono"
          />
          <Button
            display={validation ? "none" : "block"}
            onClick={() => addCategory2(subcategory)}
            name="addSubcateogry"
          >
            <AddIcon />
          </Button>
          <Button>
            <DeleteIcon onClick={() => DeleteCategory(subcategory)} />
          </Button>
        </Box>
        {validation ? (
          <TagsInput
            value={
              createCategory?.subCategorys[subcategory]?.subCategorys[0]?.value
            }
            onChange={(event) => {
              setCreateCategory((tags) => {
                const updatedCategory = { ...createCategory };
                tags.subCategorys[subcategory].subCategorys[0].value = event;
                return updatedCategory;
              });
            }}
          />
        ) : null}
      </Box>
    );
  };

  const addCategory = () => {
    const num = createCategory.numSubcategorys;
    const name = "subcateogory" + num;
    setCreateCategory({
      ...createCategory,
      numSubcategorys: num + 1,
      subCategorys: {
        ...createCategory.subCategorys,
        [name]: {
          nameCategory: "",
          subCategorys: {
            numItems: 0,
          },
        },
      },
    });
  };
  const addCategory2 = (subcategory: string) => {
    const indexSubcategory2 =
      createCategory.subCategorys[subcategory].subCategorys.numItems;
    setCreateCategory((prevCreateCategory) => {
      const updatedCreateCategory = { ...prevCreateCategory };
      if (updatedCreateCategory.subCategorys.hasOwnProperty(subcategory)) {
        updatedCreateCategory.subCategorys[subcategory].subCategorys.numItems =
          indexSubcategory2 + 1;
        updatedCreateCategory.subCategorys[subcategory].subCategorys[
          indexSubcategory2
        ] = {
          name: "",
          value: [],
          finalCategory: false,
        };
      }
      return updatedCreateCategory;
    });
  };

  const DeleteCategory = (subcategoryKey: string) => {
    setCreateCategory((prevCreateCategory) => {
      const updatedCreateCategory = { ...prevCreateCategory };
      if (updatedCreateCategory.subCategorys.hasOwnProperty(subcategoryKey)) {
        delete updatedCreateCategory.subCategorys[subcategoryKey];
      }
      return updatedCreateCategory;
    });
  };

  const saveCategory = async () => {
    setSuccess(true);
    const save = await saveCategoriasToFirebase(createCategory);
    setCreateCategory({
      categoria: "",
      finalCategory: false,
      numSubcategorys: 0,
      subCategorys: {},
    });
    enqueueSnackbar(
      save ? "Categoria agregada con exito" : "Error al agregar categoria",
      {
        variant: save ? "success" : "error",
        preventDuplicate: true,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      }
    );
    setSuccess(false);
    onClose();
  };

  return (
    <>
      <SnackbarProvider />
      <Button
        onClick={() => {
          onOpen();
          setCreateCategory({
            categoria: "",
            finalCategory: false,
            numSubcategorys: 0,
            subCategorys: {},
          });
        }}
      >
        <AddIcon />
      </Button>
      <Button
        ml={4}
        onClick={() => {
          setDeleteCategory(true);
          onOpen();
          setCreateCategory(propCategory);
        }}
        ref={finalRef}
      >
        <EditIcon />
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Categoria</FormLabel>
              <Box display={"flex"}>
                <Input
                  value={createCategory.categoria}
                  onChange={(event) =>
                    setCreateCategory({
                      ...createCategory,
                      categoria: event.target.value,
                    })
                  }
                  ref={initialRef}
                  placeholder="Abono"
                />
                <Button onClick={addCategory}>
                  <AddIcon />
                </Button>
                {deleteCategory ? (
                  <PopoverDeleteCategory category={createCategory.categoria} />
                ) : null}
              </Box>
            </FormControl>
            {Object.keys(createCategory.subCategorys).map(
              (categoryKey, index) => (
                <Box key={categoryKey}>{subCategory(categoryKey, index)}</Box>
              )
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={saveCategory} colorScheme="blue" mr={3}>
              {!success ? (
                "Save"
              ) : (
                <CircularProgress
                  size={"25px"}
                  isIndeterminate
                  color="#ffffff"
                />
              )}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCategory;
