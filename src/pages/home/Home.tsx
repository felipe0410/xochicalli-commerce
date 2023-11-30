import { FC, lazy, Suspense } from "react";
import {
  Box,
  Center,
  Spinner,
  Text,
  Heading,
  VStack,
  GridItem,
  Grid,
  useBreakpointValue,
  HStack,
  Image,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet-async";
import { useFilter, useProducts } from "@/hooks";
import { Spinner as LazySpinner } from "@/components/loading";

const ProductsHome = lazy(() => import("@/components/products/ProductsHome"));
const ProductsCardCategory = lazy(() => import("@/components/products/ProductsCardCategory"));


const images = [
  {
    url:
      import.meta.env.VITE_BANNER1 ??
      "https://firebasestorage.googleapis.com/v0/b/xochicalli-commerce.appspot.com/o/assets%2Fbanner%2F1.jpg?alt=media&token=9565fa1c-4f3b-47f6-ad4e-083f8b17912b",

  },
  {
    url:
      import.meta.env.VITE_BANNER2 ??
      "https://firebasestorage.googleapis.com/v0/b/xochicalli-commerce.appspot.com/o/assets%2Fbanner%2F2.jpg?alt=media&token=1975fe17-f7a0-4025-9bf2-74f16926afca",
  },
  {
    url:
      import.meta.env.VITE_BANNER3 ??
      "https://firebasestorage.googleapis.com/v0/b/xochicalli-commerce.appspot.com/o/assets%2Fbanner%2F3.jpg?alt=media&token=0c78c39e-bbf6-449b-a667-dfaaae15af7d",
  },
  {
    url:
      import.meta.env.VITE_BANNER4 ??
      "https://firebasestorage.googleapis.com/v0/b/xochicalli-commerce.appspot.com/o/assets%2Fbanner%2F4.jpg?alt=media&token=70026552-bba7-42d9-8555-5b3d04efc48c",
  },
];

const Home: FC = (): JSX.Element => {
  const { loading, products } = useProducts();
  const {
    sortedProducts,
  } = useFilter();

  const imageHeight2 = useBreakpointValue({ sm: 256, md: 512 }) || 256;
  const textW = useBreakpointValue({ sm: 8, md: 48 }) || 8;
  const gridColumnCount = useBreakpointValue({ base: 1, sm: 3 });

  return (
    <Box overflowX="hidden"
      bgGradient="linear(to-b, white, gray.100)" >
      <Helmet>
        <title>Xochicalli Commerce</title>
      </Helmet>
      <Slider
        dots
        infinite
        speed={100}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay  
        autoplaySpeed={2000}
      >
        {images.map((image, index) => (
          <Box key={index}>
            <Image src={image.url} alt={`Banner ${index + 1}`} />
          </Box>
        ))}
      </Slider>


      <HStack
        justifyContent="center"
        py={8}
      >
        <Center>
          <VStack>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: 6 }}>
              <Heading fontSize={[32, 48]}>Xochicalli Commerce</Heading>
            </Box>
            <Text
              fontSize={[20, 24]}
              py={6}
              textAlign="center"
              fontWeight={600}
            >
              Planta tus sueños y que florezcan tus objetivos
            </Text>
            <Text fontSize="18px" textAlign="center" px={textW}>
              En Xochicalli Commerce nos interesa proporcionar plantas, macetas,
              fertilizantes y todo tipo de herramientas que le permiten a tus
              plantas crecer de una forma más fácil y eficaz
            </Text>
          </VStack>
        </Center>
      </HStack>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: 6 }}>
          <Text fontSize='4xl' as='b'>RECOMENDADOS</Text>
        </Box>
        <Box>
          <Center pt={4} pb={1}>
            {loading ? (
              <Spinner size='xl' mt={4} />
            ) : products.length !== 0 ? (
              <VStack gap={6}>
                <Grid
                  height='100%'
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                    "repeat(4, 1fr)"
                  ]}
                  templateRows='1fr'
                  gap={6}
                >
                  {sortedProducts &&
                    sortedProducts.slice(0, 4).map(
                      ({
                        category,
                        description,
                        id,
                        image,
                        price,
                        title,
                        stock,
                        subcategory,
                        tags,
                      }) => {
                        return (
                          <Suspense key={id} fallback={<LazySpinner />}>
                            <GridItem>
                              <ProductsHome
                                id={id}
                                tags={tags}
                                subcategory={subcategory}
                                category={category}
                                description={description}
                                image={image}
                                price={price}
                                title={title}
                                stock={stock}
                                subCategory={""}
                              />
                            </GridItem>
                          </Suspense>
                        );
                      }
                    )}
                </Grid>
              </VStack>
            ) : (
              <Text fontWeight='medium'>No hay productos 😓</Text>
            )}
          </Center>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: 6 }}>
            <Text fontSize='4xl' as='b'>Categorias</Text>
          </Box>
          <Center pt={4} pb={1}>
            {loading ? (
              <Spinner size='xl' />
            ) : products.length !== 0 ? (
              <VStack gap={6} px={6}>
                <Grid
                  height='100%'
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                  ]}
                  templateRows='1fr'
                  gap={6}
                >
                  {sortedProducts &&
                    sortedProducts.map(
                      ({
                        category,
                        description,
                        id,
                        image,
                        price,
                        title,
                        stock,
                        subcategory,
                        tags,
                      }) => {
                        return (
                          <Suspense key={id} fallback={<LazySpinner />}>
                            <GridItem>
                              <ProductsCardCategory
                                id={id}
                                tags={tags}
                                subcategory={subcategory}
                                category={category}
                                description={description}
                                image={image}
                                price={price}
                                title={title}
                                stock={stock}
                                subCategory={""}
                              />
                            </GridItem>
                          </Suspense>
                        );
                      }
                    )}
                </Grid>
              </VStack>
            ) : (
              <Text fontWeight='medium'>No hay productos 😓</Text>
            )}
          </Center>
        </Box>
      </Box>
      <Box sx={{ mt: 8, px: 8 }} >

        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 8 }}>
          <Text fontSize='3xl' as='b' textAlign='center'>Las Favoritas de Xochicalli </Text>
        </Box>

        <Box sx={{ display: { sm: 'none', md: 'flex' }, widht: '100%', justifyContent: 'center' }}>
          <Box sx={{ widht: '50%' }}>
            <Image src='https://begreen.imgix.net/6481cbd11bc70284307055.jpg?auto=format,compress' alt='Dan Abramov' height={imageHeight2} width='100%' />
          </Box>

          <Box sx={{ widht: '50%' }}>

            <Box sx={{ display: { sm: 'none', md: 'flex' }, widht: '100%' }}>
              <Image src='https://begreen.imgix.net/6363fd3118bdd013505161.jpg?auto=format,compress' alt='Dan Abramov' height="256px" width='100%' />
              <Image src='https://begreen.imgix.net/651c2d0c36363379959356.jpg?auto=format,compress' alt='Dan Abramov' height="256px" width='100%' />
            </Box>

            <Box sx={{ display: { sm: 'none', md: 'flex' }, widht: '100%' }}>
              <Image src='https://begreen.imgix.net/63061c845e843267152601.jpg?auto=format,compress' alt='Dan Abramov' height="256px" width='100%' />
              <Image src='https://begreen.imgix.net/6481ccba60099747797800.jpg?auto=format,compress' alt='Dan Abramov' height="256px" width='100%' />
            </Box>
          </Box>

        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, px: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Text fontSize='3xl' as='b' textAlign='center'>¿Por qué Xochicalli es tan especial?</Text>
        </Box>
        <Grid
          templateColumns={`repeat(${gridColumnCount}, 1fr)`}
          gap={4}
          justifyItems="center"
        >
          <GridItem>
            <Box p={5} boxShadow="md" sx={{ display: 'flex' }}>
              <Image src='https://be.green/build/images/tree-icons-1.png' alt='Dan Abramov' height="100px" width={100} />
              <Box mx={2}>
                <Text fontSize='lg' as='b'>¡Plantas felices directo a casa!</Text>
                <Text fontSize='md'>Sanas y felices, directas del invernadero a tu casa.</Text>
              </Box>
            </Box>
          </GridItem>
          <GridItem>
            <Box p={5} boxShadow="md" sx={{ display: 'flex' }}>
              <Image src='https://be.green/build/images/tree-icons-2.png' alt='Dan Abramov' height="100px" width={100} />
              <Box mx={2}>
                <Text fontSize='lg' as='b'>Accesorios únicos</Text>
                <Text fontSize='md'>Decora combinando plantas y macetas para crear espacios excepcionales.</Text>
              </Box>
            </Box>
          </GridItem>
          <GridItem>
            <Box p={5} boxShadow="md" sx={{ display: 'flex' }}>
              <Image src='https://be.green/build/images/tree-icons-3.png' alt='Dan Abramov' height="100px" width={100} />
              <Box mx={2}>
                <Text fontSize='lg' as='b'>Estamos aquí para ti​</Text>
                <Text fontSize='md'>Te ayudamos a cuidar tus plantas con nuestro servicio personalizado.</Text>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;