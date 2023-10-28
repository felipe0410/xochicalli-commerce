import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Image,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { User } from "./interface";
import { deleteUser } from "@/utils/firebase/data";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useState } from "react";

const ManualClose = ({ dataUser }: { dataUser: User }) => {
  const [updatee, setUpdatee] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateData = {
    name: dataUser?.name ?? "",
    email: dataUser?.email ?? "",
    role: dataUser?.role ?? "",
    uid: dataUser?.uid ?? "",
    nacimiento: dataUser?.birthday ?? "",
    contacto: dataUser?.phoneNumber ?? "",
  };
  return (
    <>
      <SnackbarProvider />
      <Button onClick={onOpen}>
        <FiTrash2 fontSize="1.25rem" />
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              style={{
                fontWeight: 700,
                fontSize: "xx-large",
                textAlignLast: "center",
              }}
            >
              ELIMINAR USUARIO
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box>
              <Image src="/deleteUser.jpg" />
              <Text
                style={{ display: "flex", placeContent: "center" }}
                fontSize="2xl"
              >
                {`Deseas eliminar a :`}
                <span
                  style={{
                    fontWeight: 700,
                    color: "#2e2ec9",
                    marginLeft: "5px",
                  }}
                >
                  {updateData.name}
                </span>
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button
              onClick={async () => {
                setUpdatee(true);
                const deleteFuntion = await deleteUser(updateData.uid);
                enqueueSnackbar(
                  deleteFuntion
                    ? "usuario eliminado con exito"
                    : "Error al elimianr el usuario",
                  {
                    variant: deleteFuntion ? "success" : "error",
                    preventDuplicate: true,
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "right",
                    },
                  }
                );
                setUpdatee(false);
                deleteFuntion && onClose();
              }}
              colorScheme="blue"
              mr={3}
            >
              {!updatee ? (
                "Eliminar"
              ) : (
                <CircularProgress
                  size={"25px"}
                  isIndeterminate
                  color="#ffffff"
                />
              )}
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ManualClose;
