import { FC, useContext } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Badge,
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
  AccordionButton,
  AccordionIcon
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";

import { CartContext, UserContext } from "@/context";
import { Product } from "@/interfaces";
import { usePrice, useProduct } from "@/hooks";

const ProductView: FC<Product | any> = ({
  productt,
  title,
  image,
  description,
  category,
  tags,
  subCategory,
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
          <Tag mb={4} marginRight={"15px"}>
            Subcategoría: {subCategory !== undefined ? subCategory : "Otros"}
          </Tag>
          <Tag mb={4} marginRight={"15px"}>
            Tags: {tags !== undefined ? tags : "Otros"}
          </Tag>
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
          <Accordion marginTop={'10px'} allowToggle >
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box fontWeight={700} as="span" flex='1' textAlign='left'>
                    Caracteristicas adicionales
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                {Object.keys(productt).map((element, index) => {
                  const unidad = productt[`unidad-${element}`]
                  const contentProduct = productt[element]
                  const sectionsExclude = ['category', 'description', 'price', 'tags', 'stock', 'title', 'image', 'subCategory']

                  const returnDefault = (title: string, content: string) => {
                    return (
                      <Box display={'flex'} sx={{ alignItems: 'flex-end' }} key={index}>
                        <Text fontWeight={700} fontSize='lg' mt={4}>{title + ": "}</Text>
                        <Text fontWeight={500}>{content}</Text>
                      </Box>
                    )
                  }

                  if (element === 'Graduacion') {
                    const longitudGrupo = Math.ceil(contentProduct.length / 3);
                    const newData = [contentProduct.substring(0, longitudGrupo), contentProduct.substring(longitudGrupo, longitudGrupo * 2), contentProduct.substring(longitudGrupo * 2)]
                    return (
                      <Box>
                        <Text fontWeight={700} fontSize='lg' mt={4}>{element}</Text>
                        {newData.map((e) => (
                          <Badge sx={{ marginRight: '20px' }} variant='subtle' colorScheme='green' key={index * 3} >
                            {e}
                          </Badge>
                        ))
                        }
                      </Box>
                    )

                  }
                  if (element.includes('unidad') || contentProduct.length === 0 || element === 'id' || sectionsExclude.includes(element)) return null
                  if (Array.isArray(contentProduct)) {
                    return (
                      <Box>
                        <Text fontWeight={700} fontSize='lg' mt={4}>{element}</Text>
                        {
                          contentProduct.map((e: [], i: any) => (
                            <Badge sx={{ marginRight: '20px' }} variant='outline' colorScheme='green' key={i} >
                              {e}
                            </Badge>
                          ))
                        }
                      </Box>
                    )
                  }
                  if (productt[`unidad-${element}`] !== undefined) {
                    return returnDefault(element, (contentProduct + " " + unidad))
                  }
                  return (
                    <Box key={index + 1}>
                      {returnDefault(element, contentProduct)}
                    </Box>
                  )
                })
                }
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
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
