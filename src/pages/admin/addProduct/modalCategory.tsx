import { saveCategoriasToFirebase } from "@/utils";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
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

interface CreateCategoryState {
  categoria: string;
  finalCategory: boolean;
  numSubcategorys: number;
  subCategorys: {
    [key: string]: {
      nameCategory: string;
      subCategorys: {
        numItems: number;
        [key: number]: {
          name: string;
          value: string[];
          finalCategory: boolean;
        };
      };
    };
  };
}

const ModalCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createCategory, setCreateCategory] = useState<CreateCategoryState>({
    categoria: "",
    finalCategory: false,
    numSubcategorys: 0,
    subCategorys: {},
  });
  console.log("createCategory::>", "color:green", createCategory);
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
              createCategory?.subCategorys[subcategory]?.subCategorys[0].value
            }
            onChange={(event) => {
              console.log("%ctags", "color:red", event);
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
  //   const handleChange = (tags: any) => {
  //     setTags({ tags });
  //   };

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
          value: [""],
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

  return (
    <>
      <Button onClick={onOpen}>
        <AddIcon />
      </Button>
      <Button ml={4} ref={finalRef}>
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
              </Box>
            </FormControl>
            {Object.keys(createCategory.subCategorys).map(
              (categoryKey, index) => (
                <Box key={categoryKey}>{subCategory(categoryKey, index)}</Box>
              )
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=>saveCategoriasToFirebase(createCategory)} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCategory;
