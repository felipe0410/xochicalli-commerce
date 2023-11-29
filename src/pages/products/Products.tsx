import { FC, lazy, Suspense, useEffect } from "react";

import {
  Center,
  Spinner,
  Heading,
  Text,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  GridItem,
  Grid,
  CheckboxGroup,
  Select,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

import { useFilter, useProducts } from "@/hooks";
import { Spinner as LazySpinner } from "@/components/loading";

const ProductCard = lazy(() => import("@/components/products/ProductCard"));

const Products: FC = (): JSX.Element => {
  const { loading, products, setProducts } = useProducts();

  const {
    searchInput,
    sortedProducts,
    handleCategoryChange,
    onClearInput,
    onSearchInputChange,
    handleSortChange,
  } = useFilter();

  useEffect(() => {
    if (products.length === 0) {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    } else {
      localStorage.setItem('products', JSON.stringify(products));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
      <Helmet>
        <title>Productos</title>
      </Helmet>
      <Heading mt={4}>Productos</Heading>
      <Breadcrumb py={2}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to='/'>
            Inicio
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to='/products' isCurrentPage>
            Productos
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Center pt={4} pb={8}>
        {loading ? (
          <Spinner size='xl' mt={4} />
        ) : products.length !== 0 ? (
          <VStack gap={6}>
            <VStack width={["xs", "md"]} gap={2}>
              <InputGroup width={["xs", "sm"]}>
                <InputLeftAddon bgColor='gray.200' children={<FiSearch />} />
                <Input
                  ref={searchInput}
                  type='text'
                  onChange={onSearchInputChange}
                  bgColor='white'
                  placeholder='Planta...'
                />
                <InputRightAddon
                  cursor='pointer'
                  bgColor='gray.200'
                  onClick={onClearInput}
                  children={<FiX />}
                />
              </InputGroup>
              <CheckboxGroup
                colorScheme='green'
                onChange={handleCategoryChange}
              >
                <Flex
                  pl={[8, 8, 0]}
                  direction={["column", "column", "row"]}
                  gap={4}
                  justifyContent={["flex-start", "flex-start", "center"]}
                  w='100%'
                >
                  <Checkbox value='Macetas'>Macetas</Checkbox>
                  <Checkbox value='Abonos'>Abonos</Checkbox>
                  <Checkbox value='Plantas'>Plantas</Checkbox>
                  <Checkbox value='Fertilizantes'>Fertilizantes</Checkbox>
                  <Checkbox value='Herramientas'>Herramientas</Checkbox>
                </Flex>
              </CheckboxGroup>
              <Select
                bgColor='gray.200'
                placeholder='Ordenar por'
                w='100%'
                onChange={handleSortChange}
              >
                <option value='desc'>Precio (Mayor a menor)</option>
                <option value='asc'>Precio (Menor a mayor)</option>
                <option value='title'>Nombre</option>
                <option value='category'>Categoría</option>
              </Select>
            </VStack>
            <Grid
              height='100%'
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(1, 1fr)",
                "repeat(2, 1fr)",
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
              ]}
              templateRows='repeat(4, 1fr)'
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
                          <ProductCard
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
    </VStack>
  );
};

export default Products;
