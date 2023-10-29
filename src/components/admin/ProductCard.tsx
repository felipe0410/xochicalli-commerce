import { FC, useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiTrash } from "react-icons/fi";

import { deleteProduct } from "@/utils";
import { usePrice } from "@/hooks";
import { Product } from "@/interfaces";

const ProductCard: FC<Product> = ({
  image,
  title,
  description,
  price,
  category,
  id,
  tags,
  subcategory,
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const cancelRef = useRef<any>();

  const { newPrice } = usePrice(price);

  const { isOpen, onOpen, onClose } = useDisclosure();
  //const toProduct = useNavigate();
  //const handleToProduct = () => toProduct(`/admin/products/${id}`);
  const navigate = useNavigate();
  const toProduct = () => navigate(`/products/${id}`);

  const handleDelete = async () => {
    setLoading(true);
    await deleteProduct(id, image);
    setLoading(false);
    onClose();
    window.location.reload();
  };

  return (
    <>
      <Card maxW={["xs", "sm"]} borderRadius='xl'>
        <CardBody>
          <Image
            src={image}
            alt={`${title}-${id}`}
            objectFit='cover'
            fallbackSrc='https://via.placeholder.com/256'
            loading='lazy'
            height={256}
            width={512}
            borderRadius='lg'
          />
          <Stack spacing='3' my='3'>
            <Heading noOfLines={1} size={["lg", "md", "lg"]}>
              {title}
            </Heading>
            <Text>id: {id}</Text>
            <Divider />
            <Box display={"flex"} gap={"5px"}>
              <Tag width='max-content'>{category}</Tag>
              <Tag
                width='max-content'
                display={subcategory !== undefined ? "flex" : "none"}
              >
                {subcategory}
              </Tag>
              <Tag
                width='max-content'
                display={tags !== undefined ? "flex" : "none"}
              >
                {tags}
              </Tag>
            </Box>
            <Text noOfLines={1}>{description}</Text>
          </Stack>
          <HStack
            alignItems='center'
            justifyContent='space-between'
            width='100%'
            mt={4}
          >
            <ButtonGroup spacing={4}>
              <Button onClick={onOpen} colorScheme='red'>
                Eliminar
              </Button>
              <Button onClick={toProduct} variant='link' colorScheme='telegram'>
                Ver más
              </Button>
            </ButtonGroup>
            <Text fontSize='xl' fontWeight='medium'>
              {newPrice}
            </Text>
          </HStack>
        </CardBody>
      </Card>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size={["xs", "sm", "md", "lg", "xl"]}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Eliminar producto
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Seguro que quieres eliminar el producto '{title}'?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No, cancelar
              </Button>
              <Button
                isLoading={loading}
                leftIcon={<FiTrash />}
                colorScheme='red'
                onClick={handleDelete}
                ml={3}
              >
                Sí, eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ProductCard;
