import {
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
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { User } from "./interface";

const EditUserModal = ({ dataUser }: { dataUser: User }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateData, setUpdateData] = useState({
    name: dataUser.name,
    email: dataUser.email,
    role: dataUser.role,
  });
  const display =
    !(updateData.name === dataUser.name) &&
    !(updateData.name === dataUser.email);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const inputs = [
    {
      name: "name",
      type: "text",
      value: updateData.name,
      validation: () => updateData.name.length > 4,
      msgError: "Ingrese un nombre valido ",
    },
    {
      name: "email",
      type: "email",
      value: updateData.email,
      validation: () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(updateData.email);
      },
      msgError: "Ingrese un email valido",
    },
  ];

  const handleInputChange = (name: string, value: string) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Button onClick={onOpen}>
        <FiEdit2 fontSize="1.25rem" />
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {inputs.map((input) => (
              <FormControl key={input.name}>
                <FormLabel style={{ fontSize: "16px", fontWeight: "600" }}>
                  {input.name}
                </FormLabel>
                <Input
                  type={"prueba test"}
                  ref={initialRef}
                  placeholder="First name"
                  value={input.value}
                  onChange={(e) =>
                    handleInputChange(input.name, e.target.value)
                  }
                />
                <Text
                  style={{
                    display: input.validation() ? "none" : "block",
                    marginLeft: "2px",
                    marginTop: "10px",
                  }}
                  color="red"
                >
                  {input.msgError}
                </Text>
              </FormControl>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button
              id={"Actualizar-Button"}
              isDisabled={!display}
              mr={3}
              colorScheme="blue"
            >
              Actualizar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditUserModal;
