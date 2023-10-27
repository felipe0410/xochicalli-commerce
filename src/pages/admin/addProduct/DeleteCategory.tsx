import { deleteCategoria } from "@/utils";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  CircularProgress,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useState } from "react";

const PopoverDeleteCategory = ({ category }: { category: string }) => {
  const [deletee, setDeletee] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SnackbarProvider />
      <Button marginLeft={"10px"} onClick={onOpen}>
        <DeleteIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            ELIMINAR CATEGORIA
            <Image
              style={{ width: "60%", margin: "0 auto" }}
              src="/Charco - Delete Trash.png"
              alt="Dan Abramov"
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            La categoria <span style={{ fontWeight: 700 }}>"{category}"</span>se
            eliminara permanentemente
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button
              onClick={async () => {
                setDeletee(true);
                const deleteFuntion = await deleteCategoria(category);
                setDeletee(false);
                enqueueSnackbar(
                  deleteFuntion
                    ? "Categoria eliminada con exito"
                    : "Error al eiminar categoria",
                  {
                    variant: deleteFuntion ? "success" : "error",
                    preventDuplicate: true,
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "right",
                    },
                  }
                );
                onClose();
              }}
              colorScheme="red"
            >
              {deletee ? (
                <CircularProgress
                  size={"25px"}
                  isIndeterminate
                  color="#ffffff"
                />
              ) : (
                "Eliminar"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PopoverDeleteCategory;
