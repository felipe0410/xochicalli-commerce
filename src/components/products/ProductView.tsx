import { FC, useContext } from "react";

import {
  Box,
  Button,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";

import { CartContext, UserContext } from "@/context";
import { Product } from "@/interfaces";
import { usePrice, useProduct } from "@/hooks";

const ProductView: FC<Product> = ({
  title,
  image,
  description,
  category,
  id,
  stock,
}) => {
  const uid = localStorage.getItem("uid");

  const { user } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);

  const toast = useToast();
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const { product } = useProduct(id);
  const { newPrice } = usePrice(product?.price as number);

  const addItemToCart = () => {
    if (!user || uid === "") {
      toast({
        status: "info",
        duration: 1500,
        isClosable: false,
        title: "Añadir al carrito",
        position: isLargerThan800 ? "top-right" : "bottom",
        description: "Debes iniciar sesión para añadir productos al carrito",
      });
    } else {
      product && addToCart(product);
      toast({
        status: "success",
        duration: 1000,
        isClosable: false,
        title: "Añadir al carrito",
        position: isLargerThan800 ? "top" : "bottom",
        description: "¡Producto añadido al carrito!",
      });
    }
  };

  return (
    <Stack
      direction={["column", "column", "column", "row"]}
      gap={4}
      width='full'
      justifyContent='space-between'
    >
      <Image
        src={image}
        alt={title}
        aspectRatio={["auto", "auto", 4 / 3]}
        minWidth={[350, "full", 500, 500]}
        height='500'
        mx='auto'
        objectFit='cover'
        borderRadius='lg'
        loading='lazy'
        boxShadow='base'
      />
      <VStack
        bgColor='white'
        justifyContent='space-between'
        boxShadow='base'
        py={2}
        px={6}
        borderRadius='lg'
        minHeight='full'
      >
        <Box>
          <Heading textShadow='base' textAlign='center' py={4}>
            {title}
          </Heading>
          <Tag mb={4} marginRight={"15px"}>
            Categoría: {category}
          </Tag>
          {/* <Tag mb={4} marginRight={"15px"}>
            Subcategoría: {category}
          </Tag>
          <Tag mb={4} marginRight={"15px"}>
            Tags: {category}
          </Tag> */}
          <Text>{description}</Text>
          <Text fontWeight={500} fontSize='lg' mt={4}>
            En stock: {stock && stock > 1 ? "\u2705" : "\u274C"}
          </Text>
          {stock && stock > 1 ? (
            <Text fontWeight={500} fontSize='lg' mt={4}>
              Disponibles: {stock}
            </Text>
          ) : null}
          <Text fontWeight={500} fontSize='md' mt={4}>
            Garantía de 30 días
          </Text>
        </Box>
        <Stack
          direction={["row", "row", "column"]}
          gap={4}
          py={4}
          alignItems={["center", "center", "flex-start"]}
          justifyContent='space-around'
          width='full'
        >
          <Text
            fontSize={["xl", "xl", "2xl"]}
            fontWeight={600}
            border='1px solid'
            borderColor='gray.200'
            py={2}
            px={4}
            borderRadius='lg'
          >
            {newPrice ? newPrice : "0"}
          </Text>
          <Button
            onClick={addItemToCart}
            leftIcon={<FiShoppingCart />}
            colorScheme='purple'
            isDisabled={!stock}
            variant={stock && stock > 1 ? "solid" : "outline"}
            size={["md", "md", "lg"]}
          >
            Añadir al carrito
          </Button>
        </Stack>
      </VStack>
    </Stack>
  );
};
export default ProductView;
