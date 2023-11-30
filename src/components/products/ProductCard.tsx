import { FC, useContext, useEffect, useState } from 'react'

import { Button, ButtonGroup, Card, CardBody, Divider, Heading, HStack, Stack, Tag, Text, useMediaQuery, useToast } from '@chakra-ui/react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

import { UserContext, CartContext } from '@/context';
import { usePrice } from '@/hooks';
import { Product } from '@/interfaces';

const ProductCard: FC<Product> = (product): JSX.Element => {
    const uid = localStorage.getItem('uid');

    const { user } = useContext(UserContext)
    const { addToCart } = useContext(CartContext)

    const toast = useToast();
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    const navigate = useNavigate();

    const { newPrice } = usePrice(product.price)

    const toProduct = () => navigate(`/products/${product.id}`)

    const addItemToCart = () => {
        if (!user || uid === '') {
            toast({
                status: 'info',
                duration: 1500,
                isClosable: false,
                title: 'Añadir al carrito',
                position: isLargerThan800 ? 'top-right' : 'bottom',
                description: 'Debes iniciar sesión para añadir productos al carrito',
            })
            navigate('/login');
        } else {
            product && addToCart(product)
            toast({
                status: 'success',
                duration: 1000,
                isClosable: false,
                title: 'Añadir al carrito',
                position: isLargerThan800 ? 'top' : 'bottom',
                description: '¡Producto añadido al carrito!',
            })
        }
    }

    const [offlineSrc, setOfflineSrc] = useState<any>(null);
    console.log('offlineSrc::>', offlineSrc)

    useEffect(() => {

        const test = async () => {
            const cacheResponse = await caches.match(product.image);
            console.log('%ccacheResponse', 'color:red', cacheResponse)
            if (cacheResponse) {
                const blob = await cacheResponse.blob();
                const offlineSrc = URL.createObjectURL(blob);
                console.log('offlineSrc2::>', offlineSrc)
                setOfflineSrc(offlineSrc);
            }

        }
        const fetchImage = async () => {
            try {
                const response = await fetch(product.image);
                const blob = await response.blob();
                const offlineSrc = URL.createObjectURL(blob);
                setOfflineSrc(offlineSrc);
            } catch (error) {
                // Manejar errores al cargar la imagen, por ejemplo, cargar la imagen de la caché
                const cacheResponse = await caches.match(product.image);
                if (cacheResponse) {
                    const blob = await cacheResponse.blob();
                    const offlineSrc = URL.createObjectURL(blob);
                    console.log('offlineSrc2::>', offlineSrc)
                    setOfflineSrc(offlineSrc);
                }
            }
        };

        fetchImage();
        test()
    }, []);

    return (
        <Card maxW={['xs', 'sm']} h='490px' borderRadius='xl'>
            <CardBody>
                <LazyLoadImage
                    src={product.image}
                    alt={`${product.title}-${product.id}`}
                    effect='blur'
                    style={{
                        borderRadius: '8px',
                        objectFit: 'cover',
                        height: '256px',
                        width: '512px',
                    }}
                />
                <Stack spacing='3' my='3'>
                    <HStack alignItems='center' justifyContent='space-between'>
                        <Heading noOfLines={1} size={['lg', 'md', 'lg']}>{product.title}</Heading>
                        <Text fontSize={['xl', 'xl', '2xl']} fontWeight='medium'>{newPrice}</Text>
                    </HStack>
                    <Tag width='max-content'>{product.category}</Tag>
                    <Text noOfLines={1}>{product.description}</Text>
                </Stack>
                <Divider my={2} />
                <ButtonGroup mt='3' justifyContent='space-between' width='100%'>
                    <Button variant='link' colorScheme='blue' fontSize={16} onClick={toProduct}>Ver más</Button>
                    <Button
                        onClick={addItemToCart}
                        leftIcon={<FiShoppingCart />}
                        colorScheme='purple'
                        isDisabled={!product?.stock}
                    >Añadir al carrito</Button>
                </ButtonGroup>
            </CardBody>
        </Card>
    )
}

export default ProductCard;